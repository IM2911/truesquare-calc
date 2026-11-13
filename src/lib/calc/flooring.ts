import { ceilSafe, withWaste } from "../units";
import { assertFinite, assertNonNegative, assertPercent, assertPositive } from "./validate";

export interface TileInput {
  /** Area to tile in m². */
  area: number;
  /** Tile length and width in m. */
  tileLength: number;
  tileWidth: number;
  /** Grout joint width in m (0 for none). */
  jointWidth: number;
  wastePercent: number;
  /** Tiles per box (optional). */
  tilesPerBox?: number;
  pricePerBox?: number;
  pricePerTile?: number;
}

export interface TileResult {
  area: number;
  /** Area each tile occupies including half a joint on every side, m². */
  effectiveTileArea: number;
  tilesExact: number;
  tilesNoWaste: number;
  tilesWithWaste: number;
  boxes?: number;
  cost?: number;
}

/**
 * Tiles = area ÷ ((tile L + joint) × (tile W + joint)), plus waste, rounded up.
 */
export function tileEstimate(input: TileInput): TileResult {
  assertPositive("Area", input.area);
  assertPositive("Tile length", input.tileLength);
  assertPositive("Tile width", input.tileWidth);
  assertNonNegative("Grout joint", input.jointWidth);
  assertPercent("Waste", input.wastePercent, 100);
  const effectiveTileArea = (input.tileLength + input.jointWidth) * (input.tileWidth + input.jointWidth);
  const tilesExact = input.area / effectiveTileArea;
  const tilesNoWaste = ceilSafe(tilesExact);
  const tilesWithWaste = ceilSafe(withWaste(tilesExact, input.wastePercent));
  const result: TileResult = { area: input.area, effectiveTileArea, tilesExact, tilesNoWaste, tilesWithWaste };
  if (input.tilesPerBox && input.tilesPerBox > 0) {
    result.boxes = ceilSafe(tilesWithWaste / input.tilesPerBox);
    if (input.pricePerBox && input.pricePerBox > 0) result.cost = result.boxes * input.pricePerBox;
  }
  if (result.cost === undefined && input.pricePerTile && input.pricePerTile > 0) {
    result.cost = tilesWithWaste * input.pricePerTile;
  }
  return result;
}

export interface ShowerWallsInput {
  /** Wall widths in m (back wall + side walls; 0 to skip a wall). */
  wallWidths: number[];
  /** Tiled height in m. */
  height: number;
  /** Area of openings not tiled (window, niche back if tiled separately) in m². */
  openingsArea: number;
}

export function showerWallArea(input: ShowerWallsInput): number {
  assertPositive("Tile height", input.height);
  assertNonNegative("Openings", input.openingsArea);
  input.wallWidths.forEach((w, i) => assertNonNegative(`Wall ${i + 1} width`, w));
  const gross = input.wallWidths.reduce((s, w) => s + w * input.height, 0);
  if (gross <= 0) throw new RangeError("Enter the width of at least one wall");
  const net = gross - input.openingsArea;
  if (net <= 0) throw new RangeError("Openings cannot be larger than the wall area");
  return net;
}

/** Suggested waste allowance by installation pattern (common trade rules of thumb). */
export const LAYOUT_WASTE: Record<string, { percent: number; label: string }> = {
  straight: { percent: 10, label: "Straight / grid lay (5–10 %)" },
  brick: { percent: 10, label: "Staggered / brick bond (≈10 %)" },
  diagonal: { percent: 15, label: "Diagonal (10–15 %)" },
  herringbone: { percent: 20, label: "Herringbone / chevron (15–20 %)" },
};

export interface FlooringInput {
  area: number;
  wastePercent: number;
  /** Coverage per box in m² (optional). */
  boxCoverage?: number;
  /** Price per m² (optional). */
  pricePerM2?: number;
  pricePerBox?: number;
}

export interface FlooringResult {
  area: number;
  wasteArea: number;
  totalArea: number;
  boxes?: number;
  purchasedArea?: number;
  leftoverArea?: number;
  cost?: number;
}

export function flooringWithWaste(input: FlooringInput): FlooringResult {
  assertPositive("Floor area", input.area);
  assertPercent("Waste", input.wastePercent, 100);
  const totalArea = withWaste(input.area, input.wastePercent);
  const result: FlooringResult = { area: input.area, wasteArea: totalArea - input.area, totalArea };
  if (input.boxCoverage && input.boxCoverage > 0) {
    result.boxes = ceilSafe(totalArea / input.boxCoverage);
    result.purchasedArea = result.boxes * input.boxCoverage;
    result.leftoverArea = result.purchasedArea - input.area;
    if (input.pricePerBox && input.pricePerBox > 0) result.cost = result.boxes * input.pricePerBox;
  }
  if (result.cost === undefined && input.pricePerM2 && input.pricePerM2 > 0) {
    result.cost = (result.purchasedArea ?? totalArea) * input.pricePerM2;
  }
  return result;
}

export interface GroutInput {
  area: number;
  tileLength: number;
  tileWidth: number;
  /** Joint depth – normally the tile thickness (m). */
  jointDepth: number;
  jointWidth: number;
  /** Cured grout density in kg/m³. */
  density: number;
  wastePercent: number;
  /** Bag / tub mass in kg (optional). */
  bagMass?: number;
  pricePerBag?: number;
}

export interface GroutResult {
  /** Joint length per m² of tiling, m/m². */
  jointLengthPerM2: number;
  volume: number;
  massKg: number;
  bags?: number;
  cost?: number;
}

/**
 * Grout volume = area × (L + W) / (L × W) × joint width × joint depth.
 * (L + W)/(L × W) is the joint length per unit area for a square grid.
 */
export function groutEstimate(input: GroutInput): GroutResult {
  assertPositive("Area", input.area);
  assertPositive("Tile length", input.tileLength);
  assertPositive("Tile width", input.tileWidth);
  assertPositive("Joint depth", input.jointDepth);
  assertPositive("Joint width", input.jointWidth);
  assertPositive("Grout density", input.density);
  assertPercent("Waste", input.wastePercent, 100);
  assertFinite("Area", input.area);
  const jointLengthPerM2 = (input.tileLength + input.tileWidth) / (input.tileLength * input.tileWidth);
  const volume = withWaste(input.area * jointLengthPerM2 * input.jointWidth * input.jointDepth, input.wastePercent);
  const massKg = volume * input.density;
  const result: GroutResult = { jointLengthPerM2, volume, massKg };
  if (input.bagMass && input.bagMass > 0) {
    result.bags = ceilSafe(massKg / input.bagMass);
    if (input.pricePerBag && input.pricePerBag > 0) result.cost = result.bags * input.pricePerBag;
  }
  return result;
}
