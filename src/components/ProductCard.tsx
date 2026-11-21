import { ArrowRight, Plus } from 'lucide-react';
import type { PerfumeProduct } from '../data/catalog';
import { formatRand } from '../utils/storeLogic';
import { ResilientImage } from './ResilientImage';
interface Props {product:PerfumeProduct;onSelectProduct:(p:PerfumeProduct)=>void;onQuickAdd:(p:PerfumeProduct)=>void;}
export function ProductCard({product:p,onSelectProduct,onQuickAdd}:Props){
 return <article className="min-w-0 flex flex-col">
  <button type="button" aria-label={'Inspect '+p.name} className="block w-full" onClick={()=>onSelectProduct(p)}><ResilientImage src={p.image} alt={p.imageAlt} containerClassName="aspect-[3/4] bg-black" className="w-full h-full object-contain"/></button>
  <div className="pt-4 flex-1 flex flex-col"><p className="eyebrow">{p.format}{p.size?' · '+p.size:''}</p><h2 className="font-display text-2xl mt-1"><button type="button" className="text-left" onClick={()=>onSelectProduct(p)}>{p.name}</button></h2><p className="muted text-sm mt-1 flex-1">{p.subtitle}</p><p className="mt-3 font-semibold text-sm">{p.advertisedPrice===null?'Enquire for price':formatRand(p.advertisedPrice)+' · advertised offer'}</p><div className="flex flex-wrap justify-between gap-1 border-t border-[#b89d71]/40 mt-3 pt-2"><button type="button" className="text-link" onClick={()=>onSelectProduct(p)}>Details <ArrowRight size={14}/></button><button type="button" className="text-link" aria-label={'Add '+p.name+' to bag'} onClick={()=>onQuickAdd(p)}><Plus size={15}/> Add to bag</button></div></div>
 </article>;
}
