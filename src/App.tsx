import { useEffect, useState } from 'react';
import { PRODUCTS, type PerfumeProduct } from './data/catalog';
import {
  addToCart,
  calculateCartSummary,
  removeFromCart,
  updateCartQuantity,
  type CartItem,
} from './utils/storeLogic';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Header, type ActivePage } from './components/Header';
import { HomeView } from './components/HomeView';
import { JournalView } from './components/JournalView';
import { ProductDetailView } from './components/ProductDetailView';
import { ShopView } from './components/ShopView';
import { StoryView } from './components/StoryView';

const CART_STORAGE_KEY = 'cartide_bar_scents_cart_v1';

function loadInitialCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedProduct, setSelectedProduct] = useState<PerfumeProduct>(PRODUCTS[0]);
  const [cartItems, setCartItems] = useState<CartItem[]>(loadInitialCart);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage quota errors in restricted frames
    }
  }, [cartItems]);

  const navigateTo = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: PerfumeProduct) => {
    setSelectedProduct(product);
    setActivePage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: PerfumeProduct, variantId: string, quantity = 1) => {
    setCartItems((prev) => addToCart(prev, product, variantId, quantity));
    setCartOpen(true);
  };

  const handleQuickAdd = (product: PerfumeProduct) => {
    const defaultVariant = product.variants[0]?.id ?? '';
    handleAddToCart(product, defaultVariant, 1);
  };

  const handleUpdateQuantity = (productId: string, variantId: string, delta: number) => {
    setCartItems((prev) => updateCartQuantity(prev, productId, variantId, delta));
  };

  const handleRemoveItem = (productId: string, variantId: string) => {
    setCartItems((prev) => removeFromCart(prev, productId, variantId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const summary = calculateCartSummary(cartItems);

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F4EF] text-[#161412]">
      <Header
        activePage={activePage}
        cartCount={summary.itemCount}
        onNavigate={navigateTo}
        onOpenCart={() => setCartOpen(true)}
      />

      <main className="flex-1">
        {activePage === 'home' && (
          <HomeView
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
            onQuickAdd={handleQuickAdd}
          />
        )}

        {activePage === 'shop' && (
          <ShopView
            onSelectProduct={handleSelectProduct}
            onQuickAdd={handleQuickAdd}
          />
        )}

        {activePage === 'product' && (
          <ProductDetailView
            product={selectedProduct}
            onBackToShop={() => navigateTo('shop')}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onQuickAdd={handleQuickAdd}
          />
        )}

        {activePage === 'story' && <StoryView onNavigate={navigateTo} />}

        {activePage === 'journal' && <JournalView />}
      </main>

      <Footer onNavigate={navigateTo} />

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onBrowseShop={() => navigateTo('shop')}
      />
    </div>
  );
}
