/**
 * Idempotent content seeder for bundled JAMB / practice questions.
 *
 * Usage (after npm install and DB is reachable):
 *   npx tsx src/lib/db/seed-content.ts
 *   npx tsx src/lib/db/seed-content.ts --dry-run
 *
 * Never invoke from a request handler or automatic deploy step.
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { eq } from "drizzle-orm";
import { getDb, subjects, topics, questions } from "@/lib/db";
import { createId } from "@/lib/security/id";
import {
  validateBundledQuestion,
  validateManifest,
  type BundledQuestion,
  type ContentManifest,
} from "@/lib/validation/content";
import { contentManifest } from "@/lib/content/manifest";

const CONTENT_ROOT = path.join(process.cwd(), "content", "jamb");

export interface SeedStats {
  subjectsCreated: number;
  topicsCreated: number;
  questionsInserted: number;
  questionsUpdated: number;
  questionsUnchanged: number;
  questionsRejected: number;
  rejectionDetails: string[];
}

function slugifyTopic(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

async function loadQuestionFile(
  relativePath: string,
  subjectSlug: string,
): Promise<BundledQuestion[]> {
  const full = path.join(CONTENT_ROOT, relativePath);
  const raw = JSON.parse(await readFile(full, "utf8")) as {
    subjectSlug?: string;
    questions?: unknown[];
  };

  if (!Array.isArray(raw.questions)) {
    throw new Error(`${relativePath}: missing questions array`);
  }

  const accepted: BundledQuestion[] = [];
  for (const [index, item] of raw.questions.entries()) {
    const enriched = {
      subjectSlug: (item as { subjectSlug?: string })?.subjectSlug || subjectSlug,
      ...(typeof item === "object" && item ? item : {}),
    };
    const result = validateBundledQuestion(enriched);
    if (!result.ok) {
      throw new Error(
        `${relativePath}[${index}]: ${result.errors.join("; ")}`,
      );
    }
    accepted.push(result.data);
  }
  return accepted;
}

export async function seedContent(options: {
  dryRun?: boolean;
  manifest?: ContentManifest;
}): Promise<SeedStats> {
  const dryRun = Boolean(options.dryRun);
  const manifestResult = validateManifest(options.manifest ?? contentManifest);
  if (!manifestResult.ok) {
    throw new Error(`Invalid manifest: ${manifestResult.errors.join("; ")}`);
  }
  const manifest = manifestResult.data;

  const stats: SeedStats = {
    subjectsCreated: 0,
    topicsCreated: 0,
    questionsInserted: 0,
    questionsUpdated: 0,
    questionsUnchanged: 0,
    questionsRejected: 0,
    rejectionDetails: [],
  };

  // Collect all questions first (validate everything before writing)
  const allQuestions: BundledQuestion[] = [];
  const seenContentIds = new Set<string>();

  for (const subject of manifest.subjects) {
    for (const file of subject.files) {
      const batch = await loadQuestionFile(file, subject.slug);
      for (const q of batch) {
        if (seenContentIds.has(q.contentId)) {
          stats.questionsRejected += 1;
          stats.rejectionDetails.push(
            `Duplicate contentId in pack: ${q.contentId}`,
          );
          continue;
        }
        seenContentIds.add(q.contentId);
        if (q.subjectSlug !== subject.slug) {
          stats.questionsRejected += 1;
          stats.rejectionDetails.push(
            `${q.contentId}: subjectSlug mismatch (expected ${subject.slug})`,
          );
          continue;
        }
        allQuestions.push(q);
      }
    }
  }

  if (dryRun) {
    // Report only
    stats.questionsInserted = allQuestions.length;
    return stats;
  }

  const db = getDb();

  // Ensure subjects
  const subjectIdBySlug = new Map<string, string>();
  for (const entry of manifest.subjects) {
    const existing = await db
      .select()
      .from(subjects)
      .where(eq(subjects.name, entry.name))
      .limit(1);

    if (existing[0]) {
      subjectIdBySlug.set(entry.slug, existing[0].id);
    } else {
      const id = createId("sub");
      await db.insert(subjects).values({
        id,
        name: entry.name,
        description: entry.description,
      });
      subjectIdBySlug.set(entry.slug, id);
      stats.subjectsCreated += 1;
    }
  }

  // Topics + questions
  const topicIdByKey = new Map<string, string>();

  for (const q of allQuestions) {
    const subjectId = subjectIdBySlug.get(q.subjectSlug);
    if (!subjectId) {
      stats.questionsRejected += 1;
      stats.rejectionDetails.push(`${q.contentId}: missing subject`);
      continue;
    }

    let topicId: string | null = null;
    const topicName = q.topicName?.trim();
    if (topicName) {
      const topicSlug = q.topicSlug || slugifyTopic(topicName);
      const key = `${subjectId}::${topicSlug}`;
      if (topicIdByKey.has(key)) {
        topicId = topicIdByKey.get(key)!;
      } else {
        const existingTopics = await db
          .select()
          .from(topics)
          .where(eq(topics.subjectId, subjectId));
        const match = existingTopics.find(
          (t) => t.name.toLowerCase() === topicName.toLowerCase(),
        );
        if (match) {
          topicId = match.id;
          topicIdByKey.set(key, match.id);
        } else {
          const id = createId("top");
          await db.insert(topics).values({
            id,
            subjectId,
            name: topicName,
          });
          topicId = id;
          topicIdByKey.set(key, id);
          stats.topicsCreated += 1;
        }
      }
    }

    const existingQ = await db
      .select()
      .from(questions)
      .where(eq(questions.contentId, q.contentId))
      .limit(1);

    const payload = {
      subjectId,
      topicId,
      mode: q.mode,
      prompt: q.prompt,
      options: q.options,
      answerIndex: q.answerIndex,
      explanation: q.explanation ?? null,
      year: q.year ?? null,
      exam: q.exam ?? "JAMB",
      contentId: q.contentId,
      source: q.source,
      published: true,
      updatedAt: new Date(),
    };

    if (existingQ[0]) {
      const same =
        existingQ[0].prompt === payload.prompt &&
        JSON.stringify(existingQ[0].options) === JSON.stringify(payload.options) &&
        existingQ[0].answerIndex === payload.answerIndex &&
        existingQ[0].mode === payload.mode;
      if (same) {
        stats.questionsUnchanged += 1;
      } else {
        await db
          .update(questions)
          .set(payload)
          .where(eq(questions.contentId, q.contentId));
        stats.questionsUpdated += 1;
      }
    } else {
      await db.insert(questions).values({
        id: createId("q"),
        ...payload,
      });
      stats.questionsInserted += 1;
    }
  }

  return stats;
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  console.log(dryRun ? "Content seed DRY RUN" : "Content seed starting...");
  const stats = await seedContent({ dryRun });
  console.log(JSON.stringify(stats, null, 2));
  if (stats.questionsRejected > 0) {
    process.exitCode = 1;
  }
}

// Only run CLI when executed directly
const isMain =
  typeof process !== "undefined" &&
  process.argv[1] &&
  process.argv[1].includes("seed-content");

if (isMain) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
