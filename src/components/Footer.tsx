import type { ActivePage } from './Header';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-[#161412]/12 bg-[#EDE9E0]/55 text-[#161412]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 pb-14 border-b border-[#161412]/10">
          <div className="sm:col-span-2 lg:col-span-5 min-w-0 space-y-4">
            <p className="font-display text-2xl font-medium tracking-tight text-[#161412]">
              Cartide Bar Scents
            </p>
            <p className="font-display italic text-lg text-[#5A554E]">
              “Luxury begins where ordinary end.”
            </p>
            <p className="text-sm leading-relaxed text-[#5A554E] max-w-sm">
              Small-batch solid perfume bars hand-poured in Cape Town using raw beeswax,
              botanical absolutes, and precision-milled refillable vessels.
            </p>
          </div>

          <div className="lg:col-span-3 min-w-0 space-y-3">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-[#5A554E]">
              House
            </h2>
            <ul className="space-y-1 lg:space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('shop')}
                  className="text-[#161412] hover:text-[#8C6A43] transition-colors cursor-pointer"
                >
                  Shop Collection
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('story')}
                  className="text-[#161412] hover:text-[#8C6A43] transition-colors cursor-pointer"
                >
                  The Craft & Story
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('journal')}
                  className="text-[#161412] hover:text-[#8C6A43] transition-colors cursor-pointer"
                >
                  Olfactory Journal
                </button>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4 min-w-0 space-y-3">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-[#5A554E]">
              Atelier & Dispatch
            </h2>
            <p className="text-sm text-[#161412]">
              48 Bree Street Studio, Cape Town
            </p>
            <p className="text-sm text-[#5A554E]">
              Complimentary South African courier on orders above R700.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
              <a
                href="#atelier-dispatch"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('home');
                  window.setTimeout(() => {
                    document.getElementById('atelier-dispatch')?.scrollIntoView({ behavior: 'smooth' });
                  }, 60);
                }}
                className="inline-flex items-center text-[#161412] hover:text-[#8C6A43] underline underline-offset-4 decoration-[#161412]/25 transition-colors"
              >
                Instagram
              </a>
              <a
                href="mailto:atelier@cartidebarscents.com"
                className="inline-flex items-center min-w-0 max-w-full [overflow-wrap:anywhere] text-[#161412] hover:text-[#8C6A43] underline underline-offset-4 decoration-[#161412]/25 transition-colors"
              >
                atelier@cartidebarscents.com
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#5A554E]">
          <p>© {new Date().getFullYear()} Cartide Bar Scents. All rights reserved.</p>
          <p>Sophisticated Luxury smell · Small-Batch Solid Perfumery</p>
        </div>
      </div>
    </footer>
  );
}
