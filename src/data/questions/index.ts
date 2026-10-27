import type { JambQuestion, JambSubject, QuestionOrigin } from "./types";
import { SUBJECTS, YEARS } from "./types";

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

const ALL: JambQuestion[] = [
  ...eng2020, ...eng2021, ...eng2022, ...eng2023, ...eng2024, ...eng2025, ...eng2026,
  ...mat2020, ...mat2021, ...mat2022, ...mat2023, ...mat2024, ...mat2025, ...mat2026,
  ...phy2020, ...phy2021, ...phy2022, ...phy2023, ...phy2024, ...phy2025, ...phy2026,
  ...che2020, ...che2021, ...che2022, ...che2023, ...che2024, ...che2025, ...che2026,
  ...bio2020, ...bio2021, ...bio2022, ...bio2023, ...bio2024, ...bio2025, ...bio2026,
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
 * Multi-subject: roughly equal split across subjects when possible.
 */
export function selectQuestions(options: {
  subjects: JambSubject[];
  count: number;
  years?: number[];
  yearFrom?: number;
  yearTo?: number;
  origin?: QuestionOrigin | "all";
}): { questions: JambQuestion[]; shortage: string | null } {
  const pool = filterQuestions({
    subjects: options.subjects,
    years: options.years,
    yearFrom: options.yearFrom,
    yearTo: options.yearTo,
    origin: options.origin,
  });

  if (pool.length === 0) {
    return { questions: [], shortage: "No questions match this configuration." };
  }

  const perSubject = new Map<JambSubject, JambQuestion[]>();
  for (const s of options.subjects) perSubject.set(s, []);
  for (const q of shuffle(pool)) {
    const list = perSubject.get(q.subject);
    if (list) list.push(q);
  }

  const n = options.subjects.length;
  const base = Math.floor(options.count / n);
  let remainder = options.count % n;
  const picked: JambQuestion[] = [];

  for (const s of options.subjects) {
    const list = perSubject.get(s) || [];
    const take = base + (remainder > 0 ? 1 : 0);
    if (remainder > 0) remainder -= 1;
    picked.push(...list.slice(0, Math.min(take, list.length)));
  }

  // Fill remaining slots from leftover pool without duplicating
  if (picked.length < options.count) {
    const used = new Set(picked.map((q) => q.id));
    for (const q of shuffle(pool)) {
      if (picked.length >= options.count) break;
      if (!used.has(q.id)) {
        picked.push(q);
        used.add(q.id);
      }
    }
  }

  const shortage =
    picked.length < options.count
      ? `Only ${picked.length} of ${options.count} requested questions are available for this filter.`
      : null;

  // Keep subject order (as selected); shuffle only within each subject section
  const bySubject = new Map<JambSubject, JambQuestion[]>();
  for (const s of options.subjects) bySubject.set(s, []);
  for (const q of picked) {
    const list = bySubject.get(q.subject);
    if (list) list.push(q);
    else {
      // leftover subject not in original list — append at end
      const extra = bySubject.get(options.subjects[0]);
      if (extra) extra.push(q);
    }
  }
  const ordered: JambQuestion[] = [];
  for (const s of options.subjects) {
    ordered.push(...shuffle(bySubject.get(s) || []));
  }

  return { questions: ordered.slice(0, options.count), shortage };
}

export function bankStats() {
  const stats: Record<string, Record<number, { total: number; practice: number; official: number }>> = {};
  for (const s of SUBJECTS) {
    stats[s] = {};
    for (const y of YEARS) {
      stats[s][y] = { total: 0, practice: 0, official: 0 };
    }
  }
  for (const q of ALL) {
    const cell = stats[q.subject][q.year];
    if (!cell) continue;
    cell.total += 1;
    if (q.origin === "original_practice") cell.practice += 1;
    else cell.official += 1;
  }
  return { total: ALL.length, bySubjectYear: stats };
}

export { SUBJECTS, YEARS };
export type { JambQuestion, JambSubject, QuestionOrigin };
