import { createId } from "@/lib/security/id";
import { ValidationError, NotFoundError, ForbiddenError } from "@/lib/errors";
import {
  studyQuestionCreateSchema,
  cbtQuestionCreateSchema,
  questionListQuerySchema,
  type StudyQuestionCreateInput,
  type CbtQuestionCreateInput,
  type QuestionListQuery,
} from "@/lib/validation/questions";
import * as questionRepo from "@/server/repositories/questions";
import * as subjectRepo from "@/server/repositories/subjects";
import {
  requireAdminSession,
  requireStudentAccess,
  requirePremiumAccess,
} from "@/server/policies/auth";
import { isPremiumAccess } from "@/lib/auth/access";

/** Student-facing subject catalog (no answers). */
export async function listCatalog() {
  return subjectRepo.listSubjectsWithCounts();
}

/** Admin paginated question list (includes answers). */
export async function adminListQuestions(raw: unknown) {
  await requireAdminSession();
  const parsed = questionListQuerySchema.safeParse(raw);
  if (!parsed.success) {
    throw new ValidationError("Invalid query.", parsed.error.flatten());
  }
  const result = await questionRepo.listQuestions(parsed.data);
  return {
    ...result,
    items: result.items.map(questionRepo.toStudyQuestion),
  };
}

export async function adminCreateStudyQuestion(raw: StudyQuestionCreateInput) {
  await requireAdminSession();
  const parsed = studyQuestionCreateSchema.safeParse(raw);
  if (!parsed.success) {
    throw new ValidationError("Invalid study question.", parsed.error.flatten());
  }
  const data = parsed.data;
  const subject = await subjectRepo.getSubjectById(data.subjectId);
  if (!subject) throw new NotFoundError("Subject not found.");

  let topicId = data.topicId ?? null;
  if (!topicId && data.topicName) {
    const existing = await subjectRepo.findTopicByName(data.subjectId, data.topicName);
    if (existing) {
      topicId = existing.id;
    } else {
      const created = await subjectRepo.createTopic({
        id: createId("top"),
        subjectId: data.subjectId,
        name: data.topicName,
      });
      topicId = created?.id ?? null;
    }
  }

  return questionRepo.createQuestion({
    id: createId("q"),
    subjectId: data.subjectId,
    topicId,
    mode: "STUDY",
    prompt: data.prompt,
    options: data.options,
    answerIndex: data.answerIndex,
    explanation: data.explanation,
    source: "admin",
  });
}

export async function adminCreateCbtQuestion(raw: CbtQuestionCreateInput) {
  await requireAdminSession();
  const parsed = cbtQuestionCreateSchema.safeParse(raw);
  if (!parsed.success) {
    throw new ValidationError("Invalid CBT question.", parsed.error.flatten());
  }
  const data = parsed.data;
  const subject = await subjectRepo.getSubjectById(data.subjectId);
  if (!subject) throw new NotFoundError("Subject not found.");

  let topicId = data.topicId ?? null;
  if (!topicId && data.topicName) {
    const existing = await subjectRepo.findTopicByName(data.subjectId, data.topicName);
    if (existing) {
      topicId = existing.id;
    } else {
      const created = await subjectRepo.createTopic({
        id: createId("top"),
        subjectId: data.subjectId,
        name: data.topicName,
      });
      topicId = created?.id ?? null;
    }
  }

  return questionRepo.createQuestion({
    id: createId("q"),
    subjectId: data.subjectId,
    topicId,
    mode: "CBT",
    prompt: data.prompt,
    options: data.options,
    answerIndex: data.answerIndex,
    explanation: data.explanation,
    year: data.year,
    exam: data.exam,
    source: "admin",
  });
}

export async function adminDeleteQuestion(id: string) {
  await requireAdminSession();
  const existing = await questionRepo.getQuestionById(id);
  if (!existing) throw new NotFoundError("Question not found.");
  await questionRepo.deleteQuestion(id);
}

/**
 * Start a study session: premium only; returns questions WITH answers/explanations.
 */
export async function createStudySession(input: {
  subjectId: string;
  topicId?: string;
  count?: number;
}) {
  const { access } = await requirePremiumAccess();
  if (!isPremiumAccess(access)) {
    throw new ForbiddenError("Study mode requires premium access.");
  }

  const subject = await subjectRepo.getSubjectById(input.subjectId);
  if (!subject) throw new NotFoundError("Subject not found.");

  const count = Math.min(Math.max(input.count ?? 20, 1), 50);
  const rows = await questionRepo.pickQuestions({
    subjectId: input.subjectId,
    mode: "STUDY",
    topicId: input.topicId,
    count,
  });

  return {
    subject: { id: subject.id, name: subject.name },
    mode: "STUDY" as const,
    questions: rows.map(questionRepo.toStudyQuestion),
  };
}

/**
 * Prepare CBT questions WITHOUT answer keys.
 * Full attempt lifecycle is Phase 7; this only supplies the question set.
 */
export async function createCbtQuestionSet(input: {
  subjectId: string;
  year?: number;
  count?: number;
}) {
  await requireStudentAccess();

  const subject = await subjectRepo.getSubjectById(input.subjectId);
  if (!subject) throw new NotFoundError("Subject not found.");

  // Legacy caps: English 60, others 40
  const name = subject.name.toLowerCase();
  const cap = name.includes("english") ? 60 : 40;
  const count = Math.min(Math.max(input.count ?? cap, 1), cap);

  const rows = await questionRepo.pickQuestions({
    subjectId: input.subjectId,
    mode: "CBT",
    year: input.year,
    count,
  });

  return {
    subject: { id: subject.id, name: subject.name },
    mode: "CBT" as const,
    year: input.year ?? null,
    questions: rows.map(questionRepo.toPublicQuestion),
  };
}

export async function getSubjectPastSets(subjectId: string) {
  await requireStudentAccess();
  const subject = await subjectRepo.getSubjectById(subjectId);
  if (!subject) throw new NotFoundError("Subject not found.");
  return questionRepo.listPastSets(subjectId);
}
