"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/client/api";
import { PageHeader, ErrorState } from "@/components/ui/feedback";

type Subject = {
  id: string;
  name: string;
  studyCount: number;
};

type Topic = { id: string; name: string };

type StudyQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanation?: string | null;
};

export function StudyView() {
  const searchParams = useSearchParams();
  const initialSubjectId = searchParams.get("subjectId") || "";

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectId, setSubjectId] = useState(initialSubjectId);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [topicId, setTopicId] = useState("");
  const [questions, setQuestions] = useState<StudyQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [phase, setPhase] = useState<"setup" | "session">("setup");

  useEffect(() => {
    (async () => {
      const res = await api<{ subjects: Subject[] }>("/api/subjects");
      if (res.data?.subjects) setSubjects(res.data.subjects);
    })();
  }, []);

  useEffect(() => {
    if (!subjectId) {
      setTopics([]);
      return;
    }
    (async () => {
      const res = await api<{ topics: Topic[] }>(
        `/api/subjects/${subjectId}/topics`,
      );
      setTopics(res.data?.topics ?? []);
      setTopicId("");
    })();
  }, [subjectId]);

  const startSession = useCallback(async () => {
    if (!subjectId) {
      setError("Select a subject.");
      return;
    }
    setLoading(true);
    setError("");
    const res = await api<{
      questions: StudyQuestion[];
    }>("/api/practice/study-session", {
      method: "POST",
      body: JSON.stringify({
        subjectId,
        topicId: topicId || undefined,
        count: 20,
      }),
    });
    setLoading(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    const list = res.data?.questions ?? [];
    if (list.length === 0) {
      setError("No study questions available for this selection.");
      return;
    }
    setQuestions(list);
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setPhase("session");
  }, [subjectId, topicId]);

  const current = questions[index];
  const progress = useMemo(() => {
    if (!questions.length) return "0 / 0";
    return `${index + 1} / ${questions.length}`;
  }, [index, questions.length]);

  function chooseOption(i: number) {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
  }

  function next() {
    if (index + 1 >= questions.length) {
      setPhase("setup");
      setQuestions([]);
      return;
    }
    setIndex((v) => v + 1);
    setSelected(null);
    setRevealed(false);
  }

  if (phase === "session" && current) {
    const correct = selected === current.answerIndex;
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h1 className="font-[family-name:var(--font-display)] text-xl font-bold">
            Study session
          </h1>
          <Badge tone="neutral">{progress}</Badge>
        </div>

        <Card className="space-y-4">
          <p className="text-base leading-relaxed font-medium">{current.prompt}</p>
          <div className="space-y-2">
            {current.options.map((opt, i) => {
              let tone =
                "border-line bg-white hover:border-primary/40 cursor-pointer";
              if (revealed) {
                if (i === current.answerIndex) {
                  tone = "border-ok bg-green-50";
                } else if (i === selected) {
                  tone = "border-danger bg-red-50";
                } else {
                  tone = "border-line bg-white opacity-70";
                }
              } else if (selected === i) {
                tone = "border-primary bg-blue-50";
              }
              return (
                <button
                  key={i}
                  type="button"
                  className={`w-full rounded-[var(--radius-md)] border px-3 py-3 text-left text-sm ${tone}`}
                  onClick={() => chooseOption(i)}
                >
                  <span className="mr-2 font-semibold text-muted">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          {revealed ? (
            <div className="space-y-2 border-t border-line pt-3">
              <Badge tone={correct ? "ok" : "danger"}>
                {correct ? "Correct" : "Incorrect"}
              </Badge>
              {current.explanation ? (
                <p className="text-sm text-muted leading-relaxed">
                  {current.explanation}
                </p>
              ) : null}
              <Button className="w-full sm:w-auto" onClick={next}>
                {index + 1 >= questions.length ? "Finish" : "Next question"}
              </Button>
            </div>
          ) : null}
        </Card>

        <Button variant="ghost" onClick={() => setPhase("setup")}>
          Exit session
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <PageHeader
        title="Study mode"
        description="Choose a subject and optional topic. Explanations appear after each answer. Premium access required."
      />

      <Card className="space-y-4">
        <label className="block space-y-1.5">
          <span className="text-sm font-semibold">Subject</span>
          <select
            className="w-full rounded-[var(--radius-md)] border border-line bg-white px-3 py-2.5 text-sm"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
          >
            <option value="">Select subject</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.studyCount})
              </option>
            ))}
          </select>
        </label>

        <label className="block space-y-1.5">
          <span className="text-sm font-semibold">Topic (optional)</span>
          <select
            className="w-full rounded-[var(--radius-md)] border border-line bg-white px-3 py-2.5 text-sm"
            value={topicId}
            onChange={(e) => setTopicId(e.target.value)}
            disabled={!subjectId}
          >
            <option value="">All topics</option>
            {topics.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>

        {error ? <ErrorState message={error} /> : null}

        <Button onClick={startSession} disabled={loading || !subjectId}>
          {loading ? "Loading…" : "Start study session"}
        </Button>
      </Card>
    </div>
  );
}
