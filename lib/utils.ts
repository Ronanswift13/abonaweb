import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * 让 tailwind-merge 识别 tailwind.config.ts 中自定义的背景图 / 背景尺寸 / 阴影类，
 * 否则 "bg-brand-gradient bg-200%" 会被误判为冲突而丢掉渐变。
 * 在 tailwind.config.ts 新增同类 token 时请同步补充。
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "bg-image": [{ bg: ["brand-gradient", "brand-button", "brand-gradient-soft", "night-gradient", "grid-light", "grid-dark"] }],
      "bg-size": [{ bg: ["grid", "200%"] }],
      shadow: [{ shadow: ["card", "card-hover", "glow"] }],
    },
  },
});

/** 合并 Tailwind 类名（后者覆盖前者的冲突类） */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 是否为站外链接（http / tel / mailto），这类链接使用原生 <a> */
export function isExternalHref(href: string) {
  return /^(https?:|tel:|mailto:)/.test(href);
}

/** "2026-10-20" → "2026年10月20日" */
export function formatDate(date: string) {
  const [y, m, d] = date.split("-");
  if (!y || !m || !d) return date;
  return `${y}年${Number(m)}月${Number(d)}日`;
}

/** 手机号显示格式：13311187533 → 133 1118 7533 */
export function formatPhone(phone: string) {
  return phone.replace(/^(\d{3})(\d{4})(\d{4})$/, "$1 $2 $3");
}

/** 安全序列化 JSON-LD（转义 "<" 防止注入） */
export function toJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
