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
assets/img/                    photos, portrait (also the social preview), video posters, favicons
favicon.ico                    root favicon for browsers that request /favicon.ico
assets/video/                  compressed site-ready clips (2.6 MB total)
media content/                 original WhatsApp photos and videos (not published)
sitemap.xml, robots.txt        search engine files
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

## Deploying (Render Web Service)

GitHub Pages auto-deploy has been removed. This repo is set up for a **Web
Service** on Render only.

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
   | Start Command | `python3 server.py` |

   Build Command:

   ```bash
   mkdir -p dist && cp -r *.html *.xml *.txt favicon.ico assets dist/ && if [ -n "$RENDER_EXTERNAL_URL" ]; then grep -rl 'https://comradeonboard.github.io/arafat-onimisi-portfolio' dist | xargs -r sed -i "s|https://comradeonboard.github.io/arafat-onimisi-portfolio|$RENDER_EXTERNAL_URL|g"; fi
   ```

   The build command copies the public files into `dist/` and rewrites the
   absolute URLs in `sitemap.xml`, `robots.txt` and the social-preview meta tags
   to your live Render URL. Render supplies `RENDER_EXTERNAL_URL` automatically;
   no environment variables need to be set manually. Nothing is compiled, and
   no `requirements.txt` or packages are needed. `server.py` reads `PORT` from
   the environment automatically.

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

### URLs and the social preview

The source files still contain the old GitHub Pages URL as a placeholder; the
build command above replaces it with `RENDER_EXTERNAL_URL` on every Render
deploy, so `sitemap.xml`, `robots.txt`, `og:image` and `twitter:image` point at
the live site automatically. If you use a custom domain and want those tags to
use it instead, replace `$RENDER_EXTERNAL_URL` in the build command with your
domain. All other links in the site are relative, so nothing else changes.

The social preview is the image the client supplied,
`assets/img/portrait.jpg`, used directly by `og:image` and `twitter:image` on
every content page. There is no separate cover or card image.

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
