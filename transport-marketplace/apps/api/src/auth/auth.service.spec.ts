import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeEach(() => {
    prisma = new PrismaService();
    jwt = new JwtService({});
    service = new AuthService(prisma, jwt);
  });

  it('should register a new user', async () => {
    // ...mock prisma, test register logic...
  });

  it('should login with correct credentials', async () => {
    // ...mock prisma, test login logic...
  });

  it('should throw on invalid login', async () => {
    // ...test invalid login...
  });

  // ...more tests for verify, etc...
});
