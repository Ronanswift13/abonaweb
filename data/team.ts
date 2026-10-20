import type { TeamMember } from "@/types";

/**
 * 核心团队
 * 【占位】以下均为示例成员，请替换为经本人同意公开的真实信息。
 * 头像：将图片放入 public/images/team/，并填写 avatar: "/images/team/xxx.jpg"；
 * 未提供头像时自动显示姓名首字。
 */
export const team: TeamMember[] = [
  {
    id: "member-1",
    name: "团队成员 A",
    initial: "A",
    title: "首席技术官",
    bio: "负责公司技术战略与大模型研发体系建设，长期从事人工智能与工业软件研究。",
    expertise: ["大模型", "技术架构"],
  },
  {
    id: "member-2",
    name: "团队成员 B",
    initial: "B",
    title: "电力行业专家",
    bio: "深耕电力系统运维与智能化改造，主导变电站监测类项目的方案设计与落地。",
    expertise: ["电力系统", "智能运维"],
  },
  {
    id: "member-3",
    name: "团队成员 C",
    initial: "C",
    title: "算法负责人",
    bio: "专注多模态感知与计算机视觉，负责缺陷识别、图像增强等核心算法研发。",
    expertise: ["计算机视觉", "多模态"],
  },
  {
    id: "member-4",
    name: "团队成员 D",
    initial: "D",
    title: "产品与交付负责人",
    bio: "负责产品规划与项目交付管理，推动技术成果在客户现场稳定运行。",
    expertise: ["产品管理", "项目交付"],
  },
];
