import { describe, it, expect } from "vitest";
import {
  toPublicQuestion,
  toStudyQuestion,
} from "@/server/repositories/questions";

const sample = {
  id: "q_1",
  subjectId: "sub_1",
  topicId: "top_1",
  mode: "CBT" as const,
  prompt: "Sample?",
  options: ["A", "B", "C", "D"],
  answerIndex: 2,
  explanation: "Because C",
  year: 2023,
  exam: "JAMB",
  contentId: "c1",
  source: "sample",
  published: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("question shapes", () => {
  it("public CBT shape omits answer key and explanation", () => {
    const pub = toPublicQuestion(sample);
    expect(pub).not.toHaveProperty("answerIndex");
    expect(pub).not.toHaveProperty("explanation");
    expect(pub.options).toEqual(sample.options);
    expect(pub.prompt).toBe(sample.prompt);
  });

  it("study shape includes answer and explanation", () => {
    const study = toStudyQuestion(sample);
    expect(study.answerIndex).toBe(2);
    expect(study.explanation).toBe("Because C");
  });
});
