import { createClient, type Client } from "@libsql/client";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";
import * as schema from "./schema";

export type Database = LibSQLDatabase<typeof schema>;

let client: Client | null = null;
let db: Database | null = null;

/**
 * Returns a configured Drizzle client.
 * - Prefer TURSO_DATABASE_URL + TURSO_AUTH_TOKEN for remote Turso.
 * - Fall back to DATABASE_URL (file: or libsql:) for local/dev/test.
 * - In test environments without credentials, uses an in-memory database.
 */
export function getDb(): Database {
  if (db) return db;

  const url =
    process.env.TURSO_DATABASE_URL ||
    process.env.DATABASE_URL ||
    "file:local.db";

  const authToken =
    process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN;

  // In-memory for isolated unit/integration tests when explicitly requested
  const resolvedUrl =
    process.env.NODE_ENV === "test" && process.env.USE_MEMORY_DB === "1"
      ? ":memory:"
      : url;

  client = createClient({
    url: resolvedUrl,
    authToken: authToken || undefined,
  });

  db = drizzle(client, { schema });
  return db;
}

/** Reset cached client (useful in tests). */
export function resetDbCache(): void {
  client = null;
  db = null;
}

export * from "./schema";
