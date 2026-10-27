import { z } from "zod";
import { SUBJECTS } from "@/data/questions/types";

const subjectEnum = z.enum([
  "english",
  "mathematics",
  "physics",
  "chemistry",
  "biology",
  "government",
  "literature",
  "crs",
]);

export const examStartSchema = z.object({
  subjects: z.array(subjectEnum).min(1).max(8),
  yearFrom: z.number().int().min(2020).max(2026).optional(),
  yearTo: z.number().int().min(2020).max(2026).optional(),
  years: z.array(z.number().int()).optional(),
  origin: z
    .enum(["all", "original_practice", "official_past_question"])
    .optional(),
  count: z.number().int().min(5).max(400),
  countsPerSubject: z
    .record(z.string(), z.number().int().min(1).max(100))
    .optional(),
  durationMinutes: z.number().int().min(5).max(360).optional(),
  preset: z.enum(["single", "multi", "full"]).optional(),
});

export type ExamStartInput = z.infer<typeof examStartSchema>;

export function validateSubjects(subjects: string[]) {
  return subjects.every((s) => (SUBJECTS as string[]).includes(s));
}
