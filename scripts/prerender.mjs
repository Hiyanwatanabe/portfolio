// After the client and server builds: write a fully rendered HTML file for every route, each with
// its own title, description, canonical, share card and structured data. Then 404.html, sitemap.xml,
// robots.txt and, for a custom domain on GitHub Pages, the CNAME file.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { pathToFileURL } from "node:url";

const { siteUrl } = JSON.parse(readFileSync("site.config.json", "utf8"));
const host = new URL(siteUrl).hostname;
const server = await import(pathToFileURL("dist-server/entry-server.js").href);
const { render, metaFor, jsonLdFor, routes } = server;

const template = readFileSync("dist/index.html", "utf8");
const esc = (s) => s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function setAttr(html, pattern, value) {
  const re = new RegExp(`(${pattern}[^>]*?content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`prerender: no tag for ${pattern}`);
  return html.replace(re, `$1${esc(value)}$2`);
}

function page(route, body) {
  const m = metaFor(route);
  const url = `${siteUrl}${m.path}`;
  let html = template.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  if (!html.includes(body)) throw new Error("prerender: root element not found in template");
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(m.title)}</title>`);
  html = setAttr(html, '<meta name="description"', m.description);
  html = setAttr(html, '<meta property="og:title"', m.title);
  html = setAttr(html, '<meta property="og:description"', m.description);
  html = setAttr(html, '<meta property="og:url"', url);
  html = setAttr(html, '<meta property="og:type"', m.type);
  html = setAttr(html, '<meta property="og:image"', `${siteUrl}${m.image}`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${esc(url)}$2`);
  if (m.noindex) {
    html = html.replace(/\s*<link rel="canonical"[^>]*>/, "").replace("</head>", '  <meta name="robots" content="noindex" />\n  </head>');
  }
  const ld = jsonLdFor(route);
  if (ld) {
    const json = JSON.stringify(ld).replaceAll("<", "\\u003c");
    html = html.replace("</head>", `  <script type="application/ld+json">${json}</script>\n  </head>`);
  }
  return html;
}

function write(file, html) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

for (const route of routes) {
  const body = await render(route);
  const file = route === "/" ? "dist/index.html" : `dist${route}index.html`;
  write(file, page(route, body));
}
// Unknown paths: Cloudflare Pages (and GitHub Pages) serve this with a 404 status.
write("dist/404.html", page("/404/", await render("/404/")));

const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map((r) => `  <url><loc>${siteUrl}${metaFor(r).path}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n")}\n</urlset>\n`,
);
writeFileSync("dist/robots.txt", `User-agent: *\nAllow: /\nSitemap: ${siteUrl}sitemap.xml\n`);

// A GitHub Pages custom domain needs a CNAME file. Not needed on github.io or Cloudflare Pages.
const needsCname = !host.endsWith(".github.io") && !host.endsWith(".pages.dev");
if (needsCname) writeFileSync("dist/CNAME", `${host}\n`);

rmSync("dist-server", { recursive: true, force: true });
console.log(`prerender: ${routes.length} pages + 404.html, sitemap, robots${needsCname ? ", CNAME" : ""} for ${siteUrl}`);
