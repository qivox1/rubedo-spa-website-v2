# Astro-Projekt — Quick-Reference

> Diese Datei ergänzt die `CLAUDE.md` im Parent-Folder mit Code-spezifischen Konventionen.

## Wichtige URLs

- **Repo:** https://github.com/qivox1/rubedo-spa-website
- **Live (Preview):** https://rubedo-spa-website.pages.dev/
- **Cloudflare-Dashboard:** https://dash.cloudflare.com/b06227057f92fef01d11a9bb1271af13/pages/view/rubedo-spa-website
- **Spätere Production-Domain:** https://rubedo-spa.de (DNS via domainfactory, CNAME beim Launch)

## Routing

- `output: 'static'`, `trailingSlash: 'always'`, `build.format: 'directory'` (siehe `astro.config.mjs`).
- Eine Page pro Astro-Datei. Routes werden aus dem Pfad in `src/pages/` abgeleitet.
- Magazin-Artikel sind Markdown unter `src/content/magazin/` mit YAML-Frontmatter (Schema in `src/content/config.ts`). Routing kommt automatisch über `src/pages/magazin/[...slug].astro`.

## Style-Pipeline

```
src/styles/
├─ tokens.css       Design-Tokens als CSS-Custom-Properties (Farben, Type, Spacing, Motion)
├─ template.css     Alle .rb-* Komponenten-Klassen (Header, Footer, Sections, Buttons, …)
└─ global.css       Eintrittspunkt: importiert tokens + template, dann @tailwind base/components/utilities
```

WICHTIG: `@import`-Statements MÜSSEN vor `@tailwind`-Direktiven stehen, sonst werden sie verworfen.

## Komponenten-Konventionen

- Globale Komponenten in `src/components/Site*.astro` (Topbar, Header, Footer, SchemaOrg, Analytics, ConsentBanner).
- Layout in `src/layouts/BaseLayout.astro`. Jede Page wrappt sich darin.
- Inhalts-Komponenten in `src/components/<Name>.astro`. Beispiel: `ArticleCard.astro`.
- Reveal-on-Scroll: `data-reveal` Attribut auf einem Element, der IntersectionObserver in BaseLayout.astro fügt automatisch `is-revealed` hinzu.

## Bilder

- Alle Hero/Content-Bilder in `public/images/` (webp bevorzugt).
- Pfade in Astro-Files immer absolut: `/images/<name>.webp`.
- LCP-Optimierung: `heroImage`-Prop auf BaseLayout setzen — generiert automatisch `<link rel="preload">`.

## Site-Konstanten

`src/lib/site.ts` ist Single Source of Truth für NAP, Tracking, Social, Nav-Items, Booking-Embed-URL.

**Nav-`feature` (seit 2026-06-10):** Ein Nav-Item mit `groups` (Mega-Menü, aktuell „Anwendungen") kann ein optionales `feature: { label, href, description }` haben. Das rendert `SiteHeader.astro` als hervorgehobene Banner-Zeile unter den Spalten (Desktop) bzw. als hervorgehobenen Eintrag (Mobile). Genutzt für „Leistungen & Preise" → `/leistungen/`, damit die Top-Nav bei 5 Punkten bleibt. Styles: `.rb-nav__mega-feature*` in `template.css`, `.rb-mnav__sublink--feature` in `SiteHeader.astro`.

## Seiten-Stand (2026-06-10)

16 Routen live. Neu seit dem Compliance-Update: `src/pages/agb/`, `src/pages/kryo-vital/kryo-facial/`, `src/pages/leistungen-preise/` (URL `/leistungen-preise/`, Titel „Leistungen und Preise"; alte `/leistungen/` → 301 in `public/_redirects`). Seit 11.06.2026: `src/pages/kontakt/` entfernt — Inhalt in `src/pages/termin-buchen/` als „Termin & Kontakt" zusammengelegt (Sprungmarken `#termin`/`#kontakt`), `/kontakt/` → 301. Nav-CTA-Button heißt „Termin & Kontakt". Alle Preisblöcke tragen „inkl. MwSt."; HWG-/INCI-/NemV-Hinweise sind eingebaut (NemV-Hersteller noch Platzhalter). Testimonial-Sektion auf DNA Skin existiert, ist aber per `SHOW_TESTIMONIALS = false` deaktiviert. Details: `../2026-06-10_Umsetzungsreport_Aenderungswuensche_Monica.md`.

## Push (Achtung große Dateien)

`.secrets/api-push.sh` bricht bei großen Dateien mit `jq: Argument list too long` ab. Für Pushes mit größeren Dateien (z. B. `template.css`) das Python-Skript nehmen:

```bash
python3 .secrets/api-push-with-delete.py "feat: …" --add <file1> <file2> …
```

## Magazin-Frontmatter (siehe `src/content/magazin/_template.md`)

Pflicht: `title, description, pubDate, author, category, heroImage, heroImageAlt`.
Optional aber empfohlen: `excerpt, updatedDate, tags, readingTime, featured, draft, toc, faq, related`.

`category` ist ein kontrolliertes Vokabular (siehe `src/content/config.ts`). Neue Werte erst dort ergänzen, sonst failt der Build.

`draft: true` versteckt den Artikel — vor Publikation auf `false` setzen.

## Schema.org

- `LocalBusiness` (HealthAndBeautyBusiness) global in `BaseLayout` via `<SchemaOrg />`.
- `Article` + `BreadcrumbList` automatisch pro Magazin-Artikel.
- `FAQPage` automatisch, wenn ein Artikel `faq:` im Frontmatter hat.

## Build-Setup (Cloudflare Pages)

- Build-Command: `npm run build`
- Build-Output: `dist`
- Node: `20.18.0` (env `NODE_VERSION`)
- Sitemap: automatisch via `@astrojs/sitemap`, Output `sitemap-index.xml` + `sitemap-0.xml` in `dist/`.

## Lokal entwickeln (selten nötig — meist baut CF direkt nach Push)

```bash
nvm use            # respektiert .nvmrc → 20.18.0
npm install        # vorhandener Lockfile sollte passen
npm run dev        # http://localhost:4321
npm run build      # → dist/
npm run preview    # rendered build lokal
```
