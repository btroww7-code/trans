import { OffersService } from './offers.service';
import { PrismaService } from '../prisma/prisma.service';

describe('OffersService', () => {
  let service: OffersService;
  let prisma: PrismaService;

  beforeEach(() => {
    prisma = new PrismaService();
    service = new OffersService(prisma);
  });

  it('should create an offer', async () => {
    // ...mock prisma, test create...
  });

  it('should accept an offer', async () => {
    // ...mock prisma, test accept...
  });

  it('should reject an offer', async () => {
    // ...mock prisma, test reject...
  });
});
