"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LogoMark } from "@/components/icons/brand";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/client/api";

const guestLinks = [
  { href: "/subjects", label: "Subjects" },
  { href: "/faq", label: "FAQ" },
];

const authedLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/exams/setup", label: "Exams" },
  { href: "/subjects", label: "Subjects" },
  { href: "/study", label: "Study" },
  { href: "/subscription", label: "Subscription" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await api<{ user: { email: string; username: string | null } }>(
        "/api/auth/me",
      );
      if (cancelled) return;
      if (res.data?.user) {
        setAuthed(true);
        setLabel(res.data.user.username || res.data.user.email);
      } else {
        setAuthed(false);
        setLabel("");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  async function logout() {
    await api("/api/auth/logout", { method: "POST" });
    setAuthed(false);
    router.push("/login");
    router.refresh();
  }

  const links = authed ? authedLinks : guestLinks;

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link
          href={authed ? "/dashboard" : "/"}
          className="flex items-center gap-2 font-semibold text-primary-strong"
        >
          <LogoMark className="h-8 w-8" />
          <span className="text-base tracking-tight">JAMB Naija</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                  active
                    ? "bg-primary-soft text-primary"
                    : "text-muted hover:bg-primary-soft/60 hover:text-primary"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {authed ? (
            <>
              {label ? (
                <span className="max-w-[10rem] truncate text-xs font-medium text-muted">
                  {label}
                </span>
              ) : null}
              <Button variant="secondary" type="button" onClick={logout}>
                Log out
              </Button>
            </>
          ) : authed === false ? (
            <>
              <Link href="/login">
                <Button variant="secondary">Log in</Button>
              </Link>
              <Link href="/register">
                <Button>Get started</Button>
              </Link>
            </>
          ) : (
            <span className="text-xs text-muted">…</span>
          )}
        </div>

        <button
          type="button"
          className="min-h-11 rounded-lg border border-line px-3 text-sm font-semibold md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          Menu
        </button>
      </div>

      {open ? (
        <div className="border-t border-line px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                    active ? "bg-primary-soft text-primary" : "text-muted"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              );
            })}
            {authed ? (
              <button
                type="button"
                className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-primary"
                onClick={() => {
                  setOpen(false);
                  void logout();
                }}
              >
                Log out
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-primary"
                  onClick={() => setOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg px-3 py-2 text-sm font-semibold text-primary"
                  onClick={() => setOpen(false)}
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
