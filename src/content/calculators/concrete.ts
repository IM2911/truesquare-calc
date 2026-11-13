import { COMMON_SOURCES as S, type CalculatorContent } from "../types";

const CONCRETE_SAFETY =
  "Concrete quantities are estimates. Slab thickness, reinforcement, sub-base and footing sizes are structural decisions: follow your plans, a qualified engineer and your local building code (for example the IRC/IBC in the US, Building Regulations in the UK, the NBC in Canada or the NCC in Australia).";

export const concreteContent: Record<string, CalculatorContent> = {
  "concrete-calculator": {
    metaTitle: "Concrete Calculator — Cubic Yards, m³ & Bags",
    metaDescription:
      "Free concrete calculator for slabs, footings, columns, tubes and steps. Get cubic yards, cubic metres, bag counts and cost with waste included.",
    lead: "Enter the shape and size of your pour to get the concrete volume in cubic yards and cubic metres, plus how many pre-mixed bags it would take.",
    intro: [
      "Ordering concrete is one of the few DIY steps where a mistake is expensive in both directions: run short and you risk a cold joint in the middle of a pour; over-order and you pay for material you have to dispose of. This calculator handles the four shapes that cover most residential work — rectangular slabs, footings and walls; round columns and post holes; hollow tubes; and solid steps.",
      "Results are shown in both imperial and metric, so the same page works whether your supplier quotes by the cubic yard (US) or the cubic metre (UK, Canada, Australia). Bag counts use the yield printed on your bag when you enter it, or a clearly labelled typical estimate when you don't.",
    ],
    howTo: [
      "Choose what you are pouring: slab/footing/wall, round column, tube or steps.",
      "Enter the dimensions. Use the unit toggle to switch between feet/inches and metres/centimetres at any time — your values are converted automatically.",
      "Set how many identical pours you need (for example, 8 post holes).",
      "Adjust the waste allowance. 5–10 % is typical; use more on uneven ground.",
      "Optionally enter your bag size and the yield printed on the bag, and your local prices, to see bag counts and cost.",
    ],
    formulas: [
      { label: "Rectangular slab, footing or wall", expr: "V = length × width × thickness" },
      { label: "Round column or post hole", expr: "V = π × (diameter ÷ 2)² × height" },
      { label: "Hollow tube", expr: "V = π × height × [(outer ÷ 2)² − (inner ÷ 2)²]" },
      { label: "Solid steps (n steps)", expr: "V = width × run × rise × n × (n + 1) ÷ 2" },
      { label: "Order quantity", expr: "V_order = V × quantity × (1 + waste % ÷ 100)" },
      { label: "Bags", expr: "bags = ⌈ V_order ÷ yield per bag ⌉" },
    ],
    formulaNotes: [
      "All dimensions are converted to metres first, the volume is calculated in cubic metres, then converted: 1 yd³ = 27 ft³ = 0.764555 m³ (exact by definition of the international yard).",
      "Bag counts are always rounded up — you cannot buy part of a bag.",
      "Weight in place uses about 2,400 kg/m³ (≈150 lb/ft³), a common figure for normal-weight concrete. It is shown for planning lifting and hauling only.",
    ],
    example: {
      title: "A 10 ft × 10 ft patio slab, 4 in thick",
      steps: [
        "Volume = 10 ft × 10 ft × (4 ÷ 12) ft = 33.33 ft³",
        "33.33 ft³ ÷ 27 = 1.23 yd³ (0.94 m³)",
        "Add 10 % waste: 1.23 × 1.10 = 1.36 yd³ (36.67 ft³)",
        "80 lb bags at 0.60 ft³ each: 36.67 ÷ 0.60 = 61.1 → 62 bags",
      ],
      result: "Order about 1.36 yd³ of ready-mix, or buy 62 × 80 lb bags.",
    },
    assumptions: [
      "Forms are straight and the sub-base is level. Uneven ground can add several percent to the volume.",
      "Steps are modelled as solid blocks sitting on grade; a platform or landing should be added as a separate slab.",
      "Typical bag yields (40 lb ≈ 0.30 ft³, 50 lb ≈ 0.375 ft³, 60 lb ≈ 0.45 ft³, 80 lb ≈ 0.60 ft³) are commonly printed on US pre-mix, but products differ. Metric bag yields are estimated from the same ratio (≈0.47 L per kg of dry mix).",
      "Costs are only as accurate as the prices you enter. Delivery fees, short-load charges and pump hire are not included.",
    ],
    faqs: [
      { q: "How many 80 lb bags make a cubic yard?", a: "At a typical yield of 0.60 ft³ per 80 lb bag, one cubic yard (27 ft³) takes 27 ÷ 0.60 = 45 bags. Check the yield printed on your product, because some mixes differ." },
      { q: "How much waste should I add?", a: "5–10 % is a common allowance for spillage, slight over-excavation and form movement. Increase it for irregular excavations or when you cannot easily get a top-up delivery." },
      { q: "Should I use bags or ready-mix?", a: "Bags are practical for small jobs such as post holes, small pads and repairs. Once a pour needs more than about a cubic yard (≈0.75 m³), ready-mix delivery is usually less work and gives a more consistent pour. Compare both using your local prices." },
      { q: "Does this calculator size my footing or slab?", a: "No. It calculates the volume of the dimensions you enter. Required thickness, footing size and reinforcement depend on loads, soil and your local code, and should come from your plans or a qualified professional." },
      { q: "Why is my supplier's number slightly different?", a: "Suppliers often round to the nearest quarter or half yard and may include their own overage. Use this result to sanity-check the quote rather than to replace your supplier's advice." },
    ],
    sources: [S.nistConversion, S.quikrete, S.sakrete, S.pca, S.aci],
    related: ["concrete-slab-calculator", "concrete-bag-calculator", "cubic-yard-calculator", "gravel-calculator"],
    guide: "how-much-concrete-do-i-need",
    safety: CONCRETE_SAFETY,
    affiliate: ["concrete", "measuring", "safety"],
  },

  "concrete-slab-calculator": {
    metaTitle: "Concrete Slab Calculator — Patio, Shed Base & Driveway",
    metaDescription:
      "Calculate concrete for a slab in cubic yards or m³. Includes waste, bag counts for common sizes, coverage per yard and optional cost.",
    lead: "Work out exactly how much concrete a rectangular slab needs — for a patio, shed base, walkway or garage pad — and compare bagged mix with ready-mix.",
    intro: [
      "A slab is the most common concrete project, and also the easiest to get slightly wrong: a thickness of 4 in instead of 3.5 in changes the volume by more than 14 %. This calculator focuses on rectangular slabs and adds the numbers you need when ordering: coverage per cubic yard (or cubic metre) at your thickness, and bag counts at your bag size and at the other common sizes.",
    ],
    howTo: [
      "Measure the inside of your formwork for length and width.",
      "Enter the finished slab thickness. Check several points if the sub-base is not perfectly level and use the average.",
      "Keep 10 % waste for most jobs, or adjust to suit your site.",
      "Enter your bag size (and its printed yield if you have it) and local prices to compare options.",
    ],
    formulas: [
      { label: "Slab area", expr: "A = length × width" },
      { label: "Slab volume", expr: "V = A × thickness" },
      { label: "With waste", expr: "V_order = V × (1 + waste % ÷ 100)" },
      { label: "Coverage", expr: "area per unit volume = 1 ÷ thickness" },
    ],
    formulaNotes: [
      "Coverage tells you how much slab one cubic yard or one cubic metre covers at your chosen thickness. At 4 in, 1 yd³ covers 81 ft²; at 100 mm, 1 m³ covers 10 m².",
      "Thickness is entered in inches (imperial) or centimetres (metric) and converted to metres internally.",
    ],
    example: {
      title: "A 12 ft × 12 ft shed base, 4 in thick",
      steps: [
        "Area = 12 × 12 = 144 ft²",
        "Volume = 144 × (4 ÷ 12) = 48 ft³ = 1.78 yd³",
        "With 10 % waste: 52.8 ft³ = 1.96 yd³",
        "80 lb bags (0.60 ft³): 52.8 ÷ 0.60 = 88 bags; 60 lb bags (0.45 ft³): 117.3 → 118 bags",
      ],
      result: "About 2 yd³ of ready-mix, or 88 × 80 lb bags.",
    },
    assumptions: [
      "The slab is a simple rectangle of constant thickness. Thickened edges, footings or haunches must be added separately (use the Concrete Calculator for each part).",
      "Bag yields are typical estimates unless you enter your product's printed yield.",
      "Sub-base (gravel), vapour barrier, reinforcement and formwork are not included — see the Gravel Calculator for the base layer.",
    ],
    faqs: [
      { q: "How thick should a concrete slab be?", a: "Around 4 in (100 mm) is common for patios and paths, while driveways and slabs carrying vehicles are usually thicker. Required thickness depends on loads, soil and local rules, so follow your plans or code." },
      { q: "How many square feet does a yard of concrete cover?", a: "At 4 in thick, one cubic yard covers 81 ft². At 6 in it covers 54 ft². The calculator shows this coverage for your thickness." },
      { q: "Is it cheaper to mix bags myself?", a: "For very small slabs, bags avoid delivery minimums. For larger slabs, ready-mix usually costs less per cubic yard and saves a great deal of labour. Enter both prices to compare." },
      { q: "Do I need a gravel base under the slab?", a: "Many slabs are placed on a compacted granular sub-base, but requirements vary by soil and project. Your plans or local code should specify it; the Gravel Calculator can estimate the stone." },
    ],
    sources: [S.nistConversion, S.quikrete, S.pca, S.icc, S.ukBuildingRegs],
    related: ["concrete-calculator", "concrete-bag-calculator", "gravel-calculator", "cubic-yard-calculator"],
    guide: "how-much-concrete-do-i-need",
    safety: CONCRETE_SAFETY,
    affiliate: ["concrete", "measuring", "safety"],
  },

  "concrete-bag-calculator": {
    metaTitle: "Concrete Bag Calculator — 40, 50, 60 & 80 lb or 20–30 kg",
    metaDescription:
      "How many bags of concrete do you need? Enter the volume or dimensions and your bag's printed yield. Compares 40, 50, 60, 80 lb and 20–40 kg bags.",
    lead: "Find how many bags of pre-mixed concrete a job needs, using the yield from your bag label, and compare bag sizes side by side.",
    intro: [
      "Bagged concrete is sold by dry weight, but what you need to know is how much volume each bag produces once mixed. That figure — the yield — is printed on most bags. This calculator lets you enter it directly, so the result matches the exact product you are buying.",
      "If you leave the yield blank, the calculator uses a typical estimate (an 80 lb bag ≈ 0.60 ft³) and says so in the results. It also shows how many bags you would need at the other common sizes, which helps when deciding between lighter bags that are easier to carry and heavier bags that mean fewer trips.",
    ],
    howTo: [
      "Enter the job as length × width × depth, or type in a volume you already know.",
      "Enter the bag size you plan to buy.",
      "Copy the yield from the bag (for example \"yields 0.60 cu ft\") into the yield field for the most accurate count.",
      "Add your price per bag to see the cost and the total weight you will be handling.",
    ],
    formulas: [
      { label: "Volume", expr: "V = length × width × depth (or entered directly)" },
      { label: "With waste", expr: "V_order = V × (1 + waste % ÷ 100)" },
      { label: "Bags", expr: "bags = ⌈ V_order ÷ yield per bag ⌉" },
      { label: "Typical metric yield estimate", expr: "yield ≈ bag mass (kg) × 0.000468 m³/kg  (≈ 9.4 L for 20 kg)" },
    ],
    formulaNotes: [
      "The metric estimate is derived from the common US figure of 0.60 ft³ per 80 lb (36.3 kg) and is only a fallback. Products sold in the UK, Canada and Australia list their own yields.",
    ],
    example: {
      title: "A 6 ft × 4 ft pad, 4 in deep",
      steps: [
        "Volume = 6 × 4 × (4 ÷ 12) = 8 ft³",
        "With 10 % waste = 8.8 ft³",
        "80 lb bags at 0.60 ft³: 8.8 ÷ 0.60 = 14.7 → 15 bags",
        "Compare: 60 lb → 20 bags, 50 lb → 24 bags, 40 lb → 30 bags",
      ],
      result: "Buy 15 × 80 lb bags (about 1,200 lb to carry).",
    },
    assumptions: [
      "Yields vary by product type (standard, high-strength, fast-setting) and manufacturer; always prefer the printed figure.",
      "Comparison rows for other bag sizes use typical estimated yields.",
      "Bags are rounded up individually; buying one spare bag is often worthwhile for small jobs.",
    ],
    faqs: [
      { q: "How much does an 80 lb bag of concrete make?", a: "Many US 80 lb bags of standard mix state a yield of about 0.60 ft³ (≈17 L). Check your bag — specialist mixes can differ." },
      { q: "How many bags for a fence post?", a: "Calculate the hole volume (use the round column option in the Concrete Calculator), subtract the post volume if you wish, then divide by the bag yield. Fast-setting post mixes often state their own yield per hole size." },
      { q: "Are 60 lb bags better than 80 lb bags?", a: "They produce less concrete each, so you need more of them, but they are easier to lift. The total weight carried is similar; choose what you can handle safely." },
      { q: "Why does the calculator say the yield is estimated?", a: "Because you left the yield field blank. Enter the yield printed on your product and the note disappears." },
    ],
    sources: [S.quikrete, S.sakrete, S.nistConversion],
    related: ["concrete-calculator", "concrete-slab-calculator", "cubic-yard-calculator"],
    guide: "how-much-concrete-do-i-need",
    safety: "Cement is alkaline and can cause skin burns; wear gloves, eye protection and a dust mask when mixing. Follow the safety information on the bag.",
    affiliate: ["concrete", "safety"],
  },

  "cubic-yard-calculator": {
    metaTitle: "Cubic Yard Calculator — Yards, Cubic Feet & m³",
    metaDescription:
      "Convert length, width and depth into cubic yards, cubic feet and cubic metres for soil, mulch, gravel, concrete or fill. Rectangles and circles.",
    lead: "Turn any length × width × depth into cubic yards, cubic feet and cubic metres — the units bulk materials are actually sold in.",
    intro: [
      "Landscape yards, ready-mix plants and haulers in the US sell by the cubic yard, while most of the rest of the world uses the cubic metre. Mixing feet for the area with inches for the depth is where most mistakes happen. This calculator takes care of every conversion and works for any bulk material.",
    ],
    howTo: [
      "Pick a rectangle or a circle.",
      "Enter length and width (or diameter) in feet or metres, and the depth in inches or centimetres.",
      "Set a quantity if you have several identical areas, and an extra allowance if needed.",
      "Optionally add a price per cubic yard or per cubic metre.",
    ],
    formulas: [
      { label: "Rectangle", expr: "V = length × width × depth" },
      { label: "Circle", expr: "V = π × (diameter ÷ 2)² × depth" },
      { label: "Cubic feet to cubic yards", expr: "yd³ = ft³ ÷ 27" },
      { label: "Cubic yards to cubic metres", expr: "m³ = yd³ × 0.764555" },
    ],
    formulaNotes: ["A cubic yard is a cube 3 ft on each side: 3 × 3 × 3 = 27 ft³. Since 1 yd = 0.9144 m exactly, 1 yd³ = 0.764554857984 m³."],
    example: {
      title: "A 10 ft × 10 ft area, 6 in deep",
      steps: ["Volume = 10 × 10 × 0.5 = 50 ft³", "50 ÷ 27 = 1.85 yd³", "1.85 × 0.764555 = 1.42 m³"],
      result: "1.85 cubic yards (50 ft³ or 1.42 m³).",
    },
    assumptions: ["Volume is geometric (bank volume). Loose materials may need an extra allowance for compaction or settling — use the material-specific calculators for that."],
    faqs: [
      { q: "How many cubic feet are in a cubic yard?", a: "27 cubic feet, because a cubic yard measures 3 ft × 3 ft × 3 ft." },
      { q: "How do I calculate cubic yards from square feet?", a: "Multiply the area in square feet by the depth in feet (inches ÷ 12), then divide by 27. For example, 300 ft² at 3 in deep is 300 × 0.25 ÷ 27 = 2.78 yd³." },
      { q: "How much does a cubic yard weigh?", a: "It depends entirely on the material: mulch may be a few hundred pounds, topsoil around a ton, gravel around 1.4 tons, and concrete about 2 tons. Use the material calculators for weight." },
      { q: "Is a cubic yard the same as a cubic metre?", a: "No. A cubic metre is about 1.31 cubic yards, so a cubic yard is roughly three-quarters of a cubic metre." },
    ],
    sources: [S.nistConversion, S.nistSp811],
    related: ["concrete-calculator", "gravel-calculator", "mulch-calculator", "topsoil-calculator"],
    guide: "cubic-yards-vs-cubic-feet",
    affiliate: ["measuring"],
  },
};
