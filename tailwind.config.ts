import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

/**
 * 艾博纳官网设计令牌（Design Tokens）
 * - brand：主色，取自 Logo 天蓝 → 深蓝（#00AEEF → #0077B6）
 * - aqua ：辅助色，取自 Logo 右上角的青色高光
 * - ink  ：文字与中性色（深蓝灰，替代纯黑）
 * - night：页脚等深色区域背景
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
          50: "#E8F8FE",
          100: "#CDEFFC",
          200: "#9DE0FA",
          300: "#63CDF6",
          400: "#2BBDF2",
          500: "#00AEEF",
          600: "#0092D4",
          700: "#0077B6",
          800: "#005D8F",
          900: "#00466B",
          950: "#032C45",
          DEFAULT: "#00AEEF",
        },
        aqua: {
          300: "#7FE7F2",
          400: "#3FD8EA",
          500: "#16C5DD",
          600: "#0EA5BF",
          DEFAULT: "#3FD8EA",
        },
        ink: {
          50: "#F6F8FB",
          100: "#EEF2F6",
          200: "#DCE3EA",
          300: "#B4BECA",
          400: "#8592A3",
          500: "#5B6B80",
          600: "#3E5269",
          700: "#24384F",
          800: "#13263D",
          900: "#0B1B2E",
          DEFAULT: "#0B1B2E",
        },
        night: {
          800: "#0A1E33",
          900: "#061423",
          DEFAULT: "#061423",
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
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #3FD8EA 0%, #00AEEF 45%, #0077B6 100%)",
        // 按钮用较深的渐变，保证白色文字对比度
        "brand-button": "linear-gradient(120deg, #00A3E6 0%, #0084C8 55%, #006AA8 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, rgba(63,216,234,0.14) 0%, rgba(0,174,239,0.10) 45%, rgba(0,119,182,0.08) 100%)",
        "night-gradient": "linear-gradient(160deg, #0A1E33 0%, #061423 60%, #032C45 100%)",
        "grid-light":
          "linear-gradient(to right, rgba(0,119,182,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,119,182,0.07) 1px, transparent 1px)",
        "grid-dark":
          "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "48px 48px",
        "200%": "200% 200%",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,27,46,0.04), 0 8px 24px -8px rgba(11,27,46,0.10)",
        "card-hover": "0 2px 4px rgba(11,27,46,0.04), 0 24px 48px -16px rgba(0,119,182,0.30)",
        glow: "0 12px 32px -10px rgba(0,174,239,0.65)",
      },
      keyframes: {
        flow: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(2%, -4%, 0) scale(1.06)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        flow: "flow 12s ease-in-out infinite",
        float: "float 14s ease-in-out infinite",
        "float-slow": "float 20s ease-in-out infinite reverse",
        "spin-slow": "spin 40s linear infinite",
        "fade-up": "fade-up 0.7s ease-out both",
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.ink.600"),
            "--tw-prose-headings": theme("colors.ink.900"),
            "--tw-prose-links": theme("colors.brand.700"),
            "--tw-prose-bold": theme("colors.ink.900"),
            "--tw-prose-bullets": theme("colors.brand.500"),
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
