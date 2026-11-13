# Owner Launch Checklist

Nothing below has been created, purchased, applied for or approved on your behalf.

## GitHub
- [ ] Install GitHub CLI (`winget install --id GitHub.cli`) and run `gh auth login`, **or** create an empty repo `truesquare-calc` on github.com.
- [ ] Push: see README → "Publishing to GitHub".

## Domain (paid, optional at launch)
- [ ] Trademark search for "TrueSquare" (USPTO, UKIPO, CIPO, IP Australia; classes 9 & 42).
- [ ] Re-check and buy `truesquarecalc.com` (RDAP showed no registration on 13 Nov 2026).

## Hosting
- [ ] Create a Cloudflare account; read and accept the terms yourself; connect the repo (docs/deployment.md).
- [ ] Set `NEXT_PUBLIC_SITE_URL` and rebuild.

## Analytics & Search Console
- [ ] Google Search Console + Bing Webmaster Tools: verify, submit `/sitemap.xml`.
- [ ] Analytics (optional): Cloudflare Web Analytics is cookie-free; anything using cookies needs consent + Privacy Policy update.

## Contact
- [ ] Set `NEXT_PUBLIC_CONTACT_EMAIL` and/or a Formspree endpoint; update Privacy Policy (provider, retention).

## Legal
- [ ] Replace every `[OWNER: …]` placeholder (About, Contact, Privacy, Terms) — search the code for `OwnerPlaceholder`.
- [ ] Professional legal review of Privacy Policy and Terms for your country and target markets.

## AdSense
- [ ] Only after domain, content and legal pages are final. Configure a Google-certified CMP for EEA/UK/CH. Then apply. See docs/monetization-strategy.md.

## Affiliates
- [ ] Join programmes per market; paste real URLs into `src/lib/affiliates.ts`; update the Affiliate Disclosure page with programme names and required statements.

## Content quality
- [ ] Review calculator defaults (densities, yields) against suppliers you use.
- [ ] Add genuine author/reviewer information to About (no invented credentials).
