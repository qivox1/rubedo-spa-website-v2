/**
 * Rubedo Spa — zentrale Site-Konstanten.
 * Hier ÄNDERN, nicht in Komponenten verstreut.
 */

export const site = {
  name: 'Rubedo Spa',
  legalName: 'Rubedo Spa · Monica Galletti',
  claim: 'Smart Beauty for Conscious Humans',
  tagline: 'Personalisierte Schönheit auf Basis deiner Epigenetik — für Menschen, die bewusst entscheiden.',

  // Wird zur Build-Zeit aus astro.config.mjs (process.env.SITE_URL || pages.dev) ausgelesen
  // — diese Konstante hier nur als Fallback für JSON-LD/Component-Code.
  url: 'https://rubedo-spa-website.pages.dev',
  defaultLocale: 'de',
  locales: ['de'] as const,

  contact: {
    email: 'info@rubedo-spa.de',
    /** Display-Format identisch zum href: in internationaler E.164-Notation,
     *  damit Squirrel-Audit-Heuristik und Screenreader denselben String sehen. */
    phoneDisplay: '+49 571 78343423',
    phoneE164: '+4957178343423',
  },

  address: {
    street: 'Marienstraße 58',
    postalCode: '32427',
    city: 'Minden',
    country: 'DE',
    countryName: 'Deutschland',
    latitude: 52.2891,
    longitude: 8.9152,
  },

  hours: [
    // weekday: 1=Mon … 7=Sun (ISO)
    { days: 'Mo–Fr', open: '09:00', close: '19:00' },
  ],

  schemaOpeningHours: ['Mo-Fr 09:00-19:00'],

  // Social-Profile — URLs ergänzt der Kunde später; leere Strings = Icon ausgeblendet
  social: {
    instagram: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    tiktok: '',
  },

  // Tracking
  tracking: {
    ga4: 'G-41DDXKN7XL',
    gtm: 'GT-P3N6R5J2',
  },

  // Booking
  booking: {
    // Google Calendar Appointment Schedule — Embed-URL ergänzt sobald
    // Workspace-Account aktiv. Kontakt-Mail dient als Fallback.
    googleAccount: 'rubedospa@gmail.com',
    embedUrl: '', // z.B. https://calendar.google.com/calendar/appointments/schedules/...
  },

  // Hauptnavigation — Top-Level reduziert auf 5 Items für mehr Premium-Spacing.
  // Drei Säulen sind unter "Anwendungen" zu einem Mega-Menu mit `groups` konsolidiert.
  // Konvention `children`: nur Einträge, deren URL sich vom Parent unterscheidet.
  // Konvention `groups`: pro Säule eine Spalte mit headingHref (Hub-Link) + items.
  // Konvention `activePaths`: optionale, exklusive Liste von URL-Präfixen für
  //   den Active-State. Wenn gesetzt, ersetzt sie das default startsWith(href)-
  //   Matching. Notwendig, wenn (a) zwei Items denselben href teilen
  //   (Philosophie + Anwendungen → /philosophie/) oder (b) ein Item für URLs
  //   aktiv sein soll, die nicht unter seinem href liegen (Anwendungen ist
  //   Hub für /dna-skin-intelligence/, /kryo-vital/, /inner-source/).
  nav: [
    {
      label: 'Philosophie',
      href: '/philosophie/',
      activePaths: ['/philosophie/', '/longevity-studio-minden/'],
      children: [
        { label: 'Longevity-Studio Minden', href: '/longevity-studio-minden/', description: 'Studio, Mission, Werte und Standort in der Marienstraße.' },
      ],
    },
    {
      label: 'Anwendungen',
      href: '/philosophie/',
      activePaths: ['/dna-skin-intelligence/', '/kryo-vital/', '/inner-source/'],
      groups: [
        {
          heading: 'DNA Skin Intelligence',
          headingHref: '/dna-skin-intelligence/',
          headingDesc: 'Personalisierte Hautpflege auf Basis von 20 Beauty-Genen.',
          items: [],
        },
        {
          heading: 'Kryo Vital',
          headingHref: '/kryo-vital/',
          headingDesc: 'Drei Minuten kontrollierter Kältereiz für Vitalität.',
          items: [
            { label: 'Ganzkörper-Kryotherapie', href: '/kryo-vital/ganzkoerper/' },
            { label: 'Kryo-Facial', href: '/kryo-vital/kryo-facial/' },
            { label: 'Körperformung · Druckwellen', href: '/kryo-vital/koerperformung/' },
            { label: 'Body Slimming Wrap', href: '/kryo-vital/koerperformung/wrap/' },
            { label: 'Body Slimming Bandage', href: '/kryo-vital/koerperformung/bandage/' },
          ],
        },
        {
          heading: 'Inner Source Rituals',
          headingHref: '/inner-source/',
          headingDesc: 'Atem, Berührung und Stille als Tiefenarbeit.',
          items: [
            { label: 'Rubedo Suite (Massagen)', href: '/inner-source/rubedo-suite/' },
            { label: 'Atem-Ritual', href: '/inner-source/atem-ritual/' },
          ],
        },
      ],
    },
    { label: 'Leistungen', href: '/leistungen/' },
    {
      label: 'Magazin',
      href: '/magazin/',
      children: [
        { label: 'Longevity', href: '/magazin/kategorie/longevity/', description: 'Brand-übergreifende Positionierung & Wellness-Stil.' },
        { label: 'Kryotherapie', href: '/magazin/kategorie/kryotherapie/', description: 'Hintergrund-Beiträge zu Kälteanwendungen.' },
      ],
    },
    { label: 'Monica', href: '/ueber-monica/' },
    { label: 'Kontakt', href: '/kontakt/' },
  ],
} as const;

export type Site = typeof site;
export type NavItem = (typeof site.nav)[number];
export type NavChild = NavItem extends { children: infer C } ? (C extends readonly (infer X)[] ? X : never) : never;

