import type { Accent } from "@/types";

/**
 * 卡片主题色映射（数据中的 accent 字段 → Tailwind 类名）
 * 统一为深红 / 石墨灰同色系，仅以明度区分，保持整体克制。
 * 注意：类名需完整书写，Tailwind 才能在构建时扫描到。
 */
export const accentStyles: Record<Accent, { icon: string; glow: string; soft: string; text: string }> = {
  sky: {
    icon: "from-brand-600 to-brand-800",
    glow: "bg-brand-300/20",
    soft: "from-brand-50 to-white",
    text: "text-brand-700",
  },
  cyan: {
    icon: "from-brand-500 to-brand-700",
    glow: "bg-brand-200/30",
    soft: "from-brand-50 to-white",
    text: "text-brand-600",
  },
  ocean: {
    icon: "from-brand-700 to-brand-950",
    glow: "bg-brand-400/15",
    soft: "from-ink-50 to-white",
    text: "text-brand-800",
  },
  indigo: {
    icon: "from-ink-600 to-ink-900",
    glow: "bg-ink-300/25",
    soft: "from-ink-50 to-white",
    text: "text-ink-800",
  },
  teal: {
    icon: "from-brand-800 to-night-900",
    glow: "bg-brand-300/15",
    soft: "from-brand-50 to-white",
    text: "text-brand-900",
  },
};

export function getAccent(accent: Accent) {
  return accentStyles[accent] ?? accentStyles.sky;
}
