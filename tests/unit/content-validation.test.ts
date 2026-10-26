import { describe, it, expect } from "vitest";
import {
  validateBundledQuestion,
  validateManifest,
} from "@/lib/validation/content";
import { contentManifest } from "@/lib/content/manifest";

describe("content validation", () => {
  it("accepts a valid bundled question", () => {
    const result = validateBundledQuestion({
      contentId: "bio-2020-cell-1",
      subjectSlug: "biology",
      topicSlug: "cell-biology",
      topicName: "Cell Biology",
      mode: "CBT",
      year: 2020,
      exam: "JAMB",
      prompt: "Which organelle is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondrion", "Ribosome", "Golgi"],
      answerIndex: 1,
      source: "sample",
      verificationStatus: "unverified",
      contentVersion: 1,
    });
    expect(result.ok).toBe(true);
  });

  it("rejects out-of-range answerIndex", () => {
    const result = validateBundledQuestion({
      contentId: "bad-1",
      subjectSlug: "biology",
      mode: "CBT",
      year: 2020,
      prompt: "A valid length question text here",
      options: ["A", "B"],
      answerIndex: 5,
      source: "sample",
    });
    expect(result.ok).toBe(false);
  });

  it("rejects CBT without year", () => {
    const result = validateBundledQuestion({
      contentId: "bad-2",
      subjectSlug: "biology",
      mode: "CBT",
      prompt: "A valid length question text here",
      options: ["A", "B", "C", "D"],
      answerIndex: 0,
      source: "sample",
    });
    expect(result.ok).toBe(false);
  });

  it("validates the repository manifest", () => {
    const result = validateManifest(contentManifest);
    expect(result.ok).toBe(true);
  });
});
