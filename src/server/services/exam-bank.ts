import { createId } from "@/lib/security/id";
import {
  ValidationError,
  NotFoundError,
  AppError,
  ForbiddenError,
} from "@/lib/errors";
import { examStartSchema, type ExamStartInput } from "@/lib/validation/exam";
import {
  selectQuestions,
  getQuestionsByIds,
  getQuestionById,
} from "@/data/questions";
import type { AnswerKey, JambSubject } from "@/data/questions/types";
import { scoreExam, minutesForQuestionCount } from "@/lib/exam/scoring";
import * as attemptRepo from "@/server/repositories/attempts";
import { requireStudentAccess } from "@/server/policies/auth";
import { getDb, subjects } from "@/lib/db";
import { eq } from "drizzle-orm";
import { formatExamFocusLabel, parseFocusMeta } from "@/lib/exam/focus-label";

const OPTION_KEYS: AnswerKey[] = ["A", "B", "C", "D"];

function optionsToArray(opts: { A: string; B: string; C: string; D: string }) {
  return [opts.A, opts.B, opts.C, opts.D];
}

function indexToKey(i: number | null): AnswerKey | null {
  if (i == null || i < 0 || i > 3) return null;
  return OPTION_KEYS[i];
}

function keyToIndex(k: AnswerKey | null): number | null {
  if (!k) return null;
  const i = OPTION_KEYS.indexOf(k);
  return i >= 0 ? i : null;
}

/** Ensure a subject row exists for FK (exam attempts table requires subjectId). */
async function ensureSubjectId(primary: JambSubject): Promise<string> {
  const db = getDb();
  const nameMap: Record<JambSubject, string> = {
    english: "Use of English",
    mathematics: "Mathematics",
    physics: "Physics",
    chemistry: "Chemistry",
    biology: "Biology",
    government: "Government",
    literature: "Literature in English",
    crs: "Christian Religious Studies",
  };
  const name = nameMap[primary];
  const existing = await db.select().from(subjects).where(eq(subjects.name, name)).limit(1);
  if (existing[0]) return existing[0].id;
  const id = createId("sub");
  await db.insert(subjects).values({
    id,
    name,
    description: `${name} practice for UTME`,
  });
  return id;
}

export async function startExamSession(raw: unknown) {
  const { session } = await requireStudentAccess();
  const parsed = examStartSchema.safeParse(raw);
  if (!parsed.success) {
    throw new ValidationError("Invalid exam configuration.", parsed.error.flatten());
  }
  const input: ExamStartInput = parsed.data;
  if (input.yearFrom && input.yearTo && input.yearFrom > input.yearTo) {
    throw new ValidationError("yearFrom cannot be greater than yearTo.");
  }

  const { questions, shortage } = selectQuestions({
    subjects: input.subjects,
    count: input.count,
    countsPerSubject: input.countsPerSubject as
      | Partial<Record<JambSubject, number>>
      | undefined,
    years: input.years,
    yearFrom: input.yearFrom,
    yearTo: input.yearTo,
    origin: input.origin ?? "all",
  });

  if (!questions.length) {
    throw new AppError(
      shortage || "No questions available for this configuration.",
      "NO_QUESTIONS",
      404,
    );
  }

  const duration =
    input.durationMinutes ?? minutesForQuestionCount(questions.length);
  const attemptId = createId("att");
  const deadlineAt = new Date(Date.now() + duration * 60 * 1000);
  const subjectId = await ensureSubjectId(input.subjects[0]);
  const focusLabel = [
    formatExamFocusLabel({
      subjects: input.subjects,
      yearFrom: input.yearFrom ?? 2020,
      yearTo: input.yearTo ?? 2026,
    }),
    JSON.stringify({
      subjects: input.subjects,
      yearFrom: input.yearFrom ?? 2020,
      yearTo: input.yearTo ?? 2026,
      origin: input.origin ?? "all",
    }),
  ].join("\n");

  await attemptRepo.createAttempt({
    id: attemptId,
    userId: session.user.id,
    subjectId,
    mode: "CBT",
    focusLabel,
    score: 0,
    total: questions.length,
    percent: 0,
    deadlineAt,
    status: "IN_PROGRESS",
  });

  const answerRows = questions.map((q, orderIndex) => ({
    attemptId,
    questionId: q.id,
    promptSnapshot: q.question,
    optionsSnapshot: optionsToArray(q.options),
    correctIndex: keyToIndex(q.correctAnswer) ?? 0,
    selectedIndex: null as number | null,
    isCorrect: null as boolean | null,
    orderIndex,
  }));
  await attemptRepo.insertAttemptAnswers(answerRows);

  return {
    shortage,
    attempt: {
      id: attemptId,
      deadlineAt: deadlineAt.toISOString(),
      total: questions.length,
      subjects: input.subjects,
      status: "IN_PROGRESS" as const,
      durationMinutes: duration,
    },
    questions: questions.map((q, i) => ({
      id: q.id,
      subject: q.subject,
      year: q.year,
      origin: q.origin,
      topic: q.topic,
      prompt: q.question,
      options: optionsToArray(q.options),
      orderIndex: i,
      selectedIndex: null as number | null,
      flagged: false,
    })),
  };
}

