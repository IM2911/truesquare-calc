# Brand Strategy

_Decision date: 13 November 2026. **No domain has been purchased.**_

## 1. Evaluation of the provisional name "BuildCalc"

| Check | Finding | Result |
|---|---|---|
| Existing use | **BuildCalc** is an established construction calculator app by 42nd Parallel (iOS App Store, Google Play; material estimation for footings, masonry, roofing, stairs). A separate "BuildCalc Pro" iPhone app (60+ construction calculators) and a "BuildCalc" engineering web app on Product Hunt also exist. | ❌ Direct conflict in the same product category |
| Trademark | Not checked against USPTO/UKIPO databases directly (search engines only). Because the name is in active commercial use for the same goods/services, the risk of a conflict (registered or common-law) is high. | ❌ High risk |
| Domain | `buildcalc.com` is registered (RDAP 200). | ❌ Unavailable |
| Memorability / pronunciation | Good | ✅ |
| SEO / brandability | Users searching "BuildCalc" would be sent to the existing app. | ❌ |

**Conclusion: rejected.**

## 2. Alternatives evaluated

Domain availability checked via the public Verisign RDAP service for `.com` on 13 Nov 2026 (HTTP 404 = no registration record). **RDAP "not found" is a strong but not absolute signal; confirm at a registrar before buying.**

| Name | .com (RDAP) | Conflicts found (web search) | Notes | Score /10 |
|---|---|---|---|---|
| **TrueSquare** (`truesquarecalc.com`) | `truesquarecalc.com` **available** | No construction calculator or estimating product named "TrueSquare" found; similar marks exist in unrelated fields (TrueSpace, TrueQ). `truesquare.com` itself is presumably registered (not checked) | "True" = accurate; "square" = carpenter's square / square footage / "squared up". Short, international, easy to pronounce. Extends to any trade. | **8.5** |
| Plumbline Calc (`plumblinecalc.com`) | available (also `.io`, `.co`) | "Construction Calculator: Plumb" (iOS) and "Plumb Roof Pro" exist — close in category | Strong trade metaphor, but closer to existing apps | 6.5 |
| SquareFootly (`squarefootly.com`) | available | None found (not deeply checked) | Very US-centric (square feet) — weak in metric markets | 5.5 |
| MateriallyMath (`materiallymath.com`) | available | None found | Awkward spelling, hard to say | 4 |
| PlumbLineCalcs (`plumblinecalcs.com`) | available | as Plumbline | Plural variant, weak | 4 |
| Rejected as registered: materialmath.com, buildmath.com, yardcalc.com, tallycalc.com, levelcalc.com, squarecalc.com, projectcalc.com, slabsmart.com, blueprintcalc.com, handycalc.com, quantly.com … | taken | — | — | — |

## 3. Decision: **TrueSquare**

- Display name: **TrueSquare**; descriptor: "Accurate home improvement & construction calculators".
- Target domain when budget allows: **truesquarecalc.com** (≈ standard .com registration price; _not purchased_). Consider also `truesquare.app` / `.io` if `.com` is lost. Before buying, the owner should run a **USPTO TESS / UKIPO / IP Australia / CIPO** trademark search for "TrueSquare" in classes 9 and 42.
- Until then the site runs on its free hosting URL (e.g. `truesquare-calc.pages.dev`) — set `NEXT_PUBLIC_SITE_URL` accordingly.
- GitHub repository name: `truesquare-calc`.

## 4. Visual identity

- **Logo mark:** rounded square in blueprint teal with a white carpenter's-square (L) shape and a safety-amber corner block (`src/components/layout/Logo.tsx`, favicon `src/app/icon.svg`). Pure SVG — scales to any size, ~300 bytes.
- **Wordmark:** "True" in ink + "Square" in brand teal, Manrope ExtraBold.
- **Palette** (defined as Tailwind theme tokens in `src/app/globals.css`):

| Token | Hex | Use |
|---|---|---|
| brand-700 | `#115473` | Primary actions, logo, headings accents (contrast 8.3:1 on white) |
| brand-800 / 900 | `#0e4058` / `#0b2f40` | Hover, result figures |
| brand-50 / 100 / 200 | `#eef6f9` / `#d5e8f0` / `#a9d0e0` | Tints, borders |
| amber-400 | `#f6bd1f` | Accent only (logo, highlights) — never text on white |
| ink / ink-soft / ink-muted | `#0f1c26` / `#3b4a57` / `#5b6874` | Text (all ≥ 4.5:1 on white and canvas) |
| canvas / surface / line | `#f6f7f4` / `#ffffff` / `#dfe4e7` | Backgrounds and dividers |

- **Typography:** Manrope (display, 600–800) + Inter (body/UI), self-hosted at build time by `next/font` (no runtime Google requests). Tabular numerals for all results.
- **Iconography:** Lucide (tree-shaken, consistent 1.5–2px strokes).
- **Tone of voice:** precise, plain English, no hype, no fake social proof. Every number explained.
