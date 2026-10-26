import { describe, it, expect } from "vitest";
import {
  normalizeOptions,
  isValidAnswerIndex,
} from "@/lib/db/import-strategy";

describe("import strategy helpers", () => {
  it("normalizes valid options arrays", () => {
    expect(normalizeOptions(["A", "B", "C", "D"])).toEqual([
      "A",
      "B",
      "C",
      "D",
    ]);
  });

  it("rejects options with fewer than 2 entries", () => {
    expect(normalizeOptions(["Only one"])).toBeNull();
    expect(normalizeOptions([])).toBeNull();
    expect(normalizeOptions(null)).toBeNull();
  });

  it("validates answer index bounds", () => {
    const opts = ["A", "B", "C", "D"];
    expect(isValidAnswerIndex(opts, 0)).toBe(true);
    expect(isValidAnswerIndex(opts, 3)).toBe(true);
    expect(isValidAnswerIndex(opts, 4)).toBe(false);
    expect(isValidAnswerIndex(opts, -1)).toBe(false);
  });
});
