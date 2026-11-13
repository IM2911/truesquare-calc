import type { CategorySlug } from "./calculators/types";

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Used in <title>. */
  title: string;
  description: string;
  intro: string;
  status: "live" | "planned";
}

export const CATEGORIES: Category[] = [
  {
    slug: "concrete",
    name: "Concrete",
    title: "Concrete Calculators",
    description: "Estimate concrete volume, bags and cost for slabs, footings, columns and steps.",
    intro:
      "Work out how much concrete to order before you pour. These calculators convert your dimensions into cubic yards or cubic metres, add a waste allowance and estimate how many pre-mixed bags you would need based on the yield printed on the bag.",
    status: "live",
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    title: "Landscaping Calculators",
    description: "Gravel, pea gravel, driveway stone, mulch and topsoil — by volume, weight and bag.",
    intro:
      "Bulk landscaping materials are sold by volume, by weight or by the bag. These calculators handle all three, so you can compare a bulk delivery with bagged material and order the right amount the first time.",
    status: "live",
  },
  {
    slug: "flooring",
    name: "Flooring & Tile",
    title: "Flooring & Tile Calculators",
    description: "Tiles, shower walls, flooring boxes with waste, and grout quantities.",
    intro:
      "Floor and wall coverings are sold in boxes, so small measurement errors turn into an extra trip to the store. These tools include grout joints, cutting waste and box rounding to give you a realistic purchase quantity.",
    status: "live",
  },
  {
    slug: "roofing",
    name: "Roofing",
    title: "Roofing Calculators",
    description: "Roof pitch, angle and slope conversions, roof area and roofing squares.",
    intro:
      "Convert roof pitch between X/12, degrees and percent, then turn a building footprint into sloped roof area and roofing squares for ordering shingles or underlayment.",
    status: "live",
  },
  {
    slug: "carpentry",
    name: "Carpentry",
    title: "Carpentry Calculators",
    description: "Board feet for lumber purchases and board-and-batten layout and materials.",
    intro:
      "Plan woodworking and trim projects with exact numbers: board feet for buying hardwood and even batten spacing for accent walls.",
    status: "live",
  },
  {
    slug: "painting",
    name: "Painting",
    title: "Painting Calculators",
    description: "Paint coverage and primer calculators — planned for a future release.",
    intro: "Paint and primer calculators are planned. We will publish them only once they meet the same accuracy and testing standard as the rest of the site.",
    status: "planned",
  },
  {
    slug: "insulation",
    name: "Insulation",
    title: "Insulation Calculators",
    description: "Insulation quantity and R-value tools — planned for a future release.",
    intro: "Insulation calculators are planned. Requirements vary significantly by country and climate zone, so we are taking care to get them right.",
    status: "planned",
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
