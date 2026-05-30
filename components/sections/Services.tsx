"use client";

import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";

export function Services({ go }: { go: (i: number) => void }) {
  const { t } = useLang();

  return (
    <section className="snap-panel wash-gold flex items-center">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="mb-8 text-center">
          <Reveal>
            <p className="eyebrow mb-4">{t.services.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl font-light text-cream sm:text-5xl md:text-6xl">
              {t.services.heading}
            </h2>
          </Reveal>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.items.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1} amount={0.2}>
              <article className="glass group flex h-full flex-col rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1.5">
                <span className="font-display text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-2xl text-cream">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mute">{s.blurb}</p>
                <span className="mt-5 text-sm font-medium tracking-wide text-gradient-gold">
                  {s.from}
                </span>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Process strip */}
        <div className="mt-10">
          <Reveal>
            <div className="mb-5 flex items-center gap-4">
              <span className="eyebrow">{t.services.processTitle}</span>
              <span className="hairline h-px flex-1" />
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {t.services.process.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <div className="flex items-start gap-3">
                  <span className="font-display text-3xl font-light text-rose/80">{p.step}</span>
                  <div>
                    <h4 className="font-display text-lg text-cream">{p.title}</h4>
                    <p className="text-xs leading-relaxed text-mute">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 text-center">
            <button
              onClick={() => go(5)}
              className="rounded-full bg-gradient-to-r from-rose to-rose-deep px-8 py-3.5 text-sm font-medium tracking-wide text-cream shadow-[0_12px_40px_-12px_rgba(225,29,54,0.9)] transition-transform hover:scale-[1.04]"
            >
              {t.nav.book}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
