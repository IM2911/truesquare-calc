import { describe, expect, it } from "vitest";
import { bulkMaterial, DEFAULT_DENSITY, gravelDriveway } from "@/lib/calc/landscaping";
import { FT, FT2, FT3, IN, LB, SHORT_TON, YD3 } from "@/lib/units";

describe("bulkMaterial", () => {
  it("mulch: 100 ft² at 3 in = 25 ft³ = 0.926 yd³, 13 two-cubic-foot bags", () => {
    const r = bulkMaterial({ area: 100 * FT2, depth: 3 * IN, extraPercent: 0, bagVolume: 2 * FT3, pricePerBag: 4 });
    expect(r.volume / FT3).toBeCloseTo(25, 8);
    expect(r.volume / YD3).toBeCloseTo(0.9259, 3);
    expect(r.bags).toBe(13);
    expect(r.costByBags).toBe(52);
  });
  it("gravel weight with default density: 1 yd³ ≈ 1.42 US tons", () => {
    const r = bulkMaterial({ area: 9 * FT2, depth: 3 * FT, extraPercent: 0, density: DEFAULT_DENSITY.gravel });
    expect(r.volume / YD3).toBeCloseTo(1, 8);
    expect(r.weightKg! / SHORT_TON).toBeCloseTo(1.4175, 3);
    expect(r.weightKg! / LB).toBeCloseTo(2835, 0);
  });
  it("metric topsoil: 20 m² at 10 cm with 10 % settling = 2.2 m³", () => {
    const r = bulkMaterial({ area: 20, depth: 0.1, extraPercent: 10, density: 1200, pricePerTonne: 30, pricePerM3: 40 });
    expect(r.volumeWithExtra).toBeCloseTo(2.2, 10);
    expect(r.weightKg).toBeCloseTo(2640, 6);
    expect(r.costByWeight).toBeCloseTo(79.2, 6);
    expect(r.costByVolume).toBeCloseTo(88, 6);
  });
  it("skips weight without density", () => {
    expect(bulkMaterial({ area: 1, depth: 1, extraPercent: 0 }).weightKg).toBeUndefined();
  });
  it("rejects invalid input", () => {
    expect(() => bulkMaterial({ area: 0, depth: 1, extraPercent: 0 })).toThrow(RangeError);
    expect(() => bulkMaterial({ area: 1, depth: -0.1, extraPercent: 0 })).toThrow(RangeError);
    expect(() => bulkMaterial({ area: 1, depth: 1, extraPercent: 150 })).toThrow(RangeError);
  });
});

describe("gravelDriveway", () => {
  it("50 ft × 10 ft × 4 in = 6.17 yd³ ≈ 8.75 US tons at 105 lb/ft³", () => {
    const r = gravelDriveway({
      length: 50 * FT,
      width: 10 * FT,
      layers: [{ depth: 4 * IN }],
      compactionPercent: 0,
      density: DEFAULT_DENSITY.gravel,
    });
    expect(r.volume / YD3).toBeCloseTo(6.1728, 3);
    expect(r.weightKg / SHORT_TON).toBeCloseTo(8.75, 3);
  });
  it("sums layers, applies compaction and counts truckloads", () => {
    const r = gravelDriveway({
      length: 20,
      width: 3,
      layers: [{ depth: 0.15 }, { depth: 0.1 }, { depth: 0 }],
      compactionPercent: 10,
      density: 1600,
      truckCapacityKg: 10000,
      pricePerTonne: 35,
    });
    expect(r.area).toBe(60);
    expect(r.totalDepth).toBeCloseTo(0.25, 10);
    expect(r.volume).toBeCloseTo(16.5, 8);
    expect(r.weightKg).toBeCloseTo(26400, 6);
    expect(r.truckloads).toBe(3);
    expect(r.cost).toBeCloseTo(924, 6);
    expect(r.layers[2].volume).toBe(0);
  });
  it("requires at least one non-zero layer", () => {
    expect(() =>
      gravelDriveway({ length: 1, width: 1, layers: [{ depth: 0 }], compactionPercent: 0, density: 1600 }),
    ).toThrow(/At least one layer/);
  });
});
