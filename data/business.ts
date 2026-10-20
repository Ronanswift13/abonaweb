import type { BusinessDirection } from "@/types";

/**
 * 首页“业务方向”滑动卡片
 * 新增一项即自动生成一张卡片与指示点。
 * 【占位】业务方向名称与描述请按公司正式口径确认。
 */
export const businessDirections: BusinessDirection[] = [
  {
    id: "llm",
    title: "行业大模型",
    subtitle: "Industry LLM",
    icon: "brain",
    accent: "cyan",
    description: "以「艾博纳幺儿」为底座，提供行业知识增强、微调训练与私有化部署服务。",
    tags: ["知识问答", "私有化"],
    href: "/products/abonayaoer",
  },
  {
    id: "substation",
    title: "变电站智能监测",
    subtitle: "Substation Monitoring",
    icon: "radar",
    accent: "sky",
    description: "破夜绘明平台实现全天候设备监测、缺陷识别与主动预警。",
    tags: ["全天候", "缺陷识别"],
    href: "/products/poye-substation-monitoring",
  },
  {
    id: "agent",
    title: "主动 AI 智能体",
    subtitle: "Proactive Agents",
    icon: "bot",
    accent: "ocean",
    description: "让 AI 主动感知、主动建议、主动执行，成为业务一线的智能协作者。",
    tags: ["主动服务", "任务编排"],
    href: "/products/proactive-ai-agent",
  },
  {
    id: "digital-twin",
    title: "数字孪生",
    subtitle: "Digital Twin",
    icon: "layers",
    accent: "indigo",
    description: "构建设备、场站与园区的数字孪生体，实现状态可视、过程可溯、趋势可测。",
    tags: ["三维可视化", "仿真推演"],
    href: "/capabilities#digital-twin",
  },
  {
    id: "multimodal",
    title: "多模态感知",
    subtitle: "Multimodal Perception",
    icon: "eye",
    accent: "teal",
    description: "融合可见光、红外、声纹与传感数据，让机器“看得清、听得懂”。",
    tags: ["视觉", "声纹", "传感"],
    href: "/capabilities#multimodal",
  },
  {
    id: "energy",
    title: "电力能源智能化",
    subtitle: "Smart Energy",
    icon: "zap",
    accent: "sky",
    description: "面向发电、输变电与配用电环节，提供智能运维与决策支持解决方案。",
    tags: ["智能运维", "决策支持"],
    href: "/capabilities#energy",
  },
  {
    id: "logistics",
    title: "智慧后勤服务",
    subtitle: "Smart Services",
    icon: "building",
    accent: "cyan",
    description: "面向后勤多场景的 AI 助手，覆盖访客、餐饮、会务、报修等服务环节。",
    tags: ["AI 助手", "多场景"],
    href: "/directions",
  },
  {
    id: "iiot-security",
    title: "工业物联网安全",
    subtitle: "IIoT Security",
    icon: "shield",
    accent: "ocean",
    description: "面向资源受限的工业物联网环境，探索数字孪生驱动的主动防御技术。",
    tags: ["主动防御", "工业互联网"],
    href: "/directions",
  },
];
