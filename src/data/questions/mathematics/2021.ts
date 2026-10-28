import type { JambQuestion } from "../types";

/** Mathematics 2021 — JAMB past questions (user-supplied bank). */
const questions: JambQuestion[] = [
  {
    "id": "mat-2021-001",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Convert 1101₂ to base 10.",
    "options": {
      "A": "11",
      "B": "12",
      "C": "13",
      "D": "14"
    },
    "correctAnswer": "C",
    "explanation": "1×2³ + 1×2² + 0×2¹ + 1×2⁰ = 8 + 4 + 0 + 1 = 13.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-002",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Express 0.0000025 in standard form.",
    "options": {
      "A": "2.5 × 10⁻⁵",
      "B": "2.5 × 10⁻⁶",
      "C": "2.5 × 10⁻⁷",
      "D": "25 × 10⁻⁷"
    },
    "correctAnswer": "B",
    "explanation": "0.0000025 = 2.5 × 10⁻⁶.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-003",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Simplify: 3⁰ + 2⁻².",
    "options": {
      "A": "1/4",
      "B": "3/4",
      "C": "5/4",
      "D": "7/4"
    },
    "correctAnswer": "C",
    "explanation": "3⁰ = 1; 2⁻² = 1/4. Sum = 1 + 1/4 = 5/4.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-004",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "If log₁₀ 3 = 0.4771, find log₁₀ 9.",
    "options": {
      "A": "0.4771",
      "B": "0.9542",
      "C": "1.4313",
      "D": "1.9084"
    },
    "correctAnswer": "B",
    "explanation": "log₁₀ 9 = log₁₀ 3² = 2 × 0.4771 = 0.9542.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-005",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "If A = {1, 2, 3} and B = {3, 4, 5}, find A ∪ B.",
    "options": {
      "A": "{3}",
      "B": "{1, 2}",
      "C": "{4, 5}",
      "D": "{1, 2, 3, 4, 5}"
    },
    "correctAnswer": "D",
    "explanation": "A ∪ B contains all elements in either set.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-006",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "How many subsets does a set with 5 elements have?",
    "options": {
      "A": "10",
      "B": "16",
      "C": "25",
      "D": "32"
    },
    "correctAnswer": "D",
    "explanation": "2⁵ = 32.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-007",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Factorise completely: x² − 7x + 12.",
    "options": {
      "A": "(x − 3)(x − 4)",
      "B": "(x + 3)(x + 4)",
      "C": "(x − 2)(x − 6)",
      "D": "(x + 2)(x + 6)"
    },
    "correctAnswer": "A",
    "explanation": "x² − 7x + 12 = (x − 3)(x − 4).",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-008",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Solve for x: 5x + 2 = 3x + 10.",
    "options": {
      "A": "2",
      "B": "3",
      "C": "4",
      "D": "5"
    },
    "correctAnswer": "C",
    "explanation": "2x = 8 → x = 4.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-009",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Solve the simultaneous equations: 3x + 2y = 12 and x − 2y = 4.",
    "options": {
      "A": "x = 4, y = 0",
      "B": "x = 3, y = 1",
      "C": "x = 2, y = 3",
      "D": "x = 1, y = 4"
    },
    "correctAnswer": "A",
    "explanation": "Adding: 4x = 16 → x = 4. Then 4 − 2y = 4 → y = 0.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-010",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Find the roots of x² − 7x + 10 = 0.",
    "options": {
      "A": "1 and 10",
      "B": "2 and 5",
      "C": "-2 and -5",
      "D": "3 and 4"
    },
    "correctAnswer": "B",
    "explanation": "(x − 2)(x − 5) = 0 → x = 2 or 5.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-011",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "The sum of the roots of 3x² − 9x + 6 = 0 is?",
    "options": {
      "A": "1",
      "B": "2",
      "C": "3",
      "D": "6"
    },
    "correctAnswer": "C",
    "explanation": "Sum = −b/a = 9/3 = 3.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-012",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "The product of the roots of 2x² − 5x + 3 = 0 is?",
    "options": {
      "A": "1/2",
      "B": "3/2",
      "C": "5/2",
      "D": "2/3"
    },
    "correctAnswer": "B",
    "explanation": "Product = c/a = 3/2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-013",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Solve the inequality: 4x − 1 > 7.",
    "options": {
      "A": "x > 1",
      "B": "x > 2",
      "C": "x < 2",
      "D": "x < 1"
    },
    "correctAnswer": "B",
    "explanation": "4x > 8 → x > 2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-014",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Find the 8th term of the AP: 5, 8, 11, …",
    "options": {
      "A": "23",
      "B": "26",
      "C": "29",
      "D": "32"
    },
    "correctAnswer": "B",
    "explanation": "a = 5, d = 3. T₈ = 5 + 7(3) = 26.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-015",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Find the sum of the first 20 terms of the AP: 1, 4, 7, …",
    "options": {
      "A": "570",
      "B": "580",
      "C": "590",
      "D": "600"
    },
    "correctAnswer": "C",
    "explanation": "S₂₀ = 20/2[2(1) + 19(3)] = 10[2 + 57] = 590.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-016",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Find the 4th term of the GP: 3, 9, 27, …",
    "options": {
      "A": "54",
      "B": "72",
      "C": "81",
      "D": "90"
    },
    "correctAnswer": "C",
    "explanation": "a = 3, r = 3. T₄ = 3 × 3³ = 81.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-017",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Find the sum to infinity of the GP: 2 + 1 + 1/2 + …",
    "options": {
      "A": "3",
      "B": "4",
      "C": "5",
      "D": "6"
    },
    "correctAnswer": "B",
    "explanation": "S∞ = a/(1 − r) = 2/(1 − 1/2) = 4.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-018",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Each interior angle of a regular octagon is?",
    "options": {
      "A": "120°",
      "B": "135°",
      "C": "140°",
      "D": "144°"
    },
    "correctAnswer": "B",
    "explanation": "(8 − 2)180/8 = 1080/8 = 135°.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-019",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "The exterior angle of a regular polygon with 15 sides is?",
    "options": {
      "A": "20°",
      "B": "24°",
      "C": "30°",
      "D": "36°"
    },
    "correctAnswer": "B",
    "explanation": "360/15 = 24°.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-020",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Angles at a point sum to?",
    "options": {
      "A": "90°",
      "B": "180°",
      "C": "270°",
      "D": "360°"
    },
    "correctAnswer": "D",
    "explanation": "Angles at a point sum to 360°.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-021",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "The angles of a triangle are x, 2x, and 3x. Find the largest angle.",
    "options": {
      "A": "30°",
      "B": "60°",
      "C": "90°",
      "D": "120°"
    },
    "correctAnswer": "C",
    "explanation": "x + 2x + 3x = 180° → 6x = 180° → x = 30°. Largest = 3x = 90°.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-022",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "The sum of the interior angles of a hexagon is?",
    "options": {
      "A": "540°",
      "B": "630°",
      "C": "720°",
      "D": "810°"
    },
    "correctAnswer": "C",
    "explanation": "(6 − 2) × 180° = 720°.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-023",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Find the area of a circle of radius 14 cm. (π = 22/7)",
    "options": {
      "A": "308 cm²",
      "B": "462 cm²",
      "C": "616 cm²",
      "D": "924 cm²"
    },
    "correctAnswer": "C",
    "explanation": "Area = (22/7) × 196 = 616 cm².",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-024",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Find the circumference of a circle of radius 21 cm. (π = 22/7)",
    "options": {
      "A": "66 cm",
      "B": "132 cm",
      "C": "198 cm",
      "D": "264 cm"
    },
    "correctAnswer": "B",
    "explanation": "C = 2πr = 2 × (22/7) × 21 = 132 cm.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-025",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Find the volume of a cylinder of radius 3.5 cm and height 8 cm. (π = 22/7)",
    "options": {
      "A": "154 cm³",
      "B": "308 cm³",
      "C": "462 cm³",
      "D": "616 cm³"
    },
    "correctAnswer": "B",
    "explanation": "V = (22/7) × 12.25 × 8 = 308 cm³.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-026",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Find the volume of a cone of radius 6 cm and height 7 cm. (π = 22/7)",
    "options": {
      "A": "132 cm³",
      "B": "198 cm³",
      "C": "264 cm³",
      "D": "330 cm³"
    },
    "correctAnswer": "C",
    "explanation": "V = (1/3) × (22/7) × 36 × 7 = 264 cm³.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-027",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Find the surface area of a sphere of radius 3.5 cm. (π = 22/7)",
    "options": {
      "A": "77 cm²",
      "B": "154 cm²",
      "C": "231 cm²",
      "D": "308 cm²"
    },
    "correctAnswer": "B",
    "explanation": "4 × (22/7) × 12.25 = 154 cm².",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-028",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Evaluate sin 60° − cos 30°.",
    "options": {
      "A": "0",
      "B": "1/2",
      "C": "√3/2",
      "D": "1"
    },
    "correctAnswer": "A",
    "explanation": "sin 60° = √3/2 and cos 30° = √3/2. Difference = 0.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-029",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "If sin θ = 5/13 and θ is acute, find cos θ.",
    "options": {
      "A": "5/12",
      "B": "12/13",
      "C": "13/12",
      "D": "12/5"
    },
    "correctAnswer": "B",
    "explanation": "cos θ = √(1 − 25/169) = √(144/169) = 12/13.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-030",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Evaluate tan 0°.",
    "options": {
      "A": "0",
      "B": "1/2",
      "C": "1",
      "D": "Undefined"
    },
    "correctAnswer": "A",
    "explanation": "tan 0° = 0.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-031",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "A man 10√3 m from the foot of a tower observes the top at an angle of elevation of 30°. Find the height of the tower.",
    "options": {
      "A": "5 m",
      "B": "10 m",
      "C": "15 m",
      "D": "20 m"
    },
    "correctAnswer": "B",
    "explanation": "tan 30° = h/(10√3) → h = 10√3 × (1/√3) = 10 m.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-032",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "A bearing of 225° is equivalent to?",
    "options": {
      "A": "N45°E",
      "B": "S45°E",
      "C": "S45°W",
      "D": "N45°W"
    },
    "correctAnswer": "C",
    "explanation": "225° = 180° + 45°, i.e. South 45° West.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-033",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Find the mean of 5, 10, 15, 20, 25.",
    "options": {
      "A": "10",
      "B": "15",
      "C": "20",
      "D": "25"
    },
    "correctAnswer": "B",
    "explanation": "Sum = 75; mean = 75/5 = 15.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-034",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Find the median of 2, 4, 6, 8, 10, 12.",
    "options": {
      "A": "6",
      "B": "7",
      "C": "8",
      "D": "9"
    },
    "correctAnswer": "B",
    "explanation": "Average of the two middle values: (6 + 8)/2 = 7.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-035",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Find the mode of 1, 1, 2, 3, 3, 3, 4.",
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
    "id": "mat-2021-036",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "A card is picked at random from a standard deck. Find the probability that it is an ace.",
    "options": {
      "A": "1/52",
      "B": "1/26",
      "C": "1/13",
      "D": "4/13"
    },
    "correctAnswer": "C",
    "explanation": "4 aces in 52 cards → 4/52 = 1/13.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-037",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "A fair die is rolled once. Find the probability of getting an even number.",
    "options": {
      "A": "1/6",
      "B": "1/3",
      "C": "1/2",
      "D": "2/3"
    },
    "correctAnswer": "C",
    "explanation": "Even numbers: 2, 4, 6 → 3/6 = 1/2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-038",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Find the range of 4, 8, 2, 10, 6.",
    "options": {
      "A": "6",
      "B": "7",
      "C": "8",
      "D": "9"
    },
    "correctAnswer": "C",
    "explanation": "Range = 10 − 2 = 8.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-039",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Differentiate y = 4x⁴ with respect to x.",
    "options": {
      "A": "4x³",
      "B": "8x³",
      "C": "12x³",
      "D": "16x³"
    },
    "correctAnswer": "D",
    "explanation": "dy/dx = 4 × 4x³ = 16x³.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-040",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Differentiate y = x³ − 3x² + 2.",
    "options": {
      "A": "3x² − 6x",
      "B": "3x² + 6x",
      "C": "x² − 6x",
      "D": "3x² − 3x"
    },
    "correctAnswer": "A",
    "explanation": "dy/dx = 3x² − 6x.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-041",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Evaluate ∫4x³ dx.",
    "options": {
      "A": "x⁴ + C",
      "B": "4x⁴ + C",
      "C": "12x² + C",
      "D": "x³ + C"
    },
    "correctAnswer": "A",
    "explanation": "∫4x³ dx = 4 × (x⁴/4) + C = x⁴ + C.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-042",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Evaluate ∫(3x² + 2x) dx.",
    "options": {
      "A": "x³ + x² + C",
      "B": "3x³ + x² + C",
      "C": "x³ + 2x² + C",
      "D": "6x + 2 + C"
    },
    "correctAnswer": "A",
    "explanation": "∫3x² dx = x³; ∫2x dx = x². Sum = x³ + x² + C.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-043",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Find the gradient of the line through (1, 2) and (3, 8).",
    "options": {
      "A": "1",
      "B": "2",
      "C": "3",
      "D": "4"
    },
    "correctAnswer": "C",
    "explanation": "m = (8 − 2)/(3 − 1) = 6/2 = 3.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-044",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Find the equation of the line with gradient 3 passing through (2, 1).",
    "options": {
      "A": "y = 3x − 5",
      "B": "y = 3x + 5",
      "C": "y = 3x − 1",
      "D": "y = 3x + 1"
    },
    "correctAnswer": "A",
    "explanation": "y − 1 = 3(x − 2) → y = 3x − 5.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-045",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Find the distance between (1, 2) and (4, 6).",
    "options": {
      "A": "3",
      "B": "4",
      "C": "5",
      "D": "6"
    },
    "correctAnswer": "C",
    "explanation": "d = √((4−1)² + (6−2)²) = √(9 + 16) = 5.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-046",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Find the midpoint of (1, 1) and (5, 5).",
    "options": {
      "A": "(2, 2)",
      "B": "(3, 3)",
      "C": "(4, 4)",
      "D": "(6, 6)"
    },
    "correctAnswer": "B",
    "explanation": "((1+5)/2, (1+5)/2) = (3, 3).",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-047",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "If y varies directly as x² and y = 12 when x = 2, find y when x = 3.",
    "options": {
      "A": "18",
      "B": "24",
      "C": "27",
      "D": "36"
    },
    "correctAnswer": "C",
    "explanation": "y = kx² → 12 = 4k → k = 3. When x = 3, y = 3 × 9 = 27.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-048",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "If y varies inversely as √x and y = 4 when x = 4, find y when x = 9.",
    "options": {
      "A": "8/3",
      "B": "3",
      "C": "4",
      "D": "6"
    },
    "correctAnswer": "A",
    "explanation": "y = k/√x → 4 = k/2 → k = 8. When x = 9, y = 8/3.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-049",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Simplify: (√7 + √3)(√7 − √3).",
    "options": {
      "A": "2",
      "B": "4",
      "C": "7",
      "D": "10"
    },
    "correctAnswer": "B",
    "explanation": "(√7)² − (√3)² = 7 − 3 = 4.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-050",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Rationalise 2/√3.",
    "options": {
      "A": "2√3",
      "B": "2√3/3",
      "C": "√3/3",
      "D": "√3"
    },
    "correctAnswer": "B",
    "explanation": "Multiply numerator and denominator by √3: 2√3/3.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-051",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Solve for x: 3^(2x−1) = 27.",
    "options": {
      "A": "1",
      "B": "2",
      "C": "3",
      "D": "4"
    },
    "correctAnswer": "B",
    "explanation": "27 = 3³ → 2x − 1 = 3 → 2x = 4 → x = 2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-052",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Simplify: 16^(3/4).",
    "options": {
      "A": "4",
      "B": "6",
      "C": "8",
      "D": "12"
    },
    "correctAnswer": "C",
    "explanation": "16^(3/4) = (⁴√16)³ = 2³ = 8.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-053",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Evaluate: 9^(1/2) × 8^(1/3).",
    "options": {
      "A": "3",
      "B": "6",
      "C": "9",
      "D": "12"
    },
    "correctAnswer": "B",
    "explanation": "9^(1/2) = 3; 8^(1/3) = 2. Product = 6.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-054",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Convert 321₄ to base 10.",
    "options": {
      "A": "45",
      "B": "53",
      "C": "57",
      "D": "61"
    },
    "correctAnswer": "C",
    "explanation": "3×4² + 2×4¹ + 1×4⁰ = 48 + 8 + 1 = 57.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-055",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Find x if 5^x = 125.",
    "options": {
      "A": "2",
      "B": "3",
      "C": "4",
      "D": "5"
    },
    "correctAnswer": "B",
    "explanation": "125 = 5³ → x = 3.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-056",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Find the simple interest on ₦8000 at 5% per annum for 3 years.",
    "options": {
      "A": "₦1000",
      "B": "₦1100",
      "C": "₦1200",
      "D": "₦1300"
    },
    "correctAnswer": "C",
    "explanation": "SI = (8000 × 5 × 3)/100 = ₦1200.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-057",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Find the compound interest on ₦2000 at 5% per annum for 2 years.",
    "options": {
      "A": "₦200",
      "B": "₦205",
      "C": "₦210",
      "D": "₦215"
    },
    "correctAnswer": "B",
    "explanation": "Amount = 2000(1.05)² = 2205. CI = 2205 − 2000 = ₦205.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-058",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "If 3x − 2y = 8 and y = 2, find x.",
    "options": {
      "A": "2",
      "B": "3",
      "C": "4",
      "D": "5"
    },
    "correctAnswer": "C",
    "explanation": "3x − 4 = 8 → 3x = 12 → x = 4.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-059",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Solve: x² − 16 = 0.",
    "options": {
      "A": "x = 4 only",
      "B": "x = -4 only",
      "C": "x = ±4",
      "D": "x = ±16"
    },
    "correctAnswer": "C",
    "explanation": "x² = 16 → x = ±4.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2021-060",
    "subject": "mathematics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "The roots of x² − 10x + 25 = 0 are?",
    "options": {
      "A": "5 and 5",
      "B": "-5 and -5",
      "C": "5 and -5",
      "D": "10 and 1"
    },
    "correctAnswer": "A",
    "explanation": "(x − 5)² = 0 → x = 5 (double root). ---",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  }
];

export default questions;
