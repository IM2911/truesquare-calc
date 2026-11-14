import type { CategorySlug } from "./calculators/types";

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Used in <title>. */
  title: string;
  description: string;
  intro: string;
  status: "live" | "planned";
  /** Practical advice shown under the calculator list on the category page. */
  guidance?: { heading: string; paragraphs: string[]; list?: string[] };
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
    guidance: {
      heading: "Before you order concrete",
      paragraphs: [
        "Measure inside the formwork once it is built, not from the original sketch, and check the depth in several places: small differences in thickness add up quickly over a slab. Keep every dimension in the same unit before multiplying, and add a waste allowance — most estimators use 5–10 %.",
        "The calculators tell you how much concrete you need, not how strong or thick it must be. Slab thickness, reinforcement, footing size and mix strength depend on the loads, the ground and your local building rules, so take those from your plans or a qualified professional.",
      ],
      list: [
        "Small jobs such as post holes and repairs suit pre-mixed bags; for about a cubic yard (0.75 m³) or more, ready-mix delivery is usually more practical.",
        "Plan access, labour and tools so you can place and finish the whole pour before it starts to set.",
        "Wet cement is alkaline and can burn skin: wear gloves, eye protection and long sleeves, and follow the safety advice on the bag.",
      ],
    },
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    title: "Landscaping Calculators",
    description: "Gravel, pea gravel, driveway stone, mulch and topsoil — by volume, weight and bag.",
    intro:
      "Bulk landscaping materials are sold by volume, by weight or by the bag. These calculators handle all three, so you can compare a bulk delivery with bagged material and order the right amount the first time.",
    status: "live",
    guidance: {
      heading: "Ordering landscape materials",
      paragraphs: [
        "Loose materials settle and compact once they are spread, rolled or watered, so the depth you measure after the job is less than the depth you tipped out. For stone that will be compacted, adding 10–20 % to the finished volume is a common allowance; for mulch and soil, a little extra covers settling.",
        "Suppliers sell by the cubic yard, cubic metre, ton, tonne or bag. To compare offers, convert everything to the same unit using the density the supplier gives for their product, then add any delivery charge to the bulk price.",
      ],
      list: [
        "Check the weight before collecting material yourself: a cubic yard of gravel commonly weighs around 1.4 US tons, more than many cars and small trailers can legally carry.",
        "Choose a delivery spot the truck can reach without damaging lawns, kerbs or drains, ideally close to where the material will be used.",
        "For mulch and topsoil, ask whether the product is screened and how moist it is; both affect coverage and weight.",
      ],
    },
  },
  {
    slug: "flooring",
    name: "Flooring & Tile",
    title: "Flooring & Tile Calculators",
    description: "Tiles, shower walls, flooring boxes with waste, and grout quantities.",
    intro:
      "Floor and wall coverings are sold in boxes, so small measurement errors turn into an extra trip to the store. These tools include grout joints, cutting waste and box rounding to give you a realistic purchase quantity.",
    status: "live",
    guidance: {
      heading: "Getting flooring and tile quantities right",
      paragraphs: [
        "Measure each room as a set of rectangles, add the areas, and choose a waste allowance that matches the layout: about 10 % for straight layouts, more for diagonal and herringbone patterns or rooms with many corners. Round up to whole boxes, and buy everything from the same production batch so the shade and size match.",
        "Most floor coverings also need a flat, sound subfloor. Manufacturers state how flat it must be and, for wood and laminate, how long the boards should acclimatise in the room before fitting. Their instructions take priority over any rule of thumb.",
      ],
      list: [
        "Keep a few spare tiles or boards from the same batch for future repairs.",
        "Floating floors need an expansion gap around the edges; check the manufacturer's figure before planning trims and thresholds.",
        "Grout and adhesive quantities depend on joint size and trowel notch, so calculate them separately.",
      ],
    },
  },
  {
    slug: "roofing",
    name: "Roofing",
    title: "Roofing Calculators",
    description: "Roof pitch, angle and slope conversions, roof area and roofing squares.",
    intro:
      "Convert roof pitch between X/12, degrees and percent, then turn a building footprint into sloped roof area and roofing squares for ordering shingles or underlayment.",
    status: "live",
    guidance: {
      heading: "Measuring a roof without climbing on it",
      paragraphs: [
        "You rarely need to walk on a roof to estimate it. Measure the building footprint on the ground, including the eaves and gable overhangs, and find the pitch from the attic, from a ladder at the gable end with an angle finder, or from the plans. The pitch multiplier then converts the flat footprint into the real sloped area.",
        "Roofing materials are ordered in squares of 100 ft² (about 9.29 m²) in North America and by area elsewhere. Every product also has a minimum pitch set by its manufacturer and by building codes, so check that a material is suitable for your slope before comparing prices.",
      ],
      list: [
        "Add the waste allowance your manufacturer or contractor recommends; hips, valleys and dormers increase it.",
        "Count ridge, hip and starter materials separately — they are sold by length, not by area.",
        "Working at height is dangerous: leave roof work to trained people with proper fall protection.",
      ],
    },
  },
  {
    slug: "carpentry",
    name: "Carpentry",
    title: "Carpentry Calculators",
    description: "Board feet for lumber purchases and board-and-batten layout and materials.",
    intro:
      "Plan woodworking and trim projects with exact numbers: board feet for buying hardwood and even batten spacing for accent walls.",
    status: "live",
    guidance: {
      heading: "Buying lumber and planning trim",
      paragraphs: [
        "Hardwood is commonly priced by the board foot, a volume of 144 cubic inches (1 in × 12 in × 12 in). Rough-sawn hardwood is measured on its nominal thickness, so a board sold as 4/4 counts as 1 in thick even after planing. Construction softwood, by contrast, is usually sold by the piece or by length in standard sizes such as 2 × 4, whose actual dimensions are smaller than the name suggests.",
        "Wood moves with moisture. Let boards for furniture and interior trim acclimatise indoors before cutting, and allow extra for knots, splits and cutting losses — for rough hardwood, 15 % or more is a common allowance.",
      ],
      list: [
        "For board-and-batten walls, plan the spacing so the gaps are equal and the end battens sit evenly at the corners.",
        "Mark studs, outlets and switches before fixing battens, and adjust the layout so battens do not land in awkward places.",
        "Buy all trim for one wall from the same batch so the profile and colour match.",
      ],
    },
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
