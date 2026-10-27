export type QuestionOrigin = "official_past_question" | "original_practice";

export type JambSubject =
  | "english"
  | "mathematics"
  | "physics"
  | "chemistry"
  | "biology"
  | "government"
  | "literature"
  | "crs";

export type AnswerKey = "A" | "B" | "C" | "D";

export interface JambQuestion {
  id: string;
  subject: JambSubject;
  year: number;
  origin: QuestionOrigin;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: AnswerKey;
  explanation: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  passageId?: string;
  source?: {
    title: string;
    url?: string;
    attribution?: string;
    licenceOrPermission?: string;
  };
  syllabusTopic?: string;
}

export interface Passage {
  id: string;
  subject: JambSubject;
  year: number;
  title?: string;
  text: string;
}

export const SUBJECT_META: Record<
  JambSubject,
  { name: string; short: string; defaultCount: number }
> = {
  english: { name: "Use of English", short: "English", defaultCount: 60 },
  mathematics: { name: "Mathematics", short: "Maths", defaultCount: 40 },
  physics: { name: "Physics", short: "Physics", defaultCount: 40 },
  chemistry: { name: "Chemistry", short: "Chem", defaultCount: 40 },
  biology: { name: "Biology", short: "Bio", defaultCount: 40 },
  government: { name: "Government", short: "Govt", defaultCount: 40 },
  literature: { name: "Literature in English", short: "Lit", defaultCount: 40 },
  crs: { name: "Christian Religious Studies", short: "CRS", defaultCount: 40 },
};

export const YEARS = [2020, 2021, 2022, 2023, 2024, 2025, 2026] as const;

export const SUBJECTS: JambSubject[] = [
  "english",
  "mathematics",
  "physics",
  "chemistry",
  "biology",
  "government",
  "literature",
  "crs",
];

/** Official-style per-subject allocation used for Full practice */
export function fullPracticeCount(subject: JambSubject): number {
  return SUBJECT_META[subject].defaultCount;
}

export function fullPracticeTotal(subjects: JambSubject[] = SUBJECTS): number {
  return subjects.reduce((sum, s) => sum + fullPracticeCount(s), 0);
}
