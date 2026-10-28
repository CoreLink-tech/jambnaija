"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/client/api";
import { LoadingState, EmptyState, ErrorState } from "@/components/ui/feedback";
import { displayFocusLabel } from "@/lib/exam/focus-label";

type AttemptRow = {
  id: string;
  mode: string;
  focusLabel: string | null;
  score: number;
  total: number;
  percent: number;
  status: string;
  createdAt: string | Date;
  submittedAt: string | Date | null;
};

function statusLabel(status: string): string {
  if (status === "IN_PROGRESS") return "In progress";
  if (status === "SUBMITTED") return "Submitted";
  if (status === "EXPIRED") return "Expired";
  return status;
}

export function AttemptHistory() {
  const [items, setItems] = useState<AttemptRow[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await api<{ attempts: AttemptRow[] }>("/api/cbt/attempts");
      if (res.error) setError(res.error);
      else setItems(res.data?.attempts ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <section className="space-y-3">
      <h2 className="font-[family-name:var(--font-display)] text-lg font-bold">
        Recent attempts
      </h2>
      {loading ? (
        <LoadingState label="Loading history…" />
      ) : error ? (
        <ErrorState message={error} />
      ) : items.length === 0 ? (
        <EmptyState
          title="No attempts yet"
          description="Complete a CBT session to see your history here."
        />
      ) : (
        <div className="space-y-2">
          {items.map((a) => {
            const done = a.status === "SUBMITTED" || a.status === "EXPIRED";
            const tone =
              a.percent >= 70 ? "ok" : a.percent >= 50 ? "warn" : "danger";
            return (
              <Card
                key={a.id}
                className="flex flex-wrap items-center justify-between gap-2"
              >
                <div>
                  <p className="font-semibold">
                    {displayFocusLabel(a.focusLabel, a.mode)}
                  </p>
                  <p className="text-xs text-muted">
                    {statusLabel(a.status)}
                    {a.submittedAt
                      ? ` · ${new Date(a.submittedAt).toLocaleString()}`
                      : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {done ? (
                    <>
                      <Badge tone={tone}>{a.percent}%</Badge>
                      <Link
                        href={`/results/${a.id}`}
                        className="text-sm font-semibold text-primary"
                      >
                        View
                      </Link>
                    </>
                  ) : (
                    <>
                      <Badge tone="neutral">{statusLabel(a.status)}</Badge>
                      <Link
                        href={`/exams/${a.id}`}
                        className="text-sm font-semibold text-primary"
                      >
                        Continue
                      </Link>
                    </>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}
