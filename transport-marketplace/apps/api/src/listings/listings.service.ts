import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GeocodingService } from '../geocoding/geocoding.service';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class ListingsService {
  constructor(
    private prisma: PrismaService,
    private geocoding: GeocodingService,
    private cache: CacheService,
  ) {}

  async createDraft(dto) {
    // Geocode addresses
    const fromGeo = await this.geocoding.geocodeAddress(dto.from_address_json.formatted);
    const toGeo = await this.geocoding.geocodeAddress(dto.to_address_json.formatted);
    const distance_km = this.geocoding.calculateDistance(fromGeo, toGeo);

    return this.prisma.listing.create({
      data: {
        ...dto,
        from_lat: fromGeo.lat,
        from_lng: fromGeo.lng,
        to_lat: toGeo.lat,
        to_lng: toGeo.lng,
        distance_km,
      },
    });
  }

  async updateDraft(id: string, dto) {
    const updatedListing = await this.prisma.listing.update({
      where: { id },
      data: dto,
    });
    await this.cache.del(`listing:${id}`); // Invalidate cache
    return updatedListing;
  }

  async publish(id: string) {
    // ...change status to OPEN, set published_at...
  }

  async getById(id: string) {
    const cacheKey = `listing:${id}`;
    const cachedListing = await this.cache.get(cacheKey);
    if (cachedListing) {
      return cachedListing;
    }

    const listing = await this.prisma.listing.findUnique({ where: { id } });
    if (listing) {
      await this.cache.set(cacheKey, listing, 300); // Cache for 5 minutes
    }
    return listing;
  }

  async list({ category, from_city, to_city, sort, order, page, size }) {
    const where: any = { status: 'OPEN' };
    if (category) {
      const ids = category.split(',').map(Number);
      where.category_id = { in: ids };
    }
    if (from_city) {
      where.from_address_json = { path: ['city'], equals: from_city };
    }
    if (to_city) {
      where.to_address_json = { path: ['city'], equals: to_city };
    }
    // ...add more filters as needed...

    const total = await this.prisma.listing.count({ where });
    const data = await this.prisma.listing.findMany({
      where,
      orderBy: { [sort]: order },
      skip: (page - 1) * size,
      take: size,
      include: {
        category: true,
        // offers_count: custom count if offers implemented
      },
    });
    return { data, total, page, size };
  }
}
