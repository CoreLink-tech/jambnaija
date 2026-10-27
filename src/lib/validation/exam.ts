import { z } from "zod";
import { SUBJECTS } from "@/data/questions/types";

export const examStartSchema = z.object({
  subjects: z
    .array(z.enum(["english", "mathematics", "physics", "chemistry", "biology"]))
    .min(1)
    .max(5),
  yearFrom: z.number().int().min(2020).max(2026).optional(),
  yearTo: z.number().int().min(2020).max(2026).optional(),
  years: z.array(z.number().int()).optional(),
  origin: z.enum(["all", "original_practice", "official_past_question"]).optional(),
  count: z.number().int().min(5).max(200),
  durationMinutes: z.number().int().min(5).max(240).optional(),
  preset: z
    .enum(["single", "multi", "full"])
    .optional(),
});

export type ExamStartInput = z.infer<typeof examStartSchema>;

export function validateSubjects(subjects: string[]) {
  return subjects.every((s) => (SUBJECTS as string[]).includes(s));
}
