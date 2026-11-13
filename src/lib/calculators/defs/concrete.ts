import { bagsNeeded, concreteEstimate, coveragePerVolume, estimatedBagYield } from "@/lib/calc/concrete";
import { cylinderVolume, rectangularVolume, stepsVolume, tubeVolume } from "@/lib/calc/geometry";
import { LB } from "@/lib/units";
import { num, optNum, str } from "../engine";
import { numberField, priceField, quantityField, wasteField } from "../fields";
import type { CalculatorDefinition, ComputeValues, ResultItem } from "../types";

const bagFields = (imperialDefault: number, metricDefault: number) => [
  numberField({
    id: "bagMass",
    label: "Bag size (dry weight)",
    dimension: "bagMass",
    defaults: { imperial: imperialDefault, metric: metricDefault },
    group: "Bags",
    help: "Common sizes: 40, 50, 60, 80 lb (US) or 20, 25, 30 kg.",
  }),
  numberField({
    id: "bagYield",
    label: "Yield per bag (from the bag label)",
    dimension: "bagVolume",
    defaults: { imperial: "", metric: "" },
    optional: true,
    group: "Bags",
    help: "Leave blank to use a typical estimate (an 80 lb bag ≈ 0.60 ft³). The printed yield on your product is always more accurate.",
  }),
];

function bagYieldFrom(values: ComputeValues): { yieldM3: number; estimated: boolean } {
  const given = optNum(values, "bagYield");
  if (given && given > 0) return { yieldM3: given, estimated: false };
  return { yieldM3: estimatedBagYield(num(values, "bagMass")), estimated: true };
}

const YIELD_NOTE =
  "Bag yield is a typical estimate based on ≈0.60 ft³ per 80 lb (≈0.47 L per kg of dry mix). Check the yield printed on your product.";

