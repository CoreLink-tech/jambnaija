"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/client/api";

type CodeRow = {
  id: number;
  code: string;
  tier: string;
  isActive: boolean;
  usedById: string | null;
  usedAt: string | Date | null;
  createdAt: string | Date;
};

export function CodesPanel() {
  const [codes, setCodes] = useState<CodeRow[]>([]);
  const [tier, setTier] = useState<"STANDARD" | "PREMIUM">("PREMIUM");
  const [count, setCount] = useState(5);
  const [generated, setGenerated] = useState<string[]>([]);
  const [error, setError] = useState("");

  async function load() {
    const res = await api<{ codes: CodeRow[] }>("/api/admin/activation-codes");
    if (res.error) setError(res.error);
    else setCodes(res.data?.codes ?? []);
  }

  useEffect(() => {
    void load();
  }, []);

  async function generate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setGenerated([]);
    const res = await api<{ codes: string[] }>("/api/admin/activation-codes", {
      method: "POST",
      body: JSON.stringify({ tier, count }),
    });
    if (res.error) setError(res.error);
    else {
      setGenerated(res.data?.codes ?? []);
      await load();
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">
          Activation codes
        </h1>
        <p className="text-sm text-muted">
          Generate codes for STANDARD or PREMIUM access. Redemption is handled in
          Phase 9 student flow.
        </p>
      </div>

      <Card>
        <form className="flex flex-col gap-3 sm:flex-row sm:items-end" onSubmit={generate}>
          <label className="block space-y-1">
            <span className="text-sm font-semibold">Tier</span>
            <select
              className="w-full rounded-[var(--radius-md)] border border-line px-3 py-2.5 text-sm"
              value={tier}
              onChange={(e) => setTier(e.target.value as "STANDARD" | "PREMIUM")}
            >
              <option value="STANDARD">STANDARD</option>
              <option value="PREMIUM">PREMIUM</option>
            </select>
          </label>
          <label className="block space-y-1">
            <span className="text-sm font-semibold">Count</span>
            <input
              type="number"
              min={1}
              max={50}
              className="w-full rounded-[var(--radius-md)] border border-line px-3 py-2.5 text-sm"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            />
          </label>
          <Button type="submit">Generate</Button>
        </form>
        {generated.length ? (
          <div className="mt-4 space-y-1">
            <p className="text-sm font-semibold">Newly generated</p>
            {generated.map((c) => (
              <code key={c} className="block text-sm">
                {c}
              </code>
            ))}
          </div>
        ) : null}
        {error ? <p className="mt-2 text-sm text-danger">{error}</p> : null}
      </Card>

      <div className="space-y-2">
        {codes.map((c) => (
          <Card
            key={c.id}
            className="flex flex-wrap items-center justify-between gap-2"
          >
            <code className="text-sm font-semibold">{c.code}</code>
            <div className="flex flex-wrap gap-2">
              <Badge tone="primary">{c.tier}</Badge>
              <Badge tone={c.usedById ? "neutral" : "ok"}>
                {c.usedById ? "Used" : "Available"}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
