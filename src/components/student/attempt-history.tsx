"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/client/api";

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
        <p className="text-sm text-muted">Loading history…</p>
      ) : error ? (
        <Card>
          <p className="text-sm text-danger">{error}</p>
        </Card>
      ) : items.length === 0 ? (
        <Card>
          <p className="text-sm text-muted">
            No attempts yet. Complete a CBT session to see your history here.
          </p>
        </Card>
      ) : (
        <div className="space-y-2">
          {items.map((a) => {
            const done =
              a.status === "SUBMITTED" || a.status === "EXPIRED";
            const tone =
              a.percent >= 70 ? "ok" : a.percent >= 50 ? "warn" : "danger";
            return (
              <Card
                key={a.id}
                className="flex flex-wrap items-center justify-between gap-2"
              >
                <div>
                  <p className="font-semibold">
                    {a.focusLabel || a.mode}
                  </p>
                  <p className="text-xs text-muted">
                    {a.status}
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
                    <Badge tone="neutral">{a.status}</Badge>
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
