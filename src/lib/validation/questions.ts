import { z } from "zod";

export const subjectCreateSchema = z.object({
  name: z.string().trim().min(2).max(120),
  description: z.string().trim().min(1).max(500),
});

export const topicCreateSchema = z.object({
  subjectId: z.string().trim().min(1),
  name: z.string().trim().min(1).max(120),
});

const baseQuestionFields = {
  subjectId: z.string().trim().min(1),
  topicId: z.string().trim().min(1).optional(),
  topicName: z.string().trim().min(1).max(120).optional(),
  prompt: z.string().trim().min(5).max(8000),
  options: z.array(z.string().trim().min(1)).min(2).max(8),
  answerIndex: z.number().int().min(0),
  explanation: z.string().trim().max(4000).optional(),
};

export const studyQuestionCreateSchema = z
  .object({
    ...baseQuestionFields,
    mode: z.literal("STUDY").default("STUDY"),
  })
  .superRefine((val, ctx) => {
    if (val.answerIndex >= val.options.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "answerIndex out of range",
        path: ["answerIndex"],
      });
    }
  });

export const cbtQuestionCreateSchema = z
  .object({
    ...baseQuestionFields,
    mode: z.literal("CBT").default("CBT"),
    year: z.number().int().min(1980).max(2100),
    exam: z.string().trim().min(1).max(40).default("JAMB"),
  })
  .superRefine((val, ctx) => {
    if (val.answerIndex >= val.options.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "answerIndex out of range",
        path: ["answerIndex"],
      });
    }
  });

export const questionListQuerySchema = z.object({
  subjectId: z.string().trim().optional(),
  mode: z.enum(["STUDY", "CBT"]).optional(),
  topicId: z.string().trim().optional(),
  year: z.coerce.number().int().optional(),
  search: z.string().trim().max(200).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type SubjectCreateInput = z.infer<typeof subjectCreateSchema>;
export type TopicCreateInput = z.infer<typeof topicCreateSchema>;
export type StudyQuestionCreateInput = z.infer<typeof studyQuestionCreateSchema>;
export type CbtQuestionCreateInput = z.infer<typeof cbtQuestionCreateSchema>;
export type QuestionListQuery = z.infer<typeof questionListQuerySchema>;
