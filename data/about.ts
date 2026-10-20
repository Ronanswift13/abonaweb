import type { AboutContent, ContactPageContent } from "@/types";

/** 关于我们页（/about）【占位】公司简介、里程碑请按实际情况替换 */
export const about: AboutContent = {
  intro: {
    eyebrow: "ABOUT US",
    title: "关于艾博纳",
    description: "以自研大模型为核心，专注电力能源与工业场景的人工智能科技企业。",
  },
  paragraphs: [
    "北京艾博纳信息技术有限公司（Beijing Aibona Information Technology Co., Ltd.）是一家专注于人工智能技术研发与行业应用的科技企业。公司以自研大模型「艾博纳幺儿」（Abonayaoer）为核心，围绕多模态感知、主动 AI 智能体与数字孪生等方向持续投入。",
    "公司深耕电力能源领域，推出破夜绘明变电站监测平台等产品，致力于将前沿 AI 技术转化为客户现场可用、好用、可信赖的解决方案，助力行业数字化与智能化转型。",
  ],
  mission: [
    { title: "使命", text: "让人工智能真正走进行业一线，创造可衡量的价值。" },
    { title: "愿景", text: "成为值得信赖的行业大模型与主动 AI 解决方案提供者。" },
  ],
  milestones: [
    { year: "2026", title: "官网 V1.0 上线", description: "品牌形象与产品体系统一对外发布。" },
    { year: "2026", title: "自研大模型发布", description: "「艾博纳幺儿」行业大模型完成内部验证。" },
    { year: "2025", title: "破夜绘明平台研发", description: "启动变电站全天候监测平台研发与试点。" },
  ],
};

/** 联系我们页（/contact） */
export const contactPage: ContactPageContent = {
  intro: {
    eyebrow: "CONTACT",
    title: "联系我们",
    description: "期待与您交流合作。请通过电话或微信联系我们，我们将尽快与您沟通需求。",
  },
  solution: {
    eyebrow: "GET A SOLUTION",
    title: "获取解决方案",
    description: "沟通前准备以下信息，可以帮助我们更快给出有针对性的方案建议：",
    checklist: [
      "所属行业与业务场景（如变电站运维、企业后勤、知识服务等）",
      "当前痛点与希望达成的目标",
      "已有系统、设备与数据情况",
      "部署要求（公有云 / 私有化 / 国产化环境）",
      "期望的项目周期与预算范围",
    ],
  },
  process: [
    { title: "需求沟通", description: "了解业务场景、痛点与目标" },
    { title: "方案设计", description: "提供技术方案与实施建议" },
    { title: "试点验证", description: "小范围验证效果，确认价值" },
    { title: "交付运维", description: "规模部署与持续运维支持" },
  ],
  note: "添加微信时请备注“公司名称 + 合作需求”，便于我们更快为您安排对接。",
};
