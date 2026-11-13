import { boardAndBatten, boardFeet } from "@/lib/calc/carpentry";
import { formatPitch, pitchFromAngle, pitchFromRiseRun, rafterLength, roofArea } from "@/lib/calc/roofing";
import { num, optNum, str } from "../engine";
import { numberField, priceField, quantityField, wasteField } from "../fields";
import type { CalculatorDefinition, ComputeValues, ResultItem } from "../types";

function pitchFrom(values: ComputeValues) {
  const mode = str(values, "pitchMode", "x12");
  if (mode === "angle") return pitchFromAngle(num(values, "angle"));
  if (mode === "riseRun") return pitchFromRiseRun(num(values, "rise"), num(values, "run"));
  // x/12 is a ratio, so the SI conversion of "count" (×1) keeps it unitless.
  return pitchFromRiseRun(num(values, "x12"), 12);
}

const pitchFields = [
  {
    kind: "select" as const,
    id: "pitchMode",
    label: "How do you know the pitch?",
    defaultValue: "x12",
    group: "Pitch",
    options: [
      { value: "x12", label: "Pitch as X in 12 (e.g. 6/12)" },
      { value: "riseRun", label: "Measured rise and run" },
      { value: "angle", label: "Angle in degrees" },
    ],
  },
  numberField({ id: "x12", label: "Rise per 12 units of run", dimension: "number", defaults: { imperial: 6, metric: 6 }, min: 0, minExclusive: false, max: 48, showWhen: { field: "pitchMode", equals: ["x12"] }, group: "Pitch" }),
  numberField({ id: "rise", label: "Rise", dimension: "shortLength", defaults: { imperial: 6, metric: 15 }, min: 0, minExclusive: false, showWhen: { field: "pitchMode", equals: ["riseRun"] }, group: "Pitch" }),
  numberField({ id: "run", label: "Run (horizontal)", dimension: "shortLength", defaults: { imperial: 12, metric: 30 }, showWhen: { field: "pitchMode", equals: ["riseRun"] }, group: "Pitch", help: "Measure the horizontal distance with a level; any run length works." }),
  numberField({ id: "angle", label: "Roof angle", dimension: "angle", defaults: { imperial: 26.57, metric: 26.57 }, min: 0, minExclusive: false, max: 89.9, showWhen: { field: "pitchMode", equals: ["angle"] }, group: "Pitch" }),
];

export const roofPitchCalculator: CalculatorDefinition = {
  slug: "roof-pitch-calculator",
  title: "Roof Pitch Calculator",
  shortTitle: "Roof Pitch",
  category: "roofing",
  summary: "Convert between roof pitch (X/12), angle in degrees and slope percentage, plus rafter length.",
  keywords: ["roof pitch", "roof slope", "roof angle", "4/12", "6/12", "rafter", "pitch to degrees"],
  fields: [
    ...pitchFields,
    numberField({ id: "span", label: "Horizontal run of rafter (optional)", dimension: "length", defaults: { imperial: "", metric: "" }, optional: true, group: "Rafter", help: "Usually half the building width plus any overhang, measured horizontally." }),
  ],
  compute(values) {
    const p = pitchFrom(values);
    const results: ResultItem[] = [
      { id: "pitch", label: "Pitch", kind: "text", value: formatPitch(p.risePer12), primary: true },
      { id: "angle", label: "Angle", kind: "angle", value: p.angleDeg, primary: true, decimals: 2 },
      { id: "slope", label: "Slope (grade)", kind: "percent", value: p.slopePercent, decimals: 1 },
      { id: "multiplier", label: "Pitch multiplier (slope factor)", kind: "number", value: p.multiplier, decimals: 4, note: "Multiply plan area or horizontal run by this to get sloped area or rafter length." },
    ];
    const span = optNum(values, "span");
    if (span && span > 0) results.push({ id: "rafter", label: "Rafter length (along the slope)", kind: "length", value: rafterLength(span, p.multiplier), note: "Excludes ridge board deductions and plumb cuts." });
    return { results };
  },
};

