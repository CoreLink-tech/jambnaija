"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/client/api";
import {
  SUBJECT_META,
  SUBJECTS,
  fullPracticeCount,
  fullPracticeTotal,
  type JambSubject,
} from "@/data/questions/types";
import { filterQuestions } from "@/data/questions";

export function ExamSetupForm() {
  const router = useRouter();
  const [selected, setSelected] = useState<JambSubject[]>(["mathematics"]);
  const [yearFrom, setYearFrom] = useState(2020);
  const [yearTo, setYearTo] = useState(2026);
  const [count, setCount] = useState(20);
  const [useFullAllocation, setUseFullAllocation] = useState(false);
  const [origin, setOrigin] = useState<
    "all" | "original_practice" | "official_past_question"
  >("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const available = useMemo(() => {
    return filterQuestions({
      subjects: selected,
      yearFrom,
      yearTo,
      origin: origin === "all" ? undefined : origin,
    }).length;
  }, [selected, yearFrom, yearTo, origin]);

  const allocation = useMemo(() => {
    if (!useFullAllocation) return null;
    const map: Partial<Record<JambSubject, number>> = {};
    for (const s of selected) {
      map[s] = fullPracticeCount(s);
    }
    return map;
  }, [selected, useFullAllocation]);

  const requestedTotal = useMemo(() => {
    if (allocation) {
      return selected.reduce((sum, s) => sum + fullPracticeCount(s), 0);
    }
    return count;
  }, [allocation, selected, count]);

  function toggle(s: JambSubject) {
    setSelected((prev) => {
      if (prev.includes(s)) {
        if (prev.length === 1) return prev;
        return prev.filter((x) => x !== s);
      }
      return [...prev, s];
    });
  }

  function applyPreset(preset: "single" | "multi" | "full") {
    if (preset === "single") {
      setSelected(["mathematics"]);
      setCount(20);
      setUseFullAllocation(false);
    } else if (preset === "multi") {
      setSelected(["english", "mathematics", "biology"]);
      setCount(30);
      setUseFullAllocation(false);
    } else {
      // Full practice: all subjects, 60 English / 40 others
      setSelected([...SUBJECTS]);
      setUseFullAllocation(true);
      setCount(fullPracticeTotal(SUBJECTS));
    }
  }

  async function start() {
    setLoading(true);
    setError("");
    const body: Record<string, unknown> = {
      subjects: selected,
      yearFrom,
      yearTo,
      origin,
      count: requestedTotal,
      preset: useFullAllocation ? "full" : undefined,
    };
    if (allocation) {
      body.countsPerSubject = allocation;
    }
    const res = await api<{ attempt: { id: string }; shortage?: string | null }>(
      "/api/exams/start",
      {
        method: "POST",
        body: JSON.stringify(body),
      },
    );
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
          Configure subjects, years, and length. You must be logged in to start.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="secondary" onClick={() => applyPreset("single")}>
          Single subject
        </Button>
        <Button type="button" variant="secondary" onClick={() => applyPreset("multi")}>
          Multi-subject
        </Button>
        <Button type="button" variant="secondary" onClick={() => applyPreset("full")}>
          Full practice
        </Button>
      </div>

      <Card className="space-y-5">
        <div>
          <p className="mb-2 text-sm font-semibold">Subjects</p>
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.map((s) => {
              const on = selected.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggle(s)}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium ${
                    on
                      ? "border-primary bg-primary text-white"
                      : "border-line bg-white text-muted"
                  }`}
                >
                  {SUBJECT_META[s].short}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-1 text-sm">
            <span className="font-semibold">Year from</span>
            <select
              className="w-full rounded-[var(--radius-md)] border border-line px-3 py-2.5"
              value={yearFrom}
              onChange={(e) => setYearFrom(Number(e.target.value))}
            >
              {[2020, 2021, 2022, 2023, 2024, 2025, 2026].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
          <label className="block space-y-1 text-sm">
            <span className="font-semibold">Year to</span>
            <select
              className="w-full rounded-[var(--radius-md)] border border-line px-3 py-2.5"
              value={yearTo}
              onChange={(e) => setYearTo(Number(e.target.value))}
            >
              {[2020, 2021, 2022, 2023, 2024, 2025, 2026].map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block space-y-1 text-sm">
          <span className="font-semibold">Question source</span>
          <select
            className="w-full rounded-[var(--radius-md)] border border-line px-3 py-2.5"
            value={origin}
            onChange={(e) => setOrigin(e.target.value as typeof origin)}
          >
            <option value="all">All eligible</option>
            <option value="original_practice">Original practice only</option>
            <option value="official_past_question">Verified past questions only</option>
          </select>
        </label>

        {!useFullAllocation ? (
          <label className="block space-y-1 text-sm">
            <span className="font-semibold">Number of questions</span>
            <input
              type="number"
              min={5}
              max={400}
              className="w-full rounded-[var(--radius-md)] border border-line px-3 py-2.5"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            />
          </label>
        ) : (
          <div className="rounded-[var(--radius-md)] border border-line bg-surface-warm px-3 py-3 text-sm">
            <p className="font-semibold text-primary-strong">Full practice allocation</p>
            <ul className="mt-2 space-y-1 text-muted">
              {selected.map((s) => (
                <li key={s} className="flex justify-between gap-2">
                  <span>{SUBJECT_META[s].name}</span>
                  <span className="font-semibold text-foreground">
                    {fullPracticeCount(s)}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 font-semibold text-primary-strong">
              Total: {requestedTotal} questions
            </p>
            <p className="mt-1 text-xs text-muted">
              Use of English uses 60 questions; every other subject uses 40.
            </p>
          </div>
        )}

        <div className="rounded-[var(--radius-md)] bg-primary-soft px-3 py-3 text-sm text-primary-strong">
          <p className="font-semibold">Summary</p>
          <p className="mt-1">
            {selected.map((s) => SUBJECT_META[s].name).join(", ")} · {yearFrom}–
            {yearTo}
          </p>
          <p className="mt-1">
            Available matching questions: <strong>{available}</strong>
            {" · "}Requested <strong>{requestedTotal}</strong>
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
