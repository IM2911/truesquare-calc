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

## 2. Deploy to Cloudflare Pages (requires the owner's Cloudflare account — not created by us)
1. Push the repository to GitHub (see README).
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → select `truesquare-calc`.
3. Build settings: Framework preset **None** (or Next.js (Static HTML Export)); Build command `npm run build`; Output directory `out`; environment variable `NODE_VERSION=22` (or 24).
4. Environment variables (Production):
   - `NEXT_PUBLIC_SITE_URL` = your Pages URL, e.g. `https://truesquare-calc.pages.dev` (later your domain). **Rebuild whenever it changes** — canonicals and sitemap are baked in at build time.
   - optional `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`.
5. Deploy; verify `/`, `/concrete-calculator`, `/sitemap.xml`, `/robots.txt`, a 404 URL, and response headers (from `public/_headers`).

Alternative without Git integration: `npx wrangler pages deploy out --project-name truesquare-calc` (requires `wrangler login`).

## 3. Custom domain (when purchased)
Add it in Pages → Custom domains, update `NEXT_PUBLIC_SITE_URL`, rebuild, then add the domain property in Google Search Console and submit `/sitemap.xml`. Consider a redirect rule from `*.pages.dev` to the domain (Cloudflare Bulk Redirects or a `_redirects` file).

## 4. Contact form (free options)
- **Email only:** set `NEXT_PUBLIC_CONTACT_EMAIL` (shows a mailto link). Free; exposes the address to scrapers.
- **Form:** create a free Formspree form (owner account; free tier has monthly submission limits) and set `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=https://formspree.io/f/xxxx`. CSP in `public/_headers` already allows `formspree.io`. Update the Privacy Policy to name the provider.
- Not possible on a static host without a third party: server-side email sending (would need Pages Functions + an email API key + a domain).

## 5. Known framework workaround
Next.js 16.4 static export writes per-segment prefetch files in nested folders while the client requests flat filenames. `scripts/flatten-segments.mjs` (run automatically as `postbuild`) adds the flat copies so client navigation and prefetching work on any static host. Remove it when Next fixes the mismatch (check by deleting the script and looking for 404s on `__next.*.txt` requests).

## 6. Local preview of the production build
```bash
npm run build
npm run preview   # http://localhost:4173, zero-dependency static server
```
