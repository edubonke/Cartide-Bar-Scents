import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export type ActivePage = 'home' | 'shop' | 'product' | 'story' | 'journal';

interface HeaderProps {
  activePage: ActivePage;
  cartCount: number;
  onNavigate: (page: ActivePage) => void;
  onOpenCart: () => void;
}

const NAV_ITEMS: Array<{ id: ActivePage; label: string }> = [
  { id: 'home', label: 'Home' },
  { id: 'shop', label: 'Shop' },
  { id: 'story', label: 'The Story' },
  { id: 'journal', label: 'Journal' },
];

export function Header({ activePage, cartCount, onNavigate, onOpenCart }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: ActivePage) => {
    setMobileMenuOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F6F4EF]/92 backdrop-blur-md border-b border-[#161412]/10">
      <div className="max-w-[1280px] mx-auto px-3 sm:px-6 md:px-10 h-16 flex items-center justify-between gap-2 md:gap-8">
        {/* Zone 1: Single-line brand wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="font-display text-lg sm:text-xl md:text-2xl font-medium tracking-tight text-[#161412] whitespace-nowrap shrink-0 hover:text-[#8C6A43] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8C6A43] cursor-pointer"
        >
          Cartide Bar Scents
        </button>

        {/* Zone 2: Clean single-line typography navigation */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive =
              activePage === item.id || (item.id === 'shop' && activePage === 'product');
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 text-sm font-medium tracking-wide whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8C6A43] cursor-pointer ${
                  isActive ? 'text-[#161412]' : 'text-[#5A554E] hover:text-[#161412]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#8C6A43] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single primary Cart action (+ mobile menu trigger on narrow screens) */}
        <div className="flex items-center gap-1 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-[#161412] hover:text-[#8C6A43] focus-visible:outline-2 focus-visible:outline-[#8C6A43]"
          >
            {mobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open shopping bag, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}
            className="px-4 py-2 text-xs font-semibold tracking-wider uppercase text-[#F6F4EF] bg-[#161412] hover:bg-[#8C6A43] transition-colors duration-200 whitespace-nowrap shrink-0 tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C6A43] cursor-pointer"
          >
            Cart ({cartCount})
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-t border-[#161412]/10 bg-[#F6F4EF] px-6 py-4 flex flex-col gap-3"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              activePage === item.id || (item.id === 'shop' && activePage === 'product');
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`text-left py-2 text-base font-medium border-b border-[#161412]/5 last:border-none ${
                  isActive ? 'text-[#8C6A43]' : 'text-[#161412]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}
