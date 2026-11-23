# Arafat Onimisi Suleiman | Portfolio

A static, zero-build portfolio site for **Arafat Onimisi Suleiman**, engineer,
entrepreneur and technical consultant. Plain HTML, CSS and vanilla JavaScript:
no dependencies, no toolchain, no install step.

## Preview locally

**Easiest:** open `index.html` directly in the browser (or use "Open with Live
Server" in VSCodium).

**Or serve it** (recommended, matches production paths for images and video):

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## Pages

| File | Page | Content |
|---|---|---|
| `index.html` | Home | Hero, profile summary, key figures, section index, gallery preview, contact CTA |
| `about.html` | About | Full biography, disciplines, key figures, approach |
| `expertise.html` | Expertise | Six capability areas plus secondary skills |
| `ventures.html` | Ventures | Block Manufacturing, Dean-Oil, Eurofoam, Triumph Tech, Global Care |
| `equipment.html` | Equipment | Printing, agriculture, power transmission, construction, mixer rental |
| `field.html` | Field | Photo and video gallery from real work |
| `contact.html` | Contact | Two emails, WhatsApp, LinkedIn, location details |
| `404.html` | Not found | Custom error page |

## Structure

```
index.html / about.html / ...  one file per page
404.html                       custom not-found page
assets/css/styles.css          design tokens and all styles
assets/js/main.js              theme, mobile menu, scroll reveals, lazy video
assets/img/                    photos, portrait, social preview, video posters, favicons
favicon.ico                    root favicon for browsers that request /favicon.ico
assets/video/                  compressed site-ready clips (2.6 MB total)
media content/                 original WhatsApp photos and videos (not published)
sitemap.xml, robots.txt        search engine files
.github/workflows/deploy.yml   auto-deploy to GitHub Pages on push to main
```

## Editing

Each page is a complete, self-contained HTML file. The header and footer are
repeated in every page, so if you add or rename a navigation item, update the
`<nav>` block in all seven pages (and the `aria-current="page"` marker on the
page you're editing).

Every section that still needs real content is marked with a comment:

```html
<!-- TODO(content): ... -->
```

See `TODO-CONTENT.md` for the outstanding list.

## Deploying (GitHub Pages)

Every push to `main` publishes via `.github/workflows/deploy.yml`. The repo is
already configured with **Settings → Pages → Source: GitHub Actions**.

Live URL: `https://comradeonboard.github.io/arafat-onimisi-portfolio/`

## Media notes

- Originals live in `media content/` and are **excluded from git** (see
  `.gitignore`). They are the source, not the published site.
- Photos were resized and re-compressed; videos transcoded to H.264 with audio
  stripped and posters extracted. Replace a file in `assets/video/` and update
  its poster in `assets/img/posters/` to change a clip.
- Videos load only when scrolled into view, and pause when off-screen.

## Notes

- Dark theme by default, with a light-mode toggle remembered per visitor.
- Responsive from 320px up: single-column layouts, stacked navigation, fluid type.
- Respects `prefers-reduced-motion`; the site works without JavaScript.
- No external JS libraries. Fonts load from Google Fonts with system fallbacks.
