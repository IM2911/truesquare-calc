import { describe, expect, it } from "vitest";
import { convertRawValues, defaultRawValues, evaluate, parseNumber } from "@/lib/calculators/engine";
import { formatResult } from "@/lib/calculators/format";
import { CALCULATORS, getCalculator } from "@/lib/calculators/registry";
import { YD3 } from "@/lib/units";

describe("parseNumber", () => {
  it("parses decimals, commas and fractions", () => {
    expect(parseNumber("12")).toBe(12);
    expect(parseNumber(" 3.5 ")).toBe(3.5);
    expect(parseNumber("1,5")).toBe(1.5);
    expect(parseNumber("1,250")).toBe(1250);
    expect(parseNumber("3/8")).toBe(0.375);
    expect(parseNumber("1 1/2")).toBe(1.5);
    expect(parseNumber(".5")).toBe(0.5);
  });
  it("returns null for blank and NaN for garbage", () => {
    expect(parseNumber("")).toBeNull();
    expect(parseNumber("   ")).toBeNull();
    expect(parseNumber("abc")).toBeNaN();
    expect(parseNumber("1/0")).toBeNaN();
    expect(parseNumber("12ft")).toBeNaN();
    expect(parseNumber("<script>")).toBeNaN();
  });
});

describe("every calculator", () => {
  for (const def of CALCULATORS) {
    for (const system of ["imperial", "metric"] as const) {
      it(`${def.slug} computes with ${system} defaults`, () => {
        const res = evaluate(def, defaultRawValues(def.fields, system), system, "USD");
        expect(res.errors).toEqual({});
        expect(res.formError).toBeUndefined();
        expect(res.output?.results.length).toBeGreaterThan(0);
        for (const item of res.output!.results) {
          if (item.kind !== "text") expect(Number.isFinite(Number(item.value))).toBe(true);
          expect(formatResult(item, system, "USD").main).not.toContain("NaN");
        }
      });
    }
    it(`${def.slug} has unique field ids and a primary result`, () => {
      const ids = def.fields.map((f) => f.id);
      expect(new Set(ids).size).toBe(ids.length);
      const res = evaluate(def, defaultRawValues(def.fields, "imperial"), "imperial", "USD");
      expect(res.output!.results.some((r) => r.primary)).toBe(true);
    });
  }
});

describe("evaluate", () => {
  const def = getCalculator("concrete-calculator")!;
  it("reports field errors instead of throwing", () => {
    const raw = { ...defaultRawValues(def.fields, "imperial"), length: "-5", width: "", thickness: "abc" };
    const res = evaluate(def, raw, "imperial", "USD");
    expect(res.output).toBeNull();
    expect(Object.keys(res.errors).sort()).toEqual(["length", "thickness", "width"]);
  });
  it("ignores hidden fields", () => {
    const raw = { ...defaultRawValues(def.fields, "imperial"), form: "column", length: "" };
    expect(evaluate(def, raw, "imperial", "USD").errors).toEqual({});
  });
  it("turns formula RangeErrors into a form error", () => {
    const raw = { ...defaultRawValues(def.fields, "imperial"), form: "tube", outer: "10", inner: "12" };
    const res = evaluate(def, raw, "imperial", "USD");
    expect(res.formError).toMatch(/Inner diameter/);
  });
  it("rejects out-of-range waste", () => {
    const raw = { ...defaultRawValues(def.fields, "imperial"), waste: "150" };
    expect(evaluate(def, raw, "imperial", "USD").errors.waste).toBeDefined();
  });
  it("10 × 10 ft × 4 in slab with 0 % waste = 1.23 yd³ and 56 × 80 lb bags", () => {
    const raw = { ...defaultRawValues(def.fields, "imperial"), waste: "0" };
    const out = evaluate(def, raw, "imperial", "USD").output!;
    const vol = out.results.find((r) => r.id === "volumeWithWaste")!;
    expect(Number(vol.value) / YD3).toBeCloseTo(1.2346, 3);
    expect(out.results.find((r) => r.id === "bags")!.value).toBe(56);
  });
  it("metric and imperial give the same physical answer", () => {
    const tile = getCalculator("tile-calculator")!;
    const imp = evaluate(tile, { ...defaultRawValues(tile.fields, "imperial"), length: "10", width: "10", tileLength: "12", tileWidth: "12", joint: "0", waste: "0" }, "imperial", "USD");
    const met = evaluate(tile, { ...defaultRawValues(tile.fields, "metric"), length: "3.048", width: "3.048", tileLength: "304.8", tileWidth: "304.8", joint: "0", waste: "0" }, "metric", "USD");
    expect(imp.output!.results[0].value).toBe(100);
    expect(met.output!.results[0].value).toBe(100);
  });
});

describe("convertRawValues", () => {
  const def = getCalculator("concrete-slab-calculator")!;
  it("swaps untouched defaults for the other system's defaults", () => {
    const raw = defaultRawValues(def.fields, "imperial");
    const converted = convertRawValues(def.fields, raw, "imperial", "metric");
    expect(converted.length).toBe("4");
    expect(converted.thickness).toBe("10");
  });
  it("converts edited values", () => {
    const raw = { ...defaultRawValues(def.fields, "imperial"), length: "20" };
    const converted = convertRawValues(def.fields, raw, "imperial", "metric");
    expect(Number(converted.length)).toBeCloseTo(6.096, 3);
  });
});

describe("formatResult", () => {
  it("formats volumes in both systems", () => {
    expect(formatResult({ id: "v", label: "", kind: "volume", value: YD3 }, "imperial", "USD").main).toBe("1 yd³");
    expect(formatResult({ id: "v", label: "", kind: "volume", value: 1.5 }, "metric", "USD").main).toBe("1.5 m³");
  });
  it("formats money with the selected currency", () => {
    expect(formatResult({ id: "m", label: "", kind: "money", value: 1234.5 }, "imperial", "USD").main).toBe("$1,234.50");
    expect(formatResult({ id: "m", label: "", kind: "money", value: 10 }, "metric", "GBP").main).toBe("£10.00");
  });
  it("switches mass units for large values", () => {
    expect(formatResult({ id: "w", label: "", kind: "mass", value: 2000 }, "metric", "USD").main).toBe("2 tonnes");
    expect(formatResult({ id: "w", label: "", kind: "mass", value: 2000 }, "imperial", "USD").main).toBe("2.2 US tons");
  });
});
