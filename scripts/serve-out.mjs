/**
 * Minimal static server for previewing the exported site (no framework needed).
 * Mirrors GitHub Pages behaviour: serves `foo/` from `foo/index.html`.
 *
 *   npm run build && npm run serve
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, posix } from "node:path";
import { fileURLToPath } from "node:url";

const root = posix.join(posix.dirname(fileURLToPath(import.meta.url).replaceAll("\\", "/")), "..", "out");

const port = Number(process.env.PORT ?? 4321);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
  ".png": "image/png",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json",
};

createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? "/", "http://localhost");
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.endsWith("/")) pathname += "index.html";

    const filePath = join(root, normalize(pathname.replace(/^\//, "")));

    const body = await readFile(filePath);
    res.writeHead(200, {
      "Content-Type": MIME[extname(filePath)] ?? "application/octet-stream",
    });
    res.end(body);
  } catch {
    try {
      const body = await readFile(join(root, "404.html"));
      res.writeHead(404, { "Content-Type": MIME[".html"] });
      res.end(body);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("404");
    }
  }
}).listen(port, () => {
  console.log(`serving ./out at http://localhost:${port}`);
});