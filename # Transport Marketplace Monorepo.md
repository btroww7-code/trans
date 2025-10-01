# Transport Marketplace Monorepo

## Struktura
- `apps/web` - Next.js frontend
- `apps/api` - NestJS backend
- `packages/ui` - Wspólne komponenty UI
- `packages/database` - Prisma schema & migracje
- `packages/types` - Wspólne typy TypeScript
- `packages/config` - Wspólne konfiguracje

## Setup

1. Instalacja zależności:
   ```
   npm install
   ```

2. Uruchomienie środowiska developerskiego:
   ```
   docker-compose up -d
   ```

3. Migracje bazy danych:
   ```
   cd packages/database
   npx prisma migrate dev
   ```

4. Start backend:
   ```
   cd apps/api
   npm run start:dev
   ```

5. Start frontend:
   ```
   cd apps/web
   npm run dev
   ```

## Wymagania
- Node.js >= 18
- Docker & Docker Compose

