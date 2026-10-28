import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

/**
 * 艾博纳官网设计令牌（Design Tokens）—— 纯白背景 + 深红强调色（正式企业风格）
 * - brand：品牌主色，深红 / 酒红系。700 = 主色 #9B1B1B，800 = 深色版 #7F1D1D（悬停、页脚），50 = 浅色版 #FEF2F2
 * - ink  ：文字与中性色。900/800 主文字，500/400 次要文字，100 边框与分割线，50 极浅灰背景
 * - night：轮播、联系卡片等深色区域背景（深灰红）
 * 修改品牌色只需调整此处，全站组件统一引用这些 token。
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.ts",
    "./data/**/*.ts",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FEF2F2",
          100: "#FBE0E0",
          200: "#F5C7C7",
          300: "#E99A9A",
          400: "#D65C5C",
          500: "#C43131",
          600: "#B12525",
          700: "#9B1B1B",
          800: "#7F1D1D",
          900: "#661A1A",
          950: "#3F1212",
          DEFAULT: "#9B1B1B",
        },
        ink: {
          50: "#F8FAFC",
          100: "#E5E7EB",
          200: "#D1D5DB",
          300: "#9CA3AF",
          400: "#6B7280",
          500: "#4B5563",
          600: "#374151",
          700: "#283241",
          800: "#1F2937",
          900: "#111827",
          DEFAULT: "#111827",
        },
        night: {
          800: "#3F1A1A",
          900: "#2B1315",
          DEFAULT: "#2B1315",
        },
      },
      fontFamily: {
        // 优先系统字体：不依赖 Google Fonts，国内服务器构建/访问更稳定。
        // 如需统一字体，可用 next/font/local 自托管 Inter / 思源黑体，并在此处前置对应 CSS 变量。
        sans: [
          "Inter",
          '"PingFang SC"',
          '"Hiragino Sans GB"',
          '"Microsoft YaHei"',
          '"Noto Sans SC"',
          '"Source Han Sans SC"',
          "system-ui",
          "-apple-system",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(17,24,39,0.04), 0 8px 24px -8px rgba(17,24,39,0.08)",
        "card-hover": "0 2px 4px rgba(17,24,39,0.04), 0 20px 40px -16px rgba(127,29,29,0.18)",
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.ink.600"),
            "--tw-prose-headings": theme("colors.ink.900"),
            "--tw-prose-links": theme("colors.brand.700"),
            "--tw-prose-bold": theme("colors.ink.900"),
            "--tw-prose-bullets": theme("colors.brand.700"),
            "--tw-prose-quotes": theme("colors.ink.700"),
            "--tw-prose-quote-borders": theme("colors.brand.300"),
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
