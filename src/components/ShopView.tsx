import { useState } from 'react';
import { Search } from 'lucide-react';
import { PRODUCTS, SCENT_FAMILIES, type PerfumeProduct, type ScentFamily } from '../data/catalog';
import { filterProducts } from '../utils/storeLogic';
import { ProductCard } from './ProductCard';

interface ShopViewProps {
  onSelectProduct: (product: PerfumeProduct) => void;
  onQuickAdd: (product: PerfumeProduct) => void;
}

export function ShopView({ onSelectProduct, onQuickAdd }: ShopViewProps) {
  const [selectedFamily, setSelectedFamily] = useState<'All' | ScentFamily>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = filterProducts(PRODUCTS, selectedFamily, searchQuery);

  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-10 py-14 md:py-20">
      {/* Header */}
      <div className="space-y-4 pb-10 border-b border-[#161412]/10">
        <p className="text-xs font-medium tracking-widest uppercase text-[#8C6A43]">
          The Collection · Small-Batch Solid Bars
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-[#161412]">
            Artisan Bar Scents
          </h1>
          <p className="text-sm text-[#5A554E] max-w-md leading-relaxed">
            Each 18g solid bar is poured by hand in Cape Town and housed in a refillable metallic
            case. Standard editions R370; wax refills R210.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="py-6 border-b border-[#161412]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div role="group" aria-label="Filter scents by olfactory family" className="flex flex-wrap items-center gap-2">
          {SCENT_FAMILIES.map((family) => {
            const isActive = selectedFamily === family;
            return (
              <button
                key={family}
                type="button"
                onClick={() => setSelectedFamily(family)}
                aria-pressed={isActive}
                className={`px-4 py-2 text-xs font-medium tracking-wide transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#161412] text-[#F6F4EF]'
                    : 'bg-[#EDE9E0]/75 text-[#5A554E] hover:text-[#161412] hover:bg-[#EDE9E0]'
                }`}
              >
                {family}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-1 sm:w-64">
            <label htmlFor="shop-search" className="sr-only">
              Search scents or notes
            </label>
            <Search
              size={15}
              strokeWidth={1.5}
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A554E]"
            />
            <input
              id="shop-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes (e.g. oud, neroli)..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-white/60 border border-[#161412]/15 text-[#161412] placeholder:text-[#5A554E]/75 focus:border-[#8C6A43] focus:outline-none"
            />
          </div>
          <span className="text-xs text-[#5A554E] tabular-nums whitespace-nowrap shrink-0">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'scent' : 'scents'}
          </span>
        </div>
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4">
          <p className="font-display text-3xl text-[#161412]">
            No bars match your current selection.
          </p>
          <p className="text-sm text-[#5A554E]">
            Try clearing your note search or exploring another olfactory family.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedFamily('All');
              setSearchQuery('');
            }}
            className="px-6 py-3 text-xs font-semibold tracking-widest uppercase bg-[#161412] text-[#F6F4EF] hover:bg-[#8C6A43] transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      )}
    </section>
  );
}
