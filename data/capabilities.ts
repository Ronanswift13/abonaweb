import type { Capability, SectionIntro } from "@/types";

export const capabilitiesIntro: SectionIntro = {
  eyebrow: "CAPABILITIES",
  title: "核心能力",
  description: "以大模型为中枢，打通感知、认知、决策与执行，构建面向行业场景的全栈 AI 能力。",
};

/**
 * 核心能力（/capabilities）
 * id 同时作为页面锚点，如 /capabilities#digital-twin
 * 【占位】能力要点请按实际技术积累补充。
 */
export const capabilities: Capability[] = [
  {
    id: "llm",
    title: "大模型与知识工程",
    subtitle: "Large Language Model",
    icon: "brain",
    summary: "自研「艾博纳幺儿」行业大模型，结合知识图谱与检索增强，让 AI 懂行业、可追溯。",
    points: ["行业语料构建与持续训练", "检索增强生成（RAG）", "知识图谱与规程结构化", "私有化 / 国产化部署"],
  },
  {
    id: "agent",
    title: "主动 AI 与智能体",
    subtitle: "Proactive AI Agent",
    icon: "bot",
    summary: "让 AI 从被动问答走向主动服务，具备感知、规划、工具调用与人机协同能力。",
    points: ["事件驱动的主动感知", "多步骤任务规划", "业务系统与工具调用", "人在回路的安全机制"],
  },
  {
    id: "digital-twin",
    title: "数字孪生",
    subtitle: "Digital Twin",
    icon: "layers",
    summary: "构建物理设备与场站的高保真数字映射，支撑可视化监控、仿真推演与预测性维护。",
    points: ["三维场景建模与轻量化", "实时数据驱动的孪生体", "仿真推演与趋势预测", "工业物联网主动防御"],
  },
  {
    id: "multimodal",
    title: "多模态感知",
    subtitle: "Multimodal Perception",
    icon: "eye",
    summary: "融合视觉、红外、声纹与传感器数据，在复杂环境下实现稳定、精准的感知识别。",
    points: ["低照度图像增强", "缺陷检测与目标识别", "声纹与振动分析", "多源数据时空融合"],
  },
  {
    id: "energy",
    title: "电力能源智能化",
    subtitle: "Smart Energy",
    icon: "zap",
    summary: "深耕电力能源场景，将 AI 能力落地到设备运维、安全管控与经营决策全流程。",
    points: ["变电站智能监测", "设备状态评估与检修辅助", "作业安全管控", "运维知识沉淀与复用"],
  },
];
