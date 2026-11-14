#!/usr/bin/env node
/**
 * Writes the AdSense publisher ID into the two files Next does not render:
 *   - public/index.html (the static home page), between the
 *     <!-- adsense:start … --> and <!-- adsense:end --> markers
 *   - public/ads.txt
 *
 * The ID comes from NEXT_PUBLIC_ADSENSE_CLIENT (.env.local or the environment)
 * or, when that is unset, src/lib/adsense-config.json: the same sources
 * src/lib/adsense.ts uses for every other page. Anything that is not a real
 * publisher ID (for example "off") removes the tags and leaves ads.txt with a
 * comment only.
 *
 * Runs automatically before `npm run build` (prebuild), and so before `npm run deploy`.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import nextEnv from "@next/env";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
nextEnv.loadEnvConfig(root, false, { info() {}, error: console.error });

const config = JSON.parse(readFileSync(join(root, "src", "lib", "adsense-config.json"), "utf8"));
const raw = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT || config.client || "").trim();
const match = raw.match(/^(?:ca-)?(pub-\d{16})$/);
const pub = match ? match[1] : null;

function writeIfChanged(path, content) {
  let current = null;
  try {
    current = readFileSync(path, "utf8");
  } catch {
    // missing file: write it
  }
  if (current !== content) writeFileSync(path, content);
}

// --- public/index.html -------------------------------------------------------
const indexPath = join(root, "public", "index.html");
const html = readFileSync(indexPath, "utf8");
const eol = html.includes("\r\n") ? "\r\n" : "\n";
const startAt = html.indexOf("<!-- adsense:start");
const endAt = html.indexOf("<!-- adsense:end -->");
if (startAt === -1 || endAt === -1 || endAt < startAt) {
  console.error("sync-adsense: the adsense:start / adsense:end markers are missing from public/index.html");
  process.exit(1);
}
const afterStartLine = html.indexOf("\n", startAt) + 1;
const tags = pub
  ? [
      `<meta name="google-adsense-account" content="ca-${pub}">`,
      `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${pub}" crossorigin="anonymous"></script>`,
    ]
  : [];
writeIfChanged(indexPath, html.slice(0, afterStartLine) + tags.map((line) => line + eol).join("") + html.slice(endAt));

// --- public/ads.txt ----------------------------------------------------------
writeIfChanged(
  join(root, "public", "ads.txt"),
  pub
    ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`
    : "# Google AdSense is not configured.\n# Set the publisher ID in src/lib/adsense-config.json (or NEXT_PUBLIC_ADSENSE_CLIENT) and rebuild.\n"
);

console.log(pub ? `sync-adsense: ca-${pub} written to public/index.html and public/ads.txt` : "sync-adsense: AdSense not configured; no ad tags");
