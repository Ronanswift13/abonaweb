import type { SiteConfig } from "@/types";

/**
 * 公司与站点基础信息（全站唯一来源）
 * 页眉、页脚、联系页、CTA、SEO、结构化数据均读取此处。
 * 搜索 "【占位】" 可定位所有待确认 / 待替换的内容。
 */
export const site: SiteConfig = {
  name: "北京艾博纳信息技术有限公司",
  shortName: "艾博纳",
  nameEn: "Beijing Aibona Information Technology Co., Ltd.",
  brand: "Abonayaoer",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.abonayaoer.com",
  domain: "Abonayaoer.com",
  description:
    "北京艾博纳信息技术有限公司专注行业大模型、主动 AI 智能体、变电站智能监测、数字孪生与网络安全技术，以自研大模型「艾博纳幺儿」（Abonayaoer）赋能电力能源与工业场景的智能化升级。",
  keywords: [
    "艾博纳",
    "Abonayaoer",
    "艾博纳幺儿",
    "行业大模型",
    "主动AI",
    "智能体",
    "变电站监测",
    "破夜绘明",
    "DarkBreaker",
    "监测插件",
    "数字孪生",
    "电力能源智能化",
    "智慧后勤",
    "AI助手",
    "网络安全",
  ],
  // 由提供的红色 Logo 白底源图抠图、裁剪生成的透明 PNG；拿到矢量 / 高清源文件后替换 public/images/logo.png 并更新尺寸
  logo: {
    src: "/images/logo.png",
    width: 338,
    height: 256,
    alt: "艾博纳 Abonayaoer Logo",
  },
  ogImage: {
    url: "/images/og-default.png",
    width: 1200,
    height: 630,
    alt: "北京艾博纳信息技术有限公司 · 自研行业大模型「艾博纳幺儿」",
  },
  contact: {
    name: "罗近一",
    phone: "18301304191",
    wechat: "TSwiftie-1989",
    // wechatQr: "/images/wechat-qr.png", // 【占位】放入微信二维码图片后取消注释
    // email: "business@abonayaoer.com", // 【占位】对外邮箱确认后取消注释
  },
  address: "北京市", // 【占位】详细办公地址待确认
  serviceHours: "周一至周五 9:00–18:00",
  icp: {
    record: "京ICP备XXXXXXXX号-1", // 【占位】备案通过后替换
    // police: "京公网安备 XXXXXXXXXXXXXX号", // 【占位】公安联网备案号（如需要）
  },
  foundedYear: 2026, // 【占位】请替换为公司成立年份
};
