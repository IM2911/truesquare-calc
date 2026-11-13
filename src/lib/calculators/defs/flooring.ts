import { flooringWithWaste, groutEstimate, LAYOUT_WASTE, showerWallArea, tileEstimate } from "@/lib/calc/flooring";
import { num, optNum, str } from "../engine";
import { areaFields, numberField, priceField, resolveArea, wasteField } from "../fields";
import type { CalculatorDefinition, ComputeValues, Field, ResultItem } from "../types";

const tileSizeFields = (group = "Tile"): Field[] => [
  numberField({ id: "tileLength", label: "Tile length", dimension: "tinyLength", defaults: { imperial: 12, metric: 300 }, group }),
  numberField({ id: "tileWidth", label: "Tile width", dimension: "tinyLength", defaults: { imperial: 12, metric: 300 }, group }),
  numberField({
    id: "joint",
    label: "Grout joint width",
    dimension: "tinyLength",
    defaults: { imperial: 0.125, metric: 3 },
    min: 0,
    minExclusive: false,
    group,
    help: "Fractions such as 1/8 or 3/16 are accepted. Use 0 to ignore joints.",
  }),
];

const boxFields: Field[] = [
  numberField({ id: "perBox", label: "Tiles per box", dimension: "count", defaults: { imperial: "", metric: "" }, integer: true, optional: true, group: "Boxes & cost (optional)" }),
  priceField("pricePerBox", "Price per box", "price"),
  priceField("pricePerTile", "Price per tile", "price", "Used when tiles per box is not set."),
];

function tileResults(area: number, values: ComputeValues): ResultItem[] {
  const r = tileEstimate({
    area,
    tileLength: num(values, "tileLength"),
    tileWidth: num(values, "tileWidth"),
    jointWidth: num(values, "joint"),
    wastePercent: num(values, "waste"),
    tilesPerBox: optNum(values, "perBox"),
    pricePerBox: optNum(values, "pricePerBox"),
    pricePerTile: optNum(values, "pricePerTile"),
  });
  const results: ResultItem[] = [
    { id: "tiles", label: "Tiles to buy (incl. waste)", kind: "count", value: r.tilesWithWaste, suffix: "tiles", primary: true },
  ];
  if (r.boxes !== undefined) results.push({ id: "boxes", label: "Boxes", kind: "count", value: r.boxes, suffix: "boxes", primary: true });
  results.push(
    { id: "area", label: "Area to tile", kind: "area", value: r.area },
    { id: "tilesNet", label: "Tiles without waste", kind: "count", value: r.tilesNoWaste, suffix: "tiles", note: `${r.tilesExact.toFixed(1)} tiles before rounding` },
  );
  if (r.cost !== undefined) results.push({ id: "cost", label: "Tile cost estimate", kind: "money", value: r.cost });
  return results;
}

export const tileCalculator: CalculatorDefinition = {
  slug: "tile-calculator",
  title: "Tile Calculator",
  shortTitle: "Tile",
  category: "flooring",
  summary: "How many floor or wall tiles and boxes you need, including grout joints and cutting waste.",
  keywords: ["tiles", "floor tile", "wall tile", "how many tiles", "boxes of tile", "backsplash", "porcelain", "ceramic"],
  fields: [
    ...areaFields({ length: [12, 4], width: [10, 3] }),
    ...tileSizeFields(),
    wasteField(10, "Cutting & breakage allowance", "≈10 % for straight layouts; 15 % or more for diagonal, herringbone or rooms with many corners."),
    ...boxFields,
  ],
  compute: (values) => ({ results: tileResults(resolveArea(values), values) }),
};

export const showerTileCalculator: CalculatorDefinition = {
  slug: "shower-tile-calculator",
  title: "Shower Tile Calculator",
  shortTitle: "Shower Tile",
  category: "flooring",
  summary: "Tiles for shower or tub surround walls — up to three walls, minus windows and niches.",
  keywords: ["shower", "shower walls", "tub surround", "bathroom tile", "shower tile"],
  fields: [
    numberField({ id: "back", label: "Back wall width", dimension: "shortLength", defaults: { imperial: 60, metric: 150 }, group: "Walls" }),
    numberField({ id: "left", label: "Left wall width", dimension: "shortLength", defaults: { imperial: 32, metric: 90 }, min: 0, minExclusive: false, group: "Walls", help: "Enter 0 for a glass side or open side." }),
    numberField({ id: "right", label: "Right wall width", dimension: "shortLength", defaults: { imperial: 32, metric: 90 }, min: 0, minExclusive: false, group: "Walls" }),
    numberField({ id: "height", label: "Tiled height", dimension: "shortLength", defaults: { imperial: 84, metric: 210 }, group: "Walls", help: "Measure from the tray or tub to the top row of tile." }),
    numberField({ id: "openings", label: "Area not tiled (window, etc.)", dimension: "area", defaults: { imperial: 0, metric: 0 }, min: 0, minExclusive: false, group: "Walls" }),
    ...tileSizeFields(),
    wasteField(15, "Cutting & breakage allowance", "Showers involve many cuts around valves, corners and niches; 15 % is a sensible starting point."),
    ...boxFields,
  ],
  compute(values) {
    const area = showerWallArea({
      wallWidths: [num(values, "back"), num(values, "left"), num(values, "right")],
      height: num(values, "height"),
      openingsArea: num(values, "openings"),
    });
    return {
      results: tileResults(area, values),
      notes: ["The shower floor is not included — use the Tile Calculator for the floor, which often uses smaller mosaic tile."],
    };
  },
};

