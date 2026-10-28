import type { JambQuestion } from "../types";

/** Mathematics 2024 — JAMB past / practice bank (user-supplied). */
const questions: JambQuestion[] = [
  {
    "id": "mat-2024-001",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Convert 1110₂ to base 10.",
    "options": {
      "A": "12",
      "B": "13",
      "C": "14",
      "D": "15"
    },
    "correctAnswer": "C",
    "explanation": "1×2³ + 1×2² + 1×2¹ + 0×2⁰ = 8 + 4 + 2 + 0 = 14.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-002",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Express 0.00036 in standard form.",
    "options": {
      "A": "3.6 × 10⁻⁴",
      "B": "3.6 × 10⁻⁵",
      "C": "36 × 10⁻⁵",
      "D": "3.6 × 10⁻³"
    },
    "correctAnswer": "A",
    "explanation": "0.00036 = 3.6 × 10⁻⁴.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-003",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Simplify: 5⁰ + 4⁻¹.",
    "options": {
      "A": "1/4",
      "B": "5/4",
      "C": "3/4",
      "D": "7/4"
    },
    "correctAnswer": "B",
    "explanation": "5⁰ = 1; 4⁻¹ = 1/4. Sum = 1 + 1/4 = 5/4.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-004",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "If log₁₀ 2 = 0.3010 and log₁₀ 3 = 0.4771, find log₁₀ 6.",
    "options": {
      "A": "0.7781",
      "B": "0.1761",
      "C": "0.9542",
      "D": "1.4313"
    },
    "correctAnswer": "A",
    "explanation": "log₁₀ 6 = log₁₀(2×3) = log₁₀ 2 + log₁₀ 3 = 0.3010 + 0.4771 = 0.7781.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-005",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "If A = {2, 4, 6, 8} and B = {4, 8, 12}, find A ∩ B.",
    "options": {
      "A": "{2, 6}",
      "B": "{4, 8}",
      "C": "{12}",
      "D": "{2, 4, 6, 8, 12}"
    },
    "correctAnswer": "B",
    "explanation": "Common elements are 4 and 8.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-006",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "How many subsets does a set with 6 elements have?",
    "options": {
      "A": "12",
      "B": "36",
      "C": "64",
      "D": "128"
    },
    "correctAnswer": "C",
    "explanation": "2⁶ = 64.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-007",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Factorise completely: 3x² + 7x − 6.",
    "options": {
      "A": "(3x − 2)(x + 3)",
      "B": "(3x + 2)(x − 3)",
      "C": "(3x − 1)(x + 6)",
      "D": "(3x + 1)(x − 6)"
    },
    "correctAnswer": "A",
    "explanation": "3x² + 9x − 2x − 6 = 3x(x+3) − 2(x+3) = (3x−2)(x+3).",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-008",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Solve for x: 7x − 4 = 3x + 12.",
    "options": {
      "A": "2",
      "B": "3",
      "C": "4",
      "D": "5"
    },
    "correctAnswer": "C",
    "explanation": "4x = 16 → x = 4.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-009",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Solve the simultaneous equations: 3x + 2y = 16 and 2x − y = 6.",
    "options": {
      "A": "x = 4, y = 2",
      "B": "x = 3, y = 3",
      "C": "x = 2, y = 5",
      "D": "x = 5, y = 1"
    },
    "correctAnswer": "A",
    "explanation": "From 2x − y = 6, y = 2x − 6. Substitute: 3x + 2(2x−6) = 16 → 7x = 28 → x = 4, y = 2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-010",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Find the roots of x² − 8x + 15 = 0.",
    "options": {
      "A": "2 and 7",
      "B": "3 and 5",
      "C": "-3 and -5",
      "D": "1 and 15"
    },
    "correctAnswer": "B",
    "explanation": "(x−3)(x−5) = 0 → x = 3 or 5.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-011",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "The sum of the roots of 4x² − 12x + 9 = 0 is?",
    "options": {
      "A": "1",
      "B": "2",
      "C": "3",
      "D": "4"
    },
    "correctAnswer": "C",
    "explanation": "Sum = −b/a = 12/4 = 3.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-012",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "The product of the roots of 5x² − 15x + 10 = 0 is?",
    "options": {
      "A": "1",
      "B": "2",
      "C": "3",
      "D": "5"
    },
    "correctAnswer": "B",
    "explanation": "Product = c/a = 10/5 = 2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-013",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Solve the inequality: 3x + 2 ≤ 11.",
    "options": {
      "A": "x ≤ 3",
      "B": "x ≥ 3",
      "C": "x < 3",
      "D": "x > 3"
    },
    "correctAnswer": "A",
    "explanation": "3x ≤ 9 → x ≤ 3.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-014",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Find the 12th term of the AP: 4, 9, 14, …",
    "options": {
      "A": "54",
      "B": "59",
      "C": "64",
      "D": "69"
    },
    "correctAnswer": "B",
    "explanation": "a = 4, d = 5. T₁₂ = 4 + 11(5) = 59.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-015",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Find the sum of the first 15 terms of the AP: 3, 7, 11, …",
    "options": {
      "A": "435",
      "B": "450",
      "C": "465",
      "D": "480"
    },
    "correctAnswer": "C",
    "explanation": "S₁₅ = 15/2[2(3) + 14(4)] = 15/2[6 + 56] = 15/2 × 62 = 465.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-016",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Find the 5th term of the GP: 2, 4, 8, …",
    "options": {
      "A": "16",
      "B": "32",
      "C": "64",
      "D": "128"
    },
    "correctAnswer": "B",
    "explanation": "a = 2, r = 2. T₅ = 2 × 2⁴ = 32.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-017",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Find the sum to infinity of the GP: 3 + 1 + 1/3 + …",
    "options": {
      "A": "4",
      "B": "9/2",
      "C": "5",
      "D": "11/2"
    },
    "correctAnswer": "B",
    "explanation": "S∞ = a/(1−r) = 3/(1−1/3) = 3/(2/3) = 9/2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-018",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Each interior angle of a regular decagon is?",
    "options": {
      "A": "140°",
      "B": "144°",
      "C": "150°",
      "D": "156°"
    },
    "correctAnswer": "B",
    "explanation": "(10−2)180/10 = 1440/10 = 144°.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-019",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "The exterior angle of a regular polygon with 20 sides is?",
    "options": {
      "A": "16°",
      "B": "18°",
      "C": "20°",
      "D": "24°"
    },
    "correctAnswer": "B",
    "explanation": "360/20 = 18°.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-020",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Angles in a quadrilateral sum to?",
    "options": {
      "A": "180°",
      "B": "270°",
      "C": "360°",
      "D": "540°"
    },
    "correctAnswer": "C",
    "explanation": "Sum of interior angles of a quadrilateral = 360°.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-021",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "The angles of a quadrilateral are 80°, 100°, 120°, and x. Find x.",
    "options": {
      "A": "40°",
      "B": "50°",
      "C": "60°",
      "D": "70°"
    },
    "correctAnswer": "C",
    "explanation": "80 + 100 + 120 + x = 360 → x = 60°.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-022",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "The sum of the interior angles of a nonagon is?",
    "options": {
      "A": "900°",
      "B": "1080°",
      "C": "1260°",
      "D": "1440°"
    },
    "correctAnswer": "C",
    "explanation": "(9−2)×180° = 7×180° = 1260°.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-023",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Find the area of a circle of radius 10 cm. (π = 3.14)",
    "options": {
      "A": "31.4 cm²",
      "B": "62.8 cm²",
      "C": "314 cm²",
      "D": "628 cm²"
    },
    "correctAnswer": "C",
    "explanation": "Area = πr² = 3.14 × 100 = 314 cm².",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-024",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Find the circumference of a circle of radius 7 cm. (π = 22/7)",
    "options": {
      "A": "22 cm",
      "B": "44 cm",
      "C": "66 cm",
      "D": "88 cm"
    },
    "correctAnswer": "B",
    "explanation": "C = 2πr = 2 × (22/7) × 7 = 44 cm.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-025",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Find the volume of a cylinder of radius 5 cm and height 14 cm. (π = 22/7)",
    "options": {
      "A": "550 cm³",
      "B": "770 cm³",
      "C": "1100 cm³",
      "D": "1540 cm³"
    },
    "correctAnswer": "C",
    "explanation": "V = πr²h = (22/7) × 25 × 14 = 1100 cm³.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-026",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Find the volume of a cone of radius 7 cm and height 9 cm. (π = 22/7)",
    "options": {
      "A": "396 cm³",
      "B": "462 cm³",
      "C": "528 cm³",
      "D": "594 cm³"
    },
    "correctAnswer": "B",
    "explanation": "V = (1/3)πr²h = (1/3) × (22/7) × 49 × 9 = 462 cm³.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-027",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Find the surface area of a sphere of radius 7 cm. (π = 22/7)",
    "options": {
      "A": "154 cm²",
      "B": "308 cm²",
      "C": "462 cm²",
      "D": "616 cm²"
    },
    "correctAnswer": "D",
    "explanation": "4πr² = 4 × (22/7) × 49 = 616 cm².",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-028",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Evaluate sin 45° + cos 45°.",
    "options": {
      "A": "1",
      "B": "√2",
      "C": "√3",
      "D": "2"
    },
    "correctAnswer": "B",
    "explanation": "sin 45° = cos 45° = √2/2. Sum = √2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-029",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "If cos θ = 8/17 and θ is acute, find sin θ.",
    "options": {
      "A": "8/15",
      "B": "15/17",
      "C": "17/15",
      "D": "15/8"
    },
    "correctAnswer": "B",
    "explanation": "sin θ = √(1 − 64/289) = √(225/289) = 15/17.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-030",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Evaluate tan 60°.",
    "options": {
      "A": "1/√3",
      "B": "1",
      "C": "√3",
      "D": "2"
    },
    "correctAnswer": "C",
    "explanation": "tan 60° = √3.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-031",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "A man 40 m from the foot of a tower observes the top at an angle of elevation of 30°. Find the height of the tower.",
    "options": {
      "A": "40/√3 m",
      "B": "40√3 m",
      "C": "20√3 m",
      "D": "20/√3 m"
    },
    "correctAnswer": "A",
    "explanation": "tan 30° = h/40 → h = 40 tan 30° = 40/√3 m.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-032",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "A bearing of 300° is equivalent to?",
    "options": {
      "A": "N60°W",
      "B": "S60°W",
      "C": "N60°E",
      "D": "S60°E"
    },
    "correctAnswer": "A",
    "explanation": "300° = 360° − 60° → North 60° West (N60°W).",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-033",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Find the mean of 4, 8, 12, 16, 20.",
    "options": {
      "A": "10",
      "B": "12",
      "C": "14",
      "D": "16"
    },
    "correctAnswer": "B",
    "explanation": "Sum = 60; mean = 60/5 = 12.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-034",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Find the median of 3, 7, 9, 11, 15, 18.",
    "options": {
      "A": "9",
      "B": "10",
      "C": "11",
      "D": "12"
    },
    "correctAnswer": "B",
    "explanation": "Median = (9+11)/2 = 10.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-035",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Find the mode of 2, 3, 3, 4, 5, 5, 5, 6.",
    "options": {
      "A": "3",
      "B": "4",
      "C": "5",
      "D": "6"
    },
    "correctAnswer": "C",
    "explanation": "5 occurs most frequently (three times).",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-036",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "A card is picked at random from a standard deck. Find the probability that it is a red card.",
    "options": {
      "A": "1/4",
      "B": "1/2",
      "C": "1/13",
      "D": "2/13"
    },
    "correctAnswer": "B",
    "explanation": "26 red cards out of 52 → 1/2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-037",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "A fair die is rolled once. Find the probability of getting a number greater than 4.",
    "options": {
      "A": "1/6",
      "B": "1/3",
      "C": "1/2",
      "D": "2/3"
    },
    "correctAnswer": "B",
    "explanation": "Numbers > 4: 5, 6 → 2/6 = 1/3.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-038",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Find the range of 15, 8, 22, 10, 5.",
    "options": {
      "A": "15",
      "B": "16",
      "C": "17",
      "D": "18"
    },
    "correctAnswer": "C",
    "explanation": "Range = 22 − 5 = 17.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-039",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Differentiate y = 6x⁵ with respect to x.",
    "options": {
      "A": "30x⁴",
      "B": "6x⁴",
      "C": "30x⁵",
      "D": "5x⁴"
    },
    "correctAnswer": "A",
    "explanation": "dy/dx = 5 × 6x⁴ = 30x⁴.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-040",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Differentiate y = 2x³ − 5x² + 4x − 7.",
    "options": {
      "A": "6x² − 10x + 4",
      "B": "6x² + 10x + 4",
      "C": "2x² − 5x + 4",
      "D": "6x² − 10x − 4"
    },
    "correctAnswer": "A",
    "explanation": "dy/dx = 6x² − 10x + 4.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-041",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Evaluate ∫6x² dx.",
    "options": {
      "A": "2x³ + C",
      "B": "6x³ + C",
      "C": "12x + C",
      "D": "3x² + C"
    },
    "correctAnswer": "A",
    "explanation": "∫6x² dx = 6 × (x³/3) + C = 2x³ + C.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-042",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Evaluate ∫(4x³ − 2x) dx.",
    "options": {
      "A": "x⁴ − x² + C",
      "B": "4x⁴ − 2x² + C",
      "C": "x⁴ + x² + C",
      "D": "12x² − 2 + C"
    },
    "correctAnswer": "A",
    "explanation": "∫4x³ dx = x⁴; ∫2x dx = x². Result = x⁴ − x² + C.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-043",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Find the gradient of the line through (3, 4) and (7, 12).",
    "options": {
      "A": "1",
      "B": "2",
      "C": "3",
      "D": "4"
    },
    "correctAnswer": "B",
    "explanation": "m = (12−4)/(7−3) = 8/4 = 2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-044",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Find the equation of the line with gradient −2 passing through (1, 5).",
    "options": {
      "A": "y = −2x + 7",
      "B": "y = −2x − 7",
      "C": "y = 2x + 7",
      "D": "y = 2x − 7"
    },
    "correctAnswer": "A",
    "explanation": "y − 5 = −2(x − 1) → y = −2x + 7.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-045",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Find the distance between (2, 3) and (5, 7).",
    "options": {
      "A": "3",
      "B": "4",
      "C": "5",
      "D": "6"
    },
    "correctAnswer": "C",
    "explanation": "d = √((5−2)² + (7−3)²) = √(9+16) = 5.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-046",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Find the midpoint of (4, 6) and (8, 2).",
    "options": {
      "A": "(6, 4)",
      "B": "(2, 4)",
      "C": "(6, 8)",
      "D": "(12, 8)"
    },
    "correctAnswer": "A",
    "explanation": "((4+8)/2, (6+2)/2) = (6, 4).",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-047",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "If y varies directly as x³ and y = 24 when x = 2, find y when x = 3.",
    "options": {
      "A": "54",
      "B": "72",
      "C": "81",
      "D": "108"
    },
    "correctAnswer": "C",
    "explanation": "y = kx³ → 24 = 8k → k = 3. When x = 3, y = 3 × 27 = 81.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-048",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "If y varies inversely as x² and y = 9 when x = 3, find y when x = 1.",
    "options": {
      "A": "1",
      "B": "9",
      "C": "27",
      "D": "81"
    },
    "correctAnswer": "D",
    "explanation": "y = k/x² → 9 = k/9 → k = 81. When x = 1, y = 81.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-049",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Simplify: (√8 + √2)(√8 − √2).",
    "options": {
      "A": "4",
      "B": "6",
      "C": "8",
      "D": "10"
    },
    "correctAnswer": "B",
    "explanation": "(√8)² − (√2)² = 8 − 2 = 6.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-050",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Rationalise 3/√5.",
    "options": {
      "A": "3√5",
      "B": "3√5/5",
      "C": "√5/5",
      "D": "√5"
    },
    "correctAnswer": "B",
    "explanation": "Multiply numerator and denominator by √5: 3√5/5.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-051",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Solve for x: 4^(2x+1) = 64.",
    "options": {
      "A": "1/2",
      "B": "1",
      "C": "2",
      "D": "3"
    },
    "correctAnswer": "B",
    "explanation": "64 = 4³ → 2x+1 = 3 → 2x = 2 → x = 1.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-052",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Simplify: 32^(2/5).",
    "options": {
      "A": "2",
      "B": "4",
      "C": "8",
      "D": "16"
    },
    "correctAnswer": "B",
    "explanation": "32^(2/5) = (⁵√32)² = 2² = 4.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-053",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Evaluate: 25^(1/2) × 27^(1/3).",
    "options": {
      "A": "5",
      "B": "15",
      "C": "25",
      "D": "45"
    },
    "correctAnswer": "B",
    "explanation": "25^(1/2) = 5; 27^(1/3) = 3. Product = 15.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-054",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Convert 432₅ to base 10.",
    "options": {
      "A": "107",
      "B": "117",
      "C": "127",
      "D": "137"
    },
    "correctAnswer": "B",
    "explanation": "4×25 + 3×5 + 2 = 100 + 15 + 2 = 117.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-055",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Find x if 2^(x+2) = 64.",
    "options": {
      "A": "2",
      "B": "3",
      "C": "4",
      "D": "5"
    },
    "correctAnswer": "C",
    "explanation": "64 = 2⁶ → x+2 = 6 → x = 4.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-056",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Find the simple interest on ₦12,000 at 8% per annum for 2 years.",
    "options": {
      "A": "₦1,920",
      "B": "₦1,820",
      "C": "₦1,720",
      "D": "₦1,620"
    },
    "correctAnswer": "A",
    "explanation": "SI = (12000 × 8 × 2)/100 = ₦1,920.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-057",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Find the compound interest on ₦5000 at 10% per annum for 2 years.",
    "options": {
      "A": "₦1,000",
      "B": "₦1,050",
      "C": "₦1,100",
      "D": "₦1,150"
    },
    "correctAnswer": "B",
    "explanation": "Amount = 5000(1.1)² = 6050. CI = 6050 − 5000 = ₦1,050.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-058",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "If 2x + 5y = 20 and x = 5, find y.",
    "options": {
      "A": "1",
      "B": "2",
      "C": "3",
      "D": "4"
    },
    "correctAnswer": "B",
    "explanation": "2(5) + 5y = 20 → 10 + 5y = 20 → 5y = 10 → y = 2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-059",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Solve: x² − 25 = 0.",
    "options": {
      "A": "x = 5 only",
      "B": "x = −5 only",
      "C": "x = ±5",
      "D": "x = ±25"
    },
    "correctAnswer": "C",
    "explanation": "x² = 25 → x = ±5.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2024-060",
    "subject": "mathematics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "The roots of x² − 12x + 36 = 0 are?",
    "options": {
      "A": "6 and 6",
      "B": "−6 and −6",
      "C": "6 and −6",
      "D": "12 and 1"
    },
    "correctAnswer": "A",
    "explanation": "(x − 6)² = 0 → x = 6 (double root).",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  }
];

export default questions;
