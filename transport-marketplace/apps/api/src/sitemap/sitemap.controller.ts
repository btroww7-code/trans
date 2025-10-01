import { Controller, Get, Res } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('sitemap.xml')
export class SitemapController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getSitemap(@Res() res) {
    const listings = await this.prisma.listing.findMany({ where: { status: 'OPEN' }, select: { slug: true } });
    const categories = await this.prisma.category.findMany({ select: { slug: true } });

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

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  }
}
