import type { JambQuestion } from "../types";

/** Mathematics 2020 — JAMB past questions (user-supplied bank). */
const questions: JambQuestion[] = [
  {
    "id": "mat-2020-001",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Convert 1011₂ to base 10.",
    "options": {
      "A": "9",
      "B": "10",
      "C": "11",
      "D": "12"
    },
    "correctAnswer": "C",
    "explanation": "1×2³ + 0×2² + 1×2¹ + 1×2⁰ = 8 + 0 + 2 + 1 = 11.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-002",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Express 0.000045 in standard form.",
    "options": {
      "A": "4.5 × 10⁻⁴",
      "B": "4.5 × 10⁻⁵",
      "C": "4.5 × 10⁻⁶",
      "D": "45 × 10⁻⁵"
    },
    "correctAnswer": "B",
    "explanation": "0.000045 = 4.5 × 10⁻⁵.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-003",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Simplify: 2⁰ + 3⁻¹.",
    "options": {
      "A": "1/3",
      "B": "2/3",
      "C": "4/3",
      "D": "5/3"
    },
    "correctAnswer": "C",
    "explanation": "2⁰ = 1; 3⁻¹ = 1/3. Sum = 1 + 1/3 = 4/3.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-004",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "If log₁₀ 2 = 0.3010, find log₁₀ 5.",
    "options": {
      "A": "0.3010",
      "B": "0.4771",
      "C": "0.6990",
      "D": "0.9030"
    },
    "correctAnswer": "C",
    "explanation": "log₁₀ 5 = log₁₀(10/2) = 1 − log₁₀ 2 = 1 − 0.3010 = 0.6990.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-005",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "If P = {1, 2, 3, 4, 5} and Q = {2, 4, 6}, find P ∩ Q.",
    "options": {
      "A": "{1, 3, 5}",
      "B": "{2, 4}",
      "C": "{6}",
      "D": "{1, 2, 3, 4, 5, 6}"
    },
    "correctAnswer": "B",
    "explanation": "P ∩ Q contains elements common to both sets: 2 and 4.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-006",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "How many subsets does a set with 4 elements have?",
    "options": {
      "A": "4",
      "B": "8",
      "C": "16",
      "D": "32"
    },
    "correctAnswer": "C",
    "explanation": "Number of subsets = 2ⁿ = 2⁴ = 16.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-007",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Factorise completely: 2x² − 5x − 3.",
    "options": {
      "A": "(2x + 1)(x − 3)",
      "B": "(2x − 1)(x + 3)",
      "C": "(2x + 3)(x − 1)",
      "D": "(2x − 3)(x + 1)"
    },
    "correctAnswer": "A",
    "explanation": "2x² − 5x − 3 = 2x² − 6x + x − 3 = 2x(x − 3) + 1(x − 3) = (2x + 1)(x − 3).",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-008",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Solve for x: 3x − 7 = 2x + 5.",
    "options": {
      "A": "10",
      "B": "11",
      "C": "12",
      "D": "13"
    },
    "correctAnswer": "C",
    "explanation": "3x − 2x = 5 + 7 → x = 12.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-009",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Solve the simultaneous equations: 2x + y = 7 and x − y = 2.",
    "options": {
      "A": "x = 3, y = 1",
      "B": "x = 2, y = 3",
      "C": "x = 1, y = 5",
      "D": "x = 4, y = -1"
    },
    "correctAnswer": "A",
    "explanation": "Adding the equations: 3x = 9 → x = 3. Then y = 7 − 2(3) = 1.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-010",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Find the roots of x² − 5x + 6 = 0.",
    "options": {
      "A": "1 and 6",
      "B": "2 and 3",
      "C": "-2 and -3",
      "D": "-1 and -6"
    },
    "correctAnswer": "B",
    "explanation": "(x − 2)(x − 3) = 0 → x = 2 or x = 3.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-011",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "The sum of the roots of 2x² − 8x + 6 = 0 is?",
    "options": {
      "A": "2",
      "B": "3",
      "C": "4",
      "D": "6"
    },
    "correctAnswer": "C",
    "explanation": "Sum of roots = −b/a = −(−8)/2 = 4.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-012",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "The product of the roots of 3x² − 7x + 2 = 0 is?",
    "options": {
      "A": "1/3",
      "B": "2/3",
      "C": "7/3",
      "D": "3/2"
    },
    "correctAnswer": "B",
    "explanation": "Product of roots = c/a = 2/3.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-013",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Solve the inequality: 2x − 3 < 7.",
    "options": {
      "A": "x < 5",
      "B": "x > 5",
      "C": "x < 2",
      "D": "x > 2"
    },
    "correctAnswer": "A",
    "explanation": "2x < 10 → x < 5.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-014",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Find the 5th term of the AP: 3, 7, 11, …",
    "options": {
      "A": "15",
      "B": "17",
      "C": "19",
      "D": "21"
    },
    "correctAnswer": "C",
    "explanation": "a = 3, d = 4. T₅ = 3 + 4(4) = 19.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-015",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Find the sum of the first 10 terms of the AP: 2, 5, 8, …",
    "options": {
      "A": "145",
      "B": "155",
      "C": "165",
      "D": "175"
    },
    "correctAnswer": "B",
    "explanation": "S₁₀ = 10/2[2(2) + 9(3)] = 5[4 + 27] = 5 × 31 = 155.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-016",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Find the 3rd term of the GP: 2, 6, 18, …",
    "options": {
      "A": "12",
      "B": "18",
      "C": "24",
      "D": "36"
    },
    "correctAnswer": "B",
    "explanation": "a = 2, r = 3. T₃ = 2 × 3² = 18.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-017",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Find the sum to infinity of the GP: 1 + 1/3 + 1/9 + …",
    "options": {
      "A": "3/2",
      "B": "2",
      "C": "3",
      "D": "4"
    },
    "correctAnswer": "A",
    "explanation": "S∞ = a/(1 − r) = 1/(1 − 1/3) = 1/(2/3) = 3/2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-018",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Each interior angle of a regular hexagon is?",
    "options": {
      "A": "100°",
      "B": "110°",
      "C": "120°",
      "D": "130°"
    },
    "correctAnswer": "C",
    "explanation": "Interior angle = (n − 2)180/n = (6 − 2)180/6 = 120°.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-019",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "The exterior angle of a regular polygon with 12 sides is?",
    "options": {
      "A": "24°",
      "B": "30°",
      "C": "36°",
      "D": "40°"
    },
    "correctAnswer": "B",
    "explanation": "Exterior angle = 360/n = 360/12 = 30°.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-020",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Angles on a straight line sum to?",
    "options": {
      "A": "90°",
      "B": "180°",
      "C": "270°",
      "D": "360°"
    },
    "correctAnswer": "B",
    "explanation": "Angles on a straight line are supplementary and sum to 180°.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-021",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "The angles of a triangle are 2x, 3x, and 4x. Find the largest angle.",
    "options": {
      "A": "40°",
      "B": "60°",
      "C": "80°",
      "D": "100°"
    },
    "correctAnswer": "C",
    "explanation": "2x + 3x + 4x = 180° → 9x = 180° → x = 20°. Largest = 4x = 80°.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-022",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "The sum of the interior angles of a pentagon is?",
    "options": {
      "A": "360°",
      "B": "450°",
      "C": "540°",
      "D": "720°"
    },
    "correctAnswer": "C",
    "explanation": "(5 − 2) × 180° = 3 × 180° = 540°.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-023",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Find the area of a circle of radius 7 cm. (π = 22/7)",
    "options": {
      "A": "44 cm²",
      "B": "154 cm²",
      "C": "308 cm²",
      "D": "616 cm²"
    },
    "correctAnswer": "B",
    "explanation": "Area = πr² = (22/7) × 49 = 154 cm².",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-024",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Find the circumference of a circle of diameter 14 cm. (π = 22/7)",
    "options": {
      "A": "22 cm",
      "B": "44 cm",
      "C": "66 cm",
      "D": "88 cm"
    },
    "correctAnswer": "B",
    "explanation": "C = πd = (22/7) × 14 = 44 cm.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-025",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Find the volume of a cylinder of radius 7 cm and height 10 cm. (π = 22/7)",
    "options": {
      "A": "770 cm³",
      "B": "1540 cm³",
      "C": "3080 cm³",
      "D": "6160 cm³"
    },
    "correctAnswer": "B",
    "explanation": "V = πr²h = (22/7) × 49 × 10 = 1540 cm³.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-026",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Find the volume of a cone of radius 3 cm and height 4 cm in terms of π.",
    "options": {
      "A": "6π cm³",
      "B": "9π cm³",
      "C": "12π cm³",
      "D": "15π cm³"
    },
    "correctAnswer": "C",
    "explanation": "V = (1/3)πr²h = (1/3) × π × 9 × 4 = 12π cm³.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-027",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Find the surface area of a sphere of radius 7 cm. (π = 22/7)",
    "options": {
      "A": "154 cm²",
      "B": "308 cm²",
      "C": "462 cm²",
      "D": "616 cm²"
    },
    "correctAnswer": "D",
    "explanation": "Surface area = 4πr² = 4 × (22/7) × 49 = 616 cm².",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-028",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Evaluate sin 30° + cos 60°.",
    "options": {
      "A": "0",
      "B": "1/2",
      "C": "1",
      "D": "3/2"
    },
    "correctAnswer": "C",
    "explanation": "sin 30° = 1/2 and cos 60° = 1/2. Sum = 1.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-029",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "If tan θ = 3/4 and θ is acute, find sin θ.",
    "options": {
      "A": "3/5",
      "B": "4/5",
      "C": "5/3",
      "D": "5/4"
    },
    "correctAnswer": "A",
    "explanation": "tan θ = opposite/adjacent = 3/4. Hypotenuse = √(9 + 16) = 5. sin θ = 3/5.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-030",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Evaluate cos 0°.",
    "options": {
      "A": "0",
      "B": "1/2",
      "C": "1",
      "D": "√3/2"
    },
    "correctAnswer": "C",
    "explanation": "cos 0° = 1.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-031",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "A man 30 m from the foot of a building observes the top at an angle of elevation of 45°. Find the height of the building.",
    "options": {
      "A": "15 m",
      "B": "30 m",
      "C": "45 m",
      "D": "60 m"
    },
    "correctAnswer": "B",
    "explanation": "tan 45° = h/30 → h = 30 tan 45° = 30 m.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-032",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "A bearing of 135° is equivalent to?",
    "options": {
      "A": "N45°E",
      "B": "S45°E",
      "C": "S45°W",
      "D": "N45°W"
    },
    "correctAnswer": "B",
    "explanation": "135° = 180° − 45°, i.e. South 45° East.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-033",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Find the mean of 2, 4, 6, 8, 10.",
    "options": {
      "A": "4",
      "B": "5",
      "C": "6",
      "D": "7"
    },
    "correctAnswer": "C",
    "explanation": "Mean = (2 + 4 + 6 + 8 + 10)/5 = 30/5 = 6.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-034",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Find the median of 1, 3, 5, 7, 9.",
    "options": {
      "A": "3",
      "B": "5",
      "C": "7",
      "D": "9"
    },
    "correctAnswer": "B",
    "explanation": "The middle value in the ordered list is 5.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-035",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Find the mode of 2, 2, 3, 4, 4, 4, 5.",
    "options": {
      "A": "2",
      "B": "3",
      "C": "4",
      "D": "5"
    },
    "correctAnswer": "C",
    "explanation": "4 occurs most frequently (three times).",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-036",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "A card is picked at random from a standard deck. Find the probability that it is a king.",
    "options": {
      "A": "1/52",
      "B": "1/26",
      "C": "1/13",
      "D": "4/13"
    },
    "correctAnswer": "C",
    "explanation": "There are 4 kings in 52 cards → 4/52 = 1/13.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-037",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "A fair coin is tossed once. Find the probability of getting a head.",
    "options": {
      "A": "0",
      "B": "1/4",
      "C": "1/2",
      "D": "1"
    },
    "correctAnswer": "C",
    "explanation": "There are two equally likely outcomes (H, T), so P(H) = 1/2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-038",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Find the range of 2, 5, 9, 3, 7.",
    "options": {
      "A": "5",
      "B": "6",
      "C": "7",
      "D": "9"
    },
    "correctAnswer": "C",
    "explanation": "Range = highest − lowest = 9 − 2 = 7.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-039",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Differentiate y = 5x³ with respect to x.",
    "options": {
      "A": "5x²",
      "B": "15x²",
      "C": "15x³",
      "D": "3x²"
    },
    "correctAnswer": "B",
    "explanation": "dy/dx = 3 × 5x² = 15x².",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-040",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Differentiate y = 3x² + 2x − 1.",
    "options": {
      "A": "6x + 2",
      "B": "6x − 2",
      "C": "3x + 2",
      "D": "6x² + 2"
    },
    "correctAnswer": "A",
    "explanation": "dy/dx = 6x + 2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-041",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Evaluate ∫3x² dx.",
    "options": {
      "A": "x³ + C",
      "B": "3x³ + C",
      "C": "x² + C",
      "D": "6x + C"
    },
    "correctAnswer": "A",
    "explanation": "∫3x² dx = 3 × (x³/3) + C = x³ + C.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-042",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Evaluate ∫(2x + 1) dx.",
    "options": {
      "A": "x² + x + C",
      "B": "2x² + x + C",
      "C": "x² + C",
      "D": "2x + C"
    },
    "correctAnswer": "A",
    "explanation": "∫2x dx = x²; ∫1 dx = x. Sum = x² + x + C.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-043",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Find the gradient of the line through (2, 5) and (4, 9).",
    "options": {
      "A": "1",
      "B": "2",
      "C": "3",
      "D": "4"
    },
    "correctAnswer": "B",
    "explanation": "m = (9 − 5)/(4 − 2) = 4/2 = 2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-044",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Find the equation of the line with gradient 2 passing through (1, 3).",
    "options": {
      "A": "y = 2x + 1",
      "B": "y = 2x − 1",
      "C": "y = 2x + 3",
      "D": "y = 2x − 3"
    },
    "correctAnswer": "A",
    "explanation": "y − 3 = 2(x − 1) → y = 2x + 1.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-045",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Find the distance between (0, 0) and (3, 4).",
    "options": {
      "A": "3",
      "B": "4",
      "C": "5",
      "D": "7"
    },
    "correctAnswer": "C",
    "explanation": "d = √(3² + 4²) = √25 = 5.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-046",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Find the midpoint of (2, 3) and (4, 7).",
    "options": {
      "A": "(3, 5)",
      "B": "(6, 10)",
      "C": "(2, 4)",
      "D": "(1, 2)"
    },
    "correctAnswer": "A",
    "explanation": "Midpoint = ((2+4)/2, (3+7)/2) = (3, 5).",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-047",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "If y varies directly as x and y = 8 when x = 2, find y when x = 5.",
    "options": {
      "A": "10",
      "B": "16",
      "C": "20",
      "D": "25"
    },
    "correctAnswer": "C",
    "explanation": "y = kx → 8 = 2k → k = 4. When x = 5, y = 4 × 5 = 20.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-048",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "If y varies inversely as x and y = 6 when x = 2, find y when x = 3.",
    "options": {
      "A": "2",
      "B": "3",
      "C": "4",
      "D": "6"
    },
    "correctAnswer": "C",
    "explanation": "y = k/x → 6 = k/2 → k = 12. When x = 3, y = 12/3 = 4.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-049",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Simplify: (√5 + √2)(√5 − √2).",
    "options": {
      "A": "3",
      "B": "7",
      "C": "√7",
      "D": "2√5"
    },
    "correctAnswer": "A",
    "explanation": "Difference of squares: (√5)² − (√2)² = 5 − 2 = 3.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-050",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Rationalise 1/√2.",
    "options": {
      "A": "√2",
      "B": "√2/2",
      "C": "2√2",
      "D": "1/2"
    },
    "correctAnswer": "B",
    "explanation": "Multiply numerator and denominator by √2: √2/2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-051",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Solve for x: 2^(2x) = 16.",
    "options": {
      "A": "1",
      "B": "2",
      "C": "3",
      "D": "4"
    },
    "correctAnswer": "B",
    "explanation": "16 = 2⁴ → 2x = 4 → x = 2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-052",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Simplify: 27^(2/3).",
    "options": {
      "A": "3",
      "B": "6",
      "C": "9",
      "D": "18"
    },
    "correctAnswer": "C",
    "explanation": "27^(2/3) = (∛27)² = 3² = 9.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-053",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Evaluate: 8^(1/3) × 4^(1/2).",
    "options": {
      "A": "2",
      "B": "4",
      "C": "6",
      "D": "8"
    },
    "correctAnswer": "B",
    "explanation": "8^(1/3) = 2; 4^(1/2) = 2. Product = 4.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-054",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Convert 234₅ to base 10.",
    "options": {
      "A": "59",
      "B": "64",
      "C": "69",
      "D": "74"
    },
    "correctAnswer": "C",
    "explanation": "2×5² + 3×5¹ + 4×5⁰ = 50 + 15 + 4 = 69.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-055",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Find x if 4^x = 64.",
    "options": {
      "A": "2",
      "B": "3",
      "C": "4",
      "D": "5"
    },
    "correctAnswer": "B",
    "explanation": "64 = 4³ → x = 3.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-056",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Find the simple interest on ₦5000 at 10% per annum for 2 years.",
    "options": {
      "A": "₦500",
      "B": "₦800",
      "C": "₦1000",
      "D": "₦1200"
    },
    "correctAnswer": "C",
    "explanation": "SI = PRT/100 = (5000 × 10 × 2)/100 = ₦1000.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-057",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Find the compound interest on ₦1000 at 10% per annum for 2 years.",
    "options": {
      "A": "₦100",
      "B": "₦200",
      "C": "₦210",
      "D": "₦220"
    },
    "correctAnswer": "C",
    "explanation": "Amount = 1000(1.1)² = 1210. CI = 1210 − 1000 = ₦210.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-058",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "If 2x + 3y = 12 and x = 3, find y.",
    "options": {
      "A": "1",
      "B": "2",
      "C": "3",
      "D": "4"
    },
    "correctAnswer": "B",
    "explanation": "2(3) + 3y = 12 → 6 + 3y = 12 → 3y = 6 → y = 2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-059",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "Solve: x² − 4 = 0.",
    "options": {
      "A": "x = 2 only",
      "B": "x = -2 only",
      "C": "x = ±2",
      "D": "x = ±4"
    },
    "correctAnswer": "C",
    "explanation": "x² = 4 → x = ±2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2020-060",
    "subject": "mathematics",
    "year": 2020,
    "origin": "official_past_question",
    "question": "The roots of x² + 6x + 9 = 0 are?",
    "options": {
      "A": "3 and 3",
      "B": "-3 and -3",
      "C": "3 and -3",
      "D": "9 and 1"
    },
    "correctAnswer": "B",
    "explanation": "(x + 3)² = 0 → x = -3 (double root).",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  }
];

export default questions;
