export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "ok" | "warn" | "danger" | "primary";
}) {
  const tones = {
    neutral: "bg-background text-muted border-line",
    ok: "bg-green-50 text-ok border-green-200",
    warn: "bg-orange-50 text-accent border-orange-200",
    danger: "bg-red-50 text-danger border-red-200",
    primary: "bg-blue-50 text-primary border-blue-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
