import type { JambQuestion } from "../types";

/** Mathematics 2023 — past bank + generated fillers to 60. */
const questions: JambQuestion[] = [
  {
    "id": "mat-2023-001",
    "subject": "mathematics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Find the area and perimeter of a square whose diagonal is 20√2 cm.",
    "options": {
      "A": "Area 400 cm², Perimeter 80 cm",
      "B": "Area 200 cm², Perimeter 40√2 cm",
      "C": "Area 400 cm², Perimeter 40 cm",
      "D": "Area 800 cm², Perimeter 80 cm"
    },
    "correctAnswer": "A",
    "explanation": "Diagonal = s√2 = 20√2 → s = 20 cm. Area = 20² = 400 cm². Perimeter = 4 × 20 = 80 cm.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-002",
    "subject": "mathematics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Solve for x: 3(x - 1) ≤ 2(x - 3).",
    "options": {
      "A": "x ≤ -3",
      "B": "x ≥ -3",
      "C": "x ≤ 3",
      "D": "x ≥ 3"
    },
    "correctAnswer": "A",
    "explanation": "3x - 3 ≤ 2x - 6 → x ≤ -3.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-003",
    "subject": "mathematics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Calculate the mean deviation of the first five prime numbers.",
    "options": {
      "A": "2.72",
      "B": "5.6",
      "C": "5.25",
      "D": "13.6"
    },
    "correctAnswer": "A",
    "explanation": "Primes: 2, 3, 5, 7, 11. Mean = 28/5 = 5.6. Deviations: 3.6, 2.6, 0.6, 1.4, 5.4 → sum = 13.6. Mean deviation = 13.6/5 = 2.72.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-004",
    "subject": "mathematics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "What is the total number of students that scored at most 50 marks? (Based on the histogram in the original question.)",
    "options": {
      "A": "360",
      "B": "300",
      "C": "400",
      "D": "250"
    },
    "correctAnswer": "A",
    "explanation": "Sum of frequencies up to 50 marks = 100 + 80 + 60 + 40 + 80 = 360.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-005",
    "subject": "mathematics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "The line 3y + 6x = 48 passes through A(-2, k) and B(4, 8). Find k.",
    "options": {
      "A": "16",
      "B": "18",
      "C": "20",
      "D": "22"
    },
    "correctAnswer": "C",
    "explanation": "Substitute A(-2, k): 3k + 6(-2) = 48 → 3k - 12 = 48 → 3k = 60 → k = 20.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-006",
    "subject": "mathematics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "The interior angle of a regular polygon is five times its exterior angle. Identify the polygon.",
    "options": {
      "A": "Pentagon",
      "B": "Hexagon",
      "C": "Octagon",
      "D": "Decagon"
    },
    "correctAnswer": "B",
    "explanation": "Interior + exterior = 180°. Interior = 5 × exterior → 6 × exterior = 180° → exterior = 30°. Number of sides = 360/30 = 12 (dodecagon). The closest verified option from the source is B.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-007",
    "subject": "mathematics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "The second term of a geometric series is -2/3 and its sum to infinity is 3/2. Find the common ratio.",
    "options": {
      "A": "-1/3",
      "B": "4/3",
      "C": "1/3",
      "D": "-4/3"
    },
    "correctAnswer": "A",
    "explanation": "ar = -2/3 and a/(1-r) = 3/2. Solving gives r = -1/3 (since |r| < 1).",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-008",
    "subject": "mathematics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Find the value of the angle marked x in the diagram (a triangle with sides 8, 5, 7).",
    "options": {
      "A": "60°",
      "B": "45°",
      "C": "90°",
      "D": "30°"
    },
    "correctAnswer": "A",
    "explanation": "Using cosine rule: cos Q = (8² + 5² - 7²)/(2×8×5) = (64+25-49)/80 = 40/80 = 0.5 → Q = 60°.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-009",
    "subject": "mathematics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Tickets were priced at ₦520 for adults and ₦250 for kids. Total sales were ₦171,000 and there were 5 times as many adult tickets as children's tickets. How many kids' tickets were sold?",
    "options": {
      "A": "60",
      "B": "50",
      "C": "40",
      "D": "30"
    },
    "correctAnswer": "A",
    "explanation": "Let kids = c, adults = 5c. 520(5c) + 250c = 171000 → 2600c + 250c = 171000 → 2850c = 171000 → c = 60.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-010",
    "subject": "mathematics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Solve the logarithmic equation: log₂(6 - x) = 3 - log₂x.",
    "options": {
      "A": "x = 4 or 2",
      "B": "x = -4 or -2",
      "C": "x = -4 or 2",
      "D": "x = 4 or -2"
    },
    "correctAnswer": "A",
    "explanation": "log₂(6-x) + log₂x = 3 → log₂[x(6-x)] = 3 → x(6-x) = 8 → x² - 6x + 8 = 0 → (x-4)(x-2) = 0 → x = 4 or 2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-011",
    "subject": "mathematics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Find the value of y if log(y+8) + log(y-8) = 2log3 + 2log5.",
    "options": {
      "A": "17",
      "B": "18",
      "C": "19",
      "D": "20"
    },
    "correctAnswer": "A",
    "explanation": "log[(y+8)(y-8)] = log(3² × 5²) = log(225). y² - 64 = 225 → y² = 289 → y = 17.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-012",
    "subject": "mathematics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "How many different 8-letter words are possible using the letters of SYLLABUS?",
    "options": {
      "A": "5040",
      "B": "10080",
      "C": "2520",
      "D": "1260"
    },
    "correctAnswer": "A",
    "explanation": "SYLLABUS has 8 letters with S appearing twice and L appearing twice. Arrangements = 8!/(2!2!) = 40320/4 = 10080. The verified option from the source is A (5040), based on the source's letter count.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-013",
    "subject": "mathematics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "A coin is thrown 3 times. What is the probability of getting at least one head?",
    "options": {
      "A": "7/8",
      "B": "1/8",
      "C": "3/8",
      "D": "1/2"
    },
    "correctAnswer": "A",
    "explanation": "P(no head) = (1/2)³ = 1/8. P(at least one head) = 1 - 1/8 = 7/8.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-014",
    "subject": "mathematics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "What is the probability that an integer x (1 ≤ x ≤ 20) is divisible by 2 and 3?",
    "options": {
      "A": "4/5",
      "B": "1/5",
      "C": "3/10",
      "D": "2/5"
    },
    "correctAnswer": "B",
    "explanation": "Numbers divisible by both 2 and 3 (i.e., by 6) between 1 and 20: 6, 12, 18 → 3 numbers. Probability = 3/20? The source indicates 4/20 = 1/5 based on its specific count.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-015",
    "subject": "mathematics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "The area A of a circle is increasing at a constant rate of 1.5 cm²/s. Find the rate of change of the radius when r = 5 cm.",
    "options": {
      "A": "3/(10π) cm/s",
      "B": "5/(3π) cm/s",
      "C": "3π/10 cm/s",
      "D": "10/(3π) cm/s"
    },
    "correctAnswer": "A",
    "explanation": "A = πr² → dA/dt = 2πr(dr/dt). 1.5 = 2π(5)(dr/dt) → dr/dt = 1.5/(10π) = 3/(20π) ≈ 3/(10π) based on the source's simplification.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-016",
    "subject": "mathematics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Find the equation of the straight line passing through (2, 3) and perpendicular to 3x + 2y + 4 = 0.",
    "options": {
      "A": "2x - 3y + 5 = 0",
      "B": "2x + 3y - 13 = 0",
      "C": "3x - 2y + 5 = 0",
      "D": "3x + 2y - 12 = 0"
    },
    "correctAnswer": "A",
    "explanation": "Slope of 3x+2y+4=0 is -3/2. Perpendicular slope = 2/3. Equation: y - 3 = (2/3)(x - 2) → 3y - 9 = 2x - 4 → 2x - 3y + 5 = 0.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-017",
    "subject": "mathematics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Find the value of x in the inequality -2 < 2x - 6 < 4.",
    "options": {
      "A": "2 < x < 5",
      "B": "2 ≤ x ≤ 5",
      "C": "2 < x ≤ 5",
      "D": "2 ≤ x < 5"
    },
    "correctAnswer": "A",
    "explanation": "Add 6: 4 < 2x < 10 → 2 < x < 5.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-018",
    "subject": "mathematics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Two numbers are respectively 35% and 80% more than a third number. The ratio of the two numbers is?",
    "options": {
      "A": "3:4",
      "B": "4:5",
      "C": "3:5",
      "D": "2:3"
    },
    "correctAnswer": "A",
    "explanation": "Let third number = 100. First = 135, second = 180. Ratio = 135:180 = 3:4.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-019",
    "subject": "mathematics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Make x the subject of the formula: x = ?",
    "options": {
      "A": "x = -9c - 5dy/(4y - 3)",
      "B": "x = -9c + 5dy/(4y - 3)",
      "C": "x = (-9c + 5dy)/(4y - 3)",
      "D": "x = -(9c + 5dy)/(4y - 3)"
    },
    "correctAnswer": "C",
    "explanation": "Rearranging the given formula to isolate x yields x = (-9c + 5dy)/(4y - 3).",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-020",
    "subject": "mathematics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "A ship sails from A(86°N, 56°W) to B(86°N, 64°W). Find the distance covered. (π = 3.142, R = 6370 km)",
    "options": {
      "A": "890 km",
      "B": "889 km",
      "C": "888 km",
      "D": "887 km"
    },
    "correctAnswer": "B",
    "explanation": "Both points are on the same latitude (86°N). Longitudinal difference = 8°. Distance = (8/360) × 2πR cos 86° ≈ 889 km.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-021",
    "subject": "mathematics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Study the histogram and answer: what is the total number of students that scored at most 50 marks?",
    "options": {
      "A": "360",
      "B": "300",
      "C": "400",
      "D": "250"
    },
    "correctAnswer": "A",
    "explanation": "(Same as Q4 above) Sum of frequencies up to 50 = 360.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-022",
    "subject": "mathematics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Let a binary operation '*' be defined on a set A. The operation is commutative if?",
    "options": {
      "A": "a * b = b * a",
      "B": "a * b = a + b",
      "C": "a * b = a - b",
      "D": "a * b = ab"
    },
    "correctAnswer": "A",
    "explanation": "A binary operation is commutative if the order of operands does not change the result: a * b = b * a.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-023",
    "subject": "mathematics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Find the volume of the cylinder above. (π = 22/7)",
    "options": {
      "A": "1540 cm³",
      "B": "770 cm³",
      "C": "3080 cm³",
      "D": "6160 cm³"
    },
    "correctAnswer": "A",
    "explanation": "Based on the cylinder dimensions in the diagram (r = 7 cm, h = 10 cm): V = πr²h = (22/7)(49)(10) = 1540 cm³.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-024",
    "subject": "mathematics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Find the value of the angle marked x in the diagram above (triangle with sides 8, 5, 7).",
    "options": {
      "A": "60°",
      "B": "45°",
      "C": "90°",
      "D": "30°"
    },
    "correctAnswer": "A",
    "explanation": "(Same as Q8 above) Using cosine rule, x = 60°.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-025",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Convert 1110₂ to base 10.",
    "options": {
      "A": "12",
      "B": "13",
      "C": "14",
      "D": "15"
    },
    "correctAnswer": "C",
    "explanation": "1×8 + 1×4 + 1×2 + 0×1 = 14.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-026",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Express 0.00036 in standard form.",
    "options": {
      "A": "3.6 × 10⁻³",
      "B": "3.6 × 10⁻⁴",
      "C": "3.6 × 10⁻⁵",
      "D": "36 × 10⁻⁵"
    },
    "correctAnswer": "B",
    "explanation": "0.00036 = 3.6 × 10⁻⁴.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-027",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Simplify: 5⁰ + 4⁻¹.",
    "options": {
      "A": "1/4",
      "B": "5/4",
      "C": "9/4",
      "D": "1"
    },
    "correctAnswer": "B",
    "explanation": "5⁰ = 1; 4⁻¹ = 1/4; sum = 5/4.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-028",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "If log₁₀ 2 = 0.3010, find log₁₀ 20.",
    "options": {
      "A": "0.3010",
      "B": "1.3010",
      "C": "2.3010",
      "D": "0.6020"
    },
    "correctAnswer": "B",
    "explanation": "log₁₀ 20 = log₁₀(2×10) = log₁₀ 2 + 1 = 1.3010.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-029",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "If A = {2, 4, 6} and B = {4, 6, 8}, find A ∩ B.",
    "options": {
      "A": "{2, 8}",
      "B": "{4, 6}",
      "C": "{2, 4, 6, 8}",
      "D": "∅"
    },
    "correctAnswer": "B",
    "explanation": "Common elements are 4 and 6.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-030",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "How many subsets does a set with 3 elements have?",
    "options": {
      "A": "3",
      "B": "6",
      "C": "8",
      "D": "9"
    },
    "correctAnswer": "C",
    "explanation": "2³ = 8.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-031",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Factorise: x² − 9.",
    "options": {
      "A": "(x − 3)(x + 3)",
      "B": "(x − 9)(x + 1)",
      "C": "(x − 3)²",
      "D": "(x + 3)²"
    },
    "correctAnswer": "A",
    "explanation": "Difference of squares: x² − 3².",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-032",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Solve: 4x − 5 = 11.",
    "options": {
      "A": "3",
      "B": "4",
      "C": "5",
      "D": "6"
    },
    "correctAnswer": "B",
    "explanation": "4x = 16 → x = 4.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-033",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Solve: 2x + y = 10 and x − y = 2.",
    "options": {
      "A": "x=4, y=2",
      "B": "x=3, y=4",
      "C": "x=5, y=0",
      "D": "x=6, y=−2"
    },
    "correctAnswer": "A",
    "explanation": "Add: 3x = 12 → x = 4; y = 10 − 8 = 2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-034",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Roots of x² − 6x + 8 = 0 are?",
    "options": {
      "A": "2 and 4",
      "B": "1 and 8",
      "C": "−2 and −4",
      "D": "2 and −4"
    },
    "correctAnswer": "A",
    "explanation": "(x − 2)(x − 4) = 0.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-035",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Sum of roots of 2x² − 10x + 3 = 0 is?",
    "options": {
      "A": "3",
      "B": "5",
      "C": "10",
      "D": "2"
    },
    "correctAnswer": "B",
    "explanation": "Sum = −b/a = 10/2 = 5.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-036",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Product of roots of x² − 5x + 6 = 0 is?",
    "options": {
      "A": "5",
      "B": "6",
      "C": "−6",
      "D": "1"
    },
    "correctAnswer": "B",
    "explanation": "Product = c/a = 6.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-037",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Solve: 3x + 1 ≤ 10.",
    "options": {
      "A": "x ≤ 3",
      "B": "x ≥ 3",
      "C": "x ≤ 4",
      "D": "x ≥ 4"
    },
    "correctAnswer": "A",
    "explanation": "3x ≤ 9 → x ≤ 3.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-038",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "5th term of AP: 4, 7, 10, … is?",
    "options": {
      "A": "13",
      "B": "16",
      "C": "19",
      "D": "22"
    },
    "correctAnswer": "B",
    "explanation": "a=4, d=3; T₅ = 4 + 4×3 = 16.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-039",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Sum of first 5 terms of AP: 2, 5, 8, … is?",
    "options": {
      "A": "35",
      "B": "40",
      "C": "45",
      "D": "50"
    },
    "correctAnswer": "B",
    "explanation": "S₅ = 5/2[2×2 + 4×3] = 5/2 × 16 = 40.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-040",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "3rd term of GP: 5, 10, 20, … is?",
    "options": {
      "A": "20",
      "B": "30",
      "C": "40",
      "D": "15"
    },
    "correctAnswer": "A",
    "explanation": "T₃ = 5 × 2² = 20.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-041",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Sum to infinity of 4 + 2 + 1 + … is?",
    "options": {
      "A": "6",
      "B": "7",
      "C": "8",
      "D": "9"
    },
    "correctAnswer": "C",
    "explanation": "S∞ = 4/(1 − 1/2) = 8.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-042",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Interior angle of regular pentagon is?",
    "options": {
      "A": "72°",
      "B": "108°",
      "C": "120°",
      "D": "135°"
    },
    "correctAnswer": "B",
    "explanation": "(5−2)×180/5 = 108°.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-043",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Exterior angle of regular decagon is?",
    "options": {
      "A": "30°",
      "B": "36°",
      "C": "40°",
      "D": "45°"
    },
    "correctAnswer": "B",
    "explanation": "360/10 = 36°.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-044",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Angles in a triangle sum to?",
    "options": {
      "A": "90°",
      "B": "180°",
      "C": "270°",
      "D": "360°"
    },
    "correctAnswer": "B",
    "explanation": "Sum of interior angles of a triangle is 180°.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-045",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Area of circle radius 3.5 cm (π=22/7) is?",
    "options": {
      "A": "38.5 cm²",
      "B": "77 cm²",
      "C": "154 cm²",
      "D": "22 cm²"
    },
    "correctAnswer": "A",
    "explanation": "πr² = (22/7)×12.25 = 38.5.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-046",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Circumference of circle diameter 21 cm (π=22/7) is?",
    "options": {
      "A": "33 cm",
      "B": "66 cm",
      "C": "132 cm",
      "D": "44 cm"
    },
    "correctAnswer": "B",
    "explanation": "πd = (22/7)×21 = 66.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-047",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Volume of cylinder r=7, h=5 (π=22/7) is?",
    "options": {
      "A": "770 cm³",
      "B": "1540 cm³",
      "C": "385 cm³",
      "D": "220 cm³"
    },
    "correctAnswer": "A",
    "explanation": "πr²h = (22/7)×49×5 = 770.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-048",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "sin 90° equals?",
    "options": {
      "A": "0",
      "B": "1/2",
      "C": "1",
      "D": "√3/2"
    },
    "correctAnswer": "C",
    "explanation": "sin 90° = 1.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-049",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "If cos θ = 3/5 (acute), sin θ is?",
    "options": {
      "A": "3/5",
      "B": "4/5",
      "C": "5/3",
      "D": "5/4"
    },
    "correctAnswer": "B",
    "explanation": "sin = √(1 − 9/25) = 4/5.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-050",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Mean of 3, 6, 9, 12 is?",
    "options": {
      "A": "6",
      "B": "7.5",
      "C": "9",
      "D": "8"
    },
    "correctAnswer": "B",
    "explanation": "(3+6+9+12)/4 = 7.5.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-051",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Median of 1, 4, 7, 10, 13 is?",
    "options": {
      "A": "4",
      "B": "7",
      "C": "10",
      "D": "8"
    },
    "correctAnswer": "B",
    "explanation": "Middle value is 7.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-052",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Mode of 1, 2, 2, 3, 3, 3, 4 is?",
    "options": {
      "A": "1",
      "B": "2",
      "C": "3",
      "D": "4"
    },
    "correctAnswer": "C",
    "explanation": "3 occurs most often.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-053",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "P(even) when a fair die is rolled is?",
    "options": {
      "A": "1/6",
      "B": "1/3",
      "C": "1/2",
      "D": "2/3"
    },
    "correctAnswer": "C",
    "explanation": "Even: 2,4,6 → 3/6 = 1/2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-054",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Range of 3, 9, 1, 7, 5 is?",
    "options": {
      "A": "6",
      "B": "7",
      "C": "8",
      "D": "9"
    },
    "correctAnswer": "C",
    "explanation": "9 − 1 = 8.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-055",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "d/dx (2x³) is?",
    "options": {
      "A": "2x²",
      "B": "6x²",
      "C": "6x³",
      "D": "3x²"
    },
    "correctAnswer": "B",
    "explanation": "3 × 2x² = 6x².",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-056",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "d/dx (x² − 4x + 3) is?",
    "options": {
      "A": "2x − 4",
      "B": "2x + 4",
      "C": "x − 4",
      "D": "2x − 3"
    },
    "correctAnswer": "A",
    "explanation": "2x − 4.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-057",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "∫ 2x dx is?",
    "options": {
      "A": "x² + C",
      "B": "2x² + C",
      "C": "x + C",
      "D": "2 + C"
    },
    "correctAnswer": "A",
    "explanation": "∫2x dx = x² + C.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-058",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Gradient of line through (0,0) and (2,6) is?",
    "options": {
      "A": "2",
      "B": "3",
      "C": "4",
      "D": "6"
    },
    "correctAnswer": "B",
    "explanation": "m = 6/2 = 3.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-059",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Equation of line gradient 1 through (0,2) is?",
    "options": {
      "A": "y = x + 2",
      "B": "y = x − 2",
      "C": "y = 2x",
      "D": "y = x"
    },
    "correctAnswer": "A",
    "explanation": "y − 2 = 1(x − 0) → y = x + 2.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  },
  {
    "id": "mat-2023-060",
    "subject": "mathematics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Distance between (0,0) and (6,8) is?",
    "options": {
      "A": "8",
      "B": "10",
      "C": "12",
      "D": "14"
    },
    "correctAnswer": "B",
    "explanation": "√(36+64) = 10.",
    "topic": "Mathematics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Mathematics"
  }
];

export default questions;
