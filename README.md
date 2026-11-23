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
render.yaml                    optional Render Blueprint (Web Service)
server.py                      tiny Python server used by the Render Web Service
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

## Deploying (Render Web Service)

The repo includes `server.py`, a tiny dependency-free Python server, so the site
can run as a **Web Service** on Render. It listens on the port Render provides
(`PORT`), serves the files from `dist/`, and uses the site's own `404.html` for
unknown URLs.

### Option A: Dashboard (step by step)

1. Push the site to GitHub (this repo is already on `main`).
2. In the [Render Dashboard](https://dashboard.render.com/), click
   **New → Web Service**.
3. Connect your GitHub account and choose
   `comradeonboard/arafat-onimisi-portfolio`.
4. Fill in the service settings:

   | Field | Value |
   |---|---|
   | Runtime | **Python 3** |
   | Branch | `main` |
   | Root Directory | leave empty (repo root) |
   | Plan | Free (or paid, if you need it always awake) |
   | Build Command | `mkdir -p dist && cp -r *.html *.xml *.txt favicon.ico assets dist/` |
   | Start Command | `python3 server.py` |

   The build command only copies the public files into `dist/`; nothing is
   compiled. No `requirements.txt`, packages or environment variables are
   needed. `server.py` reads `PORT` from the environment automatically.

5. Click **Create Web Service**. The first deploy takes a few minutes. Render
   gives you a URL like `https://arafat-onimisi-portfolio.onrender.com`.
6. Future pushes to `main` deploy automatically. To deploy manually, use
   **Manual Deploy → Deploy latest commit**. Auto-deploy can be changed under
   **Settings → Build & Deploy**.
7. Optional custom domain: **Settings → Custom Domains → Add Custom Domain**.
   Follow the DNS instructions Render shows, then add the `www` version as well
   so it redirects. HTTPS certificates are issued automatically.

> On the free plan, Render puts a Web Service to sleep after a period of
> inactivity, so the first visit after a gap can take several seconds. Upgrade
> the plan if that matters. (A Static Site would avoid this, but the site is
> configured as a Web Service as requested.)

### Option B: Blueprint (one-time setup)

`render.yaml` in the repo root describes the same Web Service (Python runtime,
the build command above, and `python3 server.py` as the start command). In
Render, click **New → Blueprint**, connect this repo, and Render picks up the
settings from the file. Subsequent pushes to `main` redeploy as usual.

### After the first Render deploy

`sitemap.xml`, `robots.txt` and the `og:image` / `twitter:image` tags in the
seven content pages contain absolute GitHub Pages URLs. Replace the
`https://comradeonboard.github.io/arafat-onimisi-portfolio` prefix in those
files with your Render URL (or your custom domain), then push. All other links
in the site are relative, so nothing else needs changing.

The social preview card is `assets/img/og-cover.jpg` (1200 × 630), built from the
image the client supplied. It is used by `og:image` and `twitter:image` on every
content page.

The GitHub Pages workflow can keep running without affecting Render. If you no
longer need it, delete `.github/workflows/deploy.yml` or change its trigger.

## Media notes

- Originals live in `media content/` and are **excluded from git** (see
  `.gitignore`). They are the source, not the published site.
- Photos were resized and re-compressed; videos transcoded to H.264 with audio
  stripped and posters extracted. Replace a file in `assets/video/` and update
  its poster in `assets/img/posters/` to change a clip.
- Videos load only when scrolled into view, and pause when off-screen.

## Notes

- Light theme by default, with a dark-mode toggle remembered per visitor.
- Responsive from 320px up: single-column layouts, stacked navigation, fluid type.
- Respects `prefers-reduced-motion`; the site works without JavaScript.
- No external JS libraries. Fonts load from Google Fonts with system fallbacks.
