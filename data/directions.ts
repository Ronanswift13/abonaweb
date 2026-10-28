import type { DevelopmentDirection, Horizon, SectionIntro } from "@/types";

export const directionsIntro: SectionIntro = {
  eyebrow: "ROADMAP",
  title: "发展方向",
  description:
    "接下来的顺序是：先让三套在研系统在真实现场通过验收，再把重复的部分抽成共用组件，最后才往相近的场景复制。「元隐空轴智慧测绘计划」是更长线的投入。",
};

/** 时间维度说明（页面按此顺序分组展示） */
export const horizons: { key: Horizon; label: string; description: string }[] = [
  { key: "近期", label: "近期 · 先过现场验收", description: "每个产品至少在一个真实现场完成验收，拿到可以公开的数据。" },
  { key: "中期", label: "中期 · 抽出共用部分", description: "三套系统里各写了一遍的认证、审计、工具调用和孪生，收拢成共用组件。" },
  { key: "远期", label: "远期 · 复制到相近场景", description: "在验收过的场景基础上，扩展到新能源场站、园区和更多后勤业务。" },
];

/** 发展规划依据当前研发项目进展整理；对外发布前请按公司战略口径确认 */
export const directions: DevelopmentDirection[] = [
  {
    id: "llm-industry",
    title: "行业大模型深化",
    icon: "brain",
    horizon: "近期",
    summary: "把「艾博纳幺儿」的行业评测做完：先公开评测方法和结果，再谈更多使用场景。",
    focus: ["电力规程问答评测集", "回答附引用出处", "内网部署包"],
  },
  {
    id: "substation",
    title: "变电站智能监测规模化",
    icon: "radar",
    horizon: "近期",
    summary: "先让开关状态、热成像测温、室内围栏三条链路用真实现场数据通过七维验收，其余插件按同一套标准排队验收。",
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
    summary: "在客户的移动办公 App 里完成真机联调和第三方测试，再做 4 周试点：第 1 周先测不少于 30 次人工填写用时作为基线，后 3 周用审计数据算助手的一单用时，目标是缩短 40% 以上。",
    focus: ["真机联调", "第三方测试", "一单用时实测"],
  },
  {
    id: "agent-platform",
    title: "主动 AI 智能体平台",
    icon: "workflow",
    horizon: "中期",
    summary: "把三套系统里各写了一遍的工具调用、确认门和审计抽成共用组件，新场景不用从头搭。",
    focus: ["MCP 工具注册与权限", "确认门组件", "统一审计"],
  },
  {
    id: "digital-twin",
    title: "数字孪生与工业物联网",
    icon: "layers",
    horizon: "中期",
    summary: "用现场测绘替换现在的默认布局，让孪生里的每台设备和站内实物一一对应。",
    focus: ["现场测绘与位置绑定", "场站级建模", "预测性维护（研究）"],
  },
  {
    id: "fusion-learning",
    title: "多模态融合诊断学习化",
    icon: "merge",
    horizon: "中期",
    summary: "多源融合目前靠规则。攒够时间同步的多源数据后，再按影子运行、分阶段晋级的方式试学习型融合模型。",
    focus: ["多源时间同步数据集", "影子运行与分阶段晋级", "融合诊断可解释性"],
  },
  {
    id: "security",
    title: "可信 AI 与网络安全",
    icon: "shield",
    horizon: "中期",
    summary: "把各产品里重复实现的认证、加密、审计和大模型护栏收拢成一套，新产品直接复用；工业物联网诱饵防御继续作为研究课题。",
    focus: ["统一身份与最小权限", "大模型输出限制", "诱饵防御（研究）"],
  },
  {
    id: "smart-services",
    title: "智慧后勤与企业服务",
    icon: "building",
    horizon: "远期",
    summary: "访客预约验收之后，按同样的确认卡和工具调用方式扩展到会务、报修和餐饮预订。",
    focus: ["会务", "报修", "餐饮预订"],
  },
  {
    id: "ecosystem",
    title: "开放生态与合作",
    icon: "handshake",
    horizon: "远期",
    summary: "和高校、研究所合作做需要长期投入的课题，比如工业物联网主动防御；找能一起交付现场项目的合作伙伴。",
    focus: ["联合课题", "现场交付伙伴"],
  },
];
