# 北京艾博纳信息技术有限公司 · 官方网站

> Beijing Aibona Information Technology Co., Ltd. · **abonatech.com**
> 自研大模型「艾博纳幺儿」（Abonayaoer）

企业官网 V1.0 工程框架：**Next.js 16（App Router）+ TypeScript（strict）+ Tailwind CSS v3**，内容与 UI 分离，支持 Docker / Docker Compose / Nginx 部署。

---

## 1. 快速开始

环境要求：Node.js ≥ 20.9（推荐 22 / 24 LTS）

```bash
npm install
npm run dev        # http://localhost:3000
```

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 本地开发（热更新） |
| `npm run build` | 生产构建（输出 `.next/standalone`） |
| `npm run start` | 本地运行生产构建 |
| `npm run typecheck` | 生成路由类型并做 TypeScript 检查 |
| `npm run lint` | ESLint 检查 |
| `npm run check` | 类型检查 + Lint + 构建（提交 / 发布前执行） |
| `npm run og:generate` | 重新生成社交分享图 `public/images/og-default.png` |

国内网络安装依赖较慢时：`npm install --registry=https://registry.npmmirror.com`

---

## 2. 目录结构

```
.
├── app/                      # 路由（App Router）
│   ├── layout.tsx            # 全局布局：导航、页脚、SEO 元数据、组织结构化数据
│   ├── page.tsx              # 首页（区块顺序在这里调整）
│   ├── globals.css           # Tailwind 入口与全局样式
│   ├── capabilities/         # 核心能力
│   ├── products/             # 产品与解决方案 + [slug] 产品详情
│   ├── cases/                # 项目案例 + [slug] 案例详情
│   ├── directions/           # 发展方向
│   ├── news/                 # 新闻动态 + [slug] 新闻详情
│   ├── about/                # 关于我们
│   ├── contact/              # 联系我们（#solution 获取解决方案）
│   ├── search/               # 站内搜索
│   ├── api/health/           # 健康检查（Docker / 监控）
│   ├── sitemap.ts robots.ts  # 自动生成 sitemap.xml / robots.txt
│   ├── icon.png apple-icon.png  # 站点图标（由 Logo 生成）
│   ├── error.tsx global-error.tsx  # 出错兜底页
│   └── not-found.tsx         # 404
├── components/
│   ├── layout/               # Navbar、Footer
│   ├── sections/             # Hero、ProductSection、BusinessCarousel、CasesNewsSection、
│   │                         # CultureTeam、CTA、PageHeader、SearchResults
│   ├── cards/                # ProductCard、BusinessCard、CaseCard、NewsCard、TeamMemberCard
│   └── ui/                   # Button、Container、SectionHeading、Icon、Logo、ContactList …
├── data/                     # 结构化内容（TypeScript，类型见 types/）
│   ├── site.ts               # ★ 公司信息、联系方式、备案号、Logo
│   ├── navigation.ts         # 主导航、页脚链接
│   ├── home.ts               # 首页各区块文案（Hero、CTA …）
│   ├── products.ts           # 核心产品（自动生成详情页，含技术方案区块）
│   ├── plugins.ts            # 破夜绘明监测插件矩阵（20 个插件，按 A/B/C/D 四类分组）
│   ├── business.ts           # 业务方向轮播卡片
│   ├── capabilities.ts       # 核心能力
│   ├── directions.ts         # 发展方向
│   ├── culture.ts team.ts    # 企业文化、核心团队
│   └── about.ts              # 关于我们、联系我们页文案
├── content/                  # Markdown 内容（文件名即 URL）
│   ├── news/                 # 新闻 → /news/<文件名>
│   └── cases/                # 案例 → /cases/<文件名>
├── lib/                      # 内容读取（content.ts）、SEO、搜索索引、工具函数
├── types/index.ts            # 全部内容数据的 TypeScript 接口
├── public/images/            # Logo、团队头像等静态资源
├── scripts/                  # 辅助脚本（生成社交分享图）
├── deploy/nginx/conf.d/      # Nginx 反向代理配置
├── .github/workflows/        # CI（检查 + 构建）、Deploy（SSH 发布到生产），见第 5 节
├── Dockerfile  docker-compose.yml  .dockerignore  .env.example
└── tailwind.config.ts        # ★ 品牌色、渐变、阴影、动画等设计令牌
```

