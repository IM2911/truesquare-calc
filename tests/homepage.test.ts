import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { CALCULATORS } from "@/lib/calculators/registry";
import { CATEGORIES } from "@/lib/categories";
import { GUIDES } from "@/content/guides";

/**
 * The home page is a static file (public/index.html, built with the taste-skill kit), so it does
 * not read the calculator registry. These checks keep it in step with the rest of the site.
 */
const html = readFileSync(new URL("../public/index.html", import.meta.url), "utf8");
const hrefs = [...html.matchAll(/href="(\/[^"#]*)"/g)].map((m) => m[1]);

describe("home page (public/index.html)", () => {
  it("links to every calculator", () => {
    for (const c of CALCULATORS) expect(hrefs, c.slug).toContain(`/${c.slug}`);
  });

  it("states the right number of calculators", () => {
    expect(html).toContain(`${CALCULATORS.length} calculators`);
  });

  it("only links to pages that exist", () => {
    const known = new Set<string>([
      "/",
      "/icon.svg",
      "/calculators",
      "/guides",
      "/resources",
      "/about",
      "/contact",
      "/privacy-policy",
      "/terms",
      "/disclaimer",
      "/affiliate-disclosure",
      ...CALCULATORS.map((c) => `/${c.slug}`),
      ...CATEGORIES.map((c) => `/category/${c.slug}`),
      ...GUIDES.map((g) => `/guides/${g.slug}`),
    ]);
    const pages = hrefs.filter((h) => !h.startsWith("/assets/"));
    for (const h of pages) expect(known, h).toContain(h);
  });

  it("has no placeholders left from the kit", () => {
    expect(html).not.toMatch(/\[[A-Z][^\]]*\]/);
    expect(html).not.toContain("lorem");
  });
});
