import type { TeamMember } from "@/types";

/**
 * 核心团队
 * 【占位】以下均为示例成员，请替换为经本人同意公开的真实信息。
 * 证件照：本地开发时打开成员简介，点「上传证件照」。
 * 图片会保存到 public/images/team/，并写入对应成员的 avatar。
 * 也可以直接把图片放进该目录，再写 avatar: "/images/team/xxx.jpg"。
 * 未提供头像时显示姓名首字。
 * 教育经历、工作经历、科研项目、代表性成果有真实内容再写，空着的栏目不展示。
 */
export const team: TeamMember[] = [
  {
    id: "member-1",
    name: "罗近一",
    initial: "罗",
    gender: "男",
    title: "首席技术官",
    avatar: "/images/team/member-1.jpg",
    avatarPosition: "center 42%",
    bio: "负责公司技术战略与大模型研发体系建设，长期从事人工智能与工业软件研究。",
    expertise: ["大模型", "技术架构"],
    education: [{ org: "北京科技大学", title: "博士" }],
  },
  {
    id: "member-2",
    name: "罗近一",
    initial: "罗",
    title: "电力行业专家",
    bio: "从事电力系统运维与改造，负责变电站监测项目的方案设计和实施。",
    expertise: ["电力系统", "智能运维"],
  },
  {
    id: "member-3",
    name: "罗近一",
    initial: "罗",
    title: "算法负责人",
    bio: "负责计算机视觉和多源感知方向的算法研发，包括缺陷识别和图像增强。",
    expertise: ["计算机视觉", "多模态"],
  },
  {
    id: "member-4",
    name: "罗近一",
    initial: "罗",
    title: "产品与交付负责人",
    bio: "负责产品规划和项目交付管理。",
    expertise: ["产品管理", "项目交付"],
  },
];
