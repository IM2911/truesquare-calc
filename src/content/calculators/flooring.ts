import { COMMON_SOURCES as S, type CalculatorContent } from "../types";

export const flooringContent: Record<string, CalculatorContent> = {
  "tile-calculator": {
    metaTitle: "Tile Calculator — How Many Tiles & Boxes Do I Need?",
    metaDescription:
      "Calculate floor or wall tiles with grout joints and cutting waste. Works in inches or millimetres and rounds up to full boxes, with optional cost.",
    lead: "Find how many tiles and boxes you need for a floor, wall or backsplash — including the grout joints and a realistic allowance for cuts and breakage.",
    intro: [
      "Most quick tile estimates divide the room area by the tile area and stop there. That ignores two things: the grout joint, which slightly reduces the number of tiles needed, and cutting waste, which increases it. This calculator includes both, and then rounds up to whole tiles and whole boxes.",
      "Enter tile sizes in inches or millimetres. Fractions such as 1/8 or 3/16 are accepted for joint widths.",
    ],
    howTo: [
      "Measure the area to tile, or enter the total if you have split the room into sections.",
      "Enter the actual tile size (not the nominal size) and your joint width.",
      "Choose a waste allowance: around 10 % for straight layouts, more for diagonal or herringbone patterns, large-format tile or rooms with many corners.",
      "Enter tiles per box and price per box from the packaging to see box count and cost.",
    ],
    formulas: [
      { label: "Effective tile area", expr: "a = (tile length + joint) × (tile width + joint)" },
      { label: "Tiles (exact)", expr: "n = area ÷ a" },
      { label: "Tiles to buy", expr: "N = ⌈ n × (1 + waste % ÷ 100) ⌉" },
      { label: "Boxes", expr: "boxes = ⌈ N ÷ tiles per box ⌉" },
    ],
    formulaNotes: ["Each tile occupies its own area plus half a joint on every side, which is the same as adding one full joint width to each dimension."],
    example: {
      title: "A 12 ft × 10 ft floor with 12 × 12 in tiles and 1/8 in joints",
      steps: ["Area = 120 ft² = 17,280 in²", "Effective tile = 12.125 × 12.125 = 147.0 in²", "17,280 ÷ 147.0 = 117.5 tiles", "+10 % waste = 129.3 → 130 tiles"],
      result: "Buy 130 tiles (for example 13 boxes of 10).",
    },
    assumptions: [
      "The waste allowance covers cuts and breakage; patterned layouts and tiles with directional veining may need more.",
      "Buying all tiles from the same batch (shade/lot number) is strongly recommended, so it is safer to buy a little extra now than to top up later.",
    ],
    faqs: [
      { q: "How much extra tile should I buy?", a: "About 10 % for a straight layout in a simple room, 15 % for diagonal layouts or many cuts, and up to 20 % for herringbone. Keep a few spare tiles for future repairs." },
      { q: "Do grout lines change how many tiles I need?", a: "Slightly. With small tiles and wide joints the difference can be several percent; with large tiles and narrow joints it is small. The calculator includes it automatically." },
      { q: "Should I use nominal or actual tile size?", a: "Use the actual size printed on the box. Nominal sizes are sometimes rounded." },
      { q: "How do I tile an L-shaped room?", a: "Split it into rectangles, add the areas together and use the \"I know the total area\" option." },
    ],
    sources: [S.tcna, S.nistConversion],
    related: ["grout-calculator", "shower-tile-calculator", "flooring-waste-calculator"],
    guide: "how-many-tiles-do-i-need",
    affiliate: ["tiling", "measuring", "safety"],
  },

  "shower-tile-calculator": {
    metaTitle: "Shower Tile Calculator — Walls & Tub Surrounds",
    metaDescription:
      "Calculate tiles for shower walls or a tub surround. Enter up to three walls and the tiled height, subtract windows, and include grout joints and waste.",
    lead: "Estimate tile for shower walls or a bathtub surround — back wall, side walls and tiled height — with openings subtracted.",
    intro: [
      "Showers are small but tile-hungry: many cuts around the valve, corners, niches and edges mean more waste than a plain floor. This calculator adds up the wall areas you enter, subtracts any untiled openings such as a window, and applies a higher default waste allowance of 15 %.",
    ],
    howTo: [
      "Measure the back wall and each side wall width. Enter 0 for a glass or open side.",
      "Measure the tiled height from the tray or tub to the planned top row.",
      "Subtract the area of any window or opening that will not be tiled.",
      "Enter the tile size, joint width and box details.",
    ],
    formulas: [
      { label: "Wall area", expr: "A = (back + left + right) × height − openings" },
      { label: "Tiles to buy", expr: "N = ⌈ A ÷ [(L + joint) × (W + joint)] × (1 + waste %) ⌉" },
    ],
    formulaNotes: ["The shower floor is excluded because it often uses a different (smaller) tile laid to a slope. Calculate it with the Tile Calculator."],
    example: {
      title: "60 in back wall, two 32 in sides, tiled to 84 in, 12 × 12 in tile",
      steps: ["Area = (60 + 32 + 32) × 84 = 10,416 in² = 72.3 ft²", "Effective tile with 1/8 in joint = 147.0 in² → 70.9 tiles", "+15 % waste = 81.5 → 82 tiles"],
      result: "Buy 82 tiles for the walls.",
    },
    assumptions: [
      "Niches are counted as flat wall; the extra returns inside a niche need a few more tiles — add them to the waste allowance.",
      "Waterproofing and substrate requirements are not covered; follow the tile and membrane manufacturers' installation instructions.",
    ],
    faqs: [
      { q: "How high should shower tile go?", a: "It is a design choice within the requirements of your local code and the waterproofing system. Many showers are tiled to at least the height of the shower head; floor-to-ceiling is common." },
      { q: "How much extra tile for a shower?", a: "15 % is a practical starting point because of the many cuts. Large-format tiles or complex niches may need more." },
      { q: "Does the calculator include the shower floor?", a: "No. Use the Tile Calculator for the floor, which is often tiled with smaller mosaic tile." },
    ],
    sources: [S.tcna, S.nistConversion],
    related: ["tile-calculator", "grout-calculator", "flooring-waste-calculator"],
    guide: "how-many-tiles-do-i-need",
    affiliate: ["tiling", "safety"],
  },

  "flooring-waste-calculator": {
    metaTitle: "Flooring Waste Calculator — Laminate, Vinyl & Hardwood",
    metaDescription:
      "Add the right waste factor for laminate, vinyl plank, hardwood or tile by installation pattern, then round up to full boxes with cost and spare area.",
    lead: "Turn a room's area into the amount of flooring to buy, with a waste allowance suited to the installation pattern and rounding to full boxes.",
    intro: [
      "Flooring is sold by the box, and every box covers a fixed area printed on the label. The amount you need is the room area plus a waste allowance for end cuts, defects and pattern matching. Pattern matters: a straight lay wastes far less than a herringbone.",
      "Pick the pattern to use a suggested allowance, or type your own percentage — for example, if the manufacturer's instructions recommend a specific overage.",
    ],
    howTo: [
      "Measure the room. Include closets and areas under appliances that will be floored.",
      "Choose the installation pattern, or enter a custom waste percentage.",
      "Enter the coverage per box from the packaging.",
      "Add a price per box or per square foot/metre for a cost estimate.",
    ],
    formulas: [
      { label: "Area to buy", expr: "A_buy = A × (1 + waste % ÷ 100)" },
      { label: "Boxes", expr: "boxes = ⌈ A_buy ÷ coverage per box ⌉" },
      { label: "Spare", expr: "spare = boxes × coverage − A" },
    ],
    formulaNotes: ["Suggested allowances: straight lay 5–10 %, brick bond ≈10 %, diagonal 10–15 %, herringbone/chevron 15–20 %. These are common trade rules of thumb, not manufacturer requirements."],
    example: {
      title: "A 15 ft × 12 ft room, straight lay, 20 ft² per box",
      steps: ["Area = 180 ft²", "+10 % = 198 ft²", "198 ÷ 20 = 9.9 → 10 boxes (200 ft²)", "Spare after install ≈ 20 ft²"],
      result: "Buy 10 boxes.",
    },
    assumptions: [
      "Rooms with many doorways, angled walls or stairs need more waste than the suggested values.",
      "Underlayment, transitions and trims are not included.",
    ],
    faqs: [
      { q: "What is the waste factor for laminate flooring?", a: "Around 5–10 % for a straight lay in a simple room is common. Check the manufacturer's instructions — some recommend a specific overage." },
      { q: "Why does herringbone need so much extra?", a: "Every board meeting a wall is cut at an angle, and pattern alignment produces more offcuts that cannot be reused." },
      { q: "Should I keep spare flooring?", a: "Yes. Keeping a box or a few boards from the same production lot makes repairs far easier later." },
    ],
    sources: [S.nistConversion, S.tcna],
    related: ["tile-calculator", "grout-calculator", "shower-tile-calculator"],
    affiliate: ["flooring", "measuring"],
  },

  "grout-calculator": {
    metaTitle: "Grout Calculator — How Much Grout Do I Need?",
    metaDescription:
      "Estimate grout by weight and bags from tile length, width, thickness and joint width. Imperial and metric, with editable grout density.",
    lead: "Estimate how much grout to buy, based on your tile size, tile thickness and joint width.",
    intro: [
      "Grout fills the joints between tiles, so the amount you need depends on how much joint there is: small tiles and wide, deep joints use a lot more grout than large tiles with narrow joints. This calculator uses the standard joint-volume formula and converts it to weight with an editable density, so you can match your product.",
      "Grout manufacturers publish their own coverage charts. When your product has one, use it to double-check this estimate.",
    ],
    howTo: [
      "Enter the tiled area.",
      "Enter the tile length, width and thickness. Thickness is used as the joint depth.",
      "Enter the joint width (fractions such as 1/16 or 1/8 are fine).",
      "Adjust the density if your product data sheet gives one, and enter the bag size.",
    ],
    formulas: [
      { label: "Joint length per unit area", expr: "j = (L + W) ÷ (L × W)" },
      { label: "Grout volume", expr: "V = area × j × joint width × joint depth × (1 + waste %)" },
      { label: "Grout weight", expr: "M = V × density" },
    ],
    formulaNotes: ["The default density of ≈1.6 kg/L (≈100 lb/ft³) is a typical figure for cement-based grout; epoxy and other grouts differ."],
    example: {
      title: "100 ft² of 12 × 12 in tile, 3/8 in thick, 1/8 in joints",
      steps: ["Joint length = (1 + 1) ÷ (1 × 1) = 2 ft per ft² → 200 ft = 2,400 in", "Volume = 2,400 × 0.125 × 0.375 = 112.5 in³", "+10 % = 123.75 in³ ≈ 0.072 ft³", "Weight ≈ 0.072 × 100 = 7.2 lb"],
      result: "About 7 lb of grout — one 10 lb or 25 lb bag.",
    },
    assumptions: ["Joints are assumed to be filled to the full tile thickness.", "Mosaic sheets with very small tiles may need much more grout than larger tiles of the same area."],
    faqs: [
      { q: "How much grout do I need per square foot?", a: "It depends on tile size and joint width. For 12 × 12 in tile with 1/8 in joints and 3/8 in thickness, about 0.07 lb per ft². Small mosaics can need many times more." },
      { q: "Sanded or unsanded grout?", a: "That depends on joint width and tile type; follow the grout and tile manufacturers' recommendations. The quantity calculation is the same." },
      { q: "Why is my result different from the bag's coverage chart?", a: "Charts use the manufacturer's own density and assumptions. If they differ, trust the chart for that product." },
    ],
    sources: [S.tcna, S.nistConversion],
    related: ["tile-calculator", "shower-tile-calculator", "flooring-waste-calculator"],
    guide: "how-many-tiles-do-i-need",
    affiliate: ["tiling", "safety"],
  },
};
