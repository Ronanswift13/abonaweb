import { substationPluginCount, substationPluginGroups } from "@/data/plugins";
import type { Product } from "@/types";

/**
 * 核心产品
 * - featured: true 的产品出现在首页“核心产品”三列卡片中（按 order 排序，建议保持 3 个）
 * - 每个产品自动生成详情页 /products/[slug]
 * - stats / architecture / plugins / technologies / security / techStack 为技术方案区块，
 *   有数据时详情页自动渲染，没有则不显示
 * 新增产品：在数组中追加一项即可，无需修改页面代码。
 *
 * 技术方案来源（研发仓库）：
 * - 破夜绘明变电站监测平台 ← DarkBreaker
 * - 主动 AI 智能体       ← Proactive AI Interface
 * - 智慧后勤 AI 助手     ← AI_assistant_
 */
export const products: Product[] = [
  {
    slug: "poye-substation-monitoring",
    name: "破夜绘明变电站监测平台",
    nameEn: "DarkBreaker",
    tag: "电力智能监测",
    icon: "radar",
    accent: "sky",
    summary: `面向输变电站全天候运行场景，以 ${substationPluginCount} 个标准化监测插件覆盖视觉缺陷、时序传感、融合诊断与空间安防，实现设备状态实时监测、缺陷智能识别与异常主动预警。`,
    description:
      "破夜绘明（DarkBreaker）是面向输变电站的 AI 自主巡视与监测平台。平台采用「分层 + 插件化 + 微服务」架构，把主变、开关、母线、电容器、表计、热成像、声学、气体、电子围栏等巡视与监测能力拆分为高内聚、低耦合的标准化插件，统一接入任务调度、证据链与数字孪生，构建从数据采集、智能识别到告警处置的闭环监测体系。",
    keywords: ["插件化架构", "多模态感知", "全链路证据"],
    features: [
      {
        icon: "eye",
        title: "全天候多源感知",
        description:
          "可见光、红外热成像、高光谱、声学、气体、激光雷达与毫米波雷达多源接入；红外与雷达不依赖可见光，夜间与恶劣天气下仍可持续感知。",
      },
      {
        icon: "scan",
        title: "设备缺陷与状态识别",
        description: "覆盖主变、开关、母线、电容器、表计等关键设备的缺陷检测、分合位识别与表计读数，结果附带位置、置信度与原因码。",
      },
      {
        icon: "shield",
        title: "安全与环境监测",
        description: "电子围栏、人员违章、小动物与鸟类入侵、烟火、气体泄漏全覆盖，告警分级并给出处置建议。",
      },
      {
        icon: "layers",
        title: "数字孪生与区域态势",
        description: "三维数字孪生还原站内设备与告警位置；区域态势地图实现多站一屏总览，并可逐级下钻到单站驾驶舱。",
      },
    ],
    scenarios: [
      "变电站无人值守 / 少人值守",
      "夜间及恶劣天气巡视",
      "设备状态检修与缺陷管理",
      "集控站 / 区域多站远程监视",
      "作业现场安全管控",
      "二次设备智能运维",
    ],
    // 视频画面为变电站现场巡视系统，讲解对照破夜绘明各插件的承接方式（口径见视频讲解文案）
    demo: {
      title: "110kV 主变 AI 自主巡视实录",
      description:
        "110kV 变电站主变 AI 自主巡视现场实录（已倍速与脱敏处理），逐段讲解每个巡视环节在破夜绘明变电站监测平台中由哪个插件承接，以及各项能力的当前验收状态。时长约 3 分 17 秒。",
      video: {
        src: "/videos/poye-substation-patrol-demo.mp4",
        poster: "/videos/poye-substation-patrol-demo-poster.jpg",
      },
    },
    stats: [
      { value: String(substationPluginCount), label: "标准化监测插件" },
      { value: "4 类", label: "视觉 · 时序 · 融合 · 空间" },
      { value: "1200+", label: "自动化测试用例" },
      { value: "7 维", label: "现场验收契约" },
    ],
    architecture: {
      description: "六层解耦：上层只依赖统一接口，算法插件与设备可以独立替换、独立升级，不影响平台其余部分。",
      layers: [
        {
          name: "展示层",
          description: "多视角监控与人机交互",
          items: ["区域态势地图（多站全景）", "主控驾驶舱与主接线图", "室内 / 室外三维数字孪生", "告警面板与证据回放"],
        },
        {
          name: "服务层",
          description: "统一对外接口",
          items: ["REST API 与 WebSocket 实时推送", "OpenAPI 接口文档", "构建溯源自证接口", "现场链路就绪度查询"],
        },
        {
          name: "任务调度层",
          description: "把巡视需求编排为可执行任务",
          items: ["异步任务引擎与任务队列", "站点 → 设备 → 部件 → ROI 层级建模", "告警分级与规则引擎", "确定性回放"],
        },
        {
          name: "算法插件层",
          description: "标准化、可插拔的识别能力",
          items: [`${substationPluginCount} 个插件统一输出格式`, "深度学习集成层（PyTorch / ONNX Runtime）", "模型注册与分阶段晋级", "插件可独立进程部署"],
        },
        {
          name: "设备适配层",
          description: "屏蔽不同厂商硬件差异",
          items: ["可见光摄像机 / 云台 PTZ", "红外热像仪", "激光雷达 / 毫米波雷达", "传感器与二次设备协议"],
        },
        {
          name: "数据与证据层",
          description: "结果可存、可查、可追溯",
          items: ["配置库（YAML / JSON）", "结果库与事件库", "不可变证据链存储", "统一日志与审计"],
        },
      ],
    },
    plugins: {
      description: `已开发 ${substationPluginCount} 个监测插件，按感知方式分为四类。每个插件都以「代码 + 清单 + 配置 + 测试」四件套交付，可在平台内统一调度，也可单独部署为独立服务。`,
      groups: substationPluginGroups,
      note: "所有插件统一遵循「可运行、可回放、可解释、可追溯、可维护」五条验收线。各插件的现场精度以试点数据验收为准；未经现场验收的能力在系统中明确标注，不作为正式告警依据。",
    },
    technologies: [
      {
        icon: "puzzle",
        title: "插件化微服务架构",
        description:
          "统一插件基类与结果格式（UnifiedResult），插件以四件套交付、可热插拔与独立升级；每个插件都能脱离主平台独立启动，自带仪表板、健康检查与 OpenAPI 文档。",
      },
      {
        icon: "scan",
        title: "深度学习检测与跟踪",
        description:
          "YOLOv8 / ViT 目标检测、关键点检测、DeepSORT / ByteTrack 多目标跟踪；模型统一导出 ONNX，经 ONNX Runtime 在 CPU、GPU 与边缘设备上推理。",
      },
      {
        icon: "waveform",
        title: "时序与多源融合分析",
        description:
          "STFT 声学特征与 CNN-LSTM 声学异常检测、GL-TransLSTM 气体趋势预测、RX / SAM 高光谱异常分析，并在统一时间轴上与视觉结果融合诊断。",
      },
      {
        icon: "layers",
        title: "三维数字孪生",
        description:
          "基于 Three.js 的室内外数字孪生，布局与告警归因共用同一设备 ID，插件报出的问题直接在三维场景中高亮定位；支持从区域态势逐级下钻。",
      },
      {
        icon: "history",
        title: "全链路证据与确定性回放",
        description:
          "每次识别保存原图、ROI、结果、置信度、时间戳与模型版本，形成不可变证据链；给定回放数据，识别结果可完整复现，便于复核与追责。",
      },
      {
        icon: "workflow",
        title: "模型分阶段晋级",
        description:
          "模型按「候选 → 影子 → 验收 → 生效」分阶段晋级；训练集、冻结测试集与现场集按分组键与 SHA-256 严格隔离，影子运行通过后才产生正式告警。",
      },
    ],
    security: {
      description: "电力监控系统对数据真实性和运行安全要求极高。平台把「不伪造、可追溯、不越权」写进运行机制，并由自动化测试闸门持续守护。",
      items: [
        {
          icon: "shield",
          title: "运行档位隔离",
          description:
            "生产、现场、影子、演示、测试五档运行档位：生产档禁止模拟数据，现场档只探测本站授权设备，影子档只推理不告警；未声明时默认取最严档。",
        },
        {
          icon: "filecheck",
          title: "数据真实性约束",
          description: "没有真实数据源时明确返回「不可用」，绝不生成读数；演示数据全链路标注为合成数据，不会混入生产告警。",
        },
        {
          icon: "database",
          title: "不可变证据链",
          description: "证据记录只增不改，每次运行绑定模型版本、配置摘要与数据集版本，做到可回放、可回滚、可追责。",
        },
        {
          icon: "fingerprint",
          title: "构建溯源自证",
          description: "每个运行实例可自证构建版本、分支、工作区状态与运行档位，界面常驻构建标识，杜绝「代码已修复、线上仍是旧版本」。",
        },
        {
          icon: "lock",
          title: "只读查询无副作用",
          description: "状态查询不触发设备初始化，插件初始化阶段不得注入任何告警；读写边界由自动化测试持续校验。",
        },
        {
          icon: "server",
          title: "部署与网络隔离",
          description: "Docker 容器化部署、Nginx HTTPS 反向代理；插件独立进程运行、故障隔离；配置文件不存放密钥与凭证。",
        },
      ],
    },
    techStack: [
      { category: "后端服务", items: ["Python 3.10+", "FastAPI", "Pydantic v2", "Uvicorn", "WebSocket"] },
      { category: "AI 与视觉", items: ["PyTorch", "Ultralytics YOLOv8", "ONNX Runtime", "OpenCV", "NumPy"] },
      { category: "信号与点云", items: ["librosa", "SciPy", "scikit-learn", "Open3D"] },
      { category: "前端与可视化", items: ["Jinja2", "Bootstrap 5", "Chart.js", "Three.js", "Leaflet"] },
      { category: "工程化", items: ["pytest", "ruff", "mypy", "Docker", "Nginx", "PyInstaller"] },
    ],
    featured: true,
    order: 1,
  },
  {
    slug: "abonayaoer",
    name: "艾博纳幺儿",
    nameEn: "Abonayaoer",
    tag: "自研大模型",
    icon: "brain",
    accent: "cyan",
    summary:
      "公司自研的行业大模型，深度融合电力能源与工业领域知识，支持知识问答、文档理解、数据分析与智能决策辅助，可私有化部署。",
    // 【占位】请补充模型参数规模、评测结果等经确认可公开的信息
    description:
      "「艾博纳幺儿」（Abonayaoer）是艾博纳自主研发的行业大模型。模型在通用语言能力基础上，持续注入电力能源、工业运维等专业知识，具备行业知识问答、规程文档理解、多模态数据分析与任务规划能力，并支持本地化、私有化部署，满足企业对数据安全与可控性的要求。",
    keywords: ["行业知识增强", "多模态理解", "私有化部署"],
    features: [
      {
        icon: "brain",
        title: "行业知识增强",
        description: "融合规程标准、设备台账与运维经验，回答更专业、更可追溯。",
      },
      {
        icon: "layers",
        title: "多模态理解",
        description: "统一理解文本、图像、表格与时序数据，支撑复杂业务分析。",
      },
      {
        icon: "network",
        title: "智能体任务编排",
        description: "调用业务系统与工具链，完成检索、分析、报告生成等多步骤任务。",
      },
      {
        icon: "shield",
        title: "安全可控部署",
        description: "支持私有化与国产化环境部署，数据不出域，权限可审计。",
      },
    ],
    scenarios: ["企业知识库问答", "运维规程与报告生成", "设备数据分析", "智能客服与后勤服务"],
    demo: {
      title: "模型演示",
      description: "在线体验入口建设中。欢迎联系我们获取演示账号或预约现场演示。",
    },
    featured: true,
    order: 2,
  },
  {
    slug: "proactive-ai-agent",
    name: "主动 AI 智能体",
    nameEn: "Proactive AI Agent",
    tag: "主动智能",
    icon: "bot",
    accent: "ocean",
    summary:
      "从“被动应答”走向“主动汇报”：虚拟值守同事持续汇聚监测事件，按可解释优先级主动开口、跟进闭环，并按岗位角色给出差异化建议。",
    description:
      "主动 AI 智能体（主动 AI 值守交互系统）把电子围栏、人员违章、鸟类监测等监测插件统一接入，以「一级主控面板 + 二级插件对话」两级界面呈现。虚拟值守同事由系统先开口，按可解释优先级播报最重要的事项，并通过语音对话完成确认、拟工单与逐项跟进；全程坚持人在回路——系统只建议、不遥控。",
    keywords: ["主动汇报", "语音交互", "人在回路"],
    features: [
      {
        icon: "lightbulb",
        title: "系统先开口",
        description: "按「结论、对象与位置、依据、建议」四拍播报当前最高优先事项，单次 8–12 秒；同一事项 60 秒内不重复打扰，只有最高项切换才插话。",
      },
      {
        icon: "workflow",
        title: "汇报闭环",
        description: "主动汇报 → 回应（已阅 / 拟工单 / 下一项）→ 续报下一项 → 超时催办 → 事项消失回报「不再检出」→ 本轮小结。",
      },
      {
        icon: "users",
        title: "角色感知",
        description: "值班员、主管、专家、管理层四种角色，话术深度与侧重点自动切换：现场动作、影响范围、指标证据或合规决策。",
      },
      {
        icon: "layers",
        title: "数字孪生联动",
        description: "室内数字孪生地图（六个房间、近三百个设备对象）与虚拟同事联动：讲到哪一项，镜头和指向就带到哪里。",
      },
    ],
    scenarios: ["变电站运维值守", "集控中心大屏无人值守播报", "现场作业安全管控", "多路监测告警统一研判"],
    demo: {
      title: "智能体演示",
      description: "支持演示与回放模式下的完整体验：主动汇报、语音追问、角色切换与数字孪生联动。欢迎联系我们预约演示。",
    },
    stats: [
      { value: "3 路", label: "监测插件统一接入" },
      { value: "4 拍", label: "结论 · 位置 · 依据 · 建议" },
      { value: "4 种", label: "岗位角色差异化话术" },
      { value: "≈0.2 秒", label: "本地语音识别出字" },
    ],
    architecture: {
      description: "交互、对话、事件、语音、安全五层分工明确；大模型只是可选组件，关闭后系统依然完整可用。",
      layers: [
        {
          name: "交互层",
          description: "两级界面与虚拟同事",
          items: ["一级主控面板 + 二级插件对话", "二维虚拟同事（待命 / 聆听 / 说话 / 指向）", "语音条：录音 → 识别 → 思考 → 合成 → 播放", "数字孪生地图（无 WebGL 自动降级平面图）"],
        },
        {
          name: "对话与汇报层",
          description: "决定说什么、什么时候说",
          items: ["可解释优先级排序", "四拍汇报、冷却与催办", "确定性意图解析与置信门", "受约束对话编排器"],
        },
        {
          name: "事件汇聚层",
          description: "多路插件事件统一入库",
          items: ["插件适配器（HTTP JSON / JSONL / 文档）", "统一事件库：序号、游标、去重、乱序", "SSE 增量推送", "演示 / 回放 / 实时三种运行模式"],
        },
        {
          name: "语音引擎层",
          description: "全部本地离线运行",
          items: ["SenseVoice-Small 语音识别", "流式 Zipformer 第二意见", "Kokoro-82M 语音合成（两种声线）", "电力领域发音词典与 G2P"],
        },
        {
          name: "安全与审计层",
          description: "认证、授权与可信边界",
          items: ["OIDC 代理 / JWT 认证", "身份权限天花板", "审计与业务同事务", "现场精度与控制权限可信标注"],
        },
      ],
    },
    technologies: [
      {
        icon: "gauge",
        title: "可解释优先级",
        description:
          "优先分 S = ws·严重度 + wt·时效 + wp·插件 + wr·角色，权重热加载并经不变式校验，保证紧急项永远排在观察项之前；分数只决定排序，不改写插件原始等级。",
      },
      {
        icon: "message",
        title: "受约束对话编排",
        description:
          "解析器不认识的问题先检索当前卡片与知识库，再由可选的大模型返回只含引用编号的结构化声明，最后由本地规则拼出回答——只会作答、反问或拒绝控制。",
      },
      {
        icon: "mic",
        title: "本地语音识别",
        description:
          "SenseVoice-Small 出文字，流式 Zipformer 做第二意见计算识别置信度，离线 CPU 运行，停说到出字约 0.2 秒；关键指令置信不足时先反问、不执行。",
      },
      {
        icon: "volume",
        title: "本地语音合成",
        description: "Kokoro-82M 本地声线（沉稳专业 / 稍活泼专业），配套电力领域发音词典与 G2P，130 句黄金发音句双声线回归验证。",
      },
      {
        icon: "database",
        title: "事件汇聚与实时推送",
        description:
          "统一事件库记录序号、游标、模型与配置版本及证据引用，支持去重与乱序；SSE 增量推送，实时模式断流即停止，绝不静默换成演示数据。",
      },
      {
        icon: "filecheck",
        title: "电力安全专业词库",
        description: "三路插件 18 个事件码逐一给出术语、依据、建议、处置步骤与时限；卡片与口播只使用规范中文表述，原始字段仅向专家展开。",
      },
    ],
    security: {
      description: "值守场景容不得“AI 自作主张”。系统从身份、会话、模型输出到控制权限层层设限，确保建议可信、操作可追溯。",
      items: [
        {
          icon: "key",
          title: "标准身份认证",
          description: "支持受信反向代理（OIDC）与标准 JWT / JWKS 认证，拒绝算法混淆攻击；令牌内容从不写入日志。",
        },
        {
          icon: "usercheck",
          title: "最小权限",
          description: "身份决定权限天花板，话术角色只能收窄、不能提权；审计与指标权限需显式授予，响应离开服务前再按权限二次裁剪。",
        },
        {
          icon: "lock",
          title: "会话与 Web 安全",
          description: "HMAC 签名会话 Cookie（HttpOnly / SameSite / Secure），CSRF 双提交令牌与同源校验；全站 CSP、HSTS、X-Frame-Options 等安全响应头。",
        },
        {
          icon: "shield",
          title: "大模型安全护栏",
          description: "提示注入与凭据类内容在发送前拦截；模型只能返回枚举代码与引用编号，「允许控制」字段类型固定为 false，越界输出触发熔断。",
        },
        {
          icon: "hardhat",
          title: "控制权限锁死",
          description: "自动执行权限在代码中锁定为关闭，工单仅为建议草稿；现场精度未验收前始终明确标注，风险不可评估时不得按安全处理。",
        },
        {
          icon: "history",
          title: "审计一致性",
          description: "已阅、工单、状态迁移与审计记录在同一事务中提交，审计失败即回滚；乐观并发控制防止多人操作相互覆盖。",
        },
      ],
    },
    techStack: [
      { category: "后端服务", items: ["Python 3.11", "FastAPI", "Pydantic", "SQLite（WAL）", "SSE"] },
      { category: "语音", items: ["SenseVoice-Small", "Zipformer", "Kokoro-82M", "ONNX Runtime"] },
      { category: "前端与孪生", items: ["JavaScript", "Three.js", "Web Audio"] },
      { category: "大模型（可选）", items: ["Ollama 本地部署", "Qwen 等开源模型", "JSON Schema 结构化输出"] },
      { category: "安全", items: ["OIDC", "JWT / JWKS", "HMAC", "CSP"] },
    ],
    featured: true,
    order: 3,
  },
  {
    slug: "smart-logistics-assistant",
    name: "智慧后勤 AI 助手",
    nameEn: "Smart Logistics AI Assistant",
    tag: "后勤智能服务",
    icon: "mic",
    accent: "indigo",
    summary:
      "面向后勤多场景服务的语音 AI 助手：一句话说清需求，助手自动识别意图、抽取信息、校验规则，用户点击确认后经标准化工具接口完成业务办理。",
    description:
      "智慧后勤 AI 助手是《面向后勤多场景服务的人工智能助手关键技术研究》的落地成果，首个试点业务为访客到访预约的创建与审批。助手以语音为主、文本为辅，既可独立部署，也可嵌入企业移动办公 App；大模型、语音识别与意图模型全部内网私有化部署，所有业务操作必须由用户在确认卡上点击确认后才会执行。",
    keywords: ["语音办理", "MCP 工具编排", "确认门"],
    features: [
      {
        icon: "mic",
        title: "一句话语音办理",
        description: "16k 中文语音转写，口语清洗与术语纠错；“下周三下午两点到四点”这类时间口语自动归一为标准时间。",
      },
      {
        icon: "brain",
        title: "意图与信息理解",
        description: "MacBERT 意图模型结合对话状态识别六类意图；信息抽取规则优先，规则抽不出时才调用大模型补全，输出固定结构。",
      },
      {
        icon: "checklist",
        title: "确认卡与缺项追问",
        description: "缺什么问什么；两个日期、两个被访人等冲突一律标红交用户点选，绝不猜测；点击确认前不调用任何业务接口。",
      },
      {
        icon: "network",
        title: "MCP 工具闭环",
        description: "业务接口统一注册为 MCP 工具，编排引擎只认工具名；幂等键防止重复提交，接口超时重试一次仍失败则保留草稿。",
      },
    ],
    scenarios: ["访客到访预约创建", "被访人同意 / 驳回审批", "嵌入企业移动办公 App", "扩展：会务、报修、餐饮等后勤服务"],
    demo: {
      title: "助手演示",
      description: "支持在模拟宿主环境中完整演示：语音提出预约 → 确认卡核对 → 业务系统返回申请单号。欢迎联系我们预约演示。",
    },
    // 【待确认】以下为内部冻结测试集与压测结果，对外公开前请确认口径
    stats: [
      { value: "98.69%", label: "意图识别准确率" },
      { value: "96.62%", label: "槽位抽取准确率" },
      { value: "93 ms", label: "100 并发对话 P95" },
      { value: "6 类", label: "意图标签" },
    ],
    statsNote: "准确率为内部冻结测试集评测结果；时延为 GPU 环境压测数据，不含人工确认与业务系统耗时。",
    architecture: {
      description: "按研究课题分层：语义识别、流程编排、执行与记忆三个课题各自独立，通过固定结构的数据与工具名衔接。",
      layers: [
        {
          name: "交互层",
          description: "移动端 H5，可嵌入宿主 App",
          items: ["语音为主、文本为辅", "确认卡与冲突点选", "iframe 嵌入与 URL 参数约定", "前端不加载外网资源"],
        },
        {
          name: "语义识别层",
          description: "课题一：语料库与语义识别",
          items: ["FunASR SenseVoice-Small 语音转写", "术语规则库与口语清洗", "Chinese-MacBERT 意图识别", "规则 + 大模型槽位抽取"],
        },
        {
          name: "编排与规则层",
          description: "课题二：流程编排与任务规则库",
          items: ["识别 / 校验 / 人工 / 执行四类节点", "状态机（内置六种状态，可自定义）", "YAML 任务规则库", "确认门五项检查"],
        },
        {
          name: "执行与记忆层",
          description: "课题三：接口映射与 MCP 闭环",
          items: ["MCP 工具服务（进程内或独立部署）", "业务接口字段映射", "幂等与失败草稿", "会话内短期记忆"],
        },
        {
          name: "安全层",
          description: "贯穿全链路",
          items: ["宿主上下文签名校验", "日志掩码与库内加密", "全程审计", "熔断与降级"],
        },
      ],
    },
    technologies: [
      {
        icon: "database",
        title: "可维护的术语规则库",
        description: "事由、部门、手机号段、姓氏、口语词等规则库以 YAML 维护，业务方可直接修改、重启生效；语音识别热词由规则库自动生成。",
      },
      {
        icon: "clock",
        title: "时间口语归一",
        description: "支持相对日、星期、绝对日期、时段、钟点、区间与时长等多种说法；推断项降低置信并标注，矛盾或已过去的时间不填写、提示用户。",
      },
      {
        icon: "fingerprint",
        title: "号码只认规则",
        description: "身份证按 GB 11643 校验位与出生日期校验，手机号按号段校验；任何模型都不生成、不补全号码，大模型输出中的号码一律丢弃。",
      },
      {
        icon: "brain",
        title: "大模型输出必须落地",
        description: "大模型只在规则失败且原话有线索时调用；抽取结果必须是用户原话的子串。提示词只组装宿主摘要、缺项摘要、最近两轮与当前句。",
      },
      {
        icon: "workflow",
        title: "状态机与确认门",
        description: "状态转移表与技术方案逐条一致，非法转移直接拒绝；执行节点只能由带卡片编号与版本号的点击确认触发，模型无法直接触发执行。",
      },
      {
        icon: "zap",
        title: "全链路优雅降级",
        description: "大模型连续失败自动熔断并转为表单确认，意图模型未就绪回退规则分类，语音不可用提示改用文字；任何情况下都不转调外部模型。",
      },
    ],
    security: {
      description: "访客信息涉及身份证号、手机号等敏感个人信息。助手按“最少采集、最短留存、全程留痕”设计，安全措施逐条对应技术方案并有测试用例覆盖。",
      items: [
        {
          icon: "usercheck",
          title: "身份校验与防越权",
          description: "身份由宿主 App 经 URL 传入，可选 HMAC-SHA256 签名防篡改；创建用申请人身份，审批只认被访人本人，口头“同意”无效。",
        },
        {
          icon: "lock",
          title: "敏感数据保护",
          description: "证件号、手机号全局日志掩码（含异常堆栈）；审计中的提交内容 AES-256-GCM 加密；不拉取、不缓存组织树与通讯录。",
        },
        {
          icon: "mic",
          title: "音频即删",
          description: "语音只在内存中转写，转写后立即丢弃，不落盘、不入日志、不进提示词；照片不识别、不进入模型；无跨会话记忆。",
        },
        {
          icon: "shield",
          title: "嵌入与传输安全",
          description: "CSP frame-ancestors 白名单只允许指定宿主嵌入；Referrer-Policy: no-referrer，访问日志去除查询串；会话令牌只存页面内存。",
        },
        {
          icon: "server",
          title: "模型与接口边界",
          description: "大模型地址守卫只允许内网私有化模型，配置不合规拒绝启动；MCP 端点需令牌或仅本机访问，创建与审批工具须带确认凭据。",
        },
        {
          icon: "history",
          title: "全程审计",
          description: "会话、意图类别、确认人、工具调用、幂等键、单号与结果码全部入审计；越权尝试即时记录；审计按保存期自动清理。",
        },
      ],
    },
    techStack: [
      { category: "后端服务", items: ["Python 3.11", "FastAPI", "MCP 官方 SDK", "SQLite（WAL）"] },
      { category: "语音与语义", items: ["FunASR SenseVoice-Small", "Chinese-MacBERT", "BGE-M3 / BGE-reranker（可选）"] },
      { category: "大模型", items: ["DeepSeek / Qwen", "内网私有化部署", "OpenAI 兼容接口"] },
      { category: "前端", items: ["Vue 3", "Vite", "Vant 4", "TypeScript"] },
      { category: "部署运维", items: ["Linux x86_64", "systemd", "Nginx", "一键安装 / 升级 / 回滚"] },
    ],
    featured: false,
    order: 4,
  },
];