export const concreteCalculator: CalculatorDefinition = {
  slug: "concrete-calculator",
  title: "Concrete Calculator",
  shortTitle: "Concrete",
  category: "concrete",
  summary: "Concrete volume for slabs, footings, columns, tubes and steps — in cubic yards, cubic metres and bags.",
  keywords: ["concrete", "cement", "yards of concrete", "footing", "column", "pier", "steps", "ready mix"],
  fields: [
    {
      kind: "select",
      id: "form",
      label: "What are you pouring?",
      defaultValue: "slab",
      group: "Shape",
      options: [
        { value: "slab", label: "Slab, footing or wall (rectangular)" },
        { value: "column", label: "Round column, pier or post hole" },
        { value: "tube", label: "Hollow tube / ring" },
        { value: "steps", label: "Steps" },
      ],
    },
    numberField({ id: "length", label: "Length", dimension: "length", defaults: { imperial: 10, metric: 3 }, showWhen: { field: "form", equals: ["slab"] }, group: "Shape" }),
    numberField({ id: "width", label: "Width", dimension: "length", defaults: { imperial: 10, metric: 3 }, showWhen: { field: "form", equals: ["slab"] }, group: "Shape" }),
    numberField({ id: "thickness", label: "Thickness / depth", dimension: "shortLength", defaults: { imperial: 4, metric: 10 }, showWhen: { field: "form", equals: ["slab"] }, group: "Shape" }),
    numberField({ id: "diameter", label: "Diameter", dimension: "shortLength", defaults: { imperial: 12, metric: 30 }, showWhen: { field: "form", equals: ["column"] }, group: "Shape" }),
    numberField({ id: "outer", label: "Outer diameter", dimension: "shortLength", defaults: { imperial: 24, metric: 60 }, showWhen: { field: "form", equals: ["tube"] }, group: "Shape" }),
    numberField({ id: "inner", label: "Inner diameter", dimension: "shortLength", defaults: { imperial: 18, metric: 45 }, min: 0, minExclusive: false, showWhen: { field: "form", equals: ["tube"] }, group: "Shape" }),
    numberField({ id: "height", label: "Height / depth", dimension: "length", defaults: { imperial: 4, metric: 1.2 }, showWhen: { field: "form", equals: ["column", "tube"] }, group: "Shape" }),
    numberField({ id: "stepWidth", label: "Step width", dimension: "length", defaults: { imperial: 4, metric: 1.2 }, showWhen: { field: "form", equals: ["steps"] }, group: "Shape" }),
    numberField({ id: "rise", label: "Rise (height of each step)", dimension: "shortLength", defaults: { imperial: 7, metric: 18 }, showWhen: { field: "form", equals: ["steps"] }, group: "Shape" }),
    numberField({ id: "run", label: "Run (depth of each tread)", dimension: "shortLength", defaults: { imperial: 11, metric: 28 }, showWhen: { field: "form", equals: ["steps"] }, group: "Shape" }),
    numberField({ id: "steps", label: "Number of steps", dimension: "count", defaults: { imperial: 3, metric: 3 }, integer: true, min: 1, minExclusive: false, showWhen: { field: "form", equals: ["steps"] }, group: "Shape" }),
    { ...quantityField("How many identical pours?"), group: "Shape" },
    wasteField(10, "Waste / overage allowance", "5–10 % is a common allowance for spillage, uneven subgrade and form deflection."),
    ...bagFields(80, 20),
    priceField("pricePerVolume", "Ready-mix price", "pricePerVolume"),
    priceField("pricePerBag", "Price per bag", "price"),
  ],
  compute(values) {
    const form = str(values, "form", "slab");
    let single: number;
    if (form === "column") single = cylinderVolume(num(values, "diameter"), num(values, "height"));
    else if (form === "tube") single = tubeVolume(num(values, "outer"), num(values, "inner"), num(values, "height"));
    else if (form === "steps") single = stepsVolume(num(values, "stepWidth"), num(values, "rise"), num(values, "run"), num(values, "steps"));
    else single = rectangularVolume(num(values, "length"), num(values, "width"), num(values, "thickness"));

    const volume = single * num(values, "quantity");
    const { yieldM3, estimated } = bagYieldFrom(values);
    const est = concreteEstimate({
      volume,
      wastePercent: num(values, "waste"),
      bagYield: yieldM3,
      pricePerM3: optNum(values, "pricePerVolume"),
      pricePerBag: optNum(values, "pricePerBag"),
    });
    const results: ResultItem[] = [
      { id: "volumeWithWaste", label: "Concrete to order (incl. waste)", kind: "volume", value: est.volumeWithWaste, primary: true },
      { id: "bags", label: "Pre-mixed bags", kind: "count", value: est.bags!.rounded, suffix: "bags", primary: true, note: `${est.bags!.exact.toFixed(1)} bags before rounding up` },
      { id: "volume", label: "Net volume (no waste)", kind: "volume", value: est.volume },
      { id: "weight", label: "Approximate weight in place", kind: "mass", value: est.weightKg, note: "Based on ≈2,400 kg/m³ (150 lb/ft³) for normal-weight concrete." },
    ];
    if (est.readyMixCost !== undefined) results.push({ id: "readyMixCost", label: "Ready-mix cost estimate", kind: "money", value: est.readyMixCost });
    if (est.bagCost !== undefined) results.push({ id: "bagCost", label: "Bagged concrete cost estimate", kind: "money", value: est.bagCost });
    return { results, notes: estimated ? [YIELD_NOTE] : [] };
  },
};

