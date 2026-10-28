"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/client/api";

function getOrCreateDeviceId() {
  if (typeof window === "undefined") return "";
  const key = "jambnaija_device_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = `dev_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
    localStorage.setItem(key, id);
  }
  return id;
}

function safeNextPath(raw: string | null): string {
  if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return "/dashboard";
  return raw;
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = safeNextPath(searchParams.get("next"));
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        identifier,
        password,
        deviceId: getOrCreateDeviceId(),
      }),
    });
    setLoading(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    router.push(nextPath);
    router.refresh();
  }

  return (
    <Card className="mx-auto w-full max-w-md space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-primary-strong">Log in</h1>
        <p className="text-sm text-muted">
          Use your email or username, then password.
        </p>
      </div>
      <form className="space-y-3" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <span className="text-sm font-semibold">Email or username</span>
          <Input
            type="text"
            autoComplete="username"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-semibold">Password</span>
          <Input
            type="password"
            autoComplete="current-password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in…" : "Log in"}
        </Button>
      </form>
      <p className="text-sm text-muted">
        No account?{" "}
        <Link
          href={`/register?next=${encodeURIComponent(nextPath)}`}
          className="font-semibold text-primary"
        >
          Register
        </Link>
      </p>
    </Card>
  );
}
