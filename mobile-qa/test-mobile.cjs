const { chromium, devices } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');

const root = path.resolve(process.env.CARTIDE_DIST || path.resolve(__dirname, '../dist'));
const out = path.resolve(process.env.QA_OUTPUT || path.resolve(__dirname, 'screenshots'));
fs.mkdirSync(out, {recursive:true});
const mimetypes = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  const rel = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/Cartide-Bar-Scents\/?/, '');
  const dest = path.resolve(root, rel.replace(/^\//, '') || 'index.html');
  if (!dest.startsWith(root + path.sep) || !fs.existsSync(dest) || !fs.statSync(dest).isFile()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': mimetypes[path.extname(dest)] || 'application/octet-stream' });
  fs.createReadStream(dest).pipe(res);
});

const results = [];
async function inspect(page, name, device, capture=false) {
  await page.waitForTimeout(200);
  const stats = await page.evaluate(() => {
    const width = document.documentElement.clientWidth;
    const overflow = [...document.querySelectorAll('body *')].filter(e => {
      const r = e.getBoundingClientRect(); const s = getComputedStyle(e);
      return r.width && r.height && s.visibility !== 'hidden' && (r.left < -1 || r.right > width + 1) && s.position !== 'absolute' && !e.closest('[aria-hidden="true"]');
    }).slice(0,7).map(e => ({tag:e.tagName, text:e.innerText?.slice(0,50), rect:[Math.round(e.getBoundingClientRect().left), Math.round(e.getBoundingClientRect().right)]}));
    const controls = [...document.querySelectorAll('button,a[href],input,select,textarea')].map(e => { const r=e.getBoundingClientRect(); return {name:e.getAttribute('aria-label') || e.innerText?.trim() || e.getAttribute('placeholder'), width:Math.round(r.width),height:Math.round(r.height),top:Math.round(r.top)}; }).filter(x=>x.width && x.height && (x.height<44 || x.width<44));
    const drawer = document.querySelector('[aria-label="Enquiry bag"]');
    const panel = drawer?.getBoundingClientRect();
    return {width, height:innerHeight, scrollWidth:document.documentElement.scrollWidth, overflow, smallControls:controls, brokenImages:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src), images:[...document.images].length, panel:panel?{left:panel.left,right:panel.right,top:panel.top,bottom:panel.bottom,scrollWidth:drawer.scrollWidth,clientWidth:drawer.clientWidth}:null};
  });
  results.push({device,name,...stats});
  if (capture) await page.screenshot({path:path.join(out,`${device}-${name}.png`),animations:'disabled'});
  console.log(JSON.stringify({device,name,width:stats.width,scrollWidth:stats.scrollWidth,brokenImages:stats.brokenImages.length,overflow:stats.overflow,smallControls:stats.smallControls}));
  assert.equal(stats.scrollWidth,stats.width,`${device} ${name}: horizontal page overflow`);
  assert.equal(stats.brokenImages.length,0,`${device} ${name}: broken images`);
  if(stats.width<=1024) assert.equal(stats.smallControls.length,0,`${device} ${name}: undersized tap targets ${JSON.stringify(stats.smallControls)}`);
  if(stats.panel){
    assert.ok(stats.panel.left>=-1 && stats.panel.right<=stats.width+1 && stats.panel.top>=-1 && stats.panel.bottom<=stats.height+1,`${device} ${name}: drawer outside viewport ${JSON.stringify(stats.panel)}`);
    assert.equal(stats.panel.scrollWidth,stats.panel.clientWidth,`${device} ${name}: drawer overflow`);
  }
}

async function go(page, label) {
  const primary = page.getByRole('navigation',{name:'Primary navigation'});
  if (await primary.isVisible()) await primary.getByRole('button',{name:label,exact:true}).click();
  else {
    const open = page.getByRole('button',{name:'Open navigation menu'});
    if(await open.isVisible()) await open.click();
    await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('button',{name:label,exact:true}).click();
  }
  await page.waitForTimeout(350);
}

