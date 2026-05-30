"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

export function Hero({ go }: { go: (i: number) => void }) {
  const { t } = useLang();

  return (
    <section className="snap-panel viewfinder wash-rose flex items-center overflow-hidden">
      <span className="vf-tl" />
      <span className="vf-br" />

      {/* REC marker — echoes the dashboard */}
      <div className="absolute end-8 top-24 z-20 flex items-center gap-2 md:top-28">
        <span className="rec-dot h-2.5 w-2.5 rounded-full bg-rose" />
        <span className="text-xs tracking-[0.3em] text-cream/70">{t.hero.rec}</span>
      </div>

      {/* Two columns: copy + rose. They never overlap, so text can't be clipped. */}
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 px-6 pt-24 pb-16 md:grid-cols-2 md:gap-10 md:px-10 md:pt-0 md:pb-0">
        {/* Copy */}
        <div className="order-2 max-w-xl md:order-1">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="eyebrow mb-5"
          >
            {t.hero.kicker}
          </motion.p>

          <h1 className="font-display font-light leading-[0.98] text-[clamp(2.75rem,8vw,5.5rem)]">
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
              className="block italic text-gradient-rose pb-2"
            >
              {t.hero.titleB}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 max-w-md text-base leading-relaxed text-mute md:text-lg"
          >
            {t.hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.74 }}
            className="mt-9 flex flex-wrap items-center gap-4"
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
              <span className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1">
                →
              </span>
            </button>
          </motion.div>
        </div>

        {/* Rose */}
        <motion.div
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative order-1 h-[30vh] w-full sm:h-[36vh] md:order-2 md:h-[68vh]"
        >
          {/* soft glow behind the bloom */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(225,29,54,0.25),transparent_62%)]" />
          <div className="float-soft relative h-full w-full">
            <Image
              src="/rose-hero.png"
              alt="A single crimson rose framed in a camera viewfinder"
              fill
              priority
              sizes="(max-width: 768px) 90vw, 50vw"
              className="object-contain object-center"
            />
          </div>
        </motion.div>
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
