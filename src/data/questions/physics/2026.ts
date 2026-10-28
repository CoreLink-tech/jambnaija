import type { JambQuestion } from "../types";

/** Physics 2026 — JAMB past questions (Drive doc bank). */
const questions: JambQuestion[] = [
  {
    "id": "phy-2026-001",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "If the volume of a gas is recorded as 76 cm³ at a temperature of 27 °C with a pressure of 800 mmHg, what will be the volume of the gas at S.T.P.?",
    "options": {
      "A": "36.2 cm³",
      "B": "25.7 cm³",
      "C": "72.8 cm³",
      "D": "24.3 cm³"
    },
    "correctAnswer": "C",
    "explanation": "(P₁V₁)/T₁ = (P₂V₂)/T₂。P₁ = 800 mmHg，V₁ = 76 cm³，T₁ = 300 K；P₂ = 760 mmHg，T₂ = 273 K。V₂ = (800×76×273)/(300×760) ≈ 72.8 cm³。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-002",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "Boyle's law may be written as?",
    "options": {
      "A": "P₁V₁ = P₂V₂",
      "B": "V₁/T₁ = V₂/T₂",
      "C": "P₁/T₁ = P₂/T₂",
      "D": "(P₁V₁)/T₁ = (P₂V₂)/T₂"
    },
    "correctAnswer": "A",
    "explanation": "玻意耳定律：恒温下，一定质量气体的体积与压强成反比，P₁V₁ = P₂V₂。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-003",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The direction of the path taken by light is called a?",
    "options": {
      "A": "Locus",
      "B": "Line",
      "C": "Ray",
      "D": "Beam"
    },
    "correctAnswer": "C",
    "explanation": "光线（ray）表示光的传播方向。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-004",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "What is the inductance (L) of an inductor whose reactance is 1 Ω at 50/π Hz?",
    "options": {
      "A": "100 H",
      "B": "0.01 H",
      "C": "10 H",
      "D": "1 H"
    },
    "correctAnswer": "B",
    "explanation": "X_L = 2πfL → 1 = 2π × (50/ π) × L = 100L → L = 0.01 H。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-005",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "A stroboscope can be used to?",
    "options": {
      "A": "Make a wave appear stationary",
      "B": "Measure high temperature",
      "C": "Measure pressure",
      "D": "Detect radioactivity"
    },
    "correctAnswer": "A",
    "explanation": "频闪观测器（stroboscope）可使周期性运动（如波动）看起来静止。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-006",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "In an inelastic collision,?",
    "options": {
      "A": "Both momentum and kinetic energy are conserved",
      "B": "Momentum is conserved but kinetic energy is not",
      "C": "Kinetic energy is conserved but momentum is not",
      "D": "Neither is conserved"
    },
    "correctAnswer": "B",
    "explanation": "非弹性碰撞中动量守恒，但动能不守恒（部分转化为其他形式能量）。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-007",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The principle of floatation states that a floating body displaces?",
    "options": {
      "A": "Its own volume of fluid",
      "B": "Its own weight of fluid",
      "C": "More than its weight of fluid",
      "D": "Less than its weight of fluid"
    },
    "correctAnswer": "B",
    "explanation": "浮体排开流体的重量等于自身重量。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-008",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The general gas law can be expressed as?",
    "options": {
      "A": "PV = nRT",
      "B": "P/V = nRT",
      "C": "V/T = nRP",
      "D": "P + V = nRT"
    },
    "correctAnswer": "A",
    "explanation": "理想气体状态方程 PV = nRT。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-009",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The appearance of a pool of water on a road surface on a hot day is called?",
    "options": {
      "A": "Reflection",
      "B": "Refraction",
      "C": "Mirage",
      "D": "Dispersion"
    },
    "correctAnswer": "C",
    "explanation": "海市蜃楼（mirage）是光线经过热空气层发生折射造成的视觉现象。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-010",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The sun is an example of a?",
    "options": {
      "A": "Non-luminous source",
      "B": "Self-luminous source",
      "C": "Reflected light source",
      "D": "Artificial light source"
    },
    "correctAnswer": "B",
    "explanation": "太阳自身发光，是自发光源（self-luminous source）。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-011",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "A sea breeze blows from?",
    "options": {
      "A": "Land to sea",
      "B": "Sea to land",
      "C": "Sky to land",
      "D": "Land to sky"
    },
    "correctAnswer": "B",
    "explanation": "白天陆地升温快，热空气上升，较冷的空气从海洋吹向陆地，形成海风。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-012",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The thermometer whose reading is indicated by a change in colour of its thermometric property is the?",
    "options": {
      "A": "Liquid-in-glass thermometer",
      "B": "Optical pyrometer",
      "C": "Resistance thermometer",
      "D": "Thermocouple"
    },
    "correctAnswer": "B",
    "explanation": "光学高温计（optical pyrometer）通过比较热物体辐射的亮度（颜色）来测量高温。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-013",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The volume of a fixed mass of an ideal gas decreases steadily as pressure increases at constant temperature. The gas obeys?",
    "options": {
      "A": "Charles' law",
      "B": "Pressure law",
      "C": "Boyle's law",
      "D": "Avogadro's law"
    },
    "correctAnswer": "C",
    "explanation": "玻意耳定律：恒温下，P ∝ 1/V。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-014",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The specific latent heat of vaporisation of a substance is always?",
    "options": {
      "A": "Less than the specific latent heat of fusion",
      "B": "Equal to the specific latent heat of fusion",
      "C": "Greater than the specific latent heat of fusion",
      "D": "Zero"
    },
    "correctAnswer": "C",
    "explanation": "汽化需要将分子分离得更远（液态→气态），因此汽化潜热通常大于熔化潜热。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-015",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "Which of the following units is the S.I. unit of heat capacity?",
    "options": {
      "A": "J kg⁻¹ K⁻¹",
      "B": "J K⁻¹",
      "C": "W K⁻¹",
      "D": "J kg⁻¹"
    },
    "correctAnswer": "B",
    "explanation": "热容 = 热量/温度变化，单位 J/K（或 J K⁻¹）。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-016",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "Which of the following properties makes metals ideal for cooking utensils?",
    "options": {
      "A": "Low density",
      "B": "High melting point",
      "C": "Good conductor of heat",
      "D": "Poor conductor of heat"
    },
    "correctAnswer": "C",
    "explanation": "金属是热的良导体，能快速吸收和传递热量。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-017",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The phenomenon that shows that an increase in pressure lowers the melting point can be observed in?",
    "options": {
      "A": "Regelation",
      "B": "Sublimation",
      "C": "Evaporation",
      "D": "Condensation"
    },
    "correctAnswer": "A",
    "explanation": "复冰现象（regelation）：冰在压力下熔化，压力释放后重新结冰，表明压力降低熔点。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-018",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "When the temperature of a liquid is increased, its surface tension?",
    "options": {
      "A": "Decreases",
      "B": "Increases",
      "C": "Remains constant",
      "D": "Becomes zero"
    },
    "correctAnswer": "A",
    "explanation": "温度升高，分子动能增大，分子间作用力减弱，表面张力减小。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-019",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "An electric heater rated 220 V, 1000 W is immersed in water. If the temperature changes from 30 °C to 100 °C and current flows for 300 s, the mass of water is? \\[c = 4200 J kg⁻¹ K⁻¹\\]",
    "options": {
      "A": "1.02 kg",
      "B": "0.50 kg",
      "C": "2.04 kg",
      "D": "0.25 kg"
    },
    "correctAnswer": "A",
    "explanation": "电能 = 热量：Pt = mcΔθ → 1000×300 = m×4200×70 → m = 300,000/294,000 ≈ 1.02 kg。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-020",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "A fixed mass of hydrogen gas occupies a certain volume at 27 °C. At what temperature (in °C) will the volume double at constant pressure?",
    "options": {
      "A": "54 °C",
      "B": "150 °C",
      "C": "300 °C",
      "D": "327 °C"
    },
    "correctAnswer": "D",
    "explanation": "查理定律：V₁/T₁ = V₂/T₂。V₂ = 2V₁，T₁ = 300 K → T₂ = 600 K = 327 °C。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-021",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "Which of the following statements about a moving object is correct?",
    "options": {
      "A": "When accelerating, the resultant force acting on it must be zero.",
      "B": "There must always be a non-zero resultant force acting on it.",
      "C": "The resultant force is always perpendicular to its motion.",
      "D": "The resultant force may be zero if it moves with constant velocity."
    },
    "correctAnswer": "D",
    "explanation": "匀速运动的物体所受合外力为零；加速运动时合外力不为零。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-022",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The point where no magnetic effect is felt around a magnet is called the?",
    "options": {
      "A": "Pole",
      "B": "Centre",
      "C": "Neutral point",
      "D": "Axis"
    },
    "correctAnswer": "C",
    "explanation": "中性点（neutral point）处磁 铁的磁场与其他磁场（如地磁场）相互抵消，合磁感应强度为零。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-023",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "A body is acted upon by forces applied at points P and Q. Their resultant is equal to?",
    "options": {
      "A": "2√5 N in a direction N 56° E",
      "B": "2√13 N in a direction N 56° E",
      "C": "2√13 N in a direction N 56° E",
      "D": "2√5 N in a direction N 56° E"
    },
    "correctAnswer": "C",
    "explanation": "根据来源，该题的正确结果为 2√13 N，方向 N 56° E。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-024",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The S.I. unit of electric charge is the?",
    "options": {
      "A": "Ampere",
      "B": "Volt",
      "C": "Coulomb",
      "D": "Ohm"
    },
    "correctAnswer": "C",
    "explanation": "电荷的单位是库仑（C）。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-025",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The instrument used to measure atmospheric pressure is the?",
    "options": {
      "A": "Thermometer",
      "B": "Barometer",
      "C": "Hygrometer",
      "D": "Manometer"
    },
    "correctAnswer": "B",
    "explanation": "气压计（barometer）测量大气压。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-026",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "A wave has a frequency of 50 Hz and a wavelength of 4 m. Its speed is?",
    "options": {
      "A": "200 m/s",
      "B": "54 m/s",
      "C": "12.5 m/s",
      "D": "0.08 m/s"
    },
    "correctAnswer": "A",
    "explanation": "v = fλ = 50 × 4 = 200 m/s。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-027",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "Which of the following is a vector quantity?",
    "options": {
      "A": "Speed",
      "B": "Distance",
      "C": "Force",
      "D": "Mass"
    },
    "correctAnswer": "C",
    "explanation": "力有大小和方向，是矢量；速度、距离、质量为标量。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-028",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "Newton's first law of motion is also known as the law of?",
    "options": {
      "A": "Momentum",
      "B": "Inertia",
      "C": "Action-reaction",
      "D": "Gravitation"
    },
    "correctAnswer": "B",
    "explanation": "牛顿第一定律又称惯性定律。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-029",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The acceleration due to gravity on the moon is about?",
    "options": {
      "A": "1/6 of that on Earth",
      "B": "Equal to that on Earth",
      "C": "6 times that on Earth",
      "D": "1/36 of that on Earth"
    },
    "correctAnswer": "A",
    "explanation": "月球表面重力加速度约为地球的 1/6。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-030",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The energy possessed by a body due to its position is?",
    "options": {
      "A": "Kinetic energy",
      "B": "Potential energy",
      "C": "Thermal energy",
      "D": "Chemical energy"
    },
    "correctAnswer": "B",
    "explanation": "势能（potential energy）是物体因位置或状态而具有的能量。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-031",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "An object is placed 20 cm from a converging lens of focal length 10 cm. The image is formed at?",
    "options": {
      "A": "10 cm",
      "B": "20 cm",
      "C": "30 cm",
      "D": "40 cm"
    },
    "correctAnswer": "B",
    "explanation": "1/f = 1/u + 1/v → 1/10 = 1/20 + 1/v → 1/v = 1/10 − 1/20 = 1/20 → v = 20 cm。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-032",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The critical angle for a medium of refractive index 1.5 is approximately?",
    "options": {
      "A": "30°",
      "B": "42°",
      "C": "48°",
      "D": "60°"
    },
    "correctAnswer": "B",
    "explanation": "sin C = 1/n = 1/1.5 ≈ 0.667 → C ≈ 41.8° ≈ 42°。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-033",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "Which of the following electromagnetic waves has the shortest wavelength?",
    "options": {
      "A": "Radio waves",
      "B": "Infrared",
      "C": "Visible light",
      "D": "Gamma rays"
    },
    "correctAnswer": "D",
    "explanation": "伽马射线波长最短，频率最高。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-034",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "A resistor of 10 Ω is connected across a 20 V battery. The current is?",
    "options": {
      "A": "0.5 A",
      "B": "2 A",
      "C": "10 A",
      "D": "200 A"
    },
    "correctAnswer": "B",
    "explanation": "I = V/R = 20/10 = 2 A。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-035",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The equivalent resistance of two 10 Ω resistors connected in parallel is?",
    "options": {
      "A": "20 Ω",
      "B": "10 Ω",
      "C": "5 Ω",
      "D": "0 Ω"
    },
    "correctAnswer": "C",
    "explanation": "1/R = 1/10 + 1/10 = 2/10 → R = 5 Ω。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-036",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "A transformer with more turns in the secondary than the primary is a?",
    "options": {
      "A": "Step-down transformer",
      "B": "Step-up transformer",
      "C": "Isolation transformer",
      "D": "Autotransformer"
    },
    "correctAnswer": "B",
    "explanation": "次级匝数多于初级，输出电压升高，为升压变压器。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-037",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The half-life of a radioactive substance is 5 days. What fraction remains after 20 days?",
    "options": {
      "A": "1/2",
      "B": "1/4",
      "C": "1/8",
      "D": "1/16"
    },
    "correctAnswer": "D",
    "explanation": "20 天 = 4 个半衰期。剩余分数 = (1/2)⁴ = 1/16。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-038",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The particle emitted in alpha decay is?",
    "options": {
      "A": "Electron",
      "B": "Proton",
      "C": "Helium nucleus",
      "D": "Neutron"
    },
    "correctAnswer": "C",
    "explanation": "α 粒子是氦核（²He⁴）。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-039",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "Which of the following is a scalar quantity?",
    "options": {
      "A": "Velocity",
      "B": "Acceleration",
      "C": "Work",
      "D": "Displacement"
    },
    "correctAnswer": "C",
    "explanation": "功只有大小，没有方向，是标量。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-040",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The unit of power in the S.I. system is the?",
    "options": {
      "A": "Joule",
      "B": "Newton",
      "C": "Watt",
      "D": "Pascal"
    },
    "correctAnswer": "C",
    "explanation": "功率的单位是瓦特（W），1 W = 1 J/s。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-041",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "A body of mass 2 kg moving at 3 m/s has kinetic energy of?",
    "options": {
      "A": "6 J",
      "B": "9 J",
      "C": "12 J",
      "D": "18 J"
    },
    "correctAnswer": "B",
    "explanation": "KE = ½mv² = ½ × 2 × 3² = 9 J。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-042",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The force between two charges is inversely proportional to the square of the distance between them. This is?",
    "options": {
      "A": "Ohm's law",
      "B": "Coulomb's law",
      "C": "Faraday's law",
      "D": "Ampere's law"
    },
    "correctAnswer": "B",
    "explanation": "库仑定律描述点电荷间的作用力与距离平方成反比。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-043",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The magnetic field inside a solenoid carrying current is?",
    "options": {
      "A": "Zero",
      "B": "Uniform",
      "C": "Always changing",
      "D": "Strongest at the ends"
    },
    "correctAnswer": "B",
    "explanation": "长直螺线管内部磁场近似均匀。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-044",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The process of changing a liquid to gas at its boiling point is called?",
    "options": {
      "A": "Evaporation",
      "B": "Vaporisation",
      "C": "Condensation",
      "D": "Sublimation"
    },
    "correctAnswer": "B",
    "explanation": "在沸点发生的液→气转变是汽化（vaporisation）。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-045",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The transfer of heat through a vacuum occurs by?",
    "options": {
      "A": "Conduction",
      "B": "Convection",
      "C": "Radiation",
      "D": "Evaporation"
    },
    "correctAnswer": "C",
    "explanation": "辐射不需要介质，可在真空中传递热量。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-046",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "A body moves in a circle of radius 5 m at a constant speed of 10 m/s. Its centripetal acceleration is?",
    "options": {
      "A": "2 m/s²",
      "B": "5 m/s²",
      "C": "20 m/s²",
      "D": "50 m/s²"
    },
    "correctAnswer": "C",
    "explanation": "a = v²/r = 100/5 = 20 m/s²。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-047",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The momentum of a 0.5 kg object moving at 8 m/s is?",
    "options": {
      "A": "4 kg m/s",
      "B": "8 kg m/s",
      "C": "16 kg m/s",
      "D": "0.06 kg m/s"
    },
    "correctAnswer": "A",
    "explanation": "p = mv = 0.5 × 8 = 4 kg m/s。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-048",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "A machine has an efficiency of 60%. If the input work is 500 J, the output work is?",
    "options": {
      "A": "300 J",
      "B": "600 J",
      "C": "833 J",
      "D": "200 J"
    },
    "correctAnswer": "A",
    "explanation": "输出功 = 效率 × 输入功 = 0.60 × 500 = 300 J。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-049",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The pressure at a depth of 5 m in water (ρ = 1000 kg/m³, g = 10 m/s²) is?",
    "options": {
      "A": "5 × 10⁴ Pa",
      "B": "1 × 10⁵ Pa",
      "C": "5 × 10³ Pa",
      "D": "2 × 10⁵ Pa"
    },
    "correctAnswer": "A",
    "explanation": "P = ρgh = 1000 × 10 × 5 = 5 × 10⁴ Pa。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-050",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "A wave in which particles of the medium vibrate perpendicular to the direction of wave travel is?",
    "options": {
      "A": "Longitudinal wave",
      "B": "Transverse wave",
      "C": "Sound wave",
      "D": "Shock wave"
    },
    "correctAnswer": "B",
    "explanation": "横波（transverse wave）的质点振动方向与传播方向垂直。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-051",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The angle of incidence for which the angle of refraction is 90° is called the?",
    "options": {
      "A": "Critical angle",
      "B": "Polarising angle",
      "C": "Brewster angle",
      "D": "Refractive angle"
    },
    "correctAnswer": "A",
    "explanation": "临界角（critical angle）对应折射角 90°。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-052",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The resistance of a wire is directly proportional to its?",
    "options": {
      "A": "Cross-sectional area",
      "B": "Length",
      "C": "Temperature coefficient only",
      "D": "Resistivity only"
    },
    "correctAnswer": "B",
    "explanation": "R = ρL/A，电阻与长度成正比。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-053",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "A capacitor stores 0.02 C of charge at 100 V. Its capacitance is?",
    "options": {
      "A": "2 × 10⁻⁴ F",
      "B": "2 × 10⁻³ F",
      "C": "5 × 10⁻⁴ F",
      "D": "5 × 10⁻³ F"
    },
    "correctAnswer": "A",
    "explanation": "C = Q/V = 0.02/100 = 2 × 10⁻⁴ F。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-054",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The device that converts mechanical energy to electrical energy is a?",
    "options": {
      "A": "Motor",
      "B": "Generator",
      "C": "Transformer",
      "D": "Rectifier"
    },
    "correctAnswer": "B",
    "explanation": "发电机（generator）将机械能转化为电能。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-055",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The process by which a heavy nucleus splits into lighter nuclei is called?",
    "options": {
      "A": "Fusion",
      "B": "Fission",
      "C": "Radioactive decay",
      "D": "Ionisation"
    },
    "correctAnswer": "B",
    "explanation": "核裂变（fission）是重核分裂为轻核的过程。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-056",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The refractive index of a medium in which light travels at 2.0 × 10⁸ m/s is? \\[c = 3.0 × 10⁸ m/s\\]",
    "options": {
      "A": "1.5",
      "B": "2.0",
      "C": "0.67",
      "D": "1.0"
    },
    "correctAnswer": "A",
    "explanation": "n = c/v = (3.0×10⁸)/(2.0×10⁸) = 1.5。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-057",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The unit of magnetic flux is the?",
    "options": {
      "A": "Tesla",
      "B": "Weber",
      "C": "Henry",
      "D": "Gauss"
    },
    "correctAnswer": "B",
    "explanation": "磁通量的单位是韦伯（Wb）。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-058",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "A body is in equilibrium under the action of three forces. Which condition must hold?",
    "options": {
      "A": "The forces must be equal in magnitude.",
      "B": "The vector sum of the forces must be zero.",
      "C": "The forces must be parallel.",
      "D": "The forces must be perpendicular."
    },
    "correctAnswer": "B",
    "explanation": "三力平衡的条件是它们的矢量和为零。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-059",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "The latent heat of fusion of ice is 336 J/g. How much heat is needed to melt 10 g of ice at 0 °C?",
    "options": {
      "A": "33.6 J",
      "B": "336 J",
      "C": "3360 J",
      "D": "33,600 J"
    },
    "correctAnswer": "C",
    "explanation": "Q = mL = 10 × 336 = 3360 J。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  },
  {
    "id": "phy-2026-060",
    "subject": "physics",
    "year": 2026,
    "origin": "original_practice",
    "question": "A projectile is launched at 45° with a speed of 20 m/s. Its range is? (g = 10 m/s²)",
    "options": {
      "A": "20 m",
      "B": "40 m",
      "C": "80 m",
      "D": "10 m"
    },
    "correctAnswer": "B",
    "explanation": "R = u² sin 2θ / g = (20² × sin 90°)/10 = 400/10 = 40 m。 \\-\\-- 至此，2020--2026年 Chemistry 与 Physics 的题目已全部提供完毕。如果你需要其他科目（如 Biology、Mathematics、English）按同样的格式整理，可以告诉我。",
    "topic": "Physics",
    "difficulty": "medium",
    "syllabusTopic": "JAMB Physics"
  }
];

export default questions;
