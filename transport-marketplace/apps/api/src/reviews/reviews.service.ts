import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(dto) {
    // 1. Walidacje
    const contract = await this.prisma.contract.findUnique({ where: { id: dto.contract_id } });
    if (!contract || contract.status !== 'COMPLETED') throw new BadRequestException('Contract not completed');
    const completedAt = contract.completed_at;
    if (!completedAt || (new Date().getTime() - new Date(completedAt).getTime()) > 30 * 24 * 60 * 60 * 1000)
      throw new BadRequestException('Review window expired');
    if (![contract.client_id, contract.carrier_id].includes(dto.reviewer_id))
      throw new ForbiddenException('Not a contract participant');
    const existing = await this.prisma.review.findUnique({ where: { contract_id: dto.contract_id } });
    if (existing) throw new BadRequestException('Review already exists');

    // 2. Dodaj ocenę
    const review = await this.prisma.review.create({ data: dto });

    // 3. Przelicz rating_avg i rating_count
    const reviews = await this.prisma.review.findMany({ where: { reviewed_id: dto.reviewed_id } });
    const avg = reviews.reduce((sum, r) => sum + r.overall_rating, 0) / (reviews.length || 1);
    await this.prisma.profile.update({
      where: { user_id: dto.reviewed_id },
      data: { rating_avg: avg, rating_count: reviews.length }
    });

    // 4. Powiadomienie (do zaimplementowania)
    // await sendNotification(dto.reviewed_id, 'Otrzymałeś nową ocenę!');

    return review;
  }

  async list(user_id: string) {
    return this.prisma.review.findMany({
      where: { reviewed_id: user_id },
      orderBy: { created_at: 'desc' },
    });
  }

  async respond(id: string, response: string) {
    return this.prisma.review.update({
      where: { id },
      data: { response, response_at: new Date() }
    });
  }
}