---

## 3. 内容修改指南

所有文案都在 `data/` 与 `content/` 中，**组件里不写死业务文案**。
所有待确认 / 待替换的占位内容都标记了 `【占位】`，一条命令即可列出：

```bash
grep -rn "【占位】" data content app components
```

| 想修改的内容 | 文件 |
| --- | --- |
| 公司名称、联系人、电话、微信、邮箱、地址、ICP 备案号 | `data/site.ts` |
| 导航栏 / 页脚链接 | `data/navigation.ts` |
| 首页 Hero、各区块标题、底部 CTA | `data/home.ts` |
| 核心产品（首页三张卡片 = `featured: true`，按 `order` 排序） | `data/products.ts` |
| 产品详情页技术方案（关键数据、技术架构、关键技术、安全设计、技术栈） | `data/products.ts` 中对应产品的可选字段 |
| 变电站监测插件矩阵（插件名称、描述、关键技术） | `data/plugins.ts` |
| 业务方向轮播卡片 | `data/business.ts` |
| 核心能力 / 发展方向 | `data/capabilities.ts` / `data/directions.ts` |
| 企业文化 / 核心团队 | `data/culture.ts` / `data/team.ts` |
| 关于我们、联系我们页 | `data/about.ts` |
| 品牌色、渐变、阴影、字体 | `tailwind.config.ts` |

### 新增一条新闻

在 `content/news/` 新建 `2026-11-xxx.md`（文件名即 URL：`/news/2026-11-xxx`）：

```markdown
---
title: 新闻标题
date: "2026-11-01"
category: 公司新闻
summary: 列表页与 SEO 使用的摘要
featured: false
---

正文使用 Markdown，支持 **加粗**、列表、表格、[链接](/contact) 等。
```

保存后首页“新闻动态”、新闻列表、sitemap、站内搜索会自动更新。缺少必填字段时构建会报错并指出文件名。

### 新增一个项目案例

在 `content/cases/` 新建 `.md` 文件，frontmatter 字段：

```yaml
title: 案例标题
date: "2026-11-01"
industry: 电力能源
client: 某省级电网公司          # 未获授权时不写真实客户名
summary: 摘要
icon: radar                    # 可选值见 types/index.ts → IconName
accent: sky                    # sky | cyan | ocean | indigo | teal
products: [poye-substation-monitoring]   # 关联产品 slug，可为空 []
results: [成果一, 成果二]
featured: true                 # 首页优先展示
```

### 新增一个产品 / 业务方向

在 `data/products.ts` 或 `data/business.ts` 数组中追加一项即可——卡片、详情页（`/products/<slug>`）、轮播指示点、sitemap 都会自动生成。

产品详情页的技术方案区块全部可选，填了才显示，页内导航自动同步：

| 字段 | 区块（锚点） |
| --- | --- |
| `stats` / `statsNote` | 页头关键数据条及口径说明 |
| `architecture` | 技术架构 `#architecture` |
| `plugins` | 监测插件矩阵 `#plugins`（每个插件另有 `#plugin-<id>`） |
| `technologies` | 关键技术 `#technology` |
| `security` | 安全设计 `#security` |
| `techStack` | 技术栈 `#stack` |

新增监测插件：在 `data/plugins.ts` 对应分组追加一项，产品页、插件总数（首页 Hero 等处引用）与站内搜索自动更新。

### 替换 Logo / 图标

- `public/images/logo.png`：由提供的红色 Logo 抠图生成的透明 PNG（338×256）。拿到矢量或高清源文件后直接覆盖，并同步 `data/site.ts` 中 `logo.width / height`。
- `app/icon.png`、`app/apple-icon.png`：浏览器标签页与 iOS 图标。
- `public/images/og-default.png`：微信 / 社交平台分享卡片图（1200×630）。更换 Logo、品牌色或公司名后执行 `npm run og:generate` 重新生成（需在装有中文字体的电脑上执行，文案在 `scripts/generate-og-image.mjs` 中修改）。

### 微信二维码

