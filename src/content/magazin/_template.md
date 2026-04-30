---
# Pflichtfelder
title: "Vollständiger SEO-Titel des Artikels (60–110 Zeichen ideal)"
description: "Meta-Description, 50–160 Zeichen. Erscheint in Google-Snippets und auf Karten-Teasern."
pubDate: 2026-04-30
author: "monica"
category: "Wellness und Spa"   # erlaubt: Hautwissen | Kryotherapie | Wellness und Spa | Inner Source | Longevity | DNA Skin | Studio-Einblick
heroImage: "/images/rubedo-suite-hero.webp"
heroImageAlt: "Beschreibung des Hero-Bildes für Screenreader"

# Optional, aber empfohlen
excerpt: "Kurzer Lead-Text für Magazin-Karten. Wenn leer, wird description verwendet."
updatedDate: 2026-04-30
tags:
  - longevity
  - hautpflege
  - minden
readingTime: 8        # in Minuten — wenn leer, wird automatisch geschätzt
featured: false       # true = landet im Hero-Slot
draft: true           # true = vom Build ausgeschlossen — vor Publikation auf false stellen

# Optional: Custom Inhaltsverzeichnis (sonst aus h2 erzeugt)
toc:
  - id: einleitung
    label: Einleitung
  - id: methoden
    label: Methoden im Studio

# Optional: FAQ-Block (wird zu FAQPage-Schema und am Ende gerendert)
faq:
  - question: "Beispiel-Frage 1?"
    answer: "Antwort 1 in vollständigen Sätzen, ohne HTML."
  - question: "Beispiel-Frage 2?"
    answer: "Antwort 2 mit allen relevanten Details."

# Optional: weiterführende Artikel (Slugs ohne Pfad)
related:
  - kryotherapie-minden

# Optional: kanonische Quelle, falls andernorts zuerst erschienen
# canonical: "https://example.com/original"
---

> **Lead-Absatz** — der erste Absatz nach dem Frontmatter wird als großes Lead gerendert. Hier landet die Kernbotschaft in 1–2 Sätzen.

## Erste Zwischenüberschrift {#einleitung}

Fließtext mit voller Markdown-Syntax. Nutze IDs auf den Headings (`{#mein-anker}`), wenn du sie im `toc:`-Frontmatter referenzierst.

### Listen, Bilder und Pull-Quotes

- Aufzählungspunkt eins
- Aufzählungspunkt zwei

![Beschreibung](/images/example.webp)

> **Pull-Quote** — alternativ als Blockquote markiert. Wird visuell hervorgehoben.
>
> — *Monica Galletti*

## Zweite Zwischenüberschrift {#methoden}

Hier kommt der nächste Hauptteil. Nutze maximal H2 + H3 — H4 wird im TOC nicht angezeigt.

## Fazit {#fazit}

Schluss-Absatz mit klarer Handlungsempfehlung oder Reflexion.
