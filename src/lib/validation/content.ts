import { z } from "zod";

/**
 * Strict schema for bundled question content.
 * Invalid questions are rejected — never silently rewritten.
 */

export const contentOptionSchema = z
  .string()
  .trim()
  .min(1, "Option text cannot be empty.");

export const bundledQuestionSchema = z.object({
  contentId: z
    .string()
    .trim()
    .min(3)
    .max(120)
    .regex(
      /^[a-z0-9][a-z0-9._-]*$/i,
      "contentId must be alphanumeric with optional . _ -",
    ),
  subjectSlug: z
    .string()
    .trim()
    .toLowerCase()
    .min(2)
    .max(64)
    .regex(/^[a-z0-9-]+$/, "subjectSlug must be kebab-case"),
  topicSlug: z
    .string()
    .trim()
    .toLowerCase()
    .min(1)
    .max(80)
    .regex(/^[a-z0-9-]+$/, "topicSlug must be kebab-case")
    .optional(),
  topicName: z.string().trim().min(1).max(120).optional(),
  mode: z.enum(["STUDY", "CBT"]).default("CBT"),
  year: z.number().int().min(1980).max(2100).optional(),
  exam: z.string().trim().min(1).max(40).default("JAMB"),
  prompt: z.string().trim().min(5, "Question text is too short."),
  options: z
    .array(contentOptionSchema)
    .min(2, "At least 2 options required.")
    .max(8),
  answerIndex: z.number().int().min(0),
  explanation: z.string().trim().max(4000).optional(),
  source: z
    .enum([
      "official_past_question",
      "adapted",
      "original_practice",
      "sample",
      "unknown",
    ])
    .default("unknown"),
  verificationStatus: z
    .enum(["verified", "unverified", "disputed"])
    .default("unverified"),
  contentVersion: z.number().int().min(1).default(1),
}).superRefine((val, ctx) => {
  if (val.answerIndex >= val.options.length) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `answerIndex ${val.answerIndex} is out of range for ${val.options.length} options`,
      path: ["answerIndex"],
    });
  }
  if (val.mode === "CBT" && val.year == null) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "CBT questions should include a year",
      path: ["year"],
    });
  }
});

export type BundledQuestion = z.infer<typeof bundledQuestionSchema>;

export const subjectManifestEntrySchema = z.object({
  slug: z.string().trim().toLowerCase().min(2).max(64),
  name: z.string().trim().min(2).max(120),
  description: z.string().trim().min(1).max(500),
  files: z.array(z.string().min(1)).min(1),
});

export const contentManifestSchema = z.object({
  version: z.number().int().min(1),
  subjects: z.array(subjectManifestEntrySchema).min(1),
});

export type ContentManifest = z.infer<typeof contentManifestSchema>;

export function validateBundledQuestion(
  raw: unknown,
):
  | { ok: true; data: BundledQuestion }
  | { ok: false; errors: string[] } {
  const result = bundledQuestionSchema.safeParse(raw);
  if (result.success) return { ok: true, data: result.data };
  const errors = result.error.issues.map(
    (i) => `${i.path.join(".") || "(root)"}: ${i.message}`,
  );
  return { ok: false, errors };
}

export function validateManifest(
  raw: unknown,
):
  | { ok: true; data: ContentManifest }
  | { ok: false; errors: string[] } {
  const result = contentManifestSchema.safeParse(raw);
  if (result.success) return { ok: true, data: result.data };
  const errors = result.error.issues.map(
    (i) => `${i.path.join(".") || "(root)"}: ${i.message}`,
  );
  return { ok: false, errors };
}
