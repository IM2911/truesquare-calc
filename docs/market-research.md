# Market Research — Home Improvement & Construction Calculators

_Research date: 13 November 2026. Target markets: US, UK, Canada, Australia. Language: English._

## 0. Method and data limitations (read first)

- Research used public web search, direct inspection of competitor pages, Semrush/Similarweb **public snapshot pages** surfaced by search, official vendor documentation and public RDAP domain lookups.
- **No paid SEO tool (Semrush, Ahrefs, Google Keyword Planner with spend) was used — the budget is €0.**
- Automated Google Autocomplete queries were **blocked by Google's bot detection**; we did not try to bypass it. DuckDuckGo's autocomplete endpoint returned no data.
- Therefore **search volume and keyword difficulty are marked _unavailable_** unless a public source showed a figure, and any such figure is labelled with its source and confidence. No numbers were invented.
- Owner action: validate the priority list below with Google Search Console data after launch (free) and, optionally, Google Keyword Planner (free with a Google Ads account; exact volumes require active spend).

## 1. Competitor analysis

| Competitor | Model | Strengths (observed) | Weaknesses / gaps (observed) |
|---|---|---|---|
| **Inch Calculator** (inchcalculator.com) | Large multi-topic calculator site, ads, apps, contractor-lead widget | Very broad construction coverage; concrete page supports slabs, circles, footings, columns, walls, curbs, steps; outputs yd³, m³, 50/60/80 lb bags and cost; named author with stated engineering background and a named reviewer; references; FAQ. Semrush public snapshot (Apr 2025) listed ~7.7M monthly visits and Authority Score 82 — _dated, third-party estimate_. | Concrete page contained an **internal inconsistency** (≈75 vs 72 × 50 lb bags per yd³). Fixed bag-yield tables (not user-editable). Lead-gen and app promos compete with the tool. |
| **Omni Calculator** (omnicalculator.com) | Massive calculator platform (claims >1 billion calculations) | Huge catalogue, named creators/reviewers, worked examples, density presets, reverse calculations. | Gravel page: default density 1,680 kg/m³ described as equivalent to 105 lb/ft³ (≈1,682) — minor; **"ton" vs "tonne" used interchangeably**; only one cited source; tool buried under long text and promotions. |
| **Calculator.net** | General calculator portal (Semrush snapshot ~61.7M visits, Apr 2025 — dated estimate) | Strong domain authority, many shapes (slab, hole, tube, curb, stairs), clean unit selectors. | Thin explanatory content; no bag yields stated; generic design; limited worked examples. |
| **Homewyse** | Cost-estimation by ZIP code | Cost ranges with transparent inclusions/exclusions; references. | Cost tables hard to read (identical ranges per line, blank totals observed); narrow material assumptions; US-only; little quantity/geometry help. |
| **QUIKRETE** | Manufacturer calculators | Authoritative for its own products; rounds up to whole bags. | Brand-locked; no generic yields on the calculator page (refers to spec sheets); US-centric. |
| **Sakrete** | Manufacturer calculators (12 tools) | Project-based (post setting, deck footings, resurfacing). | Brand-locked; values on page unlabelled (units missing); US-centric. |
| Others observed in SERPs | calculatorsoup, miniwebtool, many new `.pages.dev` AI-built clones | — | Low trust, thin content; signals that **thin programmatic pages are crowded** and unlikely to win. |

**Key takeaways**

1. The market leaders are strong on breadth and authority. A new site cannot win on catalogue size.
2. Exploitable gaps: (a) **editable product assumptions** (bag yield, density, box coverage) instead of hidden constants, (b) **true dual-system UX** (UK/AU/CA users are second-class on US sites: "ton" ambiguity, US bag sizes only), (c) **transparent, tested formulas** with worked examples that match the tool's output exactly, (d) **clean, fast, ad-light UX** on mobile.
3. Manufacturer calculators are brand-locked — a neutral tool that lets users enter any product's yield fills a real need.

