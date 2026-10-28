"use client";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

/**
 * Student area chrome — same top nav as the public homepage (SiteHeader).
 */
export function StudentShell({
  children,
}: {
  children: React.ReactNode;
  userLabel?: string;
}) {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
      <SiteFooter />
    </div>
  );
}
