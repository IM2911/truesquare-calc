import { ceilSafe, ROOFING_SQUARE, withWaste } from "../units";
import { assertFinite, assertNonNegative, assertPercent, assertPositive } from "./validate";

const DEG = Math.PI / 180;

export interface PitchResult {
  /** Rise per 12 units of run (the "X" in X/12). */
  risePer12: number;
  angleDeg: number;
  /** Grade as a percentage (rise ÷ run × 100). */
  slopePercent: number;
  /** Rafter / slope factor: √(1 + (rise/run)²). */
  multiplier: number;
}

export function pitchFromRiseRun(rise: number, run: number): PitchResult {
  assertNonNegative("Rise", rise);
  assertPositive("Run", run);
  const ratio = rise / run;
  return {
    risePer12: ratio * 12,
    angleDeg: Math.atan(ratio) / DEG,
    slopePercent: ratio * 100,
    multiplier: Math.sqrt(1 + ratio * ratio),
  };
}

export function pitchFromAngle(angleDeg: number): PitchResult {
  assertFinite("Angle", angleDeg);
  if (angleDeg < 0 || angleDeg >= 90) throw new RangeError("Angle must be between 0° and 90°");
  return pitchFromRiseRun(Math.tan(angleDeg * DEG), 1);
}

/** Rafter length along the slope for a horizontal run. */
export function rafterLength(horizontalRun: number, multiplier: number): number {
  assertPositive("Horizontal run", horizontalRun);
  assertPositive("Multiplier", multiplier);
  return horizontalRun * multiplier;
}

export interface RoofAreaInput {
  /** Building footprint length and width in m (walls). */
  length: number;
  width: number;
  /** Eave / rake overhang added to every side, m. */
  overhang: number;
  /** Rise per unit run. */
  pitchRatio: number;
  wastePercent: number;
  /** Bundles per roofing square (100 ft²), optional. */
  bundlesPerSquare?: number;
  pricePerBundle?: number;
}

export interface RoofAreaResult {
  /** Plan (horizontal) area including overhangs, m². */
  planArea: number;
  /** Sloped surface area, m². */
  roofArea: number;
  roofAreaWithWaste: number;
  squares: number;
  bundles?: number;
  cost?: number;
}

/**
 * For any roof whose planes share one pitch (gable, hip, shed),
 * sloped area = plan area × √(1 + pitch²).
 */
export function roofArea(input: RoofAreaInput): RoofAreaResult {
  assertPositive("Length", input.length);
  assertPositive("Width", input.width);
  assertNonNegative("Overhang", input.overhang);
  assertNonNegative("Pitch", input.pitchRatio);
  assertPercent("Waste", input.wastePercent, 100);
  const planArea = (input.length + 2 * input.overhang) * (input.width + 2 * input.overhang);
  const multiplier = Math.sqrt(1 + input.pitchRatio ** 2);
  const area = planArea * multiplier;
  const roofAreaWithWaste = withWaste(area, input.wastePercent);
  const squares = roofAreaWithWaste / ROOFING_SQUARE;
  const result: RoofAreaResult = { planArea, roofArea: area, roofAreaWithWaste, squares };
  if (input.bundlesPerSquare && input.bundlesPerSquare > 0) {
    result.bundles = ceilSafe(squares * input.bundlesPerSquare);
    if (input.pricePerBundle && input.pricePerBundle > 0) result.cost = result.bundles * input.pricePerBundle;
  }
  return result;
}

/** Common pitch label, e.g. 6/12 → "6/12". Rounds to the nearest 0.1. */
export function formatPitch(risePer12: number): string {
  const r = Math.round(risePer12 * 10) / 10;
  return `${Number.isInteger(r) ? r.toFixed(0) : r.toFixed(1)}/12`;
}
