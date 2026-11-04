// Share images (1200x630) for every case study, built from the real page: its title, kicker, stack
// and architecture diagram, in the site's own styles.
// Usage: npm run build && npx vite preview --port 4173 (in another terminal), then npm run og
// Writes public/og/<slug>.png; run npm run build again to include them.
import { chromium } from "@playwright/test";
import { mkdirSync, readFileSync } from "node:fs";

const base = process.argv[2] ?? "http://localhost:4173/";
const src = readFileSync("src/data/projects.ts", "utf8");
const slugs = [...src.matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
mkdirSync("public/og", { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
for (const slug of slugs) {
  await page.goto(`${base}work/${slug}/`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const title = q(".cs-hero h1").textContent;
    const kicker = q(".cs-kicker").textContent;
    const context = q(".cs-facts dd").textContent;
    const stack = [...document.querySelectorAll(".cs-figure ~ .chips .chip, #built .chips .chip, #domains ul[aria-label='Technologies'] .chip")]
      .map((c) => c.textContent)
      .slice(0, 5);
    const diagram = q(".cs-figure .figure-body svg")?.cloneNode(true);

    const card = document.createElement("div");
    card.className = "og-card";
    card.innerHTML = `
      <div class="og-lanes"></div>
      <div class="og-left">
        <div class="og-brand"><span class="og-dot"></span>Hiyan Kubagawa · Case study</div>
        <div class="og-kicker"></div>
        <div class="og-title"></div>
        <div class="og-context"></div>
        <div class="og-chips"></div>
      </div>
      <div class="og-right"><div class="og-diagram"></div></div>
      <div class="og-foot">hiyaners.pages.dev</div>`;
    card.querySelector(".og-kicker").textContent = kicker;
    card.querySelector(".og-title").textContent = title;
    card.querySelector(".og-context").textContent = context;
    for (const s of stack) {
      const c = document.createElement("span");
      c.textContent = s;
      card.querySelector(".og-chips").append(c);
    }
    if (diagram) card.querySelector(".og-diagram").append(diagram);
    const style = document.createElement("style");
    style.textContent = `
      .og-card { position: fixed; inset: 0; z-index: 9999; width: 1200px; height: 630px; overflow: hidden; display: grid;
        grid-template-columns: 500px 1fr; background: radial-gradient(90% 90% at 85% 10%, #10303a 0%, #0a0f15 62%); color: #e9eef3; font-family: var(--font-sans); }
      .og-lanes { position: absolute; inset: 0; background: repeating-linear-gradient(180deg, transparent 0 91px, rgb(148 170 195 / .09) 91px 92px); }
      .og-left { position: relative; padding: 64px 0 64px 64px; display: flex; flex-direction: column; gap: 18px; }
      .og-brand { font-family: var(--font-mono); font-size: 18px; color: #8796a7; display: flex; align-items: center; gap: 12px; letter-spacing: .04em; }
      .og-dot { width: 10px; height: 10px; border-radius: 50%; background: #6fd6c9; box-shadow: 0 0 0 6px rgb(111 214 201 / .15); }
      .og-kicker { margin-top: 28px; font-family: var(--font-mono); font-size: 21px; color: #6fd6c9; line-height: 1.35; }
      .og-title { font-size: ${title.length > 22 ? 50 : 84}px; font-weight: 600; letter-spacing: -.04em; line-height: 1; }
      .og-context { font-size: 20px; color: #b4c0cd; }
      .og-chips { margin-top: auto; display: flex; flex-wrap: wrap; gap: 8px; }
      .og-chips span { font-family: var(--font-mono); font-size: 15px; padding: 5px 10px; border: 1px solid rgb(148 170 195 / .3); border-radius: 7px; color: #b4c0cd; }
      .og-right { position: relative; display: grid; place-items: center; padding: 40px 40px 40px 24px; }
      .og-diagram { width: 100%; border: 1px solid rgb(148 170 195 / .2); border-radius: 18px; background: rgb(14 21 29 / .85); padding: 14px; box-shadow: 0 40px 80px -40px #000; }
      .og-diagram svg { width: 100%; height: auto; max-height: 470px; }
      .og-foot { position: absolute; right: 44px; bottom: 26px; font-family: var(--font-mono); font-size: 16px; color: #8796a7; }
    `;
    document.body.append(style, card);
  });
  await page.waitForTimeout(300);
  await page.locator(".og-card").screenshot({ path: `public/og/${slug}.png` });
  console.log(`public/og/${slug}.png`);
}
await browser.close();
