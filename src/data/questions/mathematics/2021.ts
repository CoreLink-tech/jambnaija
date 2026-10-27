import type { JambQuestion } from "../types";

/** Original UTME-style practice items for mathematics 2021. Not claimed as official past questions. */
const questions: JambQuestion[] = [
  {
    "id": "mat-2021-01",
    "subject": "mathematics",
    "year": 2021,
    "origin": "original_practice",
    "question": "If x + 5 = 12, then x equals",
    "options": {
      "A": "5",
      "B": "7",
      "C": "12",
      "D": "17"
    },
    "correctAnswer": "B",
    "explanation": "Subtract 5 from both sides: x = 7.",
    "topic": "Algebra",
    "difficulty": "easy",
    "syllabusTopic": "Algebra"
  },
  {
    "id": "mat-2021-02",
    "subject": "mathematics",
    "year": 2021,
    "origin": "original_practice",
    "question": "What is 15% of 200?",
    "options": {
      "A": "15",
      "B": "30",
      "C": "25",
      "D": "40"
    },
    "correctAnswer": "B",
    "explanation": "0.15 × 200 = 30.",
    "topic": "Geometry",
    "difficulty": "medium",
    "syllabusTopic": "Geometry"
  },
  {
    "id": "mat-2021-03",
    "subject": "mathematics",
    "year": 2021,
    "origin": "original_practice",
    "question": "The LCM of 4 and 6 is",
    "options": {
      "A": "12",
      "B": "24",
      "C": "2",
      "D": "10"
    },
    "correctAnswer": "A",
    "explanation": "LCM of 4 and 6 is 12.",
    "topic": "Trigonometry",
    "difficulty": "hard",
    "syllabusTopic": "Trigonometry"
  },
  {
    "id": "mat-2021-04",
    "subject": "mathematics",
    "year": 2021,
    "origin": "original_practice",
    "question": "Simplify 2³ × 2²",
    "options": {
      "A": "2⁵",
      "B": "2⁶",
      "C": "4⁵",
      "D": "8"
    },
    "correctAnswer": "A",
    "explanation": "When multiplying same bases, add exponents: 3+2=5.",
    "topic": "Statistics",
    "difficulty": "easy",
    "syllabusTopic": "Statistics"
  },
  {
    "id": "mat-2021-05",
    "subject": "mathematics",
    "year": 2021,
    "origin": "original_practice",
    "question": "The area of a rectangle 8 cm by 5 cm is",
    "options": {
      "A": "13 cm²",
      "B": "40 cm²",
      "C": "26 cm²",
      "D": "20 cm²"
    },
    "correctAnswer": "B",
    "explanation": "Area = length × width = 40.",
    "topic": "Probability",
    "difficulty": "medium",
    "syllabusTopic": "Probability"
  },
  {
    "id": "mat-2021-06",
    "subject": "mathematics",
    "year": 2021,
    "origin": "original_practice",
    "question": "If sin θ = 1/2 and θ is acute, θ equals",
    "options": {
      "A": "30°",
      "B": "45°",
      "C": "60°",
      "D": "90°"
    },
    "correctAnswer": "A",
    "explanation": "sin 30° = 1/2.",
    "topic": "Number Bases",
    "difficulty": "hard",
    "syllabusTopic": "Number Bases"
  },
  {
    "id": "mat-2021-07",
    "subject": "mathematics",
    "year": 2021,
    "origin": "original_practice",
    "question": "The mean of 2, 4, 6, 8 is",
    "options": {
      "A": "4",
      "B": "5",
      "C": "6",
      "D": "20"
    },
    "correctAnswer": "B",
    "explanation": "(2+4+6+8)/4 = 5.",
    "topic": "Logarithms",
    "difficulty": "easy",
    "syllabusTopic": "Logarithms"
  },
  {
    "id": "mat-2021-08",
    "subject": "mathematics",
    "year": 2021,
    "origin": "original_practice",
    "question": "Solve: 3x − 6 = 0",
    "options": {
      "A": "x = 0",
      "B": "x = 2",
      "C": "x = 3",
      "D": "x = −2"
    },
    "correctAnswer": "B",
    "explanation": "3x = 6 ⇒ x = 2.",
    "topic": "Mensuration",
    "difficulty": "medium",
    "syllabusTopic": "Mensuration"
  },
  {
    "id": "mat-2021-09",
    "subject": "mathematics",
    "year": 2021,
    "origin": "original_practice",
    "question": "A fair coin is tossed once. P(heads) is",
    "options": {
      "A": "0",
      "B": "1/4",
      "C": "1/2",
      "D": "1"
    },
    "correctAnswer": "C",
    "explanation": "Two equally likely outcomes; one is heads.",
    "topic": "Algebra",
    "difficulty": "hard",
    "syllabusTopic": "Algebra"
  },
  {
    "id": "mat-2021-10",
    "subject": "mathematics",
    "year": 2021,
    "origin": "original_practice",
    "question": "Convert 101₂ to base 10",
    "options": {
      "A": "3",
      "B": "4",
      "C": "5",
      "D": "6"
    },
    "correctAnswer": "C",
    "explanation": "1×4 + 0×2 + 1×1 = 5.",
    "topic": "Geometry",
    "difficulty": "easy",
    "syllabusTopic": "Geometry"
  }
];

export default questions;
