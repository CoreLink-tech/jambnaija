import type { JambQuestion, JambSubject, QuestionOrigin } from "./types";
import { SUBJECTS, YEARS, SUBJECT_META, fullPracticeCount } from "./types";

import eng2020 from "./english/2020";
import eng2021 from "./english/2021";
import eng2022 from "./english/2022";
import eng2023 from "./english/2023";
import eng2024 from "./english/2024";
import eng2025 from "./english/2025";
import eng2026 from "./english/2026";

import mat2020 from "./mathematics/2020";
import mat2021 from "./mathematics/2021";
import mat2022 from "./mathematics/2022";
import mat2023 from "./mathematics/2023";
import mat2024 from "./mathematics/2024";
import mat2025 from "./mathematics/2025";
import mat2026 from "./mathematics/2026";

import phy2020 from "./physics/2020";
import phy2021 from "./physics/2021";
import phy2022 from "./physics/2022";
import phy2023 from "./physics/2023";
import phy2024 from "./physics/2024";
import phy2025 from "./physics/2025";
import phy2026 from "./physics/2026";

import che2020 from "./chemistry/2020";
import che2021 from "./chemistry/2021";
import che2022 from "./chemistry/2022";
import che2023 from "./chemistry/2023";
import che2024 from "./chemistry/2024";
import che2025 from "./chemistry/2025";
import che2026 from "./chemistry/2026";

import bio2020 from "./biology/2020";
import bio2021 from "./biology/2021";
import bio2022 from "./biology/2022";
import bio2023 from "./biology/2023";
import bio2024 from "./biology/2024";
import bio2025 from "./biology/2025";
import bio2026 from "./biology/2026";

import gov2020 from "./government/2020";
import gov2021 from "./government/2021";
import gov2022 from "./government/2022";
import gov2023 from "./government/2023";
import gov2024 from "./government/2024";
import gov2025 from "./government/2025";
import gov2026 from "./government/2026";

import lit2020 from "./literature/2020";
import lit2021 from "./literature/2021";
import lit2022 from "./literature/2022";
import lit2023 from "./literature/2023";
import lit2024 from "./literature/2024";
import lit2025 from "./literature/2025";
import lit2026 from "./literature/2026";

import crs2020 from "./crs/2020";
import crs2021 from "./crs/2021";
import crs2022 from "./crs/2022";
import crs2023 from "./crs/2023";
import crs2024 from "./crs/2024";
import crs2025 from "./crs/2025";
import crs2026 from "./crs/2026";

const ALL: JambQuestion[] = [
  ...eng2020, ...eng2021, ...eng2022, ...eng2023, ...eng2024, ...eng2025, ...eng2026,
  ...mat2020, ...mat2021, ...mat2022, ...mat2023, ...mat2024, ...mat2025, ...mat2026,
  ...phy2020, ...phy2021, ...phy2022, ...phy2023, ...phy2024, ...phy2025, ...phy2026,
  ...che2020, ...che2021, ...che2022, ...che2023, ...che2024, ...che2025, ...che2026,
  ...bio2020, ...bio2021, ...bio2022, ...bio2023, ...bio2024, ...bio2025, ...bio2026,
  ...gov2020, ...gov2021, ...gov2022, ...gov2023, ...gov2024, ...gov2025, ...gov2026,
  ...lit2020, ...lit2021, ...lit2022, ...lit2023, ...lit2024, ...lit2025, ...lit2026,
  ...crs2020, ...crs2021, ...crs2022, ...crs2023, ...crs2024, ...crs2025, ...crs2026,
];

const byId = new Map(ALL.map((q) => [q.id, q]));

export function getAllQuestions(): JambQuestion[] {
  return ALL;
}

export function getQuestionById(id: string): JambQuestion | undefined {
  return byId.get(id);
}

export function getQuestionsByIds(ids: string[]): JambQuestion[] {
  return ids
    .map((id) => byId.get(id))
    .filter((q): q is JambQuestion => Boolean(q));
}

export interface QuestionFilter {
  subjects?: JambSubject[];
  years?: number[];
  yearFrom?: number;
  yearTo?: number;
  origin?: QuestionOrigin | "all";
}

