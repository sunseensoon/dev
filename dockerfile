#Install dependencies
FROM node:24-alpine AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

#Build application
FROM node:24-alpine AS builder
WORKDIR /app

#Required by prisma generate at build time — not used for actual DB connection
ENV DATABASE_URL="postgresql://dummy:dummy@dummy/dummy"
RUN apk add --no-cache openssl
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm exec prisma generate
RUN pnpm build

#Production runner
FROM node:24-alpine AS runner
WORKDIR /app
RUN apk add --no-cache openssl
RUN corepack enable && corepack prepare pnpm@latest --activate
ENV NODE_ENV=production

#Standalone output sudah include semua yang dibutuhkan
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Prisma butuh schema dan migrations saat runtime
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.pnpm ./node_modules/.pnpm
COPY --from=builder /app/node_modules/.modules.yaml ./node_modules/.modules.yaml
COPY --from=builder /app/node_modules/prisma ./node_modules/prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]