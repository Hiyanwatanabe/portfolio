import { Caption, Diagram, Node, Packet, Wire } from "./primitives";

export function PortfolioDiagram() {
  return (
    <Diagram label="How this portfolio is built: typed content files feed React components and a CSS design system; Vite builds a static site for GitHub Pages; a Python image pipeline produces WebP photos; Playwright and axe test every route.">
      <Caption x={24} y={36}>Source</Caption>
      <Caption x={360} y={36}>Build</Caption>
      <Caption x={700} y={36}>Ship</Caption>
      <Node x={130} y={110} w={200} label="Content (TypeScript)" sub="profile · projects · skills" accent />
      <Node x={130} y={210} w={200} label="Design system" sub="CSS tokens · fluid type" />
      <Node x={130} y={310} w={200} label="Photos" sub="originals, outside repo" />
      <Node x={130} y={410} w={200} label="Image pipeline" sub="Python · crop · WebP" />
      <Wire d="M 130 337 V 381" />

      <Node x={460} y={160} w={220} label="React components" sub="pages · diagrams · explorer" accent />
      <Node x={460} y={300} w={220} label="Vite build" sub="TypeScript check · bundle" />
      <Wire d="M 230 110 C 300 110, 300 160, 348 160" accent />
      <Wire d="M 230 210 C 300 210, 300 160, 348 160" />
      <Wire d="M 460 187 V 271" />
      <Wire d="M 230 410 C 320 410, 320 300, 348 300" />

      <Node x={800} y={230} w={220} label="Static site" sub="dist/ · 404 fallback · sitemap" />
      <Node x={800} y={360} w={220} label="GitHub Pages" sub="HTTPS · CDN" accent />
      <Wire d="M 570 300 C 640 300, 640 230, 688 230" />
      <Wire d="M 800 257 V 331" />

      <rect x={350} y={430} width={560} height={70} rx={12} fill="rgb(226 182 83 / .05)" stroke="rgb(226 182 83 / .5)" strokeDasharray="5 4" />
      <text x={370} y={460} className="title" fontSize={13}>Playwright + axe on every change</text>
      <text x={370} y={482} fontSize={11.5}>routes · 320–1440 px overflow · links · mobile menu · accessibility</text>

      <Packet path="M 230 110 C 300 110, 300 160, 460 160 V 300 H 570 C 640 300, 640 230, 800 230 V 360" dur={4} />
    </Diagram>
  );
}
