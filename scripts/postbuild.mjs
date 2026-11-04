// After `vite build`: GitHub Pages fallback (404.html), sitemap.xml, robots.txt and, for a custom
// domain, the CNAME file. Everything derives from site.config.json.
import { copyFileSync, readFileSync, writeFileSync } from "node:fs";

const { siteUrl } = JSON.parse(readFileSync("site.config.json", "utf8"));
const host = new URL(siteUrl).hostname;
const src = readFileSync("src/data/projects.ts", "utf8");
const slugs = [...src.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);

// GitHub Pages serves 404.html for unknown paths; the SPA then renders the right route.
copyFileSync("dist/index.html", "dist/404.html");

const today = new Date().toISOString().slice(0, 10);
const urls = ["", ...slugs.map((s) => `work/${s}`)];
writeFileSync(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${siteUrl}${u}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n")}\n</urlset>\n`,
);
writeFileSync("dist/robots.txt", `User-agent: *\nAllow: /\nSitemap: ${siteUrl}sitemap.xml\n`);

// A custom domain needs a CNAME file at the root of the published site.
if (!host.endsWith(".github.io")) writeFileSync("dist/CNAME", `${host}\n`);

console.log(`postbuild: ${siteUrl} · 404.html + sitemap (${urls.length} urls) + robots${host.endsWith(".github.io") ? "" : " + CNAME"}`);
