import { concreteBagCalculator, concreteCalculator, concreteSlabCalculator, cubicYardCalculator } from "./defs/concrete";
import { flooringWasteCalculator, groutCalculator, showerTileCalculator, tileCalculator } from "./defs/flooring";
import { gravelCalculator, gravelDrivewayCalculator, mulchCalculator, peaGravelCalculator, topsoilCalculator } from "./defs/landscaping";
import { boardAndBattenCalculator, boardFootCalculator, roofAreaCalculator, roofPitchCalculator } from "./defs/roofing-carpentry";
import type { CalculatorDefinition } from "./types";

export const CALCULATORS: CalculatorDefinition[] = [
  concreteCalculator,
  concreteSlabCalculator,
  concreteBagCalculator,
  cubicYardCalculator,
  gravelCalculator,
  peaGravelCalculator,
  gravelDrivewayCalculator,
  mulchCalculator,
  topsoilCalculator,
  tileCalculator,
  showerTileCalculator,
  flooringWasteCalculator,
  groutCalculator,
  roofPitchCalculator,
  roofAreaCalculator,
  boardFootCalculator,
  boardAndBattenCalculator,
];

const BY_SLUG = new Map(CALCULATORS.map((c) => [c.slug, c]));

export function getCalculator(slug: string): CalculatorDefinition | undefined {
  return BY_SLUG.get(slug);
}

export function mustGetCalculator(slug: string): CalculatorDefinition {
  const def = BY_SLUG.get(slug);
  if (!def) throw new Error(`Unknown calculator: ${slug}`);
  return def;
}

export function calculatorsInCategory(category: string): CalculatorDefinition[] {
  return CALCULATORS.filter((c) => c.category === category);
}
