import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OffersService {
  constructor(private prisma: PrismaService) {}

  async create(dto, user) {
    // 1. Validations
    if (user.role !== 'CARRIER' || !user.profile.verified) {
      throw new ForbiddenException('Only verified carriers can make offers.');
    }
    const listing = await this.prisma.listing.findUnique({ where: { id: dto.listing_id } });
    if (!listing || listing.status !== 'OPEN') {
      throw new BadRequestException('Listing is not open for offers.');
    }
    const existingOffer = await this.prisma.offer.findUnique({
      where: { listing_id_carrier_id: { listing_id: dto.listing_id, carrier_id: user.id } },
    });
    if (existingOffer) {
      throw new BadRequestException('You have already made an offer on this listing.');
    }
    if (dto.price <= 0) {
      throw new BadRequestException('Price must be positive.');
    }

    // 2. Create offer and conversation in a transaction
    return this.prisma.$transaction(async (tx) => {
      const offer = await tx.offer.create({
        data: {
          listing_id: dto.listing_id,
          carrier_id: user.id,
          price: dto.price,
          currency: dto.currency,
          message: dto.message,
          estimated_pickup_date: dto.estimated_pickup_date,
          estimated_delivery_date: dto.estimated_delivery_date,
        },
      });

      await tx.conversation.create({
        data: {
          listing_id: dto.listing_id,
          participant_1_id: listing.owner_id, // Client
          participant_2_id: user.id, // Carrier
          status: 'RESTRICTED',
        },
      });

      // TODO: Trigger NewOfferEmail and NewNotification jobs

      return offer;
    });
  }

  async list({ listing_id, carrier_id }) {
    // ...return offers by listing or carrier...
  }

  async getById(id: string) {
    // ...return offer details...
  }

  async accept(id: string) {
    // ...only owner, status -> ACCEPTED...
  }

  async reject(id: string) {
    // ...only owner, status -> REJECTED...
  }

  async withdraw(id: string) {
    // ...only carrier, status -> WITHDRAWN, only if PENDING...
  }
}
