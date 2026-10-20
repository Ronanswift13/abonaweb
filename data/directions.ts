import type { DevelopmentDirection, Horizon, SectionIntro } from "@/types";

export const directionsIntro: SectionIntro = {
  eyebrow: "ROADMAP",
  title: "发展方向",
  description: "立足电力能源，以大模型与主动 AI 为主线，逐步走向更广阔的工业与企业服务场景。",
};

/** 时间维度说明（页面按此顺序分组展示） */
export const horizons: { key: Horizon; label: string; description: string }[] = [
  { key: "近期", label: "近期 · 夯实基础", description: "打磨核心产品，形成可复制的行业标杆。" },
  { key: "中期", label: "中期 · 能力扩展", description: "从单点产品走向平台化与生态合作。" },
  { key: "远期", label: "远期 · 场景拓展", description: "将主动 AI 能力推广至更多行业与场景。" },
];

/** 【占位】发展规划内容请按公司战略口径确认后替换 */
export const directions: DevelopmentDirection[] = [
  {
    id: "llm-industry",
    title: "行业大模型深化",
    icon: "brain",
    horizon: "近期",
    summary: "持续提升「艾博纳幺儿」在电力能源领域的专业能力与可靠性。",
    focus: ["行业语料与评测体系", "模型轻量化与端侧部署", "可解释与可追溯回答"],
  },
  {
    id: "substation",
    title: "变电站智能监测规模化",
    icon: "radar",
    horizon: "近期",
    summary: "推动破夜绘明平台从试点走向规模化应用。",
    focus: ["标准化部署方案", "缺陷样本库建设", "与现有运维系统集成"],
  },
  {
    id: "agent-platform",
    title: "主动 AI 智能体平台",
    icon: "bot",
    horizon: "中期",
    summary: "沉淀智能体开发与运行平台，支撑多场景快速定制。",
    focus: ["智能体编排与工具市场", "多智能体协同", "安全与权限治理"],
  },
  {
    id: "digital-twin",
    title: "数字孪生与工业物联网",
    icon: "layers",
    horizon: "中期",
    summary: "以数字孪生为纽带，连接设备感知、仿真推演与智能决策。",
    focus: ["场站级孪生建模", "工业物联网主动防御", "预测性维护"],
  },
  {
    id: "smart-services",
    title: "智慧后勤与企业服务",
    icon: "building",
    horizon: "远期",
    summary: "将主动 AI 助手推广至后勤保障、园区管理与企业办公等场景。",
    focus: ["后勤多场景 AI 助手", "园区智能运营", "企业知识服务"],
  },
  {
    id: "ecosystem",
    title: "开放生态与合作",
    icon: "handshake",
    horizon: "远期",
    summary: "与科研院所、行业伙伴共建技术与应用生态。",
    focus: ["产学研联合攻关", "标准与规范参与", "解决方案伙伴计划"],
  },
];