export const roofAreaCalculator: CalculatorDefinition = {
  slug: "roof-area-calculator",
  title: "Roof Area Calculator",
  shortTitle: "Roof Area",
  category: "roofing",
  summary: "Sloped roof area from the building footprint and pitch, in square feet, square metres and roofing squares.",
  keywords: ["roof area", "roofing squares", "shingles", "how many bundles", "roof square footage", "roof size"],
  fields: [
    numberField({ id: "length", label: "Building length", dimension: "length", defaults: { imperial: 40, metric: 12 }, group: "Footprint" }),
    numberField({ id: "width", label: "Building width", dimension: "length", defaults: { imperial: 30, metric: 9 }, group: "Footprint" }),
    numberField({ id: "overhang", label: "Overhang on each side", dimension: "shortLength", defaults: { imperial: 12, metric: 30 }, min: 0, minExclusive: false, group: "Footprint" }),
    ...pitchFields,
    wasteField(10, "Waste allowance", "≈10 % for simple gable roofs; 15 % or more for hips, valleys and dormers."),
    numberField({ id: "bundles", label: "Bundles per square (100 ft²)", dimension: "number", defaults: { imperial: 3, metric: 3 }, optional: true, group: "Shingles (optional)", help: "Many asphalt shingles are packed 3 bundles per square, but check the wrapper — some products differ." }),
    priceField("pricePerBundle", "Price per bundle", "price"),
  ],
  compute(values) {
    const p = pitchFrom(values);
    const r = roofArea({
      length: num(values, "length"),
      width: num(values, "width"),
      overhang: num(values, "overhang"),
      pitchRatio: p.risePer12 / 12,
      wastePercent: num(values, "waste"),
      bundlesPerSquare: optNum(values, "bundles"),
      pricePerBundle: optNum(values, "pricePerBundle"),
    });
    const results: ResultItem[] = [
      { id: "withWaste", label: "Roof area to cover (incl. waste)", kind: "area", value: r.roofAreaWithWaste, primary: true },
      { id: "squares", label: "Roofing squares", kind: "number", value: r.squares, decimals: 2, suffix: "squares", primary: true, note: "1 square = 100 ft² (9.29 m²)" },
      { id: "roofArea", label: "Sloped roof area (no waste)", kind: "area", value: r.roofArea },
      { id: "planArea", label: "Footprint incl. overhangs", kind: "area", value: r.planArea },
      { id: "pitch", label: "Pitch used", kind: "text", value: `${formatPitch(p.risePer12)} (${p.angleDeg.toFixed(1)}°)` },
    ];
    if (r.bundles !== undefined) results.push({ id: "bundlesOut", label: "Shingle bundles", kind: "count", value: r.bundles, suffix: "bundles" });
    if (r.cost !== undefined) results.push({ id: "cost", label: "Shingle cost estimate", kind: "money", value: r.cost });
    return { results, notes: ["Assumes every roof plane shares the same pitch. Measure complex roofs plane by plane."] };
  },
};

export const boardFootCalculator: CalculatorDefinition = {
  slug: "board-foot-calculator",
  title: "Board Foot Calculator",
  shortTitle: "Board Feet",
  category: "carpentry",
  summary: "Board feet and cubic metres of lumber from thickness, width, length and quantity.",
  keywords: ["board feet", "board foot", "lumber", "hardwood", "timber volume", "bf"],
  fields: [
    numberField({ id: "thickness", label: "Thickness", dimension: "tinyLength", defaults: { imperial: 1, metric: 25 }, group: "Board", help: "Hardwood is usually sold by nominal (rough) thickness, e.g. 4/4 = 1 in." }),
    numberField({ id: "width", label: "Width", dimension: "tinyLength", defaults: { imperial: 6, metric: 150 }, group: "Board" }),
    numberField({ id: "length", label: "Length", dimension: "length", defaults: { imperial: 8, metric: 2.4 }, group: "Board" }),
    { ...quantityField("Number of boards"), group: "Board" },
    wasteField(0, "Waste allowance", "Add 15–30 % for defects and offcuts when buying rough hardwood."),
    priceField("price", "Price", "pricePerBoardVolume"),
  ],
  compute(values) {
    const r = boardFeet({
      thickness: num(values, "thickness"),
      width: num(values, "width"),
      length: num(values, "length"),
      quantity: num(values, "quantity"),
      wastePercent: num(values, "waste"),
      pricePerM3: optNum(values, "price"),
    });
    const results: ResultItem[] = [
      { id: "total", label: "Total board feet", kind: "number", value: r.boardFeetTotal, decimals: 2, suffix: "bd ft", primary: true },
      { id: "volume", label: "Volume", kind: "number", value: r.volumeM3, decimals: 4, suffix: "m³", primary: true },
      { id: "each", label: "Board feet per board", kind: "number", value: r.boardFeetEach, decimals: 2, suffix: "bd ft" },
    ];
    if (r.cost !== undefined) results.push({ id: "cost", label: "Lumber cost estimate", kind: "money", value: r.cost });
    return { results };
  },
};

