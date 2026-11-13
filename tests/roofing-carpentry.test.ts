import { describe, expect, it } from "vitest";
import { formatPitch, pitchFromAngle, pitchFromRiseRun, rafterLength, roofArea } from "@/lib/calc/roofing";
import { boardAndBatten, boardFeet } from "@/lib/calc/carpentry";
import { BOARD_FOOT, FT, FT2, IN } from "@/lib/units";

describe("roof pitch", () => {
  it("6/12 = 26.57°, 50 %, multiplier 1.118", () => {
    const p = pitchFromRiseRun(6, 12);
    expect(p.risePer12).toBe(6);
    expect(p.angleDeg).toBeCloseTo(26.565, 3);
    expect(p.slopePercent).toBe(50);
    expect(p.multiplier).toBeCloseTo(1.118034, 6);
  });
  it("12/12 = 45°", () => {
    expect(pitchFromRiseRun(12, 12).angleDeg).toBeCloseTo(45, 10);
  });
  it("flat roof (0 rise) is valid", () => {
    const p = pitchFromRiseRun(0, 12);
    expect(p.angleDeg).toBe(0);
    expect(p.multiplier).toBe(1);
  });
  it("is unit-independent (cm in, cm out)", () => {
    expect(pitchFromRiseRun(30, 100).risePer12).toBeCloseTo(3.6, 10);
  });
  it("converts an angle back to X/12", () => {
    expect(pitchFromAngle(26.565051).risePer12).toBeCloseTo(6, 4);
    expect(pitchFromAngle(0).risePer12).toBe(0);
  });
  it("rejects invalid angles and runs", () => {
    expect(() => pitchFromAngle(90)).toThrow(RangeError);
    expect(() => pitchFromAngle(-5)).toThrow(RangeError);
    expect(() => pitchFromRiseRun(6, 0)).toThrow(RangeError);
  });
  it("rafter length for 12 ft run at 6/12", () => {
    expect(rafterLength(12 * FT, 1.118034) / FT).toBeCloseTo(13.4164, 3);
  });
  it("formats pitch labels", () => {
    expect(formatPitch(6)).toBe("6/12");
    expect(formatPitch(4.24)).toBe("4.2/12");
  });
});

describe("roofArea", () => {
  it("40 × 30 ft at 6/12 = 1,341.6 ft², 13.42 squares, 41 bundles at 3/sq", () => {
    const r = roofArea({ length: 40 * FT, width: 30 * FT, overhang: 0, pitchRatio: 0.5, wastePercent: 0, bundlesPerSquare: 3, pricePerBundle: 35 });
    expect(r.planArea / FT2).toBeCloseTo(1200, 6);
    expect(r.roofArea / FT2).toBeCloseTo(1341.64, 1);
    expect(r.squares).toBeCloseTo(13.4164, 3);
    expect(r.bundles).toBe(41);
    expect(r.cost).toBe(1435);
  });
  it("adds overhang on every side and waste", () => {
    const r = roofArea({ length: 10, width: 8, overhang: 0.5, pitchRatio: 0, wastePercent: 10 });
    expect(r.planArea).toBeCloseTo(99, 10);
    expect(r.roofAreaWithWaste).toBeCloseTo(108.9, 8);
    expect(r.bundles).toBeUndefined();
  });
  it("rejects invalid dimensions", () => {
    expect(() => roofArea({ length: 0, width: 8, overhang: 0, pitchRatio: 0.5, wastePercent: 0 })).toThrow(RangeError);
    expect(() => roofArea({ length: 1, width: 8, overhang: -1, pitchRatio: 0.5, wastePercent: 0 })).toThrow(RangeError);
  });
});

describe("boardFeet", () => {
  it("a 2×6 that is 8 ft long = 8 board feet (nominal)", () => {
    const r = boardFeet({ thickness: 2 * IN, width: 6 * IN, length: 8 * FT, quantity: 1, wastePercent: 0 });
    expect(r.boardFeetEach).toBeCloseTo(8, 10);
  });
  it("10 boards of 1×12×12 ft + 10 % waste = 132 bd ft", () => {
    const r = boardFeet({ thickness: 1 * IN, width: 12 * IN, length: 12 * FT, quantity: 10, wastePercent: 10, pricePerM3: 5 / BOARD_FOOT });
    expect(r.boardFeetTotal).toBeCloseTo(132, 8);
    expect(r.volumeM3).toBeCloseTo(132 * BOARD_FOOT, 10);
    expect(r.cost).toBeCloseTo(660, 6);
  });
  it("metric input: 50 mm × 150 mm × 3 m", () => {
    const r = boardFeet({ thickness: 0.05, width: 0.15, length: 3, quantity: 1, wastePercent: 0 });
    expect(r.volumeM3).toBeCloseTo(0.0225, 10);
    expect(r.boardFeetEach).toBeCloseTo(0.0225 / BOARD_FOOT, 8);
  });
  it("rejects fractional quantities", () => {
    expect(() => boardFeet({ thickness: 1, width: 1, length: 1, quantity: 1.5, wastePercent: 0 })).toThrow(RangeError);
    expect(() => boardFeet({ thickness: 1, width: 1, length: 1, quantity: 0, wastePercent: 0 })).toThrow(RangeError);
  });
});

describe("boardAndBatten", () => {
  it("120 in wall, 3.5 in battens, 16 in target gap → 7 battens, 15.92 in gap", () => {
    const r = boardAndBatten({
      wallWidth: 120 * IN,
      wallHeight: 96 * IN,
      battenWidth: 3.5 * IN,
      targetSpacing: 16 * IN,
      includeRails: false,
      stockLength: 8 * FT,
      wastePercent: 0,
    });
    expect(r.verticalBattens).toBe(7);
    expect(r.actualSpacing / IN).toBeCloseTo(15.9167, 3);
    expect(r.verticalLength / FT).toBeCloseTo(56, 8);
    expect(r.boards).toBe(7);
  });
  it("with rails: shorter verticals plus two rails", () => {
    const r = boardAndBatten({
      wallWidth: 3,
      wallHeight: 2.4,
      battenWidth: 0.1,
      targetSpacing: 0.4,
      includeRails: true,
      stockLength: 2.4,
      wastePercent: 10,
      pricePerBoard: 8,
    });
    // gaps = round(2.9 / 0.5) = 6 → 7 battens, gap = (3 − 0.7)/6 = 0.3833
    expect(r.verticalBattens).toBe(7);
    expect(r.actualSpacing).toBeCloseTo(0.38333, 4);
    expect(r.verticalLength).toBeCloseTo(7 * 2.2, 10);
    expect(r.railLength).toBeCloseTo(6, 10);
    // verticals: 1 per board, 7 × 1.1 = 7.7 → 8 ; rails 6.6 / 2.4 = 2.75 → 3
    expect(r.boards).toBe(11);
    expect(r.cost).toBe(88);
  });
  it("rejects a wall narrower than two battens", () => {
    expect(() =>
      boardAndBatten({ wallWidth: 0.1, wallHeight: 1, battenWidth: 0.1, targetSpacing: 0.3, includeRails: false, stockLength: 2.4, wastePercent: 0 }),
    ).toThrow(RangeError);
  });
});