export async function saveExamProgress(raw: {
  attemptId: string;
  answers: { questionId: string; selectedIndex: number | null; flagged?: boolean }[];
}) {
  const { session } = await requireStudentAccess();
  const attempt = await attemptRepo.getAttemptById(raw.attemptId);
  if (!attempt || attempt.userId !== session.user.id) {
    throw new NotFoundError("Exam session not found.");
  }
  if (attempt.status !== "IN_PROGRESS") {
    throw new AppError("Exam is already closed.", "ATTEMPT_CLOSED", 409);
  }
  if (attempt.deadlineAt && attempt.deadlineAt.getTime() <= Date.now()) {
    throw new AppError("Time is up. Please submit.", "TIME_EXPIRED", 409);
  }

  const existing = await attemptRepo.listAnswersForAttempt(attempt.id);
  const byQ = new Map(raw.answers.map((a) => [a.questionId, a.selectedIndex]));

  const updated = existing.map((row) => ({
    attemptId: attempt.id,
    questionId: row.questionId,
    promptSnapshot: row.promptSnapshot,
    optionsSnapshot: row.optionsSnapshot as string[],
    correctIndex: row.correctIndex,
    selectedIndex:
      row.questionId && byQ.has(row.questionId)
        ? byQ.get(row.questionId)!
        : row.selectedIndex,
    isCorrect: null as boolean | null,
    orderIndex: row.orderIndex,
  }));

  await attemptRepo.replaceAttemptAnswers(attempt.id, updated);
  return { ok: true };
}

