import type { HomeContent } from "@/types";

/**
 * 首页各区块文案
 * 区块顺序见 app/page.tsx；产品、业务方向、团队等列表数据见对应 data 文件。
 */
export const home: HomeContent = {
  hero: {
    title: "北京艾博纳信息技术有限公司",
    description:
      "公司主要研发面向电力行业和企业服务的人工智能软件，产品包括破夜绘明变电站监测平台、主动 AI 值守交互系统和智慧后勤 AI 助手，并自研行业大模型「艾博纳幺儿」（Abonayaoer）。产品支持在客户内网部署。",
    primaryCta: { label: "查看产品", href: "/products" },
    secondaryCta: { label: "观看演示视频", href: "/products/proactive-ai-agent#demo" },
    // 真实界面截图（演示回放数据），见产品页 /products/proactive-ai-agent#screens
    visual: {
      src: "/images/products/proactive-ai/l1-proactive-briefing.jpg",
      width: 2400,
      height: 1350,
      title: "主动 AI 值守交互系统界面",
      alt: "主动 AI 值守界面：虚拟同事指向左侧数字孪生，地图上高亮开关柜 01 前的黄线，右侧是按优先级排序的风险卡片",
      caption: "主动 AI 值守交互系统界面（演示回放数据）",
    },
  },

  products: {
    title: "核心产品",
  },

  business: {
    title: "业务方向",
  },

  casesNews: {
    cases: {
      title: "项目案例",
      more: { label: "全部案例", href: "/cases" },
    },
    news: {
      title: "新闻动态",
      more: { label: "更多新闻", href: "/news" },
    },
  },

  team: {
    title: "核心团队",
    more: { label: "了解我们", href: "/about" },
  },

  cta: {
    title: "联系我们",
    description: "如需了解产品或洽谈合作，请通过电话或微信与我们联系，也可以预约现场演示。",
    primary: { label: "预约演示", href: "/contact#solution" },
    secondary: { label: "查看联系方式", href: "/contact" },
  },
};
