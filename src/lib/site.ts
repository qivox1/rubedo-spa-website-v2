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

  // Hauptnavigation — `children` optional für Untermenüs (zweite Ebene).
  // Wird auf Mobile als Accordion gerendert, auf Desktop könnte später ein Mega-Menü folgen.
  nav: [
    {
      label: 'Philosophie',
      href: '/philosophie/',
      children: [
        { label: 'Philosophie & drei Säulen', href: '/philosophie/', description: 'Was Rubedo ist — und was nicht.' },
        { label: 'Longevity-Studio Minden', href: '/longevity-studio-minden/', description: 'Studio, Mission, Werte und Standort in der Marienstraße.' },
      ],
    },
    {
      label: 'DNA Skin',
      href: '/dna-skin-intelligence/',
      children: [
        { label: 'DNA Skin Intelligence', href: '/dna-skin-intelligence/', description: 'Personalisierte Hautpflege auf Basis von 20 Beauty-Genen.' },
      ],
    },
    {
      label: 'Kryo Vital',
      href: '/kryo-vital/',
      children: [
        { label: 'Kryo Vital · Übersicht', href: '/kryo-vital/', description: 'Drei Minuten kontrollierter Kältereiz für Vitalität.' },
        { label: 'Ganzkörper-Kryotherapie', href: '/kryo-vital/ganzkoerper/', description: 'Drei Minuten in der Kryo-Suite bei minus 110 °C.' },
        { label: 'Körperformung · Druckwellen', href: '/kryo-vital/koerperformung/', description: 'Rhythmische Druckwellen-Anwendung für Beine, Bauch und Arme.' },
        { label: 'Body Slimming Wrap', href: '/kryo-vital/koerperformung/wrap/', description: 'Wickel-Anwendung mit pflegenden Wirkstoffen — drei Linien.' },
        { label: 'Body Slimming Bandage', href: '/kryo-vital/koerperformung/bandage/', description: 'Wirkstoff-Bandagen für leichtere Beine — fünf Linien.' },
      ],
    },
    {
      label: 'Inner Source',
      href: '/inner-source/',
      children: [
        { label: 'Inner Source · Übersicht', href: '/inner-source/', description: 'Atem, Berührung und Stille als Tiefenarbeit.' },
        { label: 'Rubedo Suite (Massagen)', href: '/inner-source/rubedo-suite/', description: 'Abhyanga, Hot Stone, Hot Bambu, Balinesisch.' },
        { label: 'Atem-Ritual', href: '/inner-source/atem-ritual/', description: 'Geführte 60-Minuten-Sitzung — neurosomatische Atemarbeit.' },
      ],
    },
    { label: 'Monica', href: '/ueber-monica/' },
    {
      label: 'Magazin',
      href: '/magazin/',
      children: [
        { label: 'Alle Beiträge', href: '/magazin/' },
        { label: 'Wellness & Spa', href: '/magazin/kategorie/wellness-und-spa/' },
        { label: 'Kryotherapie', href: '/magazin/kategorie/kryotherapie/' },
      ],
    },
    { label: 'Kontakt', href: '/kontakt/' },
  ],
} as const;

export type Site = typeof site;
export type NavItem = (typeof site.nav)[number];
export type NavChild = NavItem extends { children: infer C } ? (C extends readonly (infer X)[] ? X : never) : never;
