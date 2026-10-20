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
    description: "破夜绘明平台以 20 个标准化监测插件，实现全天候设备监测、缺陷识别与主动预警。",
    tags: ["插件化", "缺陷识别"],
    href: "/products/poye-substation-monitoring",
  },
  {
    id: "agent",
    title: "主动 AI 智能体",
    subtitle: "Proactive Agents",
    icon: "bot",
    accent: "ocean",
    description: "虚拟值守同事主动汇报、语音交互、跟进闭环，成为业务一线的智能协作者。",
    tags: ["主动汇报", "人在回路"],
    href: "/products/proactive-ai-agent",
  },
  {
    id: "digital-twin",
    title: "数字孪生",
    subtitle: "Digital Twin",
    icon: "layers",
    accent: "indigo",
    description: "构建设备、场站与区域的数字孪生体，告警在三维场景中直接定位，状态可视、过程可溯。",
    tags: ["三维可视化", "仿真推演"],
    href: "/capabilities#digital-twin",
  },
  {
    id: "multimodal",
    title: "多模态感知",
    subtitle: "Multimodal Perception",
    icon: "eye",
    accent: "teal",
    description: "融合可见光、红外、高光谱、声学、气体与雷达数据，让机器“看得清、听得懂”。",
    tags: ["视觉", "声学", "雷达"],
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
    description: "语音一句话办理后勤业务，确认卡把关、MCP 工具闭环，首个试点为访客到访预约。",
    tags: ["语音办理", "MCP"],
    href: "/products/smart-logistics-assistant",
  },
  {
    id: "iiot-security",
    title: "网络与数据安全",
    subtitle: "Cyber & Data Security",
    icon: "shield",
    accent: "ocean",
    description: "统一身份认证、数据加密与全程审计、大模型安全护栏，以及面向工业物联网的数字孪生主动防御。",
    tags: ["可信 AI", "主动防御"],
    href: "/capabilities#security",
  },
];
