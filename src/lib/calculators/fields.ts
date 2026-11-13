import { circleArea, rectangleArea } from "@/lib/calc/geometry";
import { num, str } from "./engine";
import type { ComputeValues, Field, NumberField, SelectField } from "./types";

/** Reusable field builders so every calculator behaves consistently. */

export function numberField(f: Omit<NumberField, "kind">): NumberField {
  return { kind: "number", min: 0, minExclusive: true, ...f };
}

export const wasteField = (defaultPercent: number, label = "Waste / overage allowance", help?: string): NumberField => ({
  kind: "number",
  id: "waste",
  label,
  dimension: "percent",
  defaults: { imperial: defaultPercent, metric: defaultPercent },
  min: 0,
  max: 100,
  step: 1,
  group: "Allowances",
  help: help ?? "Extra material for spillage, cuts, uneven ground and breakage.",
});

export const priceField = (id: string, label: string, dimension: NumberField["dimension"], help?: string): NumberField => ({
  kind: "number",
  id,
  label,
  dimension,
  defaults: { imperial: "", metric: "" },
  min: 0,
  optional: true,
  group: "Cost estimate (optional)",
  help: help ?? "Enter your local price to estimate cost. Prices vary by supplier and region.",
});

export const quantityField = (label = "Quantity"): NumberField => ({
  kind: "number",
  id: "quantity",
  label,
  dimension: "count",
  defaults: { imperial: 1, metric: 1 },
  min: 1,
  integer: true,
  step: 1,
});

/** Area input as rectangle, circle or a known total area. */
export function areaFields(defaults: { length: [number, number]; width: [number, number] }, group = "Area"): Field[] {
  const shape: SelectField = {
    kind: "select",
    id: "shape",
    label: "Area shape",
    defaultValue: "rect",
    options: [
      { value: "rect", label: "Rectangle / square" },
      { value: "circle", label: "Circle" },
      { value: "area", label: "I know the total area" },
    ],
    group,
  };
  return [
    shape,
    numberField({ id: "length", label: "Length", dimension: "length", defaults: { imperial: defaults.length[0], metric: defaults.length[1] }, showWhen: { field: "shape", equals: ["rect"] }, group }),
    numberField({ id: "width", label: "Width", dimension: "length", defaults: { imperial: defaults.width[0], metric: defaults.width[1] }, showWhen: { field: "shape", equals: ["rect"] }, group }),
    numberField({ id: "diameter", label: "Diameter", dimension: "length", defaults: { imperial: 10, metric: 3 }, showWhen: { field: "shape", equals: ["circle"] }, group }),
    numberField({ id: "area", label: "Total area", dimension: "area", defaults: { imperial: 100, metric: 10 }, showWhen: { field: "shape", equals: ["area"] }, group, help: "Add up the areas of irregular sections first." }),
  ];
}

export function resolveArea(values: ComputeValues): number {
  const shape = str(values, "shape", "rect");
  if (shape === "circle") return circleArea(num(values, "diameter"));
  if (shape === "area") return num(values, "area");
  return rectangleArea(num(values, "length"), num(values, "width"));
}
