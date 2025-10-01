import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  private readonly redis: Redis;

  constructor() {
    this.redis = new Redis(process.env.REDIS_URL);
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);
    return value ? JSON.parse(value) : null;
  }

  async set(key: string, value: any, ttlInSeconds: number): Promise<void> {
    await this.redis.set(key, JSON.stringify(value), 'EX', ttlInSeconds);
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
