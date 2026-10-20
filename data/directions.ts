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

/** 【占位】发展规划内容请按公司战略口径确认后替换（各方向依据当前研发项目进展整理） */
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
    summary: "推动破夜绘明平台从试点走向规模化应用，以真实现场数据完成各插件的精度验收。",
    focus: ["现场数据闭环与七维验收", "缺陷样本库建设", "与现有运维系统集成"],
  },
  {
    id: "proactive-pilot",
    title: "主动 AI 值守现场试点",
    icon: "bot",
    horizon: "近期",
    summary: "主动 AI 值守交互系统接入真实现场数据源，完成误报、漏报、提前量与端到端时延等指标验收。",
    focus: ["真实数据源接入", "现场标定与签核", "语音交互真人数据评测"],
  },
  {
    id: "logistics-pilot",
    title: "智慧后勤 AI 助手试点",
    icon: "mic",
    horizon: "近期",
    summary: "完成访客预约业务的宿主联调、第三方测试与现场试点，形成可复制的部署方案。",
    focus: ["宿主 App 真实环境联调", "第三方测试", "试点效率统计"],
  },
  {
    id: "agent-platform",
    title: "主动 AI 智能体平台",
    icon: "workflow",
    horizon: "中期",
    summary: "沉淀智能体开发与运行平台，支撑多场景快速定制。",
    focus: ["MCP 工具市场与编排", "多插件 / 多智能体协同", "安全与权限治理"],
  },
  {
    id: "digital-twin",
    title: "数字孪生与工业物联网",
    icon: "layers",
    horizon: "中期",
    summary: "以数字孪生为纽带，连接设备感知、仿真推演与智能决策。",
    focus: ["场站级孪生建模", "现场测绘与位置绑定", "预测性维护"],
  },
  {
    id: "fusion-learning",
    title: "多模态融合诊断学习化",
    icon: "merge",
    horizon: "中期",
    summary: "在规则融合基础上，按数据准入通道逐步启用跨模态注意力等学习融合模型。",
    focus: ["多源时间同步数据集", "影子运行与分阶段晋级", "融合诊断可解释性"],
  },
  {
    id: "security",
    title: "可信 AI 与网络安全",
    icon: "shield",
    horizon: "中期",
    summary: "把各产品中的认证、加密、审计与大模型护栏沉淀为通用安全底座，并推进工业物联网主动防御。",
    focus: ["统一身份与最小权限", "大模型安全护栏", "数字孪生诱饵主动防御"],
  },
  {
    id: "smart-services",
    title: "智慧后勤与企业服务",
    icon: "building",
    horizon: "远期",
    summary: "将 AI 助手从访客预约扩展至会务、报修、餐饮等后勤场景，并延伸到园区管理与企业办公。",
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