export async function submitExamSession(raw: {
  attemptId: string;
  answers?: { questionId: string; selectedIndex: number | null }[];
}) {
  const { session } = await requireStudentAccess();
  const attempt = await attemptRepo.getAttemptById(raw.attemptId);
  if (!attempt || attempt.userId !== session.user.id) {
    throw new NotFoundError("Exam session not found.");
  }

  if (attempt.status === "SUBMITTED" || attempt.status === "EXPIRED") {
    return getExamResult(attempt.id);
  }
  if (attempt.status !== "IN_PROGRESS") {
    throw new AppError("Exam cannot be submitted.", "ATTEMPT_CLOSED", 409);
  }

  if (raw.answers?.length) {
    await saveExamProgress({ attemptId: attempt.id, answers: raw.answers });
  }

  const now = new Date();
  const expired =
    attempt.deadlineAt != null && attempt.deadlineAt.getTime() <= now.getTime();

  const rows = await attemptRepo.listAnswersForAttempt(attempt.id);
  const scored = rows.map((row) => {
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

  const scoreItems = scored.map((r) => ({
    correctAnswer: indexToKey(r.correctIndex) || ("A" as AnswerKey),
    selected: indexToKey(r.selectedIndex),
  }));
  const { correct, total, percent } = scoreExam(
    scoreItems.map((s) => ({
      correctAnswer: s.correctAnswer,
      selected: s.selected,
    })),
  );

  await attemptRepo.replaceAttemptAnswers(attempt.id, scored);
  await attemptRepo.finalizeAttempt(attempt.id, {
    score: correct,
    total,
    percent,
    status: expired ? "EXPIRED" : "SUBMITTED",
    submittedAt: now,
  });

  return getExamResult(attempt.id);
}

export async function getExamResult(attemptId: string) {
  const { session } = await requireStudentAccess();
  const attempt = await attemptRepo.getAttemptById(attemptId);
  if (!attempt || attempt.userId !== session.user.id) {
    throw new NotFoundError("Exam session not found.");
  }
  if (attempt.status === "IN_PROGRESS") {
    throw new ForbiddenError("Exam is still in progress.");
  }

  const rows = await attemptRepo.listAnswersForAttempt(attemptId);
  const meta = parseFocusMeta(attempt.focusLabel);

  const bySubjectRaw: Record<string, { correct: number; total: number }> = {};

  const answers = rows
    .slice()
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .map((r) => {
      const bank = r.questionId ? getQuestionById(r.questionId) : undefined;
      const subject = bank?.subject || "unknown";
      if (!bySubjectRaw[subject]) bySubjectRaw[subject] = { correct: 0, total: 0 };
      bySubjectRaw[subject].total += 1;
      if (r.isCorrect) bySubjectRaw[subject].correct += 1;

      return {
        questionId: r.questionId,
        prompt: r.promptSnapshot,
        options: r.optionsSnapshot,
        correctIndex: r.correctIndex,
        selectedIndex: r.selectedIndex,
        isCorrect: r.isCorrect,
        orderIndex: r.orderIndex,
        subject: bank?.subject,
        year: bank?.year,
        origin: bank?.origin,
        topic: bank?.topic,
        explanation: bank?.explanation ?? null,
      };
    });

  // Scale each subject to /100; overall out of 100 × number of subjects
  const bySubject: Record<
    string,
    { correct: number; total: number; scoreOutOf100: number }
  > = {};
  let scaledTotal = 0;
  let subjectCount = 0;
  for (const [s, v] of Object.entries(bySubjectRaw)) {
    const scoreOutOf100 =
      v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0;
    bySubject[s] = { ...v, scoreOutOf100 };
    scaledTotal += scoreOutOf100;
    subjectCount += 1;
  }
  const maxScore = Math.max(subjectCount, 1) * 100;

  const unanswered = answers.filter((a) => a.selectedIndex == null).length;
  const incorrect = answers.filter(
    (a) => a.selectedIndex != null && !a.isCorrect,
  ).length;

  return {
    attempt: {
      id: attempt.id,
      score: scaledTotal,
      total: maxScore,
      percent: maxScore > 0 ? Math.round((scaledTotal / maxScore) * 100) : 0,
      status: attempt.status,
      subjects: meta.subjects || Object.keys(bySubject),
      submittedAt: attempt.submittedAt?.toISOString?.() ?? null,
      createdAt: attempt.createdAt?.toISOString?.() ?? null,
      deadlineAt: attempt.deadlineAt?.toISOString?.() ?? null,
      unanswered,
      incorrect,
      correct: attempt.score,
      rawCorrect: attempt.score,
      rawTotal: attempt.total,
      maxScore,
      scaledScore: scaledTotal,
    },
    bySubject,
    answers,
  };
}

export async function getInProgressExam(attemptId: string) {
  const { session } = await requireStudentAccess();
  const attempt = await attemptRepo.getAttemptById(attemptId);
  if (!attempt || attempt.userId !== session.user.id) {
    throw new NotFoundError("Exam session not found.");
  }
  if (attempt.status !== "IN_PROGRESS") {
    throw new AppError("Exam is not in progress.", "ATTEMPT_CLOSED", 409);
  }

  const rows = await attemptRepo.listAnswersForAttempt(attemptId);
  const meta = parseFocusMeta(attempt.focusLabel);

  return {
    attempt: {
      id: attempt.id,
      deadlineAt: attempt.deadlineAt?.toISOString() ?? null,
      total: attempt.total,
      subjects: meta.subjects || [],
      status: attempt.status,
    },
    questions: rows
      .slice()
      .sort((a, b) => a.orderIndex - b.orderIndex)
      .map((r) => {
        const bank = r.questionId ? getQuestionById(r.questionId) : undefined;
        return {
          id: r.questionId,
          subject: bank?.subject,
          year: bank?.year,
          origin: bank?.origin,
          topic: bank?.topic,
          prompt: r.promptSnapshot,
          options: r.optionsSnapshot,
          orderIndex: r.orderIndex,
          selectedIndex: r.selectedIndex,
          flagged: false,
        };
      }),
  };
}

// silence unused import if tree-shaken
void getQuestionsByIds;
