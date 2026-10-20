# 北京艾博纳官网 · 生产镜像（多阶段构建，基于 Next.js standalone 输出）
#
# 构建：docker build -t abona-website .
# 国内服务器可指定 npm 镜像：
#   docker build --build-arg NPM_REGISTRY=https://registry.npmmirror.com -t abona-website .
# 运行：docker run -d -p 3000:3000 --name abona-website abona-website

ARG NODE_VERSION=24-alpine

# ---------- 基础镜像 ----------
FROM node:${NODE_VERSION} AS base
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

# ---------- 安装依赖 ----------
FROM base AS deps
RUN apk add --no-cache libc6-compat
ARG NPM_REGISTRY=https://registry.npmjs.org
COPY package.json package-lock.json ./
RUN npm ci --registry="$NPM_REGISTRY" --no-audit --no-fund

# ---------- 构建 ----------
FROM base AS builder
# 站点正式地址在构建时写入（SEO / sitemap / canonical）
ARG NEXT_PUBLIC_SITE_URL=https://www.abonayaoer.com
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------- 运行 ----------
FROM base AS runner
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# 页面均在构建期静态生成；保留内容文件，便于日后将部分页面改为按需渲染
COPY --from=builder --chown=nextjs:nodejs /app/content ./content

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/api/health >/dev/null || exit 1

CMD ["node", "server.js"]
