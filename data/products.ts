import type { Product } from "@/types";

/**
 * 核心产品
 * - featured: true 的产品出现在首页“核心产品”三列卡片中（按 order 排序，建议保持 3 个）
 * - 每个产品自动生成详情页 /products/[slug]
 * 新增产品：在数组中追加一项即可，无需修改页面代码。
 */
export const products: Product[] = [
  {
    slug: "poye-substation-monitoring",
    name: "破夜绘明变电站监测平台",
    // nameEn: "", // 【占位】产品英文名确认后填写
    tag: "电力智能监测",
    icon: "radar",
    accent: "sky",
    summary:
      "面向变电站全天候运行场景，融合可见光、红外与声纹等多源感知，实现设备状态实时监测、缺陷智能识别与异常主动预警。",
    // 【占位】请根据产品实际能力完善详情描述与指标
    description:
      "破夜绘明变电站监测平台以“全天候、看得清、判得准”为目标，针对夜间、雨雾等低能见度条件下的变电站运行监测需求，融合多模态感知数据与行业知识，构建从数据采集、智能识别到告警处置的闭环监测体系，帮助运维团队降低巡检强度、提升风险发现效率。",
    keywords: ["全天候监测", "缺陷识别", "主动预警"],
    features: [
      {
        icon: "eye",
        title: "低照度增强与全天候感知",
        description: "针对夜间、逆光、雨雾等复杂环境进行图像增强，保障监测画面清晰可用。",
      },
      {
        icon: "scan",
        title: "设备缺陷智能识别",
        description: "覆盖表计读数、渗漏油、异物、发热等典型缺陷，自动定位并分级。",
      },
      {
        icon: "zap",
        title: "多源数据融合预警",
        description: "联合红外测温、声纹、在线监测数据比对历史基线，提前发现潜在风险。",
      },
      {
        icon: "layers",
        title: "数字孪生可视化",
        description: "以三维场景还原站内设备与告警位置，支撑远程巡视与协同处置。",
      },
    ],
    scenarios: ["变电站无人值守 / 少人值守", "夜间及恶劣天气巡视", "设备状态检修", "集控站远程监视"],
    demo: {
      title: "平台演示",
      description: "演示视频整理中。如需了解平台实际效果，欢迎联系我们预约线上演示或现场交流。",
    },
    featured: true,
    order: 1,
  },
  {
    slug: "abonayaoer",
    name: "艾博纳幺儿",
    nameEn: "Abonayaoer",
    tag: "自研大模型",
    icon: "brain",
    accent: "cyan",
    summary:
      "公司自研的行业大模型，深度融合电力能源与工业领域知识，支持知识问答、文档理解、数据分析与智能决策辅助，可私有化部署。",
    // 【占位】请补充模型参数规模、评测结果等经确认可公开的信息
    description:
      "「艾博纳幺儿」（Abonayaoer）是艾博纳自主研发的行业大模型。模型在通用语言能力基础上，持续注入电力能源、工业运维等专业知识，具备行业知识问答、规程文档理解、多模态数据分析与任务规划能力，并支持本地化、私有化部署，满足企业对数据安全与可控性的要求。",
    keywords: ["行业知识增强", "多模态理解", "私有化部署"],
    features: [
      {
        icon: "brain",
        title: "行业知识增强",
        description: "融合规程标准、设备台账与运维经验，回答更专业、更可追溯。",
      },
      {
        icon: "layers",
        title: "多模态理解",
        description: "统一理解文本、图像、表格与时序数据，支撑复杂业务分析。",
      },
      {
        icon: "network",
        title: "智能体任务编排",
        description: "调用业务系统与工具链，完成检索、分析、报告生成等多步骤任务。",
      },
      {
        icon: "shield",
        title: "安全可控部署",
        description: "支持私有化与国产化环境部署，数据不出域，权限可审计。",
      },
    ],
    scenarios: ["企业知识库问答", "运维规程与报告生成", "设备数据分析", "智能客服与后勤服务"],
    demo: {
      title: "模型演示",
      description: "在线体验入口建设中。欢迎联系我们获取演示账号或预约现场演示。",
    },
    featured: true,
    order: 2,
  },
  {
    slug: "proactive-ai-agent",
    name: "主动 AI 智能体",
    nameEn: "Proactive AI Agent",
    tag: "主动智能",
    icon: "bot",
    accent: "ocean",
    summary:
      "从“被动应答”走向“主动服务”：智能体持续感知业务状态，自动发现问题、规划任务并协同人员与系统完成处置。",
    // 【占位】可替换为“项目案例”入口或其他重点产品
    description:
      "主动 AI 智能体基于「艾博纳幺儿」大模型构建，能够持续感知业务数据与环境变化，在合适的时机主动提醒、建议与执行。它将感知、推理、规划与执行打通，适用于运维值守、后勤服务、企业办公等多类场景。",
    keywords: ["主动感知", "任务规划", "人机协同"],
    features: [
      {
        icon: "radar",
        title: "持续感知",
        description: "订阅业务事件与数据流，实时理解当前状态与上下文。",
      },
      {
        icon: "lightbulb",
        title: "主动建议",
        description: "在风险出现前给出提醒与处置建议，而非等待用户提问。",
      },
      {
        icon: "network",
        title: "工具与系统协同",
        description: "对接工单、消息、业务系统，自动完成多步骤任务。",
      },
      {
        icon: "users",
        title: "人在回路",
        description: "关键操作需人工确认，过程可追踪、可回溯。",
      },
    ],
    scenarios: ["运维值守助手", "后勤多场景服务", "企业办公助理", "园区智能管理"],
    demo: {
      title: "智能体演示",
      description: "演示内容整理中，欢迎联系我们了解定制方案。",
    },
    featured: true,
    order: 3,
  },
];
