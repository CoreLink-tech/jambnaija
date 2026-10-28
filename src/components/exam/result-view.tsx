"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/client/api";
import { SUBJECT_META, type JambSubject } from "@/data/questions/types";

type Payload = {
  attempt: {
    id: string;
    score: number;
    total: number;
    percent: number;
    status: string;
    subjects: string[];
    unanswered: number;
    incorrect: number;
    correct: number;
    maxScore?: number;
    scaledScore?: number;
    rawCorrect?: number;
    rawTotal?: number;
  };
  bySubject: Record<
    string,
    { correct: number; total: number; scoreOutOf100?: number }
  >;
};

function subjectName(key: string): string {
  return SUBJECT_META[key as JambSubject]?.name ?? key;
}

export function ExamResultView({ sessionId }: { sessionId: string }) {
  const [data, setData] = useState<Payload | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const res = await api<Payload>(`/api/exams/${sessionId}`);
      if (res.error) setError(res.error);
      else setData(res.data ?? null);
    })();
  }, [sessionId]);

  if (error) return <p className="text-sm text-danger">{error}</p>;
  if (!data) return <p className="text-sm text-muted">Loading results…</p>;

  const { attempt, bySubject } = data;
  const maxScore = attempt.maxScore ?? attempt.total;
  const scaled = attempt.scaledScore ?? attempt.score;
  const tone =
    attempt.percent >= 70 ? "ok" : attempt.percent >= 50 ? "warn" : "danger";

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-primary-strong">Exam result</h1>
        <p className="text-sm text-muted">
          Practice score (not an official JAMB aggregate). Status: {attempt.status}
        </p>
      </div>

      <Card className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-3xl font-bold text-primary-strong">
            {scaled}/{maxScore}
          </p>
          <p className="text-sm text-muted">
            {attempt.percent}% overall · {attempt.rawCorrect ?? attempt.correct}{" "}
            of {attempt.rawTotal ?? "—"} questions correct
          </p>
          <p className="mt-1 text-xs text-muted">
            {attempt.incorrect} incorrect · {attempt.unanswered} unanswered
          </p>
        </div>
        <Badge tone={tone}>{attempt.status}</Badge>
      </Card>

      {Object.keys(bySubject).length > 0 ? (
        <Card className="space-y-3">
          <p className="text-sm font-semibold">Score by subject (each out of 100)</p>
          {Object.entries(bySubject).map(([s, v]) => {
            const outOf100 =
              v.scoreOutOf100 ??
              (v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0);
            return (
              <div
                key={s}
                className="flex items-center justify-between gap-3 border-b border-line pb-2 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-sm font-medium">{subjectName(s)}</p>
                  <p className="text-xs text-muted">
                    {v.correct}/{v.total} questions
                  </p>
                </div>
                <p className="text-lg font-bold text-primary-strong">
                  {outOf100}
                  <span className="text-sm font-normal text-muted">/100</span>
                </p>
              </div>
            );
          })}
        </Card>
      ) : null}

      <div className="flex flex-wrap gap-2">
        <Link href={`/exams/${sessionId}/review`}>
          <Button>Review answers</Button>
        </Link>
        <Link href="/exams/setup">
          <Button variant="secondary">New exam</Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="ghost">Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
