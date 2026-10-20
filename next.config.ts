import path from "node:path";

import type { NextConfig } from "next";

/** 基础安全响应头；生产环境 Nginx 也会补充 HSTS 等策略（见 deploy/nginx） */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // 生成独立运行包（.next/standalone），供 Dockerfile 构建精简镜像
  output: "standalone",
  // 固定项目根目录，避免上级目录中的 package-lock.json 被误判为工作区根
  turbopack: { root: path.join(__dirname) },
  outputFileTracingRoot: path.join(__dirname),
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
