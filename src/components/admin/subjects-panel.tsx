"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/client/api";

type Subject = {
  id: string;
  name: string;
  description: string;
  studyCount: number;
  cbtCount: number;
  topicCount: number;
};

export function SubjectsPanel() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [topicSubjectId, setTopicSubjectId] = useState("");
  const [topicName, setTopicName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function load() {
    const res = await api<{ subjects: Subject[] }>("/api/admin/subjects");
    if (res.error) setError(res.error);
    else setSubjects(res.data?.subjects ?? []);
  }

  useEffect(() => {
    void load();
  }, []);

  async function createSubject(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");
    const res = await api("/api/admin/subjects", {
      method: "POST",
      body: JSON.stringify({ name, description }),
    });
    if (res.error) setError(res.error);
    else {
      setMessage("Subject created.");
      setName("");
      setDescription("");
      await load();
    }
  }

  async function createTopic(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");
    const res = await api("/api/admin/topics", {
      method: "POST",
      body: JSON.stringify({ subjectId: topicSubjectId, name: topicName }),
    });
    if (res.error) setError(res.error);
    else {
      setMessage("Topic created.");
      setTopicName("");
      await load();
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold">
          Subjects & topics
        </h1>
        <p className="text-sm text-muted">Create subjects and attach topics.</p>
      </div>

      {message ? <p className="text-sm text-ok">{message}</p> : null}
      {error ? <p className="text-sm text-danger">{error}</p> : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="mb-3 font-semibold">New subject</h2>
          <form className="space-y-3" onSubmit={createSubject}>
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Button type="submit">Create subject</Button>
          </form>
        </Card>
        <Card>
          <h2 className="mb-3 font-semibold">New topic</h2>
          <form className="space-y-3" onSubmit={createTopic}>
            <select
              className="w-full rounded-[var(--radius-md)] border border-line px-3 py-2.5 text-sm"
              value={topicSubjectId}
              onChange={(e) => setTopicSubjectId(e.target.value)}
              required
            >
              <option value="">Select subject</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            <Input
              placeholder="Topic name"
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              required
            />
            <Button type="submit">Create topic</Button>
          </form>
        </Card>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {subjects.map((s) => (
          <Card key={s.id} className="space-y-1">
            <h3 className="font-semibold">{s.name}</h3>
            <p className="text-sm text-muted">{s.description}</p>
            <p className="text-xs text-muted">
              {s.topicCount} topics · {s.studyCount} study · {s.cbtCount} CBT
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
