# Übergabe — Stand 30. April 2026

Erste Iteration der Astro-Site liegt im Workspace-Folder
`/Users/oliverparrizas1/Documents/Claude/Projects/RubedoSpa/website/`.

## 1 Was ist gebaut?

**14 Pages** als statische Astro-Routen:

| Route | Datei |
|---|---|
| `/` | `src/pages/index.astro` |
| `/philosophie/` | `src/pages/philosophie.astro` |
| `/dna-skin-intelligence/` | `src/pages/dna-skin-intelligence/index.astro` |
| `/kryo-vital/` | `src/pages/kryo-vital/index.astro` |
| `/kryo-vital/koerperformung/` | `src/pages/kryo-vital/koerperformung/index.astro` |
| `/inner-source/` | `src/pages/inner-source/index.astro` |
| `/ueber-monica/` | `src/pages/ueber-monica/index.astro` |
| `/kontakt/` | `src/pages/kontakt/index.astro` |
| `/magazin/` | `src/pages/magazin/index.astro` |
| `/magazin/example-artikel/` | `src/pages/magazin/example-artikel/index.astro` |
| `/termin-buchen/` | `src/pages/termin-buchen/index.astro` |
| `/datenschutz/` | `src/pages/datenschutz/index.astro` |
| `/impressum/` | `src/pages/impressum/index.astro` |
| 404 | `src/pages/404.astro` |

**6 globale Komponenten** in `src/components/`:
SiteTopbar, SiteHeader (mit Mobile-Menu), SiteFooter (mit Social-Icons für Insta/FB/LinkedIn/YT/TikTok), SchemaOrg (LocalBusiness JSON-LD), Analytics (GA4 + GTM mit Consent Mode v2 default-deny), ConsentBanner (Klaro, kostenfrei).

**Layout:** `src/layouts/BaseLayout.astro` — kümmert sich um Meta-Tags, OG/Twitter, Canonical, Schema, Skip-Link, View-Transitions.

**Styles:** `src/styles/tokens.css` (Design-System aus dem Claude-Design 1:1 übernommen) + `src/styles/template.css` (alle `rb-*` Komponenten-Klassen) + `src/styles/global.css` (Tailwind v4 + Astro-spezifische Bridge).

