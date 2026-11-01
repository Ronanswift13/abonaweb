import type { HomeContent } from "@/types";

/**
 * 首页文案
 * 区块顺序见 app/page.tsx。title 和 say 里的竖线是允许换行的位置。
 */
export const home: HomeContent = {
  hero: {
    title: "具备自主AI功能的|变电站巡视平台",
    description: "破夜绘明监测站内设备，自主AI交互系统把告警用语音报给值守人员，智慧后勤 AI 助手先从访客预约做起。",
    action: { label: "看巡视演示视频", href: "/products/poye-substation-monitoring#demo" },
    video: { src: "/videos/twin-orbit.mp4", poster: "/videos/twin-orbit.jpg" },
    label: "破夜绘明的三维变电站模型，镜头绕站区缓慢旋转",
  },

  scenes: {
    poye: {
      title: "破夜绘明变电站监测平台",
      say: "平台基于自研模型|深度学习，|代替人工过滤",
      body: "通过20 个自主AI监视插件本地部署实现实时告警，节省人工复核成本，且每条告警原图及相关信息保留90天以上。",
      action: { label: "看 20 个插件", href: "/products/poye-substation-monitoring#plugins" },
    },
    agent: {
      title: "自主AI交互系统",
      say: "基于“幺儿”模型的|主动智能体",
      body: "平台汇报由虚拟同事“幺儿”用语音交互，遇到紧急事件会主动电话通知负责人员并告知事件原因、位置、依据和执行建议。",
      action: { label: "看值守演示视频", href: "/products/proactive-ai-agent#demo" },
    },
    logistics: {
      title: "智慧后勤 AI 助手",
      say: "一体化、高安全、|可扩展的智慧后勤|AI 助手应用平台",
      body: "说一句话发起访客预约。助手转成标准时间，生成确认卡，本人点确认后才提交业务系统。",
      action: { label: "看办理流程", href: "/products/smart-logistics-assistant#screens" },
    },
    yaoer: {
      title: "艾博纳幺儿",
      say: "自研大模型平台|依据用户需求|自动调用|最适合用户的Agent。",
      body: "艾博纳自研大模型，可部署内网，时刻保证用户数据安全。",
      action: { label: "看模型说明", href: "/products/abonayaoer" },
    },
    plan: {
      title: "元隐空轴|智慧测绘计划",
      body: "结合卫星、无人机和地面测量掌握新能源场站的物理状态，同时梳理关键信息系统的网络资产。",
      action: { label: "看推进计划", href: "/directions/yuanyin-kongzhou" },
    },
  },

  casesNews: {
    cases: {
      title: "项目案例",
      more: { label: "全部案例", href: "/cases" },
    },
    news: {
      title: "新闻动态",
      more: { label: "更多新闻", href: "/news" },
    },
  },

  team: {
    title: "核心团队",
    more: { label: "公司介绍", href: "/about" },
  },
};
