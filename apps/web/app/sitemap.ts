import { NextResponse } from 'next/server';

export async function GET() {
  // Pobierz listingi, kategorie, statyczne strony z API
  const listings = await fetch('https://yourdomain.com/api/listings').then(res => res.json());
  const categories = await fetch('https://yourdomain.com/api/categories').then(res => res.json());

  let urls = [
    { loc: 'https://yourdomain.com/', priority: 1.0 },
    { loc: 'https://yourdomain.com/faq', priority: 0.5 },
    { loc: 'https://yourdomain.com/terms', priority: 0.5 },
    { loc: 'https://yourdomain.com/privacy', priority: 0.5 },
  ];

  urls = urls.concat(
    listings.map(l => ({ loc: `https://yourdomain.com/listings/${l.slug}`, priority: 0.8 })),
    categories.map(c => ({ loc: `https://yourdomain.com/categories/${c.slug}`, priority: 0.6 }))
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u => `<url><loc>${u.loc}</loc><priority>${u.priority}</priority></url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
