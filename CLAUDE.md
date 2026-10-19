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
  `llms.txt`) + `robots.txt` (Disallow all) + `_headers` (CSP nur 'self' — Fonts seit 2026-07-24 self-hosted unter `/fonts/`; unpkg/unsafe-eval seit 2026-07-14 entfernt). Zusätzlich: `src/monica/404.html` (404-Seite, nicht von Monica — Markenlook-Ergänzung) und Favicon aus Monicas `logo-hires.png`.

**Nicht übernommen** (Monicas eigene Publikations-Plancia, „nie öffentlich"): alle `_*.html`
Arbeitsdokumente, Audits, Preis-Master, Backups, `sitemap.html`, Design-System- und
Lab-Werkzeuge. Sie liegen weiterhin im Workspace-Ordner
`2026-07-14 Anpassungen Monica Claude/Rubedo Spa (1)/rubedo/`.

## Stand 19.10.2026 — Monicas Übergabe eingespielt

- Quelle: Workspace-Ordner `2026-10-19 Übergabe aktueller Stand Monica/github-export/rubedo-spa/`,
  unverändert archiviert im privaten Repo `qivox1/rubedo-spa-monica` (Commit `39ef3f3`).
- 52 Seiten übernommen (14 neu: cutis, vigor, corpus, das-rubedo-prinzip, dna-skin-concept,
  transparenz-vorbereitung, 8 Magazinartikel). Nicht übernommen, weil laut Monicas `.htaccess`
  intern: `lab-prinzipien.html`, `luxury-kompass.html`, `sitemap.html`; außerdem ihre
  `sitemap.xml`, `.htaccess`, `README.md`, `robots.txt`, `tweaks-panel.jsx`.
- Dabei wieder angewendet: Links/Assets root-absolut, **Google Fonts → `/fonts/fonts.css`**
  (Monicas Export lädt wieder von Google), React/Babel-Tweaks-Panel entfernt (anwendungen,
  genomis, vier-schichten), Nav-CTA-Fix in `styles.css` (jetzt vor den Media-Queries,
  weil Monica eigene Mobil-Regeln für den Button hat).
- Nichts gelöscht: ältere Bilder, `breathwork-vorbereitung` (nicht mehr verlinkt), 404, Favicon,
  Fonts, `_headers`, `robots.txt` bleiben.
- **Nächste Lieferung von Monica:** `python3 tools/monica-import/apply.py <export-ordner>`
  im Repo-Root ausführen — wendet alle obigen Anpassungen automatisch an, löscht nichts.

## Build & Deploy

Astro 5 (`npm run build` → `dist`), Cloudflare Pages Projekt `rubedo-spa-website-v2`
(Account „Hi@qivox.ai", GitHub-SSO), Auto-Deploy bei Push auf `main`.

Push aus Cowork-Sessions:
```
python3 …/.secrets/api-push-with-delete.py "msg" --repo qivox1/rubedo-spa-website-v2 --add …
```
