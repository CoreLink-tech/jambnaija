import { LoadingState } from "@/components/ui/feedback";

export default function AdminLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <LoadingState label="Loading admin…" />
    </div>
  );
}
