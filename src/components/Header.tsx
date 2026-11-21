import { useState } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
export type ActivePage = 'home'|'shop'|'product'|'story'|'journal';
interface Props { activePage:ActivePage;cartCount:number;onNavigate:(p:ActivePage)=>void;onOpenCart:()=>void; }
const NAV: {id:ActivePage;label:string}[]=[{id:'home',label:'Home'},{id:'shop',label:'Collection'},{id:'story',label:'The Brand'},{id:'journal',label:'Social'}];
export function Header({activePage,cartCount,onNavigate,onOpenCart}:Props) {
  const [open,setOpen]=useState(false);
  const nav=(p:ActivePage)=>{setOpen(false);onNavigate(p);};
  const active=(id:ActivePage)=>activePage===id||(id==='shop'&&activePage==='product');
  return <header className="sticky top-0 z-40 bg-[#100e0d] text-[#f5e5c4] border-b border-[#ad8951]/30">
    <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-10 flex items-center justify-between gap-2 h-20">
      <button type="button" className="brand-wordmark" onClick={()=>nav('home')} aria-label="Cartide Bar Scents home"><span className="brand-monogram" aria-hidden="true"/><span>Cartide<span className="block text-[9px] tracking-[.24em] uppercase font-sans-body">Bar Scents</span></span></button>
      <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-5 lg:gap-8">{NAV.map(n=><button type="button" key={n.id} className={'nav-link '+(active(n.id)?'active':'')} aria-current={active(n.id)?'page':undefined} onClick={()=>nav(n.id)}>{n.label}</button>)}</nav>
      <div className="flex items-center gap-1 sm:gap-3 shrink-0">
        <button type="button" aria-label={open?'Close navigation menu':'Open navigation menu'} aria-expanded={open} className="md:hidden w-11 h-11 inline-flex items-center justify-center" onClick={()=>setOpen(v=>!v)}>{open?<X/>:<Menu/>}</button>
        <button type="button" className="outline-gold inline-flex items-center gap-2 px-3 sm:px-4" aria-label={'Open enquiry bag, '+cartCount+' items'} onClick={onOpenCart}><ShoppingBag size={17}/><span className="hidden sm:inline">Bag</span><span>({cartCount})</span></button>
      </div>
    </div>
    {open&&<nav aria-label="Mobile navigation" className="md:hidden px-5 py-3 border-t border-[#ad8951]/30 flex flex-col">{NAV.map(n=><button key={n.id} type="button" className="text-left py-3 border-b border-[#ad8951]/15" aria-current={active(n.id)?'page':undefined} onClick={()=>nav(n.id)}>{n.label}</button>)}</nav>}
  </header>;
}
