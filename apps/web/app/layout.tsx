import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminGuard } from '../admin/admin.guard';

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule
  ],
  controllers: [AuthController],
  providers: [AuthService, AdminGuard],
  exports: [AdminGuard],
})
export class AuthModule {}

export const metadata = {
  title: {
    default: 'Transport Marketplace',
    template: '%s | Transport Marketplace',
  },
  description: 'Marketplace transportowy – zleć przewóz, znajdź przewoźnika, porównaj oferty.',
  openGraph: {
    title: 'Transport Marketplace',
    description: 'Marketplace transportowy – zleć przewóz, znajdź przewoźnika, porównaj oferty.',
    url: 'https://yourdomain.com',
    siteName: 'Transport Marketplace',
    images: [
      {
        url: 'https://yourdomain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Transport Marketplace',
      },
    ],
    locale: 'pl_PL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transport Marketplace',
    description: 'Marketplace transportowy – zleć przewóz, znajdź przewoźnika, porównaj oferty.',
    site: '@yourtwitter',
    images: ['https://yourdomain.com/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://yourdomain.com',
    languages: {
      'pl': 'https://yourdomain.com',
      'en': 'https://yourdomain.com/en',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};