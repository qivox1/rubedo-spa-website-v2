/**
 * Rubedo Spa — zentrale Site-Konstanten.
 * Hier ÄNDERN, nicht in Komponenten verstreut.
 */

export const site = {
  name: 'Rubedo Spa',
  legalName: 'Rubedo Spa · Monica Galletti',
  claim: 'Smart Beauty for Conscious Humans',
  tagline: 'Personalisierte Schönheit auf Basis deiner Epigenetik — für Menschen, die bewusst entscheiden.',

  url: 'https://rubedo-spa.de',
  defaultLocale: 'de',
  locales: ['de'] as const,

  contact: {
    email: 'info@rubedo-spa.de',
    phoneDisplay: '0571 78343423',
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

  // Hauptnavigation
  nav: [
    { label: 'Philosophie', href: '/philosophie/' },
    { label: 'DNA Skin', href: '/dna-skin-intelligence/' },
    { label: 'Kryo Vital', href: '/kryo-vital/' },
    { label: 'Inner Source', href: '/inner-source/' },
    { label: 'Monica', href: '/ueber-monica/' },
    { label: 'Magazin', href: '/magazin/' },
  ],
} as const;

export type Site = typeof site;
