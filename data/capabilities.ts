import type { Capability, SectionIntro } from "@/types";

export const capabilitiesIntro: SectionIntro = {
  eyebrow: "CAPABILITIES",
  title: "核心能力",
  description: "以大模型为中枢，打通感知、认知、决策与执行，并以贯穿全链路的安全设计，构建面向行业场景的全栈 AI 能力。",
};

/**
 * 核心能力（/capabilities）
 * id 同时作为页面锚点，如 /capabilities#digital-twin
 * 要点依据公司研发项目（破夜绘明 DarkBreaker、主动 AI 值守交互系统、智慧后勤 AI 助手）的技术方案整理。
 */
export const capabilities: Capability[] = [
  {
    id: "llm",
    title: "大模型与知识工程",
    subtitle: "Large Language Model",
    icon: "brain",
    summary: "自研「艾博纳幺儿」行业大模型，结合规则库、意图模型与检索增强，让 AI 懂行业、可追溯、不编造。",
    points: [
      "行业语料构建与持续训练",
      "检索增强与引用溯源",
      "意图识别与结构化槽位抽取",
      "术语规则库与口语归一",
      "大模型输出落地校验",
      "私有化 / 国产化部署",
    ],
  },
  {
    id: "agent",
    title: "主动 AI 与智能体",
    subtitle: "Proactive AI Agent",
    icon: "bot",
    summary: "让 AI 从被动问答走向主动服务：主动汇报、语音交互、工具调用，关键操作始终由人确认。",
    points: [
      "事件驱动的主动汇报",
      "可解释优先级排序",
      "状态机与确认门编排",
      "MCP 标准化工具调用",
      "本地离线语音识别与合成",
      "角色感知与人在回路",
    ],
  },
  {
    id: "digital-twin",
    title: "数字孪生",
    subtitle: "Digital Twin",
    icon: "layers",
    summary: "构建设备、场站与区域的数字映射，让告警在三维场景中“看得见、找得到”，支撑远程巡视与协同处置。",
    points: ["三维场景建模（Three.js / WebGL）", "实时数据驱动的孪生体", "布局与告警归因同源", "区域多站态势逐级下钻"],
  },
  {
    id: "multimodal",
    title: "多模态感知",
    subtitle: "Multimodal Perception",
    icon: "eye",
    summary: "融合可见光、红外、高光谱、声学、气体与雷达数据，在复杂环境下实现稳定、可解释的感知识别。",
    points: [
      "YOLOv8 / ViT 缺陷检测与关键点识别",
      "DeepSORT / ByteTrack 多目标跟踪",
      "红外辐射测温与高光谱分析",
      "声学与气体时序异常检测",
      "激光雷达 / 毫米波雷达空间感知",
      "输入质量门与多源时空融合",
    ],
  },
  {
    id: "energy",
    title: "电力能源智能化",
    subtitle: "Smart Energy",
    icon: "zap",
    summary: "深耕电力能源场景，将 AI 能力落地到设备巡视、安全管控、二次运维与经营决策全流程。",
    points: [
      "变电站插件化智能监测",
      "设备状态评估与检修辅助",
      "作业安全管控与违章识别",
      "二次设备动作事件智能运维",
      "现场验收契约与证据链",
      "运维知识沉淀与复用",
    ],
  },
  {
    id: "security",
    title: "网络与数据安全",
    subtitle: "Cyber & Data Security",
    icon: "shield",
    summary:
      "把安全设计融入每一个产品：身份可信、数据加密、过程留痕、模型受控，并面向工业物联网探索数字孪生驱动的主动防御。",
    points: [
      "OIDC / JWT 统一身份认证与最小权限",
      "HMAC 签名会话、CSRF 防护与安全响应头",
      "敏感数据日志掩码与 AES-256-GCM 加密",
      "全程审计与业务同事务提交",
      "大模型提示注入拦截与结构化输出契约",
      "运行档位隔离与设备按站点授权",
      "构建溯源与不可变证据链",
      "工业物联网数字孪生诱饵主动防御",
    ],
  },
];