export const concreteSlabCalculator: CalculatorDefinition = {
  slug: "concrete-slab-calculator",
  title: "Concrete Slab Calculator",
  shortTitle: "Concrete Slab",
  category: "concrete",
  summary: "How much concrete a patio, shed base or driveway slab needs, with bag counts and cost.",
  keywords: ["slab", "patio", "shed base", "driveway slab", "pad", "floor slab"],
  fields: [
    numberField({ id: "length", label: "Slab length", dimension: "length", defaults: { imperial: 12, metric: 4 }, group: "Slab" }),
    numberField({ id: "width", label: "Slab width", dimension: "length", defaults: { imperial: 12, metric: 4 }, group: "Slab" }),
    numberField({ id: "thickness", label: "Slab thickness", dimension: "shortLength", defaults: { imperial: 4, metric: 10 }, group: "Slab", help: "4 in (≈100 mm) is common for patios and walkways; driveways and garage floors are usually thicker. Follow your plans or local code." }),
    wasteField(10),
    ...bagFields(80, 25),
    priceField("pricePerVolume", "Ready-mix price", "pricePerVolume"),
    priceField("pricePerBag", "Price per bag", "price"),
  ],
  compute(values, ctx) {
    const length = num(values, "length");
    const width = num(values, "width");
    const thickness = num(values, "thickness");
    const volume = rectangularVolume(length, width, thickness);
    const { yieldM3, estimated } = bagYieldFrom(values);
    const est = concreteEstimate({
      volume,
      wastePercent: num(values, "waste"),
      bagYield: yieldM3,
      pricePerM3: optNum(values, "pricePerVolume"),
      pricePerBag: optNum(values, "pricePerBag"),
    });
    const altSizes = ctx.system === "imperial" ? [60 * LB, 80 * LB] : [20, 30];
    const results: ResultItem[] = [
      { id: "volumeWithWaste", label: "Concrete to order (incl. waste)", kind: "volume", value: est.volumeWithWaste, primary: true },
      { id: "bags", label: "Bags at your bag size", kind: "count", value: est.bags!.rounded, suffix: "bags", primary: true },
      { id: "area", label: "Slab area", kind: "area", value: length * width },
      { id: "volume", label: "Net volume (no waste)", kind: "volume", value: volume },
      ...altSizes.map((kg, i) => ({
        id: `alt${i}`,
        label: ctx.system === "imperial" ? `${Math.round(kg / LB)} lb bags (estimated yield)` : `${kg} kg bags (estimated yield)`,
        kind: "count" as const,
        value: bagsNeeded(est.volumeWithWaste, estimatedBagYield(kg)).rounded,
        suffix: "bags",
      })),
      { id: "coverage", label: "Area one cubic unit covers at this thickness", kind: "area", value: coveragePerVolume(thickness) * (ctx.system === "imperial" ? 0.764554857984 : 1), note: ctx.system === "imperial" ? "Per cubic yard" : "Per cubic metre" },
    ];
    if (est.readyMixCost !== undefined) results.push({ id: "readyMixCost", label: "Ready-mix cost estimate", kind: "money", value: est.readyMixCost });
    if (est.bagCost !== undefined) results.push({ id: "bagCost", label: "Bagged concrete cost estimate", kind: "money", value: est.bagCost });
    return { results, notes: estimated ? [YIELD_NOTE] : [] };
  },
};

export const concreteBagCalculator: CalculatorDefinition = {
  slug: "concrete-bag-calculator",
  title: "Concrete Bag Calculator",
  shortTitle: "Concrete Bags",
  category: "concrete",
  summary: "How many bags of pre-mixed concrete you need, using the yield printed on your bag.",
  keywords: ["bags of concrete", "80 lb bags", "60 lb bags", "quikrete", "sakrete", "premix", "post hole"],
  fields: [
    {
      kind: "select",
      id: "mode",
      label: "How do you want to enter the job?",
      defaultValue: "dims",
      group: "Volume",
      options: [
        { value: "dims", label: "Length × width × depth" },
        { value: "volume", label: "I know the volume" },
      ],
    },
    numberField({ id: "length", label: "Length", dimension: "length", defaults: { imperial: 6, metric: 2 }, showWhen: { field: "mode", equals: ["dims"] }, group: "Volume" }),
    numberField({ id: "width", label: "Width", dimension: "length", defaults: { imperial: 4, metric: 1.2 }, showWhen: { field: "mode", equals: ["dims"] }, group: "Volume" }),
    numberField({ id: "depth", label: "Depth", dimension: "shortLength", defaults: { imperial: 4, metric: 10 }, showWhen: { field: "mode", equals: ["dims"] }, group: "Volume" }),
    numberField({ id: "volume", label: "Volume", dimension: "volume", defaults: { imperial: 0.5, metric: 0.4 }, showWhen: { field: "mode", equals: ["volume"] }, group: "Volume" }),
    wasteField(10),
    ...bagFields(80, 20),
    priceField("pricePerBag", "Price per bag", "price"),
  ],
  compute(values, ctx) {
    const mode = str(values, "mode", "dims");
    const volume = mode === "volume" ? num(values, "volume") : rectangularVolume(num(values, "length"), num(values, "width"), num(values, "depth"));
    const { yieldM3, estimated } = bagYieldFrom(values);
    const est = concreteEstimate({ volume, wastePercent: num(values, "waste"), bagYield: yieldM3, pricePerBag: optNum(values, "pricePerBag") });
    const bagMass = num(values, "bagMass");
    const sizes = ctx.system === "imperial" ? [40, 50, 60, 80].map((lb) => lb * LB) : [20, 25, 30, 40];
    const results: ResultItem[] = [
      { id: "bags", label: "Bags needed", kind: "count", value: est.bags!.rounded, suffix: "bags", primary: true, note: `${est.bags!.exact.toFixed(2)} bags before rounding up` },
      { id: "volumeWithWaste", label: "Volume incl. waste", kind: "volume", value: est.volumeWithWaste },
      { id: "yield", label: "Yield per bag used", kind: "smallVolume", value: yieldM3, note: estimated ? "Estimated — check your bag" : "From your bag label" },
      { id: "totalWeight", label: "Total weight to carry", kind: "mass", value: est.bags!.rounded * bagMass },
    ];
    if (est.bagCost !== undefined) results.push({ id: "bagCost", label: "Cost estimate", kind: "money", value: est.bagCost });
    for (const kg of sizes) {
      if (Math.abs(kg - bagMass) < 0.01) continue;
      results.push({
        id: `cmp${kg}`,
        label: ctx.system === "imperial" ? `Compare: ${Math.round(kg / LB)} lb bags` : `Compare: ${kg} kg bags`,
        kind: "count",
        value: bagsNeeded(est.volumeWithWaste, estimatedBagYield(kg)).rounded,
        suffix: "bags",
      });
    }
    return { results, notes: estimated ? [YIELD_NOTE] : [] };
  },
};

