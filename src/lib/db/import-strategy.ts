/**
 * Safe, idempotent data import strategy (PostgreSQL → Turso).
 *
 * This module defines the *process* and types. Actual production migration
 * must only run after explicit approval and a verified backup.
 *
 * Principles:
 * 1. Read-only against the source (old PostgreSQL).
 * 2. Transform records into the new SQLite schema shape.
 * 3. Upsert by stable identifiers (id / contentId / code).
 * 4. Never delete existing Turso rows unless explicitly instructed.
 * 5. Produce a migration report (inserted / updated / skipped / rejected).
 * 6. Support dry-run mode.
 */

export type ImportEntity =
  | "users"
  | "activation_codes"
  | "subjects"
  | "topics"
  | "questions"
  | "attempts"
  | "attempt_answers";

export interface ImportStats {
  entity: ImportEntity;
  inserted: number;
  updated: number;
  skipped: number;
  rejected: number;
  errors: string[];
}

export interface MigrationReport {
  startedAt: string;
  finishedAt: string;
  dryRun: boolean;
  stats: ImportStats[];
  notes: string[];
}

export interface SourceUser {
  id: string;
  email: string;
  username?: string | null;
  passwordHash: string;
  role: "STUDENT" | "ADMIN";
  status: "PENDING" | "ACTIVE" | "DEACTIVATED";
  planTier?: "STANDARD" | "PREMIUM" | null;
  trialPremiumEndsAt?: string | Date | null;
  deviceId?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface SourceQuestion {
  id: string;
  subjectId: string;
  topicId?: string | null;
  mode: "STUDY" | "CBT";
  prompt: string;
  options: string[] | unknown;
  answerIndex: number;
  explanation?: string | null;
  year?: number | null;
  exam?: string | null;
}

/**
 * Normalize options coming from PostgreSQL JSONB into a string array.
 */
export function normalizeOptions(raw: unknown): string[] | null {
  if (!Array.isArray(raw)) return null;
  const cleaned = raw.map((item) => String(item ?? "").trim()).filter(Boolean);
  return cleaned.length >= 2 ? cleaned : null;
}

/**
 * Validate that answerIndex is within bounds.
 */
export function isValidAnswerIndex(
  options: string[],
  answerIndex: number,
): boolean {
  return (
    Number.isInteger(answerIndex) &&
    answerIndex >= 0 &&
    answerIndex < options.length
  );
}

/**
 * Placeholder for the full import orchestrator.
 * Implementation will live behind an explicit CLI / admin command
 * and will never run automatically on deploy or request.
 */
export async function runDataMigration(options: {
  dryRun: boolean;
  sourceConnectionString?: string;
}): Promise<MigrationReport> {
  const startedAt = new Date().toISOString();
  const notes: string[] = [
    "Data migration is prepared but not executed against any production database.",
    "Provide an explicit source connection and approval before running.",
    `dryRun=${options.dryRun}`,
  ];

  return {
    startedAt,
    finishedAt: new Date().toISOString(),
    dryRun: options.dryRun,
    stats: [],
    notes,
  };
}
