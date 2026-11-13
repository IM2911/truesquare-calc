# Deployment

The site is a **fully static export** (`next build` → `out/`). Any static host works; no server, database or paid API is needed.

## 1. Hosting options evaluated (13 Nov 2026)
| Option | Cost | Commercial use (ads/affiliates) | Fit | Verdict |
|---|---|---|---|---|
| **Cloudflare Pages (Free)** | €0 | Allowed per third-party comparisons (owner: confirm in Cloudflare's terms) | Official limits page: 500 builds/month, 1 concurrent build, 20,000 files/site, 25 MiB per file, 100 custom domains/project. Serves `public/_headers` | **Recommended** |
| Vercel Hobby | €0 | **Not allowed** — Hobby is for personal, non-commercial use (Vercel fair-use guidelines; third-party summaries agree). Ads/affiliates make the site commercial | Best Next.js support | Not suitable once monetized (Pro = $20/user/month) |
| GitHub Pages | €0 | Allowed for most sites but GitHub's terms discourage primarily commercial sites | No custom headers file; works with static export | Acceptable fallback |
| Netlify Free | €0 | Allowed | Supports `_headers`; build-minute limits | Good alternative |

Build output check: ~40 HTML pages + assets, far below the 20,000-file limit.

## 2. Current deployment (live)
- **URL:** https://truesquare-calc.truesquare-calc.workers.dev
- **Platform:** Cloudflare Workers, static-assets only (Cloudflare now delivers Pages through Workers; `wrangler pages project create` delegates there). Config: `wrangler.jsonc` → serves `out/`, `not_found_handling: "404-page"`, `html_handling: "drop-trailing-slash"`. `public/_headers` is applied to asset responses.
- **Cost:** €0 on the Workers Free plan. Requests that only serve static assets do not run Worker code. Owner: confirm current free-plan limits and terms in the Cloudflare dashboard.

### Redeploy after changes
```bash
npx wrangler login      # once per machine (opens the browser)
npm run deploy          # build + flatten segments + wrangler deploy
```
The canonical URL defaults to the workers.dev address in `src/lib/site.ts`; override with `NEXT_PUBLIC_SITE_URL` when a custom domain is added, then redeploy.

### Optional: automatic deploys from GitHub
Either connect the repository in the Cloudflare dashboard (Workers & Pages → the `truesquare-calc` Worker → Settings → Builds → Connect repository; build command `npm run build`, deploy command `npx wrangler deploy`), or add a GitHub Actions job using `cloudflare/wrangler-action` with a `CLOUDFLARE_API_TOKEN` repository secret that **you** create (never commit tokens).

## 3. Custom domain (when purchased)
Add the domain to Cloudflare, then in the Worker → Settings → Domains & Routes → add a Custom Domain. Update the URL in `src/lib/site.ts` (or `NEXT_PUBLIC_SITE_URL`), `npm run deploy`, then add the domain property in Google Search Console and submit `/sitemap.xml`. Disable or redirect the workers.dev URL so there is a single canonical host.

## 4. Contact form (free options)
- **Email only:** set `NEXT_PUBLIC_CONTACT_EMAIL` (shows a mailto link). Free; exposes the address to scrapers.
- **Form (active):** Formspree form `https://formspree.io/f/xnpdnwjl`, default in `src/lib/site.ts`. Tested end to end on 13 Nov 2026 (submission accepted, notification received in the owner's Gmail). A submission using an `example.com` address was accepted but not emailed — likely Formspree spam filtering. Free tier has monthly submission limits. CSP in `public/_headers` already allows `formspree.io`.
- Not possible on a static host without a third party: server-side email sending (would need Pages Functions + an email API key + a domain).

## 5. Known framework workaround
Next.js 16.4 static export writes per-segment prefetch files in nested folders while the client requests flat filenames. `scripts/flatten-segments.mjs` (run automatically as `postbuild`) adds the flat copies so client navigation and prefetching work on any static host. Remove it when Next fixes the mismatch (check by deleting the script and looking for 404s on `__next.*.txt` requests).

## 6. Local preview of the production build
```bash
npm run build
npm run preview   # http://localhost:4173, zero-dependency static server
```
