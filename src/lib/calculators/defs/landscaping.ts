import { bulkMaterial, DEFAULT_DENSITY, gravelDriveway } from "@/lib/calc/landscaping";
import { LB_PER_FT3, roundTo } from "@/lib/units";
import { num, optNum } from "../engine";
import { areaFields, numberField, priceField, resolveArea, wasteField } from "../fields";
import type { CalculatorDefinition, ComputeValues, Field, NumberField, ResultItem } from "../types";

const densityField = (kgM3: number, help: string): NumberField =>
  numberField({
    id: "density",
    label: "Material density",
    dimension: "density",
    defaults: { imperial: roundTo(kgM3 / LB_PER_FT3, 0), metric: roundTo(kgM3, -1) },
    group: "Material",
    help,
  });

const depthField = (imperial: number, metric: number, help?: string): NumberField =>
  numberField({ id: "depth", label: "Depth", dimension: "shortLength", defaults: { imperial, metric }, group: "Area", help });

const bagVolumeField = (imperial: number, metric: number): NumberField =>
  numberField({
    id: "bagVolume",
    label: "Bag size (volume)",
    dimension: "bagVolume",
    defaults: { imperial, metric },
    optional: true,
    group: "Bags",
    help: "Use the volume printed on the bag. Leave blank if you are buying in bulk.",
  });

function bulkResults(values: ComputeValues, opts: { weight: boolean; bags: boolean }): ResultItem[] {
  const area = resolveArea(values);
  const r = bulkMaterial({
    area,
    depth: num(values, "depth"),
    extraPercent: num(values, "waste"),
    density: opts.weight ? num(values, "density") : undefined,
    bagVolume: opts.bags ? optNum(values, "bagVolume") : undefined,
    pricePerM3: optNum(values, "pricePerVolume"),
    pricePerTonne: opts.weight ? (optNum(values, "pricePerMass") ?? 0) * 1000 : undefined,
    pricePerBag: optNum(values, "pricePerBag"),
  });
  const results: ResultItem[] = [{ id: "volume", label: "Volume needed (incl. allowance)", kind: "volume", value: r.volumeWithExtra, primary: true }];
  if (r.weightKg !== undefined) results.push({ id: "weight", label: "Estimated weight", kind: "mass", value: r.weightKg, primary: true });
  if (r.bags !== undefined) results.push({ id: "bags", label: "Bags needed", kind: "count", value: r.bags, suffix: "bags", primary: !opts.weight });
  results.push({ id: "area", label: "Area covered", kind: "area", value: r.area });
  results.push({ id: "netVolume", label: "Net volume (no allowance)", kind: "volume", value: r.volume });
  if (r.costByWeight !== undefined) results.push({ id: "costWeight", label: "Cost (priced by weight)", kind: "money", value: r.costByWeight });
  if (r.costByVolume !== undefined) results.push({ id: "costVolume", label: "Cost (priced by volume)", kind: "money", value: r.costByVolume });
  if (r.costByBags !== undefined) results.push({ id: "costBags", label: "Cost (bagged)", kind: "money", value: r.costByBags });
  return results;
}

const gravelFields = (densityKg: number, densityHelp: string, depth: [number, number], withBags: boolean): Field[] => [
  ...areaFields({ length: [20, 6], width: [10, 3] }),
  depthField(depth[0], depth[1]),
  densityField(densityKg, densityHelp),
  wasteField(10, "Compaction & waste allowance", "Loose stone compacts once laid and spread. 10 % is a common starting allowance; ask your supplier."),
  ...(withBags ? [bagVolumeField(0.5, 25)] : []),
  priceField("pricePerMass", "Price by weight", "pricePerMass"),
  priceField("pricePerVolume", "Price by volume", "pricePerVolume"),
  ...(withBags ? [priceField("pricePerBag", "Price per bag", "price")] : []),
];

const DENSITY_NOTE = "Weight uses the density you entered. Bulk density varies with stone type, size and moisture — your supplier can confirm the figure for their product.";

export const gravelCalculator: CalculatorDefinition = {
  slug: "gravel-calculator",
  title: "Gravel Calculator",
  shortTitle: "Gravel",
  category: "landscaping",
  summary: "Cubic yards, tons or tonnes of gravel and crushed stone for paths, beds and bases.",
  keywords: ["gravel", "crushed stone", "stone", "aggregate", "tons of gravel", "rock", "base"],
  fields: gravelFields(DEFAULT_DENSITY.gravel, "Typical crushed stone is ≈100–110 lb/ft³ (≈1,600–1,750 kg/m³). Default: 105 lb/ft³.", [3, 8], false),
  compute: (values) => ({ results: bulkResults(values, { weight: true, bags: false }), notes: [DENSITY_NOTE] }),
};

export const peaGravelCalculator: CalculatorDefinition = {
  slug: "pea-gravel-calculator",
  title: "Pea Gravel Calculator",
  shortTitle: "Pea Gravel",
  category: "landscaping",
  summary: "Pea gravel for patios, paths and play areas — volume, weight and number of bags.",
  keywords: ["pea gravel", "pea shingle", "patio gravel", "play area", "bags of pea gravel"],
  fields: gravelFields(DEFAULT_DENSITY.peaGravel, "Pea gravel is often quoted around 90–100 lb/ft³ (≈1,450–1,600 kg/m³). Default: 95 lb/ft³.", [3, 8], true),
  compute: (values) => ({ results: bulkResults(values, { weight: true, bags: true }), notes: [DENSITY_NOTE] }),
};

