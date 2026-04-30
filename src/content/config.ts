/**
 * Astro Content Collections — typisierte Markdown-Inhalte mit YAML-Frontmatter.
 * https://docs.astro.build/en/guides/content-collections/
 *
 * Zwei Collections:
 *   1. authors  — wiederverwendbare Autor-Daten (Monica + ggf. Gastbeiträge)
 *   2. magazin  — alle Magazin-Artikel
 *
 * Frontmatter-Schemas werden hier zentral validiert. Wer einen Artikel
 * schreibt, kann sich auf vollständige TS-Typen verlassen.
 */

import { defineCollection, reference, z } from 'astro:content';

const authors = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    /** Pfad relativ zu /public, z.B. "/images/monica-portrait.png" */
    avatar: z.string(),
    /** sameAs-Links für Person-Schema */
    sameAs: z.array(z.string().url()).default([]),
    /** Optional: vollständige Vita-URL (intern oder extern) */
    page: z.string().optional(),
  }),
});

const magazin = defineCollection({
  type: 'content',
  schema: z.object({
    /** SEO-Titel (auch als <h1> verwendbar) */
    title: z.string().min(10).max(120),
    /** Meta-Description, 50–160 Zeichen */
    description: z.string().min(50).max(180),
    /** Optional: Lead/Excerpt für Karten-Teaser. Falls leer, wird description genommen. */
    excerpt: z.string().max(280).optional(),

    /** ISO-Datum (YYYY-MM-DD) — Erstveröffentlichung */
    pubDate: z.coerce.date(),
    /** ISO-Datum — letzte inhaltliche Aktualisierung */
    updatedDate: z.coerce.date().optional(),

    /** Autor-Slug — referenziert src/content/authors/<slug>.json */
    author: reference('authors'),

    /** Kategorie als kontrolliertes Vokabular — eine pro Artikel */
    category: z.enum([
      'Hautwissen',
      'Kryotherapie',
      'Wellness und Spa',
      'Inner Source',
      'Longevity',
      'DNA Skin',
      'Studio-Einblick',
    ]),

    /** Frei wählbare Tags — Long-Tail-SEO */
    tags: z.array(z.string()).default([]),

    /** Hero-Bild — Pfad relativ zu /public, z.B. "/images/hero.webp" */
    heroImage: z.string(),
    heroImageAlt: z.string(),

    /** Optional: anderes Bild für Open-Graph/Social. Default = heroImage */
    ogImage: z.string().optional(),

    /** Lesezeit in Minuten (manuell überschreibbar — sonst auto-geschätzt) */
    readingTime: z.number().int().positive().optional(),

    /** Hervorgehobener Artikel — landet im Magazin-Hero */
    featured: z.boolean().default(false),

    /** Im Build ausblenden (z.B. Entwurfsfassung) */
    draft: z.boolean().default(false),

    /** Custom Table-of-Contents — wenn leer, wird automatisch aus h2/h3 erzeugt */
    toc: z
      .array(
        z.object({
          id: z.string(),
          label: z.string(),
        })
      )
      .optional(),

    /** FAQ-Items — werden zu FAQPage-Schema und am Ende des Artikels gerendert */
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .optional(),

    /** Manuell verknüpfte Folge-Artikel (Slugs ohne führenden Pfad) */
    related: z.array(z.string()).optional(),

    /** Canonical-URL falls Beitrag andernorts zuerst erschienen ist */
    canonical: z.string().url().optional(),

    /** Optional: H1, falls abweichend vom Title (sonst = title) */
    headline: z.string().optional(),
  }),
});

export const collections = { authors, magazin };
