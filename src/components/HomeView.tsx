import { ArrowRight } from 'lucide-react';
import { DISPATCH_FRAMES, PRODUCTS, type PerfumeProduct } from '../data/catalog';
import type { ActivePage } from './Header';
import { ProductCard } from './ProductCard';
import { ResilientImage } from './ResilientImage';

interface HomeViewProps {
  onNavigate: (page: ActivePage) => void;
  onSelectProduct: (product: PerfumeProduct) => void;
  onQuickAdd: (product: PerfumeProduct) => void;
}

export function HomeView({ onNavigate, onSelectProduct, onQuickAdd }: HomeViewProps) {
  const featuredProducts = PRODUCTS.filter((p) => p.featured);

  return (
    <div>
      {/* 1. Cinematic Hero with Subtle Looping Scent-Diffusion Gradient */}
      <section className="relative overflow-hidden border-b border-[#161412]/10">
        {/* Looping Scent-Diffusion Aura (compositor-only transforms/opacity) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="animate-scent-primary absolute -top-24 -left-24 w-[560px] h-[560px] rounded-full blur-[110px]"
            style={{
              background:
                'radial-gradient(circle, rgba(140,106,67,0.18) 0%, rgba(237,233,224,0.35) 55%, transparent 75%)',
            }}
          />
          <div
            className="animate-scent-secondary absolute -bottom-24 right-0 w-[620px] h-[620px] rounded-full blur-[120px]"
            style={{
              background:
                'radial-gradient(circle, rgba(168,142,107,0.16) 0%, rgba(246,244,239,0.2) 60%, transparent 80%)',
            }}
          />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 py-14 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Editorial Copy Column */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-8 py-2">
              <div className="space-y-6">
                <p className="text-xs font-medium tracking-widest uppercase text-[#8C6A43]">
                  Sophisticated Luxury Smell · Small-Batch Solid Perfumery
                </p>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.06] tracking-tight text-[#161412] [text-wrap:balance]">
                  Luxury begins where ordinary end.
                </h1>
                <p className="text-base text-[#5A554E] leading-relaxed max-w-md">
                  Hand-poured solid perfume bars encased in precision-milled bronze. Zero alcohol,
                  pure botanical maceration, designed to warm into skin from R370.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => onNavigate('shop')}
                    className="inline-flex items-center gap-2 px-5 sm:px-7 py-3.5 text-xs font-semibold tracking-widest uppercase bg-[#161412] text-[#F6F4EF] hover:bg-[#8C6A43] transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Explore Collection
                    <ArrowRight size={14} strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('story')}
                    className="px-5 sm:px-6 py-3.5 text-xs font-semibold tracking-widest uppercase border border-[#161412]/25 text-[#161412] hover:border-[#8C6A43] hover:text-[#8C6A43] transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Our Craft
                  </button>
                </div>

                {/* Quiet Proof Strip */}
                <div className="pt-6 border-t border-[#161412]/10 grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <p className="font-semibold text-[#161412] tabular-nums">R370</p>
                    <p className="text-[#5A554E] mt-0.5">18g Brass Bar</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#161412] tabular-nums">6–8 hrs</p>
                    <p className="text-[#5A554E] mt-0.5">Skin Longevity</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#161412] tabular-nums">28 Days</p>
                    <p className="text-[#5A554E] mt-0.5">Wax Maceration</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Still-Life Visual */}
            <div className="lg:col-span-7 flex">
              <div className="relative w-full aspect-[16/10] lg:aspect-auto lg:min-h-[480px] bg-[#EDE9E0]">
                <ResilientImage
                  src="/src/assets/images/hero_solid_perfume_1795179463910.jpg"
                  alt="Cartide Bar Scents brushed bronze solid perfume bar on pale travertine stone"
                  priority
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover"
                  fallbackTitle="Cartide Bar Scents"
                />
                <div className="absolute inset-x-0 bottom-0 pt-14 px-5 pb-5 md:px-6 md:pb-6 bg-gradient-to-t from-[#161412]/90 via-[#161412]/55 to-transparent flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-[#F6F4EF]/85">
                      Signature Vessel · Refillable Brass
                    </p>
                    <p className="font-display text-xl text-[#F6F4EF]">
                      No. 04 Bergamot & Wet Travertine
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const signature = PRODUCTS.find((p) => p.id === 'cbs-04') ?? PRODUCTS[0];
                      if (signature) onSelectProduct(signature);
                    }}
                    className="self-start sm:self-auto text-xs font-semibold tracking-wider uppercase text-[#F6F4EF] underline underline-offset-4 hover:text-[#EDE9E0] cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Inspect Bar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Collection Grid */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-10 py-20 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#161412]/10">
          <div className="space-y-2">
            <p className="text-xs font-medium tracking-widest uppercase text-[#8C6A43]">
              01. Curated Editions
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[#161412]">
              The Signature Bars
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#161412] hover:text-[#8C6A43] transition-colors cursor-pointer self-start md:self-auto"
          >
            View All Six Scents
            <ArrowRight size={14} strokeWidth={1.5} />
          </button>
        </div>

        <div className="pt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      </section>

      {/* 3. Brand Philosophy & Tactile Craftsmanship */}
      <section className="border-t border-b border-[#161412]/10 bg-[#EDE9E0]/45">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            <div className="lg:col-span-5">
              <ResilientImage
                src="/src/assets/images/atelier_craft_story_1795179463800.jpg"
                alt="Cartide Bar Scents workshop table with raw beeswax, brass molds, and botanical essence bottles"
                containerClassName="w-full h-full min-h-[380px] aspect-[3/4]"
                className="w-full h-full object-cover"
                fallbackTitle="Atelier Craft"
              />
            </div>
            <div className="lg:col-span-7 flex flex-col justify-between gap-10 py-2">
              <div className="space-y-6">
                <p className="text-xs font-medium tracking-widest uppercase text-[#8C6A43]">
                  02. The Philosophy
                </p>
                <h2 className="font-display text-3xl md:text-5xl font-medium leading-[1.1] text-[#161412] [text-wrap:balance]">
                  Fragrance as a solid object, worn close to the pulse.
                </h2>
                <p className="text-base text-[#5A554E] leading-relaxed max-w-xl">
                  Conventional spray perfumes evaporate in a sharp cloud of denatured alcohol.
                  Cartide Bar Scents suspends concentrated botanical absolutes in unrefined beeswax
                  and cold-pressed jojoba—releasing scent only when warmed by your own skin.
                </p>
                <p className="text-base text-[#5A554E] leading-relaxed max-w-xl">
                  Housed in heavy brushed metal compacts engineered to be refilled endlessly, each
                  bar brings quiet permanence and understated luxury to an everyday ritual.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-[#161412]/10">
                <div>
                  <h3 className="font-display text-xl font-medium text-[#161412]">
                    Zero Alcohol Flash
                  </h3>
                  <p className="text-sm text-[#5A554E] mt-1.5 leading-relaxed">
                    Delicate top notes of bergamot and neroli remain intact for hours instead of
                    flashing off in seconds.
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl font-medium text-[#161412]">
                    Heirloom Refill Vessels
                  </h3>
                  <p className="text-sm text-[#5A554E] mt-1.5 leading-relaxed">
                    Replenish your engraved metallic compact with R210 compostable Atelier Wax
                    Refills.
                  </p>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => onNavigate('story')}
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#161412] hover:text-[#8C6A43] underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Read The Craft Chronicle
                  <ArrowRight size={14} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Visual Atelier Feed (Curated Dispatches) */}
      <section id="atelier-dispatch" className="max-w-[1280px] mx-auto px-6 md:px-10 py-20 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#161412]/10">
          <div className="space-y-2">
            <p className="text-xs font-medium tracking-widest uppercase text-[#8C6A43]">
              03. Visual Diary
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight text-[#161412]">
              Inside the Studio · @cartidebarscents
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('journal')}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#161412] hover:text-[#8C6A43] transition-colors cursor-pointer self-start md:self-auto"
          >
            Read Olfactory Journal
            <ArrowRight size={14} strokeWidth={1.5} />
          </button>
        </div>

        <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DISPATCH_FRAMES.map((frame) => (
            <figure key={frame.id} className="space-y-3">
              <ResilientImage
                src={frame.image}
                alt={frame.imageAlt}
                containerClassName="aspect-[4/5] w-full"
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                fallbackTitle="Atelier Study"
              />
              <figcaption className="space-y-1">
                <p className="text-[11px] uppercase tracking-wider text-[#8C6A43]">
                  {frame.handleTag}
                </p>
                <p className="text-xs text-[#5A554E] leading-relaxed">{frame.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
