"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/client/api";

export function ActivationForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const res = await api<{ message: string }>("/api/auth/activate", {
      method: "POST",
      body: JSON.stringify({ code }),
    });
    setLoading(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    setSuccess(res.data?.message || "Activation successful.");
    router.refresh();
    setTimeout(() => router.push("/dashboard"), 800);
  }

  return (
    <Card className="mx-auto w-full max-w-md space-y-4">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-primary-strong">
          Activate account
        </h1>
        <p className="text-sm text-muted">
          Enter an activation code to unlock STANDARD or PREMIUM access after
          your trial.
        </p>
      </div>
      <form className="space-y-3" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <span className="text-sm font-semibold">Activation code</span>
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value.trim())}
            placeholder="Paste code"
            required
            minLength={10}
            autoCapitalize="characters"
          />
        </label>
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        {success ? <p className="text-sm text-ok">{success}</p> : null}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Redeeming…" : "Redeem code"}
        </Button>
      </form>
    </Card>
  );
}
