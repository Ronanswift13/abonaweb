import type { BusinessDirection } from "@/types";

/** 首页“业务方向”。新增一项即自动生成一个条目。 */
export const businessDirections: BusinessDirection[] = [
  {
    id: "substation",
    title: "变电站智能监测",
    description: "破夜绘明平台通过 20 个插件监测主变、开关、母线、表计、红外和气体等，现场精度按链路逐条验收。",
    href: "/products/poye-substation-monitoring",
  },
  {
    id: "agent",
    title: "主动 AI 智能体",
    description: "虚拟同事按优先级向值守人员语音汇报监测事件，包括对象、位置、依据和处置建议。",
    href: "/products/proactive-ai-agent",
  },
  {
    id: "logistics",
    title: "智慧后勤服务",
    description: "员工通过语音发起后勤申请，助手生成确认卡，本人确认后提交。首个业务为访客预约。",
    href: "/products/smart-logistics-assistant",
  },
  {
    id: "llm",
    title: "行业大模型",
    description: "自研行业大模型「艾博纳幺儿」，用于规程问答和报告起草，支持内网部署。已完成阶段性内部验证。",
    href: "/products/abonayaoer",
  },
  {
    id: "digital-twin",
    title: "数字孪生",
    description: "在三维场景中定位告警设备，支持从区域地图逐级进入单站、房间和机柜。当前使用默认站区布局。",
    href: "/capabilities#digital-twin",
  },
  {
    id: "multimodal",
    title: "多模态感知",
    description: "结合可见光、红外、激光雷达和毫米波雷达，在夜间和雨雾天气下保持监测。",
    href: "/capabilities#multimodal",
  },
  {
    id: "energy",
    title: "电力能源智能化",
    description: "覆盖变电站巡视、二次设备动作事件和作业违章识别。",
    href: "/capabilities#energy",
  },
  {
    id: "iiot-security",
    title: "网络与数据安全",
    description: "日志脱敏、语音转写后不留存、大模型仅连接内网地址。工业物联网诱饵防御处于研究阶段。",
    href: "/capabilities#security",
  },
  {
    id: "yuanyin-kongzhou",
    title: "元隐空轴智慧测绘",
    description: "结合卫星、无人机和地面测量掌握新能源场站的物理状态，同时梳理关键信息系统的网络资产。目前处于计划阶段。",
    href: "/directions/yuanyin-kongzhou",
  },
];