export function filterQuestions(filter: QuestionFilter = {}): JambQuestion[] {
  const subjects = filter.subjects?.length ? new Set(filter.subjects) : null;
  const years = filter.years?.length ? new Set(filter.years) : null;
  const from = filter.yearFrom ?? 2020;
  const to = filter.yearTo ?? 2026;
  const origin = filter.origin && filter.origin !== "all" ? filter.origin : null;

  return ALL.filter((q) => {
    if (subjects && !subjects.has(q.subject)) return false;
    if (years && !years.has(q.year)) return false;
    if (!years && (q.year < from || q.year > to)) return false;
    if (origin && q.origin !== origin) return false;
    return true;
  });
}

function dedupeByStem(items: JambQuestion[]): JambQuestion[] {
  const seen = new Set<string>();
  const out: JambQuestion[] = [];
  for (const q of items) {
    const key = q.question.trim().toLowerCase().replace(/\s+/g, " ");
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(q);
  }
  return out;
}

/** Fisher–Yates shuffle copy */
export function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Pick questions without duplication.
 * - countsPerSubject: exact take per subject (Full practice)
 * - otherwise equal split of `count` across subjects
 * Questions stay grouped by subject order.
 */
export function selectQuestions(options: {
  subjects: JambSubject[];
  count: number;
  countsPerSubject?: Partial<Record<JambSubject, number>>;
  years?: number[];
  yearFrom?: number;
  yearTo?: number;
  origin?: QuestionOrigin | "all";
}): { questions: JambQuestion[]; shortage: string | null } {
  const pool = dedupeByStem(
    filterQuestions({
      subjects: options.subjects,
      years: options.years,
      yearFrom: options.yearFrom,
      yearTo: options.yearTo,
      origin: options.origin,
    }),
  );

  if (pool.length === 0) {
    return { questions: [], shortage: "No questions match this configuration." };
  }

  const perSubject = new Map<JambSubject, JambQuestion[]>();
  for (const s of options.subjects) perSubject.set(s, []);
  for (const q of shuffle(pool)) {
    const list = perSubject.get(q.subject);
    if (list) list.push(q);
  }

  const ordered: JambQuestion[] = [];
  let requested = 0;
  let got = 0;

  if (options.countsPerSubject) {
    for (const s of options.subjects) {
      const want = options.countsPerSubject[s] ?? SUBJECT_META[s].defaultCount;
      requested += want;
      const list = perSubject.get(s) || [];
      const take = list.slice(0, Math.min(want, list.length));
      got += take.length;
      ordered.push(...shuffle(take));
    }
  } else {
    requested = options.count;
    const n = options.subjects.length;
    const base = Math.floor(options.count / n);
    let remainder = options.count % n;
    for (const s of options.subjects) {
      const list = perSubject.get(s) || [];
      const want = base + (remainder > 0 ? 1 : 0);
      if (remainder > 0) remainder -= 1;
      const take = list.slice(0, Math.min(want, list.length));
      ordered.push(...shuffle(take));
    }
    got = ordered.length;
    if (got < options.count) {
      const used = new Set(ordered.map((q) => q.id));
      for (const q of shuffle(pool)) {
        if (ordered.length >= options.count) break;
        if (!used.has(q.id)) {
          ordered.push(q);
          used.add(q.id);
        }
      }
      got = ordered.length;
    }
  }

  const shortage =
    got < requested
      ? `Only ${got} of ${requested} requested questions are available for this filter.`
      : null;

  return { questions: ordered, shortage };
}

export function bankStats() {
  const stats: Record<
    string,
    Record<number, { total: number; practice: number; official: number }>
  > = {};
  for (const s of SUBJECTS) {
    stats[s] = {};
    for (const y of YEARS) {
      stats[s][y] = { total: 0, practice: 0, official: 0 };
    }
  }
  for (const q of ALL) {
    const cell = stats[q.subject]?.[q.year];
    if (!cell) continue;
    cell.total += 1;
    if (q.origin === "original_practice") cell.practice += 1;
    else cell.official += 1;
  }
  return { total: ALL.length, bySubjectYear: stats };
}

export { SUBJECTS, YEARS, SUBJECT_META, fullPracticeCount };
export type { JambQuestion, JambSubject, QuestionOrigin };
