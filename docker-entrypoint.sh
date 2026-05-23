#!/bin/sh
set -e

if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL is not set"
  exit 1
fi

echo "Waiting for database..."
until pnpm exec prisma db execute --stdin <<< "SELECT 1" > /dev/null 2>&1; do
  echo "Database not ready, retrying in 2s..."
  sleep 2
done

echo "Running database migrations..."
pnpm exec prisma migrate deploy

echo "Starting application..."
exec node server.js