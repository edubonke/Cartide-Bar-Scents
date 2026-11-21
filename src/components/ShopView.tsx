import { useState } from 'react';
import { Search } from 'lucide-react';
import { PRODUCTS, SCENT_FAMILIES, type ScentFamily, type PerfumeProduct } from '../data/catalog';
import { filterProducts } from '../utils/storeLogic';
import { ProductCard } from './ProductCard';
interface Props {onSelectProduct:(p:PerfumeProduct)=>void;onQuickAdd:(p:PerfumeProduct)=>void;}
export function ShopView({onSelectProduct,onQuickAdd}:Props){
 const [family,setFamily]=useState<'All'|ScentFamily>('All');const [search,setSearch]=useState('');
 const products=filterProducts(PRODUCTS,family,search);
 return <section className="site-width py-12 lg:py-20"><p className="eyebrow">Cartide Bar Scents</p><h1 className="section-title">The Fragrance Collection</h1><p className="muted mt-4 max-w-2xl">Explore the fragrances featured on our social pages. Build your enquiry bag and contact Cartide to confirm current prices, stock and delivery.</p>
 <div className="border-y border-[#b89d71]/40 my-8 py-5 flex flex-col lg:flex-row gap-4 justify-between"><div className="flex flex-wrap gap-2" role="group" aria-label="Filter fragrances">{SCENT_FAMILIES.map(f=><button type="button" key={f} aria-pressed={f===family} onClick={()=>setFamily(f)} className={'filter-button '+(f===family?'selected':'')}>{f}</button>)}</div><div className="flex items-center min-w-0 gap-3"><label className="relative flex-1 min-w-0"><span className="sr-only">Search fragrances</span><Search size={17} className="absolute top-1/2 left-3 -translate-y-1/2"/><input type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search fragrances..." className="w-full border border-[#b89d71]/50 pl-9 pr-3 py-3 bg-white/50 min-w-0"/></label><span className="whitespace-nowrap text-xs">{products.length} scents</span></div></div>
 {products.length?<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">{products.map(p=><ProductCard key={p.id} product={p} onSelectProduct={onSelectProduct} onQuickAdd={onQuickAdd}/>)}</div>:<div className="py-16 text-center"><h2 className="font-display text-3xl">No matching fragrances</h2><button className="gold-button mt-5" type="button" onClick={()=>{setFamily('All');setSearch('');}}>Reset filters</button></div>}</section>;
}
