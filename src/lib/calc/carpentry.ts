import { BOARD_FOOT, ceilSafe, IN, FT, withWaste } from "../units";
import { assertInteger, assertNonNegative, assertPercent, assertPositive } from "./validate";

export interface BoardFootInput {
  /** Thickness and width in m, length in m. */
  thickness: number;
  width: number;
  length: number;
  quantity: number;
  wastePercent: number;
  /** Price per m³ (SI) – optional. */
  pricePerM3?: number;
}

export interface BoardFootResult {
  /** Board feet per piece (T in × W in × L ft ÷ 12). */
  boardFeetEach: number;
  boardFeetTotal: number;
  volumeM3: number;
  cost?: number;
}

/** Board feet = thickness (in) × width (in) × length (ft) ÷ 12. */
export function boardFeet(input: BoardFootInput): BoardFootResult {
  assertPositive("Thickness", input.thickness);
  assertPositive("Width", input.width);
  assertPositive("Length", input.length);
  assertInteger("Quantity", input.quantity, 1);
  assertPercent("Waste", input.wastePercent, 100);
  const boardFeetEach = ((input.thickness / IN) * (input.width / IN) * (input.length / FT)) / 12;
  const boardFeetTotal = withWaste(boardFeetEach * input.quantity, input.wastePercent);
  const volumeM3 = boardFeetTotal * BOARD_FOOT;
  const result: BoardFootResult = { boardFeetEach, boardFeetTotal, volumeM3 };
  if (input.pricePerM3 && input.pricePerM3 > 0) result.cost = volumeM3 * input.pricePerM3;
  return result;
}

export interface BattenInput {
  /** Wall width and height in m. */
  wallWidth: number;
  wallHeight: number;
  /** Batten face width in m. */
  battenWidth: number;
  /** Desired clear gap between battens in m. */
  targetSpacing: number;
  /** Add a horizontal rail along the top and bottom. */
  includeRails: boolean;
  /** Stock length of one board in m. */
  stockLength: number;
  wastePercent: number;
  pricePerBoard?: number;
}

export interface BattenResult {
  verticalBattens: number;
  /** Actual equal gap between battens (and between end battens and wall edges = 0). */
  actualSpacing: number;
  verticalLength: number;
  railLength: number;
  totalLength: number;
  totalLengthWithWaste: number;
  boards: number;
  cost?: number;
}

/**
 * Battens are placed at both wall edges with equal gaps between them.
 * n_gaps = round((W − b) / (s + b)), battens = n_gaps + 1,
 * actual gap = (W − battens × b) / n_gaps.
 */
export function boardAndBatten(input: BattenInput): BattenResult {
  assertPositive("Wall width", input.wallWidth);
  assertPositive("Wall height", input.wallHeight);
  assertPositive("Batten width", input.battenWidth);
  assertPositive("Spacing", input.targetSpacing);
  assertPositive("Board length", input.stockLength);
  assertPercent("Waste", input.wastePercent, 100);
  assertNonNegative("Price", input.pricePerBoard ?? 0);
  if (input.wallWidth < 2 * input.battenWidth) {
    throw new RangeError("Wall is too narrow for two battens");
  }
  const gaps = Math.max(1, Math.round((input.wallWidth - input.battenWidth) / (input.targetSpacing + input.battenWidth)));
  const verticalBattens = gaps + 1;
  const actualSpacing = (input.wallWidth - verticalBattens * input.battenWidth) / gaps;
  if (actualSpacing <= 0) throw new RangeError("Battens do not fit – reduce the batten width or spacing");

  const eachVertical = input.includeRails ? input.wallHeight - 2 * input.battenWidth : input.wallHeight;
  if (eachVertical <= 0) throw new RangeError("Wall is too short for top and bottom rails");
  const verticalLength = verticalBattens * eachVertical;
  const railLength = input.includeRails ? 2 * input.wallWidth : 0;
  const totalLength = verticalLength + railLength;
  const totalLengthWithWaste = withWaste(totalLength, input.wastePercent);

  // Whole vertical pieces cut from each stock board where possible; rails by length.
  let boards: number;
  if (eachVertical <= input.stockLength) {
    const perBoard = Math.floor(input.stockLength / eachVertical + 1e-9);
    const verticalBoards = ceilSafe(withWaste(verticalBattens, input.wastePercent) / perBoard);
    const railBoards = railLength > 0 ? ceilSafe(withWaste(railLength, input.wastePercent) / input.stockLength) : 0;
    boards = verticalBoards + railBoards;
  } else {
    boards = ceilSafe(totalLengthWithWaste / input.stockLength);
  }
  const result: BattenResult = {
    verticalBattens,
    actualSpacing,
    verticalLength,
    railLength,
    totalLength,
    totalLengthWithWaste,
    boards,
  };
  if (input.pricePerBoard && input.pricePerBoard > 0) result.cost = boards * input.pricePerBoard;
  return result;
}
