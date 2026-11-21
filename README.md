# Arafat Onimisi Suleiman — Portfolio

A static, zero-build portfolio site for **Arafat Onimisi Suleiman** — engineer,
entrepreneur and technical consultant. Plain HTML, CSS and vanilla JavaScript:
no dependencies, no toolchain, no install step.

## Preview locally

**Easiest:** open `index.html` directly in the browser (or use "Open with Live
Server" in VSCodium).

**Or serve it** (recommended — matches production paths for images and video):

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## Structure

```
index.html                    all page content
404.html                      custom not-found page
assets/css/styles.css         design tokens + all styles
assets/js/main.js             theme, nav, scroll reveals, lazy video
assets/img/                   photos, social preview, video posters
assets/video/                 compressed site-ready clips (2.6 MB total)
media content/                original WhatsApp photos & videos (not published)
.github/workflows/deploy.yml  auto-deploy to GitHub Pages on push to main
```

## Sections

| Section | Content |
|---|---|
| Hero | Name, roles, positioning line, workshop photo |
| Profile | Biography, disciplines, key figures |
| Expertise | Six capability areas + secondary skills |
| Ventures | Block Manufacturing, Dean-Oil, Eurofoam, Triumph Tech, Global Care |
| Equipment | Printing, agriculture, power transmission, construction + mixer rental |
| In the field | Photo and video gallery from real work |
| Approach | Working principles |
| Contact | Two emails, WhatsApp, LinkedIn |

## Deploying (GitHub Pages)

Every push to `main` publishes via `.github/workflows/deploy.yml`. The repo is
already configured with **Settings → Pages → Source: GitHub Actions**.

Live URL: `https://comradeonboard.github.io/arafat-onimisi-portfolio/`

## Media notes

- Originals live in `media content/` and are **excluded from git** (see
  `.gitignore`) — they're the source, not the published site.
- Photos were resized and re-compressed; videos transcoded to H.264 with audio
  stripped and posters extracted. Replace a file in `assets/video/` and update
  its poster in `assets/img/posters/` to change a clip.
- Videos load only when scrolled into view, and pause when off-screen.

## Adding a custom domain later

Add a `CNAME` file at the project root containing the domain, then point DNS at
GitHub Pages. Update `og:image` to an absolute URL at that point.
