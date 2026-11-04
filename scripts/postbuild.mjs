// After `vite build`: GitHub Pages fallback (404.html), sitemap.xml, robots.txt and, for a custom
// domain, the CNAME file. Everything derives from site.config.json.
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const { siteUrl } = JSON.parse(readFileSync("site.config.json", "utf8"));
const host = new URL(siteUrl).hostname;
const src = readFileSync("src/data/projects.ts", "utf8");
const slugs = [...src.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);

// GitHub Pages serves 404.html for unknown paths; the SPA then renders the right route.
copyFileSync("dist/index.html", "dist/404.html");
// Real files for every case study, so /work/<slug>/ answers 200 instead of the 404 fallback.
for (const slug of slugs) {
  mkdirSync(`dist/work/${slug}`, { recursive: true });
  copyFileSync("dist/index.html", `dist/work/${slug}/index.html`);
}

const today = new Date().toISOString().slice(0, 10);
const urls = ["", ...slugs.map((s) => `work/${s}/`)];
writeFileSync(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${siteUrl}${u}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n")}\n</urlset>\n`,
);
writeFileSync("dist/robots.txt", `User-agent: *\nAllow: /\nSitemap: ${siteUrl}sitemap.xml\n`);

// A GitHub Pages custom domain needs a CNAME file. Not needed on github.io or Cloudflare Pages.
const needsCname = !host.endsWith(".github.io") && !host.endsWith(".pages.dev");
if (needsCname) writeFileSync("dist/CNAME", `${host}\n`);

console.log(`postbuild: ${siteUrl} · 404.html + sitemap (${urls.length} urls) + robots${needsCname ? " + CNAME" : ""}`);
