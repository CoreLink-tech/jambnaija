"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/client/api";

type Row = {
  id: string;
  amount: number;
  accountNumber: string;
  accountName: string;
  status: string;
  createdAt: string;
  userEmail: string | null;
  username: string | null;
};

export function WithdrawalsPanel() {
  const [items, setItems] = useState<Row[]>([]);
  const [error, setError] = useState("");

  async function load() {
    const res = await api<{ withdrawals: Row[] }>("/api/admin/withdrawals");
    if (res.error) setError(res.error);
    else setItems(res.data?.withdrawals ?? []);
  }

  useEffect(() => {
    void load();
  }, []);

  async function act(id: string, action: "approve" | "reject") {
    const res = await api("/api/admin/withdrawals", {
      method: "POST",
      body: JSON.stringify({ id, action }),
    });
    if (res.error) setError(res.error);
    else await load();
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Agent withdrawals</h1>
        <p className="text-sm text-muted">
          Review payout requests from student agents.
        </p>
      </div>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <div className="space-y-2">
        {items.length === 0 ? (
          <p className="text-sm text-muted">No withdrawal requests yet.</p>
        ) : (
          items.map((w) => (
            <Card
              key={w.id}
              className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold">
                  ₦{w.amount.toLocaleString()} · {w.accountName}
                </p>
                <p className="text-xs text-muted">
                  {w.accountNumber} · {w.username || w.userEmail}
                </p>
                <Badge
                  tone={
                    w.status === "PENDING"
                      ? "warn"
                      : w.status === "APPROVED"
                        ? "ok"
                        : "neutral"
                  }
                >
                  {w.status}
                </Badge>
              </div>
              {w.status === "PENDING" ? (
                <div className="flex gap-2">
                  <Button type="button" onClick={() => act(w.id, "approve")}>
                    Approve
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => act(w.id, "reject")}
                  >
                    Reject
                  </Button>
                </div>
              ) : null}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
