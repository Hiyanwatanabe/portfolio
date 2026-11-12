import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const slugs = ["tf4", "auto-invoice", "communication-systems", "infrastructure-automation", "data-engineering", "front-desk", "cognisense", "this-portfolio", "market-hunter"];

test("home: identity, sections and no console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("./");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Hiyan");
  for (const id of ["stack", "work", "experience", "skills", "about", "education", "contact"]) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  await expect(page.locator("#contact").getByRole("link", { name: /hiyanwk@gmail.com/ })).toHaveAttribute("href", "mailto:hiyanwk@gmail.com");
  await expect(page.locator("#contact").getByRole("link", { name: /814/ })).toHaveAttribute("href", "tel:+18142186777");
  expect(errors).toEqual([]);
});

test("no horizontal overflow at common widths", async ({ page }) => {
  for (const width of [320, 375, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["./", "./about/", ...slugs.map((s) => `./work/${s}/`)]) {
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `${path} at ${width}px`).toBeLessThanOrEqual(0);
    }
  }
});

for (const slug of slugs) {
  test(`case study renders: ${slug}`, async ({ page }) => {
    await page.goto(`./work/${slug}`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("#problem, #role").first()).toBeVisible();
  });
}

test("unknown route shows not-found page", async ({ page }) => {
  await page.goto("./nope");
  await expect(page.getByRole("heading", { name: /doesn't exist/ })).toBeVisible();
});

test("internal links resolve and assets load", async ({ page, request }) => {
  await page.goto("./");
  const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => (a as HTMLAnchorElement).href));
  // GitHub Pages redirects /portfolio to /portfolio/; the local preview server does not.
  const internal = [...new Set(hrefs.filter((h) => h.startsWith("http://localhost") && !h.includes("#")).map((h) => (h.endsWith("/portfolio") ? `${h}/` : h)))];
  for (const h of internal) {
    const res = await request.get(h);
    expect(res.status(), h).toBeLessThan(400);
  }
});

test("mobile menu opens and navigates", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile only");
  await page.goto("./");
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Experience" }).click();
  await expect(page).toHaveURL(/#experience$/);
});

test("accessibility: no serious axe violations", async ({ page }) => {
  for (const path of ["./", "./work/tf4", "./work/auto-invoice", "./work/cognisense", "./work/this-portfolio"]) {
    await page.goto(path);
    await page.evaluate(() => document.querySelectorAll(".reveal").forEach((e) => e.classList.add("is-visible")));
    await page.waitForTimeout(800);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => `${v.id}: ${v.nodes.length}`), path).toEqual([]);
  }
});

test("stack explorer: click and arrow keys change the panel", async ({ page }) => {
  await page.goto("./#stack");
  const tabs = page.getByRole("tab");
  await expect(tabs).toHaveCount(5);
  await tabs.nth(3).click();
  await expect(tabs.nth(3)).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("SQL");
  await page.keyboard.press("ArrowRight");
  await expect(tabs.nth(4)).toHaveAttribute("aria-selected", "true");
  await expect(tabs.nth(4)).toBeFocused();
  await page.keyboard.press("Home");
  await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
});

