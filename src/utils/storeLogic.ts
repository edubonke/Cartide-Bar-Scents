import type { PerfumeProduct, ScentFamily } from '../data/catalog';
export interface CartItem { productId: string; quantity: number; }
export const formatRand = (amount: number) => 'R'+Math.round(amount).toLocaleString('en-US');
export function filterProducts(products: PerfumeProduct[], family: 'All' | ScentFamily, query: string) {
  const search = query.trim().toLowerCase();
  return products.filter(p => (family === 'All' || p.scentFamily === family) && [p.name,p.subtitle,p.scentFamily,p.format,p.description].join(' ').toLowerCase().includes(search));
}
export function addToCart(items: CartItem[], product: PerfumeProduct, quantity = 1): CartItem[] {
  if (!Number.isInteger(quantity) || quantity < 1) return items;
  const match = items.find(i => i.productId === product.id);
  return match ? items.map(i => i.productId === product.id ? {...i, quantity: Math.min(99,i.quantity+quantity)} : i) : [...items,{productId:product.id,quantity:Math.min(99,quantity)}];
}
export function updateCartQuantity(items: CartItem[], productId: string, delta: number) {
  return items.map(i => i.productId === productId ? {...i, quantity:Math.min(99,i.quantity+delta)} : i).filter(i => i.quantity>0);
}
export function removeFromCart(items: CartItem[], productId: string) { return items.filter(i => i.productId !== productId); }
export function calculateCartSummary(items: CartItem[]) { return {itemCount:items.reduce((n,i)=>n+i.quantity,0)}; }
export function createEnquiry(items: CartItem[], products: PerfumeProduct[]) {
  return ['Hi Cartide Bar Scents! I would like to enquire about the following fragrances:', ...items.flatMap(i => {const p=products.find(p=>p.id===i.productId); return p ? ['• '+i.quantity+' × '+p.name+(p.size?' ('+p.size+')':'')] : []}), 'Please confirm current prices, availability and delivery or collection options. Thank you!'].join('\n');
}
