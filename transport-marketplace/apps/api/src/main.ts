import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    '/auth/login',
    rateLimit({ windowMs: 15 * 60 * 1000, max: 5, standardHeaders: true, legacyHeaders: false }),
  );
  app.use(
    '/auth/register',
    rateLimit({ windowMs: 60 * 60 * 1000, max: 3, standardHeaders: true, legacyHeaders: false }),
  );
  app.use(
    '/uploads',
    rateLimit({ windowMs: 5 * 60 * 1000, max: 10, standardHeaders: true, legacyHeaders: false }),
  );
  app.use(
    '/api',
    rateLimit({ windowMs: 60 * 1000, max: 100, standardHeaders: true, legacyHeaders: false }),
  );

  await app.listen(3001);
}
bootstrap();
