import { SUBJECT_META, type JambSubject } from "@/data/questions/types";

export function formatExamFocusLabel(input: {
  subjects: string[];
  yearFrom?: number;
  yearTo?: number;
}): string {
  const names = input.subjects.map((s) => {
    const meta = SUBJECT_META[s as JambSubject];
    return meta?.short ?? s;
  });
  const subjectPart =
    names.length <= 2
      ? names.join(" & ")
      : `${names.slice(0, 2).join(", ")} +${names.length - 2}`;
  const from = input.yearFrom ?? 2020;
  const to = input.yearTo ?? 2026;
  return `${subjectPart} · ${from}–${to}`;
}

function extractJsonBlob(raw: string): string | null {
  const idx = raw.indexOf("{");
  if (idx === -1) return null;
  return raw.slice(idx);
}

/** Display helper for history cards (handles legacy JSON labels). */
export function displayFocusLabel(
  raw: string | null | undefined,
  fallback = "Practice exam",
): string {
  if (!raw) return fallback;
  const trimmed = raw.trim();
  const blob = extractJsonBlob(trimmed);
  if (blob) {
    try {
      const meta = JSON.parse(blob) as {
        subjects?: string[];
        yearFrom?: number;
        yearTo?: number;
      };
      if (meta.subjects?.length) {
        return formatExamFocusLabel({
          subjects: meta.subjects,
          yearFrom: meta.yearFrom,
          yearTo: meta.yearTo,
        });
      }
    } catch {
      /* ignore */
    }
  }
  // Prefer first line if dual-format "Label\n{json}"
  const first = trimmed.split("\n")[0]?.trim();
  return first || fallback;
}

export function parseFocusMeta(raw: string | null | undefined): {
  subjects: string[];
  yearFrom?: number;
  yearTo?: number;
  origin?: string;
} {
  if (!raw) return { subjects: [] };
  const blob = extractJsonBlob(raw);
  if (!blob) return { subjects: [] };
  try {
    const meta = JSON.parse(blob) as {
      subjects?: string[];
      yearFrom?: number;
      yearTo?: number;
      origin?: string;
    };
    return {
      subjects: meta.subjects ?? [],
      yearFrom: meta.yearFrom,
      yearTo: meta.yearTo,
      origin: meta.origin,
    };
  } catch {
    return { subjects: [] };
  }
}
