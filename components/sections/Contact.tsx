"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { studio } from "@/lib/studio";
import { Reveal } from "@/components/Reveal";

type Status = "idle" | "sending" | "ok" | "error";

export function Contact() {
  const { t } = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || t.chat.error);
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : t.chat.error);
    }
  }

  const field =
    "w-full rounded-xl border border-gold/15 bg-white/[0.03] px-4 py-3 text-sm text-cream placeholder:text-mute/60 outline-none transition-colors focus:border-rose/60";

  return (
    <section className="snap-panel wash-gold flex flex-col">
      <div className="mx-auto flex w-full max-w-7xl flex-1 items-center px-6 py-20 md:px-10">
        <div className="grid w-full gap-12 md:grid-cols-2 md:items-center">
          {/* Left: invitation + details */}
          <div>
            <Reveal>
              <p className="eyebrow mb-4">{t.contact.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl font-light text-cream sm:text-5xl md:text-6xl">
                {t.contact.heading}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-mute">
                {t.contact.sub}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-9">
                <p className="eyebrow mb-4 text-mute">{t.contact.details}</p>
                <ul className="space-y-2.5 text-cream/90">
                  <li>
                    <a className="transition-colors hover:text-gold-bright" href={`mailto:${studio.email}`}>
                      {studio.email}
                    </a>
                  </li>
                  {studio.phones.map((phone) => (
                    <li key={phone} dir="ltr" className="rtl:text-right">
                      <a
                        className="transition-colors hover:text-gold-bright"
                        href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                      >
                        {phone}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      className="inline-flex items-center gap-2 text-gold transition-colors hover:text-gold-bright"
                      href={studio.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
                      </svg>
                      Facebook
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.15} amount={0.2}>
            <form onSubmit={onSubmit} className="glass rounded-3xl p-6 md:p-8">
              <div className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <input name="name" required placeholder={t.contact.name} className={field} />
                  <input name="email" type="email" required placeholder={t.contact.email} className={field} />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <input name="eventDate" type="text" placeholder={t.contact.date} className={field} />
                  <select name="service" defaultValue="" className={`${field} appearance-none`}>
                    <option value="" disabled>{t.contact.pick}</option>
                    {t.services.items.map((s) => (
                      <option key={s.title} value={s.title} className="bg-ink">
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder={t.contact.message}
                  className={`${field} resize-none`}
                />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-1 rounded-xl bg-gradient-to-r from-rose to-rose-deep py-3.5 text-sm font-medium tracking-wide text-cream shadow-[0_12px_40px_-14px_rgba(225,29,54,0.9)] transition-transform hover:scale-[1.02] disabled:opacity-60"
                >
                  {status === "sending" ? t.contact.sending : t.contact.send}
                </button>

                {status === "ok" && (
                  <p className="text-center text-sm text-gold-bright">{t.contact.success}</p>
                )}
                {status === "error" && (
                  <p className="text-center text-sm text-rose-bright">{error}</p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>

      {/* Footer strip */}
      <footer className="border-t border-gold/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-sm text-mute md:flex-row md:px-10">
          <span className="font-display text-lg text-cream">
            {t.brand} <span className="text-mute">— {t.footer.tagline}</span>
          </span>
          <span>
            © {new Date().getFullYear()} {t.brand}. {t.footer.rights}
          </span>
        </div>
      </footer>
    </section>
  );
}
