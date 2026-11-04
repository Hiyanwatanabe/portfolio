# Hiyan Kubagawa: portfolio

Personal engineering portfolio: React 19 + TypeScript + Vite, static, deployed to GitHub Pages.
The public address lives in `site.config.json` (`siteUrl`); see "Custom domain" below.

## Run it

```bash
npm install
npm run dev          # http://localhost:5173/portfolio/
```

```bash
npm run build        # type-check, build to dist/, write 404.html + sitemap.xml
npm run preview      # serve dist/ at http://localhost:4173/portfolio/
```

```bash
npx playwright install chromium   # once
npm run check        # lint + build + Playwright tests (desktop and mobile)
```

## Where things live

| Path | What |
|---|---|
| `src/data/profile.ts` | Name, links, hero copy, about text, contact copy |
| `src/data/experience.ts` | Roles, capabilities, highlights (formal titles stay as on the resume) |
| `src/data/projects.ts` | Every project: confidential (role, domains, principles) or public (full case study) |
| `src/data/skills.ts` | Skill tiers with evidence links, and the five layers of the stack explorer |
| `src/data/education.ts` | Degree, certifications, athletics, the "Splits" timeline |
| `src/pages/` | Home, case-study template, 404 |
| `src/components/` | Header/footer, hero lanes, stack explorer, project previews |
| `src/visuals/` | SVG diagrams for public projects; `SpecVisual` domain map for confidential work |
| `src/styles/global.css` | The whole design system: tokens at the top, then components |
| `scripts/optimize_images.py` | Crops and converts photos (and the privacy-cropped diploma) to WebP; builds `public/og.png` |
| `resume/resume.html`, `scripts/build_resume.mjs` | Resume source and PDF build (`node scripts/build_resume.mjs`) |
| `tests/site.spec.ts` | Smoke, routing, overflow, links, mobile menu, explorer keyboard, diploma dialog, axe, confidentiality |

Text changes never need a component edit: change the data file and the page follows.

### Add a project

1. Add an object to `projects` in `src/data/projects.ts` (copy an existing one). `slug` becomes `/work/<slug>`.
2. Professional work: `confidential: true`, `visual: "spec"` (the domain map is drawn from `domains`).
   Public work: pick a `visual`; to draw a new diagram, add a component in `src/visuals/`, register it in
   `src/visuals/index.tsx` and add its key to `VisualKey`.
3. Confidential projects appear in the "Professional" grid on the homepage; public ones under "Research &
   independent". `layers` controls where it shows up in the stack explorer. The sitemap picks up new slugs
   automatically.

### Replace a photo

Put the original in a folder outside the repo (default `../_orig_assets`), keep the file names used in
`JOBS` in `scripts/optimize_images.py` (or edit them), then:

```bash
python scripts/optimize_images.py ../_orig_assets
```

Faces are only cropped and resized, never retouched.

### Replace the resume

Overwrite `public/Hiyan_Kubagawa_Resume.pdf` (or change `resume` in `src/data/profile.ts`).

## Deploy (only when you decide to)

The live site is the `gh-pages` branch. `npm run deploy` builds and pushes `dist/` to it with `gh-pages`.
Merge the `redesign` branch into `main` first if you want the source there too. `base` in `vite.config.ts`
must match the repository name (`/portfolio/`).

Deep links like `/portfolio/work/cognisense` work because the build copies `index.html` to `404.html`, which GitHub
Pages serves for unknown paths.

## Content rules

- Professional work is **confidential**: set `confidential: true` and describe role, engineering domains,
  technologies and general principles only. No internal system names, hardware, quantities, schedules,
  architecture, routing, vendors, data, metrics or business strategy, and no diagrams or screenshots.
  The test suite fails if known internal terms appear in the pages or the JavaScript bundle. Those terms
  live in `tests/private-terms.txt` (one regex per line), which is **gitignored on purpose**: listing them in a
  public repo would disclose them. A fresh clone won't have it; recreate it locally.
- Research and personal projects can go into full technical depth.
- No skill percentages and no invented metrics.
- Remember the repository is public: comments, commit messages and history are published too.

## Custom domain

`site.config.json` holds the public address (`siteUrl`). Everything else follows from it at build time:
Vite's base path, canonical/Open Graph/JSON-LD URLs, `sitemap.xml`, `robots.txt`, and a `CNAME` file when
the host isn't `*.github.io`.

To move to `https://hiyaner.is-a.dev/` after the is-a.dev registration is merged:

1. Set `"siteUrl": "https://hiyaner.is-a.dev/"` in `site.config.json`.
2. `npm run check`, then `npm run deploy`.
3. Repo **Settings → Pages → Custom domain**: `hiyaner.is-a.dev`, then **Enforce HTTPS** once available.

The old `hiyanwatanabe.github.io/portfolio/` URL then redirects to the custom domain.
