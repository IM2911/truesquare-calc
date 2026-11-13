import { ceilSafe, LB_PER_FT3, withWaste } from "../units";
import { assertNonNegative, assertPercent, assertPositive } from "./validate";

/**
 * Typical bulk densities used as editable defaults (kg/m³).
 * Real values depend on stone type, grading and moisture — suppliers can
 * quote the exact figure for their product.
 */
export const DEFAULT_DENSITY = {
  /** Crushed stone / general gravel ≈ 105 lb/ft³ (≈ 1.42 US tons per yd³). */
  gravel: 105 * LB_PER_FT3,
  /** Pea gravel ≈ 95 lb/ft³ (≈ 1.28 US tons per yd³). */
  peaGravel: 95 * LB_PER_FT3,
  /** Screened topsoil ≈ 75 lb/ft³ (≈ 1 US ton per yd³), dry-to-moist. */
  topsoil: 75 * LB_PER_FT3,
} as const;

export interface BulkMaterialInput {
  /** Area covered in m². */
  area: number;
  /** Depth in m. */
  depth: number;
  /** Extra allowance for compaction, settling or waste (%). */
  extraPercent: number;
  /** Bulk density in kg/m³ (optional – needed for weight). */
  density?: number;
  /** Bag volume in m³ (optional). */
  bagVolume?: number;
  pricePerM3?: number;
  pricePerTonne?: number;
  pricePerBag?: number;
}

export interface BulkMaterialResult {
  area: number;
  volume: number;
  volumeWithExtra: number;
  weightKg?: number;
  bags?: number;
  costByVolume?: number;
  costByWeight?: number;
  costByBags?: number;
}

/** Generic bulk material estimate used by gravel, mulch and topsoil calculators. */
export function bulkMaterial(input: BulkMaterialInput): BulkMaterialResult {
  assertPositive("Area", input.area);
  assertPositive("Depth", input.depth);
  assertPercent("Extra allowance", input.extraPercent, 100);
  const volume = input.area * input.depth;
  const volumeWithExtra = withWaste(volume, input.extraPercent);
  const result: BulkMaterialResult = { area: input.area, volume, volumeWithExtra };

  if (input.density !== undefined && input.density > 0) {
    result.weightKg = volumeWithExtra * input.density;
    if (input.pricePerTonne && input.pricePerTonne > 0) {
      result.costByWeight = (result.weightKg / 1000) * input.pricePerTonne;
    }
  }
  if (input.bagVolume !== undefined && input.bagVolume > 0) {
    result.bags = ceilSafe(volumeWithExtra / input.bagVolume);
    if (input.pricePerBag && input.pricePerBag > 0) result.costByBags = result.bags * input.pricePerBag;
  }
  if (input.pricePerM3 && input.pricePerM3 > 0) {
    result.costByVolume = volumeWithExtra * input.pricePerM3;
  }
  return result;
}

export interface DrivewayLayer {
  /** Layer depth in m (0 to skip the layer). */
  depth: number;
}

export interface DrivewayInput {
  length: number;
  width: number;
  layers: DrivewayLayer[];
  /** Extra for compaction (%), commonly 10–20 % for crushed stone bases. */
  compactionPercent: number;
  density: number;
  /** Truck capacity in kg (optional). */
  truckCapacityKg?: number;
  pricePerTonne?: number;
}

export interface DrivewayResult {
  area: number;
  totalDepth: number;
  layers: { depth: number; volume: number; weightKg: number }[];
  volume: number;
  weightKg: number;
  truckloads?: number;
  cost?: number;
}

export function gravelDriveway(input: DrivewayInput): DrivewayResult {
  assertPositive("Length", input.length);
  assertPositive("Width", input.width);
  assertPositive("Density", input.density);
  assertPercent("Compaction allowance", input.compactionPercent, 100);
  input.layers.forEach((l, i) => assertNonNegative(`Layer ${i + 1} depth`, l.depth));
  const totalDepth = input.layers.reduce((s, l) => s + l.depth, 0);
  if (totalDepth <= 0) throw new RangeError("At least one layer must have a depth greater than zero");

  const area = input.length * input.width;
  const layers = input.layers.map((l) => {
    const volume = withWaste(area * l.depth, input.compactionPercent);
    return { depth: l.depth, volume, weightKg: volume * input.density };
  });
  const volume = layers.reduce((s, l) => s + l.volume, 0);
  const weightKg = layers.reduce((s, l) => s + l.weightKg, 0);
  const result: DrivewayResult = { area, totalDepth, layers, volume, weightKg };
  if (input.truckCapacityKg && input.truckCapacityKg > 0) {
    result.truckloads = ceilSafe(weightKg / input.truckCapacityKg);
  }
  if (input.pricePerTonne && input.pricePerTonne > 0) {
    result.cost = (weightKg / 1000) * input.pricePerTonne;
  }
  return result;
}
