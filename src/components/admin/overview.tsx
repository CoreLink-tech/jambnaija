"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/client/api";

type Stats = {
  users: number;
  questions: number;
  subjects: number;
  unusedActivationCodes: number;
};

export function AdminOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const res = await api<{ stats: Stats }>("/api/admin/stats");
      if (res.error) setError(res.error);
      else setStats(res.data?.stats ?? null);
    })();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-primary-strong">
          Admin overview
        </h1>
        <p className="text-sm text-muted">
          Manage subjects, questions, users, and activation codes.
        </p>
      </div>

      {error ? <p className="text-sm text-danger">{error}</p> : null}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Users", value: stats?.users },
          { label: "Subjects", value: stats?.subjects },
          { label: "Questions", value: stats?.questions },
          { label: "Unused codes", value: stats?.unusedActivationCodes },
        ].map((item) => (
          <Card key={item.label}>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">
              {item.label}
            </p>
            <p className="mt-1 text-2xl font-bold">
              {item.value == null ? "—" : item.value}
            </p>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Link href="/admin/subjects">
          <Button>Subjects</Button>
        </Link>
        <Link href="/admin/questions">
          <Button variant="secondary">Questions</Button>
        </Link>
        <Link href="/admin/users">
          <Button variant="secondary">Users</Button>
        </Link>
        <Link href="/admin/codes">
          <Button variant="secondary">Activation codes</Button>
        </Link>
      </div>
    </div>
  );
}
