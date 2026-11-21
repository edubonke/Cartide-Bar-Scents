import { useEffect, useState } from 'react';
import { PRODUCTS, type PerfumeProduct } from './data/catalog';
import { addToCart, calculateCartSummary, removeFromCart, updateCartQuantity, type CartItem } from './utils/storeLogic';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Header, type ActivePage } from './components/Header';
import { HomeView } from './components/HomeView';
import { JournalView } from './components/JournalView';
import { ProductDetailView } from './components/ProductDetailView';
import { ShopView } from './components/ShopView';
import { StoryView } from './components/StoryView';
const KEY = 'cartide_fragrance_enquiries_v2';
function loadInitialCart(): CartItem[] {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(saved) ? saved.filter(i => PRODUCTS.some(p=>p.id===i?.productId) && Number.isInteger(i.quantity) && i.quantity>0 && i.quantity<=99) : [];
  } catch { return []; }
}
export default function App() {
  const [activePage,setPage]=useState<ActivePage>('home');
  const [product,setProduct]=useState(PRODUCTS[0]);
  const [items,setItems]=useState<CartItem[]>(loadInitialCart);
  const [cartOpen,setCartOpen]=useState(false);
  useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify(items));}catch{}},[items]);
  const navigate=(page:ActivePage)=>{setPage(page);window.scrollTo({top:0,behavior:'instant'});};
  const select=(p:PerfumeProduct)=>{setProduct(p);navigate('product');};
  const add=(p:PerfumeProduct,quantity=1)=>{setItems(prev=>addToCart(prev,p,quantity));setCartOpen(true);};
  return <div className="min-h-screen flex flex-col">
    <Header activePage={activePage} cartCount={calculateCartSummary(items).itemCount} onNavigate={navigate} onOpenCart={()=>setCartOpen(true)}/>
    <main className="flex-1 min-w-0">
      {activePage==='home'&&<HomeView onNavigate={navigate} onSelectProduct={select}/>}
      {activePage==='shop'&&<ShopView onSelectProduct={select} onQuickAdd={add}/>}
      {activePage==='product'&&<ProductDetailView key={product.id} product={product} onBackToShop={()=>navigate('shop')} onAddToCart={add}/>}
      {activePage==='story'&&<StoryView onNavigate={navigate}/>}
      {activePage==='journal'&&<JournalView/>}
    </main>
    <Footer onNavigate={navigate}/>
    <CartDrawer open={cartOpen} items={items} onClose={()=>setCartOpen(false)} onUpdateQuantity={(id,delta)=>setItems(prev=>updateCartQuantity(prev,id,delta))} onRemoveItem={id=>setItems(prev=>removeFromCart(prev,id))} onBrowseShop={()=>navigate('shop')}/>
  </div>;
}
