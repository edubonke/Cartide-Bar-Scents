import { useEffect, useState } from 'react';
import { ArrowLeft, Check, Minus, Plus } from 'lucide-react';
import { PRODUCTS, type PerfumeProduct } from '../data/catalog';
import { formatRand } from '../utils/storeLogic';
import { ProductCard } from './ProductCard';
import { ResilientImage } from './ResilientImage';

interface ProductDetailViewProps {
  product: PerfumeProduct;
  onBackToShop: () => void;
  onSelectProduct: (product: PerfumeProduct) => void;
  onAddToCart: (product: PerfumeProduct, variantId: string, quantity: number) => void;
  onQuickAdd: (product: PerfumeProduct) => void;
}

export function ProductDetailView({
  product,
  onBackToShop,
  onSelectProduct,
  onAddToCart,
  onQuickAdd,
}: ProductDetailViewProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants[0]?.id ?? ''
  );
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setSelectedVariantId(product.variants[0]?.id ?? '');
    setQuantity(1);
    setJustAdded(false);
  }, [product]);

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) ?? product.variants[0];

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    if (!activeVariant) return;
    onAddToCart(product, activeVariant.id, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <article className="max-w-[1280px] mx-auto px-6 md:px-10 py-10 md:py-16">
      {/* Breadcrumb Back Navigation */}
      <div className="pb-8">
        <button
          type="button"
          onClick={onBackToShop}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#5A554E] hover:text-[#161412] transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Back to Collection
        </button>
      </div>

      {/* Main Split: Sticky Visual Left + Contiguous Purchase Module Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Gallery */}
        <div className="lg:col-span-7 lg:sticky lg:top-24 space-y-4">
          <ResilientImage
            src={product.image}
            alt={product.imageAlt}
            priority
            containerClassName="aspect-[4/3] w-full bg-[#EDE9E0]"
            className="w-full h-full object-cover"
            fallbackTitle={product.name}
          />
          <div className="grid grid-cols-3 gap-4 pt-2 border-t border-[#161412]/10 text-xs text-[#5A554E]">
            <div>
              <p className="uppercase tracking-wider text-[11px] text-[#8C6A43]">Longevity</p>
              <p className="mt-1 text-[#161412]">{product.longevity}</p>
            </div>
            <div>
              <p className="uppercase tracking-wider text-[11px] text-[#8C6A43]">Projection</p>
              <p className="mt-1 text-[#161412]">{product.sillage}</p>
            </div>
            <div>
              <p className="uppercase tracking-wider text-[11px] text-[#8C6A43]">Provenance</p>
              <p className="mt-1 text-[#161412]">Hand-poured · Cape Town</p>
            </div>
          </div>
        </div>

        {/* Right Purchase & Olfactory Module */}
        <div className="lg:col-span-5 min-w-0 space-y-8">
          <div className="space-y-3 pb-6 border-b border-[#161412]/10">
            <p className="text-xs text-[#5A554E] tracking-wide">
              {product.scentFamily} <span aria-hidden="true">·</span> {product.batchCode}
            </p>
            <h1 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[#161412]">
              {product.name}
            </h1>
            <p className="text-base text-[#5A554E] leading-relaxed">{product.poeticSummary}</p>
            <div className="pt-2 flex items-baseline gap-3">
              <span className="text-2xl font-medium text-[#161412] tabular-nums">
                {formatRand(activeVariant ? activeVariant.price : product.basePrice)}
              </span>
              <span className="text-xs text-[#5A554E]">
                {activeVariant?.weight} · In stock for dispatch
              </span>
            </div>
          </div>

          {/* Variant Selector */}
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#5A554E]">
              Select Vessel
            </p>
            <div className="space-y-2.5" role="radiogroup" aria-label="Select perfume vessel">
              {product.variants.map((variant) => {
                const isSelected = variant.id === activeVariant?.id;
                return (
                  <button
                    key={variant.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setSelectedVariantId(variant.id)}
                    className={`w-full text-left p-4 border transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-[#161412] bg-[#EDE9E0]/65'
                        : 'border-[#161412]/15 hover:border-[#8C6A43]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold text-[#161412]">{variant.label}</span>
                      <span className="text-sm font-medium tabular-nums text-[#161412]">
                        {formatRand(variant.price)}
                      </span>
                    </div>
                    <p className="text-xs text-[#5A554E] mt-1">{variant.detail}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity & Primary Add to Cart CTA */}
          <div className="flex flex-wrap items-stretch gap-3">
            <div className="inline-flex items-center justify-center shrink-0 border border-[#161412]/20 bg-[#F6F4EF]">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-11 h-12 inline-flex items-center justify-center text-[#161412] hover:bg-[#EDE9E0] transition-colors cursor-pointer"
              >
                <Minus size={14} strokeWidth={1.5} />
              </button>
              <span
                aria-label="Quantity"
                className="w-10 text-center text-sm font-medium tabular-nums"
              >
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                aria-label="Increase quantity"
                className="w-11 h-12 inline-flex items-center justify-center text-[#161412] hover:bg-[#EDE9E0] transition-colors cursor-pointer"
              >
                <Plus size={14} strokeWidth={1.5} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="flex-[1_0_185px] min-w-0 min-h-12 px-4 py-2 inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase bg-[#161412] text-[#F6F4EF] hover:bg-[#8C6A43] transition-colors duration-200 cursor-pointer whitespace-nowrap"
            >
              {justAdded ? (
                <>
                  <Check size={15} strokeWidth={2} />
                  Added to Bag
                </>
              ) : (
                <>
                  Add to Cart ·{' '}
                  <span className="tabular-nums">
                    {formatRand((activeVariant?.price ?? product.basePrice) * quantity)}
                  </span>
                </>
              )}
            </button>
          </div>

          {/* Poetic Olfactory Pyramid */}
          <div className="pt-6 border-t border-[#161412]/10 space-y-4">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-[#8C6A43]">
              Olfactory Architecture
            </h2>
            <dl className="divide-y divide-[#161412]/10 text-sm">
              <div className="py-3 grid grid-cols-4 gap-3">
                <dt className="text-xs uppercase tracking-wider text-[#5A554E]">Top</dt>
                <dd className="col-span-3 text-[#161412]">{product.notes.top}</dd>
              </div>
              <div className="py-3 grid grid-cols-4 gap-3">
                <dt className="text-xs uppercase tracking-wider text-[#5A554E]">Heart</dt>
                <dd className="col-span-3 text-[#161412]">{product.notes.heart}</dd>
              </div>
              <div className="py-3 grid grid-cols-4 gap-3">
                <dt className="text-xs uppercase tracking-wider text-[#5A554E]">Base</dt>
                <dd className="col-span-3 text-[#161412]">{product.notes.base}</dd>
              </div>
            </dl>
          </div>

          {/* Craft Story & Ritual */}
          <div className="pt-6 border-t border-[#161412]/10 space-y-3">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-[#5A554E]">
              Formulation & Ritual
            </h2>
            <p className="text-sm text-[#5A554E] leading-relaxed">{product.craftStory}</p>
            <p className="text-xs text-[#5A554E]">
              Application: Warm a small sweep across the inner wrist, collarbone, or behind the
              ear. Reapply sparingly through the evening.
            </p>
          </div>

          {/* Subtle Attributable Collector Note (Claim-to-Proof Adjacency) */}
          <blockquote className="pt-6 border-t border-[#161412]/10 space-y-2">
            <p className="font-display italic text-lg text-[#161412] leading-snug">
              “{product.socialProof.quote}”
            </p>
            <footer className="text-xs text-[#5A554E]">
              {product.socialProof.author} <span aria-hidden="true">·</span>{' '}
              {product.socialProof.context}
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Related Editions */}
      <section className="mt-24 pt-14 border-t border-[#161412]/10">
        <div className="flex items-end justify-between pb-8">
          <div className="space-y-1">
            <p className="text-xs font-medium tracking-widest uppercase text-[#8C6A43]">
              Continue Exploring
            </p>
            <h2 className="font-display text-3xl font-medium text-[#161412]">
              Companion Solid Bars
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProducts.map((related) => (
            <ProductCard
              key={related.id}
              product={related}
              onSelectProduct={onSelectProduct}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      </section>
    </article>
  );
}
