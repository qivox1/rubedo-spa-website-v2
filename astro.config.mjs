// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// Site-URL — bis Custom-Domain `rubedo-spa.de` aktiv ist, läuft die Seite
// auf der Cloudflare-Pages-Preview-URL. Damit Canonicals/OG/Sitemap mit der
// real ausgelieferten Host-Adresse matchen, bleibt diese hier auf pages.dev.
// Beim Domain-Switch: SITE_URL env-var setzen ODER hier hardcoden.
const SITE_URL = process.env.SITE_URL || 'https://rubedo-spa-website.pages.dev';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
    assets: '_assets',
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
  image: {
    // sharp ist Default in Production (CF Pages / lokal). In dieser Sandbox
    // crashed sharp im bwrap, daher hier per ENV abschaltbar.
    service: process.env.ASTRO_IMAGE_NOOP
      ? { entrypoint: 'astro/assets/services/noop' }
      : { entrypoint: 'astro/assets/services/sharp' },
  },
  integrations: [
    tailwind({
      // Wir verwalten unsere globale CSS in src/styles/global.css
      applyBaseStyles: false,
    }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      i18n: {
        defaultLocale: 'de',
        locales: { de: 'de-DE' },
      },
    }),
  ],
  compressHTML: true,
});
