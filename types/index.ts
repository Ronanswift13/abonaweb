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
  | "filecheck"
  // 发展计划（空天地 / 行业接口）
  | "satellite"
  | "drone"
  | "car"
  | "radiotower"
  | "eyeoff"
  | "axis"
  | "ban"
  | "landmark"
  | "flag"
  // 产品演示（界面截图 / 现场实拍 / 交互闭环）
  | "monitor"
  | "camera"
  | "repeat"
  | "play";

/** 链接（站内路由以 "/" 开头；外链/电话以 http、tel:、mailto: 开头） */
export interface LinkItem {
  label: string;
  href: string;
}

/** 卡片主题色：对应 ProductCard / BusinessCard 的渐变配色 */
export type Accent = "sky" | "cyan" | "ocean" | "indigo" | "teal";

/** 区块标题（首页及子页面各 Section 共用） */
export interface SectionIntro {
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

export interface HeroContent {
  /** 主标题（公司全称） */
  title: string;
  /** 公司做什么，一段话 */
  description: string;
  primaryCta: LinkItem;
  secondaryCta: LinkItem;
  /** 右侧真实产品截图（title 作为图注标题） */
  visual: ProductImage;
}

export interface CtaContent {
  title: string;
  description: string;
  primary: LinkItem;
  secondary: LinkItem;
}

export interface HomeContent {
  hero: HeroContent;
  products: SectionIntro;
  business: SectionIntro;
  casesNews: {
    cases: SectionIntro & { more: LinkItem };
    news: SectionIntro & { more: LinkItem };
  };
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

/** 产品图片（界面截图 / 现场实拍）；src 为 public/ 下路径，宽高为原图像素，供 next/image 计算比例 */
export interface ProductImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** 标签页名 / 图注标题 */
  title: string;
  caption?: string;
}

/** 演示视频（public 下的路径或完整 URL） */
export interface ProductVideo {
  src: string;
  /** 封面图，建议与视频同为 16:9 */
  poster?: string;
}

/** 界面展示：desktop 为标签切换的大屏截图；phone 为按操作步骤并排的手机界面 */
export interface ProductScreens {
  device: "desktop" | "phone";
  description?: string;
  items: ProductImage[];
  note?: string;
}

/** 现场实拍；plugin 为承接该环节的监测插件 id（链接到 #plugin-{id}） */
export interface FieldPhoto extends ProductImage {
  plugin?: string;
}

/** 交互流程中的一步 */
export interface FlowStep {
  title: string;
  description: string;
  icon: IconName;
  /** 执行方：系统自动完成，或需要值守人员操作（图中以不同样式区分，体现人在回路） */
  actor: "system" | "human";
  /** 要点短标签（2–4 个） */
  points?: string[];
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
  /** 卡片上的“现在做到哪一步”：一句话写清已完成什么、还差什么 */
  status: string;
  features: Feature[];
  scenarios: string[];
  /** 演示区说明（详情页 #demo 锚点） */
  demo?: {
    title: string;
    description: string;
    /** 演示视频；不填则显示“预约演示”占位卡 */
    video?: ProductVideo;
  };

  /* ---- 产品演示素材（可选，有数据时详情页自动渲染对应区块） ---- */

