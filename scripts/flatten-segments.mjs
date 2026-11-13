// Post-build fix for Next.js 16.4 `output: "export"` segment prefetch files.
//
// The build writes per-segment RSC payloads in nested folders, e.g.
//   out/category/concrete/__next.category/$d$slug/__PAGE__.txt
// but the client router requests a flat filename:
//   out/category/concrete/__next.category.$d$slug.__PAGE__.txt
// (see addSegmentPathToUrlInOutputExportMode in next/dist/client/components/segment-cache/cache.js).
// Without the flat copies, prefetches 404 and client-side navigation falls back to
// full page loads. This script adds the flat copies; the nested originals are kept.
import { copyFile, readdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const OUT = "out";
let copied = 0;

async function filesUnder(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map((e) => (e.isDirectory() ? filesUnder(join(dir, e.name)) : [join(dir, e.name)])));
  return nested.flat();
}

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      for (const file of await filesUnder(full)) {
        const flatName = `${entry.name}.${relative(full, file).split(sep).join(".")}`;
        await copyFile(file, join(dir, flatName));
        copied++;
      }
    } else if (entry.name !== "_next") {
      await walk(full);
    }
  }
}

await walk(OUT);
console.log(`flatten-segments: wrote ${copied} flat segment file(s)`);
