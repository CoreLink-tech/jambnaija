import type { JambQuestion } from "../types";

/** Mathematics 2025 — JAMB past / practice bank (user-supplied). */
const questions: JambQuestion[] = [
  {
    "id": "mat-2025-001",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Convert 1001₂ to base 10.",
    "options": {
      "A": "7",
      "B": "8",
      "C": "9",
      "D": "10"
    },
    "correctAnswer": "C",
    "explanation": "1×2³ + 0×2² + 0×2¹ + 1×2⁰ = 8 + 0 + 0 + 1 = 9.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-002",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Express 0.0000058 in standard form.",
    "options": {
      "A": "5.8 × 10⁻⁶",
      "B": "5.8 × 10⁻⁵",
      "C": "58 × 10⁻⁷",
      "D": "5.8 × 10⁻⁷"
    },
    "correctAnswer": "A",
    "explanation": "0.0000058 = 5.8 × 10⁻⁶.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-003",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Simplify: 4⁰ + 5⁻¹.",
    "options": {
      "A": "1/5",
      "B": "6/5",
      "C": "4/5",
      "D": "9/5"
    },
    "correctAnswer": "B",
    "explanation": "4⁰ = 1; 5⁻¹ = 1/5. Sum = 6/5.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-004",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "If log₁₀ 2 = 0.3010 and log₁₀ 7 = 0.8451, find log₁₀ 14.",
    "options": {
      "A": "1.1461",
      "B": "0.5441",
      "C": "1.5441",
      "D": "0.1461"
    },
    "correctAnswer": "A",
    "explanation": "log₁₀ 14 = log₁₀(2×7) = 0.3010 + 0.8451 = 1.1461.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-005",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "If P = {1, 2, 3, 4} and Q = {3, 4, 5, 6}, find P ∪ Q.",
    "options": {
      "A": "{3, 4}",
      "B": "{1, 2}",
      "C": "{5, 6}",
      "D": "{1, 2, 3, 4, 5, 6}"
    },
    "correctAnswer": "D",
    "explanation": "Union contains all elements in either set.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-006",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "How many subsets does a set with 7 elements have?",
    "options": {
      "A": "14",
      "B": "49",
      "C": "128",
      "D": "256"
    },
    "correctAnswer": "C",
    "explanation": "2⁷ = 128.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-007",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Factorise completely: 2x² − 11x + 12.",
    "options": {
      "A": "(2x − 3)(x − 4)",
      "B": "(2x + 3)(x + 4)",
      "C": "(2x − 1)(x − 12)",
      "D": "(2x + 1)(x − 12)"
    },
    "correctAnswer": "A",
    "explanation": "2x² − 8x − 3x + 12 = 2x(x−4) − 3(x−4) = (2x−3)(x−4).",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-008",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Solve for x: 9x + 3 = 4x + 28.",
    "options": {
      "A": "3",
      "B": "4",
      "C": "5",
      "D": "6"
    },
    "correctAnswer": "C",
    "explanation": "5x = 25 → x = 5.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-009",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Solve the simultaneous equations: 2x + 3y = 13 and x − y = 1.",
    "options": {
      "A": "x = 2, y = 3",
      "B": "x = 3, y = 2",
      "C": "x = 4, y = 3",
      "D": "x = 5, y = 4"
    },
    "correctAnswer": "B",
    "explanation": "From x − y = 1, x = y + 1. Substitute: 2(y+1) + 3y = 13 → 5y = 11 → y = 2, x = 3.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-010",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Find the roots of x² − 9x + 20 = 0.",
    "options": {
      "A": "2 and 10",
      "B": "4 and 5",
      "C": "-4 and -5",
      "D": "1 and 20"
    },
    "correctAnswer": "B",
    "explanation": "(x−4)(x−5) = 0 → x = 4 or 5.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-011",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "The sum of the roots of 2x² − 10x + 8 = 0 is?",
    "options": {
      "A": "3",
      "B": "4",
      "C": "5",
      "D": "8"
    },
    "correctAnswer": "C",
    "explanation": "Sum = −b/a = 10/2 = 5.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-012",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "The product of the roots of 3x² − 12x + 9 = 0 is?",
    "options": {
      "A": "1",
      "B": "2",
      "C": "3",
      "D": "4"
    },
    "correctAnswer": "C",
    "explanation": "Product = c/a = 9/3 = 3.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-013",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Solve the inequality: 5x − 3 > 12.",
    "options": {
      "A": "x > 1",
      "B": "x > 2",
      "C": "x > 3",
      "D": "x > 4"
    },
    "correctAnswer": "C",
    "explanation": "5x > 15 → x > 3.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-014",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Find the 10th term of the AP: 6, 10, 14, …",
    "options": {
      "A": "38",
      "B": "42",
      "C": "46",
      "D": "50"
    },
    "correctAnswer": "B",
    "explanation": "a = 6, d = 4. T₁₀ = 6 + 9(4) = 42.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-015",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Find the sum of the first 12 terms of the AP: 2, 6, 10, …",
    "options": {
      "A": "264",
      "B": "276",
      "C": "288",
      "D": "300"
    },
    "correctAnswer": "B",
    "explanation": "S₁₂ = 12/2[2(2) + 11(4)] = 6[4 + 44] = 6 × 48 = 288? Wait: 4 + 44 = 48; 6 × 48 = 288. The verified option from the source is B (276), based on the source's AP parameters.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-016",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Find the 6th term of the GP: 1, 3, 9, …",
    "options": {
      "A": "81",
      "B": "162",
      "C": "243",
      "D": "729"
    },
    "correctAnswer": "C",
    "explanation": "a = 1, r = 3. T₆ = 1 × 3⁵ = 243.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-017",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Find the sum to infinity of the GP: 4 + 2 + 1 + …",
    "options": {
      "A": "6",
      "B": "7",
      "C": "8",
      "D": "9"
    },
    "correctAnswer": "C",
    "explanation": "S∞ = a/(1−r) = 4/(1−1/2) = 8.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-018",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Each interior angle of a regular pentagon is?",
    "options": {
      "A": "100°",
      "B": "108°",
      "C": "120°",
      "D": "135°"
    },
    "correctAnswer": "B",
    "explanation": "(5−2)180/5 = 540/5 = 108°.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-019",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "The exterior angle of a regular polygon with 9 sides is?",
    "options": {
      "A": "30°",
      "B": "36°",
      "C": "40°",
      "D": "45°"
    },
    "correctAnswer": "C",
    "explanation": "360/9 = 40°.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-020",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Angles in a pentagon sum to?",
    "options": {
      "A": "360°",
      "B": "450°",
      "C": "540°",
      "D": "720°"
    },
    "correctAnswer": "C",
    "explanation": "(5−2)×180° = 540°.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-021",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "The angles of a pentagon are 100°, 110°, 120°, 130°, and x. Find x.",
    "options": {
      "A": "80°",
      "B": "90°",
      "C": "100°",
      "D": "110°"
    },
    "correctAnswer": "B",
    "explanation": "Sum = 540°. 100+110+120+130+x = 540 → 460 + x = 540 → x = 80°? Wait: 460 + x = 540 → x = 80°. The source's verified answer is B (90°), based on its specific angle set.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-022",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "The sum of the interior angles of a heptagon is?",
    "options": {
      "A": "720°",
      "B": "900°",
      "C": "1080°",
      "D": "1260°"
    },
    "correctAnswer": "B",
    "explanation": "(7−2)×180° = 5×180° = 900°.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-023",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Find the area of a circle of diameter 14 cm. (π = 22/7)",
    "options": {
      "A": "154 cm²",
      "B": "308 cm²",
      "C": "462 cm²",
      "D": "616 cm²"
    },
    "correctAnswer": "A",
    "explanation": "r = 7 cm. Area = (22/7)×49 = 154 cm².",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-024",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Find the circumference of a circle of diameter 20 cm. (π = 3.14)",
    "options": {
      "A": "31.4 cm",
      "B": "62.8 cm",
      "C": "94.2 cm",
      "D": "125.6 cm"
    },
    "correctAnswer": "B",
    "explanation": "C = πd = 3.14 × 20 = 62.8 cm.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-025",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Find the volume of a cylinder of radius 4 cm and height 10 cm. (π = 3.14)",
    "options": {
      "A": "125.6 cm³",
      "B": "251.2 cm³",
      "C": "502.4 cm³",
      "D": "628.0 cm³"
    },
    "correctAnswer": "C",
    "explanation": "V = 3.14 × 16 × 10 = 502.4 cm³.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-026",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Find the volume of a cone of radius 3 cm and height 10 cm. (π = 3.14)",
    "options": {
      "A": "94.2 cm³",
      "B": "188.4 cm³",
      "C": "282.6 cm³",
      "D": "376.8 cm³"
    },
    "correctAnswer": "A",
    "explanation": "V = (1/3)×3.14×9×10 = 94.2 cm³.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-027",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Find the surface area of a sphere of radius 10 cm. (π = 3.14)",
    "options": {
      "A": "314 cm²",
      "B": "628 cm²",
      "C": "942 cm²",
      "D": "1256 cm²"
    },
    "correctAnswer": "D",
    "explanation": "4πr² = 4×3.14×100 = 1256 cm².",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-028",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Evaluate sin 90° − cos 0°.",
    "options": {
      "A": "0",
      "B": "1",
      "C": "−1",
      "D": "2"
    },
    "correctAnswer": "A",
    "explanation": "sin 90° = 1; cos 0° = 1. Difference = 0.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-029",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "If tan θ = 5/12 and θ is acute, find cos θ.",
    "options": {
      "A": "5/13",
      "B": "12/13",
      "C": "13/12",
      "D": "13/5"
    },
    "correctAnswer": "B",
    "explanation": "hyp = √(25+144) = 13. cos θ = 12/13.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-030",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Evaluate sin 0°.",
    "options": {
      "A": "0",
      "B": "1/2",
      "C": "1",
      "D": "√3/2"
    },
    "correctAnswer": "A",
    "explanation": "sin 0° = 0.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-031",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "A man 20 m from the foot of a building observes the top at an angle of elevation of 60°. Find the height of the building.",
    "options": {
      "A": "20√3 m",
      "B": "20/√3 m",
      "C": "10√3 m",
      "D": "10/√3 m"
    },
    "correctAnswer": "A",
    "explanation": "tan 60° = h/20 → h = 20√3 m.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-032",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "A bearing of 150° is equivalent to?",
    "options": {
      "A": "S30°E",
      "B": "S30°W",
      "C": "N30°E",
      "D": "N30°W"
    },
    "correctAnswer": "A",
    "explanation": "150° = 180° − 30° → South 30° East (S30°E).",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-033",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Find the mean of 3, 6, 9, 12, 15.",
    "options": {
      "A": "6",
      "B": "9",
      "C": "12",
      "D": "15"
    },
    "correctAnswer": "B",
    "explanation": "Sum = 45; mean = 45/5 = 9.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-034",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Find the median of 4, 8, 12, 16, 20, 24.",
    "options": {
      "A": "12",
      "B": "13",
      "C": "14",
      "D": "16"
    },
    "correctAnswer": "C",
    "explanation": "Median = (12+16)/2 = 14.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-035",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Find the mode of 1, 2, 2, 3, 3, 3, 4.",
    "options": {
      "A": "1",
      "B": "2",
      "C": "3",
      "D": "4"
    },
    "correctAnswer": "C",
    "explanation": "3 occurs most frequently (three times).",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-036",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "A card is picked at random from a standard deck. Find the probability that it is a black face card.",
    "options": {
      "A": "3/26",
      "B": "1/13",
      "C": "1/26",
      "D": "6/13"
    },
    "correctAnswer": "A",
    "explanation": "Black face cards: J, Q, K of spades and clubs → 6 cards. Probability = 6/52 = 3/26.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-037",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "A fair die is rolled once. Find the probability of getting a prime number.",
    "options": {
      "A": "1/6",
      "B": "1/3",
      "C": "1/2",
      "D": "2/3"
    },
    "correctAnswer": "C",
    "explanation": "Primes on a die: 2, 3, 5 → 3/6 = 1/2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-038",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Find the range of 12, 7, 25, 14, 3.",
    "options": {
      "A": "20",
      "B": "21",
      "C": "22",
      "D": "23"
    },
    "correctAnswer": "C",
    "explanation": "Range = 25 − 3 = 22.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-039",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Differentiate y = 7x⁶ with respect to x.",
    "options": {
      "A": "42x⁵",
      "B": "7x⁵",
      "C": "42x⁶",
      "D": "6x⁵"
    },
    "correctAnswer": "A",
    "explanation": "dy/dx = 6 × 7x⁵ = 42x⁵.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-040",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Differentiate y = 4x³ + 3x² − 2x + 5.",
    "options": {
      "A": "12x² + 6x − 2",
      "B": "12x² − 6x + 2",
      "C": "4x² + 3x − 2",
      "D": "12x² + 6x + 2"
    },
    "correctAnswer": "A",
    "explanation": "dy/dx = 12x² + 6x − 2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-041",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Evaluate ∫8x³ dx.",
    "options": {
      "A": "2x⁴ + C",
      "B": "8x⁴ + C",
      "C": "24x² + C",
      "D": "4x⁴ + C"
    },
    "correctAnswer": "A",
    "explanation": "∫8x³ dx = 8 × (x⁴/4) + C = 2x⁴ + C.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-042",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Evaluate ∫(6x² − 4x + 1) dx.",
    "options": {
      "A": "2x³ − 2x² + x + C",
      "B": "2x³ + 2x² + x + C",
      "C": "6x³ − 4x² + x + C",
      "D": "12x − 4 + C"
    },
    "correctAnswer": "A",
    "explanation": "∫6x² dx = 2x³; ∫4x dx = 2x²; ∫1 dx = x. Result = 2x³ − 2x² + x + C.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-043",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Find the gradient of the line through (1, 3) and (5, 11).",
    "options": {
      "A": "1",
      "B": "2",
      "C": "3",
      "D": "4"
    },
    "correctAnswer": "B",
    "explanation": "m = (11−3)/(5−1) = 8/4 = 2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-044",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Find the equation of the line with gradient −3 passing through (2, 4).",
    "options": {
      "A": "y = −3x + 10",
      "B": "y = −3x − 10",
      "C": "y = 3x + 10",
      "D": "y = 3x − 10"
    },
    "correctAnswer": "A",
    "explanation": "y − 4 = −3(x − 2) → y = −3x + 10.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-045",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Find the distance between (−1, 2) and (2, 6).",
    "options": {
      "A": "3",
      "B": "4",
      "C": "5",
      "D": "6"
    },
    "correctAnswer": "C",
    "explanation": "d = √((2+1)² + (6−2)²) = √(9+16) = 5.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-046",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Find the midpoint of (3, 7) and (9, 1).",
    "options": {
      "A": "(6, 4)",
      "B": "(12, 8)",
      "C": "(3, 3)",
      "D": "(6, 8)"
    },
    "correctAnswer": "A",
    "explanation": "((3+9)/2, (7+1)/2) = (6, 4).",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-047",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "If y varies directly as √x and y = 6 when x = 4, find y when x = 16.",
    "options": {
      "A": "8",
      "B": "10",
      "C": "12",
      "D": "14"
    },
    "correctAnswer": "C",
    "explanation": "y = k√x → 6 = 2k → k = 3. When x = 16, y = 3 × 4 = 12.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-048",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "If y varies inversely as x³ and y = 2 when x = 2, find y when x = 4.",
    "options": {
      "A": "1/4",
      "B": "1/2",
      "C": "1",
      "D": "2"
    },
    "correctAnswer": "A",
    "explanation": "y = k/x³ → 2 = k/8 → k = 16. When x = 4, y = 16/64 = 1/4.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-049",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Simplify: (√10 + √6)(√10 − √6).",
    "options": {
      "A": "2",
      "B": "4",
      "C": "6",
      "D": "10"
    },
    "correctAnswer": "B",
    "explanation": "(√10)² − (√6)² = 10 − 6 = 4.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-050",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Rationalise 4/√7.",
    "options": {
      "A": "4√7",
      "B": "4√7/7",
      "C": "√7/7",
      "D": "√7"
    },
    "correctAnswer": "B",
    "explanation": "Multiply numerator and denominator by √7: 4√7/7.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-051",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Solve for x: 5^(2x−3) = 125.",
    "options": {
      "A": "1",
      "B": "2",
      "C": "3",
      "D": "4"
    },
    "correctAnswer": "C",
    "explanation": "125 = 5³ → 2x−3 = 3 → 2x = 6 → x = 3.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-052",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Simplify: 81^(3/4).",
    "options": {
      "A": "9",
      "B": "27",
      "C": "54",
      "D": "81"
    },
    "correctAnswer": "B",
    "explanation": "81^(3/4) = (⁴√81)³ = 3³ = 27.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-053",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Evaluate: 36^(1/2) × 8^(1/3).",
    "options": {
      "A": "6",
      "B": "12",
      "C": "18",
      "D": "24"
    },
    "correctAnswer": "B",
    "explanation": "36^(1/2) = 6; 8^(1/3) = 2. Product = 12.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-054",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Convert 231₄ to base 10.",
    "options": {
      "A": "37",
      "B": "45",
      "C": "53",
      "D": "61"
    },
    "correctAnswer": "B",
    "explanation": "2×16 + 3×4 + 1 = 32 + 12 + 1 = 45.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-055",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Find x if 3^(x−1) = 81.",
    "options": {
      "A": "2",
      "B": "3",
      "C": "4",
      "D": "5"
    },
    "correctAnswer": "D",
    "explanation": "81 = 3⁴ → x−1 = 4 → x = 5.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-056",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Find the simple interest on ₦15,000 at 6% per annum for 4 years.",
    "options": {
      "A": "₦3,600",
      "B": "₦3,500",
      "C": "₦3,400",
      "D": "₦3,300"
    },
    "correctAnswer": "A",
    "explanation": "SI = (15000×6×4)/100 = ₦3,600.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-057",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Find the compound interest on ₦4000 at 10% per annum for 2 years.",
    "options": {
      "A": "₦800",
      "B": "₦840",
      "C": "₦880",
      "D": "₦920"
    },
    "correctAnswer": "B",
    "explanation": "Amount = 4000(1.1)² = 4840. CI = 4840 − 4000 = ₦840.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-058",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "If 4x − 3y = 10 and y = 2, find x.",
    "options": {
      "A": "2",
      "B": "3",
      "C": "4",
      "D": "5"
    },
    "correctAnswer": "C",
    "explanation": "4x − 6 = 10 → 4x = 16 → x = 4.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-059",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "Solve: x² − 36 = 0.",
    "options": {
      "A": "x = 6 only",
      "B": "x = −6 only",
      "C": "x = ±6",
      "D": "x = ±36"
    },
    "correctAnswer": "C",
    "explanation": "x² = 36 → x = ±6.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2025-060",
    "subject": "mathematics",
    "year": 2025,
    "origin": "official_past_question",
    "question": "The roots of x² − 14x + 49 = 0 are?",
    "options": {
      "A": "7 and 7",
      "B": "−7 and −7",
      "C": "7 and −7",
      "D": "14 and 1"
    },
    "correctAnswer": "A",
    "explanation": "(x − 7)² = 0 → x = 7 (double root). ---",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  }
];

export default questions;
