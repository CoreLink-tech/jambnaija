"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/client/api";

type Subject = { id: string; name: string };

type Question = {
  id: string;
  prompt: string;
  mode: string;
  year?: number | null;
  answerIndex: number;
  options: string[];
};

export function QuestionsPanel() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [items, setItems] = useState<Question[]>([]);
  const [mode, setMode] = useState<"STUDY" | "CBT">("STUDY");
  const [subjectId, setSubjectId] = useState("");
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answerIndex, setAnswerIndex] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [year, setYear] = useState("2023");
  const [topicName, setTopicName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function load() {
    const [subRes, qRes] = await Promise.all([
      api<{ subjects: Subject[] }>("/api/admin/subjects"),
      api<{ items: Question[] }>("/api/admin/questions?pageSize=20"),
    ]);
    if (subRes.data?.subjects) setSubjects(subRes.data.subjects);
    if (qRes.data?.items) setItems(qRes.data.items);
    if (qRes.error) setError(qRes.error);
  }

  useEffect(() => {
    void load();
  }, []);

  async function createQuestion(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");
    const cleaned = options.map((o) => o.trim()).filter(Boolean);
    if (cleaned.length < 2) {
      setError("Provide at least 2 options.");
      return;
    }
    const path =
      mode === "STUDY"
        ? "/api/admin/questions/study"
        : "/api/admin/questions/cbt";
    const body: Record<string, unknown> = {
      subjectId,
      prompt,
      options: cleaned,
      answerIndex,
      explanation: explanation || undefined,
      topicName: topicName || undefined,
    };
    if (mode === "CBT") {
      body.year = Number(year);
      body.exam = "JAMB";
    }
    const res = await api(path, {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (res.error) setError(res.error);
    else {
      setMessage("Question created.");
      setPrompt("");
      setOptions(["", "", "", ""]);
      setExplanation("");
      await load();
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this question?")) return;
    const res = await api(`/api/admin/questions?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (res.error) setError(res.error);
    else await load();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">
          Questions
        </h1>
        <p className="text-sm text-muted">
          Create study or CBT questions. Destructive deletes ask for confirmation.
        </p>
      </div>

      {message ? <p className="text-sm text-ok">{message}</p> : null}
      {error ? <p className="text-sm text-danger">{error}</p> : null}

      <Card>
        <form className="space-y-3" onSubmit={createQuestion}>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant={mode === "STUDY" ? "primary" : "secondary"}
              onClick={() => setMode("STUDY")}
            >
              Study
            </Button>
            <Button
              type="button"
              variant={mode === "CBT" ? "primary" : "secondary"}
              onClick={() => setMode("CBT")}
            >
              CBT
            </Button>
          </div>
          <select
            className="w-full rounded-[var(--radius-md)] border border-line px-3 py-2.5 text-sm"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            required
          >
            <option value="">Subject</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          <Input
            placeholder="Topic name (optional)"
            value={topicName}
            onChange={(e) => setTopicName(e.target.value)}
          />
          <textarea
            className="w-full rounded-[var(--radius-md)] border border-line px-3 py-2.5 text-sm"
            rows={3}
            placeholder="Question prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            required
          />
          {options.map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="radio"
                name="answer"
                checked={answerIndex === i}
                onChange={() => setAnswerIndex(i)}
              />
              <Input
                placeholder={`Option ${String.fromCharCode(65 + i)}`}
                value={opt}
                onChange={(e) => {
                  const next = [...options];
                  next[i] = e.target.value;
                  setOptions(next);
                }}
              />
            </div>
          ))}
          {mode === "CBT" ? (
            <Input
              type="number"
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          ) : (
            <Input
              placeholder="Explanation (optional)"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
            />
          )}
          <Button type="submit">Create question</Button>
        </form>
      </Card>

      <div className="space-y-2">
        {items.map((q) => (
          <Card
            key={q.id}
            className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap gap-2">
                <Badge tone="neutral">{q.mode}</Badge>
                {q.year ? <Badge tone="primary">{q.year}</Badge> : null}
              </div>
              <p className="text-sm font-medium">{q.prompt}</p>
            </div>
            <Button variant="danger" type="button" onClick={() => remove(q.id)}>
              Delete
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
