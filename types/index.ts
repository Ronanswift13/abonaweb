/**
 * 全站内容数据类型定义
 *
 * 约定：
 * - 所有对外展示的文案都放在 data/*.ts（结构化数据）或 content/**.md（新闻、案例正文）中，
 *   组件只负责展示，不写死业务文案。
 * - 图标统一使用 IconName（字符串），由 components/ui/Icon.tsx 映射为 lucide-react 图标，
 *   因此数据文件保持可序列化，后续可平滑迁移到 JSON / CMS（V2.0）。
 */

/* ------------------------------------------------------------------ */
/* 通用                                                                */
/* ------------------------------------------------------------------ */

/** 可用图标名称；新增图标时需同步在 components/ui/Icon.tsx 中注册 */
export type IconName =
  | "brain"
  | "bot"
  | "radar"
  | "scan"
  | "zap"
  | "layers"
  | "network"
  | "eye"
  | "shield"
  | "cpu"
  | "factory"
  | "building"
  | "sparkles"
  | "rocket"
  | "target"
  | "users"
  | "handshake"
  | "lightbulb"
  | "gauge"
  | "message"
  | "briefcase"
  | "compass"
  | "newspaper"
  | "phone"
  | "wechat"
  | "mail"
  | "map"
  | "globe"
  | "clock"
  // 监测插件 / 技术方案
  | "toggle"
  | "cable"
  | "battery"
  | "thermometer"
  | "flame"
  | "rainbow"
  | "bird"
  | "paw"
  | "hardhat"
  | "waveform"
  | "wind"
  | "server"
  | "workflow"
  | "merge"
  | "fence"
  | "route"
  | "puzzle"
  | "history"
  | "database"
  | "mic"
  | "volume"
  | "checklist"
  // 安全
  | "lock"
  | "key"
  | "fingerprint"
  | "usercheck"
  | "filecheck";

/** 链接（站内路由以 "/" 开头；外链/电话以 http、tel:、mailto: 开头） */
export interface LinkItem {
  label: string;
  href: string;
}

/** 卡片主题色：对应 ProductCard / BusinessCard 的渐变配色 */
export type Accent = "sky" | "cyan" | "ocean" | "indigo" | "teal";

/** 区块标题（首页及子页面各 Section 共用） */
export interface SectionIntro {
  /** 英文小标题，如 "CORE PRODUCTS" */
  eyebrow: string;
  title: string;
  description?: string;
}

/* ------------------------------------------------------------------ */
/* 站点 / 公司信息                                                      */
/* ------------------------------------------------------------------ */

export interface ContactPerson {
  name: string;
  /** 职务（可选，未确认前留空） */
  title?: string;
  phone: string;
  wechat: string;
  /** 微信二维码图片（public/ 下路径，建议 400×400 以上正方形）；未设置时不显示 */
  wechatQr?: string;
  email?: string;
}

export interface SiteConfig {
  /** 公司中文全称 */
  name: string;
  /** 导航栏等空间有限处的简称 */
  shortName: string;
  /** 公司英文名称 */
  nameEn: string;
  /** 品牌 / 大模型英文名 */
  brand: string;
  /** 正式访问地址（无结尾斜杠），用于 SEO、sitemap、canonical */
  url: string;
  domain: string;
  /** 默认 SEO 描述 */
  description: string;
  keywords: string[];
  logo: {
    src: string;
    /** 原始图片尺寸，用于 next/image 计算比例 */
    width: number;
    height: number;
    alt: string;
  };
  /** 社交分享图（1200×630，由 npm run og:generate 生成） */
  ogImage: {
    /** public/ 下的路径，字段名与 Next.js OGImage 一致 */
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  contact: ContactPerson;
  /** 办公地址（未确认前可留空，留空时页面自动隐藏） */
  address?: string;
  /** 工作时间 */
  serviceHours?: string;
  /** 备案信息 */
  icp: {
    /** ICP 备案号，例如 "京ICP备XXXXXXXX号-1" */
    record: string;
    /** 公安联网备案号（可选） */
    police?: string;
  };
  /** 版权起始年份 */
  foundedYear: number;
}

export interface NavItem extends LinkItem {
  /** 是否为外部链接 */
  external?: boolean;
}

export interface FooterColumn {
  title: string;
  links: LinkItem[];
}

/* ------------------------------------------------------------------ */
/* 首页                                                                */
/* ------------------------------------------------------------------ */

export interface HeroHighlight {
  value: string;
  label: string;
}

export interface HeroDemoMessage {
  role: "user" | "assistant";
  text: string;
}

export interface HeroContent {
  /** 顶部徽标文案 */
  badge: string;
  /** 主标题（公司全称） */
  title: string;
  /** 大模型介绍行：名称 + 一句话 */
  model: {
    name: string;
    nameEn: string;
    tagline: string;
  };
  /** 企业定位 / 价值主张 */
  description: string;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  highlights: HeroHighlight[];
  /** 右侧示意面板（模拟对话） */
  demo: {
    title: string;
    status: string;
    messages: HeroDemoMessage[];
    chips: string[];
  };
}

export interface CtaContent {
  eyebrow: string;
  title: string;
  description: string;
  primary: LinkItem;
  secondary: LinkItem;
  /** 联系卡片标题 */
  contactTitle: string;
}

export interface HomeContent {
  hero: HeroContent;
  products: SectionIntro;
  business: SectionIntro;
  casesNews: {
    cases: SectionIntro & { more: LinkItem };
    news: SectionIntro & { more: LinkItem };
  };
  culture: SectionIntro;
  team: SectionIntro & { more: LinkItem };
  cta: CtaContent;
}

/* ------------------------------------------------------------------ */
/* 产品 / 业务 / 能力                                                   */
/* ------------------------------------------------------------------ */

export interface Feature {
  title: string;
  description: string;
  icon?: IconName;
}

/** 产品关键数据（详情页顶部数字条） */
export interface ProductStat {
  value: string;
  label: string;
}

/** 技术架构中的一层 */
export interface ArchitectureLayer {
  name: string;
  description: string;
  items: string[];
}

/** 插件部署场景 */
export type PluginScene = "室外" | "室内" | "移动作业" | "二次设备" | "全站";

/** 监测插件（详情页“插件矩阵”中的一张卡片；id 同时作为锚点 #plugin-{id}） */
export interface MonitoringPlugin {
  id: string;
  name: string;
  icon: IconName;
  scene: PluginScene;
  description: string;
  /** 关键技术标签（2–4 个） */
  techniques: string[];
}

/** 插件分组（按系统类别） */
export interface PluginGroup {
  /** 类别代号，如 "A" */
  code: string;
  title: string;
  description: string;
  plugins: MonitoringPlugin[];
}

export interface TechStackGroup {
  category: string;
  items: string[];
}

/** 核心产品（首页三列卡片 + /products/[slug] 详情页） */
export interface Product {
  slug: string;
  name: string;
  nameEn?: string;
  /** 卡片角标，如 "自研大模型" */
  tag: string;
  icon: IconName;
  accent: Accent;
  /** 卡片短描述（约 40–60 字） */
  summary: string;
  /** 详情页导语 */
  description: string;
  /** 卡片上展示的 2–3 个关键词 */
  keywords: string[];
  features: Feature[];
  scenarios: string[];
  /** 演示区说明（详情页 #demo 锚点） */
  demo?: {
    title: string;
    description: string;
  };

