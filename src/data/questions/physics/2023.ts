import type { JambQuestion } from "../types";

/** Physics 2023 — past bank + generated fillers to 60. */
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
  },
  {
    "id": "phy-2023-016",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "The SI unit of force is the?",
    "options": {
      "A": "Joule",
      "B": "Newton",
      "C": "Watt",
      "D": "Pascal"
    },
    "correctAnswer": "B",
    "explanation": "Force is measured in newtons (N = kg·m/s²).",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-017",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "A body of mass 2 kg accelerates at 3 m/s². The force acting on it is?",
    "options": {
      "A": "1.5 N",
      "B": "5 N",
      "C": "6 N",
      "D": "0.67 N"
    },
    "correctAnswer": "C",
    "explanation": "F = ma = 2 × 3 = 6 N.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-018",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Which of the following is a vector quantity?",
    "options": {
      "A": "Mass",
      "B": "Speed",
      "C": "Velocity",
      "D": "Time"
    },
    "correctAnswer": "C",
    "explanation": "Velocity has both magnitude and direction.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-019",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "The work done when a force of 5 N moves an object 2 m in its direction is?",
    "options": {
      "A": "2.5 J",
      "B": "10 J",
      "C": "7 J",
      "D": "3 J"
    },
    "correctAnswer": "B",
    "explanation": "W = F × d = 5 × 2 = 10 J.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-020",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Power is defined as?",
    "options": {
      "A": "Force × distance",
      "B": "Work done per unit time",
      "C": "Mass × acceleration",
      "D": "Energy × time"
    },
    "correctAnswer": "B",
    "explanation": "Power = work/time.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-021",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "The kinetic energy of a 4 kg mass moving at 3 m/s is?",
    "options": {
      "A": "18 J",
      "B": "36 J",
      "C": "12 J",
      "D": "6 J"
    },
    "correctAnswer": "A",
    "explanation": "KE = ½mv² = ½ × 4 × 9 = 18 J.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-022",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Potential energy of a 2 kg object at 5 m height (g = 10 m/s²) is?",
    "options": {
      "A": "100 J",
      "B": "50 J",
      "C": "20 J",
      "D": "10 J"
    },
    "correctAnswer": "A",
    "explanation": "PE = mgh = 2 × 10 × 5 = 100 J.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-023",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Which of the following is a renewable energy source?",
    "options": {
      "A": "Coal",
      "B": "Petroleum",
      "C": "Wind",
      "D": "Natural gas"
    },
    "correctAnswer": "C",
    "explanation": "Wind energy is continuously replenished.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-024",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Heat transfer through a solid occurs mainly by?",
    "options": {
      "A": "Convection",
      "B": "Conduction",
      "C": "Radiation",
      "D": "Evaporation"
    },
    "correctAnswer": "B",
    "explanation": "Conduction is the transfer of heat through molecular vibration in solids.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-025",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "The temperature at which water freezes at standard pressure is?",
    "options": {
      "A": "0 °C",
      "B": "32 °C",
      "C": "100 °C",
      "D": "−10 °C"
    },
    "correctAnswer": "A",
    "explanation": "The freezing point of pure water at 1 atm is 0 °C.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-026",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Sound waves are?",
    "options": {
      "A": "Transverse",
      "B": "Longitudinal",
      "C": "Electromagnetic",
      "D": "Static"
    },
    "correctAnswer": "B",
    "explanation": "Sound consists of compressions and rarefactions along the direction of travel.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-027",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "The speed of a wave of frequency 50 Hz and wavelength 2 m is?",
    "options": {
      "A": "25 m/s",
      "B": "100 m/s",
      "C": "52 m/s",
      "D": "0.04 m/s"
    },
    "correctAnswer": "B",
    "explanation": "v = fλ = 50 × 2 = 100 m/s.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-028",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Refraction is the change in direction of a wave when it?",
    "options": {
      "A": "Bounces off a surface",
      "B": "Passes from one medium to another",
      "C": "Spreads around an obstacle",
      "D": "Is absorbed"
    },
    "correctAnswer": "B",
    "explanation": "Refraction occurs due to a change in wave speed at a boundary.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-029",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "A convex lens is used to?",
    "options": {
      "A": "Diverge light rays",
      "B": "Converge light rays",
      "C": "Reflect light",
      "D": "Absorb light"
    },
    "correctAnswer": "B",
    "explanation": "A convex (converging) lens focuses parallel rays to a real focus.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-030",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "The unit of electric current is the?",
    "options": {
      "A": "Volt",
      "B": "Ohm",
      "C": "Ampere",
      "D": "Coulomb"
    },
    "correctAnswer": "C",
    "explanation": "Current is measured in amperes.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-031",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Ohm’s law states that V is proportional to I when?",
    "options": {
      "A": "Temperature is constant",
      "B": "Pressure varies",
      "C": "Mass changes",
      "D": "Volume is constant"
    },
    "correctAnswer": "A",
    "explanation": "Ohm’s law holds for metallic conductors at constant temperature.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-032",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Three 3 Ω resistors in series have total resistance?",
    "options": {
      "A": "1 Ω",
      "B": "3 Ω",
      "C": "6 Ω",
      "D": "9 Ω"
    },
    "correctAnswer": "D",
    "explanation": "Series: R = 3 + 3 + 3 = 9 Ω.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-033",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Two 4 Ω resistors in parallel have equivalent resistance?",
    "options": {
      "A": "8 Ω",
      "B": "2 Ω",
      "C": "4 Ω",
      "D": "1 Ω"
    },
    "correctAnswer": "B",
    "explanation": "1/R = 1/4 + 1/4 = 1/2 → R = 2 Ω.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-034",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "A magnetic field is produced by?",
    "options": {
      "A": "A stationary charge",
      "B": "A moving charge",
      "C": "An insulator",
      "D": "A neutral atom"
    },
    "correctAnswer": "B",
    "explanation": "Electric currents (moving charges) produce magnetic fields.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-035",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "A device that converts mechanical energy to electrical energy is a?",
    "options": {
      "A": "Motor",
      "B": "Generator",
      "C": "Transformer",
      "D": "Battery"
    },
    "correctAnswer": "B",
    "explanation": "A generator uses electromagnetic induction to produce emf.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-036",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "A step-up transformer has?",
    "options": {
      "A": "More turns in the secondary",
      "B": "Fewer turns in the secondary",
      "C": "Equal turns",
      "D": "No secondary"
    },
    "correctAnswer": "A",
    "explanation": "Step-up increases voltage; Ns > Np.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-037",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "The half-life of a radioisotope is the time for?",
    "options": {
      "A": "All nuclei to decay",
      "B": "Half the nuclei to decay",
      "C": "Activity to double",
      "D": "Mass to become zero"
    },
    "correctAnswer": "B",
    "explanation": "Half-life is the time for half of the radioactive nuclei to decay.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-038",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Alpha particles are?",
    "options": {
      "A": "Electrons",
      "B": "Helium nuclei",
      "C": "Protons only",
      "D": "Neutrons only"
    },
    "correctAnswer": "B",
    "explanation": "An alpha particle is a ⁴He nucleus (2p + 2n).",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-039",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "The pressure of a gas is due to?",
    "options": {
      "A": "Attraction between molecules",
      "B": "Collisions of molecules with the walls",
      "C": "Weight of the gas only",
      "D": "Chemical bonds"
    },
    "correctAnswer": "B",
    "explanation": "Pressure arises from molecular impacts on the container walls.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-040",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Archimedes’ principle states that upthrust equals?",
    "options": {
      "A": "Weight of the object",
      "B": "Weight of fluid displaced",
      "C": "Volume of the object",
      "D": "Density of the fluid only"
    },
    "correctAnswer": "B",
    "explanation": "Upthrust = weight of the fluid displaced by the immersed part.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-041",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "The acceleration due to gravity near Earth’s surface is about?",
    "options": {
      "A": "1 m/s²",
      "B": "10 m/s²",
      "C": "100 m/s²",
      "D": "0.1 m/s²"
    },
    "correctAnswer": "B",
    "explanation": "g ≈ 9.8 m/s² ≈ 10 m/s² for calculations.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-042",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Momentum is the product of?",
    "options": {
      "A": "Mass and velocity",
      "B": "Force and time",
      "C": "Mass and acceleration",
      "D": "Force and distance"
    },
    "correctAnswer": "A",
    "explanation": "p = mv.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-043",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "A simple machine has velocity ratio 4 and efficiency 50%. Its mechanical advantage is?",
    "options": {
      "A": "8",
      "B": "2",
      "C": "4",
      "D": "0.5"
    },
    "correctAnswer": "B",
    "explanation": "Efficiency = MA/VR → 0.5 = MA/4 → MA = 2.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-044",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Which colour of light has the shortest wavelength?",
    "options": {
      "A": "Red",
      "B": "Green",
      "C": "Violet",
      "D": "Yellow"
    },
    "correctAnswer": "C",
    "explanation": "Violet has the highest frequency and shortest wavelength in the visible spectrum.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-045",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "The focal length of a concave mirror is 10 cm. Its radius of curvature is?",
    "options": {
      "A": "5 cm",
      "B": "10 cm",
      "C": "20 cm",
      "D": "40 cm"
    },
    "correctAnswer": "C",
    "explanation": "R = 2f = 20 cm.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-046",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Electrical energy in kWh is calculated as?",
    "options": {
      "A": "Power (W) × time (s)",
      "B": "Power (kW) × time (h)",
      "C": "Voltage × current",
      "D": "Force × distance"
    },
    "correctAnswer": "B",
    "explanation": "1 kWh = 1 kW × 1 hour.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-047",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Which of the following is an insulator?",
    "options": {
      "A": "Copper",
      "B": "Aluminium",
      "C": "Rubber",
      "D": "Silver"
    },
    "correctAnswer": "C",
    "explanation": "Rubber does not conduct electricity readily.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-048",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "The period of a simple pendulum depends on?",
    "options": {
      "A": "Mass of bob",
      "B": "Amplitude only",
      "C": "Length of string",
      "D": "Colour of bob"
    },
    "correctAnswer": "C",
    "explanation": "T = 2π√(L/g); period depends on length and g.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-049",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "A body moving with constant speed in a circle has?",
    "options": {
      "A": "Zero acceleration",
      "B": "Centripetal acceleration",
      "C": "Zero force",
      "D": "Constant velocity"
    },
    "correctAnswer": "B",
    "explanation": "Direction changes continuously, so there is centripetal acceleration toward the centre.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-050",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "The unit of frequency is the?",
    "options": {
      "A": "Hertz",
      "B": "Second",
      "C": "Metre",
      "D": "Watt"
    },
    "correctAnswer": "A",
    "explanation": "Frequency is measured in hertz (cycles per second).",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-051",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Which mirror is used as a rear-view mirror in vehicles?",
    "options": {
      "A": "Plane",
      "B": "Concave",
      "C": "Convex",
      "D": "Parabolic only"
    },
    "correctAnswer": "C",
    "explanation": "Convex mirrors give a wider field of view.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-052",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "The quantity of heat required to raise 1 kg of a substance by 1 K is?",
    "options": {
      "A": "Heat capacity",
      "B": "Specific heat capacity",
      "C": "Latent heat",
      "D": "Thermal conductivity"
    },
    "correctAnswer": "B",
    "explanation": "Specific heat capacity is per unit mass.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-053",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Echo is due to?",
    "options": {
      "A": "Refraction of sound",
      "B": "Reflection of sound",
      "C": "Diffraction of sound",
      "D": "Absorption of sound"
    },
    "correctAnswer": "B",
    "explanation": "An echo is a reflected sound wave heard after a delay.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-054",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "The refractive index of a medium is the ratio of?",
    "options": {
      "A": "Speed in medium to speed in vacuum",
      "B": "Speed in vacuum to speed in medium",
      "C": "Wavelength only",
      "D": "Frequency only"
    },
    "correctAnswer": "B",
    "explanation": "n = c/v.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-055",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Which particle has no charge?",
    "options": {
      "A": "Proton",
      "B": "Electron",
      "C": "Neutron",
      "D": "Alpha particle"
    },
    "correctAnswer": "C",
    "explanation": "Neutrons are electrically neutral.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-056",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "A 12 V battery supplies 2 A. The power delivered is?",
    "options": {
      "A": "6 W",
      "B": "24 W",
      "C": "10 W",
      "D": "14 W"
    },
    "correctAnswer": "B",
    "explanation": "P = VI = 12 × 2 = 24 W.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-057",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "The denser the medium, the?",
    "options": {
      "A": "Faster light travels",
      "B": "Slower light travels",
      "C": "Unchanged speed of light",
      "D": "Higher frequency of light"
    },
    "correctAnswer": "B",
    "explanation": "Optical density increases → speed of light decreases.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-058",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Fleming’s left-hand rule is used for?",
    "options": {
      "A": "Generators",
      "B": "Motors",
      "C": "Transformers",
      "D": "Capacitors"
    },
    "correctAnswer": "B",
    "explanation": "Left-hand rule gives force on a current-carrying conductor in a magnetic field (motors).",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-059",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "The energy stored in a stretched spring is?",
    "options": {
      "A": "Kinetic",
      "B": "Gravitational potential",
      "C": "Elastic potential",
      "D": "Chemical"
    },
    "correctAnswer": "C",
    "explanation": "Elastic potential energy is stored in deformed elastic materials.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2023-060",
    "subject": "physics",
    "year": 2023,
    "origin": "original_practice",
    "question": "Which of the following has the highest penetrating power?",
    "options": {
      "A": "Alpha",
      "B": "Beta",
      "C": "Gamma",
      "D": "Proton"
    },
    "correctAnswer": "C",
    "explanation": "Gamma rays are highly penetrating electromagnetic radiation.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  }
];

export default questions;
