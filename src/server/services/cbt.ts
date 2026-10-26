import { createId } from "@/lib/security/id";
import {
  ValidationError,
  NotFoundError,
  ForbiddenError,
  AppError,
} from "@/lib/errors";
import {
  startCbtSchema,
  saveAnswersSchema,
  submitCbtSchema,
  type StartCbtInput,
  type SaveAnswersInput,
  type SubmitCbtInput,
} from "@/lib/validation/attempts";
import * as attemptRepo from "@/server/repositories/attempts";
import * as questionRepo from "@/server/repositories/questions";
import * as subjectRepo from "@/server/repositories/subjects";
import { requireStudentAccess } from "@/server/policies/auth";
import { scoreAnswers, subjectQuestionCap } from "@/lib/cbt/scoring";
import { getQuestionById } from "@/server/repositories/questions";

const DEFAULT_DURATION_MINUTES = 60;

/**
 * Start or resume a CBT attempt.
 * Creates answer snapshots immediately so later question edits cannot change history.
 * Client receives questions WITHOUT correct answers.
 */
export async function startCbtAttempt(raw: StartCbtInput) {
  const { session } = await requireStudentAccess();
  const parsed = startCbtSchema.safeParse(raw);
  if (!parsed.success) {
    throw new ValidationError("Invalid CBT setup.", parsed.error.flatten());
  }
  const input = parsed.data;

  const subject = await subjectRepo.getSubjectById(input.subjectId);
  if (!subject) throw new NotFoundError("Subject not found.");

  // Resume in-progress attempt for same subject if still valid
  const existing = await attemptRepo.findInProgressCbt(
    session.user.id,
    input.subjectId,
  );
  if (existing) {
    const now = new Date();
    if (existing.deadlineAt && existing.deadlineAt.getTime() <= now.getTime()) {
      // Auto-expire empty-handed finalize
      await attemptRepo.finalizeAttempt(existing.id, {
        score: existing.score,
        total: existing.total,
        percent: existing.percent,
        status: "EXPIRED",
        submittedAt: now,
      });
    } else {
      const answers = await attemptRepo.listAnswersForAttempt(existing.id);
      return {
        attempt: {
          id: existing.id,
          subjectId: existing.subjectId,
          subjectName: subject.name,
          deadlineAt: existing.deadlineAt?.toISOString() ?? null,
          status: existing.status,
          total: existing.total,
          resumed: true,
        },
        questions: answers.map((a) => ({
          id: a.questionId,
          prompt: a.promptSnapshot,
          options: a.optionsSnapshot,
          orderIndex: a.orderIndex,
          selectedIndex: a.selectedIndex,
        })),
      };
    }
  }

  const cap = subjectQuestionCap(subject.name);
  const count = Math.min(input.count ?? cap, cap);
  const durationMinutes = input.durationMinutes ?? DEFAULT_DURATION_MINUTES;

  const rows = await questionRepo.pickQuestions({
    subjectId: input.subjectId,
    mode: "CBT",
    year: input.year,
    count,
  });

  if (!rows.length) {
    throw new AppError(
      "No CBT questions available for this selection.",
      "NO_QUESTIONS",
      404,
    );
  }

  const attemptId = createId("att");
  const deadlineAt = new Date(Date.now() + durationMinutes * 60 * 1000);
  const focusLabel = input.year
    ? `${input.year} ${subject.name}`
    : subject.name;

  await attemptRepo.createAttempt({
    id: attemptId,
    userId: session.user.id,
    subjectId: subject.id,
    mode: "CBT",
    focusLabel,
    score: 0,
    total: rows.length,
    percent: 0,
    deadlineAt,
    status: "IN_PROGRESS",
  });

  const answerRows = rows.map((q, orderIndex) => ({
    attemptId,
    questionId: q.id,
    promptSnapshot: q.prompt,
    optionsSnapshot: q.options as string[],
    correctIndex: q.answerIndex,
    selectedIndex: null as number | null,
    isCorrect: null as boolean | null,
    orderIndex,
  }));
  await attemptRepo.insertAttemptAnswers(answerRows);

  return {
    attempt: {
      id: attemptId,
      subjectId: subject.id,
      subjectName: subject.name,
      deadlineAt: deadlineAt.toISOString(),
      status: "IN_PROGRESS" as const,
      total: rows.length,
      resumed: false,
    },
    questions: answerRows.map((a) => ({
      id: a.questionId,
      prompt: a.promptSnapshot,
      options: a.optionsSnapshot,
      orderIndex: a.orderIndex,
      selectedIndex: null as number | null,
    })),
  };
}

export async function saveCbtAnswers(raw: SaveAnswersInput) {
  const { session } = await requireStudentAccess();
  const parsed = saveAnswersSchema.safeParse(raw);
  if (!parsed.success) {
    throw new ValidationError("Invalid answers payload.", parsed.error.flatten());
  }

  const attempt = await attemptRepo.getAttemptById(parsed.data.attemptId);
  if (!attempt || attempt.userId !== session.user.id) {
    throw new NotFoundError("Attempt not found.");
  }
  if (attempt.status !== "IN_PROGRESS") {
    throw new AppError("Attempt is no longer in progress.", "ATTEMPT_CLOSED", 409);
  }
  if (attempt.deadlineAt && attempt.deadlineAt.getTime() <= Date.now()) {
    throw new AppError("Time is up. Please submit.", "TIME_EXPIRED", 409);
  }

  const existing = await attemptRepo.listAnswersForAttempt(attempt.id);
  const byQ = new Map(
    parsed.data.answers.map((a) => [a.questionId, a.selectedIndex]),
  );

  const updated = existing.map((row) => {
    const selected =
      row.questionId && byQ.has(row.questionId)
        ? byQ.get(row.questionId)!
        : row.selectedIndex;
    return {
      attemptId: attempt.id,
      questionId: row.questionId,
      promptSnapshot: row.promptSnapshot,
      optionsSnapshot: row.optionsSnapshot as string[],
      correctIndex: row.correctIndex,
      selectedIndex: selected,
      isCorrect: null as boolean | null,
      orderIndex: row.orderIndex,
    };
  });

  await attemptRepo.replaceAttemptAnswers(attempt.id, updated);
  return { ok: true };
}

