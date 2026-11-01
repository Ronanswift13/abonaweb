import type { LinkItem, NavItem } from "@/types";

/** 顶部主导航（顺序即展示顺序） */
export const mainNav: NavItem[] = [
  { label: "产品", href: "/products" },
  { label: "能力", href: "/capabilities" },
  { label: "案例", href: "/cases" },
  { label: "发展方向", href: "/directions" },
  { label: "新闻", href: "/news" },
  { label: "关于", href: "/about" },
  { label: "联系", href: "/contact" },
];

/** 页脚链接：一行，不分栏 */
export const footerLinks: LinkItem[] = [
  { label: "合作流程", href: "/contact#solution" },
  { label: "监测插件", href: "/products/poye-substation-monitoring#plugins" },
  { label: "元隐空轴计划", href: "/directions/yuanyin-kongzhou" },
  { label: "站内搜索", href: "/search" },
];
