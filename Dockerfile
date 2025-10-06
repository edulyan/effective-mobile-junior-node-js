# Multi-stage build for a TypeScript Node.js app
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies (including dev deps for build)
COPY package*.json ./
RUN npm ci --silent

# Copy source and build
COPY . .
RUN npm run build

# Runtime image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy package info, node_modules and built output from builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Optional: copy example env (use docker-compose .env to provide real values)
COPY --from=builder /app/.env.example .env

EXPOSE 5000
CMD ["node", "dist/main.js"]