// After `vite build`: GitHub Pages fallback (404.html) and sitemap.xml.
import { copyFileSync, readFileSync, writeFileSync } from "node:fs";

const site = "https://hiyanwatanabe.github.io/portfolio/";
const src = readFileSync("src/data/projects.ts", "utf8");
const slugs = [...src.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);

// GitHub Pages serves 404.html for unknown paths; the SPA then renders the right route.
copyFileSync("dist/index.html", "dist/404.html");

const today = new Date().toISOString().slice(0, 10);
const urls = ["", ...slugs.map((s) => `work/${s}`)];
writeFileSync(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${site}${u}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n")}\n</urlset>\n`,
);
console.log(`postbuild: 404.html + sitemap (${urls.length} urls)`);
