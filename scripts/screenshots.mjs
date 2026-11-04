// Full-page screenshots for review: node scripts/screenshots.mjs [baseUrl] [outDir] [theme]
// Every route at desktop, tablet and phone width. theme: "dark" (default) or "light".
import { chromium } from "@playwright/test";
import { existsSync, mkdirSync, readFileSync } from "node:fs";

const base = process.argv[2] ?? "http://localhost:4173/";
const out = process.argv[3] ?? "screenshots";
const theme = process.argv[4] ?? "dark";
mkdirSync(out, { recursive: true });

const src = readFileSync("src/data/projects.ts", "utf8");
const slugs = [...src.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
const routes = [["home", ""], ...(existsSync("src/pages/About.tsx") ? [["about", "about/"]] : []), ...slugs.map((s) => [s, `work/${s}/`])];
const widths = [[1440, 900], [768, 1024], [390, 844]];

const browser = await chromium.launch();
for (const [name, path] of routes) {
  for (const [width, height] of widths) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: "reduce" });
    await page.addInitScript((t) => { try { localStorage.setItem("theme", t); } catch {} }, theme);
    await page.goto(base + path, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
      window.scrollTo(0, 0);
    });
    await page.evaluate(() => document.querySelectorAll(".reveal").forEach((e) => e.classList.add("is-visible")));
    await page.waitForTimeout(400);
    const file = `${out}/${name}-${width}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log(file);
    await page.close();
  }
}
await browser.close();
