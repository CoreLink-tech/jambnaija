export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-line/50 ${className}`}
      aria-hidden
    />
  );
}

export function WorkspaceSkeleton() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8" aria-busy aria-label="Loading">
      <div className="space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-3 rounded-[var(--radius-md)] border border-line bg-white p-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-4/5" />
          <Skeleton className="mt-2 h-10 w-28" />
        </div>
        <div className="space-y-3 rounded-[var(--radius-md)] border border-line bg-white p-4">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/5" />
          <Skeleton className="mt-2 h-10 w-28" />
        </div>
      </div>
      <div className="space-y-3 rounded-[var(--radius-md)] border border-line bg-white p-4">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    </div>
  );
}
