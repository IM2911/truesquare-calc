import { COMMON_SOURCES as S, type CalculatorContent } from "../types";

const BULK_HOWTO = [
  "Choose the shape of the area: rectangle, circle, or enter a total area you have already measured.",
  "Enter the dimensions and the depth you want once the material is in place.",
  "Check the density (for weight) — the default is a typical value; your supplier can give you the exact figure.",
  "Keep or adjust the allowance for compaction, settling and waste.",
  "Enter prices the way your supplier quotes them — per ton/tonne, per cubic yard/metre, or per bag.",
];

export const landscapingContent: Record<string, CalculatorContent> = {
  "gravel-calculator": {
    metaTitle: "Gravel Calculator — Tons, Tonnes & Cubic Yards",
    metaDescription:
      "Estimate gravel and crushed stone in cubic yards, m³, US tons or tonnes for paths, beds and bases. Editable density, compaction allowance and cost.",
    lead: "Calculate how much gravel or crushed stone you need by volume and by weight, for any rectangular, circular or measured area.",
    intro: [
      "Quarries and landscape yards sell gravel by weight (US tons or metric tonnes) or by volume (cubic yards or cubic metres), and the conversion between the two depends on the stone's bulk density. Many calculators hide that number. This one shows it and lets you change it, so you can use the exact figure your supplier gives you.",
      "The default density of 105 lb/ft³ (about 1,680 kg/m³, or roughly 1.4 US tons per cubic yard) is a commonly used figure for crushed stone. Rounded river gravel, larger stone and wet material can be noticeably different.",
    ],
    howTo: BULK_HOWTO,
    formulas: [
      { label: "Area", expr: "A = length × width   or   π × (diameter ÷ 2)²" },
      { label: "Volume", expr: "V = A × depth × (1 + allowance % ÷ 100)" },
      { label: "Weight", expr: "W = V × density" },
      { label: "Cost", expr: "cost = W × price per ton   or   V × price per yd³" },
    ],
    formulaNotes: [
      "1 US ton = 2,000 lb = 907.18 kg. 1 tonne = 1,000 kg ≈ 1.10 US tons. The UK long ton (2,240 lb) is not used here.",
      "105 lb/ft³ × 27 ft³/yd³ = 2,835 lb per cubic yard ≈ 1.42 US tons per cubic yard.",
    ],
    example: {
      title: "A 20 ft × 10 ft path, 3 in deep",
      steps: [
        "Area = 200 ft²; volume = 200 × 0.25 = 50 ft³",
        "Add 10 % for compaction: 55 ft³ = 2.04 yd³",
        "Weight = 55 × 105 lb = 5,775 lb = 2.89 US tons",
      ],
      result: "Order about 2 yd³, or 2.9 US tons, of gravel.",
    },
    assumptions: [
      "Density is a typical value unless you change it. Ask the supplier for their product's density or tons-per-yard figure.",
      "The allowance covers compaction and spreading losses; very loose or very coarse stone may compact more.",
      "Weight figures are for dry-to-moist material; saturated stone weighs more.",
    ],
    faqs: [
      { q: "How much does a cubic yard of gravel weigh?", a: "Commonly about 1.4 US tons (around 2,800 lb), but it ranges roughly from 1.3 to 1.7 tons depending on stone type, size and moisture. Use your supplier's figure when you have it." },
      { q: "How deep should gravel be?", a: "Decorative paths and beds are often 2–3 in (5–8 cm). Driveways and bases are deeper and usually laid in compacted layers — see the Gravel Driveway Calculator." },
      { q: "How many square feet does a ton of gravel cover?", a: "At 2 in deep and 105 lb/ft³, one US ton (2,000 lb) is about 19 ft³, which covers roughly 114 ft². Deeper layers cover proportionally less." },
      { q: "Tons or yards — which should I order?", a: "Order in whatever unit your supplier sells, and use this calculator to convert. If they sell by weight, ask what density they use so your numbers match." },
    ],
    sources: [S.nistConversion, S.quikrete],
    related: ["pea-gravel-calculator", "gravel-driveway-calculator", "cubic-yard-calculator", "topsoil-calculator"],
    guide: "how-to-calculate-gravel-for-a-driveway",
    affiliate: ["landscaping", "measuring", "safety"],
  },

  "pea-gravel-calculator": {
    metaTitle: "Pea Gravel Calculator — Bags, Tons & Cubic Yards",
    metaDescription:
      "How much pea gravel do you need? Get cubic yards, m³, weight and number of bags for patios, paths and play areas. Editable density and bag size.",
    lead: "Estimate pea gravel for patios, walkways, dog runs and play areas — by volume, by weight, or in bags.",
    intro: [
      "Pea gravel is small, rounded stone that is pleasant underfoot and drains well. Because it is rounded it does not lock together like crushed stone, so it is usually laid inside an edging and topped up over time.",
      "Pea gravel is sold in bulk by weight or volume, and in bags for smaller areas. Enter the volume printed on your bags (0.5 ft³ is common in the US; 20–25 kg bags are common elsewhere) to see how many you need.",
    ],
    howTo: BULK_HOWTO,
    formulas: [
      { label: "Volume", expr: "V = area × depth × (1 + allowance % ÷ 100)" },
      { label: "Weight", expr: "W = V × density (default 95 lb/ft³ ≈ 1,520 kg/m³)" },
      { label: "Bags", expr: "bags = ⌈ V ÷ bag volume ⌉" },
    ],
    formulaNotes: ["If your bags are labelled by weight only, divide the bag weight by the density to estimate the bag volume."],
    example: {
      title: "A 20 ft × 10 ft patio, 3 in deep",
      steps: ["Volume = 200 ft² × 0.25 ft = 50 ft³; +10 % = 55 ft³ (2.04 yd³)", "Weight = 55 × 95 = 5,225 lb = 2.61 US tons", "Bags of 0.5 ft³: 55 ÷ 0.5 = 110 bags"],
      result: "About 2 yd³ in bulk, or 110 half-cubic-foot bags.",
    },
    assumptions: [
      "Default density is a typical figure for pea gravel; it varies with stone size and moisture.",
      "For play areas, required depth depends on equipment fall height and local safety standards — follow the relevant guidance for your country.",
    ],
    faqs: [
      { q: "How deep should pea gravel be for a patio?", a: "Around 3 in (7–8 cm) over a compacted base is a common choice for patios and paths. Thinner layers can let the base show through as the stone moves." },
      { q: "How many bags of pea gravel are in a cubic yard?", a: "With 0.5 ft³ bags, one cubic yard (27 ft³) is 54 bags." },
      { q: "Does pea gravel need landscape fabric?", a: "Many installers use a geotextile separator under gravel to stop it mixing with the soil, but it is not always required. Edging matters more for pea gravel because it migrates." },
    ],
    sources: [S.nistConversion],
    related: ["gravel-calculator", "gravel-driveway-calculator", "mulch-calculator", "cubic-yard-calculator"],
    affiliate: ["landscaping", "measuring"],
  },

  "gravel-driveway-calculator": {
    metaTitle: "Gravel Driveway Calculator — Tons per Layer & Truckloads",
    metaDescription:
      "Plan a gravel driveway in layers. Calculates stone for base, middle and surface courses with compaction allowance, total tons or tonnes and truckloads.",
    lead: "Calculate stone for a layered gravel driveway, including a compaction allowance, the weight of each layer and how many truckloads to order.",
    intro: [
      "A durable gravel driveway is normally built in layers: larger stone at the bottom for strength and drainage, a middle layer, and a finer surface layer that compacts into a firm driving surface. Each layer is spread and compacted before the next is placed, so the loose stone you order must be more than the finished geometric volume.",
      "This calculator works out each layer separately, applies a compaction allowance, totals the weight and, if you know your supplier's truck capacity, tells you how many loads to expect.",
    ],
    howTo: [
      "Enter the driveway length and width.",
      "Enter the finished (compacted) depth of each layer; set any layer you are not using to 0.",
      "Keep or adjust the compaction allowance (10–20 % is commonly used for crushed stone).",
      "Enter the density your supplier uses, plus truck capacity and price per ton/tonne if known.",
    ],
    formulas: [
      { label: "Area", expr: "A = length × width" },
      { label: "Each layer", expr: "V_layer = A × layer depth × (1 + compaction % ÷ 100)" },
      { label: "Weight", expr: "W = Σ V_layer × density" },
      { label: "Truckloads", expr: "loads = ⌈ W ÷ truck capacity ⌉" },
    ],
    formulaNotes: ["Layer depths are compacted depths. The compaction allowance converts them into the loose quantity you need to order."],
    example: {
      title: "A 50 ft × 10 ft driveway: 4 in base, 4 in middle, 2 in top",
      steps: [
        "Area = 500 ft²; total depth = 10 in",
        "Volume = 500 × 10 ÷ 12 = 416.7 ft³; +10 % = 458.3 ft³ (16.98 yd³)",
        "Weight at 105 lb/ft³ = 48,125 lb ≈ 24.1 US tons",
      ],
      result: "About 24 US tons of stone in total, split across three layers.",
    },
    assumptions: [
      "One density is applied to all layers. If your base stone and surface stone differ, run the calculator once per layer.",
      "Driveway design (layer thickness, stone grading, drainage, geotextile) depends on soil, traffic and climate. Get local advice for heavy vehicles or poor soils.",
      "Truck capacity varies by vehicle and local weight limits — ask your supplier.",
    ],
    faqs: [
      { q: "How thick should a gravel driveway be?", a: "Layer thicknesses vary widely with soil and traffic. Many residential driveways use a total of roughly 8–12 in (20–30 cm) of compacted stone in two or three layers, but soft soils may need more. Follow local advice." },
      { q: "How many tons of gravel do I need for a driveway?", a: "Multiply length × width × total depth to get volume, add a compaction allowance, then multiply by the stone's density. The example above — 50 × 10 ft at 10 in — needs about 24 US tons." },
      { q: "What is the compaction allowance for?", a: "Loose stone shrinks in volume when it is compacted. Ordering 10–20 % more than the finished volume prevents running short." },
      { q: "Can I use one type of stone for every layer?", a: "Some driveways do, but larger stone in the base improves drainage and load-spreading, while a graded surface stone compacts into a firmer top. Ask your supplier what is available locally." },
    ],
    sources: [S.nistConversion],
    related: ["gravel-calculator", "pea-gravel-calculator", "concrete-slab-calculator", "cubic-yard-calculator"],
    guide: "how-to-calculate-gravel-for-a-driveway",
    safety: "Driveway layer depths are planning estimates. Subgrade preparation and drainage determine how long a driveway lasts; for steep sites, soft ground or heavy vehicles, consult a local contractor or engineer.",
    affiliate: ["landscaping", "measuring", "safety"],
  },

  "mulch-calculator": {
    metaTitle: "Mulch Calculator — Cubic Yards & Bags for Garden Beds",
    metaDescription:
      "How much mulch do you need? Enter bed size and depth to get cubic yards, m³ and number of bags. Supports rectangles, circles and measured areas.",
    lead: "Find how much mulch your garden beds need, in cubic yards, cubic metres or bags, at the depth you choose.",
    intro: [
      "Mulch is sold by volume: bulk by the cubic yard (US) or cubic metre, and bagged by the cubic foot or litre. Coverage depends only on area and depth, so once you have measured your beds the calculation is simple — but it is easy to mix up inches and feet. This calculator handles the units and rounds bags up for you.",
      "Horticultural guidance commonly recommends a layer of around 2–4 in (5–10 cm) for most beds, kept clear of plant stems and tree trunks.",
    ],
    howTo: [
      "Measure each bed. For irregular beds, split them into rectangles and circles or enter the total area.",
      "Enter the depth you want. Topping up an existing layer usually needs less than a new bed.",
      "Enter the volume printed on your bags to get a bag count.",
      "Add bulk or bag prices to compare costs.",
    ],
    formulas: [
      { label: "Volume", expr: "V = area × depth × (1 + allowance % ÷ 100)" },
      { label: "Bags", expr: "bags = ⌈ V ÷ bag volume ⌉" },
      { label: "Bags per cubic yard", expr: "27 ÷ bag volume in ft³ (13.5 two-cubic-foot bags)" },
    ],
    formulaNotes: ["Mulch weight varies enormously with material and moisture, so this calculator works by volume only."],
    example: {
      title: "A 20 ft × 4 ft bed at 3 in",
      steps: ["Area = 80 ft²; volume = 80 × 0.25 = 20 ft³", "+5 % allowance = 21 ft³ = 0.78 yd³", "2 ft³ bags: 21 ÷ 2 = 10.5 → 11 bags"],
      result: "About 0.8 yd³ in bulk, or 11 two-cubic-foot bags.",
    },
    assumptions: ["Fresh mulch settles and decomposes; the small allowance covers initial settling only.", "Bag volumes are as printed by the manufacturer."],
    faqs: [
      { q: "How many bags of mulch are in a yard?", a: "13.5 bags of 2 ft³, 9 bags of 3 ft³, or about 15 bags of 50 L." },
      { q: "How much area does a yard of mulch cover?", a: "At 3 in deep, one cubic yard covers 108 ft²; at 2 in it covers 162 ft²." },
      { q: "How deep should mulch be?", a: "Around 2–4 in (5–10 cm) is a widely recommended range. Keep mulch away from stems and trunks to avoid rot." },
      { q: "Is bulk mulch cheaper than bags?", a: "For larger areas bulk delivery is often cheaper per cubic yard, but delivery fees apply. Enter both prices to compare for your job." },
    ],
    sources: [S.rhsMulch, S.nistConversion],
    related: ["topsoil-calculator", "gravel-calculator", "pea-gravel-calculator", "cubic-yard-calculator"],
    guide: "how-much-mulch-do-i-need",
    affiliate: ["landscaping", "measuring"],
  },

  "topsoil-calculator": {
    metaTitle: "Topsoil Calculator — Cubic Yards, Tons & Bags",
    metaDescription:
      "Calculate topsoil for lawns, raised beds and levelling. Get volume, weight and bags with a settling allowance and editable density.",
    lead: "Work out how much topsoil you need for a new lawn, raised bed or levelling job — by volume, by weight or in bags.",
    intro: [
      "Topsoil is sold by volume or by weight, and loose soil settles noticeably once it is spread, watered and walked on. This calculator adds a settling allowance and lets you set the density, which matters because moist soil can weigh much more than dry soil.",
    ],
    howTo: BULK_HOWTO,
    formulas: [
      { label: "Volume", expr: "V = area × depth × (1 + settling % ÷ 100)" },
      { label: "Weight", expr: "W = V × density (default 75 lb/ft³ ≈ 1,200 kg/m³)" },
      { label: "Bags", expr: "bags = ⌈ V ÷ bag volume ⌉" },
    ],
    formulaNotes: ["75 lb/ft³ × 27 = 2,025 lb per cubic yard, i.e. roughly one US ton per cubic yard — a figure often quoted for screened topsoil."],
    example: {
      title: "A 20 ft × 10 ft area, 4 in deep",
      steps: ["Volume = 200 × (4 ÷ 12) = 66.7 ft³", "+10 % settling = 73.3 ft³ = 2.72 yd³", "Weight = 73.3 × 75 = 5,500 lb = 2.75 US tons", "0.75 ft³ bags: 73.3 ÷ 0.75 = 97.8 → 98 bags"],
      result: "About 2.75 yd³ in bulk — clearly cheaper than 98 bags for most buyers.",
    },
    assumptions: [
      "Density varies with soil type, organic content and moisture; wet soil can be far heavier.",
      "Settling allowance is a rule of thumb. Raised beds filled with loose mixes may settle more.",
    ],
    faqs: [
      { q: "How much does a yard of topsoil weigh?", a: "Often roughly one US ton when dry to moist, and more when wet. Ask your supplier if weight matters for delivery or hauling." },
      { q: "How much topsoil do I need for a new lawn?", a: "Depth recommendations vary; many guides suggest several inches of good topsoil for seeding or turf. Enter your chosen depth to get the quantity." },
      { q: "Why add extra for settling?", a: "Loose soil contains air pockets. After spreading, rolling and watering it consolidates, so without extra you will end up below your target level." },
    ],
    sources: [S.nistConversion, S.rhsMulch],
    related: ["mulch-calculator", "gravel-calculator", "cubic-yard-calculator", "pea-gravel-calculator"],
    affiliate: ["landscaping", "measuring"],
  },
};
