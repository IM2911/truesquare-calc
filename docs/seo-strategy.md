# SEO Strategy

See `docs/market-research.md` for competitor analysis and the data limitations (search volumes unavailable without paid tools).

## 1. Principles
- One page per search intent; no near-duplicate or programmatic pages.
- Tool first (above the fold), then genuinely useful explanation.
- Content must be verifiable: formulas, worked examples that reproduce the tool's output, sources.
- Structured data only where it mirrors visible content. **No ratings/reviews markup.**

## 2. Technical SEO (implemented)
| Item | Implementation |
|---|---|
| Rendering | Static HTML for every route (`output: "export"`); calculators pre-render with default values so content and numbers are in the HTML |
| Titles / descriptions | Unique per page (`generateMetadata`, content files); duplicate check run on build output |
| Canonicals | Absolute, from `NEXT_PUBLIC_SITE_URL` (`alternates.canonical`) |
| Sitemap | `/sitemap.xml` (`src/app/sitemap.ts`) — 38 indexable URLs; planned categories excluded |
| robots.txt | `/robots.txt` (`src/app/robots.ts`) |
| Noindex | Planned categories (painting, insulation) and 404 |
| Open Graph / Twitter | Site defaults + per-page title/description/URL; guides use `article` type |
| Structured data | `WebSite` (home), `BreadcrumbList` (all inner pages), `WebApplication` (calculators, free offer, no ratings), `FAQPage` (calculator FAQs, visible on page), `Article` (guides) |
| Breadcrumbs | Visible + JSON-LD |
| Headings | One H1 per page; logical H2/H3 |
| Performance | No runtime third-party scripts; self-hosted fonts; SVG logo/icons; no images; small client bundle (calculator only) |
| Mobile | Mobile-first layout, verified no horizontal overflow at 375 px on 12 representative pages |
| Accessibility | Labels, `aria-invalid`/`aria-describedby` errors, live results region, skip link, focus styles, radio-group unit toggle |
| URLs | `/concrete-calculator`, `/category/concrete`, `/guides/how-much-concrete-do-i-need` — lowercase, hyphenated, no trailing variants |

## 3. Content clusters and internal linking

| Hub (category) | Calculators (spokes) | Supporting guides |
|---|---|---|
| /category/concrete | concrete, concrete-slab, concrete-bag, cubic-yard | how-much-concrete-do-i-need, cubic-yards-vs-cubic-feet |
| /category/landscaping | gravel, pea-gravel, gravel-driveway, mulch, topsoil | how-to-calculate-gravel-for-a-driveway, how-much-mulch-do-i-need |
| /category/flooring | tile, shower-tile, flooring-waste, grout | how-many-tiles-do-i-need |
| /category/roofing | roof-pitch, roof-area | how-to-calculate-roof-pitch |
| /category/carpentry | board-foot, board-and-batten | (future: lumber buying guide) |

Linking rules: every calculator links to its category (breadcrumb), 2–4 related calculators, and its guide; every guide links to 2–4 calculators; home links to all categories, popular calculators and all guides; footer links to categories, popular tools and trust pages.

## 4. Target keywords per page
| Page | Primary | Secondary / long tail | Intent |
|---|---|---|---|
| /concrete-calculator | concrete calculator | yards of concrete, concrete for footing/column/steps | Tool |
| /concrete-slab-calculator | concrete slab calculator | patio slab, shed base concrete | Tool |
| /concrete-bag-calculator | concrete bag calculator | how many 80 lb bags, bags per yard | Tool |
| /cubic-yard-calculator | cubic yard calculator | cubic feet to yards, yards of dirt | Tool |
| /gravel-calculator | gravel calculator | tons of gravel, crushed stone calculator | Tool |
| /pea-gravel-calculator | pea gravel calculator | bags of pea gravel | Tool |
| /gravel-driveway-calculator | gravel driveway calculator | how many tons of gravel for driveway | Tool |
| /mulch-calculator | mulch calculator | bags of mulch, yards of mulch | Tool |
| /topsoil-calculator | topsoil calculator | how much topsoil do I need | Tool |
| /tile-calculator | tile calculator | how many tiles do I need, boxes of tile | Tool |
| /shower-tile-calculator | shower tile calculator | tub surround tile | Tool |
| /flooring-waste-calculator | flooring waste calculator | laminate waste factor | Tool |
| /grout-calculator | grout calculator | how much grout | Tool |
| /roof-pitch-calculator | roof pitch calculator | pitch to degrees, 6/12 angle | Tool |
| /roof-area-calculator | roof area calculator | roofing squares, shingle bundles | Tool |
| /board-foot-calculator | board foot calculator | board feet formula | Tool |
| /board-and-batten-calculator | board and batten calculator | batten spacing | Tool |
| 6 guides | see titles | — | Informational |

## 5. Publishing priorities (next 3 months)
1. Submit sitemap in Google Search Console and Bing Webmaster Tools (free) once a stable URL exists.
2. Month 1: monitor impressions per page; fix titles where CTR is low.
3. Month 1–2 new guides: "How to measure a room for flooring", "Concrete slab thickness by use (with code caveats)", "Bulk vs bagged landscaping materials", "How many shingle bundles do I need".
4. Month 2–3 new calculators (only with tests + sources): paint, drywall, deck boards, fence posts, paver base/sand.
5. Earn links: offer embeddable calculators later; outreach to DIY forums only with genuinely helpful answers (no spam).
6. Spanish version: later phase, full quality only, with `hreflang`.

## 6. What we will not do
Keyword stuffing, AI-spun mass pages, fake reviews/ratings markup, doorway pages per city, hidden text.