export const mulchCalculator: CalculatorDefinition = {
  slug: "mulch-calculator",
  title: "Mulch Calculator",
  shortTitle: "Mulch",
  category: "landscaping",
  summary: "How many cubic yards or bags of mulch you need for garden beds at any depth.",
  keywords: ["mulch", "bark", "wood chips", "garden bed", "bags of mulch", "yards of mulch"],
  fields: [
    ...areaFields({ length: [20, 6], width: [4, 1.2] }),
    depthField(3, 7.5, "2–4 in (5–10 cm) is a widely recommended mulch depth for beds."),
    wasteField(5, "Extra allowance", "Covers settling and uneven beds."),
    bagVolumeField(2, 50),
    priceField("pricePerVolume", "Bulk price", "pricePerVolume"),
    priceField("pricePerBag", "Price per bag", "price"),
  ],
  compute: (values) => ({ results: bulkResults(values, { weight: false, bags: true }) }),
};

export const topsoilCalculator: CalculatorDefinition = {
  slug: "topsoil-calculator",
  title: "Topsoil Calculator",
  shortTitle: "Topsoil",
  category: "landscaping",
  summary: "Topsoil volume, weight and bags for lawns, raised beds and levelling.",
  keywords: ["topsoil", "soil", "dirt", "garden soil", "raised bed", "lawn", "fill"],
  fields: [
    ...areaFields({ length: [20, 6], width: [10, 3] }),
    depthField(4, 10),
    densityField(DEFAULT_DENSITY.topsoil, "Screened topsoil is often ≈70–100 lb/ft³ (≈1,100–1,600 kg/m³) depending on moisture. Default: 75 lb/ft³."),
    wasteField(10, "Settling allowance", "Loose soil settles after placing and watering; 10–20 % extra is a common allowance."),
    bagVolumeField(0.75, 25),
    priceField("pricePerVolume", "Bulk price by volume", "pricePerVolume"),
    priceField("pricePerMass", "Bulk price by weight", "pricePerMass"),
    priceField("pricePerBag", "Price per bag", "price"),
  ],
  compute: (values) => ({ results: bulkResults(values, { weight: true, bags: true }), notes: [DENSITY_NOTE] }),
};

const layerField = (id: string, label: string, imperial: number, metric: number, help?: string): NumberField =>
  numberField({ id, label, dimension: "shortLength", defaults: { imperial, metric }, min: 0, minExclusive: false, group: "Layers", help });

export const gravelDrivewayCalculator: CalculatorDefinition = {
  slug: "gravel-driveway-calculator",
  title: "Gravel Driveway Calculator",
  shortTitle: "Gravel Driveway",
  category: "landscaping",
  summary: "Stone for a layered gravel driveway — tons per layer, compaction allowance and truckloads.",
  keywords: ["driveway", "gravel driveway", "crushed stone driveway", "base course", "truckload", "road base"],
  fields: [
    numberField({ id: "length", label: "Driveway length", dimension: "length", defaults: { imperial: 50, metric: 15 }, group: "Driveway" }),
    numberField({ id: "width", label: "Driveway width", dimension: "length", defaults: { imperial: 10, metric: 3 }, group: "Driveway" }),
    layerField("base", "Base layer depth (large stone)", 4, 10, "Set a layer to 0 to skip it."),
    layerField("middle", "Middle layer depth", 4, 10),
    layerField("top", "Top / surface layer depth", 2, 5),
    densityField(DEFAULT_DENSITY.gravel, "Used for all layers. Default 105 lb/ft³ (≈1,680 kg/m³) for crushed stone."),
    { ...wasteField(10, "Compaction allowance", "Crushed stone compacts under a roller or plate compactor; 10–20 % extra is commonly allowed."), id: "waste" },
    numberField({ id: "truck", label: "Delivery truck capacity", dimension: "bulkMass", defaults: { imperial: "", metric: "" }, optional: true, group: "Delivery", help: "Ask your supplier — capacity depends on the truck and local weight limits." }),
    priceField("pricePerMass", "Price by weight", "pricePerMass"),
  ],
  compute(values) {
    const r = gravelDriveway({
      length: num(values, "length"),
      width: num(values, "width"),
      layers: [{ depth: num(values, "base") }, { depth: num(values, "middle") }, { depth: num(values, "top") }],
      compactionPercent: num(values, "waste"),
      density: num(values, "density"),
      truckCapacityKg: optNum(values, "truck"),
      pricePerTonne: (optNum(values, "pricePerMass") ?? 0) * 1000,
    });
    const names = ["Base layer", "Middle layer", "Top layer"];
    const results: ResultItem[] = [
      { id: "weight", label: "Total stone (incl. compaction)", kind: "mass", value: r.weightKg, primary: true },
      { id: "volume", label: "Total volume", kind: "volume", value: r.volume, primary: true },
      { id: "area", label: "Driveway area", kind: "area", value: r.area },
      { id: "depth", label: "Total depth", kind: "shortLength", value: r.totalDepth },
      ...r.layers.flatMap((l, i) =>
        l.depth > 0 ? [{ id: `layer${i}`, label: names[i], kind: "mass" as const, value: l.weightKg, note: undefined }] : [],
      ),
    ];
    if (r.truckloads !== undefined) results.push({ id: "trucks", label: "Truckloads", kind: "count", value: r.truckloads, suffix: "loads" });
    if (r.cost !== undefined) results.push({ id: "cost", label: "Stone cost estimate", kind: "money", value: r.cost });
    return { results, notes: [DENSITY_NOTE] };
  },
};
