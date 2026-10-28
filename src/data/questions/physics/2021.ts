import type { JambQuestion } from "../types";

/** Physics 2021 — past bank + generated fillers to 60. */
const questions: JambQuestion[] = [
  {
    "id": "phy-2021-001",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "The slope of the straight line displacement-time graph indicates?",
    "options": {
      "A": "Distance traveled",
      "B": "Uniform velocity",
      "C": "Uniform acceleration",
      "D": "Uniform speed"
    },
    "correctAnswer": "B",
    "explanation": "The gradient of a displacement--time graph is velocity; a straight line means constant (uniform) velocity.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-002",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "A man will exert the greatest pressure when he?",
    "options": {
      "A": "Lies flat on his back",
      "B": "Lies on his belly",
      "C": "Stands on both feet",
      "D": "Stands on the toes of one foot"
    },
    "correctAnswer": "D",
    "explanation": "Pressure = force/area. Standing on the toes of one foot minimises the contact area, maximising pressure.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-003",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Which of the following physical quantities units are derived? I. Area II. Thrust III. Pressure IV. Mass",
    "options": {
      "A": "I, II, III and IV",
      "B": "I, II, and III only",
      "C": "I, II, and IV only",
      "D": "I and IV only"
    },
    "correctAnswer": "B",
    "explanation": "Area, thrust, and pressure are derived quantities; mass is a fundamental quantity.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-004",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "A ball of mass 0.5kg moving at 10ms⁻¹ collides with another ball of equal mass at rest. If the two balls move off together after the impact, calculate their common velocity.",
    "options": {
      "A": "0.2 ms⁻¹",
      "B": "0.5 ms⁻¹",
      "C": "5.0 ms⁻¹",
      "D": "5.5 ms⁻¹"
    },
    "correctAnswer": "C",
    "explanation": "Momentum conservation: (0.5 × 10) = (0.5 + 0.5)v → v = 5 m/s.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-005",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "The motion of a body is simple harmonic if the?",
    "options": {
      "A": "Acceleration is always directed towards a fixed point",
      "B": "Path of motion is a straight line",
      "C": "Acceleration is proportional to the square of the distance from a fixed point",
      "D": "Acceleration is constant and directed towards a fixed point"
    },
    "correctAnswer": "A",
    "explanation": "In SHM, acceleration is directed towards the equilibrium position and is proportional to displacement.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-006",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Which of the following is not correct about the molecules of a substance in a gaseous state? They?",
    "options": {
      "A": "Are in a constant state of motion",
      "B": "Have different speeds",
      "C": "Have a temperature which is measured by the average kinetic energy",
      "D": "The collision between the gases is perfectly inelastic"
    },
    "correctAnswer": "D",
    "explanation": "Collisions between gas molecules are perfectly elastic (kinetic energy is conserved), not inelastic.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-007",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "A given mass of gas has a pressure of 80 Nm⁻² at 47 °C. If the temperature is reduced to 27 °C with volume remaining constant, the new pressure is?",
    "options": {
      "A": "46.0 Nm⁻²",
      "B": "75.0 Nm⁻²",
      "C": "80.0 Nm⁻²",
      "D": "85.3 Nm⁻²"
    },
    "correctAnswer": "B",
    "explanation": "P₁/T₁ = P₂/T₂ → 80/(320) = P₂/(300) → P₂ = 75 Nm⁻².",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-008",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "0.5kg of water at 10ºC is completely converted to ice at 0ºC by extracting 88,000 J of heat from it. If the specific heat capacity of water is 4200 Jkg⁻¹Cº, calculate the specific latent heat of fusion of ice.",
    "options": {
      "A": "9.0 kJkg⁻¹",
      "B": "84.0 kJkg⁻¹",
      "C": "134.0 kJkg⁻¹",
      "D": "168.0 kJkg⁻¹"
    },
    "correctAnswer": "C",
    "explanation": "H = mcΔθ + mL → 88,000 = 0.5(4200)(10) + 0.5L → L = 134,000 J/kg = 134 kJ/kg.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-009",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Which of the following instruments may be used to measure relative humidity?",
    "options": {
      "A": "Hydrometer",
      "B": "Manometer",
      "C": "Hygrometer",
      "D": "Hypsometer"
    },
    "correctAnswer": "C",
    "explanation": "A hygrometer measures relative humidity (water vapour in the air).",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-010",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "A source of sound produces waves in air of wavelength 1.65m. If the speed of sound in air is 330ms⁻¹, the period of vibration in air is?",
    "options": {
      "A": "200",
      "B": "0.005",
      "C": "0.5",
      "D": "0.02"
    },
    "correctAnswer": "B",
    "explanation": "v = λ/T → T = λ/v = 1.65/330 = 0.005 s.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-011",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "A boy standing some distance from the foot of a tall cliff claps his hands and hears an echo 0.5s later. If the speed of sound is 340ms⁻¹, how far is he from the cliff?",
    "options": {
      "A": "680m",
      "B": "170m",
      "C": "34m",
      "D": "85m"
    },
    "correctAnswer": "D",
    "explanation": "Total distance = v × t = 340 × 0.5 = 170 m. Distance to cliff = 170/2 = 85 m.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-012",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Which of the following is not a vector quantity?",
    "options": {
      "A": "Momentum",
      "B": "Force",
      "C": "Temperature",
      "D": "Displacement"
    },
    "correctAnswer": "C",
    "explanation": "Temperature is a scalar (magnitude only); momentum, force, and displacement are vectors.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-013",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Calculate the heat energy required to vaporize 50g of water initially at 80ºC if the specific heat capacity of water is 4.23 Jg⁻¹K⁻¹ (specific latent heat of vaporization of water is 2260 Jg⁻¹).",
    "options": {
      "A": "530,000J",
      "B": "23,200J",
      "C": "17,200J",
      "D": "130,000J"
    },
    "correctAnswer": "D",
    "explanation": "H = mcΔθ + mL = 50\\[(4.23 × 80) + 2260\\] ≈ 130,000 J.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-014",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "In a series R-L-C circuit at resonance, the voltages across the resistor and the inductor are 30V and 40V respectively. What is the voltage across the capacitor?",
    "options": {
      "A": "30V",
      "B": "40V",
      "C": "50V",
      "D": "70V"
    },
    "correctAnswer": "B",
    "explanation": "At resonance, X_L = X_C, so V_L = V_C = 40 V.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-015",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "If the frequency of an emitted x-ray is 1.6 × 10¹⁶ Hz, the accelerating potential is? \\[e = 1.6 × 10⁻¹⁹ J, h = 6.63 × 10⁻³⁴ Js\\]",
    "options": {
      "A": "6630.0V",
      "B": "663.0V",
      "C": "66.3V",
      "D": "6.6V"
    },
    "correctAnswer": "C",
    "explanation": "eV = hf → V = hf/e = (6.63 × 10⁻³⁴ × 1.6 × 10¹⁶)/(1.6 × 10⁻¹⁹) ≈ 66.3 V.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-016",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "If the fraction of the atoms of radioactive material left after 120 years is 1/64, what is the half-life of the material?",
    "options": {
      "A": "24 years",
      "B": "20 years",
      "C": "10 years",
      "D": "2 years"
    },
    "correctAnswer": "B",
    "explanation": "1/64 = (1/2)⁶, so 6 half-lives = 120 years → half-life = 20 years.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-017",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "A certain radioactive source emits radiation that was found to be deflected by both magnetic and electric fields. The radiation is?",
    "options": {
      "A": "Beta rays",
      "B": "Gamma rays",
      "C": "X-rays",
      "D": "Ultra-violet rays"
    },
    "correctAnswer": "A",
    "explanation": "Beta particles are charged (electrons) and are deflected by both fields; gamma and X-rays are uncharged.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-018",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Two bodies have masses in the ratio 3:1. They experience forces which impart to them accelerations in the ratio 2:9 respectively. Find the ratio of forces the masses experienced.",
    "options": {
      "A": "1:4",
      "B": "2:1",
      "C": "2:3",
      "D": "2:5"
    },
    "correctAnswer": "C",
    "explanation": "F = ma. Ratio F₁:F₂ = (3×2):(1×9) = 6:9 = 2:3.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-019",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Particles of mass 10⁻² kg is fixed to the tip of a fan blade which rotates with angular velocity of 100 rad s⁻¹. If the radius of the blade is 0.2m, the centripetal force is?",
    "options": {
      "A": "2N",
      "B": "20N",
      "C": "200N",
      "D": "400N"
    },
    "correctAnswer": "B",
    "explanation": "F = mω²r = (10⁻²)(100²)(0.2) = 20 N.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-020",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "A lead bullet of mass 0.05kg is fired with a velocity of 200ms⁻¹ into a block of mass 0.95kg. Given that the lead block can move freely, the final kinetic energy after impact is?",
    "options": {
      "A": "50J",
      "B": "100J",
      "C": "150J",
      "D": "200J"
    },
    "correctAnswer": "A",
    "explanation": "v = (0.05×200)/(0.05+0.95) = 10 m/s. KE = ½(1)(10²) = 50 J.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-021",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "A ball of mass 0.1kg is thrown vertically upwards with a speed of 10ms⁻¹ from the top of a tower 10m high. Neglecting air resistance, its total energy just before hitting the ground is? (g = 10ms⁻²)",
    "options": {
      "A": "5J",
      "B": "10J",
      "C": "15J",
      "D": "20J"
    },
    "correctAnswer": "C",
    "explanation": "Total energy = KE + PE. At ground: KE_initial + PE_initial = ½(0.1)(10²) + (0.1)(10)(10) = 5 + 10 = 15 J.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-022",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "A car of mass 800kg attains a speed of 25m/s in 20secs. The power developed in the engine is?",
    "options": {
      "A": "1.25 × 10⁴ W",
      "B": "2.50 × 10⁴ W",
      "C": "1.25 × 10⁶ W",
      "D": "2.50 × 10⁶ W"
    },
    "correctAnswer": "B",
    "explanation": "a = 25/20 = 1.25 m/s². F = 800 × 1.25 = 1000 N. P = Fv = 1000 × 25 = 25,000 W = 2.50 × 10⁴ W.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-023",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "When the brakes in a car are applied, the frictional force on the tyres is?",
    "options": {
      "A": "A disadvantage because it is in the direction of motion",
      "B": "A disadvantage because it is in the opposite direction of motion",
      "C": "An advantage because it is in the direction of motion",
      "D": "An advantage because it is in the opposite direction of motion"
    },
    "correctAnswer": "D",
    "explanation": "Friction opposes motion, which is advantageous for braking (it slows the car).",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-024",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "If the stress on a wire is 10⁷ Nm⁻² and the wire is stretched from its original length of 10.00m to 10.05m. The Young's modulus of the wire is?",
    "options": {
      "A": "5.0 × 10⁻⁴ Nm⁻²",
      "B": "5.0 × 10⁻⁵ Nm⁻²",
      "C": "2.0 × 10⁻⁸ Nm⁻²",
      "D": "2.0 × 10⁹ Nm⁻²"
    },
    "correctAnswer": "D",
    "explanation": "Strain = 0.05/10 = 0.005. Y = stress/strain = 10⁷/0.005 = 2.0 × 10⁹ Nm⁻².",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-025",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "When the temperature of a liquid increases, its surface tension?",
    "options": {
      "A": "Increases",
      "B": "Decreases",
      "C": "Remains constant",
      "D": "Becomes zero"
    },
    "correctAnswer": "B",
    "explanation": "Surface tension decreases with increasing temperature due to increased molecular kinetic energy.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-026",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "I. A liquid boils when its saturated vapor pressure is equal to the external pressure. II. Dissolved substances in pure water lead to an increase in the boiling point. III. When the external pressure is increased, the boiling point increases. IV. Dissolved substances in pure water decreases the boiling point. Which of the above combinations are peculiarities of the boiling point of a liquid?",
    "options": {
      "A": "I, II and III only",
      "B": "I, II, III, and IV",
      "C": "I, II, and IV",
      "D": "II, III, and IV"
    },
    "correctAnswer": "A",
    "explanation": "I, II, and III are correct; IV is false (dissolved substances increase boiling point).",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-027",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "A gas at a volume of V₀ in a container at pressure p₀ is compressed to one-fifth of its volume. What will be its pressure if the magnitude of its original temperature T is constant?",
    "options": {
      "A": "p₀/5",
      "B": "4p₀",
      "C": "p₀",
      "D": "5p₀"
    },
    "correctAnswer": "D",
    "explanation": "Boyle's law: P₁V₁ = P₂V₂ → p₀V₀ = P₂(V₀/5) → P₂ = 5p₀.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-028",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "A piece of substance of specific heat capacity 450 Jkg⁻¹K⁻¹ falls through a vertical distance of 20m from rest. Calculate the rise in temperature of the substance on hitting the ground when all its energies are converted into heat. (g = 10ms⁻²)",
    "options": {
      "A": "2/9 ºC",
      "B": "4/9 ºC",
      "C": "9/9 ºC",
      "D": "9/4 ºC"
    },
    "correctAnswer": "B",
    "explanation": "mcΔθ = mgh → Δθ = gh/c = (10 × 20)/450 = 200/450 = 4/9 ºC.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-029",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "The temperature gradient across a copper rod of thickness 0.02m, maintained at two temperature junctions of 20º and 80ºC respectively is?",
    "options": {
      "A": "3.0 × 10² km⁻¹",
      "B": "3.0 × 10³ km⁻¹",
      "C": "5.0 × 10³ km⁻¹",
      "D": "3.0 × 10⁴ km⁻¹"
    },
    "correctAnswer": "B",
    "explanation": "Temperature gradient = ΔT/thickness = (80 − 20)/0.02 = 60/0.02 = 3000 °C/m = 3.0 × 10³ km⁻¹.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-030",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "Calculate the mass of ice that would melt when 2kg of copper is quickly transferred from boiling water to a block of ice without heat loss. (specific heat capacity of copper = 400 Jkg⁻¹K⁻¹, latent heat of fusion of ice = 3.3 × 10⁵ Jkg⁻¹)",
    "options": {
      "A": "8/33 kg",
      "B": "3.3/80 kg",
      "C": "80/33 kg",
      "D": "3.3/8 kg"
    },
    "correctAnswer": "A",
    "explanation": "Heat lost by copper = heat gained by ice. 2 × 400 × 100 = m × (3.3 × 10⁵) → m = 80,000/330,000 = 8/33 kg.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-031",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "The equation of a wave traveling along the positive x-direction is given by y = 0.25 × 10⁻³ sin(500t − 0.025x). Determine the angular velocity of the wave motion.",
    "options": {
      "A": "0.25 × 10⁻³ rads⁻¹",
      "B": "0.25 × 10⁻¹ rads⁻¹",
      "C": "5.00 × 10² rads⁻¹",
      "D": "2.50 × 10³ rads⁻¹"
    },
    "correctAnswer": "C",
    "explanation": "The angular velocity ω is the coefficient of t: ω = 500 rad/s = 5.00 × 10² rad/s.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-032",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "If a sound wave goes from a cold air region to a hot air region, its wavelength will?",
    "options": {
      "A": "Increase",
      "B": "Decrease",
      "C": "Decrease then increase",
      "D": "Remain constant"
    },
    "correctAnswer": "A",
    "explanation": "Speed of sound increases in hot air; since frequency remains constant, wavelength increases (v = fλ).",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-033",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "The lowest note emitted by a stretched string has a frequency of 40Hz. How many overtones are there between 40Hz and 180Hz?",
    "options": {
      "A": "1",
      "B": "2",
      "C": "3",
      "D": "4"
    },
    "correctAnswer": "C",
    "explanation": "Harmonics: 40, 80, 120, 160, 200... Overtones between 40 and 180 Hz are 80, 120, 160 → 3 overtones.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-034",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "A man stands 4m in front of a plane mirror. If the mirror is moved 1m towards the man, the distance between him and his new image is?",
    "options": {
      "A": "3m",
      "B": "5m",
      "C": "6m",
      "D": "10m"
    },
    "correctAnswer": "C",
    "explanation": "New distance to mirror = 3m. Distance to image = 2 × 3 = 6m.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-035",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "The inside portion of part of a hollow metal sphere of diameter 20cm is polished. The portion will therefore form a?",
    "options": {
      "A": "Concave mirror of focal length 5cm",
      "B": "Concave mirror of focal length 10cm",
      "C": "Convex mirror of focal length 5cm",
      "D": "Convex mirror of focal length 10cm"
    },
    "correctAnswer": "A",
    "explanation": "A polished inner surface acts as a concave mirror. Focal length f = d/4 = 20/4 = 5 cm.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-036",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "The velocities of light in air and glass are 3.0 × 10⁸ ms⁻¹ and 2.0 × 10⁸ ms⁻¹ respectively. If the angle of refraction is 30º, the sine of the angle of incidence is?",
    "options": {
      "A": "0.33",
      "B": "0.50",
      "C": "0.67",
      "D": "0.75"
    },
    "correctAnswer": "D",
    "explanation": "Snell's law: sin i / sin r = v₁/v₂ → sin i / 0.5 = 3/2 → sin i = 0.75.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-037",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "An astronomical telescope is said to be in normal adjustment when the?",
    "options": {
      "A": "Eye is accommodated",
      "B": "Focal length of the objective lens is longer than that of the eyepiece",
      "C": "Final image is at the near point of the eye",
      "D": "Final image is at infinity"
    },
    "correctAnswer": "D",
    "explanation": "In normal adjustment, the final image is at infinity (relaxed eye).",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-038",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "A 2H inductor has negligible resistance and is connected to a 50/π Hz A.C supply. The reactance of the inductor is?",
    "options": {
      "A": "200Ω",
      "B": "50Ω",
      "C": "100/πΩ",
      "D": "25/πΩ"
    },
    "correctAnswer": "A",
    "explanation": "X_L = 2πfL = 2π(50/π)(2) = 200 Ω.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-039",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "The inner diameter of a test tube can be measured accurately using a?",
    "options": {
      "A": "Metre rule",
      "B": "Vernier calipers",
      "C": "Micrometer screw gauge",
      "D": "Measuring tape"
    },
    "correctAnswer": "B",
    "explanation": "Vernier calipers are designed to measure internal and external diameters accurately.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-040",
    "subject": "physics",
    "year": 2021,
    "origin": "official_past_question",
    "question": "If the fraction of the atoms of a radioactive material left after 120 years is 1/64, what is the half-life of the material?",
    "options": {
      "A": "24 years",
      "B": "20 years",
      "C": "10 years",
      "D": "2 years"
    },
    "correctAnswer": "B",
    "explanation": "(Duplicate of Q16) Half-life = 20 years.",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2021-041",
    "subject": "physics",
    "year": 2021,
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
    "id": "phy-2021-042",
    "subject": "physics",
    "year": 2021,
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
    "id": "phy-2021-043",
    "subject": "physics",
    "year": 2021,
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
    "id": "phy-2021-044",
    "subject": "physics",
    "year": 2021,
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
    "id": "phy-2021-045",
    "subject": "physics",
    "year": 2021,
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
    "id": "phy-2021-046",
    "subject": "physics",
    "year": 2021,
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
    "id": "phy-2021-047",
    "subject": "physics",
    "year": 2021,
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
    "id": "phy-2021-048",
    "subject": "physics",
    "year": 2021,
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
    "id": "phy-2021-049",
    "subject": "physics",
    "year": 2021,
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
    "id": "phy-2021-050",
    "subject": "physics",
    "year": 2021,
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
    "id": "phy-2021-051",
    "subject": "physics",
    "year": 2021,
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
    "id": "phy-2021-052",
    "subject": "physics",
    "year": 2021,
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
    "id": "phy-2021-053",
    "subject": "physics",
    "year": 2021,
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
    "id": "phy-2021-054",
    "subject": "physics",
    "year": 2021,
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
    "id": "phy-2021-055",
    "subject": "physics",
    "year": 2021,
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
    "id": "phy-2021-056",
    "subject": "physics",
    "year": 2021,
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
    "id": "phy-2021-057",
    "subject": "physics",
    "year": 2021,
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
    "id": "phy-2021-058",
    "subject": "physics",
    "year": 2021,
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
    "id": "phy-2021-059",
    "subject": "physics",
    "year": 2021,
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
    "id": "phy-2021-060",
    "subject": "physics",
    "year": 2021,
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
  }
];

export default questions;
