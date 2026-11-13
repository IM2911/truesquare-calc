/**
 * Affiliate product slots.
 *
 * IMPORTANT: there are NO affiliate partnerships yet. Every entry below is a
 * placeholder with `url: null`. Entries without a URL are never rendered in
 * production. When the owner joins a programme (e.g. Amazon Associates for the
 * relevant marketplace), replace `url` with the real tracking link and set
 * `program` to the programme's name. See docs/monetization-strategy.md.
 */

export type AffiliateCategory = "measuring" | "concrete" | "landscaping" | "tiling" | "flooring" | "roofing" | "woodworking" | "safety";

export interface AffiliateItem {
  id: string;
  category: AffiliateCategory;
  /** Generic product type – never a claim about a specific product we have not tested. */
  label: string;
  why: string;
  /** Real tracking URL supplied by the owner. null = placeholder (hidden in production). */
  url: string | null;
  /** Programme name once the owner has joined, e.g. "Amazon Associates (US)". */
  program: string | null;
}

export const AFFILIATE_ITEMS: AffiliateItem[] = [
  { id: "laser-measure", category: "measuring", label: "Laser distance measure", why: "Faster, more accurate room and slab measurements.", url: null, program: null },
  { id: "tape-measure", category: "measuring", label: "25 ft / 8 m tape measure", why: "Essential for every project on this site.", url: null, program: null },
  { id: "concrete-mixer", category: "concrete", label: "Portable concrete mixer", why: "Worth considering when a job needs more than a few dozen bags.", url: null, program: null },
  { id: "concrete-tools", category: "concrete", label: "Concrete finishing tool set", why: "Floats, edgers and groovers for slabs and pads.", url: null, program: null },
  { id: "plate-compactor", category: "landscaping", label: "Plate compactor (rental or purchase)", why: "Compacting each gravel layer reduces settling.", url: null, program: null },
  { id: "landscape-fabric", category: "landscaping", label: "Landscape fabric", why: "Separates gravel from soil and suppresses weeds.", url: null, program: null },
  { id: "tile-cutter", category: "tiling", label: "Manual tile cutter", why: "Clean straight cuts reduce tile waste.", url: null, program: null },
  { id: "tile-spacers", category: "tiling", label: "Tile spacers & levelling system", why: "Keeps joints consistent with your grout calculation.", url: null, program: null },
  { id: "flooring-kit", category: "flooring", label: "Laminate / vinyl installation kit", why: "Tapping block, pull bar and spacers.", url: null, program: null },
  { id: "pitch-gauge", category: "roofing", label: "Roof pitch gauge / digital angle finder", why: "Measure pitch without climbing onto the roof surface.", url: null, program: null },
  { id: "moisture-meter", category: "woodworking", label: "Wood moisture meter", why: "Check lumber before buying or installing.", url: null, program: null },
  { id: "safety-kit", category: "safety", label: "Safety glasses, gloves & dust masks", why: "Cement, stone and cutting dust are hazardous.", url: null, program: null },
];

export function affiliateItemsFor(categories: AffiliateCategory[]): AffiliateItem[] {
  return AFFILIATE_ITEMS.filter((i) => categories.includes(i.category));
}