test("diploma opens and closes in a dialog", async ({ page }) => {
  await page.goto("./#education");
  await page.getByRole("button", { name: /View credential/ }).click();
  const dialog = page.getByRole("dialog", { name: "Diploma" });
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("confidentiality: no internal names or old contact details in the page or bundle", async ({ page, request }) => {
  // Outdated contact details are checked here. Employer-specific terms live in tests/private-terms.txt,
  // one regular expression per line. That file is gitignored on purpose: listing the terms in a public
  // repository would disclose them.
  const banned = [/hiyanwatanabe2002/i, /watanabe001/i, /linkedin\.com\/in\/hiyan-kubagawa"/];
  const privateTerms = join(dirname(fileURLToPath(import.meta.url)), "private-terms.txt");
  if (existsSync(privateTerms)) {
    for (const line of readFileSync(privateTerms, "utf8").split(/\r?\n/)) {
      if (line.trim() && !line.startsWith("#")) banned.push(new RegExp(line.trim(), "i"));
    }
  }
  const urls = ["./", ...["tf4", "auto-invoice", "communication-systems", "infrastructure-automation", "data-engineering"].map((s) => `./work/${s}`)];
  for (const u of urls) {
    await page.goto(u);
    const html = await page.content();
    for (const b of banned) expect(html, `${u} ${b}`).not.toMatch(b);
  }
  const scripts = await page.$$eval("script[src]", (s) => s.map((x) => (x as HTMLScriptElement).src));
  for (const src of scripts) {
    const body = await (await request.get(src)).text();
    for (const b of banned) expect(body, `${src} ${b}`).not.toMatch(b);
  }
});

test("TF4 deep dive: patterns render and the two-key switch arms only with both keys", async ({ page }) => {
  await page.goto("./work/tf4#patterns");
  await expect(page.locator("#patterns")).toBeVisible();
  const status = page.locator(".dd-lamp");
  await expect(status).toContainText("BLOCKED");
  await page.getByRole("switch", { name: /config\.auto_reserve/ }).click();
  await expect(status).toContainText("BLOCKED");
  await page.getByRole("switch", { name: /execute=True/ }).click();
  await expect(status).toContainText("ARMED");
  await expect(page.locator(".dd-code pre")).toContainText("run_scan");
});

test("Auto-Invoice demos: rules playground, mapping cascade and saga respond", async ({ page }) => {
  await page.goto("./work/auto-invoice#patterns");
  const lines = page.locator(".ai-table tbody tr");
  await expect(lines).toHaveCount(2);
  await page.getByRole("switch", { name: /group_by/ }).click();
  await expect(lines).toHaveCount(1);
  await page.getByLabel("Minimum minutes filter").fill("30");
  await expect(page.locator(".ai-pipeline")).toContainText("1 after filters");

  const code = page.locator("#ai-map-code");
  await code.fill("ZX204");
  await expect(page.locator(".ai-map-trace li[data-hit='true']")).toContainText("Client C");
  await code.fill("OMEGA-9");
  await expect(page.locator(".ai-map-trace li[data-hit='true']")).toContainText("Unmapped");

  await page.getByRole("button", { name: "Ledger insert fails" }).click();
  await expect(page.locator(".ai-saga-out")).toContainText("Compensation deleted the lines", { timeout: 6000 });
});

// ---------- Pre-rendering: the HTML each URL serves, before any JavaScript ----------
const allPages = ["", "about/", ...slugs.map((s) => `work/${s}/`)];

test("every page is pre-rendered with its own title, canonical, share image and content", async ({ request, baseURL }) => {
  const titles = new Set<string>();
  for (const path of allPages) {
    const html = await (await request.get(path)).text();
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
    const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1] ?? "";
    const ogImage = html.match(/<meta property="og:image" content="([^"]*)"/)?.[1] ?? "";
    expect(titles.has(title), `duplicate title on ${path}`).toBe(false);
    titles.add(title);
    expect(canonical.endsWith(`/${path}`), `${path}: canonical ${canonical}`).toBe(true);
    expect(html.match(/<h1[\s>]/g)?.length, `${path}: one h1 in the served HTML`).toBe(1);
    expect(html, path).toMatch(/<script type="application\/ld\+json">/);
    expect(html, path).toContain('<div id="root"><');
    if (path.startsWith("work/")) {
      expect(ogImage, path).toContain(`og/${path.split("/")[1]}.png`);
      const img = await request.get(new URL(`og/${path.split("/")[1]}.png`, baseURL).href);
      expect(img.status(), ogImage).toBe(200);
    }
  }
});

test("pre-rendered pages hydrate without errors, in both themes", async ({ page }) => {
  for (const theme of ["dark", "light"]) {
    for (const path of allPages) {
      const errors: string[] = [];
      const onConsole = (m: { type(): string; text(): string }) => m.type() === "error" && errors.push(m.text());
      const onError = (e: Error) => errors.push(e.message);
      page.on("console", onConsole);
      page.on("pageerror", onError);
      await page.addInitScript((t) => { try { localStorage.setItem("theme", t); } catch { /* ignore */ } }, theme);
      await page.goto(`./${path}`, { waitUntil: "networkidle" });
      expect(errors, `${theme} ${path}`).toEqual([]);
      page.off("console", onConsole);
      page.off("pageerror", onError);
    }
  }
});

test("theme switch toggles light mode and remembers it", async ({ page }) => {
  await page.goto("./");
  const html = page.locator("html");
  await expect(html).not.toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await expect(html).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "light");
  // The technical panels stay dark in light mode.
  await page.goto("./work/tf4/");
  const bg = await page.locator(".dd-code").first().evaluate((e) => getComputedStyle(e).backgroundColor);
  expect(bg).toBe("rgb(11, 17, 24)");
  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  await expect(html).not.toHaveAttribute("data-theme", "light");
});

