# Multi-stage build for NXOLand Backend - Optimized
FROM node:20-alpine AS builder

WORKDIR /app

# Install system dependencies and update npm to latest
RUN apk add --no-cache openssl python3 make g++ && npm install -g npm@latest

# Copy package files first (for better layer caching)
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies including dev dependencies for Prisma
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client and build application
RUN npx prisma generate && npm run build

# Production stage - minimal footprint
FROM node:20-alpine AS production

WORKDIR /app

# Install runtime dependencies + minimal build tools for native modules (bcrypt, etc.)
# Most packages have prebuilt binaries, but we keep tools just in case
RUN apk add --no-cache openssl dumb-init python3 make g++

# Create app user
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001

# Copy package files
COPY --from=builder /app/package*.json ./

# Copy Prisma schema
COPY --from=builder /app/prisma ./prisma

# Install ONLY production dependencies (faster than copying all node_modules)
# Native modules like bcrypt are already compiled in builder, so we can reuse them
RUN npm ci --omit=dev --prefer-offline --no-audit && \
    rm -rf /tmp/* /var/cache/apk/*

# Copy generated Prisma client from builder (avoids regenerating)
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

# Copy built application
COPY --from=builder /app/dist ./dist

# Create logs directory and set permissions
RUN mkdir -p logs && chown -R nestjs:nodejs /app

USER nestjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node --version

# Start the application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]