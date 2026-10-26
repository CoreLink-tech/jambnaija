"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/client/api";

type Subject = { id: string; name: string; cbtCount: number };

type CbtQuestion = {
  id: string | null;
  prompt: string;
  options: string[];
  orderIndex: number;
  selectedIndex: number | null;
};

type AttemptMeta = {
  id: string;
  subjectName: string;
  deadlineAt: string | null;
  total: number;
  resumed?: boolean;
};

function formatRemaining(ms: number): string {
  if (ms <= 0) return "00:00";
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function CbtView() {
  const router = useRouter();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectId, setSubjectId] = useState("");
  const [year, setYear] = useState("");
  const [phase, setPhase] = useState<"setup" | "exam">("setup");
  const [attempt, setAttempt] = useState<AttemptMeta | null>(null);
  const [questions, setQuestions] = useState<CbtQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [remainingMs, setRemainingMs] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await api<{ subjects: Subject[] }>("/api/subjects");
      if (res.data?.subjects) setSubjects(res.data.subjects);
    })();
  }, []);

  // Server-authoritative countdown from deadlineAt
  useEffect(() => {
    if (!attempt?.deadlineAt || phase !== "exam") return;
    const deadline = new Date(attempt.deadlineAt).getTime();
    const tick = () => {
      const left = deadline - Date.now();
      setRemainingMs(left);
      if (left <= 0) {
        void handleSubmit(true);
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt?.deadlineAt, phase]);

  const answeredCount = useMemo(
    () => questions.filter((q) => q.selectedIndex != null).length,
    [questions],
  );

  const current = questions[index];

  const persistAnswers = useCallback(
    async (list: CbtQuestion[]) => {
      if (!attempt) return;
      await api("/api/cbt/save", {
        method: "POST",
        body: JSON.stringify({
          attemptId: attempt.id,
          answers: list
            .filter((q) => q.id)
            .map((q) => ({
              questionId: q.id,
              selectedIndex: q.selectedIndex,
            })),
        }),
      });
    },
    [attempt],
  );

  async function startExam() {
    if (!subjectId) {
      setError("Select a subject.");
      return;
    }
    setLoading(true);
    setError("");
    const res = await api<{
      attempt: AttemptMeta;
      questions: CbtQuestion[];
    }>("/api/cbt/start", {
      method: "POST",
      body: JSON.stringify({
        subjectId,
        year: year ? Number(year) : undefined,
      }),
    });
    setLoading(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    setAttempt(res.data!.attempt);
    setQuestions(
      (res.data!.questions || []).sort((a, b) => a.orderIndex - b.orderIndex),
    );
    setIndex(0);
    setPhase("exam");
  }

  function selectOption(optionIndex: number) {
    if (!current) return;
    setQuestions((prev) => {
      const next = prev.map((q, i) =>
        i === index ? { ...q, selectedIndex: optionIndex } : q,
      );
      void persistAnswers(next);
      return next;
    });
  }

  async function handleSubmit(auto = false) {
    if (!attempt || submitting) return;
    if (!auto) {
      const ok = window.confirm(
        `Submit exam? Answered ${answeredCount} of ${questions.length}.`,
      );
      if (!ok) return;
    }
    setSubmitting(true);
    const res = await api<{ attempt: { id: string } }>("/api/cbt/submit", {
      method: "POST",
      body: JSON.stringify({
        attemptId: attempt.id,
        answers: questions
          .filter((q) => q.id)
          .map((q) => ({
            questionId: q.id,
            selectedIndex: q.selectedIndex,
          })),
      }),
    });
    setSubmitting(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    router.push(`/results/${attempt.id}`);
  }

  if (phase === "exam" && current && attempt) {
    return (
      <div className="mx-auto max-w-3xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-lg font-bold sm:text-xl">
              {attempt.subjectName}
            </h1>
            <p className="text-xs text-muted">
              Question {index + 1} of {questions.length}
              {attempt.resumed ? " · Resumed" : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge tone={remainingMs < 5 * 60 * 1000 ? "danger" : "primary"}>
              {formatRemaining(remainingMs)}
            </Badge>
            <Badge tone="neutral">
              {answeredCount}/{questions.length} answered
            </Badge>
          </div>
        </div>

        <Card className="space-y-4">
          <p className="text-base font-medium leading-relaxed">{current.prompt}</p>
          <div className="space-y-2">
            {current.options.map((opt, i) => {
              const selected = current.selectedIndex === i;
              return (
                <button
                  key={i}
                  type="button"
                  className={`w-full rounded-[var(--radius-md)] border px-3 py-3 text-left text-sm ${
                    selected
                      ? "border-primary bg-blue-50"
                      : "border-line bg-white hover:border-primary/40"
                  }`}
                  onClick={() => selectOption(i)}
                >
                  <span className="mr-2 font-semibold text-muted">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2 border-t border-line pt-3">
            <Button
              variant="secondary"
              disabled={index === 0}
              onClick={() => setIndex((v) => Math.max(0, v - 1))}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              disabled={index >= questions.length - 1}
              onClick={() =>
                setIndex((v) => Math.min(questions.length - 1, v + 1))
              }
            >
              Next
            </Button>
            <Button
              className="ml-auto"
              onClick={() => handleSubmit(false)}
              disabled={submitting}
            >
              {submitting ? "Submitting…" : "Submit exam"}
            </Button>
          </div>
        </Card>

        <div className="flex flex-wrap gap-1.5">
          {questions.map((q, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-8 w-8 rounded-md text-xs font-semibold ${
                i === index
                  ? "bg-primary text-white"
                  : q.selectedIndex != null
                    ? "bg-blue-100 text-primary"
                    : "bg-white border border-line text-muted"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {error ? <p className="text-sm text-danger">{error}</p> : null}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="space-y-1">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-primary-strong">
          CBT practice
        </h1>
        <p className="text-sm text-muted">
          Timed exam. Answers are scored on the server. Refresh resumes your
          in-progress attempt.
        </p>
      </div>
      <Card className="space-y-4">
        <label className="block space-y-1.5">
          <span className="text-sm font-semibold">Subject</span>
          <select
            className="w-full rounded-[var(--radius-md)] border border-line bg-white px-3 py-2.5 text-sm"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
          >
            <option value="">Select subject</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.cbtCount})
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-semibold">Year (optional)</span>
          <input
            type="number"
            min={1980}
            max={2100}
            placeholder="e.g. 2023"
            className="w-full rounded-[var(--radius-md)] border border-line bg-white px-3 py-2.5 text-sm"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </label>
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <Button onClick={startExam} disabled={loading || !subjectId}>
          {loading ? "Starting…" : "Start CBT"}
        </Button>
      </Card>
    </div>
  );
}
