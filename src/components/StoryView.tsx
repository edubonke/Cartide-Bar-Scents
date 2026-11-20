import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import type { ActivePage } from './Header';
import { ResilientImage } from './ResilientImage';

interface StoryViewProps {
  onNavigate: (page: ActivePage) => void;
}

export function StoryView({ onNavigate }: StoryViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      targets.forEach((el) => el.setAttribute('data-reveal', 'visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-reveal', 'visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        el.setAttribute('data-reveal', 'visible');
      } else {
        el.setAttribute('data-reveal', 'pending');
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="max-w-[1280px] mx-auto px-6 md:px-10 py-14 md:py-20 space-y-24">
      {/* Chapter 1: Intro Manifesto */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pb-16 border-b border-[#161412]/10">
        <div className="lg:col-span-7 space-y-6">
          <p className="text-xs font-medium tracking-widest uppercase text-[#8C6A43]">
            The Story · Cartide Bar Scents
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.06] tracking-tight text-[#161412] [text-wrap:balance]">
            Luxury begins where ordinary end.
          </h1>
        </div>
        <div className="lg:col-span-5">
          <p className="text-base text-[#5A554E] leading-relaxed">
            Founded on a simple conviction—that fine perfumery belongs on the skin rather than
            atomized into a synthetic mist—Cartide Bar Scents distills raw botanicals into solid
            wax bars housed in weighted metallic compacts.
          </p>
        </div>
      </section>

      {/* Chapter 2: Atelier Bench & Pouring Process */}
      <section
        data-reveal="visible"
        className="editorial-reveal grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch"
      >
        <div className="lg:col-span-6">
          <ResilientImage
            src="/src/assets/images/atelier_craft_story_1795179463800.jpg"
            alt="Cartide Bar Scents pouring table with brass molds, beeswax slab, and botanical essences"
            containerClassName="w-full h-full aspect-[4/5]"
            className="w-full h-full object-cover"
            fallbackTitle="Atelier Pouring"
          />
        </div>

        <div className="lg:col-span-6 flex flex-col justify-between gap-8 py-2">
          <div className="space-y-6">
            <p className="text-xs font-medium tracking-widest uppercase text-[#8C6A43]">
              01. Small-Batch Formulation
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium leading-tight text-[#161412]">
              Poured at 48°C to protect volatile botanical oils.
            </h2>
            <p className="text-base text-[#5A554E] leading-relaxed">
              High heat destroys delicate citrus peel and white floral absolutes. Every batch of
              Cartide balm is blended in small stainless vessels below forty-eight degrees Celsius,
              allowing wild African beeswax, cold-pressed Cape jojoba, and pure aromatic resins to
              marry without scorching.
            </p>
            <p className="text-base text-[#5A554E] leading-relaxed">
              Once poured into individual metallic pans, bars rest for twenty-eight days in dark
              travertine-lined racks before hand-stamping and inspection.
            </p>
          </div>

          <div className="border-t border-[#161412]/10 pt-6 grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-display text-2xl text-[#161412] tabular-nums">100%</p>
              <p className="text-xs text-[#5A554E] mt-1">Alcohol & propellant free</p>
            </div>
            <div>
              <p className="font-display text-2xl text-[#161412] tabular-nums">R370</p>
              <p className="text-xs text-[#5A554E] mt-1">Accessible luxury entry price</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: Material Architecture */}
      <section
        data-reveal="visible"
        className="editorial-reveal border-t border-[#161412]/10 pt-20 space-y-12"
      >
        <div className="max-w-2xl space-y-4">
          <p className="text-xs font-medium tracking-widest uppercase text-[#8C6A43]">
            02. Ingredient Provenance
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-[#161412]">
            Four raw pillars behind every bar.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
          <div className="border-t border-[#161412]/15 pt-5 space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#8C6A43]">01 · Carrier</p>
            <h3 className="font-display text-2xl font-medium text-[#161412]">Unrefined Beeswax</h3>
            <p className="text-sm text-[#5A554E] leading-relaxed">
              Sourced from wild-foraging Western Cape apiaries to lock fragrance close to body heat.
            </p>
          </div>

          <div className="border-t border-[#161412]/15 pt-5 space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#8C6A43]">02 · Emollient</p>
            <h3 className="font-display text-2xl font-medium text-[#161412]">Golden Jojoba</h3>
            <p className="text-sm text-[#5A554E] leading-relaxed">
              Structurally closest to natural skin lipids, absorbing cleanly without residue on cuffs.
            </p>
          </div>

          <div className="border-t border-[#161412]/15 pt-5 space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#8C6A43]">03 · Concentrates</p>
            <h3 className="font-display text-2xl font-medium text-[#161412]">Botanical Absolutes</h3>
            <p className="text-sm text-[#5A554E] leading-relaxed">
              Somali myrrh, Tunisian neroli, Calabrian bergamot, and aged agarwood resin.
            </p>
          </div>

          <div className="border-t border-[#161412]/15 pt-5 space-y-2">
            <p className="text-xs uppercase tracking-widest text-[#8C6A43]">04 · Vessel</p>
            <h3 className="font-display text-2xl font-medium text-[#161412]">Brushed Brass</h3>
            <p className="text-sm text-[#5A554E] leading-relaxed">
              Precision-milled pocket tins built for years of refill pans rather than landfill glass.
            </p>
          </div>
        </div>
      </section>

      {/* Chapter 4: Closing Visual CTA */}
      <section
        data-reveal="visible"
        className="editorial-reveal grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#EDE9E0]/60 p-8 md:p-12 border border-[#161412]/10"
      >
        <div className="lg:col-span-7 space-y-4">
          <p className="text-xs font-medium tracking-widest uppercase text-[#8C6A43]">
            Sophisticated Luxury Smell
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-[#161412]">
            Experience solid perfumery in your own rhythm.
          </h2>
          <p className="text-sm text-[#5A554E] max-w-lg leading-relaxed">
            Discover all six small-batch bars—each formulated to travel effortlessly and deepen
            across eight hours of wear.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 text-xs font-semibold tracking-widest uppercase bg-[#161412] text-[#F6F4EF] hover:bg-[#8C6A43] transition-colors cursor-pointer"
            >
              Browse the Collection
              <ArrowRight size={14} strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <div className="lg:col-span-5">
          <ResilientImage
            src="/src/assets/images/bar_amber_resin_1795179463304.jpg"
            alt="Engraved bronze Cartide solid perfume compact with amber resin"
            containerClassName="aspect-[4/3] w-full"
            className="w-full h-full object-cover"
            fallbackTitle="Engraved Vessel"
          />
        </div>
      </section>
    </div>
  );
}
