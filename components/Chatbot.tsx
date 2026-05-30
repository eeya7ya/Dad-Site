"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

export function Chatbot() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const sessionId = useRef<string>(
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2),
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open, busy]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setErr("");
    const next = [...msgs, { role: "user" as const, content: text }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, sessionId: sessionId.current, lang }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || t.chat.error);
      setMsgs([...next, { role: "assistant", content: json.reply }]);
    } catch (e) {
      setErr(e instanceof Error ? e.message : t.chat.error);
    } finally {
      setBusy(false);
    }
  }

  // Keep the launcher opposite the section dots: dots sit on the right in
  // English (left in Arabic), so the chat lives on the left (right in Arabic).
  const side = lang === "ar" ? { right: "1.5rem" } : { left: "1.5rem" };

  return (
    <>
      {/* Launcher */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 z-50 grid h-20 w-20 place-items-center overflow-hidden rounded-full border border-gold/40 bg-ink-soft/90 shadow-[0_10px_40px_-8px_rgba(216,178,90,0.5)] backdrop-blur"
        style={side}
        aria-label={t.chat.open}
      >
        <Image
          src="/chat-rings.png"
          alt=""
          fill
          sizes="80px"
          className="scale-[1.35] object-cover object-center drop-shadow-[0_2px_8px_rgba(216,178,90,0.6)]"
        />
        <span className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_30%,rgba(216,178,90,0.18),transparent_70%)]" />
        {!open && (
          <span className="rec-dot absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-ink bg-rose" />
        )}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-28 z-50 flex h-[min(38rem,calc(100vh-9rem))] w-[min(27rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-3xl border border-gold/25 bg-ink-soft/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            style={side}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-gold/15 bg-gradient-to-r from-rose-deep/40 to-transparent px-4 py-3.5">
              <Image src="/chat-rings.png" alt="" width={32} height={32} />
              <div className="flex-1">
                <p className="font-display text-lg leading-none text-cream">{t.chat.title}</p>
                <p className="mt-1 text-[0.7rem] text-mute">{t.chat.subtitle}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid h-7 w-7 place-items-center rounded-full text-mute transition-colors hover:bg-white/5 hover:text-cream"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              <Bubble role="assistant">{t.chat.greeting}</Bubble>
              {msgs.map((m, i) => (
                <Bubble key={i} role={m.role}>
                  {m.content}
                </Bubble>
              ))}
              {busy && (
                <Bubble role="assistant">
                  <span className="inline-flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-mute"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                      />
                    ))}
                  </span>
                </Bubble>
              )}
              {err && <p className="px-1 text-center text-xs text-rose-bright">{err}</p>}
            </div>

            {/* Composer */}
            <div className="border-t border-gold/15 p-3">
              <div className="flex items-center gap-2 rounded-full border border-gold/20 bg-white/[0.03] px-2 py-1.5">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder={t.chat.placeholder}
                  className="flex-1 bg-transparent px-2 text-sm text-cream placeholder:text-mute/60 outline-none"
                />
                <button
                  onClick={send}
                  disabled={busy || !input.trim()}
                  className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-rose to-rose-deep text-cream transition-transform hover:scale-105 disabled:opacity-40"
                  aria-label={t.chat.send}
                >
                  <span className="rtl:-scale-x-100">➤</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-br-sm bg-gradient-to-br from-rose to-rose-deep text-cream"
            : "rounded-bl-sm border border-gold/15 bg-white/[0.04] text-cream/90"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
