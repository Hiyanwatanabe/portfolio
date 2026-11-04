import { readFileSync } from "node:fs";
import { defineConfig, devices } from "@playwright/test";

const base = new URL((JSON.parse(readFileSync("site.config.json", "utf8")) as { siteUrl: string }).siteUrl).pathname;

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  reporter: "list",
  use: { baseURL: `http://localhost:4173${base}` },
  webServer: {
    command: "npx vite preview --port 4173 --strictPort",
    url: `http://localhost:4173${base}`,
    reuseExistingServer: true,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
