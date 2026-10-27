"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/client/api";

type Q = {
  id: string;
  subject?: string;
  year?: number;
  prompt: string;
  options: string[];
  orderIndex: number;
  selectedIndex: number | null;
  flagged?: boolean;
};

const SUBJECT_LABELS: Record<string, string> = {
  english: "Use of English",
  mathematics: "Mathematics",
  physics: "Physics",
  chemistry: "Chemistry",
  biology: "Biology",
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

function subjectLabel(key: string): string {
  return SUBJECT_LABELS[key] || key;
}

export function ExamRunner({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const [questions, setQuestions] = useState<Q[]>([]);
  const [deadlineAt, setDeadlineAt] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [indexInSubject, setIndexInSubject] = useState(0);
  const [remainingMs, setRemainingMs] = useState(0);
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await api<{
        attempt: {
          deadlineAt: string | null;
          subjects: string[];
          status: string;
        };
        questions: Q[];
      }>(`/api/exams/${sessionId}`);
      if (res.error) {
        setError(res.error);
        setLoading(false);
        return;
      }
      if (
        res.data?.attempt?.status &&
        res.data.attempt.status !== "IN_PROGRESS"
      ) {
        router.replace(`/exams/${sessionId}/result`);
        return;
      }

      const qs = res.data?.questions || [];
      setQuestions(qs);
      setDeadlineAt(res.data?.attempt?.deadlineAt ?? null);

      // Prefer ordered subjects from attempt meta; fall back to order seen in questions
      const fromMeta = res.data?.attempt?.subjects || [];
      const fromQs: string[] = [];
      for (const q of qs) {
        if (q.subject && !fromQs.includes(q.subject)) fromQs.push(q.subject);
      }
      const subjectList =
        fromMeta.length > 0
          ? fromMeta
          : fromQs.length > 0
            ? fromQs
            : ["practice"];

      setSubjects(subjectList);
      setActiveSubject(subjectList[0] ?? null);
      setIndexInSubject(0);
      setLoading(false);
    })();
  }, [sessionId, router]);

  const handleSubmit = useCallback(
    async (auto = false) => {
      if (submitting) return;
      if (!auto) {
        const answered = questions.filter((q) => q.selectedIndex != null).length;
        const ok = window.confirm(
          `Submit exam?\nAnswered ${answered} of ${questions.length}.\nUnanswered ${questions.length - answered}.`,
        );
        if (!ok) return;
      }
      setSubmitting(true);
      const res = await api(`/api/exams/submit`, {
        method: "POST",
        body: JSON.stringify({
          attemptId: sessionId,
          answers: questions.map((q) => ({
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
      router.push(`/exams/${sessionId}/result`);
    },
    [submitting, questions, sessionId, router],
  );

  useEffect(() => {
    if (!deadlineAt) return;
    const deadline = new Date(deadlineAt).getTime();
    const tick = () => {
      const left = deadline - Date.now();
      setRemainingMs(left);
      if (left <= 0) void handleSubmit(true);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadlineAt, handleSubmit]);

  const persist = useCallback(
    async (list: Q[]) => {
      await api("/api/exams/save", {
        method: "POST",
        body: JSON.stringify({
          attemptId: sessionId,
          answers: list.map((q) => ({
            questionId: q.id,
            selectedIndex: q.selectedIndex,
          })),
        }),
      });
    },
    [sessionId],
  );

  /** Questions for the active subject tab (preserve global order within subject). */
  const subjectQuestions = useMemo(() => {
    if (!activeSubject) return questions;
    if (subjects.length <= 1) return questions;
    return questions.filter((q) => (q.subject || "practice") === activeSubject);
  }, [questions, activeSubject, subjects.length]);

  const current = subjectQuestions[indexInSubject] ?? null;

  const answeredTotal = useMemo(
    () => questions.filter((q) => q.selectedIndex != null).length,
    [questions],
  );

  const subjectProgress = useMemo(() => {
    const map: Record<string, { answered: number; total: number }> = {};
    for (const s of subjects) {
      map[s] = { answered: 0, total: 0 };
    }
    for (const q of questions) {
      const key = q.subject || subjects[0] || "practice";
      if (!map[key]) map[key] = { answered: 0, total: 0 };
      map[key].total += 1;
      if (q.selectedIndex != null) map[key].answered += 1;
    }
    return map;
  }, [questions, subjects]);

  function selectSubject(s: string) {
    setActiveSubject(s);
    setIndexInSubject(0);
  }

  function selectOption(optionIndex: number) {
    if (!current) return;
    setQuestions((prev) => {
      const next = prev.map((q) =>
        q.id === current.id ? { ...q, selectedIndex: optionIndex } : q,
      );
      void persist(next);
      return next;
    });
  }

  function toggleFlag() {
    if (!current?.id) return;
    setFlagged((f) => ({ ...f, [current.id]: !f[current.id] }));
  }

  function goPrev() {
    setIndexInSubject((v) => Math.max(0, v - 1));
  }

  function goNext() {
    setIndexInSubject((v) => Math.min(subjectQuestions.length - 1, v + 1));
  }

  if (loading) {
    return <p className="text-sm text-muted">Loading exam…</p>;
  }
  if (error && !current) {
    return <p className="text-sm text-danger">{error}</p>;
  }
  if (!current) {
    return <p className="text-sm text-muted">No questions in this section.</p>;
  }

  const multi = subjects.length > 1;

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-lg font-bold text-primary-strong sm:text-xl">
            UTME practice exam
          </h1>
          <p className="text-xs text-muted">
            {answeredTotal}/{questions.length} answered overall
            {current.subject ? ` · ${subjectLabel(current.subject)}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge tone={remainingMs < 5 * 60 * 1000 ? "danger" : "primary"}>
            {formatRemaining(remainingMs)}
          </Badge>
          <Badge tone="neutral">
            Q{indexInSubject + 1}/{subjectQuestions.length}
            {multi ? ` · ${subjectLabel(activeSubject || "")}` : ""}
          </Badge>
        </div>
      </div>

      {/* Subject tabs — shown when 2+ subjects */}
      {multi ? (
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Exam subjects"
        >
          {subjects.map((s) => {
            const active = s === activeSubject;
            const prog = subjectProgress[s] || { answered: 0, total: 0 };
            return (
              <button
                key={s}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => selectSubject(s)}
                className={`shrink-0 rounded-[var(--radius-md)] border px-3 py-2 text-left transition ${
                  active
                    ? "border-primary bg-primary text-white"
                    : "border-line bg-white text-foreground hover:border-primary/40"
                }`}
              >
                <span className="block text-sm font-semibold">
                  {subjectLabel(s)}
                </span>
                <span
                  className={`block text-xs ${
                    active ? "text-white/85" : "text-muted"
                  }`}
                >
                  {prog.answered}/{prog.total} answered
                </span>
              </button>
            );
          })}
        </div>
      ) : null}

      {/* Question card */}
      <Card className="space-y-4">
        {multi ? (
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            {subjectLabel(activeSubject || "")} · Question {indexInSubject + 1} of{" "}
            {subjectQuestions.length}
          </p>
        ) : null}
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
                    ? "border-primary bg-primary-soft"
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
          <Button variant="secondary" disabled={indexInSubject === 0} onClick={goPrev}>
            Previous
          </Button>
          <Button
            variant="secondary"
            disabled={indexInSubject >= subjectQuestions.length - 1}
            onClick={goNext}
          >
            Next
          </Button>
          <Button variant="ghost" onClick={toggleFlag}>
            {flagged[current.id] ? "Unflag" : "Flag"}
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

      {/* Palette for current subject only */}
      <div>
        {multi ? (
          <p className="mb-2 text-xs font-semibold text-muted">
            {subjectLabel(activeSubject || "")} questions
          </p>
        ) : null}
        <div className="flex flex-wrap gap-1.5">
          {subjectQuestions.map((q, i) => (
            <button
              key={q.id || i}
              type="button"
              onClick={() => setIndexInSubject(i)}
              className={`h-9 min-w-9 rounded-md px-1 text-xs font-semibold ${
                i === indexInSubject
                  ? "bg-primary text-white"
                  : flagged[q.id]
                    ? "bg-orange-100 text-warn"
                    : q.selectedIndex != null
                      ? "bg-primary-soft text-primary"
                      : "border border-line bg-white text-muted"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {error ? <p className="text-sm text-danger">{error}</p> : null}
    </div>
  );
}