将二维码图片放入 `public/images/wechat-qr.png`（建议 400×400 以上正方形），在 `data/site.ts` 中取消 `wechatQr` 一行的注释。联系我们页与页脚会自动显示“微信扫码添加”。

### 新增图标

1. 在 `types/index.ts` 的 `IconName` 中添加名称
2. 在 `components/ui/Icon.tsx` 中注册对应的 [lucide-react](https://lucide.dev/icons) 图标

### 字体

为保证国内服务器构建与访问稳定，默认使用系统字体栈（苹方 / 微软雅黑 / 思源黑体等），不依赖 Google Fonts。如需统一字体，可将 Inter / 思源黑体字体文件放入项目，用 `next/font/local` 加载，并在 `tailwind.config.ts` 的 `fontFamily.sans` 前置。

---

## 4. 生产部署

阿里云 ECS 从域名解析、ICP备案、安全组、Docker 安装、证书到首次启动的完整操作见 **[deploy/ALIYUN.md](deploy/ALIYUN.md)**。首次上线建议按该手册逐项执行；下面保留日常部署速查。

### 4.1 Docker Compose（推荐）

```bash
cp .env.example .env            # 按需修改；国内服务器建议 NPM_REGISTRY=https://registry.npmmirror.com
docker compose up -d --build    # 网站监听 127.0.0.1:3000
docker compose ps               # STATUS 显示 healthy 即启动成功
```

### 4.2 启用 Nginx + HTTPS

1. 域名解析到服务器，申请证书，将 `fullchain.pem`、`privkey.pem` 放入 `deploy/nginx/certs/`（已在 `.gitignore` 中忽略）
2. 按实际域名修改 `deploy/nginx/conf.d/abona.conf`
3. 启动：

```bash
docker compose --profile nginx up -d --build
```

Nginx 负责：HTTP→HTTPS 跳转、裸域→www、反向代理、限流、HSTS、gzip、访问/错误日志（`deploy/nginx/logs/`）。应用端口默认仅监听本机，不直接暴露公网。

### 4.3 网站统计（可选）

支持百度统计：在 [tongji.baidu.com](https://tongji.baidu.com) 新建站点，取统计代码 `hm.js?` 后的 32 位字符串，写入服务器 `.env` 的 `NEXT_PUBLIC_BAIDU_TONGJI_ID` 后重新构建。未设置时不加载任何统计脚本；站内页面切换也会计入浏览量。

### 4.4 更新发布

日常发布使用 GitHub Actions（见第 5 节）。需要在服务器上手动更新时：

```bash
git pull
docker compose up -d --build    # 重新构建并滚动替换容器
```

### 4.5 上线前检查

- [ ] `data/site.ts`：ICP 备案号、地址、邮箱、成立年份等【占位】已替换
- [ ] 团队、案例、新闻等【占位】内容已替换或删除
- [ ] `NEXT_PUBLIC_SITE_URL` 为正式域名
- [ ] HTTPS 证书有效，HTTP 自动跳转
- [ ] `https://www.abonatech.com/sitemap.xml`、`/robots.txt` 可访问
- [ ] 分享图、微信二维码、百度统计按需配置

---

## 5. CI/CD（GitHub Actions）

| 工作流 | 触发 | 执行内容 |
| --- | --- | --- |
| `CI`（`.github/workflows/ci.yml`） | push / PR 到 `main` | Node 24：`npm ci` → `typecheck` → `lint` → `build` |
| `Deploy`（`.github/workflows/deploy.yml`） | 手动 Run workflow；或 `main` 的 CI 通过后自动（需开启 `AUTO_DEPLOY`） | 审批（如已配置）→ SSH 登录服务器 → `git` 快进到该提交 → `docker compose up -d --build` → 轮询 `http://127.0.0.1:3000/api/health` |

发布只接受 `main` 上 CI 已通过的提交；任一步失败即停止并在 Actions 中标红（健康检查失败时输出容器状态与最近日志）。构建失败时旧容器继续运行。

### 5.1 服务器准备（一次性）

1. 安装 Docker（含 Compose v2）、git、curl；准备一个属于 `docker` 组的发布用户
2. 以该用户将仓库 clone 到部署目录（如 `/opt/abona-website`），停留在 `main` 分支。私有仓库需在服务器生成密钥并添加到仓库 Settings → Deploy keys（只读），保证服务器能 `git fetch`
3. 在部署目录创建 `.env`（参考 `.env.example`）。国内服务器设置 `NPM_REGISTRY=https://registry.npmmirror.com`，并为 Docker 配置镜像加速以拉取 `node`、`nginx` 基础镜像
4. 手动执行一次 `docker compose up -d --build`，确认 `docker compose ps` 显示 healthy
5. 为 GitHub Actions 单独生成登录密钥，并把公钥加入发布用户的 `~/.ssh/authorized_keys`：

```bash
ssh-keygen -t ed25519 -N "" -C github-actions-deploy -f abona-deploy
```

### 5.2 仓库 Secrets 与变量

在仓库 Settings → Secrets and variables → Actions 中添加。服务器信息只放在这里，不写入代码：

| 名称 | 类型 | 说明 |
| --- | --- | --- |
| `DEPLOY_HOST` | Secret（必填） | 服务器公网 IP 或域名 |
| `DEPLOY_USER` | Secret（必填） | SSH 登录用户（需有 docker 权限） |
| `DEPLOY_SSH_KEY` | Secret（必填） | 私钥 `abona-deploy` 的完整内容 |
| `DEPLOY_PATH` | Secret（必填） | 服务器上的部署目录，如 `/opt/abona-website` |
| `DEPLOY_PORT` | Secret（可选） | SSH 端口，默认 `22` |
| `DEPLOY_KNOWN_HOSTS` | Secret（推荐） | `ssh-keyscan -p 22 <服务器IP>` 的输出，用于固定主机指纹；未设置时每次临时获取并给出警告 |
| `AUTO_DEPLOY` | Variable（可选） | 设为 `true` 后，`main` 的 CI 通过即自动发布；未设置时只能手动发布 |

### 5.3 生产环境审批

`Deploy` 使用名为 `production` 的环境（首次运行时自动创建）。在 Settings → Environments → `production` 中：

- **Required reviewers**：添加审批人。之后每次发布都会暂停，审批人在 Actions 页面点击 Approve 后才执行
- **Deployment branches and tags**：选择 Selected branches，只允许 `main`

> 注意：在 GitHub Free / Pro / Team 计划下，私有仓库无法使用 Required reviewers。此时保持 `AUTO_DEPLOY` 未设置，由负责人在 Actions → Deploy → Run workflow 手动触发，即作为上线前的人工确认。仓库公开或计划支持审批后，再配置审批人并将 `AUTO_DEPLOY` 设为 `true`。

---

## 6. 技术说明

- **渲染方式**：全部页面在构建期静态生成（SSG），访问速度快、服务器压力小；内容修改后重新构建即可生效。
- **Next.js 16**：未启用 Cache Components（`cacheComponents`），沿用经典的静态 / 动态渲染模型，对内容型官网更简单直接；后续需要时可在 `next.config.ts` 开启。
- **轮播**：Embla Carousel，支持拖动、触摸滑动、左右按钮、指示点、自动轮播、悬停暂停；系统开启“减少动态效果”时不自动播放。
- **SEO**：每页独立 Title / Description / Canonical / Open Graph / Twitter 卡片（`lib/metadata.ts`），统一分享图，组织、新闻与面包屑结构化数据（JSON-LD），自动 sitemap / robots。
- **可用性**：新闻按分类、案例按行业筛选；返回顶部按钮；页面出错时有兜底页（`app/error.tsx`、`app/global-error.tsx`）；按 Lighthouse 无障碍规则检查（触控尺寸、可访问名称等）。
- **内容层**：页面只通过 `lib/content.ts` 取数。V2.0 引入 CMS / API 时，只需改写该文件。

## 7. 后续演进（参考建设方案）

- V2.0：CMS 内容管理后台、FastAPI 接口、PostgreSQL、权限与审核流程
- V3.0：AI 智能助手、在线产品演示、客户门户、多语言站点等

---

联系人：罗近一 · 电话 18301304191 · 微信 TSwiftie-1989
