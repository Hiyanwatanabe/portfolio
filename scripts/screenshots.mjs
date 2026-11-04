// Full-page screenshots for review: node scripts/screenshots.mjs [baseUrl] [outDir]
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const base = process.argv[2] ?? "http://localhost:4173/portfolio/";
const out = process.argv[3] ?? "screenshots";
mkdirSync(out, { recursive: true });

const shots = [
  ["home-1440", "", 1440, 900],
  ["home-390", "", 390, 844],
  ["home-768", "", 768, 1024],
  ["home-320", "", 320, 640],
  ["ops-1440", "work/operations-automation", 1440, 900],
  ["cognisense-1440", "work/cognisense", 1440, 900],
  ["infra-390", "work/infrastructure-automation", 390, 844],
];

const browser = await chromium.launch();
for (const [name, path, width, height] of shots) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  await page.goto(base + path, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
    window.scrollTo(0, 0);
  });
  await page.evaluate(() => document.querySelectorAll(".reveal").forEach((e) => e.classList.add("is-visible")));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${out}/${name}.png`, fullPage: true });
  console.log(`${out}/${name}.png`);
  await page.close();
}
await browser.close();
