# Rose Lens

A fine-art photography studio website — bilingual (English / العربية), one-page-per-scroll, with a Neon serverless database and a Claude-powered AI concierge.

Built with **Next.js 15 (App Router)** · **Tailwind CSS v4** · **Framer Motion** · **Neon Postgres** · **Anthropic Claude Haiku 4.5**.

---

## Features

- **One page per scroll** — native CSS scroll-snap; every wheel/swipe lands on exactly one full-screen panel (no free scrolling).
- **Gradient UI** matched to the dashboard: crimson rose on near-black with gold accents, camera-viewfinder framing, and a blinking `REC` marker.
- **Arabic / English toggle** with full RTL layout switching (top-right of the nav). Preference is remembered.
- **AI concierge "Iris"** (floating ring icon) — answers questions about dates, packages and pricing via `claude-haiku-4-5`, replying in the active language. Conversations are logged to Neon.
- **Contact form** — inquiries saved to Neon Postgres.

## Sections

`Hero → Studio → Work → Services → Testimonials → Contact`

---

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the two values
npm run db:init              # creates the Neon tables (optional but recommended)
npm run dev                  # http://localhost:3000
```

### Environment variables

| Variable            | Purpose                                              |
| ------------------- | ---------------------------------------------------- |
| `DATABASE_URL`      | Neon **pooled** connection string (contact + chat logs) |
| `ANTHROPIC_API_KEY` | Claude API key for the Iris concierge                |

The site renders fully without these set — the contact form and chatbot simply
return a friendly "not configured yet" response until the keys are added.

---

## Architecture notes

- `app/api/chat/route.ts` — concierge endpoint. The studio facts form a **cached
  system prompt** (`cache_control: ephemeral`); the per-request language
  instruction is appended after the cached block so the prefix stays reusable.
- `app/api/contact/route.ts` — validates and stores inquiries in Neon.
- `lib/i18n.tsx` — all UI copy in EN + AR, plus the language context that flips
  `<html dir>`.
- `lib/db.ts` — lazy Neon client + `ensureSchema()` (auto-creates tables).
- `components/Site.tsx` — the scroll-snap deck + active-section tracking that
  drives the nav underline and side dots.

## Deploy

Designed for **Vercel**. Push the repo, import it, and set `DATABASE_URL` and
`ANTHROPIC_API_KEY` in the project's environment variables.
