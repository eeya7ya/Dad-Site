"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Nav } from "@/components/Nav";
import { SectionDots } from "@/components/SectionDots";
import { Chatbot } from "@/components/Chatbot";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

const PANELS = 6;

export function Site() {
  const deckRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Scroll a given panel to the top of the deck.
  const go = useCallback((i: number) => {
    const deck = deckRef.current;
    if (!deck) return;
    const panel = deck.children[i] as HTMLElement | undefined;
    panel?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Track which panel fills the viewport so nav + dots stay in sync.
  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;
    const panels = Array.from(deck.children) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(panels.indexOf(entry.target as HTMLElement));
          }
        }
      },
      { root: deck, threshold: 0.55 },
    );

    panels.forEach((p) => observer.observe(p));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Nav active={active} onNavigate={go} />
      <SectionDots count={PANELS} active={active} onNavigate={go} />

      <main ref={deckRef} className="snap-deck">
        <Hero go={go} />
        <About />
        <Work />
        <Services go={go} />
        <Testimonials />
        <Contact />
      </main>

      <Chatbot />
    </>
  );
}
