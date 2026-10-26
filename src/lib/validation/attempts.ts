import { z } from "zod";

export const startCbtSchema = z.object({
  subjectId: z.string().trim().min(1),
  year: z.number().int().min(1980).max(2100).optional(),
  count: z.number().int().min(1).max(60).optional(),
  /** Duration in minutes; default 60 */
  durationMinutes: z.number().int().min(5).max(240).optional(),
});

export const saveAnswersSchema = z.object({
  attemptId: z.string().trim().min(1),
  answers: z
    .array(
      z.object({
        questionId: z.string().trim().min(1),
        selectedIndex: z.number().int().min(0).nullable(),
      }),
    )
    .max(100),
});

export const submitCbtSchema = z.object({
  attemptId: z.string().trim().min(1),
  answers: z
    .array(
      z.object({
        questionId: z.string().trim().min(1),
        selectedIndex: z.number().int().min(0).nullable(),
      }),
    )
    .max(100)
    .optional(),
});

export type StartCbtInput = z.infer<typeof startCbtSchema>;
export type SaveAnswersInput = z.infer<typeof saveAnswersSchema>;
export type SubmitCbtInput = z.infer<typeof submitCbtSchema>;
