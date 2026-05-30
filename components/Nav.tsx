"use client";

import { useLang } from "@/lib/i18n";

interface NavProps {
  active: number;
  onNavigate: (index: number) => void;
}

export function Nav({ active, onNavigate }: NavProps) {
  const { t, toggle, lang } = useLang();

  // index map matches the panel order in Site.tsx
  const links = [
    { i: 1, label: t.nav.about },
    { i: 2, label: t.nav.work },
    { i: 3, label: t.nav.services },
    { i: 5, label: t.nav.contact },
  ];

  const scrolled = active > 0;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "linear-gradient(to bottom, rgba(8,5,10,0.82), rgba(8,5,10,0))"
          : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        {/* Brand */}
        <button
          onClick={() => onNavigate(0)}
          className="group flex items-center gap-2.5"
          aria-label={t.brand}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="rec-dot absolute inline-flex h-2.5 w-2.5 rounded-full bg-rose" />
          </span>
          <span className="font-display text-2xl font-semibold tracking-wide text-cream">
            {t.brand}
          </span>
        </button>

        {/* Center links */}
        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <button
              key={l.i}
              onClick={() => onNavigate(l.i)}
              className="relative text-sm tracking-wide text-mute transition-colors hover:text-cream data-[on=true]:text-cream"
              data-on={active === l.i}
            >
              {l.label}
              <span
                className="absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300"
                style={{ width: active === l.i ? "100%" : "0%" }}
              />
            </button>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="rounded-full border border-gold/30 px-3 py-1.5 text-xs font-medium tracking-wide text-gold transition-colors hover:border-gold/70 hover:text-gold-bright"
            aria-label="Switch language"
            lang={lang === "en" ? "ar" : "en"}
          >
            {t.langToggle}
          </button>
          <button
            onClick={() => onNavigate(5)}
            className="hidden rounded-full bg-gradient-to-r from-rose to-rose-deep px-5 py-2 text-sm font-medium text-cream shadow-[0_8px_30px_-10px_rgba(225,29,54,0.8)] transition-transform hover:scale-[1.03] sm:block"
          >
            {t.nav.book}
          </button>
        </div>
      </div>
    </header>
  );
}
