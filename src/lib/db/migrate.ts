/**
 * Explicit migration runner.
 * Call this from a controlled script or CI step — never from a request handler.
 *
 * Usage:
 *   npx tsx src/lib/db/migrate.ts
 * or via package.json script after drizzle-kit generate.
 */
import { migrate } from "drizzle-orm/libsql/migrator";
import { getDb } from "./index";

async function main() {
  const db = getDb();
  console.log("Applying migrations from ./drizzle ...");
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("Migrations applied successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
