"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/client/api";
import { ErrorState } from "@/components/ui/feedback";

const WHATSAPP_NUMBER = "2349168311809";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi, I want to purchase a JAMB Naija activation code.",
)}`;

type MeUser = {
  email: string;
  username: string | null;
  status: string;
  planTier: string | null;
  access: {
    canAccess: boolean;
    effectiveTier: string | null;
    source: string;
    trialActive: boolean;
    trialEndsAt: string | null;
    status: string;
  };
};

export function SubscriptionView() {
  const [user, setUser] = useState<MeUser | null>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    const res = await api<{ user: MeUser }>("/api/auth/me");
    if (res.error) setError(res.error);
    else setUser(res.data?.user ?? null);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  const needsCode =
    user &&
    (user.access.source === "trial" ||
      user.access.source === "activation_required" ||
      !user.planTier ||
      user.status === "PENDING");

  const isSubscribed =
    user &&
    user.access.source === "plan" &&
    (user.access.effectiveTier === "STANDARD" ||
      user.access.effectiveTier === "PREMIUM");

  async function redeem(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");
    const res = await api<{ message: string; user: MeUser }>("/api/auth/activate", {
      method: "POST",
      body: JSON.stringify({ code: code.trim().toUpperCase() }),
    });
    setSubmitting(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    setSuccess(res.data?.message || "Activation successful.");
    setCode("");
    if (res.data?.user) setUser(res.data.user);
    else await load();
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-lg space-y-6 animate-pulse">
        <div className="space-y-2">
          <div className="h-8 w-48 rounded-lg bg-line/60" />
          <div className="h-4 w-72 rounded bg-line/40" />
        </div>
        <div className="h-28 rounded-[var(--radius-md)] border border-line bg-white p-4">
          <div className="h-4 w-32 rounded bg-line/50" />
          <div className="mt-3 h-3 w-full rounded bg-line/30" />
          <div className="mt-2 h-3 w-2/3 rounded bg-line/30" />
        </div>
        <div className="h-40 rounded-[var(--radius-md)] border border-line bg-white p-4">
          <div className="h-4 w-40 rounded bg-line/50" />
          <div className="mt-4 h-11 w-full rounded-lg bg-line/40" />
          <div className="mt-3 h-11 w-full rounded-lg bg-line/30" />
        </div>
      </div>
    );
  }
  if (!user) return <ErrorState message={error || "Unable to load account."} />;

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary-strong">Subscription</h1>
        <p className="mt-1 text-sm text-muted">
          Manage your plan or redeem an activation code from an admin.
        </p>
      </div>

      <Card className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold">Current status</span>
          {user.access.trialActive ? (
            <Badge tone="warn">Free trial</Badge>
          ) : isSubscribed ? (
            <Badge tone="ok">{user.access.effectiveTier} plan</Badge>
          ) : (
            <Badge tone="neutral">Activation needed</Badge>
          )}
        </div>
        <p className="text-sm text-muted">
          {user.access.trialActive && user.access.trialEndsAt
            ? `Your free trial ends ${new Date(user.access.trialEndsAt).toLocaleString()}. Redeem a code to keep full access.`
            : isSubscribed
              ? `You are on the ${user.access.effectiveTier} plan. Enjoy full access.`
              : "You need an activation code to unlock full access after trial."}
        </p>
      </Card>

      {needsCode ? (
        <>
          <Card className="space-y-4">
            <div>
              <h2 className="font-semibold text-primary-strong">Enter activation code</h2>
            </div>
            <form className="space-y-3" onSubmit={redeem}>
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. JN-XXXX-XXXX"
                autoComplete="off"
                required
                minLength={6}
                className="font-mono tracking-wide"
              />
              {error ? <p className="text-sm text-danger">{error}</p> : null}
              {success ? <p className="text-sm text-ok">{success}</p> : null}
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Activating…" : "Redeem code"}
              </Button>
            </form>
          </Card>

          <Card className="space-y-3">
            <h2 className="font-semibold text-primary-strong">Purchase a code</h2>
            <p className="text-sm text-muted">
              Buy an activation code on WhatsApp. After payment you will receive a code to enter above.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Button className="w-full" type="button">
                Purchase my code on WhatsApp
              </Button>
            </a>
          </Card>
        </>
      ) : (
        <Card className="space-y-2">
          <p className="text-sm text-muted">
            Your plan is active. You can still redeem another code if an admin upgrades you.
          </p>
          <form className="flex gap-2" onSubmit={redeem}>
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Optional upgrade code"
              className="font-mono"
            />
            <Button type="submit" variant="secondary" disabled={submitting || !code.trim()}>
              Apply
            </Button>
          </form>
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          {success ? <p className="text-sm text-ok">{success}</p> : null}
        </Card>
      )}
    </div>
  );
}
