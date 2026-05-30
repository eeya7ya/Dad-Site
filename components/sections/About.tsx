"use client";

import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";

export function About() {
  const { t } = useLang();

  return (
    <section className="snap-panel wash-gold flex items-center">
      <div className="mx-auto grid w-full max-w-7xl gap-14 px-6 md:grid-cols-2 md:items-center md:px-10">
        {/* Left: heading + body */}
        <div>
          <Reveal>
            <p className="eyebrow mb-5">{t.about.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="whitespace-pre-line font-display text-4xl font-light leading-tight text-cream sm:text-5xl md:text-6xl">
              {t.about.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="hairline my-8 h-px w-40" />
          </Reveal>
          <Reveal delay={0.28}>
            <p className="max-w-md text-base leading-relaxed text-mute md:text-lg">
              {t.about.body}
            </p>
          </Reveal>
        </div>

        {/* Right: stats */}
        <div className="grid gap-5">
          {t.about.stats.map((s, i) => (
            <Reveal key={s.label} delay={0.15 + i * 0.12}>
              <div className="glass flex items-baseline justify-between gap-6 rounded-2xl px-7 py-6 transition-colors">
                <span className="font-display text-5xl font-semibold text-gradient-gold md:text-6xl">
                  {s.value}
                </span>
                <span className="text-end text-sm leading-snug text-mute">{s.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
