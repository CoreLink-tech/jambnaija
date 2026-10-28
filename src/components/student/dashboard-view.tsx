"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/client/api";
import { AttemptHistory } from "@/components/student/attempt-history";
import { LoadingState, EmptyState, ErrorState, PageHeader } from "@/components/ui/feedback";

type Access = {
  canAccess: boolean;
  effectiveTier: string | null;
  source: string;
  trialActive: boolean;
  trialEndsAt: string | null;
  status: string;
};

type User = {
  email: string;
  username: string | null;
  access: Access;
};

type Subject = {
  id: string;
  name: string;
  description: string;
  studyCount: number;
  cbtCount: number;
  topicCount: number;
};

export function DashboardView({ user }: { user: User }) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await api<{ subjects: Subject[] }>("/api/subjects");
      if (cancelled) return;
      if (res.error) setError(res.error);
      else setSubjects(res.data?.subjects ?? []);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const access = user.access;
  const accessTone =
    !access.canAccess
      ? "danger"
      : access.trialActive
        ? "warn"
        : access.effectiveTier === "PREMIUM"
          ? "ok"
          : "primary";

  const accessLabel = !access.canAccess
    ? "Activation required"
    : access.trialActive
      ? "Premium trial"
      : access.effectiveTier === "PREMIUM"
        ? "Premium"
        : access.effectiveTier === "STANDARD"
          ? "Standard"
          : "Active";

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome${user.username ? `, ${user.username}` : ""}`}
        description="Prepare for JAMB with study mode and timed CBT practice."
      />

      <Card className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Account access</span>
            <Badge tone={accessTone}>{accessLabel}</Badge>
          </div>
          <p className="text-sm text-muted">
            {!access.canAccess
              ? "Redeem an activation code to unlock full access after your trial."
              : access.trialActive && access.trialEndsAt
                ? `Trial active until ${new Date(access.trialEndsAt).toLocaleString()}.`
                : access.effectiveTier === "PREMIUM"
                  ? "Premium package active — study and CBT available."
                  : "Standard access — CBT available. Upgrade for study mode."}
          </p>
        </div>
      </Card>

      <section className="grid gap-3 sm:grid-cols-2">
        <Card className="space-y-3">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-bold">
            Study mode
          </h2>
          <p className="text-sm text-muted">
            Topic-based practice with explanations. Premium required.
          </p>
          <Link href="/study">
            <Button className="w-full sm:w-auto">Start studying</Button>
          </Link>
        </Card>
        <Card className="space-y-3" id="cbt">
          <h2 className="font-[family-name:var(--font-display)] text-lg font-bold">
            CBT practice
          </h2>
          <p className="text-sm text-muted">
            Timed exam-style practice with server-side scoring.
          </p>
          <Link href="/cbt">
            <Button className="w-full sm:w-auto">Start CBT</Button>
          </Link>
        </Card>
      </section>

      <div className="flex flex-wrap gap-2">
        <Link href="/subscription">
          <Button variant="secondary">Subscription & codes</Button>
        </Link>
      </div>

      <AttemptHistory />

      <section className="space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-lg font-bold">
          Subjects
        </h2>
        {loading ? (
          <LoadingState label="Loading subjects…" />
        ) : error ? (
          <ErrorState message={error} onRetry={() => window.location.reload()} />
        ) : subjects.length === 0 ? (
          <EmptyState
            title="No subjects yet"
            description="An administrator can add subjects and seed questions from the admin dashboard."
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {subjects.map((s) => (
              <Card key={s.id} className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold">{s.name}</h3>
                  <Badge tone="neutral">{s.topicCount} topics</Badge>
                </div>
                <p className="text-sm text-muted line-clamp-2">{s.description}</p>
                <div className="flex flex-wrap gap-2 text-xs text-muted">
                  <span>{s.studyCount} study</span>
                  <span>·</span>
                  <span>{s.cbtCount} CBT</span>
                </div>
                <Link href={`/study?subjectId=${s.id}`}>
                  <Button variant="secondary" className="mt-1 w-full">
                    Study this subject
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
