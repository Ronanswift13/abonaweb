import type { FooterColumn, LinkItem, NavItem } from "@/types";

/** 顶部主导航（顺序即展示顺序） */
export const mainNav: NavItem[] = [
  { label: "首页", href: "/" },
  { label: "产品方案", href: "/products" },
  { label: "核心能力", href: "/capabilities" },
  { label: "项目案例", href: "/cases" },
  { label: "发展方向", href: "/directions" },
  { label: "新闻动态", href: "/news" },
  { label: "关于我们", href: "/about" },
];

/** 导航右侧主按钮 */
export const navCta: LinkItem = { label: "联系我们", href: "/contact" };

/** 页脚链接分栏 */
export const footerColumns: FooterColumn[] = [
  {
    title: "快速导航",
    links: [
      { label: "核心能力", href: "/capabilities" },
      { label: "产品与解决方案", href: "/products" },
      { label: "监测插件", href: "/products/poye-substation-monitoring#plugins" },
      { label: "项目案例", href: "/cases" },
      { label: "发展方向", href: "/directions" },
    ],
  },
  {
    title: "了解艾博纳",
    links: [
      { label: "元隐空轴计划", href: "/directions/yuanyin-kongzhou" },
      { label: "新闻动态", href: "/news" },
      { label: "关于我们", href: "/about" },
      { label: "联系我们", href: "/contact" },
      { label: "站内搜索", href: "/search" },
    ],
  },
];
