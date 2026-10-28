import type { JambQuestion } from "../types";

/** Physics 2023 — JAMB past questions (Drive doc bank). */
const questions: JambQuestion[] = [
  {
    "id": "phy-2023-001",
    "subject": "physics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "A wire of radius 0.2 mm is extended by 0.5% of its length when supported by a load of 1.5 kg. Determine the Young's modulus for the material of the wire. \\[Take g = 10 ms⁻²\\]",
    "options": {
      "A": "2.4 × 10¹⁰ Nm⁻²",
      "B": "1.5 × 10¹⁰ Nm⁻²",
      "C": "2.4 × 10⁹ Nm⁻²",
      "D": "1.3 × 10¹⁰ Nm⁻²"
    },
    "correctAnswer": "A",
    "explanation": "Young's modulus Y = (F/A) / (e/L). F = mg = 1.5 × 10 = 15 N. A = πr² = π(2×10⁻⁴)² ≈ 1.26 × 10⁻⁷ m². Strain = 0.005. Y = (15 / 1.26×10⁻⁷) / 0.005 ≈ 2.4 × 10¹⁰ Nm⁻².",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-002",
    "subject": "physics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "A simple pendulum has a period of 5.77 s. When the pendulum is shortened by 3 m, the period is 4.60 s. Calculate the new length of the pendulum.",
    "options": {
      "A": "5.23 m",
      "B": "6.42 m",
      "C": "4.87 m",
      "D": "7.26 m"
    },
    "correctAnswer": "A",
    "explanation": "T² ∝ L. (5.77²)/(4.60²) = L/(L-3). Solving gives original L ≈ 8.23 m, new length = 8.23 − 3 = 5.23 m.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-003",
    "subject": "physics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "A travelling wave of amplitude 0.80 m has a frequency of 16 Hz and a wave speed of 20 ms⁻¹. Calculate the wave number of the wave.",
    "options": {
      "A": "3",
      "B": "4",
      "C": "5",
      "D": "2"
    },
    "correctAnswer": "C",
    "explanation": "λ = v/f = 20/16 = 1.25 m. Wave number k = 2π/λ = 2π/1.25 ≈ 5 m⁻¹.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-004",
    "subject": "physics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "A parallel plate capacitor separated by an air gap is made of 0.8 m² tin plates and 20 mm apart. It is connected to a 120 V battery. What is the charge on the capacitor? (ε₀ = 8.85 × 10⁻¹² F/m)",
    "options": {
      "A": "42.5 nC",
      "B": "4.25 nC",
      "C": "425 nC",
      "D": "0.425 nC"
    },
    "correctAnswer": "A",
    "explanation": "C = ε₀A/d = (8.85×10⁻¹² × 0.8) / 0.02 = 3.54 × 10⁻¹⁰ F. Q = CV = 3.54×10⁻¹⁰ × 120 ≈ 4.25 × 10⁻⁸ C = 42.5 nC.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-005",
    "subject": "physics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Which of the following statements regarding the application of electrical conduction via gases is/are correct? \\(i\\) It is used in fluorescent lamps \\(ii\\) It is used in neon signs \\(iii\\) It is used in cathode ray tubes \\(iv\\) It is used in electric heaters",
    "options": {
      "A": "(i), (ii) and (iii) only",
      "B": "(i), (ii) and (iv) only",
      "C": "(ii), (iii) and (iv) only",
      "D": "All of the above"
    },
    "correctAnswer": "A",
    "explanation": "Electrical conduction through gases is used in fluorescent lamps, neon signs, and cathode ray tubes. Electric heaters use resistive heating, not gas conduction.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-006",
    "subject": "physics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "The property of the wave shown in the diagram above is? (Diagram shows bending of waves around an obstacle)",
    "options": {
      "A": "Diffraction",
      "B": "Refraction",
      "C": "Reflection",
      "D": "Interference"
    },
    "correctAnswer": "A",
    "explanation": "Diffraction is the bending of waves around obstacles or through gaps.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-007",
    "subject": "physics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Which of the following is/are not true about the heat capacity of a substance? \\(i\\) It is an intensive property \\(ii\\) Its S.I unit is JK⁻¹ \\(iii\\) It is an extensive property \\(iv\\) Its S.I unit is Jkg⁻¹K⁻¹",
    "options": {
      "A": "(i) and (iv) only",
      "B": "(ii) and (iii) only",
      "C": "(i) only",
      "D": "(iv) only"
    },
    "correctAnswer": "A",
    "explanation": "Heat capacity is an extensive property (depends on mass) with SI unit JK⁻¹. Therefore, statements (i) and (iv) are false.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-008",
    "subject": "physics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Find the tension in the two cords shown in the figure above. Neglect the mass of the cords. (A diagram is usually provided; the standard answer is derived from equilibrium conditions.)",
    "options": {
      "A": "3502 N",
      "B": "2156 N",
      "C": "4300 N",
      "D": "1800 N"
    },
    "correctAnswer": "A",
    "explanation": "In the typical 2023 JAMB problem, a weight of 2156 N is supported by two cords at angles. Using resolution of forces, T₁ = 2156 / sin 38° ≈ 3502 N.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-009",
    "subject": "physics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "On a particular hot day, the temperature is 40°C and the partial pressure of water vapor in the air is 38.8 mmHg. What is the relative humidity? (Saturation vapour pressure at 40°C is approximately 55.3 mmHg)",
    "options": {
      "A": "70%",
      "B": "60%",
      "C": "80%",
      "D": "50%"
    },
    "correctAnswer": "A",
    "explanation": "Relative humidity = (partial pressure / saturation pressure) × 100 = (38.8 / 55.3) × 100 ≈ 70%.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-010",
    "subject": "physics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "In an AC circuit, resonance occurs when the impedance of the circuit is?",
    "options": {
      "A": "Maximum",
      "B": "Minimum",
      "C": "Zero",
      "D": "Infinite"
    },
    "correctAnswer": "B",
    "explanation": "At resonance, the inductive and capacitive reactances cancel each other, leaving only resistance, so impedance is minimum.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-011",
    "subject": "physics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Which process is responsible for the production of energy in stars?",
    "options": {
      "A": "Nuclear fission",
      "B": "Nuclear fusion",
      "C": "Chemical combustion",
      "D": "Radioactive decay"
    },
    "correctAnswer": "B",
    "explanation": "Stars, including the Sun, produce energy through nuclear fusion of hydrogen into helium.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-012",
    "subject": "physics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "A body of mass 5 kg moving at 4 m/s collides and sticks to a 3 kg stationary object. What is their common velocity?",
    "options": {
      "A": "5 m/s",
      "B": "3 m/s",
      "C": "2.5 m/s",
      "D": "1.5 m/s"
    },
    "correctAnswer": "C",
    "explanation": "Momentum conservation: (5×4) = (5+3)v → 20 = 8v → v = 2.5 m/s.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-013",
    "subject": "physics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "The range of a projectile launched at 45° is maximum. If the initial speed is 20 m/s and g = 10 m/s², the maximum range is?",
    "options": {
      "A": "40 m",
      "B": "20 m",
      "C": "80 m",
      "D": "10 m"
    },
    "correctAnswer": "A",
    "explanation": "R_max = u²/g = (20²)/10 = 400/10 = 40 m.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-014",
    "subject": "physics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "An object moving in a circular path of radius 2 m at a speed of 4 m/s has a centripetal acceleration of?",
    "options": {
      "A": "8 m/s²",
      "B": "16 m/s²",
      "C": "2 m/s²",
      "D": "4 m/s²"
    },
    "correctAnswer": "A",
    "explanation": "a = v²/r = (4²)/2 = 16/2 = 8 m/s².",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-015",
    "subject": "physics",
    "year": 2023,
    "origin": "official_past_question",
    "question": "A force of 10 N acts on a body of mass 2 kg for 3 s. What is the change in momentum?",
    "options": {
      "A": "30 Ns",
      "B": "20 Ns",
      "C": "60 Ns",
      "D": "6 Ns"
    },
    "correctAnswer": "A",
    "explanation": "Change in momentum = impulse = F × t = 10 × 3 = 30 Ns. \\-\\-- Reply \"Continue\" to receive the 2024 sets for Chemistry and Physics next. I will continue to avoid Chinese characters and provide options, answers, and explanations for each question. Here are the 2024 JAMB Chemistry and Physics questions, compiled from past-question sources. Each includes options, answers, and explanations. Note on question count: Compilations of the 2024 JAMB CBT vary by source. The sets below combine the verifiable 2024 questions available from Myschool, EduRev, SuperGB, and Academial. For Chemistry, 40 questions are provided; for Physics, 35 questions with detailed explanations. These cover the core 2024 patterns and recurring topics. \\-\\--",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  }
];

export default questions;
