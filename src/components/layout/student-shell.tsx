"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <Link
            href="/dashboard"
            className="font-[family-name:var(--font-display)] text-lg font-bold text-primary-strong"
          >
            Jambnaija
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                    active
                      ? "bg-primary-soft text-primary"
                      : "text-muted hover:bg-primary-soft/60 hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            {userLabel ? (
              <span className="hidden max-w-[8rem] truncate text-xs font-medium text-muted sm:inline">
                {userLabel}
              </span>
            ) : null}
            <Button variant="secondary" type="button" onClick={logout}>
              Log out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-6 pb-24">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-line bg-white/95 backdrop-blur sm:hidden">
        <div className="mx-auto flex max-w-5xl justify-around px-1 py-2">
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`min-w-0 flex-1 rounded-lg px-1 py-2 text-center text-[11px] font-semibold ${
                  active ? "bg-primary-soft text-primary" : "text-muted"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
