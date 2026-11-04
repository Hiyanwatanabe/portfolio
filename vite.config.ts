import { readFileSync } from "node:fs";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

// One setting decides where the site lives. Change `siteUrl` in site.config.json to move it
// (for example to https://hiyaner.is-a.dev/); base path, canonical URLs, sitemap and CNAME follow.
const { siteUrl } = JSON.parse(readFileSync("site.config.json", "utf8")) as { siteUrl: string };
const base = new URL(siteUrl).pathname;

const siteUrlInHtml = (): Plugin => ({
  name: "site-url-in-html",
  transformIndexHtml: (html) => html.replaceAll("%SITE_URL%", siteUrl).replaceAll("%BASE%", base),
});

export default defineConfig({
  base,
  plugins: [react(), siteUrlInHtml()],
  define: { __SITE_URL__: JSON.stringify(siteUrl) },
  build: { target: "es2020", assetsInlineLimit: 2048 },
});
