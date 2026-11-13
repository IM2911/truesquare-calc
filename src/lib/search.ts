import type { SearchItem } from "@/components/CalculatorSearch";
import { CALCULATORS } from "./calculators/registry";
import { getCategory } from "./categories";

export function searchItems(): SearchItem[] {
  return CALCULATORS.map((c) => ({
    slug: c.slug,
    title: c.title,
    summary: c.summary,
    terms: [c.title, c.summary, getCategory(c.category)?.name ?? "", ...c.keywords].join(" ").toLowerCase(),
  }));
}
