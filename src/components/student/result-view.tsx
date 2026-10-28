"use client";

import { displayFocusLabel } from "@/lib/exam/focus-label";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/client/api";

type ResultPayload = {
  attempt: {
    id: string;
    score: number;
    total: number;
    percent: number;
    status: string;
    focusLabel: string | null;
    subjectName: string | null;
    submittedAt: string | null;
  };
  answers: {
    prompt: string;
    options: string[];
    correctIndex: number;
    selectedIndex: number | null;
    isCorrect: boolean | null;
    orderIndex: number;
  }[];
};

export function ResultView({ attemptId }: { attemptId: string }) {
  const [data, setData] = useState<ResultPayload | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await api<ResultPayload>(`/api/cbt/attempts/${attemptId}`);
      if (res.error) setError(res.error);
      else setData(res.data ?? null);
      setLoading(false);
    })();
  }, [attemptId]);

  if (loading) return <p className="text-sm text-muted">Loading result…</p>;
  if (error) {
    return (
      <Card>
        <p className="text-sm text-danger">{error}</p>
        <Link href="/dashboard">
          <Button variant="secondary" className="mt-3">
            Back to dashboard
          </Button>
        </Link>
      </Card>
    );
  }
  if (!data) return null;

  const { attempt, answers } = data;
  const tone =
    attempt.percent >= 70 ? "ok" : attempt.percent >= 50 ? "warn" : "danger";

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="space-y-1">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-primary-strong">
          Exam result
        </h1>
        <p className="text-sm text-muted">
          {attempt.subjectName || displayFocusLabel(attempt.focusLabel, "CBT")} · {attempt.status}
        </p>
      </div>

      <Card className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-3xl font-bold text-primary-strong">
            {attempt.percent}%
          </p>
          <p className="text-sm text-muted">
            {attempt.score} / {attempt.total} correct
          </p>
        </div>
        <Badge tone={tone}>{attempt.status}</Badge>
      </Card>

      <div className="space-y-3">
        {answers
          .slice()
          .sort((a, b) => a.orderIndex - b.orderIndex)
          .map((a, idx) => (
            <Card key={idx} className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium leading-relaxed">
                  {idx + 1}. {a.prompt}
                </p>
                <Badge tone={a.isCorrect ? "ok" : "danger"}>
                  {a.isCorrect ? "Correct" : "Wrong"}
                </Badge>
              </div>
              <ul className="space-y-1 text-sm">
                {a.options.map((opt, i) => {
                  const isCorrect = i === a.correctIndex;
                  const isSelected = i === a.selectedIndex;
                  return (
                    <li
                      key={i}
                      className={
                        isCorrect
                          ? "text-ok font-medium"
                          : isSelected
                            ? "text-danger"
                            : "text-muted"
                      }
                    >
                      {String.fromCharCode(65 + i)}. {opt}
                      {isCorrect ? " ✓" : ""}
                      {isSelected && !isCorrect ? " (your answer)" : ""}
                    </li>
                  );
                })}
              </ul>
            </Card>
          ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Link href="/cbt">
          <Button>Another CBT</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="secondary">Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
