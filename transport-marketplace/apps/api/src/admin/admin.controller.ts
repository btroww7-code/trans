import { Controller, Get, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { AdminGuard } from './admin.guard';
import { PrismaService } from '../prisma/prisma.service';

@UseGuards(AdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private prisma: PrismaService) {}

  @Get('stats')
  async getStats() {
    const users = await this.prisma.user.count();
    const listings = await this.prisma.listing.count();
    const contracts = await this.prisma.contract.count();
    const revenue = await this.prisma.payment.aggregate({ _sum: { amount: true } });
    return { users, listings, contracts, revenue: revenue._sum.amount || 0 };
  }

  @Get('users')
  async getUsers(@Query() query) {
    // filters: role, status, search, pagination
    return this.prisma.user.findMany({
      where: {
        role: query.role,
        status: query.status,
        email: query.search ? { contains: query.search } : undefined,
      },
      skip: (query.page - 1) * (query.size || 20),
      take: query.size || 20,
      orderBy: { created_at: 'desc' },
    });
  }

  @Patch('users/:id/suspend')
  async suspendUser(@Param('id') id: string) {
    return this.prisma.user.update({ where: { id }, data: { status: 'SUSPENDED' } });
  }

  @Patch('users/:id/unsuspend')
  async unsuspendUser(@Param('id') id: string) {
    return this.prisma.user.update({ where: { id }, data: { status: 'ACTIVE' } });
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.prisma.user.update({ where: { id }, data: { status: 'DELETED' } });
  }

  @Get('listings')
  async getListings(@Query() query) {
    // moderacja, paginacja
    return this.prisma.listing.findMany({
      skip: (query.page - 1) * (query.size || 20),
      take: query.size || 20,
      orderBy: { created_at: 'desc' },
    });
  }

  @Delete('listings/:id')
  async deleteListing(@Param('id') id: string) {
    return this.prisma.listing.delete({ where: { id } });
  }

  @Get('verifications')
  async getVerifications() {
    return this.prisma.profile.findMany({ where: { verified: false } });
  }

  @Patch('verifications/:id/approve')
  async approveVerification(@Param('id') id: string) {
    return this.prisma.profile.update({ where: { id }, data: { verified: true } });
  }

  @Patch('verifications/:id/reject')
  async rejectVerification(@Param('id') id: string, @Body() dto) {
    // Możesz dodać pole reject_reason do profilu jeśli chcesz
    return this.prisma.profile.update({ where: { id }, data: { verified: false } });
  }
}