  /* ---- 技术方案（以下均为可选，有数据时详情页自动渲染对应区块） ---- */

  /** 关键数据 */
  stats?: ProductStat[];
  /** 关键数据的口径说明（如“内部冻结测试集”） */
  statsNote?: string;
  /** 技术架构（#architecture） */
  architecture?: { description: string; layers: ArchitectureLayer[] };
  /** 监测插件矩阵（#plugins） */
  plugins?: { description: string; groups: PluginGroup[]; note?: string };
  /** 关键技术（#technology） */
  technologies?: Feature[];
  /** 安全设计（#security） */
  security?: { description: string; items: Feature[] };
  /** 技术栈（#stack） */
  techStack?: TechStackGroup[];

  /** 是否在首页核心产品区展示 */
  featured: boolean;
  /** 排序，数字越小越靠前 */
  order: number;
}

/** 业务方向（首页滑动卡片） */
export interface BusinessDirection {
  id: string;
  title: string;
  /** 英文副标题 */
  subtitle: string;
  icon: IconName;
  accent: Accent;
  description: string;
  tags: string[];
  href: string;
}

/** 核心能力（/capabilities） */
export interface Capability {
  id: string;
  title: string;
  subtitle: string;
  icon: IconName;
  summary: string;
  points: string[];
}

/** 发展方向（/directions） */
export type Horizon = "近期" | "中期" | "远期";

export interface DevelopmentDirection {
  id: string;
  title: string;
  icon: IconName;
  horizon: Horizon;
  summary: string;
  focus: string[];
}

/* ------------------------------------------------------------------ */
/* 企业文化 / 团队 / 关于                                               */
/* ------------------------------------------------------------------ */

export interface CultureValue {
  title: string;
  subtitle: string;
  icon: IconName;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  /** 专长标签 */
  expertise: string[];
  /** 头像路径（public/ 下）；缺省时显示 initial */
  avatar?: string;
  /** 无头像时显示的字符，缺省为姓名首字 */
  initial?: string;
}

export interface AboutContent {
  intro: SectionIntro;
  /** 公司简介段落 */
  paragraphs: string[];
  mission: { title: string; text: string }[];
  milestones: { year: string; title: string; description: string }[];
}

export interface ContactPageContent {
  intro: SectionIntro;
  /** “获取解决方案”说明（/contact#solution） */
  solution: SectionIntro & { checklist: string[] };
  process: { title: string; description: string }[];
  note: string;
}

/* ------------------------------------------------------------------ */
/* Markdown 内容（content/news、content/cases）                         */
/* ------------------------------------------------------------------ */

/** 新闻 frontmatter 字段 */
export interface NewsMeta {
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  category: string;
  summary: string;
  /** 是否在列表中置顶/突出展示 */
  featured?: boolean;
}

export interface NewsArticle extends NewsMeta {
  /** Markdown 正文 */
  body: string;
}

/** 项目案例 frontmatter 字段 */
export interface CaseMeta {
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  industry: string;
  /** 客户名称（未授权公开时使用"某省级电网公司"等表述） */
  client: string;
  summary: string;
  icon: IconName;
  accent: Accent;
  /** 关联产品 slug */
  products: string[];
  /** 成果要点 */
  results: string[];
  featured?: boolean;
}

export interface CaseStudy extends CaseMeta {
  body: string;
}

/* ------------------------------------------------------------------ */
/* 站内搜索                                                             */
/* ------------------------------------------------------------------ */

export interface SearchEntry {
  title: string;
  description: string;
  href: string;
  /** 结果分组，如 "产品"、"案例"、"新闻" */
  type: string;
}
