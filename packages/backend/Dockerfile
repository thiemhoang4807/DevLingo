# ============================================
# 🐳 DevLingo Backend - Production Dockerfile
# ============================================

# --- Stage 1: Build ---
FROM node:20-alpine AS builder

WORKDIR /app

# Cài đặt build dependencies cho native modules (sqlite3, bcrypt)
RUN apk add --no-cache python3 make g++

# Copy workspace root files
COPY package.json package-lock.json ./

# Copy shared package
COPY packages/shared ./packages/shared

# Copy backend package
COPY packages/backend/package.json ./packages/backend/

# Install all dependencies (bao gồm devDependencies để build TypeScript)
RUN npm ci --workspace=@devlingo/backend --workspace=@devlingo/shared --include-workspace-root

# Copy backend source code
COPY packages/backend ./packages/backend

# Build TypeScript → JavaScript
RUN cd packages/backend && npx tsc

# --- Stage 2: Production ---
FROM node:20-alpine AS production

WORKDIR /app

# Cài đặt runtime dependencies cho native modules
RUN apk add --no-cache python3 make g++

# Copy workspace root files
COPY package.json package-lock.json ./

# Copy shared package (cần cho runtime)
COPY packages/shared ./packages/shared

# Copy backend package.json
COPY packages/backend/package.json ./packages/backend/

# Install CHỈ production dependencies
RUN npm ci --workspace=@devlingo/backend --workspace=@devlingo/shared --include-workspace-root --omit=dev

# Xóa build tools sau khi install xong (giảm image size)
RUN apk del python3 make g++

# Copy compiled JavaScript từ build stage
COPY --from=builder /app/packages/backend/dist ./packages/backend/dist

# Tạo thư mục cho uploads và database
RUN mkdir -p /app/packages/backend/uploads /app/data

# Expose port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/lessons || exit 1

# Set environment variables mặc định
ENV NODE_ENV=production
ENV PORT=5000

# Chạy server
WORKDIR /app/packages/backend
CMD ["node", "dist/server.js"]
