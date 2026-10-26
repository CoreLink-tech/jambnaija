import { type ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[var(--radius-lg)] border border-line bg-surface p-4 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
