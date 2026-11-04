// Render resume/resume.html to public/Hiyan_Kubagawa_Resume.pdf: node scripts/build_resume.mjs
import { chromium } from "@playwright/test";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(pathToFileURL(resolve("resume/resume.html")).href);
await page.pdf({ path: "public/Hiyan_Kubagawa_Resume.pdf", format: "Letter", printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log("public/Hiyan_Kubagawa_Resume.pdf");
