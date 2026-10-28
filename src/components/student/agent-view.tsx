"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/client/api";
import { REFERRAL_REWARD_NGN, SUBSCRIPTION_PRICE_NGN, PUBLIC_SITE_URL } from "@/lib/validation/auth";

type Referral = {
  id: string;
  username: string | null;
  email: string;
  status: string;
  planTier: string | null;
  joinedAt: string | Date | null;
};

type Dash = {
  referralCode: string | null;
  referralLink: string;
  walletBalance: number;
  referralCount: number;
  referrals: Referral[];
  withdrawals: {
    id: string;
    amount: number;
    status: string;
    createdAt: string;
  }[];
};

export function AgentView() {
  const [data, setData] = useState<Dash | null>(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  function canonicalLink(code: string | null | undefined): string {
    if (!code) return `${PUBLIC_SITE_URL}/register`;
    return `${PUBLIC_SITE_URL}/register?ref=${encodeURIComponent(code)}`;
  }

  async function load() {
    const res = await api<Dash>("/api/agent");
    if (res.error) {
      setError(res.error);
      return;
    }
    const d = res.data;
    if (d) {
      // Always display production domain — ignore any preview host from the API.
      setData({
        ...d,
        referralLink: canonicalLink(d.referralCode),
      });
    } else {
      setData(null);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function withdraw(e: React.FormEvent) {
    e.preventDefault();
    if (!data) return;
    setSubmitting(true);
    setMessage("");
    setError("");
    const res = await api("/api/agent", {
      method: "POST",
      body: JSON.stringify({
        amount: data.walletBalance,
        accountNumber,
        accountName,
      }),
    });
    setSubmitting(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    setMessage("Withdrawal request submitted to admin.");
    setOpen(false);
    setAccountNumber("");
    setAccountName("");
    await load();
  }

  if (!data && !error) {
    return <p className="text-sm text-muted">Loading agent…</p>;
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary-strong">Agent</h1>
        <p className="mt-1 text-sm text-muted">
          Share your link. When a referral activates or renews (₦
          {SUBSCRIPTION_PRICE_NGN.toLocaleString()}), you earn ₦
          {REFERRAL_REWARD_NGN.toLocaleString()}.
        </p>
      </div>

      <Card className="space-y-2">
        <p className="text-sm font-semibold">Wallet</p>
        <p className="text-3xl font-bold text-primary-strong">
          ₦{(data?.walletBalance ?? 0).toLocaleString()}
        </p>
        <p className="text-xs text-muted">
          {data?.referralCount ?? 0} referral
          {(data?.referralCount ?? 0) === 1 ? "" : "s"}
        </p>
        <Button
          type="button"
          disabled={!data || data.walletBalance <= 0}
          onClick={() => setOpen(true)}
        >
          Withdraw
        </Button>
      </Card>

      <Card className="space-y-2">
        <p className="text-sm font-semibold">Your referral code</p>
        <code className="block rounded-lg bg-surface-warm px-3 py-2 text-sm font-semibold tracking-wide">
          {data?.referralCode || "—"}
        </code>
        <p className="text-sm font-semibold pt-1">Your referral link</p>
        <code className="block break-all rounded-lg bg-surface-warm px-3 py-2 text-xs">
          {data?.referralLink}
        </code>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            if (data?.referralLink) {
              void navigator.clipboard.writeText(data.referralLink);
              setMessage("Link copied.");
            }
          }}
        >
          Copy link
        </Button>
      </Card>

      <Card className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold">Your referrals</p>
          <Badge tone="neutral">{data?.referralCount ?? 0}</Badge>
        </div>
        {!data?.referrals?.length ? (
          <p className="text-sm text-muted">
            No referrals yet. Share your link to start earning.
          </p>
        ) : (
          <ul className="divide-y divide-line">
            {data.referrals.map((r) => (
              <li
                key={r.id}
                className="flex flex-col gap-0.5 py-2.5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-medium">
                    {r.username || r.email}
                  </p>
                  <p className="text-xs text-muted">{r.email}</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted">
                  <Badge
                    tone={
                      r.status === "ACTIVE"
                        ? "ok"
                        : r.status === "PENDING"
                          ? "warn"
                          : "neutral"
                    }
                  >
                    {r.status}
                  </Badge>
                  {r.planTier ? <span>{r.planTier}</span> : null}
                  {r.joinedAt ? (
                    <span>
                      {new Date(r.joinedAt).toLocaleDateString()}
                    </span>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>

      {data?.withdrawals?.length ? (
        <Card className="space-y-2">
          <p className="text-sm font-semibold">Recent withdrawals</p>
          {data.withdrawals.map((w) => (
            <div
              key={w.id}
              className="flex justify-between text-sm text-muted"
            >
              <span>₦{w.amount.toLocaleString()}</span>
              <span>{w.status}</span>
            </div>
          ))}
        </Card>
      ) : null}

      {message ? <p className="text-sm text-ok">{message}</p> : null}
      {error ? <p className="text-sm text-danger">{error}</p> : null}

      {open ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
          <Card className="w-full max-w-md space-y-3">
            <h2 className="text-lg font-bold text-primary-strong">Withdraw</h2>
            <p className="text-sm text-muted">
              Amount locked to your wallet balance:{" "}
              <strong>₦{(data?.walletBalance ?? 0).toLocaleString()}</strong>
            </p>
            <p className="rounded-lg bg-orange-50 px-3 py-2 text-xs text-warn">
              Double-check account name and number. Wrong details may delay or
              forfeit payout.
            </p>
            <form className="space-y-3" onSubmit={withdraw}>
              <label className="block space-y-1 text-sm">
                <span className="font-semibold">Account number</span>
                <Input
                  required
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                />
              </label>
              <label className="block space-y-1 text-sm">
                <span className="font-semibold">Account name</span>
                <Input
                  required
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                />
              </label>
              <label className="block space-y-1 text-sm">
                <span className="font-semibold">Amount (₦)</span>
                <Input
                  readOnly
                  value={String(data?.walletBalance ?? 0)}
                  className="bg-surface-warm"
                />
              </label>
              <div className="flex gap-2">
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Submitting…" : "Submit request"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
