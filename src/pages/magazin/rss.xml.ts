/**
 * RSS-Feed für das Magazin.
 * Erreichbar unter /magazin/rss.xml — automatisch in <head> verlinkt.
 */
import { getCollection } from 'astro:content';
import { site } from '@/lib/site';

export async function GET() {
  const all = await getCollection('magazin', ({ data }) => !data.draft);
  const articles = all.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());

  const items = articles
    .map((a) => {
      const url = `${site.url}/magazin/${a.slug}/`;
      const pub = a.data.pubDate.toUTCString();
      return `<item>
  <title><![CDATA[${a.data.title}]]></title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <description><![CDATA[${a.data.excerpt ?? a.data.description}]]></description>
  <pubDate>${pub}</pubDate>
  <category>${a.data.category}</category>
</item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${site.name} — Magazin</title>
    <link>${site.url}/magazin/</link>
    <description>${site.tagline}</description>
    <language>de-DE</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
