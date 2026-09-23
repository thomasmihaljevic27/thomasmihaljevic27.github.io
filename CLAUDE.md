# tmihalje.com

## Purpose
Personal academic/professional portfolio site for Thomas Mihaljevic (MA Economics,
Lakehead University), targeting policy/research analyst roles from Winter 2027.
Hosted on GitHub Pages at thomasmihaljevic27.github.io / tmihalje.com.

## Stack
- Static HTML/CSS/JS, no build step, no framework, no package manager
- PDF.js v3.11.174 via cdnjs — canvas-based paper viewer (paper.js)
- Fonts: Literata (body/headings), Archivo Narrow (nav/labels) — Google Fonts CDN

## Structure
- `index.html` — homepage
- `styles.css` — shared, root-level, linked by every page via root-absolute path
- `paper.js` — shared PDF viewer logic, loaded only by the two paper pages
- `economic-sanctions/index.html`, `housing-paper/index.html`, `nhl-trade-model/index.html`
  — project sub-pages (they mark Research in the nav with `aria-current="page"`)
- `404.html` — served by GitHub Pages for any missing path
- `contact/index.html` — redirect stub to `/#contact` only; keeps old links working
- `favicon.svg`, `favicon.ico`, `apple-touch-icon.png` — shared favicon geometry
- Every page `<head>` carries canonical, Open Graph (title/description from the page's own
  `<title>` and meta description) and `theme-color` tags. Keep them in sync when editing those.
  Canonical host is `https://www.tmihalje.com` (matches CNAME; the apex redirects to www).
- `Thomas_Mihaljevic_Resume.pdf`, `Sanctions.pdf`, `Housing_Paper.pdf` — served from root,
  linked by CV button / paper pages

## Design system (do not deviate without explicit sign-off)
- Palette: `#FAF8F3` paper, `#2A241E` ink, `#2F5D43` pine accent
- Two-column layout, left label column, no vertical hairline rule
- No animations. No Fraunces. No bold list-label formatting. For labelled lists use the
  `.progress` / `.ledger` label-column pattern or `.prose h3` subheads.
- Pine accent is for links, tags and status labels. Plain text (e.g. job role lines) stays ink.
- No inline `style=` attributes; add a class in `styles.css`.
- Phone nav (≤480px) hides Skills and Contact (`hide-sm`, `hide-xs`); the name must stay on
  one line. Re-check at 320/360px if nav items are added.
- Recruiter-first hierarchy: Experience before Research

## How to run locally
Static site, no build step:
python3 -m http.server 8000
Then visit localhost:8000

## Deploy
Push to main. GitHub Pages serves directly from the repo root — no build/deploy step.
Root-absolute paths (`/styles.css`, `/paper.js`) depend on this being a user-site repo
(`<username>.github.io`) served from the domain root. They will break if this is ever
forked into a project-page repo served from a subpath.

## Don't
- Never invent or infer biographical content. Only verified facts from resume/existing site.
  When in doubt, omit and ask.
- Don't reintroduce AI-writing patterns: "sits at the intersection of," "data-driven,"
  YIMBY/manifesto framing, mechanical em-dash rule-of-three lists.
- Don't touch favicon geometry without checking 16px legibility — stems are 6 units wide,
  4-unit gap between t and m. A wider 7-unit-counter version closed up into a bar at tab size.
- Don't assume subpath deploy. This is a GitHub user site served from the domain root.

Every time I get corrected on something, add a rule here so it doesn't repeat.