export const boardAndBattenCalculator: CalculatorDefinition = {
  slug: "board-and-batten-calculator",
  title: "Board and Batten Calculator",
  shortTitle: "Board & Batten",
  category: "carpentry",
  summary: "Batten count, exact even spacing and boards to buy for a board-and-batten accent wall.",
  keywords: ["board and batten", "accent wall", "batten spacing", "wall paneling", "trim wall", "wainscoting"],
  fields: [
    numberField({ id: "wallWidth", label: "Wall width", dimension: "length", defaults: { imperial: 12, metric: 3.6 }, group: "Wall" }),
    numberField({ id: "wallHeight", label: "Wall (or panel) height", dimension: "length", defaults: { imperial: 8, metric: 2.4 }, group: "Wall" }),
    numberField({ id: "battenWidth", label: "Batten width", dimension: "tinyLength", defaults: { imperial: 3.5, metric: 90 }, group: "Battens", help: "A nominal 1×4 is about 3.5 in (89 mm) wide." }),
    numberField({ id: "spacing", label: "Target gap between battens", dimension: "shortLength", defaults: { imperial: 16, metric: 40 }, group: "Battens", help: "The calculator adjusts the gap slightly so every space is equal." }),
    {
      kind: "select",
      id: "rails",
      label: "Top and bottom rails",
      defaultValue: "yes",
      group: "Battens",
      options: [
        { value: "yes", label: "Include top and bottom rails" },
        { value: "no", label: "Vertical battens only" },
      ],
    },
    numberField({ id: "stock", label: "Length of boards you buy", dimension: "length", defaults: { imperial: 8, metric: 2.4 }, group: "Purchase" }),
    wasteField(10),
    priceField("pricePerBoard", "Price per board", "price"),
  ],
  compute(values) {
    const r = boardAndBatten({
      wallWidth: num(values, "wallWidth"),
      wallHeight: num(values, "wallHeight"),
      battenWidth: num(values, "battenWidth"),
      targetSpacing: num(values, "spacing"),
      includeRails: str(values, "rails", "yes") === "yes",
      stockLength: num(values, "stock"),
      wastePercent: num(values, "waste"),
      pricePerBoard: optNum(values, "pricePerBoard"),
    });
    const results: ResultItem[] = [
      { id: "battens", label: "Vertical battens", kind: "count", value: r.verticalBattens, suffix: "battens", primary: true },
      { id: "spacing", label: "Exact gap between battens", kind: "shortLength", value: r.actualSpacing, primary: true },
      { id: "boards", label: "Boards to buy", kind: "count", value: r.boards, suffix: "boards" },
      { id: "total", label: "Total linear length", kind: "length", value: r.totalLength },
      { id: "vertical", label: "Vertical batten length (total)", kind: "length", value: r.verticalLength },
    ];
    if (r.railLength > 0) results.push({ id: "rails", label: "Rail length (total)", kind: "length", value: r.railLength });
    if (r.cost !== undefined) results.push({ id: "cost", label: "Material cost estimate", kind: "money", value: r.cost });
    return { results, notes: ["Battens sit flush with both wall edges. Rails are assumed to be the same width as the battens."] };
  },
};