(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const url=`http://127.0.0.1:${server.address().port}/Cartide-Bar-Scents/`;
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  const targets=[
    ['small-phone',{viewport:{width:320,height:568},isMobile:true,hasTouch:true,deviceScaleFactor:1}],
    ['iphone',{...devices['iPhone 13'],defaultBrowserType:undefined,deviceScaleFactor:1}],
    ['android',{viewport:{width:412,height:915},isMobile:true,hasTouch:true,deviceScaleFactor:1}],
    ['tablet',{viewport:{width:768,height:1024},isMobile:true,hasTouch:true,deviceScaleFactor:1}],
    ['small-desktop',{viewport:{width:1024,height:768},deviceScaleFactor:1}],
    ['desktop',{viewport:{width:1440,height:900},deviceScaleFactor:1}],
  ];
  for(const [device,config] of targets){
    const context=await browser.newContext({...config,reducedMotion:'reduce'});
    const page=await context.newPage();
    const failures=[]; const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('requestfailed',r=>failures.push({url:r.url(),error:r.failure()?.errorText}));
    await page.goto(url,{waitUntil:'domcontentloaded'});
    await page.getByRole('heading',{name:/Luxury begins/}).waitFor();
    await page.evaluate(()=>Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,5000))]));
    await inspect(page,'01-home',device,true);
    if(await page.getByRole('button',{name:'Open navigation menu'}).isVisible()){
      await page.getByRole('button',{name:'Open navigation menu'}).click();
      await inspect(page,'02-menu',device,device==='iphone'||device==='small-phone');
      await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('button',{name:'Collection',exact:true}).click();
    } else await go(page,'Collection');
    await page.getByRole('heading',{name:'The Fragrance Collection'}).waitFor();
    await inspect(page,'03-shop',device,true);
    assert.equal(await page.locator('main article').count(),7);
    assert.equal(await page.getByText('R370 · advertised offer').count(),1);
    await page.getByRole('button',{name:'Fresh & Vibrant',exact:true}).click();
    assert.equal(await page.locator('main article').count(),2);
    await page.getByRole('button',{name:'All',exact:true}).click();
    await page.getByRole('searchbox').fill('tobacco');
    assert.equal(await page.locator('main article').count(),1);
    await page.getByRole('button',{name:'Inspect Tobacco Gourmand'}).click();
    await page.getByRole('heading',{name:'Tobacco Gourmand',exact:true}).waitFor();
    await inspect(page,'04-product',device,true);
    await page.getByRole('button',{name:'Increase quantity',exact:true}).click();
    await inspect(page,'05-quantity',device,true);
    await page.getByRole('button',{name:'Add to enquiry bag'}).click();
    await page.getByRole('dialog',{name:'Enquiry bag'}).waitFor();
    assert.ok((await page.getByRole('dialog').innerText()).includes('2 fragrances selected'));
    await inspect(page,'06-cart',device,true);
    await page.getByRole('button',{name:'Prepare enquiry'}).click();
    await inspect(page,'07-enquiry',device,true);
    assert.ok((await page.getByRole('textbox',{name:'Your enquiry message'}).inputValue()).includes('2 × Tobacco Gourmand (80 ml)'));
    assert.equal(await page.getByRole('link',{name:'Open Instagram'}).getAttribute('href'),'https://www.instagram.com/cartide_barscents/');
    assert.equal(await page.getByRole('link',{name:'Open Facebook'}).getAttribute('href'),'https://www.facebook.com/people/Cartide-Bar-Scents/61590558068103/');
    await page.getByRole('button',{name:'Copy enquiry'}).click();
    await page.getByRole('status').filter({hasText:/cop(y|ied)/i}).waitFor();
    await inspect(page,'08-copy',device,true);
    await page.getByRole('button',{name:'Close enquiry bag'}).click();
    await go(page,'The Brand');
    await inspect(page,'09-story',device,device==='iphone'||device==='tablet');
    await go(page,'Social');
    await inspect(page,'10-social',device,true);
    assert.equal(await page.locator('main article').count(),3);
    assert.equal(await page.getByRole('link',{name:'View original post'}).count(),3);
    console.log(JSON.stringify({device,status:'FLOW PASS',errors,failedLocalRequests:failures.filter(r=>r.url.startsWith('http://127.0.0.1')),externalRequestsBlocked:failures.filter(r=>!r.url.startsWith('http://127.0.0.1')).length}));
    assert.equal(errors.length,0,`${device}: runtime errors`);
    assert.equal(failures.filter(r=>r.url.startsWith('http://127.0.0.1')).length,0,`${device}: failed local requests`);
    await context.close();
  }
  fs.writeFileSync(path.join(out,'results.json'),JSON.stringify(results,null,2));
  await browser.close(); server.close();
})().catch(e=>{console.error(e);server.close();process.exit(1)});
