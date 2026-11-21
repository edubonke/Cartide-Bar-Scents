import { ArrowRight, Instagram, Facebook } from 'lucide-react';
import { PRODUCTS, INSTAGRAM, FACEBOOK, BRAND_IMAGE, type PerfumeProduct } from '../data/catalog';
import type { ActivePage } from './Header';
import { ResilientImage } from './ResilientImage';
interface Props {onNavigate:(p:ActivePage)=>void;onSelectProduct:(p:PerfumeProduct)=>void;}
export function HomeView({onNavigate,onSelectProduct}:Props){
 return <>
  <section data-theme="dark" className="bg-[#100e0d] text-[#f6e9d0]">
    <div className="site-width grid lg:grid-cols-2 items-center gap-10 lg:gap-16 py-12 lg:py-20">
      <div className="min-w-0">
        <p className="eyebrow text-[#d3b779]">Sophisticated luxury smell</p>
        <h1 className="font-display text-[clamp(2.8rem,7vw,5.2rem)] leading-[.97] mt-6">Luxury begins where ordinary end.</h1>
        <p className="text-[#e1d7c4] text-base md:text-lg leading-relaxed max-w-lg mt-6">Discover the Cartide fragrance collection — bold, elegant and designed to leave an impression.</p>
        <div className="flex flex-wrap gap-3 mt-8">
          <button type="button" className="gold-button" onClick={()=>onNavigate('shop')}>Explore collection <ArrowRight size={17}/></button>
          <button type="button" className="outline-gold" onClick={()=>onNavigate('story')}>Our brand</button>
        </div>
        <div className="mt-9 pt-5 border-t border-[#ad8951]/40 flex gap-4 flex-wrap text-sm text-[#e1d7c4]"><span>Eau de Parfum</span><span aria-hidden="true">·</span><span>Extrait de Parfum</span></div>
      </div>
      <button type="button" className="relative group text-left border border-[#ad8951]/30" aria-label="Discover Green Sapphire" onClick={()=>onSelectProduct(PRODUCTS[0])}>
        <ResilientImage src={BRAND_IMAGE+'green-sapphire.jpg'} alt={PRODUCTS[0].imageAlt} containerClassName="aspect-[3/4] max-h-[630px] bg-black" className="w-full h-full object-contain" priority/>
        <span className="absolute bottom-3 right-3 bg-black/90 border border-[#ad8951]/50 text-[#f5e5c4] px-4 py-3 text-xs uppercase tracking-widest flex items-center gap-2">Discover <ArrowRight size={15}/></span>
      </button>
    </div>
  </section>
  <section className="site-width py-16 lg:py-24">
    <div className="flex flex-wrap items-end justify-between gap-5 mb-8">
      <div><p className="eyebrow">The collection</p><h2 className="section-title">Find your signature scent.</h2></div>
      <button type="button" className="text-link" onClick={()=>onNavigate('shop')}>View all fragrances <ArrowRight size={16}/></button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">{PRODUCTS.filter(p=>p.featured).map(p=><article key={p.id} className="min-w-0"><button type="button" className="block w-full text-left" onClick={()=>onSelectProduct(p)} aria-label={'Discover '+p.name}><ResilientImage src={p.image} alt={p.imageAlt} containerClassName="aspect-[3/4] bg-black" className="w-full h-full object-contain"/></button><div className="pt-4"><p className="eyebrow">{p.format} · {p.size}</p><h3 className="font-display text-3xl mt-1">{p.name}</h3><p className="muted mt-2">{p.subtitle}</p><button type="button" className="text-link mt-2" onClick={()=>onSelectProduct(p)}>Discover scent <ArrowRight size={15}/></button></div></article>)}</div>
  </section>
  <section data-theme="dark" className="bg-[#151210] text-[#f6e9d0]"><div className="site-width py-16 grid md:grid-cols-2 gap-10 items-center"><ResilientImage src={BRAND_IMAGE+'proud-in-hand.jpg'} alt="Cartide’s Proud of You Absolute fragrance held in hand" containerClassName="aspect-[4/5] bg-black max-h-[475px]" className="w-full h-full object-contain"/><div><p className="eyebrow text-[#d3b779]">From our social collection</p><h2 className="section-title">Be bold. Be proud. Be you.</h2><p className="mt-5 leading-relaxed text-[#e1d7c4]">See real product posts, fragrance announcements and offers directly from Cartide Bar Scents.</p><div className="flex flex-wrap gap-3 mt-7"><a className="gold-button" href={INSTAGRAM} target="_blank" rel="noopener noreferrer"><Instagram size={18}/> Instagram</a><a className="outline-gold" href={FACEBOOK} target="_blank" rel="noopener noreferrer"><Facebook size={18}/> Facebook</a></div></div></div></section>
 </>;
}
