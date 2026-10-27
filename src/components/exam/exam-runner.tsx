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

function formatRemaining(ms: number): string {
  if (ms <= 0) return "00:00";
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function ExamRunner({ sessionId }: { sessionId: string }) {
  const router = useRouter();
  const [questions, setQuestions] = useState<Q[]>([]);
  const [deadlineAt, setDeadlineAt] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [remainingMs, setRemainingMs] = useState(0);
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await api<{
        attempt: { deadlineAt: string | null; subjects: string[]; status: string };
        questions: Q[];
      }>(`/api/exams/${sessionId}`);
      if (res.error) {
        setError(res.error);
        setLoading(false);
        return;
      }
      if (res.data?.attempt?.status && res.data.attempt.status !== "IN_PROGRESS") {
        router.replace(`/exams/${sessionId}/result`);
        return;
      }
      setQuestions(res.data?.questions || []);
      setDeadlineAt(res.data?.attempt?.deadlineAt ?? null);
      setSubjects(res.data?.attempt?.subjects || []);
      setLoading(false);
    })();
  }, [sessionId, router]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deadlineAt]);

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

  const current = questions[index];
  const answered = useMemo(
    () => questions.filter((q) => q.selectedIndex != null).length,
    [questions],
  );

  function selectOption(i: number) {
    setQuestions((prev) => {
      const next = prev.map((q, idx) =>
        idx === index ? { ...q, selectedIndex: i } : q,
      );
      void persist(next);
      return next;
    });
  }

  function toggleFlag() {
    if (!current?.id) return;
    setFlagged((f) => ({ ...f, [current.id]: !f[current.id] }));
  }

  async function handleSubmit(auto = false) {
    if (submitting) return;
    if (!auto) {
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
  }

  if (loading) {
    return <p className="text-sm text-muted">Loading exam…</p>;
  }
  if (error && !current) {
    return <p className="text-sm text-danger">{error}</p>;
  }
  if (!current) return null;

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-lg font-bold text-primary-strong sm:text-xl">
            UTME practice exam
          </h1>
          <p className="text-xs text-muted">
            {(subjects.length ? subjects : ["practice"]).join(" · ")} · Q{index + 1}/
            {questions.length}
            {current.subject ? ` · ${current.subject}` : ""}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge tone={remainingMs < 5 * 60 * 1000 ? "danger" : "primary"}>
            {formatRemaining(remainingMs)}
          </Badge>
          <Badge tone="neutral">
            {answered}/{questions.length}
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
            onClick={() => setIndex((v) => Math.min(questions.length - 1, v + 1))}
          >
            Next
          </Button>
          <Button variant="ghost" onClick={toggleFlag}>
            {flagged[current.id] ? "Unflag" : "Flag"}
          </Button>
          <Button className="ml-auto" onClick={() => handleSubmit(false)} disabled={submitting}>
            {submitting ? "Submitting…" : "Submit"}
          </Button>
        </div>
      </Card>

      <div className="flex flex-wrap gap-1.5">
        {questions.map((q, i) => (
          <button
            key={q.id || i}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-9 min-w-9 rounded-md px-1 text-xs font-semibold ${
              i === index
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
      {error ? <p className="text-sm text-danger">{error}</p> : null}
    </div>
  );
}
