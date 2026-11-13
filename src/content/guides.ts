import { COMMON_SOURCES as S, type Source } from "./types";

export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  ordered?: boolean;
  table?: { head: string[]; rows: string[][] };
  formula?: string;
}

export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  published: string;
  updated: string;
  summary: string;
  sections: GuideSection[];
  calculators: string[];
  sources: Source[];
}

export const GUIDES: Guide[] = [
  {
    slug: "how-much-concrete-do-i-need",
    title: "How Much Concrete Do I Need? A Practical Guide",
    metaTitle: "How Much Concrete Do I Need? Formula, Examples & Tips",
    description:
      "Learn how to calculate concrete for slabs, footings and post holes, how much waste to add, and when bags make more sense than ready-mix.",
    published: "2026-11-13",
    updated: "2026-11-13",
    summary: "Measure, convert everything to one unit, multiply, add a sensible allowance — then decide between bags and ready-mix.",
    sections: [
      {
        heading: "The short answer",
        paragraphs: [
          "Concrete volume is length × width × thickness for anything rectangular, and π × radius² × depth for anything round. The hard part is not the maths — it is measuring accurately, keeping units consistent and ordering the right extra.",
        ],
        formula: "Volume = length × width × thickness   →   cubic yards = cubic feet ÷ 27",
      },
      {
        heading: "Step 1: Measure the real shape",
        paragraphs: [
          "Measure inside the formwork, not the planned dimensions on a sketch. Check thickness in several places: a slab specified as 4 in that averages 4.5 in because of a low spot uses 12.5 % more concrete. For excavated footings, measure the trench after digging, because sides are rarely perfectly vertical.",
        ],
        list: [
          "Measure length and width at both ends and use the larger values.",
          "Probe the depth every few feet and average it.",
          "Split L-shaped or complex pours into rectangles.",
        ],
      },
      {
        heading: "Step 2: Use one unit system",
        paragraphs: [
          "The most common mistake is multiplying feet by feet by inches. Convert thickness to feet first (divide inches by 12) or work in metres throughout (centimetres ÷ 100). A 10 × 10 ft slab at 4 in is 10 × 10 × 0.333 = 33.3 ft³, which is 1.23 yd³.",
        ],
        table: {
          head: ["Thickness", "Area covered by 1 yd³", "Area covered by 1 m³"],
          rows: [
            ["3 in / 75 mm", "108 ft²", "13.3 m²"],
            ["4 in / 100 mm", "81 ft²", "10 m²"],
            ["5 in / 125 mm", "64.8 ft²", "8 m²"],
            ["6 in / 150 mm", "54 ft²", "6.7 m²"],
          ],
        },
      },
      {
        heading: "Step 3: Add a waste allowance",
        paragraphs: [
          "Most estimators add 5–10 %. The extra covers spillage, a slightly uneven sub-base, forms that bow under load and concrete left in the mixer or pump. Running short mid-pour is far worse than having a little left over, because a delay can leave a weak cold joint.",
        ],
      },
      {
        heading: "Step 4: Bags or ready-mix?",
        paragraphs: [
          "Pre-mixed bags are sold by weight, but what matters is the yield printed on the bag. Common US figures are about 0.60 ft³ for an 80 lb bag and 0.45 ft³ for a 60 lb bag, which means about 45 × 80 lb bags per cubic yard. That is a lot of lifting and mixing.",
          "As a rough guide, bags suit post holes, small pads and repairs. For pours of around a cubic yard or more, ready-mix delivery is usually more practical — and gives a more uniform result — although delivery minimums and short-load fees vary by supplier.",
        ],
      },
      {
        heading: "What a calculator cannot tell you",
        paragraphs: [
          "Volume calculations do not decide how thick a slab must be, what reinforcement it needs, or how large a footing should be. Those depend on loads, soil, frost depth and local rules. Use plans, a qualified professional and your local building code for those decisions, then use a calculator to order the material.",
        ],
      },
    ],
    calculators: ["concrete-calculator", "concrete-slab-calculator", "concrete-bag-calculator"],
    sources: [S.nistConversion, S.quikrete, S.pca, S.aci],
  },
  {
    slug: "how-to-calculate-gravel-for-a-driveway",
    title: "How to Calculate Gravel for a Driveway",
    metaTitle: "How to Calculate Gravel for a Driveway (Tons & Yards)",
    description:
      "Work out how much stone a gravel driveway needs: layers, compaction allowance, converting yards to tons, and planning truck deliveries.",
    published: "2026-11-13",
    updated: "2026-11-13",
    summary: "Calculate each layer's volume, add for compaction, convert to weight with your supplier's density, then plan deliveries.",
    sections: [
      {
        heading: "Why driveways are built in layers",
        paragraphs: [
          "A gravel driveway that lasts is rarely a single layer of pretty stone. It is usually built from coarser stone at the bottom, which spreads loads and drains water, topped with finer, well-graded stone that compacts into a firm surface. Each layer is spread and compacted before the next goes down.",
        ],
      },
      {
        heading: "Step 1: Area and layer depths",
        paragraphs: [
          "Multiply length by width for the area. Then decide the compacted depth of each layer. Residential driveways often total roughly 8–12 in (20–30 cm) of compacted stone, but soft or poorly drained soils may need more, and local practice varies.",
        ],
        formula: "Layer volume = length × width × layer depth",
      },
      {
        heading: "Step 2: Allow for compaction",
        paragraphs: [
          "Stone delivered loose occupies more space than the same stone after compaction. Adding 10–20 % to the finished volume is a common allowance for crushed stone. Without it, you end up with a thinner driveway than planned.",
        ],
      },
      {
        heading: "Step 3: Convert volume to weight",
        paragraphs: [
          "Quarries often sell by weight. To convert, multiply the volume by the stone's bulk density. A commonly used figure for crushed stone is about 105 lb/ft³ — roughly 1.4 US tons per cubic yard or 1.7 tonnes per cubic metre — but the right figure is the one your supplier uses for their product.",
        ],
        table: {
          head: ["Volume", "At 105 lb/ft³", "At 1,680 kg/m³"],
          rows: [
            ["1 yd³ (0.76 m³)", "≈ 1.42 US tons", "≈ 1.28 tonnes"],
            ["10 yd³ (7.65 m³)", "≈ 14.2 US tons", "≈ 12.8 tonnes"],
          ],
        },
      },
      {
        heading: "Step 4: Plan deliveries",
        paragraphs: [
          "Ask your supplier how much their truck carries; capacity depends on the vehicle and local weight limits. Ordering by layer lets you compact the base before the next stone arrives. Make sure the delivery route can carry a loaded truck — a soft verge or a weak culvert can be damaged.",
        ],
      },
      {
        heading: "Worked example",
        list: [
          "Driveway 50 ft × 10 ft = 500 ft².",
          "Layers: 4 in base + 4 in middle + 2 in top = 10 in (0.833 ft).",
          "Volume = 500 × 0.833 = 416.7 ft³; +10 % compaction = 458.3 ft³ = 17.0 yd³.",
          "Weight = 458.3 × 105 lb = 48,125 lb ≈ 24 US tons.",
        ],
      },
    ],
    calculators: ["gravel-driveway-calculator", "gravel-calculator", "cubic-yard-calculator"],
    sources: [S.nistConversion],
  },
  {
    slug: "how-many-tiles-do-i-need",
    title: "How Many Tiles Do I Need? Measuring, Waste and Grout",
    metaTitle: "How Many Tiles Do I Need? Step-by-Step with Examples",
    description:
      "How to measure a room for tile, include grout joints, choose a waste percentage for your layout and convert tiles into boxes.",
    published: "2026-11-13",
    updated: "2026-11-13",
    summary: "Measure the area, divide by the tile's footprint including the joint, add waste for your layout and round up to boxes.",
    sections: [
      {
        heading: "Measure the area",
        paragraphs: [
          "Measure the floor or wall in its simplest shapes. An L-shaped room is two rectangles; a bay can often be approximated as a rectangle plus a triangle. Add the areas together. For walls, subtract windows and doors only if they are large — small openings generate almost as much waste in cuts as they save.",
        ],
      },
      {
        heading: "Include the grout joint",
        paragraphs: [
          "Every tile effectively occupies its own size plus one joint width in each direction. For a 12 × 12 in tile with a 1/8 in joint, that is 12.125 × 12.125 = 147 in² rather than 144 in². The difference is small for large tiles but becomes significant for small tiles and wide joints.",
        ],
        formula: "Tiles = area ÷ [(tile length + joint) × (tile width + joint)]",
      },
      {
        heading: "Choose a waste allowance",
        table: {
          head: ["Layout", "Typical allowance"],
          rows: [
            ["Straight / grid", "≈ 10 %"],
            ["Brick bond / offset", "≈ 10 %"],
            ["Diagonal", "10–15 %"],
            ["Herringbone / chevron", "15–20 %"],
            ["Showers and small rooms with many cuts", "15 % or more"],
          ],
        },
        paragraphs: [
          "These are common rules of thumb rather than fixed rules. Large-format tile, tiles with a pattern that must be matched, and rooms with many corners all push waste up.",
        ],
      },
      {
        heading: "Round up — then buy from one batch",
        paragraphs: [
          "Round tiles up to whole tiles and then to whole boxes. Tiles are produced in batches that can differ slightly in shade and size, so buy everything at once and keep a few spares for repairs.",
        ],
      },
      {
        heading: "Don't forget grout and adhesive",
        paragraphs: [
          "Grout quantity depends on the joint volume — tile size, joint width and tile thickness. Adhesive coverage depends on the trowel notch and is given by the adhesive manufacturer. Check both before you start so you do not run out halfway through a wall.",
        ],
      },
    ],
    calculators: ["tile-calculator", "shower-tile-calculator", "grout-calculator", "flooring-waste-calculator"],
    sources: [S.tcna, S.nistConversion],
  },
  {
    slug: "how-to-calculate-roof-pitch",
    title: "How to Calculate Roof Pitch (and Convert It to Degrees)",
    metaTitle: "How to Calculate Roof Pitch — X/12, Degrees & Slope",
    description:
      "What roof pitch means, how to measure it safely, how to convert X/12 to degrees and percent, and how pitch affects roof area.",
    published: "2026-11-13",
    updated: "2026-11-13",
    summary: "Pitch is rise over run. Convert with arctangent for degrees, and use the pitch multiplier for roof area and rafter length.",
    sections: [
      {
        heading: "What roof pitch means",
        paragraphs: [
          "Roof pitch describes steepness as the vertical rise for a given horizontal run. North American practice writes it as rise per 12 units of run: a 6/12 roof rises 6 in for every 12 in horizontally. The UK, Europe and Australia more often express it as an angle in degrees.",
        ],
      },
      {
        heading: "How to measure it safely",
        list: [
          "From inside the attic: hold a level horizontally against a rafter, mark 12 in along the level, and measure vertically from that mark to the rafter.",
          "At a gable end from a ladder: use a pitch gauge or digital angle finder on the rake board.",
          "From plans: pitch is usually stated on elevation or section drawings.",
        ],
        paragraphs: ["Avoid walking on a roof to measure it unless you are trained and using appropriate fall protection."],
      },
      {
        heading: "Converting between formats",
        formula: "angle = arctan(rise ÷ run)     slope % = rise ÷ run × 100     X/12 = 12 × rise ÷ run",
        table: {
          head: ["Pitch", "Angle", "Slope", "Multiplier"],
          rows: [
            ["3/12", "14.04°", "25 %", "1.031"],
            ["4/12", "18.43°", "33.3 %", "1.054"],
            ["6/12", "26.57°", "50 %", "1.118"],
            ["8/12", "33.69°", "66.7 %", "1.202"],
            ["10/12", "39.81°", "83.3 %", "1.302"],
            ["12/12", "45.00°", "100 %", "1.414"],
          ],
        },
      },
      {
        heading: "Why pitch matters for materials",
        paragraphs: [
          "The pitch multiplier, √(1 + (rise/run)²), converts horizontal measurements into lengths along the slope. Multiply a footprint area by it to get roof area, or a horizontal rafter run by it to get rafter length. Roofing materials also have minimum pitches set by their manufacturers and local codes, so pitch can determine which products are suitable.",
        ],
      },
    ],
    calculators: ["roof-pitch-calculator", "roof-area-calculator"],
    sources: [S.arma, S.icc, S.nistSp811],
  },
  {
    slug: "cubic-yards-vs-cubic-feet",
    title: "Cubic Yards vs. Cubic Feet (and Cubic Metres) Explained",
    metaTitle: "Cubic Yards vs Cubic Feet vs m³ — Conversions Explained",
    description:
      "Why there are 27 cubic feet in a cubic yard, how to convert between yards, feet and cubic metres, and how to avoid common unit mistakes.",
    published: "2026-11-13",
    updated: "2026-11-13",
    summary: "1 yd³ = 27 ft³ = 0.7646 m³. Convert all dimensions to the same unit before multiplying.",
    sections: [
      {
        heading: "Why 27?",
        paragraphs: [
          "A yard is 3 ft, so a cubic yard is a cube 3 ft long, 3 ft wide and 3 ft high: 3 × 3 × 3 = 27 ft³. People often assume it is 9 or 3 because a square yard is 9 ft² and a yard is 3 ft — volume adds a third dimension.",
        ],
      },
      {
        heading: "Key conversions",
        table: {
          head: ["From", "To", "Multiply by"],
          rows: [
            ["cubic feet", "cubic yards", "÷ 27 (0.037037)"],
            ["cubic yards", "cubic feet", "27"],
            ["cubic yards", "cubic metres", "0.764555"],
            ["cubic metres", "cubic yards", "1.30795"],
            ["cubic metres", "litres", "1,000"],
            ["cubic feet", "litres", "28.3168"],
          ],
        },
        paragraphs: ["These factors follow from the exact definitions 1 in = 25.4 mm and 1 yd = 0.9144 m."],
      },
      {
        heading: "The classic mistake: mixing feet and inches",
        paragraphs: [
          "Area is usually measured in feet but depth in inches. Multiplying 10 ft × 10 ft × 4 in gives 400 — which is neither cubic feet nor cubic yards. Convert the depth first: 4 in ÷ 12 = 0.333 ft, so the volume is 33.3 ft³, or 1.23 yd³.",
        ],
      },
      {
        heading: "Quick reference: coverage of one cubic yard",
        table: {
          head: ["Depth", "Area covered"],
          rows: [
            ["1 in", "324 ft²"],
            ["2 in", "162 ft²"],
            ["3 in", "108 ft²"],
            ["4 in", "81 ft²"],
            ["6 in", "54 ft²"],
          ],
        },
      },
    ],
    calculators: ["cubic-yard-calculator", "concrete-calculator", "mulch-calculator"],
    sources: [S.nistConversion, S.nistSp811],
  },
  {
    slug: "how-much-mulch-do-i-need",
    title: "How Much Mulch Does a Garden Need?",
    metaTitle: "How Much Mulch Do I Need? Depth, Coverage & Bags",
    description:
      "How deep to apply mulch, how to measure irregular beds, how many bags make a cubic yard, and when bulk delivery makes sense.",
    published: "2026-11-13",
    updated: "2026-11-13",
    summary: "Measure your beds, choose a depth of about 2–4 in (5–10 cm), and convert to yards, cubic metres or bags.",
    sections: [
      {
        heading: "Choose a depth",
        paragraphs: [
          "Horticultural guidance commonly suggests a mulch layer of around 2–4 in (5–10 cm). Thinner layers do less to suppress weeds and conserve moisture; much thicker layers can stop water and air reaching the soil. Keep mulch pulled back from plant stems and tree trunks.",
          "If you are topping up last year's mulch, you may only need an inch or so.",
        ],
      },
      {
        heading: "Measure irregular beds",
        list: [
          "Break curved beds into rectangles and circles and add the areas.",
          "For a long, curving border, measure the length along the middle and multiply by the average width.",
          "Tree rings are circles: area = π × radius².",
        ],
      },
      {
        heading: "Convert to bags or bulk",
        formula: "Cubic feet = area (ft²) × depth (in) ÷ 12     Cubic yards = cubic feet ÷ 27",
        table: {
          head: ["Bag size", "Bags per cubic yard"],
          rows: [
            ["1.5 ft³", "18"],
            ["2 ft³", "13.5"],
            ["3 ft³", "9"],
            ["50 L", "≈ 15.3"],
          ],
        },
      },
      {
        heading: "Bulk or bagged?",
        paragraphs: [
          "Bulk mulch is usually cheaper per cubic yard but comes with delivery charges and a pile on the driveway. Bags are convenient for small areas and easier to transport. Put both prices into the calculator to see where the break-even point is for your job.",
        ],
      },
    ],
    calculators: ["mulch-calculator", "topsoil-calculator", "cubic-yard-calculator"],
    sources: [S.rhsMulch, S.nistConversion],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
