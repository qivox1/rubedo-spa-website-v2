# Rubedo Spa Website v2 — Monicas Design (Arbeitskopie)

Dieses Repo ist die **v2-Arbeitskopie** von `qivox1/rubedo-spa-website`. Seit 2026-07-14 trägt
sie **Monicas komplette Neugestaltung** („Rubedo L.A.B.", vier Dimensionen Cutis · Vigor ·
Corpus · Origo). Die Original-Site (Astro, Drei-Säulen-Design) bleibt unangetastet unter
https://rubedo-spa-website.pages.dev/ — ihr Code liegt vollständig in der Git-Historie
(bis Commit `47b898d`).

**Preview:** https://rubedo-spa-website-v2.pages.dev/ (robots.txt + X-Robots-Tag: noindex —
bewusst nicht indexierbar, reine Abstimmungs-Preview).

## Architektur

Monicas Seiten sind statisches HTML und werden **1:1 unverändert** ausgeliefert:

- `src/monica/*.html` — Monicas Original-Seiten, wortwörtlich. Einzige technische Anpassungen:
  interne Links `foo.html` → `/foo/`, Asset-Pfade root-absolut (`/img/…`, `/styles.css`).
- `src/pages/<slug>.astro` — Mini-Routen, die die jeweilige HTML-Datei per `?raw` +
  `set:html` unverändert ausgeben. **Inhaltliche Änderungen IMMER in `src/monica/*.html`
  machen, nie in den .astro-Dateien.**
- `public/` — Monicas Assets (`img/`, `audio/`, `styles.css`, `system.css`, `app.js`,
  `llms.txt`) + `robots.txt` (Disallow all) + `_headers` (CSP erlaubt Google Fonts + unpkg).

**Nicht übernommen** (Monicas eigene Publikations-Plancia, „nie öffentlich"): alle `_*.html`
Arbeitsdokumente, Audits, Preis-Master, Backups, `sitemap.html`, Design-System- und
Lab-Werkzeuge. Sie liegen weiterhin im Workspace-Ordner
`2026-07-14 Anpassungen Monica Claude/Rubedo Spa (1)/rubedo/`.

## Build & Deploy

Astro 5 (`npm run build` → `dist`), Cloudflare Pages Projekt `rubedo-spa-website-v2`
(Account „Hi@qivox.ai", GitHub-SSO), Auto-Deploy bei Push auf `main`.

Push aus Cowork-Sessions:
```
python3 …/.secrets/api-push-with-delete.py "msg" --repo qivox1/rubedo-spa-website-v2 --add …
```
