# Rubedo Spa Website

Statische Astro-Website für [Rubedo Spa Minden](https://rubedo-spa.de) — Longevity-Studio mit drei Säulen (DNA Skin Intelligence, Kryo Vital, Inner Source). Geführt von Monica Galletti.

## Tech-Stack

- **Astro 5** (`output: 'static'`, `trailingSlash: 'always'`)
- **Tailwind CSS v4** (Theme-Bridge zu eigenen Design-Tokens in `src/styles/tokens.css`)
- **Astro Content Collections** (Markdown/MDX) — folgt für Magazin-Artikel
- **astro:assets** (sharp) für AVIF/WebP, automatisches `srcset`
- **Klaro** für Cookie-Consent (kostenfrei, OSS)
- **GA4 + Google Tag Manager** mit Consent Mode v2 (default-deny)
- **View Transitions** für sanfte Page-Transitions
- **Hosting:** Cloudflare Pages (Edge-CDN)

## Lokal entwickeln

```bash
nvm use            # nutzt Node 20.18.0 (siehe .nvmrc)
npm install
npm run dev        # Dev-Server auf http://localhost:4321
npm run build      # Production-Build → dist/
npm run preview    # Lokale Vorschau des Builds
```

## Projektstruktur

```
src/
├─ components/        Astro-Komponenten (Header, Footer, Schema, Analytics, Consent)
├─ layouts/           BaseLayout.astro
├─ lib/               site.ts (zentrale Site-Konstanten)
├─ pages/             Eine .astro-Datei pro Route
├─ styles/            tokens.css, template.css, global.css
└─ content/           (geplant: Magazin-Artikel als Markdown)

public/
├─ images/            Hero- und Content-Bilder (webp, sharp-optimiert)
├─ fonts/             Self-hosted Fonts (geplant)
├─ icons/             Sprite-Icons
├─ logo-rubedo-spa.{png,svg}
├─ _headers           Cloudflare-Pages HTTP-Header (CSP, Cache, Security)
├─ _redirects         301-Map von WP-URLs auf neue Struktur
└─ robots.txt
```

## Inhalts-Pflege

Aktuell laufen Inhalte als Markdown im Repo (kein CMS). Für eine Inhaltsänderung:

1. Datei in `src/pages/` oder `src/content/` editieren
2. Commit + Push auf `main`
3. Cloudflare Pages baut und deployt automatisch (~30 Sekunden)

Vorlagen für Magazin-Artikel folgen in `src/content/magazin/_template.md`.

## Performance-Ziele

- Lighthouse Performance ≥ 98
- Accessibility / Best Practices / SEO = 100
- LCP < 1.8 s, CLS < 0.05, INP < 200 ms
- TTFB < 100 ms (Edge-Cache)

CI prüft das automatisch über `.github/workflows/lighthouse.yml`.

## Deployment

Cloudflare Pages → connect `main` → Build:

- Build command: `npm run build`
- Build output: `dist`
- Node version: `20.18.0`

Beim Launch DNS bei domainfactory ([df.eu](https://df.eu)) auf den Cloudflare-CNAME zeigen lassen oder Domain in Cloudflare DNS verschieben.

## Strategie & Konzept

Hintergrund, IST-Analyse und Architektur stehen im Konzept-Dokument:
`/Users/oliverparrizas1/Documents/Claude/Projects/RubedoSpa/Rubedo_Spa_Astro_Konzept.md`

## Lizenz

Proprietär · © Rubedo Spa Minden
