import type { Accent } from "@/types";

/**
 * 卡片主题色映射（数据中的 accent 字段 → Tailwind 类名）
 * 注意：类名需完整书写，Tailwind 才能在构建时扫描到。
 */
export const accentStyles: Record<Accent, { icon: string; glow: string; soft: string; text: string }> = {
  sky: {
    icon: "from-brand-400 to-brand-700",
    glow: "bg-brand-400/25",
    soft: "from-brand-50 to-white",
    text: "text-brand-700",
  },
  cyan: {
    icon: "from-aqua-400 to-brand-600",
    glow: "bg-aqua-400/25",
    soft: "from-cyan-50 to-white",
    text: "text-aqua-600",
  },
  ocean: {
    icon: "from-brand-500 to-brand-900",
    glow: "bg-brand-600/20",
    soft: "from-sky-50 to-white",
    text: "text-brand-800",
  },
  indigo: {
    icon: "from-sky-400 to-indigo-600",
    glow: "bg-indigo-400/20",
    soft: "from-indigo-50 to-white",
    text: "text-indigo-600",
  },
  teal: {
    icon: "from-teal-300 to-aqua-600",
    glow: "bg-teal-300/25",
    soft: "from-teal-50 to-white",
    text: "text-teal-600",
  },
};

export function getAccent(accent: Accent) {
  return accentStyles[accent] ?? accentStyles.sky;
}
