import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto) {
    return this.prisma.notification.create({ data: dto });
  }

  async list(user_id: string, unread: boolean) {
    return this.prisma.notification.findMany({
      where: {
        user_id,
        ...(unread ? { read_at: null } : {}),
      },
      orderBy: { created_at: 'desc' },
      take: 10,
    });
  }

  async markRead(id: string) {
    return this.prisma.notification.update({
      where: { id },
      data: { read_at: new Date() },
    });
  }

  async markAllRead(user_id: string) {
    return this.prisma.notification.updateMany({
      where: { user_id, read_at: null },
      data: { read_at: new Date() },
    });
  }
}
