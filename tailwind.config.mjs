/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'rb-gold-900': '#6F5421',
        'rb-gold-700': '#97783A',
        'rb-gold-500': '#B79557',
        'rb-gold-300': '#D7BD86',
        'rb-gold-100': '#F2E8D2',
        'rb-gold-50': '#FAF5EA',
        'rb-ink-900': '#1A1614',
        'rb-ink-700': '#3A332C',
        'rb-ink-500': '#6B6055',
        'rb-ink-300': '#B5ADA2',
        'rb-ink-100': '#E8E2D6',
        'rb-paper': '#FFFFFF',
        'rb-cream': '#FBF8F1',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Times New Roman', 'serif'],
        body: ['Outfit', 'Helvetica Neue', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
