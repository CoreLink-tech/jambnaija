import type { JambQuestion } from "../types";

/** Physics 2024 — JAMB past questions (Drive doc bank). */
const questions: JambQuestion[] = [
  {
    "id": "phy-2024-001",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "The stress experienced by a wire of diameter y/π m loaded by a weight y² N is?",
    "options": {
      "A": "4π N/m²",
      "B": "2π N/m²",
      "C": "π N/m²",
      "D": "8π N/m²"
    },
    "correctAnswer": "A",
    "explanation": "Area = π(d/2)² = π(y/2π)² = y²/(4π). Stress = F/A = y² / (y²/4π) = 4π N/m².",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-002",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Find the value of a capacitor with voltage 5 V and charge 30 C.",
    "options": {
      "A": "6 F",
      "B": "150 F",
      "C": "0.17 F",
      "D": "3 F"
    },
    "correctAnswer": "A",
    "explanation": "C = Q/V = 30/5 = 6 F.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-003",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "A thick glass tumbler cracks when boiling water is poured into it because?",
    "options": {
      "A": "The inside expands more rapidly than the outside",
      "B": "Glass is a good conductor of heat",
      "C": "The outside expands more rapidly than the inside",
      "D": "Boiling water is too hot for glass"
    },
    "correctAnswer": "A",
    "explanation": "Glass is a poor conductor; the inner surface heats and expands faster than the cooler outer surface, creating stress that cracks the glass.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-004",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "A solid cube of aluminium is 1.5 cm on each edge. The density of aluminium is 2700 kg/m³. Find the mass of the cube.",
    "options": {
      "A": "9.1 g",
      "B": "4.5 g",
      "C": "13.5 g",
      "D": "27.0 g"
    },
    "correctAnswer": "A",
    "explanation": "V = (1.5 cm)³ = 3.375 cm³ = 3.375 × 10⁻⁶ m³. Mass = ρV = 2700 × 3.375 × 10⁻⁶ = 9.1125 × 10⁻³ kg ≈ 9.1 g.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-005",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "The power of a convex lens of focal length 20 cm is?",
    "options": {
      "A": "5.00 D",
      "B": "0.05 D",
      "C": "20.0 D",
      "D": "2.00 D"
    },
    "correctAnswer": "A",
    "explanation": "P = 1/f (in metres) = 1/0.20 = 5.00 dioptres.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-006",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "At resonance in a series RLC circuit, the relationship between the voltage across the inductor (V_L) and the capacitor (V_C) is?",
    "options": {
      "A": "V_L = V_C",
      "B": "V_L \\> V_C",
      "C": "V_L \\< V_C",
      "D": "V_L + V_C = 0"
    },
    "correctAnswer": "A",
    "explanation": "At resonance, X_L = X_C, so the voltages across the inductor and capacitor are equal in magnitude but opposite in phase.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-007",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "An ideal transformer has?",
    "options": {
      "A": "Maximum primary resistance",
      "B": "No flux leakage",
      "C": "Hysteresis loss",
      "D": "Eddy current loss"
    },
    "correctAnswer": "B",
    "explanation": "An ideal transformer is assumed to have no flux leakage, zero winding resistance, and no hysteresis or eddy current losses.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-008",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "The property by which a material returns to its original shape after the removal of force is called?",
    "options": {
      "A": "Elasticity",
      "B": "Ductility",
      "C": "Malleability",
      "D": "Plasticity"
    },
    "correctAnswer": "A",
    "explanation": "Elasticity is the ability of a material to return to its original shape/size after deformation forces are removed.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-009",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "In electrolysis, when the same quantity of electricity is passed through different electrolytes, the mass of substances deposited is proportional to?",
    "options": {
      "A": "Their chemical equivalents",
      "B": "Their atomic masses",
      "C": "Their valencies",
      "D": "Their densities"
    },
    "correctAnswer": "A",
    "explanation": "Faraday's second law states that the mass deposited is proportional to the chemical equivalent (molar mass/valency) of the substance.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-010",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Using the diagram (not shown), calculate the relative density of liquid X if the density of methanol is 800 kg/m³ and the liquid heights are in the ratio 7.1:14.2.",
    "options": {
      "A": "0.5",
      "B": "1.5",
      "C": "2.5",
      "D": "0.8"
    },
    "correctAnswer": "A",
    "explanation": "At equilibrium, ρ_methanol × h_methanol = ρ_X × h_X → 0.8 × 7.1 = ρ_X × 14.2 → ρ_X = 0.4 g/cm³. Relative density = 0.4/0.8 = 0.5.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-011",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "The velocity ratio of an inclined plane at 60° to the horizontal is?",
    "options": {
      "A": "1.055",
      "B": "1.155",
      "C": "1.255",
      "D": "2.00"
    },
    "correctAnswer": "B",
    "explanation": "VR = 1/sin θ = 1/sin 60° = 1/0.866 ≈ 1.155.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-012",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "The energy of light of frequency 2.0 × 10¹⁵ Hz is? \\[h = 6.63 × 10⁻³⁴ J s\\]",
    "options": {
      "A": "1.33 × 10⁻¹⁸ J",
      "B": "3.32 × 10⁻¹⁹ J",
      "C": "6.63 × 10⁻¹⁹ J",
      "D": "1.33 × 10⁻¹⁹ J"
    },
    "correctAnswer": "A",
    "explanation": "E = hf = 6.63 × 10⁻³⁴ × 2.0 × 10¹⁵ = 1.326 × 10⁻¹⁸ J ≈ 1.33 × 10⁻¹⁸ J.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-013",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "5 × 10⁻³ kg of liquid at its boiling point is evaporated in 20 s by heat generated by a resistor of 2 Ω when a current of 10 A is used. The specific latent heat of vaporisation is?",
    "options": {
      "A": "8.0 × 10⁵ J/kg",
      "B": "4.0 × 10⁵ J/kg",
      "C": "2.0 × 10⁵ J/kg",
      "D": "1.0 × 10⁵ J/kg"
    },
    "correctAnswer": "A",
    "explanation": "Q = I²Rt = 10² × 2 × 20 = 4000 J. L = Q/m = 4000/(5 × 10⁻³) = 8.0 × 10⁵ J/kg.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-014",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "If the S.V.P of water vapour was 13.5 mmHg at 33 °C and 7.3 mmHg at 7 °C, find the percentage relative humidity of the air on a day when the average air temperature was 33 °C and dew point was 7 °C.",
    "options": {
      "A": "54%",
      "B": "70%",
      "C": "80%",
      "D": "60%"
    },
    "correctAnswer": "A",
    "explanation": "RH = (SVP at dew point / SVP at air temperature) × 100 = (7.3/13.5) × 100 ≈ 54%.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-015",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "A wheelbarrow inclined at 60° to the horizontal is pushed with a force of 150 N. What is the horizontal component of the applied force?",
    "options": {
      "A": "75 N",
      "B": "130 N",
      "C": "150 N",
      "D": "100 N"
    },
    "correctAnswer": "A",
    "explanation": "Horizontal component = F cos θ = 150 × cos 60° = 150 × 0.5 = 75 N.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-016",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "In a solar panel, the solar beam is concentrated by using?",
    "options": {
      "A": "Concave mirror",
      "B": "Convex mirror",
      "C": "Plane mirror",
      "D": "Convex lens"
    },
    "correctAnswer": "A",
    "explanation": "A concave mirror focuses parallel solar rays to a focal point, concentrating the energy.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-017",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "A rectifier is a device that changes?",
    "options": {
      "A": "A.C. to D.C.",
      "B": "D.C. to A.C.",
      "C": "High voltage to low voltage",
      "D": "Low voltage to high voltage"
    },
    "correctAnswer": "A",
    "explanation": "A rectifier converts alternating current (A.C.) to direct current (D.C.) using diodes.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-018",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "The dimension of Young's modulus, E, is?",
    "options": {
      "A": "ML⁻¹T⁻²",
      "B": "MLT⁻²",
      "C": "ML²T⁻²",
      "D": "ML⁻²T⁻²"
    },
    "correctAnswer": "A",
    "explanation": "Young's modulus = stress/strain = (F/A)/(ΔL/L). Stress has dimensions ML⁻¹T⁻²; strain is dimensionless, so E has dimensions ML⁻¹T⁻².",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-019",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "The moon's acceleration due to gravity is 1/6 of the earth's value. The weight of a bowling ball on the moon would be?",
    "options": {
      "A": "1/6 of its weight on the earth",
      "B": "6 times its weight on the earth",
      "C": "Equal to its weight on the earth",
      "D": "1/36 of its weight on the earth"
    },
    "correctAnswer": "A",
    "explanation": "Weight = mg. If g_moon = g_earth/6, then weight on the moon = (1/6) × weight on earth.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-020",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "If a sheet of an insulating material is inserted between the plates of an air capacitor, the capacitance will?",
    "options": {
      "A": "Increase",
      "B": "Decrease",
      "C": "Remain the same",
      "D": "Become zero"
    },
    "correctAnswer": "A",
    "explanation": "Inserting a dielectric increases capacitance by a factor equal to the dielectric constant (C = ε_r C₀).",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-021",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "288 kJ is conducted across two opposite faces of a 3 m cube of temperature gradient 90 °C/m in 7200 s. Calculate the thermal conductivity.",
    "options": {
      "A": "4.9 × 10⁻² W/m·K",
      "B": "1.5 × 10⁻² W/m·K",
      "C": "2.0 × 10⁻² W/m·K",
      "D": "6.0 × 10⁻² W/m·K"
    },
    "correctAnswer": "A",
    "explanation": "Q = kA(ΔT/Δx)t → k = Q/(A × gradient × t). A = (3 m)² = 9 m². k = 288000/(9 × 90 × 7200) ≈ 0.049 W/m·K = 4.9 × 10⁻² W/m·K.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-022",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "A sonometer's fundamental note is 50 Hz. What is the new frequency when the tension is four times the original?",
    "options": {
      "A": "100 Hz",
      "B": "200 Hz",
      "C": "25 Hz",
      "D": "50 Hz"
    },
    "correctAnswer": "A",
    "explanation": "f ∝ √T. If T → 4T, f → √4 × f = 2f = 100 Hz.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-023",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "The force on a segment of wire that is 0.5 m long and has a current of 2 A, when placed in a magnetic field of 2 T at an angle of 30° to the field is?",
    "options": {
      "A": "1.0 N",
      "B": "2.0 N",
      "C": "0.5 N",
      "D": "4.0 N"
    },
    "correctAnswer": "A",
    "explanation": "F = BIL sin θ = 2 × 2 × 0.5 × sin 30° = 2 × 0.5 = 1.0 N.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-024",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "The mode of heat transfer that is electromagnetic in nature is?",
    "options": {
      "A": "Radiation",
      "B": "Conduction",
      "C": "Convection",
      "D": "Evaporation"
    },
    "correctAnswer": "A",
    "explanation": "Radiation transfers heat via electromagnetic waves and does not require a medium.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-025",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "The condition for resonance to occur in an RLC series circuit is?",
    "options": {
      "A": "When the angular frequency of the applied voltage equals the natural angular frequency of the circuit",
      "B": "When resistance equals reactance",
      "C": "When impedance is maximum",
      "D": "When current is minimum"
    },
    "correctAnswer": "A",
    "explanation": "Resonance occurs when ω = 1/√(LC), i.e., the applied frequency matches the natural frequency.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-026",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "A solid weighs 10.5 N in air and 5.5 N when immersed in a liquid of density 900 kg/m³. Calculate the volume of the solid. (g = 10 m/s²)",
    "options": {
      "A": "5.56 × 10⁻⁴ m³",
      "B": "1.11 × 10⁻³ m³",
      "C": "2.22 × 10⁻⁴ m³",
      "D": "8.33 × 10⁻⁴ m³"
    },
    "correctAnswer": "A",
    "explanation": "Upthrust = 10.5 − 5.5 = 5.0 N. Upthrust = ρ_liquid × V × g → V = 5.0/(900 × 10) = 5.56 × 10⁻⁴ m³.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-027",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "A uniform metre rule AB balanced on a knife edge 60 cm from end B when a load of 33 g is kept 10 cm away from end A. What is the weight of the metre rule?",
    "options": {
      "A": "66 g",
      "B": "33 g",
      "C": "99 g",
      "D": "132 g"
    },
    "correctAnswer": "A",
    "explanation": "Moments about the pivot: load × distance = rule weight × distance to its centre of gravity. Solving gives the weight of the rule as 66 g.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-028",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "A particle in simple harmonic motion while passing through the mean position will have?",
    "options": {
      "A": "Maximum kinetic energy and minimum potential energy",
      "B": "Maximum potential energy and minimum kinetic energy",
      "C": "Equal kinetic and potential energy",
      "D": "Zero kinetic and potential energy"
    },
    "correctAnswer": "A",
    "explanation": "At the mean position, displacement is zero, so potential energy is minimum and velocity (kinetic energy) is maximum.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-029",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "A pin floats on water due to the phenomenon of?",
    "options": {
      "A": "Surface tension",
      "B": "Viscosity",
      "C": "Capillarity",
      "D": "Upthrust"
    },
    "correctAnswer": "A",
    "explanation": "Surface tension acts like a stretched elastic skin that can support small objects like a pin.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-030",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Which of the following statements is/are true for an electric motor? \\(i\\) It converts electrical energy into mechanical energy \\(ii\\) It generates electricity \\(iii\\) It is based on the principle of electromagnetic induction \\(iv\\) It follows Fleming's left-hand rule",
    "options": {
      "A": "(i) and (iv) only",
      "B": "(i) and (iii) only",
      "C": "(ii) and (iv) only",
      "D": "(i) only"
    },
    "correctAnswer": "A",
    "explanation": "A motor converts electrical energy to mechanical energy (i) and operates on the principle of Fleming's left-hand rule (iv). It does not generate electricity (ii is false for a motor); (iii) describes a generator.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-031",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Which of the following is the function of a p-n junction diode in a semiconductor device?",
    "options": {
      "A": "It can be used to convert alternating current (AC) to direct current (DC)",
      "B": "It amplifies signals",
      "C": "It stores charge",
      "D": "It generates light"
    },
    "correctAnswer": "A",
    "explanation": "A p-n junction diode allows current in one direction, acting as a rectifier to convert AC to DC.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-032",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "Which of the following is true of a particle in stable equilibrium?",
    "options": {
      "A": "Potential energy is minimum",
      "B": "Potential energy is maximum",
      "C": "Kinetic energy is maximum",
      "D": "Kinetic energy is minimum"
    },
    "correctAnswer": "A",
    "explanation": "In stable equilibrium, a small displacement raises potential energy; the equilibrium position corresponds to a potential energy minimum.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-033",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "The power factor of a series RLC circuit at resonance is?",
    "options": {
      "A": "1",
      "B": "0",
      "C": "0.5",
      "D": "Infinity"
    },
    "correctAnswer": "A",
    "explanation": "At resonance, impedance is purely resistive (Z = R), so power factor cos φ = R/Z = 1.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-034",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "One of these is not an example of a mechanical wave?",
    "options": {
      "A": "Light waves",
      "B": "Sound waves",
      "C": "Water waves",
      "D": "Seismic waves"
    },
    "correctAnswer": "A",
    "explanation": "Light is an electromagnetic wave and does not require a material medium; sound, water, and seismic waves are mechanical.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2024-035",
    "subject": "physics",
    "year": 2024,
    "origin": "official_past_question",
    "question": "If two plane mirrors are positioned side by side, the number of images formed is 8. At what angle are they positioned?",
    "options": {
      "A": "40°",
      "B": "45°",
      "C": "60°",
      "D": "90°"
    },
    "correctAnswer": "A",
    "explanation": "Number of images = (360/θ) − 1. 8 = 360/θ − 1 → 360/θ = 9 → θ = 40°. \\-\\-- Reply \"Continue\" to receive the 2025 sets for Chemistry and Physics next. Here are the 2025 JAMB Chemistry and Physics questions, compiled from the past-question sources found. Each question includes options, the correct answer, and a clear explanation. \\-\\--",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  }
];

export default questions;
