import type { JambQuestion } from "../types";

/** Physics 2022 — JAMB past questions (Drive doc bank). */
const questions: JambQuestion[] = [
  {
    "id": "phy-2022-001",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "Which of the following is a derived unit?",
    "options": {
      "A": "Kilogram",
      "B": "Metre",
      "C": "Newton",
      "D": "Second"
    },
    "correctAnswer": "C",
    "explanation": "Newton is derived (kg·m/s²); kilogram, metre, and second are base SI units.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-002",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "If a bar magnet is divided into two pieces, which of the following statements is correct?",
    "options": {
      "A": "two new magnets are created",
      "B": "the magnetic field of each separate piece becomes stronger",
      "C": "the electric field is created",
      "D": "the bar magnet is demagnetized"
    },
    "correctAnswer": "A",
    "explanation": "Cutting a magnet produces two smaller magnets, each with its own north and south poles.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-003",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "Consider the wave equation y = 5 mm sin \\[1 cm⁻¹ x − 60 s⁻¹ t\\]. The wave number is?",
    "options": {
      "A": "0.1 cm⁻¹",
      "B": "10 cm⁻¹",
      "C": "1.0 cm⁻¹",
      "D": "2 cm⁻¹"
    },
    "correctAnswer": "C",
    "explanation": "The coefficient of x is the wave number k = 1.0 cm⁻¹.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-004",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "An object 40 cm high is 30 cm from a pinhole camera. If the height of the image formed is 20 cm, what is the distance of the image from the pinhole?",
    "options": {
      "A": "15 cm",
      "B": "70 cm",
      "C": "40 cm",
      "D": "50 cm"
    },
    "correctAnswer": "A",
    "explanation": "Magnification = image height / object height = 20/40 = 0.5. Image distance = 0.5 × 30 = 15 cm.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-005",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "A bar magnet is placed near and lying along the axis of a solenoid connected to a galvanometer. The pointer shows no deflection when?",
    "options": {
      "A": "the magnet is moved towards the stationary solenoid",
      "B": "there is no relative motion",
      "C": "the magnet is moved away from the stationary solenoid",
      "D": "the solenoid is moved away from the stationary magnet"
    },
    "correctAnswer": "B",
    "explanation": "No relative motion → no change in magnetic flux → no induced current.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-006",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "Why do tyres have treads?",
    "options": {
      "A": "increase weight of tyres",
      "B": "increase friction",
      "C": "increase its longevity",
      "D": "look good"
    },
    "correctAnswer": "B",
    "explanation": "Treads increase friction/grip between the tyre and the road.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-007",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "A car starts from rest and covers a distance of 40 m in 10 s. Calculate the magnitude of its acceleration.",
    "options": {
      "A": "3.20 m/s²",
      "B": "0.25 m/s²",
      "C": "0.80 m/s²",
      "D": "4.00 m/s²"
    },
    "correctAnswer": "C",
    "explanation": "s = ut + ½at² → 40 = 0 + ½a(100) → a = 0.80 m/s².",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-008",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "The relationship between the coefficient of linear expansion α and volumetric expansion γ is?",
    "options": {
      "A": "γ = α⁻³",
      "B": "γ = α",
      "C": "γ = 3α",
      "D": "γ = α³"
    },
    "correctAnswer": "C",
    "explanation": "Volumetric expansivity is approximately three times linear expansivity.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-009",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "Which of the following is not a consequence of hydrogen bubbles covering the copper plate of a primary cell?",
    "options": {
      "A": "formation of hydrogen bubbles on the electrode",
      "B": "increase in the resistance of the cell",
      "C": "local action",
      "D": "polarization"
    },
    "correctAnswer": "C",
    "explanation": "Local action is caused by impurities in the zinc rod, not by hydrogen bubbles.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-010",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "A cell whose internal resistance is 0.55 Ω delivers a current of 4 A to an external resistor. The lost voltage of the cell is?",
    "options": {
      "A": "4.00 V",
      "B": "2.20 V",
      "C": "0.15 V",
      "D": "8.00 V"
    },
    "correctAnswer": "B",
    "explanation": "Lost voltage = Ir = 4 × 0.55 = 2.20 V.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-011",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "Which of the following liquids is a poor conductor of electricity?",
    "options": {
      "A": "Distilled water",
      "B": "Tap water",
      "C": "Sea water",
      "D": "Drinking water"
    },
    "correctAnswer": "A",
    "explanation": "Distilled water contains no dissolved electrolytes, so it is a poor conductor.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-012",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "An isotope has an initial activity of 120 Bq. 6 days later its activity is 15 Bq. The half-life is?",
    "options": {
      "A": "3 days",
      "B": "2 days",
      "C": "1 day",
      "D": "4 days"
    },
    "correctAnswer": "B",
    "explanation": "120 → 60 → 30 → 15 (3 half-lives in 6 days) → half-life = 2 days.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-013",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "In order to remove the error of parallax when taking measurements with a metre rule, the eye should be focused?",
    "options": {
      "A": "slantingly towards the right on the markings",
      "B": "slantingly towards the left on the markings",
      "C": "vertically downwards on the markings",
      "D": "vertically upwards on the markings"
    },
    "correctAnswer": "C",
    "explanation": "The eye should be directly above the marking, looking vertically downwards.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-014",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "An athlete standing waist-deep in a swimming pool appears to have short legs because of light?",
    "options": {
      "A": "diffraction",
      "B": "refraction",
      "C": "reflection",
      "D": "interference"
    },
    "correctAnswer": "B",
    "explanation": "Refraction at the water--air boundary makes submerged objects appear shallower.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-015",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "A tuning fork of frequency 312 Hz emits a wave of wavelength 1.10 m. Calculate the velocity of sound.",
    "options": {
      "A": "312.0 m/s",
      "B": "110.0 m/s",
      "C": "343.2 m/s",
      "D": "686.4 m/s"
    },
    "correctAnswer": "C",
    "explanation": "v = fλ = 312 × 1.10 = 343.2 m/s.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-016",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "When the plate surface area of a capacitor increases,?",
    "options": {
      "A": "the voltage can withstand increase",
      "B": "the capacitance decreases",
      "C": "the capacitance is unaffected",
      "D": "the capacitance increases"
    },
    "correctAnswer": "D",
    "explanation": "Capacitance is directly proportional to plate area.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-017",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "An electromagnetic relay is a device used for?",
    "options": {
      "A": "reading the magnitude of magnetic flux",
      "B": "controlling another circuit carrying larger current",
      "C": "turning in sports",
      "D": "storing magnetic field"
    },
    "correctAnswer": "B",
    "explanation": "A relay uses an electromagnet to switch a larger-current circuit on or off.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-018",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "According to the kinetic molecular model in gases,?",
    "options": {
      "A": "the particles are closely packed together",
      "B": "the particles vibrate about fixed positions",
      "C": "the molecules are very far apart and occupy all the spaces made available to them",
      "D": "the particles occur in clusters with molecules slightly further apart"
    },
    "correctAnswer": "C",
    "explanation": "Gas molecules are widely separated and in constant random motion.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-019",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "A current of 0.5 A flows through a resistor when connected to a 40 V battery. How much energy is dissipated in 2 minutes?",
    "options": {
      "A": "2400 J",
      "B": "9600 J",
      "C": "1500 J",
      "D": "1200 J"
    },
    "correctAnswer": "A",
    "explanation": "E = VIt = 40 × 0.5 × 120 = 2400 J.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-020",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "For a pear-shaped conductor, the concentration of charge on the outside is highest at?",
    "options": {
      "A": "X",
      "B": "Z",
      "C": "Y",
      "D": "K"
    },
    "correctAnswer": "A",
    "explanation": "Charge concentrates at regions of greatest curvature (sharpest points).",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-021",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "The vapour pressure?",
    "options": {
      "A": "increases non-linearly with measuring temperature",
      "B": "increases linearly with increasing temperature",
      "C": "decreases linearly with increasing temperature",
      "D": "decreases non-linearly with measuring temperature"
    },
    "correctAnswer": "A",
    "explanation": "Vapour pressure increases non-linearly with temperature (Clausius--Clapeyron relation).",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-022",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "The potential energy in an elastic string of force constant k, which has an extension X is?",
    "options": {
      "A": "kX",
      "B": "kX²",
      "C": "½kX²",
      "D": "½k"
    },
    "correctAnswer": "C",
    "explanation": "Elastic potential energy = ½kx².",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-023",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "A reservoir is filled with liquid of density 2000 kg/m³. Calculate the depth at which the pressure in the liquid will be equal to 9100 N/m² (g = 10 m/s²).",
    "options": {
      "A": "0.262 m",
      "B": "0.664 m",
      "C": "0.819 m",
      "D": "0.455 m"
    },
    "correctAnswer": "D",
    "explanation": "P = ρgh → h = 9100/(2000 × 10) = 0.455 m.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-024",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "Water is not a good thermometric liquid because it?",
    "options": {
      "A": "expands unevenly between 0 °C and 4 °C",
      "B": "maintains fixed density",
      "C": "has low freezing point",
      "D": "wets glass"
    },
    "correctAnswer": "D",
    "explanation": "Water wets glass, has anomalous expansion, and a relatively high freezing point.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-025",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "Which of these is a second-class lever?",
    "options": {
      "A": "sugar tongs",
      "B": "claw hammer",
      "C": "plier",
      "D": "wheelbarrow"
    },
    "correctAnswer": "D",
    "explanation": "In a second-class lever, the load is between the effort and the fulcrum (e.g., wheelbarrow).",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-026",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "In the formation of sea breeze, the wind blows from?",
    "options": {
      "A": "sky to land",
      "B": "sea to sky",
      "C": "land to sea",
      "D": "sea to land"
    },
    "correctAnswer": "D",
    "explanation": "During the day, land heats faster than sea; warm air over land rises, and cooler air moves from sea to land.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-027",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "Which component of a fibre-optic connector has a provision of entry for the fibre along with fixation to the connector housing?",
    "options": {
      "A": "couplers",
      "B": "cable",
      "C": "ferrule",
      "D": "connector housing"
    },
    "correctAnswer": "A",
    "explanation": "Couplers (splitters/combiners) provide entry and fixation for fibres.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-028",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "The most suitable instrument to view the sun is?",
    "options": {
      "A": "helioscope",
      "B": "telescope",
      "C": "stroboscope",
      "D": "sun meter"
    },
    "correctAnswer": "A",
    "explanation": "A helioscope is designed for safe solar observation.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-029",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "The eclipse of the moon occurs when?",
    "options": {
      "A": "the moon reflects the rays from the sun to the earth",
      "B": "the moon comes exactly between the earth and the sun",
      "C": "the earth comes exactly between the moon and the sun",
      "D": "the sun comes exactly between the earth and the moon"
    },
    "correctAnswer": "C",
    "explanation": "A lunar eclipse occurs when Earth is between the Sun and the Moon, casting its shadow on the Moon.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-030",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "The gravitational pull on the moon is 1/6 that of the earth. If a body weighs 6.0 N on the moon, what will be its weight on the earth?",
    "options": {
      "A": "6.0 N",
      "B": "5.0 N",
      "C": "12.0 N",
      "D": "36.0 N"
    },
    "correctAnswer": "D",
    "explanation": "Weight on Earth = 6 × weight on Moon = 6 × 6.0 = 36.0 N.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-031",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "The amount of energy required to change a kilogram of ice block into water without a change in temperature is?",
    "options": {
      "A": "specific latent heat of fusion of ice",
      "B": "specific heat capacity of ice",
      "C": "heat capacity of ice",
      "D": "specific heat of vaporization of ice"
    },
    "correctAnswer": "A",
    "explanation": "The heat required for solid → liquid at constant temperature is the specific latent heat of fusion.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-032",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "Which expression gives the magnetic flux?",
    "options": {
      "A": "qvB sin θ",
      "B": "(blank)",
      "C": "BA cos θ",
      "D": "(blank)"
    },
    "correctAnswer": "C",
    "explanation": "Magnetic flux Φ = BA cos θ, where θ is the angle between B and the normal to area A.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-033",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "The graph of pressure (P) against the reciprocal of volume (1/V) in Boyle's law is a?",
    "options": {
      "A": "hyperbola",
      "B": "parabola",
      "C": "curve",
      "D": "straight line"
    },
    "correctAnswer": "D",
    "explanation": "P ∝ 1/V at constant temperature, so the P vs 1/V graph is a straight line through the origin.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-034",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "What quantity of heat is required to convert 20 g of ice at 0 °C to water at the same temperature? (Specific latent heat of ice = 336 J/g)",
    "options": {
      "A": "7.06 × 10³ J",
      "B": "5.38 × 10³ J",
      "C": "6.72 × 10³ J",
      "D": "1.35 × 10⁴ J"
    },
    "correctAnswer": "C",
    "explanation": "Q = mL = 20 × 336 = 6720 J = 6.72 × 10³ J.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-035",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "A train of mass 1600 kg attains a speed of 25 m/s in 20 seconds. The power developed in the engine is?",
    "options": {
      "A": "2.5 kW",
      "B": "80 kW",
      "C": "25 kW",
      "D": "50 kW"
    },
    "correctAnswer": "D",
    "explanation": "a = 25/20 = 1.25 m/s²; F = 1600 × 1.25 = 2000 N; P = Fv = 2000 × 25 = 50,000 W = 50 kW.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-036",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "The main factor which affects the speed of sound waves is the?",
    "options": {
      "A": "properties of the medium",
      "B": "amplitude of the sound wave",
      "C": "intensity of the sound wave",
      "D": "loudness of the sound wave"
    },
    "correctAnswer": "A",
    "explanation": "Speed depends on the nature/density/temperature of the medium, not on amplitude, intensity, or loudness.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-037",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "A semiconductor is formed by?",
    "options": {
      "A": "co-ordinate bonds",
      "B": "electrovalent bonds",
      "C": "a substance free of bonds",
      "D": "covalent bonds"
    },
    "correctAnswer": "D",
    "explanation": "Semiconductors (Si, Ge) are held together by covalent bonds.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-038",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "Which of the following is a scalar quantity?",
    "options": {
      "A": "weight",
      "B": "momentum",
      "C": "potential energy",
      "D": "displacement"
    },
    "correctAnswer": "C",
    "explanation": "Potential energy has magnitude only; weight, momentum, and displacement are vectors.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-039",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "The mercury column in the barometer at normal atmospheric pressure has a height of?",
    "options": {
      "A": "0.76 cm at sea level",
      "B": "760 cm at sea level",
      "C": "7.6 cm at sea level",
      "D": "76 cm at sea level"
    },
    "correctAnswer": "D",
    "explanation": "Standard atmospheric pressure supports a mercury column of about 76 cm (760 mm).",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-040",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "If an object just begins to slide on a surface inclined at 30° to the horizontal, the coefficient of friction is?",
    "options": {
      "A": "√3",
      "B": "√3/2",
      "C": "1/√2",
      "D": "1/√3"
    },
    "correctAnswer": "D",
    "explanation": "At the point of sliding, μ = tan θ = tan 30° = 1/√3.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-041",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "A 1.5 kg stone was thrown vertically upward with an initial velocity of 42 m/s. What is the potential energy of the stone at the highest point reached? (g = 10 m/s²)",
    "options": {
      "A": "630 J",
      "B": "1323 J",
      "C": "2646 J",
      "D": "441 J"
    },
    "correctAnswer": "B",
    "explanation": "At the highest point, all KE converts to PE. PE = ½mv² = ½ × 1.5 × 42² = 1323 J. (Equivalently, h = v²/2g = 88.2 m; PE = mgh = 1.5 × 10 × 88.2 = 1323 J.)",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-042",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "One of the following is a scalar quantity.",
    "options": {
      "A": "weight",
      "B": "momentum",
      "C": "potential energy",
      "D": "displacement"
    },
    "correctAnswer": "C",
    "explanation": "Same as Q38; potential energy is a scalar.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2022-043",
    "subject": "physics",
    "year": 2022,
    "origin": "official_past_question",
    "question": "A bar magnet is divided into two pieces. Which of the following statements is correct?",
    "options": {
      "A": "two new magnets are created",
      "B": "the magnetic field of each separate piece becomes stronger",
      "C": "the electric field is created",
      "D": "the bar magnet is demagnetized"
    },
    "correctAnswer": "A",
    "explanation": "Same as Q2; cutting a magnet produces two smaller magnets. \\-\\-- 以上为 2022年JAMB化学40题 + 物理45题，全部可复制，含选项、答案和解析。回复\"Continue\" 将进入 2023年 的化学与物理题集。 Here are the 2023 JAMB Chemistry and Physics questions, with options, answers, and explanations. I have compiled a robust set for each subject based on the available 2023 past-question compilations. Note on question count: The 2023 JAMB UTME drew from a large question bank, and public compilations vary in length. The sets below represent the verifiable 2023 questions available from sources like Myschool, EduRev, and SuperGB. For Chemistry, I have provided 40 questions; for Physics, 15 questions with detailed explanations. You can use these to master the 2023 patterns and recurring topics. \\-\\--",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  }
];

export default questions;
