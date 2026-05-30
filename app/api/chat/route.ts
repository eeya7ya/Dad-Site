import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { studio } from "@/lib/studio";
import { ensureSchema, getSql } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = "claude-haiku-4-5";
const MAX_TURNS = 16;

/**
 * The concierge persona + every studio fact the model is allowed to state.
 * Kept stable (no timestamps / per-request values) so it forms a cacheable
 * prefix — `cache_control: ephemeral` on the last system block caches it.
 */
const SYSTEM_PROMPT = `You are "Iris", the warm, polished AI concierge for ${studio.name}, a fine-art photography studio.

VOICE
- Gracious, calm and concise — like a thoughtful studio manager, not a salesperson.
- 1–3 short sentences per reply unless the guest asks for detail. Never use emoji.
- Speak as "we"/"our studio". If you don't know something, offer to take their details for the team.

WHAT THE STUDIO OFFERS
${studio.services
  .map((s) => `- ${s.title} (${s.from}): ${s.blurb}`)
  .join("\n")}

HOW WE WORK
${studio.process.map((p) => `- ${p.step} ${p.title}: ${p.text}`).join("\n")}

PRACTICAL DETAILS
- Studio: ${studio.name}, founded ${studio.founded}. ${studio.city}.
- Hours: ${studio.hours}.
- Email: ${studio.email} · Phone: ${studio.phones.join(" or ")} · Facebook: ${studio.facebook}.
- Tagline: "${studio.tagline}"

GUARDRAILS
- Only discuss ${studio.name}, photography, and booking. Politely redirect anything else.
- Never invent prices beyond the "from" figures above; for exact quotes, guide guests to the Contact section or to share their date and email so the team can follow up.
- Encourage booking a consultation when a guest shows interest.`;

type ChatRole = "user" | "assistant";
interface ChatMessage {
  role: ChatRole;
  content: string;
}

function sanitize(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        typeof m === "object" &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
}

async function logTurn(sessionId: string, role: string, content: string) {
  try {
    const sql = getSql();
    if (!sql) return;
    await ensureSchema();
    await sql`
      INSERT INTO chat_messages (session_id, role, content)
      VALUES (${sessionId}, ${role}, ${content})
    `;
  } catch (err) {
    // Logging must never break the chat experience.
    console.error("chat log failed:", err);
  }
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "The concierge is not configured yet (missing ANTHROPIC_API_KEY)." },
      { status: 503 },
    );
  }

  let body: { messages?: unknown; sessionId?: unknown; lang?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = sanitize(body.messages);
  const sessionId =
    typeof body.sessionId === "string" && body.sessionId ? body.sessionId : "anonymous";
  const lang = body.lang === "ar" ? "ar" : "en";
  const langDirective =
    lang === "ar"
      ? "Reply only in Modern Standard Arabic. Keep the brand name as \"Rose Lens\" in Latin letters."
      : "Reply only in English.";

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "Send a question to get started." }, { status: 400 });
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  try {
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 400,
      system: [
        {
          type: "text",
          text: SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
        // Volatile, per-request instruction goes AFTER the cached block so the
        // big system prefix stays cache-eligible.
        { type: "text", text: langDirective },
      ],
      messages,
    });

    const reply =
      response.content.find((b) => b.type === "text")?.text?.trim() ??
      "I'm sorry — could you rephrase that?";

    // Persist the exchange (best-effort, non-blocking for the response).
    void logTurn(sessionId, "user", messages[messages.length - 1].content);
    void logTurn(sessionId, "assistant", reply);

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Anthropic error:", err);
    return NextResponse.json(
      { error: "The concierge is briefly unavailable. Please try again in a moment." },
      { status: 502 },
    );
  }
}
