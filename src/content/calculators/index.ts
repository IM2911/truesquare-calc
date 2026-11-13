import type { CalculatorContent } from "../types";
import { concreteContent } from "./concrete";
import { flooringContent } from "./flooring";
import { landscapingContent } from "./landscaping";
import { roofingCarpentryContent } from "./roofing-carpentry";

export const CALCULATOR_CONTENT: Record<string, CalculatorContent> = {
  ...concreteContent,
  ...landscapingContent,
  ...flooringContent,
  ...roofingCarpentryContent,
};

export function getCalculatorContent(slug: string): CalculatorContent | undefined {
  return CALCULATOR_CONTENT[slug];
}