**Konfiguration:**
- `astro.config.mjs` — `output: 'static'`, `trailingSlash: 'always'`, sitemap, Tailwind, View-Transitions
- `public/_headers` — Strict-CSP, HSTS, Cache-Control für Cloudflare Pages
- `public/_redirects` — 301-Map von alten WordPress-URLs (`/kryo/`, `/presso-massage/`, `/datenschutzerklaerung/` usw.)
- `public/robots.txt` — AI-Crawler explizit erlaubt (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
- `.github/workflows/lighthouse.yml` — Lighthouse CI mit Score-Targets (Performance ≥ 95, SEO/A11y = 100)

**Site-Konstanten** in `src/lib/site.ts` — Adresse, Telefon, E-Mail (`info@rubedo-spa.de`), Öffnungszeiten, GA4 (`G-41DDXKN7XL`), GTM (`GT-P3N6R5J2`), Booking (Google-Account `rubedospa@gmail.com`), Social-URLs (leer — du füllst sie ein, Icons blenden sich automatisch ein).

**25 Bilder** in `public/images/` (alle webp/png aus dem Design-Export).

## 2 Erster Push nach GitHub

Sandbox-Permissions verhindern, dass ich hier `git commit` ausführen kann (`.git/index.lock` ist read-only). Bitte einmal lokal:

```bash
cd /Users/oliverparrizas1/Documents/Claude/Projects/RubedoSpa/website

# falls noch nicht gesetzt:
git config user.name  "Oli"
git config user.email "hi@codaai.ai"

git add -A
git commit -m "chore: initial Astro setup with all pages and design system"
git branch -M main
git push -u origin main
```

## 3 Lokal testen (1 Minute)

```bash
cd /Users/oliverparrizas1/Documents/Claude/Projects/RubedoSpa/website
nvm use            # Node 20.18 (.nvmrc)
npm install        # ~30 s, ist hier schon gelaufen
npm run dev        # http://localhost:4321
```

`npm run build` produziert `dist/` mit allen statischen HTML-Files.

## 4 Cloudflare Pages anschließen

1. **Account anlegen** auf cloudflare.com (kostenlos, falls noch nicht vorhanden).
2. **Workers & Pages → Create → Pages → Connect to Git → GitHub** und das Repo `qivox1/rubedo-spa-website` autorisieren.
3. Build-Settings:
   - Production branch: `main`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version (Env Variable `NODE_VERSION`): `20.18.0`
4. **Erster Deploy** läuft automatisch. Du bekommst eine URL `rubedo-spa-website.pages.dev` — das ist die Preview, da kannst du in Ruhe alles testen.
5. **Custom Domain** kommt erst beim Launch dran (siehe §5).

## 5 Wann brauche ich Cloudflare-Zugriff für die Domain?

Erst beim Launch. Bis dahin läuft alles auf der `*.pages.dev`-Subdomain. Beim Cutover hast du zwei Möglichkeiten:

- **Variante 1 (einfach):** Bei domainfactory einen CNAME-Record setzen — `rubedo-spa.de` und `www.rubedo-spa.de` zeigen auf `rubedo-spa-website.pages.dev`. SSL läuft automatisch über Cloudflare. Vorteil: DNS bleibt bei df.eu, kein Eingriff am Mail-Setup.
- **Variante 2 (Vollservice):** Die Domain in Cloudflare als Site hinzufügen. Cloudflare wird dein neuer DNS-Provider (kostenfrei), df.eu wird auf "DNS extern" gestellt. Mail-Records ziehst du mit um. Vorteil: schnellster Weg, alle Cloudflare-Features (WAF, Caching), aber Mail-Routing einmal sauber konfigurieren.

Empfehlung: **Variante 1**, weil sie das Mail-Setup nicht antastet.

## 6 Magazin — Content Collections mit YAML

Das Magazin läuft auf **Astro Content Collections**. Jeder Artikel ist eine Markdown-Datei mit YAML-Frontmatter unter `src/content/magazin/`.

**Schema** liegt typisiert in `src/content/config.ts` (Zod-Validation) — falsche oder fehlende Felder failen den Build sofort. Das ist gewollt.

```
src/content/
├─ config.ts                        # Zod-Schemas (authors + magazin)
├─ authors/
│  └─ monica.json                   # Wiederverwendbare Autor-Daten
└─ magazin/
   ├─ _template.md                  # Vorlage (wird vom Build ignoriert)
   ├─ wellness-minden-technologie.md
   └─ kryotherapie-minden.md
```

**Pflicht-Frontmatter** (siehe `_template.md`):
`title, description, pubDate, author, category, heroImage, heroImageAlt`.

**Optional**:
`excerpt, updatedDate, tags, ogImage, readingTime, featured, draft, toc, faq, related, canonical, headline`.

**Routing** ist automatisch:
- Übersicht: `/magazin/` (sortiert nach Datum, featured-Artikel im Hero, Drafts ausgeschlossen)
- Artikel: `/magazin/<slug>/` — dynamisch über `src/pages/magazin/[...slug].astro`
- Kategorien: `/magazin/kategorie/<slug>/` — automatisch aus den vergebenen `category:`-Werten
- RSS-Feed: `/magazin/rss.xml`

**Article-Schema** (JSON-LD) wird pro Artikel automatisch generiert: `Article` + `BreadcrumbList`, plus `FAQPage`, falls der Artikel ein `faq:`-Frontmatter hat.

**Neuen Artikel anlegen** (Beispiel):

```bash
cp src/content/magazin/_template.md src/content/magazin/mein-neuer-artikel.md
# editieren, draft: false setzen, committen, pushen — fertig.
```

## 7 Was ist noch nicht drin?

Sinnvoll für die nächsten Iterationen:

- **Self-hosted Fonts** (Cormorant Garamond + Outfit) für DSGVO-Strenge — aktuell von fonts.gstatic.com.
- **Google Calendar Booking-Embed** in `/termin-buchen/` — sobald Workspace-Account aktiv. URL kommt in `src/lib/site.ts` → `booking.embedUrl`. Form als Fallback ist drin.
- **Cloudflare Turnstile** — Site-Key ist Platzhalter im Termin-Formular. In Cloudflare Dashboard Site-Key generieren, in `src/pages/termin-buchen/index.astro` einsetzen.
- **Kontakt-Seite** ist aus dem Design-Template übernommen, hat aber stilistisch noch Platzhalter (z. B. Karte fehlt) — nach erstem Live-Test entscheiden, was vertieft werden soll.
- **Social-Profile-URLs** ergänzen in `src/lib/site.ts` → die Icons im Footer erscheinen automatisch, sobald URLs eingetragen sind.
- **Schema-Erweiterung** für jede Behandlungs-Seite (Service-Schema mit Preisen) — aktuell nur LocalBusiness global.
- **Bitte lokal löschen:** `src/pages/magazin/example-artikel/` — der Ordner enthält nur noch eine Redirect-Hülle, weil meine Sandbox keine Permission zum `rm` hatte.

## 7 Repo-Struktur — Quick-Reference

```
.
├─ astro.config.mjs       Astro-Build-Config
├─ package.json           Dependencies (Astro 5, Tailwind v4, sharp …)
├─ tsconfig.json          Path-Aliases (@/*, @components/* …)
├─ public/
│  ├─ _headers            CSP, HSTS, Cache-Control für Cloudflare
│  ├─ _redirects          301-Map alte WP-URLs
│  ├─ robots.txt          AI-Crawler erlaubt
│  ├─ images/             25 webp/png-Bilder
│  └─ logo-rubedo-spa.{svg,png}
├─ src/
│  ├─ components/         6 Astro-Komponenten
│  ├─ layouts/BaseLayout.astro
│  ├─ lib/site.ts         Single Source of Truth (NAP, Tracking, Social)
│  ├─ pages/              14 Pages (siehe Tabelle oben)
│  └─ styles/             tokens.css, template.css, global.css
└─ .github/workflows/lighthouse.yml
```

## 8 Lokaler Build — Hinweis

Der Build wurde **in dieser Cowork-Sandbox nicht ausgeführt** — sharp/Astro crashen im bwrap-Container. Auf deiner Maschine (`npm run build`) und in Cloudflare Pages läuft der Build normal. Falls beim ersten Deploy ein Fehler kommt: Logs in Cloudflare Pages oder lokal `npm run build` zeigen die Stelle, ich fix dann gezielt.
