import { useState } from 'react';
import { ArrowLeft, Minus, Plus, ExternalLink } from 'lucide-react';
import { type PerfumeProduct, INSTAGRAM, FACEBOOK } from '../data/catalog';
import { formatRand } from '../utils/storeLogic';
import { ResilientImage } from './ResilientImage';
interface Props {product:PerfumeProduct;onBackToShop:()=>void;onAddToCart:(p:PerfumeProduct,q:number)=>void;}
export function ProductDetailView({product:p,onBackToShop,onAddToCart}:Props){
 const [quantity,setQuantity]=useState(1);
 return <article className="site-width py-10 lg:py-16">
 <button type="button" onClick={onBackToShop} className="text-link mb-6"><ArrowLeft size={16}/> Back to collection</button>
 <div className="grid lg:grid-cols-2 items-start gap-10 lg:gap-16">
 <ResilientImage src={p.image} alt={p.imageAlt} containerClassName="aspect-[3/4] bg-black max-h-[720px]" className="w-full h-full object-contain" priority/>
 <div className="min-w-0 space-y-6"><p className="eyebrow">{p.format} · {p.scentFamily}</p><h1 className="font-display text-4xl lg:text-6xl leading-tight">{p.name}</h1><p className="text-lg muted">{p.subtitle}</p><p className="leading-relaxed">{p.description}</p>
 <dl className="border-y border-[#b89d71]/40 py-5 grid grid-cols-2 gap-5"><div><dt className="eyebrow">Concentration</dt><dd className="mt-2">{p.format}</dd></div><div><dt className="eyebrow">Bottle size</dt><dd className="mt-2">{p.size??'Confirm with Cartide'}</dd></div></dl>
 <div><p className="eyebrow">Price</p><p className="text-2xl mt-2 font-semibold">{p.advertisedPrice===null?'Enquire for price':formatRand(p.advertisedPrice)}</p><p className="muted text-sm mt-2">{p.advertisedPrice===null?'Contact Cartide for current pricing and availability.':'Advertised on 14 June 2026; confirm the current offer before ordering.'}</p></div>
 <div className="flex flex-wrap gap-3"><div className="inline-flex items-center border border-[#b89d71]/60 shrink-0"><button type="button" className="w-12 h-12 grid place-items-center" aria-label="Decrease quantity" onClick={()=>setQuantity(n=>Math.max(1,n-1))}><Minus size={17}/></button><span className="w-10 text-center tabular-nums" aria-label="Quantity">{quantity}</span><button type="button" className="w-12 h-12 grid place-items-center" aria-label="Increase quantity" onClick={()=>setQuantity(n=>Math.min(99,n+1))}><Plus size={17}/></button></div><button type="button" className="gold-button flex-[1_0_185px] min-w-0" onClick={()=>onAddToCart(p,quantity)}>Add to enquiry bag</button></div>
 <p className="text-sm muted">No payment is taken here. Contact the brand directly to arrange your purchase.</p><div className="flex flex-wrap gap-x-5"><a className="text-link" href={p.post} target="_blank" rel="noopener noreferrer">Original product post <ExternalLink size={14}/></a><a className="text-link" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">Instagram</a><a className="text-link" href={FACEBOOK} target="_blank" rel="noopener noreferrer">Facebook</a></div>
 </div></div></article>;
}
