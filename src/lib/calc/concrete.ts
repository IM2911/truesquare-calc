import { ceilSafe, FT3, LB, withWaste } from "../units";
import { assertNonNegative, assertPercent, assertPositive } from "./validate";

/**
 * Typical density of hardened normal-weight concrete ≈ 2,400 kg/m³
 * (≈ 150 lb/ft³). Used only to show an approximate weight.
 */
export const CONCRETE_DENSITY_KG_M3 = 2400;

/**
 * Commonly printed yields for US pre-mixed concrete bags (cubic feet per bag).
 * These are example values only: yields differ by brand and product, so the UI
 * always lets users override them with the number printed on their bag.
 */
export const US_BAG_YIELDS_FT3: Record<number, number> = {
  40: 0.3,
  50: 0.375,
  60: 0.45,
  80: 0.6,
};

/**
 * Yield per kilogram of dry mix implied by the common "80 lb → 0.60 ft³" figure.
 * ≈ 0.000468 m³/kg, i.e. a 20 kg bag ≈ 9.4 L and a 25 kg bag ≈ 11.7 L.
 */
export const YIELD_M3_PER_KG = (0.6 * FT3) / (80 * LB);

/** Estimated bag yield in m³ for a bag of the given dry mass (kg). */
export function estimatedBagYield(bagMassKg: number): number {
  assertPositive("Bag weight", bagMassKg);
  const lb = bagMassKg / LB;
  const known = Object.entries(US_BAG_YIELDS_FT3).find(([size]) => Math.abs(Number(size) - lb) < 0.01);
  if (known) return known[1] * FT3;
  return bagMassKg * YIELD_M3_PER_KG;
}

/** Number of bags needed (always rounded up to a whole bag). */
export function bagsNeeded(volumeM3: number, yieldPerBagM3: number): { exact: number; rounded: number } {
  assertNonNegative("Volume", volumeM3);
  assertPositive("Bag yield", yieldPerBagM3);
  const exact = volumeM3 / yieldPerBagM3;
  return { exact, rounded: ceilSafe(exact) };
}

export interface ConcreteEstimateInput {
  /** Net volume in m³ (before waste). */
  volume: number;
  /** Waste / overage percent, e.g. 10. */
  wastePercent: number;
  /** Bag yield in m³ (optional). */
  bagYield?: number;
  /** Price per m³ of ready-mix (optional, 0 to skip). */
  pricePerM3?: number;
  /** Price per bag (optional, 0 to skip). */
  pricePerBag?: number;
}

export interface ConcreteEstimate {
  volume: number;
  volumeWithWaste: number;
  weightKg: number;
  bags?: { exact: number; rounded: number };
  readyMixCost?: number;
  bagCost?: number;
}

export function concreteEstimate(input: ConcreteEstimateInput): ConcreteEstimate {
  assertPositive("Volume", input.volume);
  assertPercent("Waste", input.wastePercent, 100);
  const volumeWithWaste = withWaste(input.volume, input.wastePercent);
  const result: ConcreteEstimate = {
    volume: input.volume,
    volumeWithWaste,
    weightKg: volumeWithWaste * CONCRETE_DENSITY_KG_M3,
  };
  if (input.bagYield && input.bagYield > 0) {
    result.bags = bagsNeeded(volumeWithWaste, input.bagYield);
    if (input.pricePerBag && input.pricePerBag > 0) {
      result.bagCost = result.bags.rounded * input.pricePerBag;
    }
  }
  if (input.pricePerM3 && input.pricePerM3 > 0) {
    result.readyMixCost = volumeWithWaste * input.pricePerM3;
  }
  return result;
}

/** Area one cubic metre of concrete covers at a given thickness (m² per m³). */
export function coveragePerVolume(thickness: number): number {
  assertPositive("Thickness", thickness);
  return 1 / thickness;
}
