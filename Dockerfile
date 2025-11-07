# ---------- Build stage ----------
FROM node:24-alpine AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable && corepack prepare pnpm@9.12.0 --activate

# Copy manifest trước để tối ưu cache
COPY package.json pnpm-lock.yaml .npmrc* ./ 

# Prefetch deps (tạo pnpm store) rồi cài offline để build nhanh
RUN pnpm fetch
# copy source
COPY . .
# cài deps từ cache (không chạm mạng)
RUN pnpm install --offline --frozen-lockfile

# Khuyến nghị Next: output standalone để runtime gọn
# (đừng quên set trong next.config.mjs: export default { output: 'standalone' })
RUN pnpm build

# ---------- Run stage ----------
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1

# copy output standalone + public assets
# .next/standalone chứa server node đã bundle sẵn
COPY --from=builder /app/.next/standalone ./ 
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# bạn có API_BASE… truyền lúc run qua env
ENV PORT=3000
EXPOSE 3000

# Next standalone app nằm trong ./server.js (đã bundle)
CMD ["node", "server.js"]
