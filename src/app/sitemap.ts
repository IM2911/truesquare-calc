import type { MetadataRoute } from "next";
import { GUIDES } from "@/content/guides";
import { CALCULATORS } from "@/lib/calculators/registry";
import { CATEGORIES } from "@/lib/categories";
import { absoluteUrl, SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const reviewed = new Date(SITE.lastReviewed);
  const page = (path: string, priority: number, lastModified = reviewed) => ({ url: absoluteUrl(path), lastModified, priority });
  return [
    page("/", 1),
    page("/calculators", 0.8),
    ...CALCULATORS.map((c) => page(`/${c.slug}`, 0.9)),
    // Planned (noindex) categories are excluded.
    ...CATEGORIES.filter((c) => c.status === "live").map((c) => page(`/category/${c.slug}`, 0.7)),
    page("/guides", 0.6),
    ...GUIDES.map((g) => page(`/guides/${g.slug}`, 0.7, new Date(g.updated))),
    page("/resources", 0.4),
    page("/about", 0.3),
    page("/contact", 0.3),
    page("/privacy-policy", 0.1),
    page("/terms", 0.1),
    page("/disclaimer", 0.1),
    page("/affiliate-disclosure", 0.1),
  ];
}
