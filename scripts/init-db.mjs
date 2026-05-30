// One-shot Neon schema setup. Run with: npm run db:init
// Requires DATABASE_URL in .env.local (the script loads it via --env-file).
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("✗ DATABASE_URL is not set. Add it to .env.local first.");
  process.exit(1);
}

const sql = neon(url);

await sql`
  CREATE TABLE IF NOT EXISTS contact_inquiries (
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name         TEXT        NOT NULL,
    email        TEXT        NOT NULL,
    event_date   TEXT,
    service      TEXT,
    message      TEXT        NOT NULL,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

await sql`
  CREATE TABLE IF NOT EXISTS chat_messages (
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    session_id   TEXT        NOT NULL,
    role         TEXT        NOT NULL,
    content      TEXT        NOT NULL,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
  )
`;

await sql`CREATE INDEX IF NOT EXISTS idx_chat_session ON chat_messages (session_id, created_at)`;

console.log("✓ Neon schema ready: contact_inquiries, chat_messages");
