import { substationPluginCount } from "@/data/plugins";
import type { HomeContent } from "@/types";

/**
 * 首页各区块文案
 * 区块顺序见 app/page.tsx；产品、业务方向、团队等列表数据见对应 data 文件。
 */
export const home: HomeContent = {
  hero: {
    badge: "2026 年 10 月：智慧后勤 AI 助手六个研发阶段完成复验，等待客户环境试点",
    title: "北京艾博纳信息技术有限公司",
    model: {
      name: "艾博纳幺儿",
      nameEn: "Abonayaoer",
      tagline: "已完成阶段性内部验证，评测结果尚未公开",
    },
    description:
      "我们给变电站和企业后勤写 AI 软件。夜里巡视时，监测平台把异常落到具体设备上，同时留下原图、置信度和模型版本，方便事后复核；值守时，虚拟同事先开口报最要紧的一件事，处不处置由值班员决定；办访客预约时，员工说一句话，在确认卡上核对无误才提交。模型和语音服务都可以部署在客户内网。",
    primaryCta: { label: "看三款产品各做到哪一步", href: "/products" },
    secondaryCta: { label: "看 1 分 25 秒值守演示", href: "/products/proactive-ai-agent#demo" },
    // 数字均可在产品研发仓库中核对：插件数取自 data/plugins.ts；语音时延见主动 AI 仓库 README；试点方案见后勤助手 docs/12
    highlights: [
      { value: String(substationPluginCount), label: "个变电站监测插件，每个都能单独部署" },
      { value: "0.2 秒", label: "本地语音识别出字，离线跑在 CPU 上" },
      { value: "4 周", label: "访客预约试点周期，第 1 周先测人工填写用时" },
    ],
    // 真实界面截图（演示回放数据），见产品页 /products/proactive-ai-agent#screens
    visual: {
      src: "/images/products/proactive-ai/l1-proactive-briefing.jpg",
      width: 2400,
      height: 1350,
      title: "主动 AI 值守界面",
      alt: "主动 AI 值守界面：虚拟同事指向左侧数字孪生，地图上高亮开关柜 01 前的黄线，右侧是按优先级排序的风险卡片",
      caption: "虚拟同事正在报「一号机柜压线」，左侧数字孪生同步定位到开关柜 01 前的黄线。画面为演示回放数据，不是现场。",
    },
  },

  products: {
    eyebrow: "CORE PRODUCTS",
    title: "核心产品",
    description: "每张卡片的「进展」一栏写的是现在实际做到哪一步；没做到的，不写成已完成。",
  },

  business: {
    eyebrow: "BUSINESS DIRECTIONS",
    title: "业务方向",
    description: "这些方向都是从已有项目里长出来的：先在变电站和后勤场景跑通，再看能不能复制到别处。",
  },

  casesNews: {
    cases: {
      eyebrow: "CASE STUDIES",
      title: "项目案例",
      description: "客户名称在授权前匿名；涉及指标的地方，都注明是内部测试集还是现场数据。",
      more: { label: "全部案例", href: "/cases" },
    },
    news: {
      eyebrow: "NEWSROOM",
      title: "新闻动态",
      description: "研发进展和版本发布记录，按时间倒序。",
      more: { label: "更多新闻", href: "/news" },
    },
  },

  culture: {
    eyebrow: "HOW WE WORK",
    title: "我们做事的几条规矩",
    description: "这几条都写进了产品代码和验收流程，每条下面注明出处。",
  },

  team: {
    eyebrow: "CORE TEAM",
    title: "核心团队",
    description: "做算法的、懂变电站运维的、做工业软件交付的人在一个项目组里干活。成员姓名和简历征得本人同意后公开。",
    more: { label: "了解我们", href: "/about" },
  },

  cta: {
    eyebrow: "START SMALL",
    title: "先拿一个具体场景来试",
    description:
      "比如一座变电站的开关状态识别，或者一个部门的访客预约。我们先把演示版部署到您的环境里，用您的数据跑一遍，看结果再决定要不要扩大范围。",
    primary: { label: "获取解决方案", href: "/contact#solution" },
    secondary: { label: "联系我们", href: "/contact" },
    contactTitle: "商务联系人",
  },
};
