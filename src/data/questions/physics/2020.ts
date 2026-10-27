import type { JambQuestion } from "../types";

/** Original UTME-style practice items for physics 2020. Not claimed as official past questions. */
const questions: JambQuestion[] = [
  {
    "id": "phy-2020-01",
    "subject": "physics",
    "year": 2020,
    "origin": "original_practice",
    "question": "The SI unit of force is the",
    "options": {
      "A": "joule",
      "B": "newton",
      "C": "watt",
      "D": "pascal"
    },
    "correctAnswer": "B",
    "explanation": "Force is measured in newtons (N).",
    "topic": "Mechanics",
    "difficulty": "easy",
    "syllabusTopic": "Mechanics"
  },
  {
    "id": "phy-2020-02",
    "subject": "physics",
    "year": 2020,
    "origin": "original_practice",
    "question": "Speed is a",
    "options": {
      "A": "vector quantity",
      "B": "scalar quantity",
      "C": "fundamental unit",
      "D": "derived vector only"
    },
    "correctAnswer": "B",
    "explanation": "Speed has magnitude only; velocity is the vector.",
    "topic": "Electricity",
    "difficulty": "medium",
    "syllabusTopic": "Electricity"
  },
  {
    "id": "phy-2020-03",
    "subject": "physics",
    "year": 2020,
    "origin": "original_practice",
    "question": "Ohm's law relates",
    "options": {
      "A": "V, I and R",
      "B": "P, V and t",
      "C": "F, m and a",
      "D": "Q, V and C"
    },
    "correctAnswer": "A",
    "explanation": "V = IR relates voltage, current and resistance.",
    "topic": "Waves",
    "difficulty": "hard",
    "syllabusTopic": "Waves"
  },
  {
    "id": "phy-2020-04",
    "subject": "physics",
    "year": 2020,
    "origin": "original_practice",
    "question": "The frequency of a wave is measured in",
    "options": {
      "A": "metres",
      "B": "hertz",
      "C": "seconds",
      "D": "newtons"
    },
    "correctAnswer": "B",
    "explanation": "Frequency is cycles per second (Hz).",
    "topic": "Optics",
    "difficulty": "easy",
    "syllabusTopic": "Optics"
  },
  {
    "id": "phy-2020-05",
    "subject": "physics",
    "year": 2020,
    "origin": "original_practice",
    "question": "Light travels fastest in",
    "options": {
      "A": "glass",
      "B": "water",
      "C": "air/vacuum",
      "D": "diamond"
    },
    "correctAnswer": "C",
    "explanation": "Light is fastest in vacuum (approx. air).",
    "topic": "Heat",
    "difficulty": "medium",
    "syllabusTopic": "Heat"
  },
  {
    "id": "phy-2020-06",
    "subject": "physics",
    "year": 2020,
    "origin": "original_practice",
    "question": "Heat transfer by electromagnetic waves is called",
    "options": {
      "A": "conduction",
      "B": "convection",
      "C": "radiation",
      "D": "evaporation"
    },
    "correctAnswer": "C",
    "explanation": "Radiation transfers heat without a medium.",
    "topic": "Modern Physics",
    "difficulty": "hard",
    "syllabusTopic": "Modern Physics"
  },
  {
    "id": "phy-2020-07",
    "subject": "physics",
    "year": 2020,
    "origin": "original_practice",
    "question": "An object in free fall near Earth has acceleration about",
    "options": {
      "A": "9.8 m/s²",
      "B": "98 m/s²",
      "C": "0.98 m/s²",
      "D": "1 m/s²"
    },
    "correctAnswer": "A",
    "explanation": "g ≈ 9.8 m/s² near Earth's surface.",
    "topic": "Measurement",
    "difficulty": "easy",
    "syllabusTopic": "Measurement"
  },
  {
    "id": "phy-2020-08",
    "subject": "physics",
    "year": 2020,
    "origin": "original_practice",
    "question": "A device that stores electric charge is a",
    "options": {
      "A": "resistor",
      "B": "capacitor",
      "C": "inductor",
      "D": "transformer"
    },
    "correctAnswer": "B",
    "explanation": "Capacitors store charge.",
    "topic": "Mechanics",
    "difficulty": "medium",
    "syllabusTopic": "Mechanics"
  },
  {
    "id": "phy-2020-09",
    "subject": "physics",
    "year": 2020,
    "origin": "original_practice",
    "question": "The image formed by a plane mirror is",
    "options": {
      "A": "real and inverted",
      "B": "virtual and upright",
      "C": "real and upright",
      "D": "virtual and inverted"
    },
    "correctAnswer": "B",
    "explanation": "Plane mirrors form virtual, erect images.",
    "topic": "Electricity",
    "difficulty": "hard",
    "syllabusTopic": "Electricity"
  },
  {
    "id": "phy-2020-10",
    "subject": "physics",
    "year": 2020,
    "origin": "original_practice",
    "question": "Power is defined as",
    "options": {
      "A": "work × time",
      "B": "work / time",
      "C": "force × distance",
      "D": "mass × acceleration"
    },
    "correctAnswer": "B",
    "explanation": "Power is rate of doing work.",
    "topic": "Waves",
    "difficulty": "easy",
    "syllabusTopic": "Waves"
  }
];

export default questions;
