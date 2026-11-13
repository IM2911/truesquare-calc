# TrueSquare — Home Improvement & Construction Calculators

Free, accurate calculators for concrete, landscaping, flooring, roofing and carpentry projects, in **imperial and metric** units, for the US, UK, Canada and Australia. Every calculator documents its formula, shows a worked example and states its assumptions. The calculation logic is covered by automated tests.

## Features
- **17 calculators:** Concrete, Concrete Slab, Concrete Bag, Cubic Yard · Gravel, Pea Gravel, Gravel Driveway, Mulch, Topsoil · Tile, Shower Tile, Flooring Waste, Grout · Roof Pitch, Roof Area · Board Foot, Board & Batten.
- Imperial ↔ metric switch with automatic value conversion; currency selector (USD, GBP, CAD, AUD, EUR) — prices are always the user's own inputs.
- Accepts fractions (`3/8`, `1 1/2`), decimal commas and thousands separators; inline, accessible validation.
- Editable product assumptions (bag yield, density, box coverage, bundles per square) — no invented product data.
- Category hubs, 6 guides, free CSV templates, legal/trust pages (drafts with owner placeholders).
- Technical SEO: static HTML, unique metadata, canonicals, sitemap, robots, breadcrumbs, JSON-LD (WebSite, BreadcrumbList, WebApplication, FAQPage, Article — no ratings).
- Monetization-ready but **inactive**: inert ad slots, affiliate component that hides placeholders in production.
- No cookies, no tracking, no third-party runtime scripts.

## Tech stack
Next.js 16 (App Router, static export) · React 19 · TypeScript (strict) · Tailwind CSS 4 · Lucide icons · Vitest · ESLint (next/core-web-vitals).

## Getting started
Requires Node.js ≥ 20.9 (developed on Node 24).

```bash
npm install
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
```

## Commands
| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run typecheck` | Generate route types and run `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm test` | Unit tests (Vitest) |
| `npm run build` | Static export to `out/` (+ postbuild segment fix) |
| `npm run preview` | Serve `out/` locally on http://localhost:4173 |
| `npm run check` | All of the above in sequence |

## Testing
`tests/` covers unit constants and conversions, every formula (normal, boundary, invalid, unit-conversion and rounding cases), the input parser and validation engine, and runs **every calculator with default values in both unit systems**.

## Environment variables
See `.env.example`. All are public (`NEXT_PUBLIC_*`) and optional except `NEXT_PUBLIC_SITE_URL` for production builds.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata and sitemap |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Shows a mailto link on /contact |
| `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` | Enables the contact form (Formspree-compatible) |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Leave empty until AdSense is approved and a CMP is set up |

## Deployment
Static export → recommended host **Cloudflare Pages (free)**. Vercel Hobby is not suitable for a monetized site (non-commercial only). Full steps: [`docs/deployment.md`](docs/deployment.md).

## Publishing to GitHub
```bash
gh auth login
gh repo create truesquare-calc --public --source=. --remote=origin --push
```
Without the GitHub CLI: create an empty repository named `truesquare-calc` on github.com, then:
```bash
git remote add origin https://github.com/<your-user>/truesquare-calc.git
git push -u origin main
```

## Project structure
```
src/app/            Routes (calculator template, categories, guides, legal pages, sitemap, robots)
src/components/     Calculator UI, layout, search, monetization slots
src/lib/units.ts    Exact unit conversions
src/lib/calc/       Pure, tested calculation functions (SI units)
src/lib/calculators Declarative calculator definitions, engine, formatting
src/content/        Calculator copy and guides
tests/              Vitest test suites
docs/               Research, brand, SEO, monetization, deployment, architecture, owner checklist
scripts/            Local static server, postbuild segment fix
public/             Security headers, CSV templates
```
More detail: [`docs/architecture.md`](docs/architecture.md).

## Documentation
- [Market research](docs/market-research.md) · [Brand strategy](docs/brand-strategy.md) · [SEO strategy](docs/seo-strategy.md)
- [Monetization strategy](docs/monetization-strategy.md) · [Deployment](docs/deployment.md) · [Owner checklist](docs/owner-checklist.md)

## Disclaimer
Results are estimates for planning purposes and do not replace professional engineering advice, manufacturer instructions or local building regulations.
