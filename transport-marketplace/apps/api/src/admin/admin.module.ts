import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminGuard } from './admin.guard';

@Module({
  imports: [PrismaModule],
  controllers: [AdminController],
  providers: [AdminGuard],
})
export class AdminModule {}
