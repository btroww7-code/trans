import { Injectable } from '@nestjs/common';
import axios from 'axios';
import Redis from 'ioredis';

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
const redis = new Redis(process.env.REDIS_URL);

@Injectable()
export class GeocodingService {
  async geocodeAddress(address: string) {
    const cacheKey = `geocode:${address}`;
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_TOKEN}&limit=1`;
    const res = await axios.get(url);
    const feature = res.data.features[0];
    if (!feature) return null;

    const result = {
      lat: feature.center[1],
      lng: feature.center[0],
      formatted: feature.place_name,
    };
    await redis.set(cacheKey, JSON.stringify(result), 'EX', 30 * 24 * 60 * 60);
    return result;
  }

  calculateDistance(point1: { lat: number; lng: number }, point2: { lat: number; lng: number }) {
    const toRad = (v: number) => (v * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(point2.lat - point1.lat);
    const dLon = toRad(point2.lng - point1.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(point1.lat)) *
        Math.cos(toRad(point2.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
