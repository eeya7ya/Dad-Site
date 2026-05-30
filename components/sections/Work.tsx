"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { Reveal } from "@/components/Reveal";

// Distinct gradient washes so the placeholder frames read as an editorial set.
const tints = [
  "linear-gradient(150deg, #2a0a12, #6b0f1a 60%, #1a0609)",
  "linear-gradient(150deg, #1a0d06, #5a3a12 55%, #120a06)",
  "linear-gradient(150deg, #240810, #3d0c1c 60%, #100509)",
  "linear-gradient(150deg, #120a14, #4a1230 60%, #0c0710)",
  "linear-gradient(150deg, #1d0a0a, #7a1626 60%, #160708)",
];

export function Work() {
  const { t } = useLang();

  return (
    <section className="snap-panel wash-rose flex items-center">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal>
              <p className="eyebrow mb-4">{t.work.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl font-light text-cream sm:text-5xl md:text-6xl">
                {t.work.heading}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-xs text-sm leading-relaxed text-mute">{t.work.sub}</p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
          {/* Feature tile — the real rose */}
          <Reveal className="col-span-2 row-span-2" amount={0.2}>
            <figure className="viewfinder group relative h-full min-h-[220px] overflow-hidden rounded-2xl border border-gold/15 bg-ink-soft md:min-h-[440px]">
              <span className="vf-tl" />
              <span className="vf-br" />
              <Image
                src="/rose-hero.png"
                alt={t.work.categories[0]}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-6 transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute bottom-5 left-5 z-10">
                <span className="rec-dot mr-2 inline-block h-2 w-2 rounded-full bg-rose align-middle" />
                <span className="font-display text-2xl text-cream">{t.work.categories[0]}</span>
              </figcaption>
            </figure>
          </Reveal>

          {/* Editorial placeholder frames */}
          {t.work.categories.slice(1).map((label, i) => (
            <Reveal key={label} delay={0.08 * i} amount={0.2}>
              <figure
                className="group relative h-full min-h-[105px] overflow-hidden rounded-2xl border border-cream/5 md:min-h-[212px]"
                style={{ background: tints[i % tints.length] }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_30%_10%,rgba(255,255,255,0.12),transparent_60%)] transition-opacity duration-500 group-hover:opacity-70" />
                <figcaption className="absolute bottom-3 left-4 z-10 font-display text-lg text-cream/90 md:text-xl">
                  {label}
                </figcaption>
                <span className="absolute right-3 top-3 text-[0.6rem] tracking-[0.25em] text-cream/40">
                  {String(i + 2).padStart(2, "0")}
                </span>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
