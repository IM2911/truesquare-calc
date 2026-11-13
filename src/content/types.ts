import type { AffiliateCategory } from "@/lib/affiliates";

export interface Source {
  title: string;
  url: string;
  note?: string;
}

export interface CalculatorContent {
  metaTitle: string;
  metaDescription: string;
  /** Short paragraph under the H1. */
  lead: string;
  /** "What this calculator does" paragraphs. */
  intro: string[];
  howTo: string[];
  formulas: { label: string; expr: string }[];
  formulaNotes: string[];
  example: { title: string; steps: string[]; result: string };
  assumptions: string[];
  faqs: { q: string; a: string }[];
  sources: Source[];
  related: string[];
  guide?: string;
  /** Shown as a prominent warning when the result touches structural or safety matters. */
  safety?: string;
  affiliate: AffiliateCategory[];
}

export const COMMON_SOURCES = {
  nistConversion: { title: "NIST — Unit conversion (SI and US customary units)", url: "https://www.nist.gov/pml/owm/metric-si/unit-conversion" },
  nistSp811: { title: "NIST Special Publication 811 — Guide for the Use of the SI", url: "https://www.nist.gov/pml/special-publication-811" },
  quikrete: { title: "QUIKRETE — Product calculators (bag-count examples)", url: "https://www.quikrete.com/calculator/main.asp" },
  sakrete: { title: "Sakrete — Project calculators", url: "https://www.sakrete.com/calculators/" },
  pca: { title: "Portland Cement Association", url: "https://www.cement.org/" },
  aci: { title: "American Concrete Institute", url: "https://www.concrete.org/" },
  hseSilica: { title: "HSE (UK) — Silica dust in construction", url: "https://www.hse.gov.uk/construction/healthrisks/cancer-and-construction/silica-dust.htm" },
  icc: { title: "International Code Council (US model building codes)", url: "https://www.iccsafe.org/" },
  ukBuildingRegs: { title: "GOV.UK — Building regulations approval", url: "https://www.gov.uk/building-regulations-approval" },
  abcb: { title: "Australian Building Codes Board (National Construction Code)", url: "https://www.abcb.gov.au/" },
  rhsMulch: { title: "Royal Horticultural Society — Mulches", url: "https://www.rhs.org.uk/soil-composts-mulches/mulch" },
  tcna: { title: "Tile Council of North America", url: "https://www.tcnatile.com/" },
  arma: { title: "Asphalt Roofing Manufacturers Association", url: "https://www.asphaltroofing.org/" },
  nhla: { title: "National Hardwood Lumber Association (grading & board-foot measure)", url: "https://www.nhla.com/" },
  woodHandbook: { title: "USDA Forest Products Laboratory — Wood Handbook (FPL-GTR-282)", url: "https://www.fpl.fs.usda.gov/documnts/fplgtr/fpl_gtr282.pdf" },
} satisfies Record<string, Source>;