export const flooringWasteCalculator: CalculatorDefinition = {
  slug: "flooring-waste-calculator",
  title: "Flooring Waste Calculator",
  shortTitle: "Flooring Waste",
  category: "flooring",
  summary: "Add the right waste allowance for laminate, vinyl plank, hardwood or tile and round up to full boxes.",
  keywords: ["flooring", "laminate", "vinyl plank", "lvp", "hardwood", "waste factor", "overage", "boxes of flooring"],
  fields: [
    ...areaFields({ length: [15, 5], width: [12, 4] }),
    {
      kind: "select",
      id: "layout",
      label: "Installation pattern",
      defaultValue: "straight",
      group: "Waste",
      options: Object.entries(LAYOUT_WASTE).map(([value, v]) => ({ value, label: v.label })),
    },
    { ...wasteField(10, "Custom waste % (optional)", "Leave blank to use the suggested allowance for the pattern."), optional: true, defaults: { imperial: "", metric: "" }, group: "Waste" },
    numberField({ id: "boxCoverage", label: "Coverage per box", dimension: "area", defaults: { imperial: 20, metric: 2 }, optional: true, group: "Boxes & cost (optional)", help: "Printed on the box, e.g. 23.4 ft² or 2.2 m²." }),
    priceField("pricePerBox", "Price per box", "price"),
    priceField("pricePerArea", "Price per area", "pricePerArea", "Used when price per box is not set."),
  ],
  compute(values) {
    const layout = str(values, "layout", "straight");
    const waste = optNum(values, "waste") ?? LAYOUT_WASTE[layout]?.percent ?? 10;
    const r = flooringWithWaste({
      area: resolveArea(values),
      wastePercent: waste,
      boxCoverage: optNum(values, "boxCoverage"),
      pricePerBox: optNum(values, "pricePerBox"),
      pricePerM2: optNum(values, "pricePerArea"),
    });
    const results: ResultItem[] = [{ id: "total", label: "Flooring to buy (incl. waste)", kind: "area", value: r.totalArea, primary: true }];
    if (r.boxes !== undefined) results.push({ id: "boxes", label: "Boxes", kind: "count", value: r.boxes, suffix: "boxes", primary: true });
    results.push(
      { id: "area", label: "Room area", kind: "area", value: r.area },
      { id: "wasteUsed", label: "Waste allowance used", kind: "percent", value: waste, decimals: 1 },
      { id: "wasteArea", label: "Waste area", kind: "area", value: r.wasteArea },
    );
    if (r.purchasedArea !== undefined) results.push({ id: "purchased", label: "Area in full boxes", kind: "area", value: r.purchasedArea });
    if (r.leftoverArea !== undefined) results.push({ id: "leftover", label: "Spare after install (approx.)", kind: "area", value: r.leftoverArea, note: "Keep spare boards from the same batch for future repairs." });
    if (r.cost !== undefined) results.push({ id: "cost", label: "Flooring cost estimate", kind: "money", value: r.cost });
    return { results };
  },
};

export const groutCalculator: CalculatorDefinition = {
  slug: "grout-calculator",
  title: "Grout Calculator",
  shortTitle: "Grout",
  category: "flooring",
  summary: "How much grout to buy based on tile size, tile thickness and joint width.",
  keywords: ["grout", "tile grout", "how much grout", "sanded grout", "joint width", "bags of grout"],
  fields: [
    numberField({ id: "area", label: "Tiled area", dimension: "area", defaults: { imperial: 100, metric: 10 }, group: "Area" }),
    numberField({ id: "tileLength", label: "Tile length", dimension: "tinyLength", defaults: { imperial: 12, metric: 300 }, group: "Tile" }),
    numberField({ id: "tileWidth", label: "Tile width", dimension: "tinyLength", defaults: { imperial: 12, metric: 300 }, group: "Tile" }),
    numberField({ id: "thickness", label: "Tile thickness (joint depth)", dimension: "tinyLength", defaults: { imperial: 0.375, metric: 8 }, group: "Tile" }),
    numberField({ id: "joint", label: "Grout joint width", dimension: "tinyLength", defaults: { imperial: 0.125, metric: 3 }, group: "Tile", help: "Fractions such as 1/8 or 1/16 are accepted." }),
    numberField({
      id: "density",
      label: "Grout density",
      dimension: "groutDensity",
      defaults: { imperial: 100, metric: 1.6 },
      group: "Grout",
      help: "≈1.6 kg/L (≈100 lb/ft³) is a typical figure for cement grout. Your product data sheet may give a different value or its own coverage table.",
    }),
    wasteField(10, "Mixing & clean-up allowance"),
    numberField({ id: "bagMass", label: "Bag size", dimension: "bagMass", defaults: { imperial: 25, metric: 5 }, optional: true, group: "Grout" }),
    priceField("pricePerBag", "Price per bag", "price"),
  ],
  compute(values) {
    const r = groutEstimate({
      area: num(values, "area"),
      tileLength: num(values, "tileLength"),
      tileWidth: num(values, "tileWidth"),
      jointDepth: num(values, "thickness"),
      jointWidth: num(values, "joint"),
      density: num(values, "density"),
      wastePercent: num(values, "waste"),
      bagMass: optNum(values, "bagMass"),
      pricePerBag: optNum(values, "pricePerBag"),
    });
    const results: ResultItem[] = [{ id: "mass", label: "Grout needed (dry weight)", kind: "mass", value: r.massKg, primary: true }];
    if (r.bags !== undefined) results.push({ id: "bags", label: "Bags", kind: "count", value: r.bags, suffix: "bags", primary: true });
    results.push({ id: "volume", label: "Grout volume", kind: "smallVolume", value: r.volume });
    if (r.cost !== undefined) results.push({ id: "cost", label: "Grout cost estimate", kind: "money", value: r.cost });
    return { results, notes: ["Manufacturers publish their own coverage charts; when available, use them to double-check this estimate."] };
  },
};
