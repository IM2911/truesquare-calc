import { describe, expect, it } from "vitest";
import { ceilSafe, FT, FT3, fromSI, IN, LB, roundTo, toSI, withWaste, YD3, BOARD_FOOT } from "@/lib/units";

describe("unit constants (NIST exact definitions)", () => {
  it("defines inch, foot and pound exactly", () => {
    expect(IN).toBe(0.0254);
    expect(FT).toBeCloseTo(0.3048, 12);
    expect(LB).toBe(0.45359237);
  });
  it("derives cubic units", () => {
    expect(FT3).toBeCloseTo(0.028316846592, 12);
    expect(YD3).toBeCloseTo(0.764554857984, 12);
    expect(YD3 / FT3).toBeCloseTo(27, 10);
    expect(BOARD_FOOT).toBeCloseTo(0.002359737216, 12);
  });
});

describe("toSI / fromSI", () => {
  it("round-trips every system", () => {
    expect(fromSI(toSI(12, "length", "imperial"), "length", "imperial")).toBeCloseTo(12, 10);
    expect(fromSI(toSI(7.5, "shortLength", "metric"), "shortLength", "metric")).toBeCloseTo(7.5, 10);
  });
  it("converts feet to metres and inches to metres", () => {
    expect(toSI(10, "length", "imperial")).toBeCloseTo(3.048, 10);
    expect(toSI(4, "shortLength", "imperial")).toBeCloseTo(0.1016, 10);
    expect(toSI(10, "shortLength", "metric")).toBeCloseTo(0.1, 10);
    expect(toSI(6, "tinyLength", "metric")).toBeCloseTo(0.006, 10);
  });
  it("converts prices per unit correctly", () => {
    // $150 per cubic yard → per cubic metre
    expect(toSI(150, "pricePerVolume", "imperial")).toBeCloseTo(150 / YD3, 8);
    // $40 per US ton → per kg
    expect(toSI(40, "pricePerMass", "imperial")).toBeCloseTo(40 / 907.18474, 10);
    // £30 per tonne → per kg
    expect(toSI(30, "pricePerMass", "metric")).toBeCloseTo(0.03, 10);
  });
  it("converts densities", () => {
    expect(toSI(150, "density", "imperial")).toBeCloseTo(2402.77, 1);
    expect(toSI(1.6, "groutDensity", "metric")).toBeCloseTo(1600, 8);
  });
});

describe("rounding helpers", () => {
  it("roundTo avoids binary artefacts", () => {
    expect(roundTo(1.005, 2)).toBe(1.01);
    expect(roundTo(2.345, 1)).toBe(2.3);
    expect(roundTo(-1.5, 0)).toBe(-1);
  });
  it("ceilSafe ignores floating-point noise", () => {
    expect(ceilSafe(12.000000000001)).toBe(12);
    expect(ceilSafe(11.9999999999)).toBe(12);
    expect(ceilSafe(12.01)).toBe(13);
    expect(ceilSafe(0)).toBe(0);
  });
  it("withWaste adds a percentage", () => {
    expect(withWaste(100, 10)).toBeCloseTo(110, 10);
    expect(withWaste(100, 0)).toBe(100);
  });
});
