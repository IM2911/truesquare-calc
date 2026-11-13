import { describe, expect, it } from "vitest";
import { flooringWithWaste, groutEstimate, showerWallArea, tileEstimate } from "@/lib/calc/flooring";
import { FT, FT2, IN, IN3, LB } from "@/lib/units";

describe("tileEstimate", () => {
  it("120 ft² with 12×12 in tiles and no joint = 120 tiles, 132 with 10 % waste", () => {
    const r = tileEstimate({ area: 120 * FT2, tileLength: 12 * IN, tileWidth: 12 * IN, jointWidth: 0, wastePercent: 10 });
    expect(r.tilesNoWaste).toBe(120);
    expect(r.tilesWithWaste).toBe(132);
  });
  it("accounts for a 1/8 in grout joint", () => {
    const r = tileEstimate({ area: 120 * FT2, tileLength: 12 * IN, tileWidth: 12 * IN, jointWidth: IN / 8, wastePercent: 10 });
    expect(r.tilesExact).toBeCloseTo(117.54, 2);
    expect(r.tilesNoWaste).toBe(118);
    expect(r.tilesWithWaste).toBe(130);
  });
  it("metric: 10 m² of 600×300 mm tiles with 3 mm joints, boxes of 8", () => {
    const r = tileEstimate({ area: 10, tileLength: 0.6, tileWidth: 0.3, jointWidth: 0.003, wastePercent: 10, tilesPerBox: 8, pricePerBox: 25 });
    // effective tile 0.603 × 0.303 = 0.182709 m² → 54.73 tiles → ×1.1 = 60.21 → 61
    expect(r.tilesWithWaste).toBe(61);
    expect(r.boxes).toBe(8);
    expect(r.cost).toBe(200);
  });
  it("prices per tile when no box data", () => {
    const r = tileEstimate({ area: 1, tileLength: 0.5, tileWidth: 0.5, jointWidth: 0, wastePercent: 0, pricePerTile: 2.5 });
    expect(r.tilesWithWaste).toBe(4);
    expect(r.cost).toBe(10);
  });
  it("rejects invalid tile sizes", () => {
    expect(() => tileEstimate({ area: 1, tileLength: 0, tileWidth: 0.3, jointWidth: 0, wastePercent: 0 })).toThrow(RangeError);
    expect(() => tileEstimate({ area: 1, tileLength: 0.3, tileWidth: 0.3, jointWidth: -0.001, wastePercent: 0 })).toThrow(RangeError);
  });
});

describe("showerWallArea", () => {
  it("three walls 60 in, 32 in, 32 in × 96 in high = 82.67 ft²", () => {
    const a = showerWallArea({ wallWidths: [60 * IN, 32 * IN, 32 * IN], height: 96 * IN, openingsArea: 0 });
    expect(a / FT2).toBeCloseTo(82.6667, 3);
  });
  it("subtracts openings", () => {
    expect(showerWallArea({ wallWidths: [2, 1], height: 2, openingsArea: 0.5 })).toBeCloseTo(5.5, 10);
  });
  it("rejects openings larger than walls and empty walls", () => {
    expect(() => showerWallArea({ wallWidths: [1], height: 1, openingsArea: 2 })).toThrow(RangeError);
    expect(() => showerWallArea({ wallWidths: [0, 0], height: 1, openingsArea: 0 })).toThrow(RangeError);
  });
});

describe("flooringWithWaste", () => {
  it("200 ft² + 10 % = 220 ft², 11 boxes of 20 ft²", () => {
    const r = flooringWithWaste({ area: 200 * FT2, wastePercent: 10, boxCoverage: 20 * FT2, pricePerBox: 50 });
    expect(r.totalArea / FT2).toBeCloseTo(220, 8);
    expect(r.wasteArea / FT2).toBeCloseTo(20, 8);
    expect(r.boxes).toBe(11);
    expect(r.purchasedArea! / FT2).toBeCloseTo(220, 8);
    expect(r.cost).toBe(550);
  });
  it("rounds partial boxes up", () => {
    const r = flooringWithWaste({ area: 15, wastePercent: 7, boxCoverage: 2.2 });
    // 16.05 / 2.2 = 7.295 → 8
    expect(r.boxes).toBe(8);
    expect(r.leftoverArea).toBeCloseTo(17.6 - 15, 8);
  });
  it("prices per area on the purchased area", () => {
    const r = flooringWithWaste({ area: 10, wastePercent: 10, pricePerM2: 20 });
    expect(r.cost).toBeCloseTo(220, 8);
  });
  it("rejects zero area", () => {
    expect(() => flooringWithWaste({ area: 0, wastePercent: 10 })).toThrow(RangeError);
  });
});

describe("groutEstimate", () => {
  it("100 ft² of 12×12 in tile, 1/8 in joints, 3/8 in deep = 112.5 in³", () => {
    const r = groutEstimate({
      area: 100 * FT2,
      tileLength: 1 * FT,
      tileWidth: 1 * FT,
      jointDepth: (3 / 8) * IN,
      jointWidth: IN / 8,
      density: 1600,
      wastePercent: 0,
    });
    expect(r.volume / IN3).toBeCloseTo(112.5, 6);
    expect(r.massKg / LB).toBeCloseTo(6.5, 1);
  });
  it("metric: 10 m², 300×300×8 mm tile, 3 mm joint, 1.6 kg/L, 5 kg bags", () => {
    const r = groutEstimate({
      area: 10,
      tileLength: 0.3,
      tileWidth: 0.3,
      jointDepth: 0.008,
      jointWidth: 0.003,
      density: 1600,
      wastePercent: 10,
      bagMass: 5,
      pricePerBag: 12,
    });
    // (0.6 / 0.09) × 10 × 0.003 × 0.008 = 0.0016 m³ → ×1.1 = 0.00176 m³ → 2.816 kg
    expect(r.volume).toBeCloseTo(0.00176, 10);
    expect(r.massKg).toBeCloseTo(2.816, 6);
    expect(r.bags).toBe(1);
    expect(r.cost).toBe(12);
  });
  it("smaller tiles need more grout", () => {
    const base = { area: 1, jointDepth: 0.01, jointWidth: 0.003, density: 1600, wastePercent: 0 };
    const big = groutEstimate({ ...base, tileLength: 0.6, tileWidth: 0.6 });
    const small = groutEstimate({ ...base, tileLength: 0.1, tileWidth: 0.1 });
    expect(small.massKg).toBeGreaterThan(big.massKg * 5);
  });
  it("rejects zero joint width", () => {
    expect(() =>
      groutEstimate({ area: 1, tileLength: 0.3, tileWidth: 0.3, jointDepth: 0.01, jointWidth: 0, density: 1600, wastePercent: 0 }),
    ).toThrow(RangeError);
  });
});
