// Build-time renderer. scripts/prerender.mjs calls render() for every route and writes the HTML
// into dist/, so each URL is served with its content and metadata before any JavaScript runs.
import { StrictMode } from "react";
import { prerender } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import App from "./App";

export { jsonLdFor, metaFor, routes } from "./seo";

export async function render(url: string): Promise<string> {
  // prerender (unlike renderToString) waits for the lazily loaded demos, so they are in the HTML too.
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  return new Response(prelude).text();
}
