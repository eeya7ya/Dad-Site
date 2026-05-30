"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

export function Hero({ go }: { go: (i: number) => void }) {
  const { t, lang } = useLang();
  const isAr = lang === "ar";

  // Fade the rose into the black on whichever side the text sits.
  const mask = isAr
    ? "linear-gradient(270deg, #000 35%, transparent 90%)"
    : "linear-gradient(90deg, #000 35%, transparent 90%)";

  return (
    <section className="snap-panel viewfinder wash-rose flex items-center overflow-hidden">
      <span className="vf-tl" />
      <span className="vf-br" />

      {/* REC marker — echoes the dashboard */}
      <div className="absolute right-10 top-24 z-20 flex items-center gap-2 md:top-28">
        <span className="rec-dot h-2.5 w-2.5 rounded-full bg-rose" />
        <span className="text-xs tracking-[0.3em] text-cream/70">{t.hero.rec}</span>
      </div>

      {/* The rose, fading into the dark */}
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-y-0 z-0 w-[78%] md:w-[60%]"
        style={{
          [isAr ? "left" : "right"]: 0,
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      >
        <div className="float-soft relative h-full w-full">
          <Image
            src="/rose-hero.png"
            alt="A single crimson rose framed in a camera viewfinder"
            fill
            priority
            sizes="(max-width: 768px) 78vw, 60vw"
            className="object-contain object-center opacity-95"
          />
        </div>
      </motion.div>


      {/* Copy */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="eyebrow mb-6"
          >
            {t.hero.kicker}
          </motion.p>

          <h1 className="font-display text-6xl font-light leading-[0.95] sm:text-7xl md:text-8xl">
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="block text-cream"
            >
              {t.hero.titleA}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
              className="block italic text-gradient-rose"
            >
              {t.hero.titleB}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-7 max-w-md text-base leading-relaxed text-mute md:text-lg"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.74 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => go(5)}
              className="rounded-full bg-gradient-to-r from-rose to-rose-deep px-7 py-3.5 text-sm font-medium tracking-wide text-cream shadow-[0_12px_40px_-12px_rgba(225,29,54,0.9)] transition-transform hover:scale-[1.04]"
            >
              {t.hero.ctaPrimary}
            </button>
            <button
              onClick={() => go(2)}
              className="group flex items-center gap-2 rounded-full border border-gold/30 px-7 py-3.5 text-sm font-medium tracking-wide text-cream transition-colors hover:border-gold/70"
            >
              {t.hero.ctaSecondary}
              <span className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                →
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => go(1)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-mute"
      >
        <span className="text-[0.65rem] tracking-[0.3em] uppercase">{t.hero.scroll}</span>
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
