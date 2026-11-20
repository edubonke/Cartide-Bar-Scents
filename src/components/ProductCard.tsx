import { ArrowRight, Plus } from 'lucide-react';
import type { PerfumeProduct } from '../data/catalog';
import { formatRand } from '../utils/storeLogic';
import { ResilientImage } from './ResilientImage';

interface ProductCardProps {
  product: PerfumeProduct;
  onSelectProduct: (product: PerfumeProduct) => void;
  onQuickAdd: (product: PerfumeProduct) => void;
}

export function ProductCard({ product, onSelectProduct, onQuickAdd }: ProductCardProps) {
  return (
    <article className="group flex flex-col">
      {/* Gallery Media Container */}
      <div className="relative aspect-[4/3] w-full bg-[#EDE9E0] overflow-hidden">
        <button
          type="button"
          onClick={() => onSelectProduct(product)}
          aria-label={`Inspect ${product.name}`}
          className="block w-full h-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C6A43]"
        >
          <ResilientImage
            src={product.image}
            alt={product.imageAlt}
            containerClassName="w-full h-full"
            className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            fallbackTitle={product.name}
          />
        </button>

        {/* Subtle Discover Scent slide-in overlay on hover */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 pt-10 px-4 pb-4 bg-gradient-to-t from-[#161412]/80 via-[#161412]/35 to-transparent opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#F6F4EF]">
            Discover Scent
            <ArrowRight size={14} strokeWidth={1.5} />
          </span>
        </div>
      </div>

      {/* Uniform Metadata Block */}
      <div className="pt-4 flex flex-col flex-1 justify-between gap-2">
        <div className="space-y-1">
          <p className="text-xs text-[#5A554E] tracking-wide">
            {product.scentFamily} <span aria-hidden="true">·</span> {product.batchCode}
          </p>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-xl font-medium text-[#161412] leading-snug">
              <button
                type="button"
                onClick={() => onSelectProduct(product)}
                className="text-left hover:text-[#8C6A43] transition-colors cursor-pointer"
              >
                {product.name}
              </button>
            </h3>
            <span className="text-sm font-medium text-[#161412] tabular-nums whitespace-nowrap shrink-0">
              {formatRand(product.basePrice)}
            </span>
          </div>
          <p className="text-sm text-[#5A554E] leading-relaxed">{product.subtitle}</p>
        </div>

        <div className="pt-2.5 flex items-center justify-between border-t border-[#161412]/10">
          <button
            type="button"
            onClick={() => onSelectProduct(product)}
            className="text-xs font-medium text-[#5A554E] hover:text-[#161412] transition-colors cursor-pointer py-1"
          >
            18g Solid Bar · Notes
          </button>
          <button
            type="button"
            onClick={() => onQuickAdd(product)}
            aria-label={`Add ${product.name} to cart`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#161412] hover:text-[#8C6A43] transition-colors cursor-pointer py-1"
          >
            <Plus size={13} strokeWidth={1.75} />
            Add to Bag
          </button>
        </div>
      </div>
    </article>
  );
}
