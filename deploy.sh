#!/bin/bash
set -e

echo "Building images..."
docker-compose -f docker-compose.prod.yml build

echo "Pushing images to registry..."
docker-compose -f docker-compose.prod.yml push

echo "Deploying to server..."
ssh user@your-server "cd /path/to/app && docker-compose -f docker-compose.prod.yml down && docker-compose -f docker-compose.prod.yml pull && docker-compose -f docker-compose.prod.yml up -d"

echo "Running migrations..."
ssh user@your-server "docker-compose -f docker-compose.prod.yml exec api pnpm prisma migrate deploy"

echo "Health check..."
curl -f http://your-server/api/health || exit 1

echo "Deployment complete."
