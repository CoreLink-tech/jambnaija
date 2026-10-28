"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/client/api";
import { SUBJECT_META, SUBJECTS, type JambSubject } from "@/data/questions/types";
import { filterQuestions } from "@/data/questions";

const MAX_SUBJECTS = 4;
const MAX_QUESTIONS = 60;
const YEARS = [2020, 2021, 2022, 2023, 2024, 2025, 2026] as const;

export function ExamSetupForm() {
  const router = useRouter();
  const [selected, setSelected] = useState<JambSubject[]>(["mathematics"]);
  const [year, setYear] = useState(2024);
  const [count, setCount] = useState(20);
  const [origin, setOrigin] = useState<
    "all" | "original_practice" | "official_past_question"
  >("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const available = useMemo(() => {
    return filterQuestions({
      subjects: selected,
      years: [year],
      origin: origin === "all" ? undefined : origin,
    }).length;
  }, [selected, year, origin]);

  const maxScore = selected.length * 100;

  function toggle(s: JambSubject) {
    setSelected((prev) => {
      if (prev.includes(s)) {
        if (prev.length === 1) return prev;
        return prev.filter((x) => x !== s);
      }
      if (prev.length >= MAX_SUBJECTS) return prev;
      return [...prev, s];
    });
  }

  async function start() {
    setLoading(true);
    setError("");
    const body = {
      subjects: selected,
      yearFrom: year,
      yearTo: year,
      years: [year],
      origin,
      count: Math.min(Math.max(5, count), MAX_QUESTIONS),
    };
    const res = await api<{ attempt: { id: string } }>("/api/exams/start", {
      method: "POST",
      body: JSON.stringify(body),
    });
    setLoading(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    router.push(`/exams/${res.data!.attempt.id}`);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary-strong">Exam setup</h1>
        <p className="mt-1 text-sm text-muted">
          Pick up to {MAX_SUBJECTS} subjects, one year, and up to {MAX_QUESTIONS}{" "}
          questions. Score is out of {maxScore} ({selected.length} × 100).
        </p>
      </div>

      <Card className="space-y-5">
        <div>
          <p className="mb-2 text-sm font-semibold">
            Subjects{" "}
            <span className="font-normal text-muted">
              ({selected.length}/{MAX_SUBJECTS})
            </span>
          </p>
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map((s) => {
              const on = selected.includes(s);
              const disabled = !on && selected.length >= MAX_SUBJECTS;
              return (
                <button
                  key={s}
                  type="button"
                  disabled={disabled}
                  onClick={() => toggle(s)}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                    on
                      ? "border-primary bg-primary text-white"
                      : disabled
                        ? "cursor-not-allowed border-line bg-surface-warm text-muted/50"
                        : "border-line bg-white text-muted hover:border-primary/40"
                  }`}
                >
                  {SUBJECT_META[s].short}
                </button>
              );
            })}
          </div>
        </div>

        <label className="block space-y-1 text-sm">
          <span className="font-semibold">Year</span>
          <select
            className="w-full rounded-[var(--radius-md)] border border-line px-3 py-2.5"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-1 text-sm">
          <span className="font-semibold">Question source</span>
          <select
            className="w-full rounded-[var(--radius-md)] border border-line px-3 py-2.5"
            value={origin}
            onChange={(e) => setOrigin(e.target.value as typeof origin)}
          >
            <option value="all">All eligible</option>
            <option value="original_practice">Original practice only</option>
            <option value="official_past_question">
              Verified past questions only
            </option>
          </select>
        </label>

        <label className="block space-y-1 text-sm">
          <span className="font-semibold">
            Number of questions (max {MAX_QUESTIONS})
          </span>
          <input
            type="number"
            min={5}
            max={MAX_QUESTIONS}
            className="w-full rounded-[var(--radius-md)] border border-line px-3 py-2.5"
            value={count}
            onChange={(e) =>
              setCount(
                Math.min(MAX_QUESTIONS, Math.max(5, Number(e.target.value) || 5)),
              )
            }
          />
        </label>

        <div className="rounded-[var(--radius-md)] bg-primary-soft px-3 py-3 text-sm text-primary-strong">
          <p className="font-semibold">Summary</p>
          <p className="mt-1">
            {selected.map((s) => SUBJECT_META[s].name).join(", ")} · {year}
          </p>
          <p className="mt-1">
            Available: <strong>{available}</strong> · Requested{" "}
            <strong>{count}</strong>
          </p>
          <p className="mt-1">
            Marked out of <strong>{maxScore}</strong> (
            {selected.length} subject{selected.length === 1 ? "" : "s"} × 100)
          </p>
        </div>

        {error ? <p className="text-sm text-danger">{error}</p> : null}

        <Button
          className="w-full"
          onClick={start}
          disabled={loading || available === 0}
        >
          {loading ? "Starting…" : "Start exam"}
        </Button>
      </Card>
    </div>
  );
}