export const cubicYardCalculator: CalculatorDefinition = {
  slug: "cubic-yard-calculator",
  title: "Cubic Yard Calculator",
  shortTitle: "Cubic Yards",
  category: "concrete",
  summary: "Convert length × width × depth into cubic yards, cubic feet and cubic metres.",
  keywords: ["cubic yards", "yardage", "cubic feet to yards", "cubic metres", "volume", "yards of dirt"],
  fields: [
    {
      kind: "select",
      id: "form",
      label: "Shape",
      defaultValue: "rect",
      group: "Dimensions",
      options: [
        { value: "rect", label: "Rectangle (L × W × D)" },
        { value: "circle", label: "Circle (diameter × D)" },
      ],
    },
    numberField({ id: "length", label: "Length", dimension: "length", defaults: { imperial: 10, metric: 3 }, showWhen: { field: "form", equals: ["rect"] }, group: "Dimensions" }),
    numberField({ id: "width", label: "Width", dimension: "length", defaults: { imperial: 10, metric: 3 }, showWhen: { field: "form", equals: ["rect"] }, group: "Dimensions" }),
    numberField({ id: "diameter", label: "Diameter", dimension: "length", defaults: { imperial: 10, metric: 3 }, showWhen: { field: "form", equals: ["circle"] }, group: "Dimensions" }),
    numberField({ id: "depth", label: "Depth", dimension: "shortLength", defaults: { imperial: 6, metric: 15 }, group: "Dimensions" }),
    { ...quantityField(), group: "Dimensions" },
    wasteField(0, "Extra allowance"),
    priceField("pricePerVolume", "Price", "pricePerVolume"),
  ],
  compute(values) {
    const form = str(values, "form", "rect");
    const depth = num(values, "depth");
    const single = form === "circle" ? cylinderVolume(num(values, "diameter"), depth) : rectangularVolume(num(values, "length"), num(values, "width"), depth);
    const volume = single * num(values, "quantity") * (1 + num(values, "waste") / 100);
    const results: ResultItem[] = [
      { id: "volume", label: "Volume", kind: "volume", value: volume, primary: true },
      { id: "area", label: "Surface area", kind: "area", value: (single / depth) * num(values, "quantity") },
    ];
    const price = optNum(values, "pricePerVolume");
    if (price && price > 0) results.push({ id: "cost", label: "Cost estimate", kind: "money", value: volume * price });
    return { results };
  },
};