  /** 界面展示（#screens） */
  screens?: ProductScreens;
  /** 数字孪生示意（#twin）：循环播放的无声演示 + 逐级下钻步骤 */
  twin?: { description: string; video: ProductVideo; steps: Feature[]; note?: string };
  /** 现场实拍（#field） */
  field?: { description: string; items: FieldPhoto[]; note?: string };
  /** 交互流程闭环图（#flow） */
  flow?: {
    title: string;
    description: string;
    steps: FlowStep[];
    /** 末步回到首步的说明，如“进入下一轮汇报” */
    loop?: string;
    /** 贯穿全流程的护栏 */
    guardrails?: Feature[];
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

/** 业务方向（首页） */
export interface BusinessDirection {
  id: string;
  title: string;
  description: string;
  href: string;
}

/** 核心能力（/capabilities） */
export interface Capability {
  id: string;
  title: string;
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
/* 发展计划（/directions/<slug>，单独详细介绍的重点计划）               */
/* ------------------------------------------------------------------ */

/** 通用表格：每行与 columns 一一对应，首列作为行标题 */
export interface PlanTable {
  columns: string[];
  rows: string[][];
}

export interface PlanStep {
  title: string;
  description: string;
  /** 补充说明（如策略），以弱化样式显示 */
  note?: string;
}

/** 计划名称释义（空 / 轴 / 稳网 / 元 / 隐 / 测绘） */
export interface PlanTerm {
  term: string;
  /** 所属分计划，如 "空轴稳网" */
  group: string;
  description: string;
}

/** 技术线 */
export interface PlanTrack {
  id: string;
  title: string;
  subtitle: string;
  icon: IconName;
  goal: string;
  /** 分层观测（如天基 / 空基 / 地基） */
  layers?: Feature[];
  /** 开发顺序或模块 */
  steps: PlanStep[];
  strategy: string[];
  /** 通栏展示（模块较多时） */
  wide?: boolean;
}

/** 分计划 */
export interface SubPlan {
  id: string;
  name: string;
  /** 领域，如 "能源" */
  domain: string;
  icon: IconName;
  summary: string;
  goals: string[];
  nonGoals: string[];
  table: { title: string; data: PlanTable };
  route: { title: string; steps: PlanStep[] };
  highlights: { title: string; items: string[]; note?: string }[];
  zones?: { title: string; description: string; data: PlanTable };
  note?: string;
}

export interface PlanPhase {
  name: string;
  period: string;
  content: string;
  /** 对应的国家政策窗口 */
  window: string;
}

export interface DevelopmentPlan {
  slug: string;
  name: string;
  subtitle: string;
  /** 计划发起说明（页头导语、首页 / 发展方向页推荐位） */
  statement: string;
  /** 计划简介（SEO 描述、新闻与搜索摘要） */
  summary: string;
  facts: { label: string; value: string }[];
  overview: {
    problem: string[];
    gaps: Feature[];
    conclusion: string;
    goals: { year: string; description: string }[];
  };
  terms: PlanTerm[];
  tracks: PlanTrack[];
  /** 大模型在计划中的角色与边界 */
  llmRoles: string[];
  subPlans: SubPlan[];
  fusion: { unit: string; chain: string[]; wording: string; governance: string[] };
  phases: PlanPhase[];
  firstPhase: { intro: string; steps: { days: string; content: string }[] };
  /** 复制阶段起按统一编号接入的行业接口 */
  interfaces: { intro: string; items: Feature[] };
  policies: PlanTable;
  acceptance: PlanTable;
  risks: PlanTable;
  outcomes: string[];
  /** 规划期内明确不做的事项 */
  boundaries: string[];
  /** 依托的公司现有产品与能力 */
  foundations: (Feature & { href: string })[];
}

/* ------------------------------------------------------------------ */
/* 团队 / 关于                                               */
/* ------------------------------------------------------------------ */

/** 简历中的一段经历。没有内容的栏目不渲染。 */
export interface TeamResumeEntry {
  /** 起止时间，如 2016–2020 */
  period?: string;
  /** 学历、职务或项目名称 */
  title: string;
  /** 学校或单位 */
  org?: string;
  detail?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  /** 专长。简历未另写研究方向时，用这一列 */
  expertise: string[];
  /** 宣传头像路径（public/ 下）。缺省时显示 initial */
  avatar?: string;
  /**
   * 卡片小图的裁切焦点，如 "center 42%"。
   * 简介里的大图始终完整显示，不按这个焦点裁切。
   */
  avatarPosition?: string;
  /** 无头像时显示的字符，缺省为姓名首字 */
  initial?: string;
  /** 性别。没有则不写入简历 */
  gender?: string;
  /** 所在单位。缺省为公司全称 */
  affiliation?: string;
  /** 研究方向。缺省时用 expertise */
  research?: string[];
  education?: TeamResumeEntry[];
  experience?: TeamResumeEntry[];
  projects?: TeamResumeEntry[];
  /** 论文、专利、标准等，一条写一项 */
  publications?: string[];
}

/** 架构中的一个部门或中心 */
export interface OrgUnit {
  name: string;
  /** 职责，一句话 */
  duty: string;
}

/** 总经理下设的一个体系 */
export interface OrgSystem {
  name: string;
  /** 这个体系在做什么，由下属部门的职责归纳，不另加范围 */
  summary: string;
  units: OrgUnit[];
}

/** 公司架构：董事会 → 总经理 → 若干并列体系 */
export interface Organization {
  intro: SectionIntro;
  board: { name: string; duty: string };
  executive: { name: string; duty: string };
  systems: OrgSystem[];
}

export interface AboutContent {
  intro: SectionIntro;
  /** 公司简介段落 */
  paragraphs: string[];
  mission: { title: string; text: string }[];
  milestones: { year: string; title: string; description: string }[];
  organization: Organization;
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
  /** 卡片封面图（public/ 下路径）；不填时显示行业与客户文字封面 */
  cover?: string;
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
