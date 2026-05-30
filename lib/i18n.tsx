"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Lang = "en" | "ar";

/* ------------------------------------------------------------------ *
 *  Bilingual content. The brand name stays "Melody Strings" in Latin form
 *  even in Arabic (it's a trademark), but everything else is localised.
 * ------------------------------------------------------------------ */
export const dict = {
  en: {
    dir: "ltr",
    brand: "Melody Strings",
    langToggle: "العربية",
    nav: {
      home: "Home",
      about: "Studio",
      work: "Work",
      services: "Services",
      contact: "Contact",
      book: "Book a date",
    },
    hero: {
      rec: "REC",
      kicker: "Wedding · Engagement · Portrait",
      titleA: "Love,",
      titleB: "framed in light.",
      sub: "A fine-art photography studio capturing the once-in-a-lifetime — cinematic, warm, and made to outlast trends.",
      ctaPrimary: "Start your story",
      ctaSecondary: "View the work",
      scroll: "Scroll",
    },
    about: {
      eyebrow: "The Studio",
      heading: "We don't just take photos.\nWe keep time.",
      body: "Since 2014, Melody Strings has photographed couples and families who want more than a gallery — they want the feeling of the day, preserved. We shoot quietly, direct gently, and grade every frame by hand so it looks like you remember it, not like a filter.",
      stats: [
        { value: "10+", label: "Years behind the lens" },
        { value: "420", label: "Weddings documented" },
        { value: "60k", label: "Frames hand-graded a year" },
      ],
    },
    work: {
      eyebrow: "Selected Work",
      heading: "A look through the viewfinder",
      sub: "Stills from weddings, elopements and editorial sessions.",
      categories: [
        "Weddings",
        "Engagements",
        "Editorial",
        "Elopements",
        "Portraits",
        "Details",
      ],
    },
    services: {
      eyebrow: "What we offer",
      heading: "Coverage, crafted around you",
      processTitle: "How it works",
      items: [
        { title: "Weddings", from: "from $3,800", blurb: "Full-day cinematic coverage — from the quiet morning details to the last dance under the lights." },
        { title: "Engagements", from: "from $650", blurb: "A relaxed, golden-hour session to celebrate the yes — and warm up to the camera before the big day." },
        { title: "Portraits", from: "from $450", blurb: "Editorial portraiture for individuals, couples and families, shot in studio or on location." },
        { title: "Events & Elopements", from: "from $1,200", blurb: "Intimate elopements and milestone celebrations documented with the same fine-art eye." },
      ],
      process: [
        { step: "01", title: "Consultation", text: "We meet, talk vision, and map the day." },
        { step: "02", title: "The Shoot", text: "Direction that feels natural — never stiff." },
        { step: "03", title: "The Edit", text: "Hand-graded frames with our signature warmth." },
        { step: "04", title: "Heirloom", text: "Gallery, prints and an album built to last." },
      ],
    },
    testimonials: {
      eyebrow: "Kind words",
      heading: "Trusted with the big moments",
      quotes: [
        { quote: "They felt like guests, not vendors — and the photos make us cry every single time.", name: "Layla & Omar", role: "Wedding, Spring" },
        { quote: "Every frame looks like a film still. Worth every penny and then some.", name: "Sara M.", role: "Engagement" },
        { quote: "We forgot the camera was even there. That's the magic.", name: "The Haddad Family", role: "Portraits" },
      ],
    },
    contact: {
      eyebrow: "Let's talk",
      heading: "Tell us about your day",
      sub: "Share a few details and we'll reply within two business days.",
      name: "Your name",
      email: "Email",
      date: "Event date (optional)",
      service: "I'm interested in",
      message: "A little about the day",
      send: "Send inquiry",
      sending: "Sending…",
      success: "Thank you — your inquiry is in. We'll be in touch soon.",
      pick: "Select a service",
      details: "Or reach us directly",
    },
    chat: {
      open: "Chat with us",
      title: "Iris · Studio Concierge",
      subtitle: "Ask about dates, packages & pricing",
      greeting: "Hi, I'm Iris — the Melody Strings concierge. How can I help with your photography plans?",
      placeholder: "Type your message…",
      send: "Send",
      error: "Something went wrong. Please try again.",
    },
    footer: {
      tagline: "Love, framed in light.",
      rights: "All rights reserved.",
    },
  },

  ar: {
    dir: "rtl",
    brand: "Melody Strings",
    langToggle: "English",
    nav: {
      home: "الرئيسية",
      about: "الاستوديو",
      work: "أعمالنا",
      services: "الخدمات",
      contact: "تواصل",
      book: "احجز موعدك",
    },
    hero: {
      rec: "تسجيل",
      kicker: "أعراس · خطوبة · بورتريه",
      titleA: "الحبّ،",
      titleB: "مُؤطَّرٌ بالضوء.",
      sub: "استوديو تصوير فني يلتقط اللحظات التي لا تتكرر — بأسلوب سينمائي دافئ، صُنع ليبقى خالداً.",
      ctaPrimary: "ابدأ حكايتك",
      ctaSecondary: "شاهد الأعمال",
      scroll: "مرّر",
    },
    about: {
      eyebrow: "الاستوديو",
      heading: "نحن لا نلتقط الصور فحسب،\nبل نحفظ الزمن.",
      body: "منذ عام 2014، يوثّق Melody Strings قصص الأزواج والعائلات الذين يريدون أكثر من مجرد ألبوم — يريدون شعور اليوم محفوظاً. نصوّر بهدوء، ونوجّه بلطف، ونعالج كل لقطة يدوياً لتبدو كما تتذكرونها تماماً.",
      stats: [
        { value: "+10", label: "أعوام خلف العدسة" },
        { value: "420", label: "حفل زفاف موثّق" },
        { value: "60k", label: "لقطة معالَجة سنوياً" },
      ],
    },
    work: {
      eyebrow: "مختارات",
      heading: "نظرةٌ عبر عدسة الكاميرا",
      sub: "لقطات من الأعراس والخطوبات والجلسات الفنية.",
      categories: ["أعراس", "خطوبة", "تصوير فني", "زفاف حميمي", "بورتريه", "تفاصيل"],
    },
    services: {
      eyebrow: "ما نقدّمه",
      heading: "تغطية مصمَّمة من أجلك",
      processTitle: "كيف نعمل",
      items: [
        { title: "الأعراس", from: "تبدأ من $3,800", blurb: "تغطية سينمائية ليوم كامل — من تفاصيل الصباح الهادئة حتى آخر رقصة تحت الأضواء." },
        { title: "الخطوبة", from: "تبدأ من $650", blurb: "جلسة هادئة وقت الغروب للاحتفال بالموافقة — وللتآلف مع الكاميرا قبل اليوم الكبير." },
        { title: "البورتريه", from: "تبدأ من $450", blurb: "تصوير فني للأفراد والأزواج والعائلات، في الاستوديو أو في الموقع." },
        { title: "المناسبات", from: "تبدأ من $1,200", blurb: "حفلات حميمية ومناسبات مميزة موثّقة بالعين الفنية ذاتها." },
      ],
      process: [
        { step: "٠١", title: "الاستشارة", text: "نلتقي، نتحدث عن رؤيتك، ونخطّط لليوم." },
        { step: "٠٢", title: "التصوير", text: "توجيهٌ يبدو طبيعياً — دون تكلّف." },
        { step: "٠٣", title: "المعالجة", text: "لقطات معالَجة يدوياً بدفئنا المميّز." },
        { step: "٠٤", title: "الإرث", text: "ألبوم ومطبوعات صُنعت لتدوم." },
      ],
    },
    testimonials: {
      eyebrow: "كلماتٌ طيّبة",
      heading: "مَوضع ثقةٍ في أهم اللحظات",
      quotes: [
        { quote: "شعرنا بهم كضيوف لا كمتعهدين — والصور تبكينا في كل مرة.", name: "ليلى وعمر", role: "زفاف، الربيع" },
        { quote: "كل لقطة تبدو كمشهد من فيلم. تستحق كل قرش وأكثر.", name: "سارة م.", role: "خطوبة" },
        { quote: "نسينا وجود الكاميرا تماماً. هذا هو السحر.", name: "عائلة حداد", role: "بورتريه" },
      ],
    },
    contact: {
      eyebrow: "لنتحدّث",
      heading: "أخبرنا عن يومك",
      sub: "شارك بعض التفاصيل وسنردّ خلال يومَي عمل.",
      name: "الاسم",
      email: "البريد الإلكتروني",
      date: "تاريخ المناسبة (اختياري)",
      service: "أنا مهتم بـ",
      message: "نبذة عن اليوم",
      send: "إرسال الطلب",
      sending: "جارٍ الإرسال…",
      success: "شكراً لك — وصلنا طلبك، وسنتواصل معك قريباً.",
      pick: "اختر الخدمة",
      details: "أو تواصل معنا مباشرة",
    },
    chat: {
      open: "تحدّث معنا",
      title: "إيريس · مساعدة الاستوديو",
      subtitle: "اسأل عن المواعيد والباقات والأسعار",
      greeting: "مرحباً، أنا إيريس مساعِدة Melody Strings. كيف يمكنني مساعدتك في خطط تصويرك؟",
      placeholder: "اكتب رسالتك…",
      send: "إرسال",
      error: "حدث خطأ ما. حاول مرة أخرى.",
    },
    footer: {
      tagline: "الحبّ، مُؤطَّرٌ بالضوء.",
      rights: "جميع الحقوق محفوظة.",
    },
  },
} as const;

// Union of both language trees — they share an identical shape, so this gives
// components a single type to read from while allowing the `dir` literal to
// differ between "ltr" and "rtl".
export type Dict = (typeof dict)[Lang];

interface LangCtx {
  lang: Lang;
  t: Dict;
  toggle: () => void;
  setLang: (l: Lang) => void;
}

const Ctx = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Restore preference on mount.
  useEffect(() => {
    const saved = (typeof window !== "undefined" &&
      window.localStorage.getItem("rl-lang")) as Lang | null;
    if (saved === "ar" || saved === "en") setLangState(saved);
  }, []);

  // Keep <html dir/lang> and persistence in sync.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dict[lang].dir;
    window.localStorage.setItem("rl-lang", lang);
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(
    () => setLangState((p) => (p === "en" ? "ar" : "en")),
    [],
  );

  const value = useMemo<LangCtx>(
    () => ({ lang, t: dict[lang], toggle, setLang }),
    [lang, toggle, setLang],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang(): LangCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
