import { type HTMLAttributes, type ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

export function Card({ children, className = "", ...rest }: CardProps) {
  return (
    <div
      className={`rounded-[var(--radius-lg)] border border-line bg-surface p-4 shadow-sm ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
