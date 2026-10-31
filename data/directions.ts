import type { DevelopmentDirection, Horizon, SectionIntro } from "@/types";

export const directionsIntro: SectionIntro = {
  title: "发展方向",
  description:
    "公司近期以现场验收为重点，中期整合各产品的共用组件，远期向相近场景扩展。「元隐空轴智慧测绘计划」为长期投入方向。",
};

/** 时间维度说明（页面按此顺序分组展示） */
export const horizons: { key: Horizon; label: string; description: string }[] = [
  { key: "近期", label: "近期", description: "各产品完成真实现场验收。" },
  { key: "中期", label: "中期", description: "整合认证、审计、工具调用和数字孪生等共用组件。" },
  { key: "远期", label: "远期", description: "向新能源场站、园区和其他后勤业务扩展。" },
];

/** 发展规划依据当前研发项目进展整理；对外发布前请按公司战略口径确认 */
export const directions: DevelopmentDirection[] = [
  {
    id: "llm-industry",
    title: "行业大模型深化",
    icon: "brain",
    horizon: "近期",
    summary: "完成「艾博纳幺儿」的行业评测，并公开评测方法和结果。",
    focus: ["电力规程问答评测集", "回答附引用出处", "内网部署包"],
  },
  {
    id: "substation",
    title: "变电站智能监测规模化",
    icon: "radar",
    horizon: "近期",
    summary: "开关状态、热成像测温、室内围栏三条链路使用现场数据完成七维验收，其余插件按同一标准依次验收。",
    focus: ["现场数据采集与标定", "缺陷样本库", "对接站内既有运维系统"],
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
    summary: "在客户移动办公 App 中完成真机联调和第三方测试，随后开展 4 周试点。第 1 周记录不少于 30 次人工填写用时作为基线，后 3 周根据审计数据统计助手的单笔用时，目标是缩短 40% 以上。",
    focus: ["真机联调", "第三方测试", "单笔用时实测"],
  },
  {
    id: "agent-platform",
    title: "主动 AI 智能体平台",
    icon: "workflow",
    horizon: "中期",
    summary: "将三套系统中重复实现的工具调用、确认门和审计整合为共用组件。",
    focus: ["MCP 工具注册与权限", "确认门组件", "统一审计"],
  },
  {
    id: "digital-twin",
    title: "数字孪生与工业物联网",
    icon: "layers",
    horizon: "中期",
    summary: "使用现场测绘数据替换默认布局，使孪生场景中的设备位置与现场一致。",
    focus: ["现场测绘与位置绑定", "场站级建模", "预测性维护（研究）"],
  },
  {
    id: "fusion-learning",
    title: "多模态融合诊断学习化",
    icon: "merge",
    horizon: "中期",
    summary: "多源融合目前基于规则。积累足够的时间同步多源数据后，按影子运行、分阶段晋级的方式试用学习型融合模型。",
    focus: ["多源时间同步数据集", "影子运行与分阶段晋级", "融合诊断可解释性"],
  },
  {
    id: "security",
    title: "可信 AI 与网络安全",
    icon: "shield",
    horizon: "中期",
    summary: "整合各产品中重复实现的认证、加密、审计和大模型限制措施。工业物联网诱饵防御继续作为研究课题。",
    focus: ["统一身份与最小权限", "大模型输出限制", "诱饵防御（研究）"],
  },
  {
    id: "smart-services",
    title: "智慧后勤与企业服务",
    icon: "building",
    horizon: "远期",
    summary: "访客预约验收后，采用相同的确认卡和工具调用方式扩展到会务、报修和餐饮预订。",
    focus: ["会务", "报修", "餐饮预订"],
  },
  {
    id: "ecosystem",
    title: "开放生态与合作",
    icon: "handshake",
    horizon: "远期",
    summary: "与高校和研究机构合作开展工业物联网主动防御等长期课题，并与合作伙伴共同承担现场交付。",
    focus: ["联合课题", "现场交付伙伴"],
  },
];
