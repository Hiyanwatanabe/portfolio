import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from https://hiyanwatanabe.github.io/portfolio/ — keep `base` in sync with the repo name.
export default defineConfig({
  base: "/portfolio/",
  plugins: [react()],
  build: { target: "es2020", assetsInlineLimit: 2048 },
});