export async function submitCbtAttempt(raw: SubmitCbtInput) {
  const { session } = await requireStudentAccess();
  const parsed = submitCbtSchema.safeParse(raw);
  if (!parsed.success) {
    throw new ValidationError("Invalid submit payload.", parsed.error.flatten());
  }

  const attempt = await attemptRepo.getAttemptById(parsed.data.attemptId);
  if (!attempt || attempt.userId !== session.user.id) {
    throw new NotFoundError("Attempt not found.");
  }
  if (attempt.status === "SUBMITTED" || attempt.status === "EXPIRED") {
    // Idempotent: return existing result
    const answers = await attemptRepo.listAnswersForAttempt(attempt.id);
    return {
      attempt: {
        id: attempt.id,
        score: attempt.score,
        total: attempt.total,
        percent: attempt.percent,
        status: attempt.status,
        focusLabel: attempt.focusLabel,
        submittedAt: attempt.submittedAt?.toISOString() ?? null,
      },
      answers: answers.map((a) => ({
        questionId: a.questionId,
        prompt: a.promptSnapshot,
        options: a.optionsSnapshot,
        correctIndex: a.correctIndex,
        selectedIndex: a.selectedIndex,
        isCorrect: a.isCorrect,
        orderIndex: a.orderIndex,
      })),
    };
  }
  if (attempt.status !== "IN_PROGRESS") {
    throw new AppError("Attempt cannot be submitted.", "ATTEMPT_CLOSED", 409);
  }

  const now = new Date();
  const expired =
    attempt.deadlineAt != null && attempt.deadlineAt.getTime() <= now.getTime();

  // Merge final answers if provided
  if (parsed.data.answers?.length) {
    await saveCbtAnswers({
      attemptId: attempt.id,
      answers: parsed.data.answers,
    });
  }

  const rows = await attemptRepo.listAnswersForAttempt(attempt.id);
  const scoredRows = rows.map((row) => {
    const isCorrect =
      row.selectedIndex != null && row.selectedIndex === row.correctIndex;
    return {
      attemptId: attempt.id,
      questionId: row.questionId,
      promptSnapshot: row.promptSnapshot,
      optionsSnapshot: row.optionsSnapshot as string[],
      correctIndex: row.correctIndex,
      selectedIndex: row.selectedIndex,
      isCorrect,
      orderIndex: row.orderIndex,
    };
  });

  const { score, total, percent } = scoreAnswers(scoredRows);
  await attemptRepo.replaceAttemptAnswers(attempt.id, scoredRows);

  const finalized = await attemptRepo.finalizeAttempt(attempt.id, {
    score,
    total,
    percent,
    status: expired ? "EXPIRED" : "SUBMITTED",
    submittedAt: now,
  });

  return {
    attempt: {
      id: finalized!.id,
      score: finalized!.score,
      total: finalized!.total,
      percent: finalized!.percent,
      status: finalized!.status,
      focusLabel: finalized!.focusLabel,
      submittedAt: finalized!.submittedAt?.toISOString() ?? now.toISOString(),
    },
    answers: scoredRows.map((a) => ({
      questionId: a.questionId,
      prompt: a.promptSnapshot,
      options: a.optionsSnapshot,
      correctIndex: a.correctIndex,
      selectedIndex: a.selectedIndex,
      isCorrect: a.isCorrect,
      orderIndex: a.orderIndex,
    })),
  };
}

export async function getAttemptResult(attemptId: string) {
  const { session } = await requireStudentAccess();
  const attempt = await attemptRepo.getAttemptById(attemptId);
  if (!attempt || attempt.userId !== session.user.id) {
    throw new NotFoundError("Attempt not found.");
  }
  if (attempt.status === "IN_PROGRESS") {
    throw new ForbiddenError("Attempt is still in progress.");
  }
  const answers = await attemptRepo.listAnswersForAttempt(attempt.id);
  const subject = await subjectRepo.getSubjectById(attempt.subjectId);

  return {
    attempt: {
      id: attempt.id,
      score: attempt.score,
      total: attempt.total,
      percent: attempt.percent,
      status: attempt.status,
      focusLabel: attempt.focusLabel,
      subjectName: subject?.name ?? null,
      submittedAt: attempt.submittedAt?.toISOString() ?? null,
      createdAt: attempt.createdAt?.toISOString?.() ?? null,
    },
    answers: answers.map((a) => ({
      questionId: a.questionId,
      prompt: a.promptSnapshot,
      options: a.optionsSnapshot,
      correctIndex: a.correctIndex,
      selectedIndex: a.selectedIndex,
      isCorrect: a.isCorrect,
      orderIndex: a.orderIndex,
    })),
  };
}

export async function listMyAttempts() {
  const { session } = await requireStudentAccess();
  const rows = await attemptRepo.listAttemptsForUser(session.user.id, 30);
  return rows.map((a) => ({
    id: a.id,
    subjectId: a.subjectId,
    mode: a.mode,
    focusLabel: a.focusLabel,
    score: a.score,
    total: a.total,
    percent: a.percent,
    status: a.status,
    createdAt: a.createdAt,
    submittedAt: a.submittedAt,
  }));
}

// silence unused import lint if any
void getQuestionById;
