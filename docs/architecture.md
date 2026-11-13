# Architecture

```
src/
  app/                       Next.js App Router (static export)
    [calculator]/page.tsx    One template renders all 17 calculator pages (generateStaticParams, dynamicParams=false)
    category/[slug]/         Category hubs (planned ones are noindex)
    guides/, guides/[slug]/  Editorial guides
    about, contact, privacy-policy, terms, disclaimer, affiliate-disclosure, resources
    sitemap.ts, robots.ts, icon.svg, not-found.tsx, layout.tsx, globals.css (design tokens)
  components/
    calculator/Calculator.tsx   The only substantial client component (form, unit toggle, results)
    preferences.ts              Unit system + currency in localStorage via useSyncExternalStore
    CalculatorSearch.tsx        Client-side search (no network)
    monetization/               AdSlot (inert until configured), AffiliateBox (hides placeholders in prod)
    layout/, ui.tsx, LegalPage.tsx, ContactForm.tsx
  lib/
    units.ts                 Exact NIST conversion constants, toSI/fromSI, rounding helpers
    calc/                    PURE calculation functions in SI units (no React) — fully unit-tested
    calculators/
      types.ts               Declarative calculator schema (fields, dimensions, results)
      engine.ts              Parse (fractions, commas) → validate → convert to SI → compute; never throws
      format.ts              Result formatting per unit system and currency
      fields.ts              Reusable field builders (area shapes, waste, prices)
      defs/*.ts              17 calculator definitions (fields + adapter to lib/calc)
      registry.ts
    categories.ts, site.ts, affiliates.ts, search.ts
  content/                   Page copy (intro, how-to, formulas, example, FAQ, sources) and guides
tests/                       Vitest: formulas, units, engine, every calculator in both unit systems
scripts/                     serve-out.mjs (local static preview), flatten-segments.mjs (postbuild fix)
public/                      _headers (security headers), templates/*.csv
```

## Data flow
1. User types into a text input (accepts `3/8`, `1 1/2`, `1,5`, `1,250`).
2. `engine.evaluate` parses, validates against field rules (min/max/integer/required), converts to SI using `INPUT_UNITS[dimension][system]`, and calls `definition.compute`.
3. `compute` calls pure functions in `lib/calc`, which also guard their inputs (RangeError) — surfaced as a form-level message.
4. Results (SI values + kind) are formatted for the active system with the alternate system shown underneath.

## Adding a calculator
1. Pure function in `src/lib/calc/*.ts` + tests in `tests/`.
2. Definition in `src/lib/calculators/defs/*.ts`, register in `registry.ts`.
3. Content in `src/content/calculators/*.ts` (worked example must match the tool's default output — `tests/engine.test.ts` runs every definition with defaults).
4. It automatically gets a page, sitemap entry, search entry and category listing.
