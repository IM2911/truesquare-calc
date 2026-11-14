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
        heading: "Worked example: a 12 × 16 ft patio",
        list: [
          "Area = 12 × 16 = 192 ft².",
          "Thickness 4 in = 4 ÷ 12 = 0.333 ft, so volume = 192 × 0.333 = 64 ft³.",
          "In cubic yards: 64 ÷ 27 = 2.37 yd³. With a 10 % allowance: 2.61 yd³.",
          "Ready-mix is often ordered in fixed increments (ask your supplier), so this pour would typically be ordered as 2.75 yd³.",
          "In 80 lb bags at about 0.60 ft³ each: 2.61 × 27 = 70.4 ft³ ÷ 0.60 ≈ 118 bags — a strong argument for ready-mix.",
        ],
        paragraphs: [
          "In metric, the same patio is about 3.66 × 4.88 m at 100 mm: 1.78 m³, or 1.96 m³ with 10 % extra. Normal-weight concrete commonly weighs around 2,400 kg/m³ (roughly 4,000 lb per cubic yard), which is worth knowing before a truck crosses a lawn or a barrow goes up a ramp.",
        ],
      },
      {
        heading: "Round shapes: post holes, piers and columns",
        paragraphs: [
          "For a cylinder, use π × radius² × depth, with the radius as half the diameter in the same unit as the depth. A 10 in diameter hole 36 in deep has a radius of 5 in (0.417 ft): π × 0.417² × 3 = 1.64 ft³ — a little under three 80 lb bags.",
          "If a post stands in the hole, subtract its volume. A nominal 4 × 4 post is about 3.5 × 3.5 in, which takes up roughly 0.26 ft³ over 3 ft of depth, bringing the concrete down to about 1.38 ft³ per hole. Across a fence of 20 posts, that difference is about eight or nine 80 lb bags.",
        ],
        formula: "Cylinder volume = π × (diameter ÷ 2)² × depth",
      },
      {
        heading: "A pre-pour checklist",
        list: [
          "Confirm the dimensions inside the forms, after any excavation, compaction and base layer.",
          "Agree delivery time, access route and how the concrete reaches the forms (chute, barrow or pump).",
          "Have enough people and tools to place, level and finish the volume you ordered before it starts to set.",
          "Check the weather: very hot, cold or wet conditions change how concrete must be placed and cured.",
          "Plan what to do with any leftover concrete before the truck arrives.",
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
      {
        heading: "The same driveway in metric",
        list: [
          "Driveway 15 m × 3 m = 45 m².",
          "Layers: 150 mm base + 100 mm middle + 50 mm top = 300 mm (0.30 m).",
          "Volume = 45 × 0.30 = 13.5 m³; +10 % compaction = 14.85 m³.",
          "Weight at 1,680 kg/m³ = 24,948 kg ≈ 25 tonnes.",
        ],
      },
      {
        heading: "Choosing stone for each layer",
        paragraphs: [
          "Names for aggregates vary by region and supplier, so describe what you need as well as asking for a product name. As a general pattern:",
        ],
        list: [
          "Base: larger crushed stone that locks together and lets water drain away from the surface.",
          "Middle (optional on firm ground): medium crushed stone to bridge between base and surface.",
          "Surface: smaller, angular crushed stone with fines, which compacts into a firm, stable top. Products sold as dense-grade, crusher run or (in the UK) Type 1 sub-base are typical examples.",
          "Avoid using round stone such as pea gravel as the main driving surface: rounded particles do not lock together and tend to roll and rut under tyres.",
        ],
      },
      {
        heading: "Ground preparation, drainage and edging",
        paragraphs: [
          "Remove topsoil and soft material down to firm subsoil before any stone goes in; organic soil compresses and rots, and stone placed on it will sink. On soft or clay soils, a geotextile separation fabric between the subsoil and the base helps stop the two mixing over time.",
          "Water is the main enemy of a gravel driveway. Give the surface a slight crown or cross-fall so rain runs off to the sides rather than pooling in wheel tracks, and make sure it has somewhere to go. Edging — timber, steel, concrete kerbs or a plastic grid — keeps the stone where you put it.",
        ],
      },
      {
        heading: "Maintenance and top-ups",
        paragraphs: [
          "Even a well-built driveway loses some stone into the ground and off the edges. Raking stone back into wheel ruts, regrading occasionally and adding a thin top-up layer every few years keeps it firm. Use the gravel calculator with a depth of about 1 in (25 mm) to estimate a top-up.",
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
      {
        heading: "Worked example: a bathroom floor",
        list: [
          "Floor 7 × 9 ft = 63 ft².",
          "Tile 12 × 24 in with a 1/8 in joint: (12.125 × 24.125) ÷ 144 = 2.031 ft² per tile.",
          "Tiles needed = 63 ÷ 2.031 = 31.0; with 10 % waste = 34.1, so 35 tiles.",
          "If a box holds 8 tiles: 35 ÷ 8 = 4.4, so buy 5 boxes (40 tiles) — the 5 spares are useful for future repairs.",
        ],
        paragraphs: [
          "In metric: a 2.4 × 3.0 m floor is 7.2 m². A 600 × 300 mm tile with a 3 mm joint occupies 0.603 × 0.303 = 0.1827 m², so you need 7.2 ÷ 0.1827 = 39.4 tiles, or 44 with 10 % waste.",
        ],
      },
      {
        heading: "Plan the layout before you buy",
        paragraphs: [
          "Dry-lay a row of tiles or draw the layout to scale before ordering. Where you start the first tile decides how big the cut pieces at the walls will be. Starting from a centre line usually gives equal cuts on opposite walls; shifting the layout by half a tile can avoid thin slivers at a doorway or along the most visible wall.",
          "Thin slivers are not only unattractive, they also break easily during cutting, which adds waste. If your plan shows many cuts narrower than about a third of a tile, allow extra or adjust the layout.",
        ],
      },
      {
        heading: "Large-format and patterned tiles",
        paragraphs: [
          "Large tiles cover more area per piece but leave larger offcuts that often cannot be reused elsewhere. They also need a flatter substrate: unevenness shows up as lippage, where neighbouring tile edges sit at different heights. Tile manufacturers and industry bodies publish flatness requirements and recommended maximum offsets for running-bond layouts, which can affect both the layout and how much you buy.",
          "Tiles with a printed pattern, such as wood-look planks, look best when similar pieces are not placed side by side. Mixing tiles from several boxes as you lay them hides repeats but means you are less able to choose cuts, so allow a little more waste.",
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
      {
        heading: "Worked example: rafter length and roof area",
        list: [
          "A gable roof with a 6/12 pitch has a multiplier of 1.118.",
          "Horizontal rafter run of 12 ft × 1.118 = 13.42 ft along the slope, before adding any overhang.",
          "Building footprint including overhangs 32 × 42 ft = 1,344 ft².",
          "Roof area = 1,344 × 1.118 = 1,502.6 ft², or 15.0 roofing squares (1 square = 100 ft²).",
          "Add the waste allowance your roofing manufacturer or contractor recommends for cutting, hips, valleys and starter courses before ordering.",
        ],
      },
      {
        heading: "Converting degrees back to X/12",
        paragraphs: [
          "If your plans or an angle finder give the pitch in degrees, multiply 12 by the tangent of the angle. A 30° roof is 12 × tan 30° = 6.93, so it is just under 7/12. A 22.5° roof is 12 × tan 22.5° = 4.97, almost exactly 5/12.",
        ],
        formula: "X = 12 × tan(angle)",
      },
      {
        heading: "Low, medium and steep slopes",
        paragraphs: [
          "Roofs are often grouped into low-slope and steep-slope roofs, because the two need different materials. Asphalt shingles, for example, are generally used on slopes of 4/12 and above, and the Asphalt Roofing Manufacturers Association describes low-slope application between 2/12 and 4/12 with special underlayment requirements; below that, membranes and other low-slope systems are used. Always follow the specific product's installation instructions and your local code.",
          "Very steep roofs also change how a job is done: above roughly 8/12 to 9/12, working safely usually requires roof jacks, harnesses or scaffolding, which affects the cost of a quote as much as the materials do.",
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
      {
        heading: "From volume to bags",
        paragraphs: [
          "Bagged materials are sold by volume (mulch, potting mix, some soils) or by weight with a stated yield (concrete, mortar). Divide the cubic feet you need by the volume per bag:",
        ],
        table: {
          head: ["Bag size", "Bags per cubic yard", "Bags per cubic metre"],
          rows: [
            ["0.5 ft³", "54", "≈ 70.6"],
            ["1 ft³", "27", "≈ 35.3"],
            ["2 ft³", "13.5", "≈ 17.7"],
            ["3 ft³", "9", "≈ 11.8"],
            ["40 L", "≈ 19.1", "25"],
          ],
        },
      },
      {
        heading: "From volume to weight",
        paragraphs: [
          "Quarries and landscape yards often sell by the ton or tonne, so you need the material's bulk density. Density varies with moisture, particle size and how tightly the material is packed, so treat general figures as rough and ask your supplier for theirs.",
        ],
        table: {
          head: ["Material", "Commonly cited bulk density", "Per cubic yard (approx.)"],
          rows: [
            ["Crushed stone", "≈ 100–110 lb/ft³ (1,600–1,760 kg/m³)", "1.35–1.5 US tons"],
            ["Sand", "≈ 90–110 lb/ft³ (1,450–1,760 kg/m³)", "1.2–1.5 US tons"],
            ["Topsoil (moist)", "≈ 70–100 lb/ft³ (1,100–1,600 kg/m³)", "0.95–1.35 US tons"],
            ["Fresh concrete", "≈ 145–150 lb/ft³ (≈ 2,400 kg/m³)", "≈ 2 US tons"],
            ["Bark mulch", "≈ 15–30 lb/ft³ (240–480 kg/m³)", "0.2–0.4 US tons"],
          ],
        },
        formula: "Weight = volume × bulk density",
      },
      {
        heading: "Worked example with mixed units",
        list: [
          "A path 30 ft long and 3 ft wide needs 3 in of gravel.",
          "Depth: 3 ÷ 12 = 0.25 ft, so volume = 30 × 3 × 0.25 = 22.5 ft³.",
          "Cubic yards: 22.5 ÷ 27 = 0.83 yd³. Cubic metres: 0.83 × 0.7646 = 0.64 m³.",
          "Weight at 105 lb/ft³: 22.5 × 105 = 2,363 lb ≈ 1.2 US tons.",
        ],
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
      {
        heading: "Worked example: a border and a tree ring",
        list: [
          "Border 20 ft × 4 ft = 80 ft².",
          "Tree ring with a 3 ft radius: π × 3² = 28.3 ft².",
          "Total 108.3 ft² at 3 in deep: 108.3 × 3 ÷ 12 = 27.1 ft³.",
          "That is 1.0 yd³ (0.77 m³), or 14 bags of 2 ft³ (27.1 ÷ 2 = 13.5, rounded up).",
        ],
      },
      {
        heading: "Which mulch?",
        list: [
          "Bark and wood chips: long-lasting and good for paths, shrub borders and around trees; coarse chips break down slowly.",
          "Compost, leaf mould and well-rotted manure: break down within a season and feed the soil, so they suit vegetable beds and borders that are topped up every year.",
          "Gravel and slate: do not break down and suit dry gardens, alpines and paths, but are heavy to move — check the weight per cubic yard before ordering.",
          "Sheet mulches such as cardboard under a layer of organic mulch can help clear weeds from a new bed.",
        ],
      },
      {
        heading: "When to apply it",
        paragraphs: [
          "Mulch is most useful when the soil is moist and not frozen. Common advice is to apply it in mid to late spring, after the soil has warmed and been watered by rain, and to top up in autumn. Mulching dry soil traps the dryness in; mulching frozen soil keeps it cold for longer.",
          "Avoid piling mulch up against tree trunks in a cone. Keeping a small gap around stems and trunks reduces the risk of rot and pests.",
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
