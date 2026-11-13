import { describe, expect, it } from "vitest";
import { cylinderVolume, rectangularVolume, stepsVolume, tubeVolume, circleArea } from "@/lib/calc/geometry";
import { bagsNeeded, concreteEstimate, coveragePerVolume, estimatedBagYield, YIELD_M3_PER_KG } from "@/lib/calc/concrete";
import { FT, FT3, IN, LB, YD3 } from "@/lib/units";

describe("geometry", () => {
  it("rectangular slab 10 ft × 10 ft × 4 in = 33.33 ft³ = 1.235 yd³", () => {
    const v = rectangularVolume(10 * FT, 10 * FT, 4 * IN);
    expect(v / FT3).toBeCloseTo(33.3333, 3);
    expect(v / YD3).toBeCloseTo(1.2346, 3);
  });
  it("metric slab 4 m × 3 m × 10 cm = 1.2 m³", () => {
    expect(rectangularVolume(4, 3, 0.1)).toBeCloseTo(1.2, 10);
  });
  it("cylinder 12 in diameter × 4 ft = 3.1416 ft³", () => {
    expect(cylinderVolume(1 * FT, 4 * FT) / FT3).toBeCloseTo(Math.PI, 6);
  });
  it("tube removes the inner void", () => {
    expect(tubeVolume(1, 0.5, 1)).toBeCloseTo(Math.PI * (0.25 - 0.0625), 10);
    expect(tubeVolume(1, 0, 1)).toBeCloseTo(cylinderVolume(1, 1), 10);
  });
  it("steps: 3 steps, 3 ft wide, 7 in rise, 11 in run", () => {
    // 3 × (11/12) × (7/12) × 6 = 9.625 ft³
    expect(stepsVolume(3 * FT, 7 * IN, 11 * IN, 3) / FT3).toBeCloseTo(9.625, 6);
  });
  it("circle area", () => {
    expect(circleArea(2)).toBeCloseTo(Math.PI, 10);
  });
  it("rejects invalid input", () => {
    expect(() => rectangularVolume(0, 1, 1)).toThrow(RangeError);
    expect(() => rectangularVolume(-1, 1, 1)).toThrow(RangeError);
    expect(() => rectangularVolume(Number.NaN, 1, 1)).toThrow(RangeError);
    expect(() => rectangularVolume(Infinity, 1, 1)).toThrow(RangeError);
    expect(() => tubeVolume(1, 1, 1)).toThrow(/Inner diameter/);
    expect(() => stepsVolume(1, 1, 1, 0)).toThrow(RangeError);
    expect(() => stepsVolume(1, 1, 1, 2.5)).toThrow(RangeError);
  });
});

describe("concrete bags", () => {
  it("uses the common US yields for standard bag sizes", () => {
    expect(estimatedBagYield(80 * LB) / FT3).toBeCloseTo(0.6, 8);
    expect(estimatedBagYield(60 * LB) / FT3).toBeCloseTo(0.45, 8);
    expect(estimatedBagYield(50 * LB) / FT3).toBeCloseTo(0.375, 8);
    expect(estimatedBagYield(40 * LB) / FT3).toBeCloseTo(0.3, 8);
  });
  it("scales metric bags by mass", () => {
    expect(estimatedBagYield(20) * 1000).toBeCloseTo(9.36, 2); // litres
    expect(estimatedBagYield(25)).toBeCloseTo(25 * YIELD_M3_PER_KG, 12);
  });
  it("rounds bags up and tolerates exact multiples", () => {
    expect(bagsNeeded(33.3333 * FT3, 0.6 * FT3).rounded).toBe(56);
    expect(bagsNeeded(6 * FT3, 0.6 * FT3).rounded).toBe(10);
    expect(bagsNeeded(0, 0.6 * FT3).rounded).toBe(0);
  });
  it("rejects zero yield", () => {
    expect(() => bagsNeeded(1, 0)).toThrow(RangeError);
  });
});

describe("concreteEstimate", () => {
  const volume = rectangularVolume(10 * FT, 10 * FT, 4 * IN);
  it("applies waste then counts bags", () => {
    const r = concreteEstimate({ volume, wastePercent: 10, bagYield: 0.6 * FT3, pricePerBag: 6 });
    expect(r.volumeWithWaste / FT3).toBeCloseTo(36.6667, 3);
    expect(r.bags?.rounded).toBe(62);
    expect(r.bagCost).toBe(372);
  });
  it("prices ready-mix per cubic yard", () => {
    const r = concreteEstimate({ volume: YD3, wastePercent: 0, pricePerM3: 150 / YD3 });
    expect(r.readyMixCost).toBeCloseTo(150, 8);
  });
  it("omits optional outputs when prices are zero", () => {
    const r = concreteEstimate({ volume: 1, wastePercent: 0 });
    expect(r.bags).toBeUndefined();
    expect(r.readyMixCost).toBeUndefined();
    expect(r.weightKg).toBe(2400);
  });
  it("validates waste bounds", () => {
    expect(() => concreteEstimate({ volume: 1, wastePercent: -1 })).toThrow(RangeError);
    expect(() => concreteEstimate({ volume: 1, wastePercent: 101 })).toThrow(RangeError);
    expect(() => concreteEstimate({ volume: 0, wastePercent: 5 })).toThrow(RangeError);
  });
  it("1 yd³ covers 81 ft² at 4 in", () => {
    const m2PerM3 = coveragePerVolume(4 * IN);
    expect((m2PerM3 * YD3) / (FT * FT)).toBeCloseTo(81, 6);
  });
});