test("accessibility in light mode: no serious axe violations", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("theme", "light"));
  for (const path of ["./", "./about/", "./work/tf4/", "./work/auto-invoice/"]) {
    await page.goto(path);
    await page.evaluate(() => document.querySelectorAll(".reveal").forEach((e) => e.classList.add("is-visible")));
    await page.waitForTimeout(800);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => `${v.id}: ${v.nodes.length}`), path).toEqual([]);
  }
});

test("certificates open in a viewer and link to the issuers' verification pages", async ({ page }) => {
  await page.goto("./#education");
  await expect(page.getByRole("link", { name: /Verify at aws.amazon.com/ })).toHaveAttribute("href", "https://aws.amazon.com/verification");
  await expect(page.getByRole("link", { name: /Verify on Coursera/ })).toHaveAttribute("href", /coursera\.org\/verify\/professional-cert\//);
  for (const name of ["AWS Certified Cloud Practitioner certificate", "Google Data Analytics Professional Certificate", "PSAC Swimming Athlete of the Week"]) {
    const dialog = page.getByRole("dialog", { name });
    await page.locator(".diploma-frame").filter({ has: page.locator(`xpath=following::dialog[1][@aria-label="${name}"]`) }).first().click();
    await expect(dialog).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  }
});

test("toolkit expands to show every group", async ({ page }) => {
  await page.goto("./#skills");
  const rows = page.locator(".skill-row");
  const visible = async () => (await rows.evaluateAll((els) => els.filter((e) => getComputedStyle(e).display !== "none").length));
  expect(await visible()).toBe(4);
  await page.getByRole("button", { name: /Show the full toolkit/ }).click();
  expect(await visible()).toBe(await rows.count());
});

test("about page tells the story and answers the basics", async ({ page }) => {
  await page.goto("./about/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Hiyan Kubagawa");
  await expect(page.getByText("Who is Hiyan Kubagawa?")).toBeVisible();
  await expect(page.getByRole("link", { name: /TF4 case study/ })).toHaveAttribute("href", "/work/tf4/");
});

test("front desk: business calculator, lead funnel and home business section respond", async ({ page }) => {
  await page.goto("./work/front-desk/#patterns");
  const atRisk = page.locator(".fd-kpis strong").nth(1);
  const before = await atRisk.textContent();
  await page.getByLabel("Missed calls per week").fill("20");
  await expect(atRisk).not.toHaveText(before ?? "");
  const fit = page.locator(".fd-funnel li").last().locator("strong");
  const fitBefore = Number(await fit.textContent());
  await page.getByRole("switch", { name: /skip: has shop software/ }).click();
  expect(Number(await fit.textContent())).toBeGreaterThan(fitBefore);
  await expect(page.locator("video")).toHaveAttribute("src", /front-desk-explainer\.mp4$/);
  await page.goto("./#business");
  await expect(page.locator("#business .biz-card")).toHaveCount(6);
});
