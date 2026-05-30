"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

const ROSE_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIzMiI+PHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjMyIiBmaWxsPSIjMGMwNzA5Ii8+PGNpcmNsZSBjeD0iMTMiIGN5PSIxNCIgcj0iOSIgZmlsbD0iIzhjMGYyMyIgb3BhY2l0eT0iMC41NSIvPjxjaXJjbGUgY3g9IjEzIiBjeT0iMTMiIHI9IjQiIGZpbGw9IiNlMTFkMzYiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==";

const SLIDE_MS = 5000;

export function Hero({ go }: { go: (i: number) => void }) {
  const { t } = useLang();
  const [slide, setSlide] = useState(0);

  // The two stories the hero cycles through. Copy comes from the dictionary so
  // both stay localised; the imagery and framing differ per slide.
  const slides = [
    {
      content: t.hero,
      src: "/rose-hero.png",
      alt: "A wedding couple framed in light",
      fit: "object-contain object-center md:object-right",
      scale: "scale-100",
      blur: ROSE_BLUR,
      priority: true,
    },
    {
      content: t.heroDj,
      src: "/dj-hero.png",
      alt: "A DJ booth with turntables and speakers",
      fit: "object-contain object-center",
      scale: "scale-[0.82]",
      blur: undefined as string | undefined,
      priority: false,
    },
  ];

  // Auto-advance every few seconds.
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  const s = slides[slide];

  return (
    <section className="snap-panel viewfinder wash-rose flex items-center overflow-hidden">
      <span className="vf-tl" />
      <span className="vf-br" />

      {/* Two columns: copy + image. They never overlap, so text can't be clipped. */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 px-6 pt-24 pb-16 md:grid-cols-[1.15fr_0.85fr] md:gap-10 md:px-10 md:pt-0 md:pb-0">
        {/* Copy */}
        <div className="order-2 max-w-2xl md:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="eyebrow mb-5"
              >
                {s.content.kicker}
              </motion.p>

              <h1 className="font-display font-light leading-[1.02] text-[clamp(2.25rem,5vw,4rem)]">
                <motion.span
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-cream md:whitespace-nowrap"
                >
                  {s.content.titleA}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="block italic text-gradient-rose pb-2 md:whitespace-nowrap"
                >
                  {s.content.titleB}
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.38 }}
                className="mt-6 max-w-lg text-lg leading-relaxed text-mute md:text-xl"
              >
                {s.content.sub}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-9 flex flex-wrap items-center gap-4"
              >
                <button
                  onClick={() => go(5)}
                  className="rounded-full bg-gradient-to-r from-rose to-rose-deep px-7 py-3.5 text-sm font-medium tracking-wide text-cream shadow-[0_12px_40px_-12px_rgba(225,29,54,0.9)] transition-transform hover:scale-[1.04]"
                >
                  {s.content.ctaPrimary}
                </button>
                <button
                  onClick={() => go(2)}
                  className="group flex items-center gap-2 rounded-full border border-gold/30 px-7 py-3.5 text-sm font-medium tracking-wide text-cream transition-colors hover:border-gold/70"
                >
                  {s.content.ctaSecondary}
                  <span className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">
                    →
                  </span>
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Slide indicators */}
          <div className="mt-8 flex items-center gap-2.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                aria-label={`Show slide ${i + 1}`}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: slide === i ? "30px" : "10px",
                  background: slide === i ? "var(--color-rose)" : "rgba(244,237,233,0.25)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="relative order-1 h-[32vh] w-full sm:h-[40vh] md:order-2 md:h-[74vh]">
          {/* soft glow behind the subject */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(225,29,54,0.25),transparent_62%)]" />
          <div className="float-soft relative h-full w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  priority={s.priority}
                  quality={70}
                  sizes="(max-width: 768px) 90vw, 45vw"
                  className={`${s.fit} ${s.scale}`}
                  {...(s.blur ? { placeholder: "blur" as const, blurDataURL: s.blur } : {})}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => go(1)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-mute"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">{t.hero.scroll}</span>
        <span className="relative h-9 w-[1.5px] overflow-hidden bg-cream/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-3 bg-gold"
            animate={{ y: [-12, 36] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.button>
    </section>
  );
}
