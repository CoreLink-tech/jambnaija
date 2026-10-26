"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/client/api";

const nav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/study", label: "Study" },
  { href: "/cbt", label: "CBT" },
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
              const active = pathname.startsWith(item.href.split("#")[0]);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
                    active
                      ? "bg-blue-50 text-primary"
                      : "text-muted hover:bg-background"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            {userLabel ? (
              <span className="hidden text-xs font-medium text-muted sm:inline">
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
      <nav className="fixed bottom-0 left-0 right-0 border-t border-line bg-white/95 backdrop-blur sm:hidden safe-bottom">
        <div className="mx-auto flex max-w-5xl justify-around px-2 py-2">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href.split("#")[0]);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`min-h-11 min-w-16 rounded-lg px-3 py-2 text-center text-xs font-semibold ${
                  active ? "bg-blue-50 text-primary" : "text-muted"
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
