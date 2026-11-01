import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

/**
 * 艾博纳官网设计令牌，规则见 DESIGN.md。
 * - red：公司红，只做点缀（主要按钮、链接、Logo），不做整屏底色
 * - ink / paper：石墨和纸白，公司页面的文字和底色
 * - theme：当前区块的主题色，由 data-product-theme 决定（globals.css），各产品的值取自产品代码
 * theme.colors 不是 extend：灰色和框架默认色在这里不存在，写了也不会生效。
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
    colors: {
      transparent: "transparent",
      current: "currentColor",
      red: "#C8000B",
      "red-deep": "#9B0109",
      ink: "#16181D",
      paper: "#F6F6F3",
      theme: {
        bg: "rgb(var(--t-bg) / <alpha-value>)",
        fg: "rgb(var(--t-fg) / <alpha-value>)",
        heading: "rgb(var(--t-heading) / <alpha-value>)",
        accent: "rgb(var(--t-accent) / <alpha-value>)",
        "on-accent": "rgb(var(--t-on-accent) / <alpha-value>)",
      },
    },
    extend: {
      fontFamily: {
        // 西文和数字用 D-DIN；中文正文用系统字体，不增加下载体积
        sans: ["var(--font-din)", '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', '"Noto Sans SC"', "sans-serif"],
        // 标题用思源黑体 Black 子集，字库由 npm run fonts:subset 生成
        display: ["var(--font-display)", '"PingFang SC"', '"Microsoft YaHei"', "sans-serif"],
      },
      boxShadow: {
        // 只给弹窗用
        lift: "0 24px 64px -16px rgba(22,24,29,0.6)",
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.ink"),
            "--tw-prose-headings": theme("colors.ink"),
            "--tw-prose-links": theme("colors.red"),
            "--tw-prose-bold": theme("colors.ink"),
            "--tw-prose-bullets": theme("colors.ink"),
            "--tw-prose-counters": theme("colors.ink"),
            "--tw-prose-quotes": theme("colors.ink"),
            "--tw-prose-quote-borders": theme("colors.red"),
            "--tw-prose-hr": theme("colors.ink"),
            "--tw-prose-th-borders": theme("colors.ink"),
            "--tw-prose-td-borders": theme("colors.ink"),
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
