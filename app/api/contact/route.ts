import { NextResponse } from "next/server";
import { ensureSchema, getSql, isDbConfigured } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(v: unknown, max = 1000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const eventDate = clean(body.eventDate, 60);
  const service = clean(body.service, 60);
  const message = clean(body.message, 4000);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please share your name, email and a short message." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "That email doesn't look right." }, { status: 400 });
  }

  if (!isDbConfigured()) {
    // No database wired up yet — accept gracefully so the UI still confirms.
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    await ensureSchema();
    const sql = getSql();
    await sql!`
      INSERT INTO contact_inquiries (name, email, event_date, service, message)
      VALUES (${name}, ${email}, ${eventDate || null}, ${service || null}, ${message})
    `;
    return NextResponse.json({ ok: true, stored: true });
  } catch (err) {
    console.error("Contact insert failed:", err);
    return NextResponse.json(
      { error: "We couldn't save that just now. Please email us directly." },
      { status: 500 },
    );
  }
}
