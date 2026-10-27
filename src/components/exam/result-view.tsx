"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/client/api";

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
  };
  bySubject: Record<string, { correct: number; total: number }>;
};

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
          <p className="text-3xl font-bold text-primary-strong">{attempt.percent}%</p>
          <p className="text-sm text-muted">
            {attempt.correct} correct · {attempt.incorrect} incorrect ·{" "}
            {attempt.unanswered} unanswered · {attempt.total} total
          </p>
        </div>
        <Badge tone={tone}>{attempt.status}</Badge>
      </Card>

      {Object.keys(bySubject).length > 0 ? (
        <Card className="space-y-2">
          <p className="text-sm font-semibold">By subject</p>
          {Object.entries(bySubject).map(([s, v]) => (
            <div key={s} className="flex justify-between text-sm">
              <span className="capitalize text-muted">{s}</span>
              <span className="font-semibold">
                {v.correct}/{v.total}
              </span>
            </div>
          ))}
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
