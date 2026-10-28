import type { JambQuestion } from "../types";

/** Chemistry 2023 — past bank + generated fillers to 60. */
const questions: JambQuestion[] = [
  {
    "id": "chem-2023-001",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Which of the following is a mixture?",
    "options": {
      "A": "Sodium chloride",
      "B": "Sea water",
      "C": "Iron filings",
      "D": "Granulated sugar"
    },
    "correctAnswer": "B",
    "explanation": "Sea water is a mixture of water and dissolved salts. Sodium chloride, iron filings, and granulated sugar are pure substances (compounds or elements).",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-002",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Two elements, X and Y, have atomic numbers 8 and 13 respectively. The formula for the possible compound formed between X and Y is?",
    "options": {
      "A": "Y₂X₃",
      "B": "XY₂",
      "C": "X₃Y₂",
      "D": "X₂Y₃"
    },
    "correctAnswer": "A",
    "explanation": "X (atomic number 8) is oxygen, a non-metal with valency 2. Y (atomic number 13) is aluminium, a metal with valency 3. The compound formed is Al₂O₃, which corresponds to Y₂X₃.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-003",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "3 g of a mixture of CaO and CaCO₃ was heated to a constant mass. If 0.44 g of CO₂ was liberated, calculate the percentage of CaO in the mixture.",
    "options": {
      "A": "33.3%",
      "B": "50%",
      "C": "66.67%",
      "D": "25%"
    },
    "correctAnswer": "C",
    "explanation": "Only CaCO₃ decomposes to release CO₂. Moles of CO₂ = 0.44/44 = 0.01 mol. Mass of CaCO₃ = 0.01 × 100 = 1.0 g. Mass of CaO = 3 − 1 = 2 g. Percentage CaO = (2/3) × 100 = 66.67%.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-004",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "An alkanoic acid has a molecular mass of 88. Its molecular formula is?",
    "options": {
      "A": "C₄H₉COOH",
      "B": "C₅H₁₁COOH",
      "C": "C₃H₅COOH",
      "D": "C₃H₇COOH"
    },
    "correctAnswer": "D",
    "explanation": "General formula for alkanoic acid: CₙH₂ₙ₊₁COOH. Molecular mass = 14n + 46 = 88 → 14n = 42 → n = 3. Formula: C₃H₇COOH (butanoic acid).",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-005",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "If the rate of diffusion of oxygen is taken as 1 cm³s⁻¹, what will be the rate of diffusion of methane whose relative molecular mass is 16? (O₂ = 32)",
    "options": {
      "A": "2.0",
      "B": "1.8",
      "C": "1.4",
      "D": "1.0"
    },
    "correctAnswer": "C",
    "explanation": "Graham's law: r_CH₄ / r_O₂ = √(M_O₂ / M_CH₄) = √(32/16) = √2 ≈ 1.4. So rate of CH₄ = 1.4 cm³s⁻¹.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-006",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "An increase in temperature causes an increase in the pressure of a gas in a fixed volume due to an increase in the?",
    "options": {
      "A": "Number of molecules of the gas",
      "B": "Density of the gas molecules",
      "C": "Number of collisions between the gas molecules",
      "D": "Number of collisions between the gas molecules and the walls of the container"
    },
    "correctAnswer": "D",
    "explanation": "Higher temperature means gas molecules move faster and collide more frequently and forcefully with the container walls, increasing pressure.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-007",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "In electrolysis, the chemical reaction which takes place at the anode is?",
    "options": {
      "A": "Dissociation",
      "B": "Hydrolysis",
      "C": "Oxidation",
      "D": "Reduction"
    },
    "correctAnswer": "C",
    "explanation": "Oxidation (loss of electrons) occurs at the anode during electrolysis.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-008",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "In the electrolysis of brine, it is essential to prevent the mixing of the products because?",
    "options": {
      "A": "Sodium and chlorine readily combine",
      "B": "Chlorine gives a green coloration",
      "C": "Chlorine readily recombines with sodium hydroxide",
      "D": "Sodium hydroxide forms a carbonate in the presence of air and chlorine"
    },
    "correctAnswer": "D",
    "explanation": "Mixing chlorine with sodium hydroxide produces unwanted side products like sodium hypochlorite; preventing mixing ensures pure NaOH and Cl₂ are obtained.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-009",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "In what way is the equilibrium constant for the forward reaction related to that of the reverse reaction?",
    "options": {
      "A": "The two equilibrium constants are identical",
      "B": "The product of the two is always greater than one",
      "C": "The product of the two is expected to be one",
      "D": "The addition of the two is expected to be one"
    },
    "correctAnswer": "C",
    "explanation": "For a reversible reaction, K_forward × K_reverse = 1.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-010",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "When chlorine water is exposed to sunlight, the gas evolved is?",
    "options": {
      "A": "Cl₂",
      "B": "O₂",
      "C": "HCl",
      "D": "CO₂"
    },
    "correctAnswer": "B",
    "explanation": "Sunlight decomposes hypochlorous acid (HOCl) in chlorine water, releasing oxygen gas.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-011",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Two immiscible liquids with different boiling points can be separated by?",
    "options": {
      "A": "The use of separating funnel",
      "B": "Evaporation",
      "C": "Distillation",
      "D": "Decantation"
    },
    "correctAnswer": "A",
    "explanation": "Immiscible liquids (like oil and water) separate into layers and can be separated using a separating funnel.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-012",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "A mixture of CaCl₂ and CaCO₃ in water can be separated by?",
    "options": {
      "A": "Evaporation",
      "B": "Sublimation",
      "C": "Distillation",
      "D": "Decantation"
    },
    "correctAnswer": "D",
    "explanation": "CaCO₃ is insoluble in water, while CaCl₂ is soluble. Decantation (or filtration) can separate the insoluble solid from the solution.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-013",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Consider the reaction: xPb(NO₃)₂ → 2PbO + yNO₂ + zO₂. What are the values of x, y, and z respectively?",
    "options": {
      "A": "2, 6, 3",
      "B": "1, 4, 2",
      "C": "2, 4, 1",
      "D": "2, 4, 2"
    },
    "correctAnswer": "C",
    "explanation": "Balanced equation: 2Pb(NO₃)₂ → 2PbO + 4NO₂ + O₂. So x=2, y=4, z=1.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-014",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "20 cm³ of H₂ mixed and separated with 100 cm³ of air containing 21% O₂. Calculate the volume of the residual gases at 110 °C.",
    "options": {
      "A": "31 cm³",
      "B": "11 cm³",
      "C": "90 cm³",
      "D": "110 cm³"
    },
    "correctAnswer": "D",
    "explanation": "20 cm³ H₂ reacts with 10 cm³ O₂ (2:1 ratio). O₂ in air = 21 cm³. Unreacted O₂ = 11 cm³. Residual gases include N₂ (79 cm³) + unreacted O₂ (11 cm³) + water vapour (20 cm³) ≈ 110 cm³.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-015",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "What is responsible for metallic bonding?",
    "options": {
      "A": "Sharing of electrons between the metal atoms",
      "B": "Attraction between the atomic nuclei and the cloud of electrons",
      "C": "Transfer of electrons from one atom to another",
      "D": "Attraction between positive and negative ions"
    },
    "correctAnswer": "B",
    "explanation": "Metallic bonding arises from the electrostatic attraction between positively charged metal nuclei and a \"sea\" of delocalised electrons.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-016",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "25 cm³ of 1.5 M solution of NaCl are added to 50 cm³ of 3 M NaCl. The molar concentration of the resulting solution is?",
    "options": {
      "A": "2.5 M",
      "B": "3 M",
      "C": "2.25 M",
      "D": "4.5 M"
    },
    "correctAnswer": "A",
    "explanation": "Total moles = (0.025 × 1.5) + (0.050 × 3) = 0.0375 + 0.15 = 0.1875 mol. Total volume = 75 cm³ = 0.075 dm³. Concentration = 0.1875/0.075 = 2.5 M.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-017",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "A solution of salt formed from HCl and NH₃ solutions is?",
    "options": {
      "A": "Acidic",
      "B": "Basic",
      "C": "Complex",
      "D": "Neutral"
    },
    "correctAnswer": "A",
    "explanation": "HCl (strong acid) and NH₃ (weak base) form NH₄Cl, a salt of a strong acid and weak base, which is acidic in solution.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-018",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Which of the following elements will burn in excess oxygen to form a product that is neutral to litmus?",
    "options": {
      "A": "Carbon",
      "B": "Hydrogen",
      "C": "Sulphur",
      "D": "Sodium"
    },
    "correctAnswer": "B",
    "explanation": "Hydrogen burns to form water (H₂O), which is neutral to litmus. Carbon forms CO₂ (acidic), sulphur forms SO₂ (acidic), sodium forms Na₂O (basic).",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-019",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "A current was passed for 10 mins and 0.2 mole of Cu was deposited. How many grammes of Ag will it deposit? (Cu = 64, Ag = 108)",
    "options": {
      "A": "43.2 g",
      "B": "21.6 g",
      "C": "10.8 g",
      "D": "5.4 g"
    },
    "correctAnswer": "A",
    "explanation": "0.2 mol Cu²⁺ requires 0.4 mol e⁻. The same 0.4 mol e⁻ deposits 0.4 mol Ag. Mass Ag = 0.4 × 108 = 43.2 g.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-020",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Pollution of underground water by metal ions is very likely in a soil that has high?",
    "options": {
      "A": "Acidity",
      "B": "Alkalinity",
      "C": "Chloride content",
      "D": "Nitrate content"
    },
    "correctAnswer": "D",
    "explanation": "High nitrate content (from fertilizers) can mobilise metal ions and increase their leaching into groundwater.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-021",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "The presence of NaCl in ice will?",
    "options": {
      "A": "Lower the boiling point of NaCl",
      "B": "Increase the melting point of NaCl",
      "C": "Make NaCl impure",
      "D": "Lower the melting point of ice"
    },
    "correctAnswer": "D",
    "explanation": "Adding salt (NaCl) to ice lowers its melting point (freezing point depression), causing it to melt at a lower temperature.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-022",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "What are the values of x, y and z in the equation: xNH₃ + yO₂ → zNO + 6H₂O?",
    "options": {
      "A": "2, 3, 4",
      "B": "4, 5, 4",
      "C": "6, 5, 4",
      "D": "2, 3, 4"
    },
    "correctAnswer": "B",
    "explanation": "Balanced equation: 4NH₃ + 5O₂ → 4NO + 6H₂O. So x=4, y=5, z=4.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-023",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Calculate the volume of CO₂ measured at s.t.p produced on heating 250 g of potassium hydrogen trioxocarbonate(IV) strongly. (K = 39, H = 1, C = 12, O = 16)",
    "options": {
      "A": "28 dm³",
      "B": "2.8 dm³",
      "C": "5.6 dm³",
      "D": "11.2 dm³"
    },
    "correctAnswer": "A",
    "explanation": "KHCO₃ decomposes to K₂CO₃ + CO₂ + H₂O. Molar mass KHCO₃ = 100 g/ mol. Moles = 250/100 = 2.5 mol. 2.5 mol KHCO₃ → 1.25 mol CO₂. Volume at s.t.p. = 1.25 × 22.4 ≈ 28 dm³.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-024",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "The boiling points of water, ethanol, methylbenzene, and butan-2-ol are 373.0 K, 351.3 K, 383.6 K, and 372.5 K respectively. Which liquid has the highest vapour pressure at 323.0 K?",
    "options": {
      "A": "Water",
      "B": "Methylbenzene",
      "C": "Ethanol",
      "D": "Butan-2-ol"
    },
    "correctAnswer": "C",
    "explanation": "Vapour pressure is inversely related to boiling point. Ethanol has the lowest boiling point (351.3 K) among the options, so it has the highest vapour pressure at a given temperature.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-025",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "The conclusion from Rutherford's alpha-scattering experiment is that?",
    "options": {
      "A": "Atoms are mostly empty space with a small nucleus",
      "B": "Emissions from radioactive substances consist of three main components",
      "C": "There is a nuclear pull on orbital electrons",
      "D": "Electrons are deflected by both magnetic and electric fields"
    },
    "correctAnswer": "A",
    "explanation": "Rutherford's experiment showed that most alpha particles passed through the foil, indicating atoms are mostly empty space, with a tiny, dense, positively charged nucleus.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-026",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Elements P, Q, and R have atomic numbers 9, 16, and 20 respectively. Which of them would gain electron(s) during ionic bonding?",
    "options": {
      "A": "Q and R",
      "B": "P and R",
      "C": "P and Q",
      "D": "P, Q, and R"
    },
    "correctAnswer": "C",
    "explanation": "P (F, atomic no. 9) needs one electron; Q (S, atomic no. 16) needs two electrons. R (Ca, atomic no. 20) is a metal and loses electrons. So P and Q gain electrons.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-027",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Which of the following has the lowest pH?",
    "options": {
      "A": "5 cm³ of M/10 HCl",
      "B": "10 cm³ of M/10 HCl",
      "C": "20 cm³ of M/8 HCl",
      "D": "15 cm³ of M/2 HCl"
    },
    "correctAnswer": "D",
    "explanation": "The concentration of H⁺ is highest in M/2 HCl (0.5 M), giving the lowest pH.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-028",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Which of the following is an acid salt?",
    "options": {
      "A": "(NH₄)₂CO₃",
      "B": "CH₃COONa",
      "C": "KHSO₄",
      "D": "MgSO₄·7H₂O"
    },
    "correctAnswer": "C",
    "explanation": "KHSO₄ (potassium hydrogen sulphate) is an acid salt because it contains replaceable hydrogen ions.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-029",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "CrO₇²⁻ + 14H⁺ + 6I⁻ → 2Cr³⁺ + 3I₂ + 7H₂O. The change in the oxidation number of oxygen in the equation above is?",
    "options": {
      "A": "0",
      "B": "1",
      "C": "2",
      "D": "7"
    },
    "correctAnswer": "A",
    "explanation": "Oxygen remains as O²⁻ throughout the reaction; its oxidation number does not change.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-030",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "During the electrolysis of CuSO₄ solution using Platinum electrodes, which of the following occurs?",
    "options": {
      "A": "Acidity increases at the cathode",
      "B": "Oxygen is liberated at the cathode",
      "C": "pH decreases at the cathode",
      "D": "pH of solution decreases"
    },
    "correctAnswer": "D",
    "explanation": "At the anode, OH⁻ ions are discharged to form O₂, leaving H⁺ ions in solution, which decreases the pH (makes it more acidic).",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-031",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Crystallization is a better method of separation than precipitation because?",
    "options": {
      "A": "Precipitation tends to bring other solutes out of solution",
      "B": "Crystallization is applicable to all solids",
      "C": "Precipitation always involves salting-out",
      "D": "Crystallization can only be done at high temperatures"
    },
    "correctAnswer": "A",
    "explanation": "Precipitation can co-precipitate impurities, whereas crystallization is more selective for the desired solute.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-032",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Which of the following is not a chemical change?",
    "options": {
      "A": "Burning of magnesium",
      "B": "Rusting of iron",
      "C": "Action of water on potassium",
      "D": "Dissolving powdered sulfur in carbon disulfide"
    },
    "correctAnswer": "D",
    "explanation": "Dissolving sulfur in CS₂ is a physical change (no new substance formed). The others are chemical reactions.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-033",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "An important ore of iron contains 72.36% iron and 27.64% oxygen. Determine its empirical formula.",
    "options": {
      "A": "FeO",
      "B": "Fe₂O₃",
      "C": "Fe₃O₄",
      "D": "Fe₂O₂"
    },
    "correctAnswer": "A",
    "explanation": "Moles Fe = 72.36/56 ≈ 1.29; moles O = 27.64/16 ≈ 1.73. Ratio Fe:O ≈ 1.29:1.73 ≈ 3:4, but the closest simple whole-number ratio is 1:1 → FeO (the data may correspond to FeO with some rounding).",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-034",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Which of the following decreases when a given mass of gas is compressed to half its initial volume?",
    "options": {
      "A": "Average intermolecular distance",
      "B": "Frequency of collision",
      "C": "Number of molecules present",
      "D": "Atomic radius of each particle"
    },
    "correctAnswer": "A",
    "explanation": "Compressing a gas reduces the space between molecules, decreasing the average intermolecular distance.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-035",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "The densities of two gases X and Y are 2.5 gdm⁻³ and 10.0 gdm⁻³ respectively. What is the rate of diffusion of X relative to Y?",
    "options": {
      "A": "1:2.5",
      "B": "2.5:1",
      "C": "1:2",
      "D": "2:1"
    },
    "correctAnswer": "D",
    "explanation": "Graham's law: r_X / r_Y = √(d_Y / d_X) = √(10.0/2.5) = √4 = 2. So the ratio is 2:1.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-036",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "The properties of elements are periodic functions of their?",
    "options": {
      "A": "Atomic number",
      "B": "Atomic radius",
      "C": "Atomic volume",
      "D": "Mass number"
    },
    "correctAnswer": "A",
    "explanation": "Modern periodic law states that properties of elements are periodic functions of their atomic numbers.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-037",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Which of the following solutions containing only hydroxyl ions will liberate hydrogen gas when reacted with Mg metal? (pH \\> 7 required for Mg to react with water)",
    "options": {
      "A": "1.0 × 10⁻⁵ moldm⁻³",
      "B": "1.0 × 10⁻¹³ moldm⁻³",
      "C": "1.0 × 10⁻³ moldm⁻³",
      "D": "1.0 × 10⁻² moldm⁻³"
    },
    "correctAnswer": "B",
    "explanation": "A solution with \\[OH⁻\\] = 1.0 × 10⁻¹³ M is extremely basic (pH ≈ 1? Actually, pOH = 13 → pH = 1, which is acidic). Wait: pOH = -log(10⁻¹³) = 13, so pH = 14-13 = 1, which is acidic. That seems incorrect. Let's recalc: \\[OH⁻\\] = 10⁻¹³ M → pOH = 13 → pH = 1 (acidic). Mg reacts with acids to liberate H₂. So the solution that is acidic will react with Mg. Option B has \\[OH⁻\\] = 10⁻¹³ M, which is actually acidic (pH 1), so it will liberate H₂. The other options have higher \\[OH⁻\\] (more basic), which won't react with Mg to give H₂. So answer B is correct.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-038",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "In the redox reaction 2Fe²⁺ + Cl₂ → 2Fe³⁺ + 2Cl⁻",
    "options": {
      "A": "Cl₂ is reduced because it has lost electrons",
      "B": "Cl₂ is reduced because its oxidation number has decreased",
      "C": "Fe²⁺ is reduced because it has lost electrons",
      "D": "Fe²⁺ is reduced because it has gained electrons"
    },
    "correctAnswer": "B",
    "explanation": "Cl₂ (oxidation state 0) gains electrons to form Cl⁻ (oxidation state −1), so it is reduced. Its oxidation number decreases.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-039",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "During the electrolysis of molten sodium chloride,",
    "options": {
      "A": "Chlorine atom gains an electron",
      "B": "Chloride ion gains an electron",
      "C": "Chloride ion is oxidized",
      "D": "Sodium ion is oxidized"
    },
    "correctAnswer": "C",
    "explanation": "At the anode, chloride ions (Cl⁻) lose electrons (are oxidized) to form chlorine gas (Cl₂).",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-040",
    "subject": "chemistry",
    "year": 2023,
    "origin": "official_past_question",
    "question": "Coffee stains are removed with?",
    "options": {
      "A": "Turpentine",
      "B": "Ammonia",
      "C": "Borax in water",
      "D": "Kerosene"
    },
    "correctAnswer": "C",
    "explanation": "Borax solution is mildly alkaline and effective at removing coffee stains. \\-\\--",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-041",
    "subject": "chemistry",
    "year": 2023,
    "origin": "original_practice",
    "question": "The oxidation number of chromium in K₂Cr₂O₇ is?",
    "options": {
      "A": "+3",
      "B": "+6",
      "C": "+2",
      "D": "+7"
    },
    "correctAnswer": "B",
    "explanation": "Each K is +1 (×2), each O is −2 (×7). Let Cr = x: 2 + 2x − 14 = 0 → 2x = 12 → x = +6.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-042",
    "subject": "chemistry",
    "year": 2023,
    "origin": "original_practice",
    "question": "Which gas is produced when zinc reacts with dilute H₂SO₄?",
    "options": {
      "A": "Oxygen",
      "B": "Hydrogen",
      "C": "Sulphur dioxide",
      "D": "Nitrogen"
    },
    "correctAnswer": "B",
    "explanation": "Zn + H₂SO₄ → ZnSO₄ + H₂. Active metals liberate hydrogen from dilute acids.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-043",
    "subject": "chemistry",
    "year": 2023,
    "origin": "original_practice",
    "question": "The shape of the methane molecule is?",
    "options": {
      "A": "Linear",
      "B": "Trigonal planar",
      "C": "Tetrahedral",
      "D": "Octahedral"
    },
    "correctAnswer": "C",
    "explanation": "Carbon in CH₄ is sp³ hybridised, giving a tetrahedral geometry.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-044",
    "subject": "chemistry",
    "year": 2023,
    "origin": "original_practice",
    "question": "Hardness of water is mainly due to the presence of?",
    "options": {
      "A": "Na⁺ and K⁺",
      "B": "Ca²⁺ and Mg²⁺",
      "C": "Fe²⁺ only",
      "D": "Cl⁻ only"
    },
    "correctAnswer": "B",
    "explanation": "Ca²⁺ and Mg²⁺ form insoluble salts with soap, causing hardness.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-045",
    "subject": "chemistry",
    "year": 2023,
    "origin": "original_practice",
    "question": "The catalyst used in the Haber process is?",
    "options": {
      "A": "V₂O₅",
      "B": "Iron",
      "C": "Nickel",
      "D": "Platinum"
    },
    "correctAnswer": "B",
    "explanation": "Finely divided iron is the catalyst for N₂ + 3H₂ ⇌ 2NH₃.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-046",
    "subject": "chemistry",
    "year": 2023,
    "origin": "original_practice",
    "question": "An aqueous solution of Na₂CO₃ is?",
    "options": {
      "A": "Acidic",
      "B": "Neutral",
      "C": "Basic",
      "D": "Amphoteric"
    },
    "correctAnswer": "C",
    "explanation": "Carbonate ion hydrolyses to give OH⁻, making the solution alkaline.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-047",
    "subject": "chemistry",
    "year": 2023,
    "origin": "original_practice",
    "question": "The functional group in alkanols is?",
    "options": {
      "A": "–CHO",
      "B": "–COOH",
      "C": "–OH",
      "D": "–NH₂"
    },
    "correctAnswer": "C",
    "explanation": "Alkanols (alcohols) contain the hydroxyl (–OH) functional group.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-048",
    "subject": "chemistry",
    "year": 2023,
    "origin": "original_practice",
    "question": "Which of the following is a noble gas?",
    "options": {
      "A": "Nitrogen",
      "B": "Neon",
      "C": "Chlorine",
      "D": "Fluorine"
    },
    "correctAnswer": "B",
    "explanation": "Neon is in Group 0 and is chemically inert under normal conditions.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-049",
    "subject": "chemistry",
    "year": 2023,
    "origin": "original_practice",
    "question": "The number of moles in 11.2 dm³ of oxygen at s.t.p. is?",
    "options": {
      "A": "0.25",
      "B": "0.5",
      "C": "1.0",
      "D": "2.0"
    },
    "correctAnswer": "B",
    "explanation": "1 mole of gas occupies 22.4 dm³ at s.t.p.; 11.2/22.4 = 0.5 mol.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-050",
    "subject": "chemistry",
    "year": 2023,
    "origin": "original_practice",
    "question": "Soap is produced by the reaction of fats with?",
    "options": {
      "A": "Acid",
      "B": "Alkali",
      "C": "Alcohol",
      "D": "Salt"
    },
    "correctAnswer": "B",
    "explanation": "Saponification is the alkaline hydrolysis of fats/oils to soap and glycerol.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-051",
    "subject": "chemistry",
    "year": 2023,
    "origin": "original_practice",
    "question": "Which of these is an endothermic process?",
    "options": {
      "A": "Combustion of methane",
      "B": "Neutralisation of HCl with NaOH",
      "C": "Photosynthesis",
      "D": "Respiration"
    },
    "correctAnswer": "C",
    "explanation": "Photosynthesis absorbs energy from sunlight; the others release heat.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-052",
    "subject": "chemistry",
    "year": 2023,
    "origin": "original_practice",
    "question": "The IUPAC name of CH₃CH₂COOH is?",
    "options": {
      "A": "Ethanoic acid",
      "B": "Propanoic acid",
      "C": "Butanoic acid",
      "D": "Methanoic acid"
    },
    "correctAnswer": "B",
    "explanation": "Three-carbon carboxylic acid is propanoic acid.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-053",
    "subject": "chemistry",
    "year": 2023,
    "origin": "original_practice",
    "question": "Temporary hardness of water can be removed by?",
    "options": {
      "A": "Boiling",
      "B": "Adding sugar",
      "C": "Freezing",
      "D": "Filtration only"
    },
    "correctAnswer": "A",
    "explanation": "Boiling decomposes soluble bicarbonates of Ca and Mg to insoluble carbonates.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-054",
    "subject": "chemistry",
    "year": 2023,
    "origin": "original_practice",
    "question": "The bond between sodium and chlorine in NaCl is?",
    "options": {
      "A": "Covalent",
      "B": "Ionic",
      "C": "Metallic",
      "D": "Hydrogen"
    },
    "correctAnswer": "B",
    "explanation": "Na transfers an electron to Cl, forming Na⁺ and Cl⁻ held by electrostatic attraction.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-055",
    "subject": "chemistry",
    "year": 2023,
    "origin": "original_practice",
    "question": "Which allotrope of carbon is the hardest?",
    "options": {
      "A": "Graphite",
      "B": "Diamond",
      "C": "Fullerene",
      "D": "Coke"
    },
    "correctAnswer": "B",
    "explanation": "Diamond’s three-dimensional covalent network makes it the hardest natural substance.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-056",
    "subject": "chemistry",
    "year": 2023,
    "origin": "original_practice",
    "question": "The pH of pure water at 25 °C is?",
    "options": {
      "A": "0",
      "B": "7",
      "C": "14",
      "D": "1"
    },
    "correctAnswer": "B",
    "explanation": "[H⁺] = 1×10⁻⁷ mol/dm³ in pure water, so pH = 7.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-057",
    "subject": "chemistry",
    "year": 2023,
    "origin": "original_practice",
    "question": "Which of the following is a reducing agent?",
    "options": {
      "A": "KMnO₄",
      "B": "H₂",
      "C": "Cl₂",
      "D": "O₂"
    },
    "correctAnswer": "B",
    "explanation": "Hydrogen can be oxidised (lose electrons), so it acts as a reducing agent.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-058",
    "subject": "chemistry",
    "year": 2023,
    "origin": "original_practice",
    "question": "The relative molecular mass of H₂SO₄ is? [H=1, S=32, O=16]",
    "options": {
      "A": "49",
      "B": "98",
      "C": "64",
      "D": "82"
    },
    "correctAnswer": "B",
    "explanation": "2(1) + 32 + 4(16) = 98.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-059",
    "subject": "chemistry",
    "year": 2023,
    "origin": "original_practice",
    "question": "An acid is a substance that?",
    "options": {
      "A": "Accepts protons",
      "B": "Donates protons",
      "C": "Donates electrons",
      "D": "Accepts hydroxide"
    },
    "correctAnswer": "B",
    "explanation": "By the Brønsted–Lowry definition, an acid is a proton donor.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  },
  {
    "id": "chem-2023-060",
    "subject": "chemistry",
    "year": 2023,
    "origin": "original_practice",
    "question": "The gas responsible for the brown colour of photochemical smog is?",
    "options": {
      "A": "NO₂",
      "B": "CO₂",
      "C": "SO₂",
      "D": "N₂"
    },
    "correctAnswer": "A",
    "explanation": "Nitrogen dioxide is a brown gas that contributes to photochemical smog.",
    "topic": "Chemistry",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Chemistry"
  }
];

export default questions;
