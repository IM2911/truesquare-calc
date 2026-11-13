# Monetization Strategy

**Status at handover: no monetization is active.** No AdSense ID, no affiliate IDs, no checkout. Nothing has been applied for or approved.

## 1. Google AdSense
### Prepared
- Trust pages: About, Contact, Privacy Policy, Terms, Disclaimer, Affiliate Disclosure (drafts with owner placeholders).
- Original, useful content: 17 calculators with explanations + 6 guides.
- Reserved placements in `src/components/monetization/AdSlot.tsx`: `below-calculator` (after the tool, never between inputs and results), `in-content` (mid-article), `sidebar` (optional). In production they render **nothing** until configured; in development they show dashed outlines.
- No ad script is loaded anywhere.

### Owner steps (in order)
1. Deploy on the final domain (AdSense reviews a site you control; a custom domain is strongly recommended).
2. Complete owner placeholders in About/Privacy/Terms/Contact; get legal review.
3. Set up a **Google-certified CMP** for EEA/UK/Switzerland traffic — Google's own "Privacy & messaging" in AdSense is free. A cookie banner alone is not compliance.
4. Apply to AdSense. After approval: set `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-…`, add the AdSense script + `ads.txt` (in `public/`), render `<ins class="adsbygoogle">` inside `AdSlot` with real slot IDs, and update the CSP in `public/_headers` to allow Google ad domains.
5. Update the Privacy Policy "Future advertising" section before ads go live.

### UX rules
Max one ad above the fold on mobile; no ads inside the calculator card; reserve height to avoid CLS; no sticky/interstitial ads at launch.

## 2. Affiliate marketing
### Prepared
- Data: `src/lib/affiliates.ts` — 12 generic product slots (measuring, concrete, landscaping, tiling, flooring, roofing, woodworking, safety) with `url: null`.
- Component: `src/components/monetization/AffiliateBox.tsx` — shows a disclosure directly above links, uses `rel="sponsored nofollow noopener"`, and **hides any item without a real URL in production**. Placeholders are visible (labelled) only in development.

### Programmes to evaluate (verify current terms; nothing joined)
| Market | Programme | Notes from research (third-party, verify) |
|---|---|---|
| US | Amazon Associates (amazon.com) | Home improvement commission commonly cited ~3%; 24h cookie |
| UK | Amazon Associates (amazon.co.uk) | Separate account |
| CA | Amazon.ca Associates; Home Depot Canada (via CJ) | HD Canada reported ~1.6%, 3-day cookie |
| AU | Amazon.com.au Associates | Big-box AU programmes not confirmed |
| US | Home Depot (Impact) | Reported 1–3-day cookie; US/CA focus |
| US/CA | Lowe's / RONA | Availability conflicting across sources |
| Multi | Awin / Partnerize / CJ networks | Check for UK DIY and tool retailers |

Rules: disclose next to links; never alter calculations for commercial reasons; no fake reviews or "best X" lists without genuine testing; add Amazon's required statement when joined.

## 3. Digital products
- Shipped free: three CSV templates at `/resources` (budget, material planner, checklist) — lead magnet and trust builder.
- Future paid products: richer Excel/Google Sheets planners with formulas, printable project planners, renovation checklists. Architecture: add a `src/content/products.ts` list and a `/resources/[slug]` page; use a hosted checkout (e.g. Gumroad, Lemon Squeezy, Stripe Payment Links) linked externally — **requires owner accounts and acceptance of their terms; not integrated**.
- Requirements before selling: business/tax registration as required in the owner's country, VAT/GST handling for digital goods (EU/UK/AU rules), refund policy, updated Terms.

## 4. Roadmap
| Phase | Trigger | Action |
|---|---|---|
| 0 | Launch | Organic content only; Search Console |
| 1 | Domain + consistent indexed traffic | AdSense application with CMP |
| 2 | Pages with commercial intent getting traffic | Join Amazon Associates for top market(s) |
| 3 | Template downloads show demand | Paid premium planner |
| 4 | Scale | Additional networks; direct sponsorships clearly labelled |

## 5. Paid services flagged
Domain (~annual fee), optional paid hosting tiers, checkout fees (per-sale), optional email provider. None are needed to launch.
