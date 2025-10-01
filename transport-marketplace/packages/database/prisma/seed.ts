import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

const categories = [
  { name_pl: 'Meble', name_en: 'Furniture', slug: 'meble', icon: '🪑', order_index: 1 },
  { name_pl: 'Przeprowadzki', name_en: 'Moving', slug: 'przeprowadzki', icon: '🚚', order_index: 2 },
  { name_pl: 'Samochody', name_en: 'Cars', slug: 'samochody', icon: '🚗', order_index: 3 },
  { name_pl: 'Motocykle i skutery', name_en: 'Motorcycles & Scooters', slug: 'motocykle-skutery', icon: '🏍️', order_index: 4 },
  { name_pl: 'Palety', name_en: 'Pallets', slug: 'palety', icon: '📦', order_index: 5 },
  { name_pl: 'Paczki', name_en: 'Packages', slug: 'paczki', icon: '🎁', order_index: 6 },
  { name_pl: 'Ładunki', name_en: 'Cargo', slug: 'ladunki', icon: '🧱', order_index: 7 },
  { name_pl: 'Maszyny i sprzęt', name_en: 'Machines & Equipment', slug: 'maszyny-sprzet', icon: '🛠️', order_index: 8 },
  { name_pl: 'Zwierzęta', name_en: 'Animals', slug: 'zwierzeta', icon: '🐶', order_index: 9 },
];

async function main() {
  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: { ...cat, active: true },
    });
  }
}