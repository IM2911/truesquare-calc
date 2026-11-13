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
- [x] Owner details filled in (operator: individual in Barcelona, Spain; Spanish law; contact by form only; 1-month retention) — `SITE.operator` in `src/lib/site.ts`.
- [ ] Professional legal review of Privacy Policy and Terms (Spain + target markets).
- [ ] Spain-specific: once the site earns money (ads/affiliates), LSSI-CE art. 10 generally requires an "Aviso legal" with name, NIF, address and email. Check with an advisor whether/when this applies and whether you need to register as self-employed (autónomo).
- [ ] When hosting and the form service are live, consider naming them in the Privacy Policy (currently described generically).

## AdSense
- [ ] Only after domain, content and legal pages are final. Configure a Google-certified CMP for EEA/UK/CH. Then apply. See docs/monetization-strategy.md.

## Affiliates
- [ ] Join programmes per market; paste real URLs into `src/lib/affiliates.ts`; update the Affiliate Disclosure page with programme names and required statements.

## Content quality
- [ ] Review calculator defaults (densities, yields) against suppliers you use.
- [ ] Add genuine author/reviewer information to About (no invented credentials).
