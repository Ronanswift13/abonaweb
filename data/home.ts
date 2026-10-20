import { substationPluginCount } from "@/data/plugins";
import type { HomeContent } from "@/types";

/**
 * 首页各区块文案
 * 区块顺序见 app/page.tsx；产品、业务方向、团队等列表数据见对应 data 文件。
 */
export const home: HomeContent = {
  hero: {
    badge: "行业大模型 · 主动 AI · 智能监测 · 可信安全",
    title: "北京艾博纳信息技术有限公司",
    model: {
      name: "艾博纳幺儿",
      nameEn: "Abonayaoer",
      tagline: "面向电力能源与工业场景的自研大模型",
    },
    description:
      "我们以自研大模型为核心，融合多模态感知、主动 AI 智能体与数字孪生技术，并以贯穿全链路的安全设计，为电力能源与工业企业提供“看得见、想得到、做得准”的智能化解决方案。",
    primaryCta: { label: "了解我们的解决方案", href: "/capabilities" },
    secondaryCta: { label: "观看产品演示", href: "/products/abonayaoer#demo" },
    // 【占位】亮点数据请替换为经确认可公开的表述（插件数量取自 data/plugins.ts）
    highlights: [
      { value: String(substationPluginCount), label: "变电站监测插件" },
      { value: "全链路", label: "感知 · 认知 · 决策" },
      { value: "私有化", label: "安全可控部署" },
    ],
    // 【占位】示意对话，仅用于视觉展示
    demo: {
      title: "艾博纳幺儿",
      status: "在线 · 主动分析中",
      messages: [
        { role: "user", text: "汇总 3 号主变近 24 小时的红外测温与声纹数据，有异常吗？" },
        {
          role: "assistant",
          text: "已比对历史基线：B 相套管温升偏高 6.8℃，声纹无异常。建议 2 小时内复测，并已生成巡检工单。",
        },
      ],
      chips: ["多模态感知", "主动预警", "数字孪生", "工单联动"],
    },
  },

  products: {
    eyebrow: "CORE PRODUCTS",
    title: "核心产品",
    description: "从感知到认知，从平台到智能体，以自研技术构建行业智能化的关键能力。",
  },

  business: {
    eyebrow: "BUSINESS DIRECTIONS",
    title: "业务方向",
    description: "围绕大模型与行业场景持续拓展，覆盖电力能源、企业服务、工业物联网与网络安全等领域。",
  },

  casesNews: {
    cases: {
      eyebrow: "CASE STUDIES",
      title: "项目案例",
      description: "来自真实场景的落地实践。",
      more: { label: "全部案例", href: "/cases" },
    },
    news: {
      eyebrow: "NEWSROOM",
      title: "新闻动态",
      description: "公司新闻、项目进展与行业观察。",
      more: { label: "更多新闻", href: "/news" },
    },
  },

  culture: {
    eyebrow: "OUR CULTURE",
    title: "企业文化",
    description: "以技术创造价值，以价值赢得信任。",
  },

  team: {
    eyebrow: "CORE TEAM",
    title: "核心团队",
    description: "汇聚人工智能、电力系统与工业软件领域的复合型人才。",
    more: { label: "了解我们", href: "/about" },
  },

  cta: {
    eyebrow: "LET'S BUILD TOGETHER",
    title: "让大模型真正走进您的业务现场",
    description:
      "无论是变电站智能监测、行业大模型私有化部署、主动 AI 智能体定制，还是智慧后勤 AI 助手，我们都将为您提供从咨询、方案到落地运维的一站式服务。",
    primary: { label: "获取解决方案", href: "/contact#solution" },
    secondary: { label: "联系我们", href: "/contact" },
    contactTitle: "商务联系人",
  },
};
