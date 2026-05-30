"use client";

import { useLang } from "@/lib/i18n";

export function SectionDots({
  count,
  active,
  onNavigate,
}: {
  count: number;
  active: number;
  onNavigate: (i: number) => void;
}) {
  const { lang } = useLang();
  const side = lang === "ar" ? { left: "1.5rem" } : { right: "1.5rem" };

  return (
    <div
      className="fixed top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex"
      style={side}
    >
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onNavigate(i)}
          aria-label={`Go to section ${i + 1}`}
          className="group relative grid place-items-center"
        >
          <span
            className="rounded-full transition-all duration-300"
            style={{
              width: active === i ? "10px" : "7px",
              height: active === i ? "10px" : "7px",
              background: active === i ? "var(--color-rose)" : "rgba(244,237,233,0.3)",
              boxShadow: active === i ? "0 0 14px rgba(225,29,54,0.9)" : "none",
            }}
          />
        </button>
      ))}
    </div>
  );
}
