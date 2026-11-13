import type { Dimension, UnitSystem } from "@/lib/units";

export type CategorySlug = "concrete" | "landscaping" | "flooring" | "roofing" | "carpentry" | "painting" | "insulation";

export interface NumberField {
  kind: "number";
  id: string;
  label: string;
  dimension: Dimension;
  /** Default value in display units for each system. Empty string = blank. */
  defaults: Record<UnitSystem, number | "">;
  min?: number;
  /** When true, `min` itself is not allowed (value must be > min). */
  minExclusive?: boolean;
  max?: number;
  step?: number;
  integer?: boolean;
  optional?: boolean;
  help?: string;
  /** Only show this field when another select field has one of these values. */
  showWhen?: { field: string; equals: string[] };
  /** Visual group heading for the field. */
  group?: string;
}

export interface SelectField {
  kind: "select";
  id: string;
  label: string;
  options: { value: string; label: string }[];
  defaultValue: string;
  help?: string;
  showWhen?: { field: string; equals: string[] };
  group?: string;
}

export type Field = NumberField | SelectField;

/** Values handed to compute(): numbers already converted to SI, selects as strings. */
export type ComputeValues = Record<string, number | string | undefined>;

export type ResultKind =
  | "volume" // m³
  | "smallVolume" // m³, displayed in in³ / L
  | "area" // m²
  | "length" // m
  | "shortLength" // m, displayed in in / cm
  | "mass" // kg
  | "count"
  | "money"
  | "angle"
  | "percent"
  | "number"
  | "text";

export interface ResultItem {
  id: string;
  label: string;
  kind: ResultKind;
  value: number | string;
  /** Highlight as a headline result. */
  primary?: boolean;
  note?: string;
  /** Decimal places override for "number" kind. */
  decimals?: number;
  /** Unit suffix for "count"/"number" kinds, e.g. "bags". */
  suffix?: string;
}

export interface ComputeContext {
  system: UnitSystem;
  currency: string;
}

export interface ComputeOutput {
  results: ResultItem[];
  notes?: string[];
}

export interface CalculatorDefinition {
  slug: string;
  title: string;
  shortTitle: string;
  category: CategorySlug;
  /** One-line summary for cards and search. */
  summary: string;
  /** Extra search terms. */
  keywords: string[];
  fields: Field[];
  compute: (values: ComputeValues, ctx: ComputeContext) => ComputeOutput;
}
