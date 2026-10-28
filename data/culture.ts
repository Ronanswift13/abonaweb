import type { CultureValue } from "@/types";

/**
 * 做事的规矩（首页左栏 + 关于我们页）
 * 每条都对应产品里已经实现的机制，subtitle 写出处（显示为“出处：…”），不写口号。
 */
export const cultureValues: CultureValue[] = [
  {
    title: "没有数据，就说没有",
    subtitle: "破夜绘明 · 运行档位与数据真实性约束",
    icon: "filecheck",
    description:
      "传感器没接上时，平台返回「不可用」，不会自己编一个读数；演示用的合成数据从头到尾带着标记，进不了正式告警。",
  },
  {
    title: "读不准，就交给人",
    subtitle: "破夜绘明 · 表计读数插件",
    icon: "gauge",
    description: "表计置信度不够、量程方向看不清时，插件把这一项标成「未识别」交人工确认，不猜一个值出来。",
  },
  {
    title: "按钮由人来按",
    subtitle: "主动 AI 智能体 · 智慧后勤 AI 助手",
    icon: "usercheck",
    description:
      "智能体可以拟工单、提建议，但自动执行权限在代码里锁定为关闭；访客预约必须由申请人在确认卡上点了确认，才会调用业务接口。",
  },
  {
    title: "没验收的，标出来",
    subtitle: "破夜绘明 · 模型分阶段晋级",
    icon: "checklist",
    description:
      "新模型按候选、影子、验收、生效四步上线，影子期只推理、不告警；还没通过现场验收的能力，在系统界面和这个网站上都直接注明。",
  },
];
