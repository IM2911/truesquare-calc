/**
 * Unit definitions and conversion helpers.
 *
 * Every calculation in /src/lib/calc works in SI base units
 * (metres, square metres, cubic metres, kilograms, kg/m³, degrees for angles).
 * The UI converts user input to SI before calling a calculator and converts
 * results back for display.
 *
 * Exact conversion factors follow NIST SP 811 / Handbook 44:
 *   1 in = 0.0254 m (exact), 1 lb = 0.45359237 kg (exact).
 */

export type UnitSystem = "imperial" | "metric";

export const IN = 0.0254;
export const FT = 0.3048;
export const YD = 0.9144;
export const FT2 = FT * FT; // 0.09290304 m²
export const YD2 = YD * YD;
export const IN3 = IN * IN * IN; // 1.6387064e-5 m³
export const FT3 = FT * FT * FT; // 0.028316846592 m³
export const YD3 = YD * YD * YD; // 0.764554857984 m³
export const LITRE = 0.001; // m³
export const LB = 0.45359237; // kg
export const SHORT_TON = 2000 * LB; // 907.18474 kg (US ton)
export const TONNE = 1000; // kg
export const LB_PER_FT3 = LB / FT3; // 16.0184634 kg/m³
/** 1 board foot = 144 cubic inches. */
export const BOARD_FOOT = 144 * IN3; // 0.002359737216 m³
export const ROOFING_SQUARE = 100 * FT2; // 9.290304 m²

/** Input dimensions a calculator field can have. */
export type Dimension =
  | "length" // ft | m
  | "shortLength" // in | cm
  | "tinyLength" // in | mm
  | "area" // ft² | m²
  | "volume" // yd³ | m³
  | "bagVolume" // ft³ | L
  | "bagMass" // lb | kg
  | "bulkMass" // US ton | tonne
  | "density" // lb/ft³ | kg/m³
  | "groutDensity" // lb/ft³ | kg/L
  | "angle" // degrees
  | "percent"
  | "count"
  | "number"
  | "price" // currency per item
  | "pricePerVolume" // per yd³ | per m³
  | "pricePerMass" // per US ton | per tonne
  | "pricePerArea" // per ft² | per m²
  | "pricePerBoardVolume"; // per board foot | per m³

export interface UnitDef {
  /** Short symbol shown next to inputs, e.g. "ft". */
  symbol: string;
  /** Accessible / long name, e.g. "feet". */
  name: string;
  /** Multiply a value in this unit by `toSI` to get the SI value. */
  toSI: number;
}

const unit = (symbol: string, name: string, toSI: number): UnitDef => ({ symbol, name, toSI });
const unitless = unit("", "", 1);

export const INPUT_UNITS: Record<Dimension, Record<UnitSystem, UnitDef>> = {
  length: { imperial: unit("ft", "feet", FT), metric: unit("m", "metres", 1) },
  shortLength: { imperial: unit("in", "inches", IN), metric: unit("cm", "centimetres", 0.01) },
  tinyLength: { imperial: unit("in", "inches", IN), metric: unit("mm", "millimetres", 0.001) },
  area: { imperial: unit("ft²", "square feet", FT2), metric: unit("m²", "square metres", 1) },
  volume: { imperial: unit("yd³", "cubic yards", YD3), metric: unit("m³", "cubic metres", 1) },
  bagVolume: { imperial: unit("ft³", "cubic feet", FT3), metric: unit("L", "litres", LITRE) },
  bagMass: { imperial: unit("lb", "pounds", LB), metric: unit("kg", "kilograms", 1) },
  bulkMass: { imperial: unit("tons", "US tons", SHORT_TON), metric: unit("t", "tonnes", TONNE) },
  density: {
    imperial: unit("lb/ft³", "pounds per cubic foot", LB_PER_FT3),
    metric: unit("kg/m³", "kilograms per cubic metre", 1),
  },
  groutDensity: {
    imperial: unit("lb/ft³", "pounds per cubic foot", LB_PER_FT3),
    metric: unit("kg/L", "kilograms per litre", 1000),
  },
  angle: { imperial: unit("°", "degrees", 1), metric: unit("°", "degrees", 1) },
  percent: { imperial: unit("%", "percent", 1), metric: unit("%", "percent", 1) },
  count: { imperial: unitless, metric: unitless },
  number: { imperial: unitless, metric: unitless },
  price: { imperial: unit("each", "each", 1), metric: unit("each", "each", 1) },
  pricePerVolume: {
    imperial: unit("/yd³", "per cubic yard", 1 / YD3),
    metric: unit("/m³", "per cubic metre", 1),
  },
  pricePerMass: {
    imperial: unit("/ton", "per US ton", 1 / SHORT_TON),
    metric: unit("/tonne", "per tonne", 1 / TONNE),
  },
  pricePerArea: {
    imperial: unit("/ft²", "per square foot", 1 / FT2),
    metric: unit("/m²", "per square metre", 1),
  },
  pricePerBoardVolume: {
    imperial: unit("/bd ft", "per board foot", 1 / BOARD_FOOT),
    metric: unit("/m³", "per cubic metre", 1),
  },
};

export function toSI(value: number, dimension: Dimension, system: UnitSystem): number {
  return value * INPUT_UNITS[dimension][system].toSI;
}

export function fromSI(value: number, dimension: Dimension, system: UnitSystem): number {
  return value / INPUT_UNITS[dimension][system].toSI;
}

/** Round to a number of decimal places, avoiding binary artefacts such as 1.005 → 1. */
export function roundTo(value: number, decimals = 2): number {
  if (!Number.isFinite(value)) return value;
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/**
 * Round up to a whole number, tolerating floating-point noise so that
 * 12.000000000001 becomes 12 rather than 13.
 */
export function ceilSafe(value: number, tolerance = 1e-9): number {
  if (!Number.isFinite(value)) return value;
  const rounded = Math.round(value);
  if (Math.abs(value - rounded) < tolerance) return rounded;
  return Math.ceil(value);
}

/** Apply a waste / overage percentage. 10 → +10 %. */
export function withWaste(quantity: number, wastePercent: number): number {
  return quantity * (1 + wastePercent / 100);
}
