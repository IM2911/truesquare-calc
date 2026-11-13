import { COMMON_SOURCES as S, type CalculatorContent } from "../types";

const ROOF_SAFETY =
  "Working on roofs is dangerous. Measure pitch from a ladder at the gable end, inside the attic, or from plans whenever possible, and follow fall-protection guidance. Rafter sizing and roof structure must comply with your local building code.";

export const roofingCarpentryContent: Record<string, CalculatorContent> = {
  "roof-pitch-calculator": {
    metaTitle: "Roof Pitch Calculator — X/12 to Degrees & Slope %",
    metaDescription:
      "Convert roof pitch between X/12, degrees and percent slope. Get the pitch multiplier and rafter length from rise and run or from an angle.",
    lead: "Convert roof pitch between the US \"X in 12\" format, degrees and percentage slope — and get the pitch multiplier and rafter length.",
    intro: [
      "In the US and Canada roof pitch is usually written as rise over a run of 12 (for example 6/12), while the UK and Australia more often use degrees. Material instructions may use either, and minimum-pitch rules for shingles and tiles are stated in one or the other. This calculator converts between all three.",
      "It also gives the pitch multiplier — the factor you multiply plan (horizontal) dimensions by to get lengths and areas along the slope.",
    ],
    howTo: [
      "Choose how you know the pitch: X/12, a measured rise and run, or an angle.",
      "For rise and run, measure a horizontal distance with a level and the vertical rise over that distance; any length works.",
      "Optionally enter the horizontal run of a rafter to get its sloped length.",
    ],
    formulas: [
      { label: "Pitch (X/12)", expr: "X = 12 × rise ÷ run" },
      { label: "Angle", expr: "θ = arctan(rise ÷ run)" },
      { label: "Slope %", expr: "slope = rise ÷ run × 100" },
      { label: "Multiplier", expr: "m = √(1 + (rise ÷ run)²)" },
      { label: "Rafter length", expr: "rafter = horizontal run × m" },
    ],
    formulaNotes: ["Rafter length here is the line length along the slope; it does not include the ridge-board deduction, plumb cuts or tail details."],
    example: {
      title: "A 6/12 roof with a 15 ft horizontal rafter run",
      steps: ["Angle = arctan(6 ÷ 12) = 26.57°", "Slope = 50 %", "Multiplier = √(1 + 0.25) = 1.1180", "Rafter = 15 × 1.1180 = 16.77 ft"],
      result: "6/12 = 26.57° = 50 % slope; rafter ≈ 16.8 ft.",
    },
    assumptions: ["Rise and run must be measured in the same unit.", "Minimum pitch requirements for roofing materials come from the manufacturer and local code."],
    faqs: [
      { q: "What angle is a 4/12 roof?", a: "About 18.43°. A 6/12 roof is 26.57°, an 8/12 roof is 33.69° and a 12/12 roof is 45°." },
      { q: "What is a pitch multiplier?", a: "The ratio between a length along the roof slope and the same length measured horizontally. Multiply your footprint area by it to get roof area." },
      { q: "How do I measure roof pitch safely?", a: "Measure at a gable end from a ladder, on a rafter inside the attic, or read it from plans. Avoid walking on the roof surface without proper fall protection." },
      { q: "Is pitch the same as slope?", a: "The terms are often used interchangeably. Strictly, some trades use pitch for rise over total span; this calculator uses the common rise-over-run meaning (X/12)." },
    ],
    sources: [S.arma, S.icc, S.nistSp811],
    related: ["roof-area-calculator", "board-foot-calculator"],
    guide: "how-to-calculate-roof-pitch",
    safety: ROOF_SAFETY,
    affiliate: ["roofing", "measuring", "safety"],
  },

  "roof-area-calculator": {
    metaTitle: "Roof Area Calculator — Square Footage & Roofing Squares",
    metaDescription:
      "Estimate sloped roof area from the building footprint, overhang and pitch. Get ft², m², roofing squares and shingle bundles with waste.",
    lead: "Turn a building footprint and roof pitch into sloped roof area, roofing squares and an estimated number of shingle bundles.",
    intro: [
      "You can estimate roof area from the ground: measure the building, add the overhang, and multiply by the pitch multiplier. For any roof whose planes all share the same pitch — gable, hip or shed — the sloped area is the plan area times the multiplier, regardless of the roof shape.",
      "Roofing materials in the US and Canada are sold by the square (100 ft²); elsewhere area is normally quoted in square metres. Both are shown.",
    ],
    howTo: [
      "Measure the outside of the walls for length and width.",
      "Enter the overhang on each side (eaves and rakes).",
      "Enter the pitch as X/12, rise and run, or degrees.",
      "Choose a waste allowance and, for shingles, the number of bundles per square printed on the wrapper.",
    ],
    formulas: [
      { label: "Plan area", expr: "A_plan = (L + 2 × overhang) × (W + 2 × overhang)" },
      { label: "Roof area", expr: "A_roof = A_plan × √(1 + (rise ÷ run)²)" },
      { label: "Squares", expr: "squares = A_roof × (1 + waste %) ÷ 100 ft²" },
      { label: "Bundles", expr: "bundles = ⌈ squares × bundles per square ⌉" },
    ],
    formulaNotes: ["The plan-area method is exact for roofs with a single pitch. For mixed pitches, dormers or complex intersections, calculate each plane separately."],
    example: {
      title: "A 40 ft × 30 ft house, 12 in overhang, 6/12 pitch",
      steps: ["Plan area = 42 × 32 = 1,344 ft²", "Roof area = 1,344 × 1.1180 = 1,502.6 ft²", "+10 % waste = 1,652.9 ft² = 16.53 squares", "At 3 bundles per square: 49.6 → 50 bundles"],
      result: "About 16.5 squares, or 50 bundles of shingles.",
    },
    assumptions: [
      "Bundles per square varies by product; many asphalt shingles are packed at 3 bundles per square but check the wrapper.",
      "Starter strip, ridge caps, underlayment and flashing are not included.",
    ],
    faqs: [
      { q: "How many squares is my roof?", a: "Divide the sloped roof area in square feet by 100. A 1,500 ft² roof is 15 squares before waste." },
      { q: "How much waste should I add for roofing?", a: "Around 10 % for a simple gable roof and 15 % or more for hip roofs, valleys and dormers, where more shingles are cut." },
      { q: "Can I calculate roof area from the footprint?", a: "Yes, for roofs where all planes share one pitch: multiply the footprint (including overhangs) by the pitch multiplier." },
    ],
    sources: [S.arma, S.icc, S.nistConversion],
    related: ["roof-pitch-calculator", "board-foot-calculator"],
    guide: "how-to-calculate-roof-pitch",
    safety: ROOF_SAFETY,
    affiliate: ["roofing", "measuring", "safety"],
  },

  "board-foot-calculator": {
    metaTitle: "Board Foot Calculator — Lumber Volume & Cost",
    metaDescription:
      "Calculate board feet from thickness, width, length and quantity. Includes metric input, cubic metres, waste allowance and price per board foot.",
    lead: "Calculate board feet — the volume unit hardwood lumber is sold by in North America — and the equivalent in cubic metres.",
    intro: [
      "A board foot is a volume of wood equal to a board 1 in thick, 12 in wide and 1 ft long (144 in³). Hardwood dealers in the US and Canada price rough lumber per board foot, so knowing how to calculate it lets you compare quotes and plan purchases.",
      "Elsewhere, timber is usually sold by length or by cubic metre; this calculator shows both so you can compare.",
    ],
    howTo: [
      "Enter the thickness and width. For rough hardwood use the nominal thickness (4/4 = 1 in, 8/4 = 2 in).",
      "Enter the length and number of boards.",
      "Add a waste allowance for defects and offcuts when buying rough stock.",
      "Enter a price per board foot (or per m³ in metric) to estimate cost.",
    ],
    formulas: [
      { label: "Board feet (one board)", expr: "BF = thickness (in) × width (in) × length (ft) ÷ 12" },
      { label: "Total", expr: "BF_total = BF × quantity × (1 + waste %)" },
      { label: "Cubic metres", expr: "m³ = BF × 0.00235974" },
    ],
    formulaNotes: ["1 board foot = 144 in³ = 0.002359737 m³ exactly."],
    example: {
      title: "Ten 1 in × 6 in boards, 8 ft long, with 15 % waste",
      steps: ["Each board = 1 × 6 × 8 ÷ 12 = 4 BF", "10 boards = 40 BF", "+15 % = 46 BF"],
      result: "Buy about 46 board feet.",
    },
    assumptions: [
      "Dealers may measure board feet on rough (nominal) dimensions and apply their own rounding rules — check how your supplier measures.",
      "Dimensional softwood (2×4s, etc.) is normally sold per piece or per linear foot rather than by board foot.",
    ],
    faqs: [
      { q: "How many board feet is a 2×4×8?", a: "Using nominal dimensions, 2 × 4 × 8 ÷ 12 = 5.33 board feet. Using the actual 1.5 × 3.5 in size, it is 3.5 board feet." },
      { q: "What does 4/4 mean?", a: "Quarter-inch notation for rough hardwood thickness: 4/4 is 1 in, 5/4 is 1¼ in and 8/4 is 2 in." },
      { q: "How do I convert board feet to cubic metres?", a: "Multiply by 0.00235974. 1 m³ is about 424 board feet." },
    ],
    sources: [S.nhla, S.woodHandbook, S.nistConversion],
    related: ["board-and-batten-calculator", "roof-pitch-calculator"],
    affiliate: ["woodworking", "measuring", "safety"],
  },

  "board-and-batten-calculator": {
    metaTitle: "Board and Batten Calculator — Spacing & Materials",
    metaDescription:
      "Plan a board and batten accent wall: number of battens, exact equal spacing, top and bottom rails, total linear feet and boards to buy.",
    lead: "Plan a board-and-batten accent wall: how many battens to use, the exact equal gap between them, and how many boards to buy.",
    intro: [
      "The look of a board-and-batten wall depends on even spacing. Picking a nice gap such as 16 in rarely divides your wall exactly, so the last space ends up narrower than the rest. This calculator chooses the number of battens closest to your target gap and then works out the exact equal gap for your wall, with battens flush at both edges.",
      "It also totals the vertical battens and optional top and bottom rails, and estimates how many stock boards to buy.",
    ],
    howTo: [
      "Enter the wall width and the height of the paneled area.",
      "Enter the batten face width (a nominal 1×4 is about 3.5 in / 89 mm).",
      "Enter your preferred gap; the result gives the exact gap to mark out.",
      "Choose whether to include top and bottom rails, and enter the length of the boards you will buy.",
    ],
    formulas: [
      { label: "Number of gaps", expr: "g = round[(W − b) ÷ (s + b)]" },
      { label: "Battens", expr: "n = g + 1" },
      { label: "Exact gap", expr: "gap = (W − n × b) ÷ g" },
      { label: "Batten length", expr: "each = H − 2 × b (with rails), else H" },
    ],
    formulaNotes: ["W = wall width, b = batten width, s = target gap, H = height. Boards are counted so that each vertical batten is a single uncut piece when the stock length allows."],
    example: {
      title: "A 12 ft wide, 8 ft high wall with 3.5 in battens and a 16 in target gap",
      steps: ["Gaps = round[(144 − 3.5) ÷ 19.5] = round(7.2) = 7", "Battens = 8; exact gap = (144 − 8 × 3.5) ÷ 7 = 16.57 in", "Verticals = 8 × 89 in = 59.3 ft; rails = 2 × 12 ft = 24 ft", "8 ft boards: 9 for verticals (with 10 % waste) + 4 for rails = 13"],
      result: "8 battens spaced 16 9/16 in apart; buy 13 eight-foot boards.",
    },
    assumptions: [
      "Battens are installed flush with both wall edges. Outlets, switches and windows are not accounted for.",
      "Rails are assumed to be the same width as the battens.",
    ],
    faqs: [
      { q: "What is the best spacing for board and batten?", a: "It is a design choice; gaps of roughly 12–24 in (30–60 cm) are common for interior accent walls. Use the calculator to make every gap equal." },
      { q: "What size boards should I use for battens?", a: "1×3 or 1×4 boards (or MDF strips) are common for interior walls. Wider battens give a bolder look." },
      { q: "Do I need top and bottom rails?", a: "Many designs use a top rail or a ledge and the existing baseboard as the bottom rail. Choose \"vertical battens only\" if you are keeping the baseboard." },
    ],
    sources: [S.nistConversion],
    related: ["board-foot-calculator", "flooring-waste-calculator"],
    affiliate: ["woodworking", "measuring", "safety"],
  },
};
