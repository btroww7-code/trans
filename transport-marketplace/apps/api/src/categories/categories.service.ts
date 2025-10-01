import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getActiveCategoriesWithCount() {
    return this.prisma.category.findMany({
      where: { active: true },
      orderBy: { order_index: 'asc' },
      include: {
        _count: {
          select: { listings: { where: { status: 'ACTIVE' } } }
        }
      }
    });
  }
}
