"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/client/api";

type Answer = {
  prompt: string;
  options: string[];
  correctIndex: number;
  selectedIndex: number | null;
  isCorrect: boolean | null;
  orderIndex: number;
  subject?: string;
  year?: number;
  origin?: string;
  topic?: string;
  explanation?: string | null;
};

export function ExamReviewView({ sessionId }: { sessionId: string }) {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [filter, setFilter] = useState<"all" | "correct" | "incorrect" | "unanswered">("all");
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const res = await api<{ answers: Answer[] }>(`/api/exams/${sessionId}`);
      if (res.error) setError(res.error);
      else setAnswers(res.data?.answers || []);
    })();
  }, [sessionId]);

  const filtered = useMemo(() => {
    return answers.filter((a) => {
      if (filter === "correct") return a.isCorrect === true;
      if (filter === "incorrect")
        return a.selectedIndex != null && a.isCorrect === false;
      if (filter === "unanswered") return a.selectedIndex == null;
      return true;
    });
  }, [answers, filter]);

  if (error) return <p className="text-sm text-danger">{error}</p>;

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold text-primary-strong">Answer review</h1>
        <Link href={`/exams/${sessionId}/result`}>
          <Button variant="secondary">Back to result</Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["all", "correct", "incorrect", "unanswered"] as const).map((f) => (
          <Button
            key={f}
            type="button"
            variant={filter === f ? "primary" : "secondary"}
            onClick={() => setFilter(f)}
          >
            {f}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((a, idx) => (
          <Card key={idx} className="space-y-2">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <p className="text-sm font-medium leading-relaxed">
                {a.orderIndex + 1}. {a.prompt}
              </p>
              <Badge
                tone={
                  a.selectedIndex == null
                    ? "neutral"
                    : a.isCorrect
                      ? "ok"
                      : "danger"
                }
              >
                {a.selectedIndex == null
                  ? "Unanswered"
                  : a.isCorrect
                    ? "Correct"
                    : "Wrong"}
              </Badge>
            </div>
            <p className="text-xs text-muted">
              {[a.subject, a.year, a.topic, a.origin].filter(Boolean).join(" · ")}
            </p>
            <ul className="space-y-1 text-sm">
              {a.options.map((opt, i) => {
                const isCorrect = i === a.correctIndex;
                const isSelected = i === a.selectedIndex;
                return (
                  <li
                    key={i}
                    className={
                      isCorrect
                        ? "font-medium text-ok"
                        : isSelected
                          ? "text-danger"
                          : "text-muted"
                    }
                  >
                    {String.fromCharCode(65 + i)}. {opt}
                    {isCorrect ? " ✓" : ""}
                    {isSelected && !isCorrect ? " (yours)" : ""}
                  </li>
                );
              })}
            </ul>
            {a.explanation ? (
              <p className="border-t border-line pt-2 text-sm text-muted">
                {a.explanation}
              </p>
            ) : null}
          </Card>
        ))}
      </div>
    </div>
  );
}
