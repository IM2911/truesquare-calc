// Minimal zero-dependency static server for previewing the `out/` export locally.
// Mirrors static hosts: "/about" serves "about.html", unknown paths serve 404.html.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve("out");
const port = Number(process.env.PORT) || 4173;
const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml",
  ".json": "application/json", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml", ".csv": "text/csv; charset=utf-8",
  ".woff2": "font/woff2", ".png": "image/png", ".ico": "image/x-icon",
};

async function tryFile(p) {
  try { const s = await stat(p); return s.isFile() ? p : null; } catch { return null; }
}

createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname);
  const safe = normalize(join(root, url));
  if (!safe.startsWith(root)) { res.writeHead(400).end(); return; }
  const file = (await tryFile(safe)) ?? (await tryFile(`${safe}.html`)) ?? (await tryFile(join(safe, "index.html")));
  const target = file ?? join(root, "404.html");
  res.writeHead(file ? 200 : 404, { "Content-Type": types[extname(target)] ?? "application/octet-stream" });
  res.end(await readFile(target));
}).listen(port, () => console.log(`Serving ${root} at http://localhost:${port}`));
