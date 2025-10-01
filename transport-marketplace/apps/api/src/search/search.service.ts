import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class SearchService {
  private es: Client;

  constructor() {
    this.es = new Client({ node: 'http://localhost:9200' });
    this.initIndex();
  }

  async initIndex() {
    const exists = await this.es.indices.exists({ index: 'listings' });
    if (!exists) {
      await this.es.indices.create({
        index: 'listings',
        body: {
          mappings: {
            properties: {
              title: { type: 'text' },
              description: { type: 'text' },
              category: { type: 'keyword' },
              from_location: { type: 'geo_point' },
              to_location: { type: 'geo_point' },
              pickup_date_from: { type: 'date' },
              delivery_date_to: { type: 'date' },
              weight_kg: { type: 'float' },
              owner_verified: { type: 'boolean' },
              created_at: { type: 'date' }
            }
          }
        }
      });
    }
  }

  async indexListing(listing) {
    await this.es.index({
      index: 'listings',
      id: listing.id,
      document: {
        title: listing.title,
        description: listing.description,
        category: listing.category.slug,
        from_location: { lat: listing.from_lat, lon: listing.from_lng },
        to_location: { lat: listing.to_lat, lon: listing.to_lng },
        pickup_date_from: listing.pickup_date_from,
        delivery_date_to: listing.delivery_date_to,
        weight_kg: listing.weight_kg,
        owner_verified: listing.owner?.profile?.verified,
        created_at: listing.created_at
      }
    });
  }

  async updateListing(listing) {
    await this.indexListing(listing);
  }

  async deleteListing(id: string) {
    await this.es.delete({ index: 'listings', id });
  }

  async searchListings(params) {
    const {
      q, category, from_location, radius, to_location, pickup_date_from, delivery_date_to, weight_min, weight_max, sort, order
    } = params;

    const must: any[] = [];
    const filter: any[] = [];

    if (q) must.push({ match: { title: q } });
    if (category) filter.push({ term: { category } });
    if (from_location && radius) {
      filter.push({
        geo_distance: {
          distance: `${radius}km`,
          from_location: from_location
        }
      });
    }
    if (to_location) filter.push({ geo_distance: { distance: '10km', to_location: to_location } });
    if (pickup_date_from || delivery_date_to) {
      filter.push({
        range: {
          pickup_date_from: { gte: pickup_date_from },
          delivery_date_to: { lte: delivery_date_to }
        }
      });
    }
    if (weight_min || weight_max) {
      filter.push({
        range: {
          weight_kg: { gte: weight_min, lte: weight_max }
        }
      });
    }

    const body: any = {
      query: {
        bool: {
          must,
          filter
        }
      },
      sort: [{ [sort || 'created_at']: { order: order || 'desc' } }]
    };

    const result = await this.es.search({ index: 'listings', body });
    return {
      total: result.hits.total.value,
      data: result.hits.hits.map(hit => hit._source)
    };
  }
}
