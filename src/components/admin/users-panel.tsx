"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/client/api";

type UserRow = {
  id: string;
  email: string;
  username: string | null;
  role: string;
  status: string;
  planTier: string | null;
};

export function UsersPanel() {
  const [items, setItems] = useState<UserRow[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  async function load(q?: string) {
    const qs = q ? `?search=${encodeURIComponent(q)}` : "";
    const res = await api<{ items: UserRow[] }>(`/api/admin/users${qs}`);
    if (res.error) setError(res.error);
    else setItems(res.data?.items ?? []);
  }

  useEffect(() => {
    void load();
  }, []);

  async function act(id: string, action: string) {
    setError("");
    const res = await api(`/api/admin/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ action }),
    });
    if (res.error) setError(res.error);
    else await load(search);
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this user permanently?")) return;
    const res = await api(`/api/admin/users/${id}`, { method: "DELETE" });
    if (res.error) setError(res.error);
    else await load(search);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">
          Users
        </h1>
        <p className="text-sm text-muted">
          Search, activate, set plan tier, or deactivate accounts.
        </p>
      </div>

      <form
        className="flex flex-col gap-2 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          void load(search);
        }}
      >
        <Input
          placeholder="Search email or username"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>

      {error ? <p className="text-sm text-danger">{error}</p> : null}

      <div className="space-y-2">
        {items.map((u) => (
          <Card key={u.id} className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold">{u.email}</span>
              {u.username ? (
                <span className="text-sm text-muted">@{u.username}</span>
              ) : null}
              <Badge tone="neutral">{u.role}</Badge>
              <Badge
                tone={
                  u.status === "ACTIVE"
                    ? "ok"
                    : u.status === "DEACTIVATED"
                      ? "danger"
                      : "warn"
                }
              >
                {u.status}
              </Badge>
              {u.planTier ? <Badge tone="primary">{u.planTier}</Badge> : null}
            </div>
            {u.role !== "ADMIN" ? (
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => act(u.id, "activate")}
                >
                  Activate
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => act(u.id, "set_standard")}
                >
                  Standard
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => act(u.id, "set_premium")}
                >
                  Premium
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => act(u.id, "deactivate")}
                >
                  Deactivate
                </Button>
                <Button type="button" variant="danger" onClick={() => remove(u.id)}>
                  Delete
                </Button>
              </div>
            ) : null}
          </Card>
        ))}
      </div>
    </div>
  );
}