## 2. Keyword clusters

Volumes/KD: **unavailable** (no paid tool access; see §0) unless stated. Intent assessed from SERP composition (calculator tools dominate = transactional-tool intent).

| Cluster | Primary keyword | Market | Volume (source) | KD (source) | Intent | Main competing pages | Page type | Why target |
|---|---|---|---|---|---|---|---|---|
| Concrete | concrete calculator | US/UK/CA/AU | Unavailable. A Semrush public overview for concretenetwork.com listed it as a ranking keyword, but the volume figure was garbled in the extract (possibly ≈368k) — **unverified** | Unavailable | Tool | Inch Calculator, Calculator.net, Omni, QUIKRETE, Home Depot | Calculator | Head term of the niche; anchors topical authority |
| Concrete | concrete slab calculator | US | Unavailable (listed as a separate keyword in a Semrush US snapshot; figure unclear) | Unavailable | Tool | Inch Calculator, Omni, Calculator.net | Calculator | Clear sub-intent (patios, sheds) |
| Concrete | concrete bag calculator / how many bags of concrete | US/CA | Unavailable | Unavailable | Tool + informational | QUIKRETE, Sakrete, Inch Calculator | Calculator | Brand-neutral gap vs manufacturers |
| Volume | cubic yard calculator | US | Unavailable | Unavailable | Tool | Calculator.net, Inch Calculator, Omni | Calculator | Cross-material utility, strong internal-link hub |
| Landscaping | gravel calculator | US/UK/AU | Unavailable | Unavailable | Tool | Omni, Calculator Soup, Inch Calculator | Calculator | Ton/tonne confusion is a competitor weakness |
| Landscaping | pea gravel calculator | US | Unavailable | Unavailable | Tool | Inch Calculator, retailers | Calculator | Long-tail, bag-oriented intent |
| Landscaping | gravel driveway calculator | US/UK | Unavailable | Unavailable | Tool + planning | Inch Calculator, supplier sites | Calculator + guide | Layered-driveway calc rarely done well |
| Landscaping | mulch calculator | US | Unavailable | Unavailable | Tool (seasonal, spring peak expected) | Retailers, Inch Calculator | Calculator + guide | Strong seasonal demand; affiliate fit |
| Landscaping | topsoil calculator | US/UK | Unavailable | Unavailable | Tool | Inch Calculator, suppliers | Calculator | — |
| Flooring | tile calculator | US/UK/AU | Unavailable | Unavailable | Tool | Calculator.net, Omni, retailers | Calculator + guide | Box rounding + joint width is a differentiator |
| Flooring | shower tile calculator | US | Unavailable | Unavailable | Tool | Inch Calculator, Omni | Calculator | Long tail, under-served |
| Flooring | flooring waste calculator | US | Unavailable | Unavailable | Tool | Retailers, Inch Calculator | Calculator | Pattern-based waste is a content gap |
| Flooring | grout calculator | US/UK | Unavailable | Unavailable | Tool | Manufacturers, Omni | Calculator | Neutral alternative to brand charts |
| Roofing | roof pitch calculator | US/CA (X/12), UK/AU (degrees) | Unavailable | Unavailable | Tool | Omni, Inch Calculator, Calculator.net | Calculator + guide | Dual-format conversion = international fit |
| Roofing | roof area calculator / roofing squares | US/CA | Unavailable | Unavailable | Tool | Omni, Inch Calculator, roofing suppliers | Calculator | High commercial intent (re-roofing) |
| Carpentry | board foot calculator | US/CA | Unavailable | Unavailable | Tool | Omni, Inch Calculator, lumber dealers | Calculator | Hardwood buyers; woodworking affiliates |
| Carpentry | board and batten calculator | US | Unavailable | Unavailable | Tool (DIY accent wall trend) | Inch Calculator, DIY blogs | Calculator | Spacing math is the real pain point |
| Informational | how much concrete do i need; cubic yards vs cubic feet; how many tiles do i need; how to calculate roof pitch; how much mulch do i need; how to calculate gravel for a driveway | All | Unavailable | Unavailable | Informational | Blogs, retailers, calculators | Guide | Supports calculators with internal links |

