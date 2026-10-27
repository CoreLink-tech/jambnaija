"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoMark } from "@/components/icons/brand";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/exams/setup", label: "Exams" },
  { href: "/subjects", label: "Subjects" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/faq", label: "FAQ" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold text-primary-strong">
          <LogoMark className="h-8 w-8" />
          <span className="text-base tracking-tight">JAMB Naija</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-primary-soft hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/login">
            <Button variant="secondary">Log in</Button>
          </Link>
          <Link href="/register">
            <Button>Get started</Button>
          </Link>
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
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/login" className="rounded-lg px-3 py-2 text-sm font-semibold text-primary">
              Log in
            </Link>
            <Link href="/register" className="rounded-lg px-3 py-2 text-sm font-semibold text-primary">
              Get started
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
