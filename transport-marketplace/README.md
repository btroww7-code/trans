# Transport Marketplace Monorepo

## Setup

1. Install dependencies:
   ```
   pnpm install
   ```

2. Start Docker services:
   ```
   docker-compose up -d
   ```

3. Generate Prisma client:
   ```
   pnpm --filter database prisma generate
   ```

4. Run migrations:
   ```
   pnpm --filter database prisma migrate dev
   ```

5. Start backend:
   ```
   pnpm --filter api start:dev
   ```

6. Start frontend:
   ```
   pnpm --filter web dev
   ```

## Structure

- `apps/web` - Next.js frontend
- `apps/api` - NestJS backend
- `packages/ui` - Shared UI components
- `packages/database` - Prisma schema & migrations
- `packages/types` - Shared TypeScript types
- `packages/config` - Shared configs
