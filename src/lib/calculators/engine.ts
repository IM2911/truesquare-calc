import { fromSI, roundTo, toSI, type UnitSystem } from "@/lib/units";
import type { CalculatorDefinition, ComputeOutput, ComputeValues, Field, NumberField } from "./types";

export type RawValues = Record<string, string>;

export interface EvaluateResult {
  errors: Record<string, string>;
  output: ComputeOutput | null;
  /** Error not tied to a single field (e.g. RangeError from a formula). */
  formError?: string;
}

export function isFieldVisible(field: Field, raw: RawValues, fields: Field[]): boolean {
  if (!field.showWhen) return true;
  const controller = fields.find((f) => f.id === field.showWhen!.field);
  const value = raw[field.showWhen.field] ?? (controller?.kind === "select" ? controller.defaultValue : "");
  return field.showWhen.equals.includes(value);
}

export function defaultRawValues(fields: Field[], system: UnitSystem): RawValues {
  const out: RawValues = {};
  for (const f of fields) {
    out[f.id] = f.kind === "select" ? f.defaultValue : String(f.defaults[system]);
  }
  return out;
}

/** Parse a user-typed number. Accepts "1,5" as 1.5 and simple fractions such as "3/8" or "1 1/2". */
export function parseNumber(input: string): number | null {
  const s = input.trim().replace(/\s+/g, " ");
  if (s === "") return null;
  const mixed = /^(-?\d+)\s(\d+)\/(\d+)$/.exec(s);
  if (mixed) {
    const den = Number(mixed[3]);
    if (den === 0) return Number.NaN;
    const whole = Number(mixed[1]);
    const frac = Number(mixed[2]) / den;
    return whole < 0 ? whole - frac : whole + frac;
  }
  const frac = /^(-?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/.exec(s);
  if (frac) {
    const den = Number(frac[2]);
    return den === 0 ? Number.NaN : Number(frac[1]) / den;
  }
  // "1,250" → 1250 (thousands separator); "1,5" or "2,75" → decimal comma.
  const decimalComma = /^-?\d+,(\d{1,2}|\d{4,})$/.test(s);
  const normalised = decimalComma ? s.replace(",", ".") : s.replace(/,(?=\d{3}\b)/g, "");
  if (!/^-?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(normalised)) return Number.NaN;
  return Number(normalised);
}

function validateNumber(field: NumberField, value: number): string | null {
  if (!Number.isFinite(value)) return "Enter a valid number";
  if (field.integer && !Number.isInteger(value)) return "Enter a whole number";
  if (field.min !== undefined) {
    if (field.minExclusive ? value <= field.min : value < field.min) {
      return field.minExclusive ? `Must be greater than ${field.min}` : `Must be at least ${field.min}`;
    }
  }
  if (field.max !== undefined && value > field.max) return `Must be ${field.max} or less`;
  return null;
}

/** Validate raw input, convert to SI and run the calculator. Never throws. */
export function evaluate(def: CalculatorDefinition, raw: RawValues, system: UnitSystem, currency: string): EvaluateResult {
  const errors: Record<string, string> = {};
  const values: ComputeValues = {};
  for (const field of def.fields) {
    if (!isFieldVisible(field, raw, def.fields)) continue;
    const input = raw[field.id] ?? "";
    if (field.kind === "select") {
      const valid = field.options.some((o) => o.value === input);
      values[field.id] = valid ? input : field.defaultValue;
      continue;
    }
    const parsed = parseNumber(input);
    if (parsed === null) {
      if (!field.optional) errors[field.id] = "This field is required";
      continue;
    }
    const problem = validateNumber(field, parsed);
    if (problem) {
      errors[field.id] = problem;
      continue;
    }
    values[field.id] = toSI(parsed, field.dimension, system);
  }
  if (Object.keys(errors).length > 0) return { errors, output: null };
  try {
    return { errors, output: def.compute(values, { system, currency }) };
  } catch (err) {
    const message = err instanceof RangeError ? err.message : "Unable to calculate with these values";
    return { errors, output: null, formError: message };
  }
}

/**
 * Convert typed values when the user switches unit system. Values that still
 * equal the previous system's default are swapped for the new default so the
 * form keeps "nice" round numbers.
 */
export function convertRawValues(fields: Field[], raw: RawValues, from: UnitSystem, to: UnitSystem): RawValues {
  const out: RawValues = { ...raw };
  for (const f of fields) {
    if (f.kind !== "number") continue;
    const current = raw[f.id] ?? "";
    if (current.trim() === String(f.defaults[from])) {
      out[f.id] = String(f.defaults[to]);
      continue;
    }
    const parsed = parseNumber(current);
    if (parsed === null || !Number.isFinite(parsed)) continue;
    const converted = fromSI(toSI(parsed, f.dimension, from), f.dimension, to);
    out[f.id] = String(roundTo(converted, f.integer ? 0 : 3));
  }
  return out;
}

/** Read a required SI number from compute values. */
export function num(values: ComputeValues, id: string): number {
  const v = values[id];
  if (typeof v !== "number") throw new RangeError(`Missing value: ${id}`);
  return v;
}

/** Read an optional SI number (undefined when blank). */
export function optNum(values: ComputeValues, id: string): number | undefined {
  const v = values[id];
  return typeof v === "number" ? v : undefined;
}

export function str(values: ComputeValues, id: string, fallback = ""): string {
  const v = values[id];
  return typeof v === "string" ? v : fallback;
}
