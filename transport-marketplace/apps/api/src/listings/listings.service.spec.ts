import { ListingsService } from './listings.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ListingsService', () => {
  let service: ListingsService;
  let prisma: PrismaService;

  beforeEach(() => {
    prisma = new PrismaService();
    service = new ListingsService(prisma, {} as any);
  });

  it('should create a listing', async () => {
    // ...mock prisma, test createDraft...
  });

  it('should update a listing', async () => {
    // ...mock prisma, test updateDraft...
  });

  it('should search listings', async () => {
    // ...mock prisma, test list/search...
  });
});
