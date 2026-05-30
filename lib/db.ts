import { neon } from "@neondatabase/serverless";

/**
 * Neon serverless Postgres client.
 *
 * `DATABASE_URL` is the pooled connection string from the Neon dashboard
 * (Project → Connection Details → "Pooled connection"). It is only ever read
 * on the server — never expose it to the browser.
 *
 * The client is lazily created so the app still builds/renders when the env
 * var is absent (e.g. during a UI-only preview); the route handlers surface a
 * clear error if a request comes in without it configured.
 */
let _sql: ReturnType<typeof neon> | null = null;

export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (!_sql) _sql = neon(url);
  return _sql;
}

export const isDbConfigured = () => Boolean(process.env.DATABASE_URL);

/**
 * Creates the tables the site needs if they don't already exist.
 * Safe to call repeatedly. Invoked on demand by the API routes so a fresh
 * Neon database works without a manual migration step.
 */
export async function ensureSchema() {
  const sql = getSql();
  if (!sql) return;

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

  await sql`
    CREATE INDEX IF NOT EXISTS idx_chat_session ON chat_messages (session_id, created_at)
  `;
}
