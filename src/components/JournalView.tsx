import { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { JOURNAL_ARTICLES, type JournalArticle } from '../data/catalog';
import { ResilientImage } from './ResilientImage';

export function JournalView() {
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(null);

  useEffect(() => {
    if (!activeArticle) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveArticle(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeArticle]);

  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-10 py-14 md:py-20">
      <div className="space-y-4 pb-12 border-b border-[#161412]/10">
        <p className="text-xs font-medium tracking-widest uppercase text-[#8C6A43]">
          The Journal · Essays & Formulation Notes
        </p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-[#161412]">
            Olfactory Monograph
          </h1>
          <p className="text-sm text-[#5A554E] max-w-md leading-relaxed">
            Reflections on solid scent architecture, raw botanical extraction, and tactile object
            permanence.
          </p>
        </div>
      </div>

      <div className="pt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {JOURNAL_ARTICLES.map((article) => (
          <article key={article.id} className="group flex flex-col justify-between">
            <div>
              <button
                type="button"
                onClick={() => setActiveArticle(article)}
                aria-label={`Read ${article.title}`}
                className="block w-full text-left cursor-pointer"
              >
                <ResilientImage
                  src={article.image}
                  alt={article.imageAlt}
                  containerClassName="aspect-[4/3] w-full"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  fallbackTitle={article.category}
                />
              </button>

              <div className="pt-5 space-y-2.5">
                <p className="text-xs text-[#5A554E]">
                  {article.category} <span aria-hidden="true">·</span> {article.date}{' '}
                  <span aria-hidden="true">·</span> {article.readTime}
                </p>
                <h2 className="font-display text-2xl font-medium leading-snug text-[#161412]">
                  <button
                    type="button"
                    onClick={() => setActiveArticle(article)}
                    className="text-left hover:text-[#8C6A43] transition-colors cursor-pointer"
                  >
                    {article.title}
                  </button>
                </h2>
                <p className="text-sm text-[#5A554E] leading-relaxed">{article.excerpt}</p>
              </div>
            </div>

            <div className="pt-5">
              <button
                type="button"
                onClick={() => setActiveArticle(article)}
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#161412] hover:text-[#8C6A43] transition-colors cursor-pointer"
              >
                Read Essay
                <ArrowRight size={13} strokeWidth={1.5} />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Article Reader Dialog */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#161412]/45 backdrop-blur-[2px]"
          role="presentation"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveArticle(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeArticle.title}
            className="w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-[#F6F4EF] text-[#161412] border border-[#161412]/15 p-6 md:p-10 shadow-2xl space-y-6"
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#161412]/10">
              <div className="space-y-1.5">
                <p className="text-xs text-[#8C6A43] uppercase tracking-widest">
                  {activeArticle.category} · {activeArticle.date}
                </p>
                <h2 className="font-display text-3xl font-medium leading-tight text-[#161412]">
                  {activeArticle.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                aria-label="Close essay"
                className="w-10 h-10 inline-flex items-center justify-center text-[#5A554E] hover:text-[#161412] transition-colors cursor-pointer shrink-0"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <ResilientImage
              src={activeArticle.image}
              alt={activeArticle.imageAlt}
              containerClassName="aspect-[16/9] w-full"
              className="w-full h-full object-cover"
              fallbackTitle={activeArticle.title}
            />

            <div className="space-y-4 text-base text-[#161412]/90 leading-relaxed">
              {activeArticle.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
