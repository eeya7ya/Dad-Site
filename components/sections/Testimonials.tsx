"use client";

import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";

export function Testimonials() {
  const { t } = useLang();

  return (
    <section className="snap-panel wash-rose flex items-center">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="mb-10 text-center">
          <Reveal>
            <p className="eyebrow mb-4">{t.testimonials.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl font-light text-cream sm:text-5xl md:text-6xl">
              {t.testimonials.heading}
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {t.testimonials.quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.12} amount={0.2}>
              <figure className="glass flex h-full flex-col rounded-2xl p-7">
                <span className="font-display text-5xl leading-none text-rose/60">“</span>
                <blockquote className="mt-2 flex-1 text-lg leading-relaxed text-cream/90">
                  {q.quote}
                </blockquote>
                <figcaption className="mt-6">
                  <p className="font-display text-xl text-gradient-gold">{q.name}</p>
                  <p className="text-xs tracking-wide text-mute">{q.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
