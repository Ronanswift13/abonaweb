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
    summary: `面向变电站巡视与监测。平台由 ${substationPluginCount} 个监测插件组成，覆盖主变、开关、表计、红外、声学、气体和电子围栏等，告警结果保留原图、置信度和模型版本。`,
    status: `${substationPluginCount} 个插件已完成工程化集成和自动化测试，开关状态、热成像测温、室内围栏三条链路正在进行现场精度验收。`,
    description:
      "破夜绘明（DarkBreaker）是变电站巡视与监测平台。平台将主变、开关、母线、电容器、表计、红外、声学、气体、电子围栏等巡视内容拆分为独立插件，各插件可单独开发、测试和部署，结果统一进入任务调度、证据库和数字孪生。值班人员可在三维场景中查看告警对应的设备，并调阅当时的原图、局部画面、置信度和模型版本。未完成现场验收的能力在界面上单独标注，不作为正式告警。",
    features: [
      {
        icon: "eye",
        title: "夜间和雨雾天气下的监测",
        description:
          "除可见光外，平台接入红外热像、激光雷达和毫米波雷达。图像模糊、眩光或过暗时，由输入质量门拦截并提示复核。",
      },
      {
        icon: "scan",
        title: "定位到部件的缺陷识别",
        description: "主变先定位本体、套管、避雷器等 15 类构件，再逐一识别；开关分合位由视频和遥信两路比对。结果附位置、置信度和原因码。",
      },
      {
        icon: "shield",
        title: "人员、动物、烟火和气体告警",
        description: "覆盖电子围栏越界、未戴安全帽、小动物和鸟类进站、烟火以及 SF₆ 等气体浓度异常，按等级推送并给出处置建议。",
      },
      {
        icon: "layers",
        title: "三维定位与区域总览",
        description: "告警在三维孪生中定位到设备或机柜。区域地图支持从多站总览进入单站驾驶舱和具体房间。",
      },
    ],
    scenarios: [
      "夜班值守人员较少时，由平台持续监测，异常按等级推送到值班台",
      "雨雾天气可见光受限时，使用红外和雷达继续巡视",
      "缺陷复核时调阅原图、局部画面和模型版本",
      "集控中心查看多座变电站的接入和告警情况",
      "检修作业时识别未戴安全帽、越过黄线等违章",
      "二次设备动作信号统一为标准事件，按间隔检索",
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
    // 截图录制自 DarkBreaker 演示档（DARKBREAKER_PROFILE=demo），未接入现场数据
    screens: {
      device: "desktop",
      description: "平台的四个主要监测视图。",
      items: [
        {
          src: "/images/products/poye/ui-region-overview.jpg",
          width: 2400,
          height: 1350,
          title: "区域态势",
          alt: "破夜绘明区域态势页面：地图上叠加输电线路与变电站，左侧为站点列表，右侧为区域告警汇总与插件健康",
          caption:
            "按电压等级筛选站点，地图叠加输电线路、变电站和行政区划，右侧汇总区域告警、平台接入和插件状态。点击站点可进入单站驾驶舱。",
        },
        {
          src: "/images/products/poye/ui-cockpit-sld.jpg",
          width: 2400,
          height: 1350,
          title: "主控驾驶舱",
          alt: "破夜绘明主控驾驶舱：中部为变电站主接线图与室内区域布局，右侧为实时告警中心与 SOE 动作时间线",
          caption:
            "单站主接线图与室内区域布局并排呈现，右侧为实时告警中心、SOE 动作时间线与快速处置入口，底部为最近事件流与插件健康矩阵。",
        },
        {
          src: "/images/products/poye/ui-outdoor-twin.jpg",
          width: 2400,
          height: 1350,
          title: "室外监测中心",
          alt: "破夜绘明室外监测中心：户外站区三维数字孪生，左侧为一次设备状态与监测插件列表",
          caption: "户外站区三维场景。一次设备按站区布局建模，左侧显示设备状态和监测插件接入情况。",
        },
        {
          src: "/images/products/poye/ui-indoor-twin.jpg",
          width: 2400,
          height: 1350,
          title: "室内监测中心",
          alt: "破夜绘明室内监测中心：二次设备楼三维数字孪生，右侧显示选中围栏对象的详情",
          caption: "二次设备楼三维场景，覆盖主控室、开关柜室、蓄电池室与电缆层；点击机柜、围栏或传感器即可查看对象详情与关联插件。",
        },
      ],
      note: "截图来自演示环境，未接入现场数据，设备状态显示为“待接入”。",
    },
    twin: {
      description:
        "场景布局和告警归因使用同一套设备编号。可从区域态势进入单站主接线图，再进入室外、室内三维场景，告警在孪生中高亮显示。",
      video: {
        src: "/videos/poye-digital-twin-loop.mp4",
        poster: "/videos/poye-digital-twin-loop-poster.jpg",
      },
      steps: [
        { icon: "map", title: "区域态势", description: "按电压等级和行政区筛选站点，点击站点进入单站页面。" },
        { icon: "network", title: "单站驾驶舱", description: "主接线图呈现一次设备拓扑，室内、室外告警在同一张图上对照。" },
        { icon: "layers", title: "室外三维孪生", description: "站区一次设备三维建模，支持旋转、缩放与俯视 / 正视切换。" },
        { icon: "building", title: "室内三维孪生", description: "二次设备楼分楼层、分房间建模，告警定位到具体机柜与设备。" },
      ],
      note: "演示画面使用平台默认站区布局，非现场测绘数据。",
    },
    field: {
      description: "以下画面截取自 110kV 变电站主变巡视实录。",
      items: [
        {
          src: "/images/products/poye/field-main-transformer.jpg",
          width: 705,
          height: 470,
          title: "主变本体与散热器",
          alt: "变电站主变压器本体、散热器与高压套管的现场画面",
          caption: "先定位主变本体、套管、避雷器等 15 类构件，再按构件裁剪 ROI，分别进入外观缺陷与专项识别链。",
          plugin: "transformer_inspection",
        },
        {
          src: "/images/products/poye/field-bushing-conservator.jpg",
          width: 705,
          height: 470,
          title: "高压套管与储油柜",
          alt: "主变高压套管、绝缘子与储油柜的现场特写",
          caption: "云台按预置位拍摄全景和特写，检查套管、绝缘子与连接部位。",
          plugin: "transformer_inspection",
        },
        {
          src: "/images/products/poye/field-cooling-fan.jpg",
          width: 705,
          height: 470,
          title: "冷却风扇与散热片",
          alt: "主变冷却风扇与散热片的现场特写",
          caption: "冷却系统与瓦斯继电器是主变巡视的重点；接入红外测温后，由热成像插件处理辐射测温数据。",
          plugin: "thermal",
        },
        {
          src: "/images/products/poye/field-oil-level-gauge.jpg",
          width: 705,
          height: 470,
          title: "本体油位计读数",
          alt: "主变本体油位计，绿色识别框框出表盘并标注读数",
          caption: "绿色框为表计读取点位。置信度不足或量程方向不明时，结果转人工确认。",
          plugin: "meter_reading",
        },
      ],
      note: "画面截取自本页演示视频，已去除字幕和站点信息。现场精度以试点验收为准。",
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
      note: "插件验收要求：按平台接口接入运行；给定回放数据时结果可复现；输出包含检测框、关键点、置信度或失败原因码；输出包含模型版本和代码哈希；提供 README、配置样例和最小单元测试。现场精度以试点数据验收为准，未验收的能力在系统中单独标注，不作为正式告警依据。",
    },
    technologies: [
      {
        icon: "puzzle",
        title: "插件独立部署与升级",
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
        title: "声学、气体和光谱分析",
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
        title: "结果回放与复现",
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
      description: "平台在没有真实数据源时返回“不可用”，不生成读数。每条结果可追溯到数据来源，查询和写入的边界由自动化测试检查。",
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
          description: "没有真实数据源时返回“不可用”，不生成读数。演示数据全程标注为合成数据，不进入生产告警。",
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
      "公司自研的行业大模型，已完成阶段性内部验证，计划用于规程问答、报告起草和设备数据分析，支持内网部署。",
    status: "已完成阶段性内部验证，尚未在客户现场试点，评测结果暂未公开。",
    // 【占位】请补充模型参数规模、评测结果等经确认可公开的信息
    description:
      "「艾博纳幺儿」（Abonayaoer）是公司自主研发的行业大模型，已完成阶段性内部验证，尚未在客户现场试点。模型计划用于规程问答、报告初稿起草和设备数据分析，可部署在客户服务器上，数据不出客户网络。参数规模和评测结果将在确认后公布。",
    features: [
      {
        icon: "brain",
        title: "规程问答并标注出处",
        description: "将规程标准和设备台账纳入检索库，回答时注明引用的条款和文件。",
      },
      {
        icon: "layers",
        title: "设备数据分析",
        description: "对测温、负荷等表格和时序数据进行汇总，给出结论和对应的数据点，供运维人员判断。",
      },
      {
        icon: "network",
        title: "起草报告初稿",
        description: "通过工具调用完成资料检索、数据汇总和报告起草，每一步可查看，定稿和签发由人负责。",
      },
      {
        icon: "shield",
        title: "部署在客户内网",
        description: "模型和检索库部署在客户服务器上，数据不出客户网络，并保留访问记录。",
      },
    ],
    scenarios: [
      "运维人员查询规程，回答注明出处",
      "根据巡视记录起草月度报告初稿",
      "行政、后勤类内部制度问答",
    ],
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
      "面向变电站值守。系统接入电子围栏、人员违章和鸟类监测三路事件，由虚拟同事按优先级语音汇报结论、位置、依据和建议，值守人员回应后继续汇报下一项。",
    status: "演示和回放模式可完整运行。现场数据源尚未接入，现场精度未验收，设备控制权限保持关闭。",
    description:
      "主动 AI 智能体（主动 AI 值守交互系统）接入电子围栏、人员违章、鸟类监测三路插件，界面分为一级主控面板和二级插件对话。虚拟同事按优先级主动汇报，值守人员可通过点按或语音确认已阅、拟工单、切换下一项或追问原因。系统只提供建议，不控制设备，工单为草稿。目前在演示和回放模式下运行，完成现场签核前，顶栏持续显示现场精度未验证。",
    features: [
      {
        icon: "lightbulb",
        title: "按优先级主动汇报",
        description: "按结论、对象与位置、依据、建议的顺序播报最高优先事项，单次 8–12 秒。同一事项 60 秒内不重复，最高优先项变化时才插入新汇报。",
      },
      {
        icon: "workflow",
        title: "逐项汇报与确认",
        description: "主动汇报 → 回应（已阅 / 拟工单 / 下一项）→ 续报下一项 → 超时催办 → 事项消失回报「不再检出」→ 本轮小结。",
      },
      {
        icon: "users",
        title: "按岗位调整汇报内容",
        description: "值班员侧重现场动作，主管侧重影响范围和处置时限，专家侧重指标和证据，管理层侧重合规与决策。",
      },
      {
        icon: "layers",
        title: "与数字孪生联动",
        description: "室内数字孪生地图包含六个房间、近三百个设备对象，汇报时镜头和指向转到对应位置。",
      },
    ],
    scenarios: [
      "夜间多路监测同时告警时，优先汇报最紧急的事项",
      "集控中心大屏语音播报最高优先事项",
      "检修作业中提示现场违章，并生成整改工单草稿",
      "交接班时查询未处理事项",
    ],
    // 视频与截图录制自 Proactive AI Interface 演示回放模式（PAI_RUN_MODE=demo，五幕剧本），语音为本地 Kokoro 合成
    demo: {
      title: "值守交互演示",
      description:
        "演示回放模式下的一轮值守，包括围栏越线告警、确认已阅、拟工单、切换主管角色和二级对话追问。语音为本地离线合成，时长约 1 分 25 秒。",
      video: {
        src: "/videos/proactive-ai-duty-demo.mp4",
        poster: "/videos/proactive-ai-duty-demo-poster.jpg",
      },
    },
    flow: {
      title: "值守交互流程",
      description:
        "系统负责事件汇聚、排序、汇报和跟进，处置决定由值守人员作出。",
      steps: [
        {
          actor: "system",
          icon: "database",
          title: "事件汇聚",
          description: "电子围栏、人员违章、鸟类监测三路插件事件统一入库，带序号与证据引用，去重、乱序后实时推送。",
          points: ["三路插件", "去重 / 乱序", "SSE 推送"],
        },
        {
          actor: "system",
          icon: "gauge",
          title: "可解释排序",
          description: "按严重度、时效、插件与角色加权计算优先分，紧急项永远排在观察项之前；分数只决定顺序，不改写插件原始等级。",
          points: ["优先分 S", "权重热加载"],
        },
        {
          actor: "system",
          icon: "volume",
          title: "主动汇报",
          description: "虚拟同事按结论、对象与位置、依据、建议的顺序播报最高优先项，并在数字孪生上指示位置。",
          points: ["四拍播报", "孪生联动", "60 秒不重复"],
        },
        {
          actor: "human",
          icon: "usercheck",
          title: "值守回应",
          description: "点按或语音回应：确认已阅、拟工单、下一项，或直接追问「为什么先报这条」；关键指令识别置信不足时先反问、不执行。",
          points: ["确认已阅", "拟工单", "下一项", "语音追问"],
        },
        {
          actor: "system",
          icon: "clock",
          title: "续报与催办",
          description: "回应后接着报下一项；超时未回应自动催办；只有最高项切换时才插话，不反复打扰。",
          points: ["续报下一项", "超时催办"],
        },
        {
          actor: "system",
          icon: "checklist",
          title: "收尾小结",
          description: "事项消失时主动回报「不再检出」，一轮结束给出本轮小结；工单始终只是建议草稿。",
          points: ["不再检出", "本轮小结"],
        },
      ],
      loop: "新事件进入，开始下一轮汇报",
      guardrails: [
        { icon: "hardhat", title: "不控制设备", description: "自动执行权限在代码中锁定关闭，工单仅为建议草稿，处置由人完成。" },
        { icon: "eye", title: "状态标注", description: "现场精度、人工复核和控制权限的状态常驻顶栏，现场签核前不可关闭。" },
        { icon: "users", title: "岗位权限", description: "汇报内容按岗位调整，权限由身份决定，不随话术角色变化。" },
        { icon: "layers", title: "两级界面", description: "一级主控面板显示全局情况，点击卡片或通过语音进入二级插件对话。" },
      ],
    },
    screens: {
      device: "desktop",
      description: "界面由数字孪生地图、虚拟同事和风险卡片三部分组成。",
      items: [
        {
          src: "/images/products/proactive-ai/l1-proactive-briefing.jpg",
          width: 2400,
          height: 1350,
          title: "一级主控 · 主动汇报",
          alt: "主动 AI 一级主控面板：左侧数字孪生高亮开关柜位置，中间虚拟同事指向孪生地图，右侧为当前最高项与风险卡片",
          caption:
            "虚拟同事播报当前最高优先项并指向数字孪生上的对应机柜。右侧为最高项速览、汇报进度和风险卡片。",
        },
        {
          src: "/images/products/proactive-ai/l1-loop-ticket.jpg",
          width: 2400,
          height: 1350,
          title: "汇报闭环 · 拟工单",
          alt: "汇报闭环进度推进到待人工处置，右下角生成了建议工单草稿",
          caption: "确认已阅后系统继续汇报下一项。拟工单只生成建议草稿，不派发、不执行。",
        },
        {
          src: "/images/products/proactive-ai/l1-role-supervisor.jpg",
          width: 2400,
          height: 1350,
          title: "角色切换 · 主管视角",
          alt: "切换为主管角色后的主控面板，顶部角色标签显示主管关注的影响范围与优先级",
          caption: "切换为主管后，汇报侧重影响范围、优先级和预计处置时限。",
        },
        {
          src: "/images/products/proactive-ai/l2-plugin-dialogue.jpg",
          width: 2400,
          height: 1350,
          title: "二级插件对话",
          alt: "电子围栏插件的二级专业对话界面，值守人员追问依据，系统给出回答",
          caption: "点击风险卡片进入插件对话，可追问汇报依据。",
        },
      ],
      note: "画面来自演示回放模式，非现场数据。",
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
          "解析器不认识的问题先检索当前卡片与知识库，再由可选的大模型返回只含引用编号的结构化声明，最后由本地规则组织回答。系统只作答、反问或拒绝控制请求。",
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
          "统一事件库记录序号、游标、模型与配置版本及证据引用，支持去重与乱序；SSE 增量推送，实时模式断流时停止，不切换为演示数据。",
      },
      {
        icon: "filecheck",
        title: "电力安全专业词库",
        description: "三路插件 18 个事件码逐一给出术语、依据、建议、处置步骤与时限；卡片与口播只使用规范中文表述，原始字段仅向专家展开。",
      },
    ],
    security: {
      description: "身份决定权限上限，模型只能返回编号和引用，自动执行权限在代码中锁定为关闭。已阅、拟工单等操作与审计记录在同一事务中提交。",
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
          title: "大模型使用限制",
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
      "面向企业后勤的语音助手，首个业务为访客预约。员工通过语音提出申请，助手生成确认卡，本人确认后提交业务系统。",
    status: "六个研发阶段已完成复验，部署包已就绪。尚未在客户环境和真实语音下测试，效率指标待试点实测。",
    description:
      "智慧后勤 AI 助手是《面向后勤多场景服务的人工智能助手关键技术研究》的落地成果，首个试点业务为访客到访预约的创建与审批。助手以语音为主、文本为辅，既可独立部署，也可嵌入企业移动办公 App；大模型、语音识别与意图模型全部内网私有化部署，所有业务操作必须由用户在确认卡上点击确认后才会执行。",
    features: [
      {
        icon: "mic",
        title: "语音办理",
        description: "转写 16k 中文语音，进行口语清洗和术语纠错，并将“下周三下午两点到四点”这类说法转换为标准时间。",
      },
      {
        icon: "brain",
        title: "识别意图并抽取预约信息",
        description: "MacBERT 意图模型结合对话状态识别六类意图；信息抽取规则优先，规则抽不出时才调用大模型补全，输出固定结构。",
      },
      {
        icon: "checklist",
        title: "缺项追问与冲突确认",
        description: "信息缺失时向用户追问，日期、被访人等存在冲突时标红并由用户选择。用户点击确认前不调用业务接口。",
      },
      {
        icon: "network",
        title: "确认后调用业务接口",
        description: "业务接口统一注册为 MCP 工具，编排引擎只认工具名；幂等键防止重复提交，接口超时重试一次仍失败则保留草稿。",
      },
    ],
    scenarios: [
      "员工在移动办公 App 中通过语音发起访客预约",
      "被访人收到申请后点击同意或驳回",
      "以页面形式嵌入宿主 App，身份由宿主传入并校验",
      "验收后扩展到会务、报修和餐饮预订",
    ],
    demo: {
      title: "助手演示",
      description: "支持在模拟宿主环境中完整演示：语音提出预约 → 确认卡核对 → 业务系统返回申请单号。欢迎联系我们预约演示。",
    },
    // 截图录制自 AI_assistant_ 模拟宿主页（frontend/mock-host.html）
    screens: {
      device: "phone",
      description: "访客预约的办理流程。",
      items: [
        {
          src: "/images/products/logistics/step-1-request.jpg",
          width: 1098,
          height: 2208,
          title: "提出申请",
          alt: "智慧后勤助手对话页：顶部为申请人与被访人信息，底部输入框中是到访预约需求",
          caption: "嵌入宿主 App 后自动显示申请人与被访人，可按住说话或切换文字输入。",
        },
        {
          src: "/images/products/logistics/step-2-confirm-card.jpg",
          width: 1098,
          height: 2208,
          title: "确认卡核对",
          alt: "确认卡页面：被访人与访客信息逐项列出，每个字段标注来源，底部为取消申请与确认提交按钮",
          caption: "识别结果填入确认卡并标明字段来源。点击确认提交前不调用业务接口。",
        },
        {
          src: "/images/products/logistics/step-3-submitted.jpg",
          width: 1098,
          height: 2208,
          title: "提交并返回单号",
          alt: "提交成功页面：顶部提示到访申请已提交并显示申请单号，状态为待审核",
          caption: "确认后提交到访申请，业务系统返回申请单号，状态为待审核。",
        },
      ],
      note: "截图来自模拟宿主环境（模拟用户与模拟 e行），申请单号由进程内模拟业务系统生成。",
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
          description: "每一层都要过的检查",
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
        title: "大模型输出校验",
        description: "大模型只在规则失败且原话有线索时调用；抽取结果必须是用户原话的子串。提示词只组装宿主摘要、缺项摘要、最近两轮与当前句。",
      },
      {
        icon: "workflow",
        title: "状态机与确认门",
        description: "状态转移表与技术方案逐条一致，非法转移直接拒绝；执行节点只能由带卡片编号与版本号的点击确认触发，模型无法直接触发执行。",
      },
      {
        icon: "zap",
        title: "故障降级",
        description: "大模型连续失败自动熔断并转为表单确认，意图模型未就绪回退规则分类，语音不可用提示改用文字；任何情况下都不转调外部模型。",
      },
    ],
    security: {
      description: "访客信息包含身份证号和手机号。助手只采集办理所需字段，语音转写后立即丢弃，日志中的号码脱敏，每次提交均记录审计。",
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