## 3. Initial content strategy
- Launch 17 calculators (the brief's list was kept — research did not reveal a better launch set without volume data) + 6 supporting guides + category hubs.
- Every calculator page: intent-matched H1, tool above the fold, how-to, formula, worked example that matches the tool exactly, assumptions, FAQ, sources, related tools.
- Avoid programmatic thin pages (e.g. "concrete calculator for 10x12 slab") — SERPs already show low-quality clones.
- Details: `docs/seo-strategy.md`.

## 4. Monetization opportunities
- Display ads (AdSense) after approval — high-intent DIY traffic, but sessions are short (Similarweb snapshots for inchcalculator.com showed ~1.5 pages/visit, ~68% bounce — _third-party estimate_). Ads must not degrade the tool.
- Affiliate: Amazon Associates (US/UK/CA/AU marketplaces each have separate programmes); Home Depot (US) and Home Depot Canada (reported via CJ/Impact, ~1.6% / 1–3-day cookie per third-party directories — **verify terms**); Lowe's programme availability is **conflicting in sources** (some report Canada-only / selective). No UK/AU big-box programme was confirmed in research — owner to check (e.g. via Awin or Partnerize networks).
- Digital products: planning spreadsheets/templates (free CSV versions shipped; paid versions later).
- Details: `docs/monetization-strategy.md`.

## 5. Risks
| Risk | Mitigation |
|---|---|
| Strong incumbents with high authority | Niche on quality, dual-unit UX, transparency; earn links via genuinely useful tools/guides |
| Google helpful-content/thin-content signals | No programmatic pages; real worked examples; sources |
| Calculation errors harming trust/users | Pure functions + 131 automated tests; worked examples verified against the tool |
| Structural/safety liability | Clear disclaimers; quantities only, no structural sizing |
| Vercel Hobby forbids commercial use | Static export hosted on Cloudflare Pages Free (commercial use allowed per third-party comparisons — owner to confirm ToS) |
| Brand/trademark conflicts | "BuildCalc" rejected (existing construction app); see `docs/brand-strategy.md` |
| Missing volume data | Validate with Search Console after 4–8 weeks; adjust priorities |

## 6. Recommended launch priorities
1. Concrete Calculator, Gravel Calculator, Mulch Calculator, Tile Calculator, Roof Pitch Calculator (likely head terms; also strongest guide support).
2. Concrete Slab, Concrete Bag, Cubic Yard, Gravel Driveway, Flooring Waste, Roof Area.
3. Pea Gravel, Topsoil, Shower Tile, Grout, Board Foot, Board & Batten.
4. Next build-outs (only after quality bar is met): paint calculator, drywall, insulation (country-specific R-values), deck boards, fence posts, rebar, paver/sand base, brick/block.

## Sources consulted
- Semrush public pages: inchcalculator.com overview, omnicalculator.com competitors, concretenetwork.com & quikrete.com overviews (third-party estimates, dated).
- Similarweb public pages for inchcalculator.com (third-party estimates).
- inchcalculator.com/concrete-calculator, omnicalculator.com/construction/gravel, calculator.net/concrete-calculator.html, homewyse.com tile floor cost page, quikrete.com/calculator/main.asp, sakrete.com/calculators (inspected 13 Nov 2026).
- Vercel Hobby plan docs (vercel.com/docs/plans/hobby) and fair-use/terms summaries; Cloudflare Pages limits (developers.cloudflare.com/pages/platform/limits).
- Affiliate directories (affilimate.io, getlasso.co, bixgrow.com, nichepursuits.com) — third-party, verify terms with each programme.
