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

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refCode = searchParams.get("ref") || "";
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [terms, setTerms] = useState(false);
  const [guardian, setGuardian] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const under18 = typeof age === "number" && age > 0 && age < 18;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await api("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        username,
        password,
        phone,
        age: Number(age),
        termsAccepted: terms,
        guardianConsent: under18 ? guardian : true,
        deviceId: getOrCreateDeviceId(),
        referralCode: refCode || undefined,
      }),
    });
    setLoading(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <Card className="mx-auto w-full max-w-md space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-primary-strong">Create account</h1>
        <p className="text-sm text-muted">Start practising JAMB-style exams.</p>
      </div>
      <form className="space-y-3" onSubmit={onSubmit}>
        <label className="block space-y-1">
          <span className="text-sm font-semibold">Email</span>
          <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-semibold">Username</span>
          <Input required value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-semibold">Phone number</span>
          <Input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-semibold">Age</span>
          <Input
            type="number"
            required
            min={10}
            max={120}
            value={age}
            onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-semibold">Password</span>
          <Input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            className="mt-1"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            required
          />
          <span>
            I agree to the{" "}
            <Link href="/faq" className="font-semibold text-primary">
              terms and conditions
            </Link>{" "}
            of this platform.
          </span>
        </label>
        {under18 ? (
          <label className="flex items-start gap-2 rounded-lg border border-line bg-surface-warm px-3 py-2 text-sm">
            <input
              type="checkbox"
              className="mt-1"
              checked={guardian}
              onChange={(e) => setGuardian(e.target.checked)}
              required
            />
            <span>
              I confirm that my parent or guardian has consented to my registration
              on this platform.
            </span>
          </label>
        ) : null}
        {refCode ? (
          <p className="text-xs text-muted">Referral code applied: {refCode}</p>
        ) : null}
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={loading || !terms}>
          {loading ? "Creating…" : "Register"}
        </Button>
      </form>
      <p className="text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-primary">
          Log in
        </Link>
      </p>
    </Card>
  );
}
