"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LogoMark } from "@/components/icons/brand";
import { api } from "@/lib/client/api";

export function SiteFooter() {
  const pathname = usePathname();
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await api<{ user: { email: string } }>("/api/auth/me");
      if (cancelled) return;
      setAuthed(Boolean(res.data?.user));
    })();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-semibold text-primary-strong">
            <LogoMark className="h-7 w-7" />
            JAMB Naija
          </div>
          <p className="text-sm text-muted">
            Timed UTME-style practice for Nigerian students. Clear reviews, subject
            focus, and steady preparation.
          </p>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold">Practice</p>
          <ul className="space-y-1 text-sm text-muted">
            <li>
              <Link href="/exams/setup" className="hover:text-primary">
                Exams
              </Link>
            </li>
            <li>
              <Link href="/subjects" className="hover:text-primary">
                Subjects
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="hover:text-primary">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold">Help</p>
          <ul className="space-y-1 text-sm text-muted">
            <li>
              <Link href="/faq" className="hover:text-primary">
                FAQ
              </Link>
            </li>
            {authed === false ? (
              <>
                <li>
                  <Link href="/login" className="hover:text-primary">
                    Log in
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-primary">
                    Register
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </div>
      <div className="border-t border-line px-4 py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} JAMB Naija. Practice platform — not affiliated
        with JAMB as an official body.
      </div>
    </footer>
  );
}
