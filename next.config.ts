import type { NextConfig } from "next";

/**
 * Fully static export: every page is pre-rendered to HTML at build time and can
 * be served from any static host (Cloudflare Pages, GitHub Pages, Netlify…) at no cost.
 * Security headers live in public/_headers because `headers()` is not supported with export.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
