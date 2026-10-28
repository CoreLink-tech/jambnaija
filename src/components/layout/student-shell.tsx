"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/client/api";

const nav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/exams/setup", label: "Exams" },
  { href: "/subjects", label: "Subjects" },
  { href: "/study", label: "Study" },
  { href: "/subscription", label: "Plan" },
];

export function StudentShell({
  children,
  userLabel,
}: {
  children: React.ReactNode;
  userLabel?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // Close drawer after navigation on small screens
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  async function logout() {
    await api("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar — mobile menu trigger + brand */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-line bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-primary transition hover:bg-primary-soft"
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-5 rounded bg-current transition-transform duration-300 ease-out ${
                open ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-5 rounded bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-3 block h-0.5 w-5 rounded bg-current transition-transform duration-300 ease-out ${
                open ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
        <Link
          href="/dashboard"
          className="font-[family-name:var(--font-display)] text-lg font-bold text-primary-strong"
        >
          Jambnaija
        </Link>
        <Button variant="secondary" type="button" onClick={logout} className="!px-3 !py-1.5 text-xs">
          Log out
        </Button>
      </header>

      {/* Backdrop for mobile drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-line bg-white shadow-[var(--shadow-md)] transition-transform duration-300 ease-out lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 border-b border-line px-5 py-4">
          <Link
            href="/dashboard"
            className="font-[family-name:var(--font-display)] text-lg font-bold text-primary-strong"
          >
            Jambnaija
          </Link>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-lg px-3 py-2.5 text-sm font-semibold transition-all duration-200 ease-out ${
                  active
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted hover:bg-primary-soft hover:text-primary"
                }`}
              >
                <span
                  className={`absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-accent transition-all duration-300 ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-2 border-t border-line p-4">
          {userLabel ? (
            <p className="truncate text-xs font-medium text-muted">{userLabel}</p>
          ) : null}
          <Button variant="secondary" type="button" className="w-full" onClick={logout}>
            Log out
          </Button>
        </div>
      </aside>

      {/* Main content shifts on desktop */}
      <div className="min-h-screen transition-[padding] duration-300 ease-out lg:pl-64">
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
      </div>
    </div>
  );
}
