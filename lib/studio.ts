/**
 * Single source of truth for studio facts.
 * Used both by the UI and by the AI concierge's system prompt so the chatbot
 * never contradicts what's on the page.
 */
export const studio = {
  name: "Rose Lens",
  tagline: "Love, framed in light.",
  founded: 2014,
  city: "Based in the city, available worldwide",
  email: "hello@roselens.studio",
  phone: "+1 (212) 555-0147",
  instagram: "@roselens.studio",
  hours: "Studio consultations Tue–Sat, 10am–6pm",
  services: [
    {
      key: "weddings",
      title: "Weddings",
      blurb:
        "Full-day cinematic coverage — from the quiet morning details to the last dance under the lights.",
      from: "from $3,800",
    },
    {
      key: "engagements",
      title: "Engagements",
      blurb:
        "A relaxed, golden-hour session to celebrate the yes — and warm up to the camera before the big day.",
      from: "from $650",
    },
    {
      key: "portraits",
      title: "Portraits",
      blurb:
        "Editorial portraiture for individuals, couples and families, shot in studio or on location.",
      from: "from $450",
    },
    {
      key: "events",
      title: "Events & Elopements",
      blurb:
        "Intimate elopements and milestone celebrations documented with the same fine-art eye.",
      from: "from $1,200",
    },
  ],
  process: [
    { step: "01", title: "Consultation", text: "We meet, talk vision, and map the day." },
    { step: "02", title: "The Shoot", text: "Direction that feels natural — never stiff." },
    { step: "03", title: "The Edit", text: "Hand-graded frames with our signature warmth." },
    { step: "04", title: "Heirloom", text: "Gallery, prints and an album built to last." },
  ],
} as const;

export type Service = (typeof studio.services)[number];
