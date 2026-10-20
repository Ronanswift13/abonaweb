import type { PluginGroup } from "@/types";

/**
 * 破夜绘明（DarkBreaker）监测插件矩阵 —— /products/poye-substation-monitoring#plugins
 *
 * 分类与插件清单以 DarkBreaker 仓库为准：
 * - 启用清单：plugins/.enabled_plugins.json（20 个）
 * - 系统分类：apps/plugin_ui_registry.py（A 视觉 11 / B 时序 5 / C 融合 1 / D 空间 3）
 * - 能力描述：各插件 manifest.json 与 README
 * 文案只写已实现的技术路线；现场精度以试点验收为准（见 note），不写未经验收的指标。
 * 新增插件：在对应分组 plugins 中追加一项，详情页与站内搜索自动同步。
 */
export const substationPluginGroups: PluginGroup[] = [
  {
    code: "A",
    title: "视觉缺陷与状态识别",
    description: "基于可见光、红外与高光谱图像，识别一次设备缺陷、运行状态与站内入侵目标。",
    plugins: [
      {
        id: "transformer_inspection",
        name: "主变自主巡视",
        icon: "zap",
        scene: "室外",
        description:
          "两阶段识别：先定位主变 15 类构件，再按构件裁剪 ROI，分别进入外观缺陷、油位计读数、呼吸器硅胶变色与热成像专项链。",
        techniques: ["YOLOv8 构件定位", "两阶段 ROI", "油位 / 硅胶识别", "辐射测温"],
      },
      {
        id: "switch_inspection",
        name: "开关间隔巡视",
        icon: "toggle",
        scene: "室外",
        description:
          "识别断路器、隔离开关、接地开关分合位，视频识别与遥信信号双源一致性校验，结合五防逻辑规则输出逻辑告警；画面不清晰时提示重新对焦拍摄。",
        techniques: ["分合位识别", "视频 × 遥信双源校验", "五防逻辑", "清晰度门禁"],
      },
      {
        id: "busbar_inspection",
        name: "母线巡视",
        icon: "cable",
        scene: "室外",
        description:
          "面向 4K 大视场下的远距小目标：绝缘子串销钉缺失、裂纹与异物悬挂检测，支持多 ROI 批处理，输出误报原因码与建议变焦倍率，便于二次精查。",
        techniques: ["4K 切片检测", "小目标增强", "质量门禁三态", "建议变焦倍率"],
      },
      {
        id: "capacitor_inspection",
        name: "电容器巡视",
        icon: "battery",
        scene: "室外",
        description:
          "以电容器单元六关键点进行结构姿态检测，发现结构形变异常；独立的区域入侵链基于人员检测，输出区域、轨迹与停留时长证据。",
        techniques: ["六关键点姿态", "结构异常识别", "区域入侵", "轨迹跟踪"],
      },
      {
        id: "meter_reading",
        name: "表计读数",
        icon: "gauge",
        scene: "室内",
        description:
          "无需对每块表计单独建模：关键点检测结合透视矫正实现任意角度指针表读数，支持数字表 OCR 与指示灯识别；读不准时明确拒识，不输出错误读数。",
        techniques: ["关键点检测", "透视矫正", "自动量程", "失败兜底"],
      },
      {
        id: "thermal",
        name: "热成像分析",
        icon: "scan",
        scene: "室外",
        description:
          "基于辐射测温数据分析设备热点与温度梯度，支持黑体标定验收；只接受经过标定的温度数据，拒绝伪彩图像，确保测温结论可信。",
        techniques: ["辐射温度", "热点检测", "温度梯度", "黑体标定"],
      },
      {
        id: "hyperspectral_detection",
        name: "高光谱缺陷检测",
        icon: "rainbow",
        scene: "室外",
        description: "利用高光谱成像识别锈蚀、腐蚀、油漆剥落和局部发热等肉眼难以分辨的细微材料异常。",
        techniques: ["RX 异常检测", "SAM 光谱角", "PCA 降维", "材料分析"],
      },
      {
        id: "fire_detection",
        name: "消防监测",
        icon: "flame",
        scene: "室内",
        description: "火焰与烟雾实时检测，结合时序事件链抑制瞬时误报，支持消防演练模拟。",
        techniques: ["YOLOv8 · ONNX", "火焰 / 烟雾检测", "时序事件链", "演练模拟"],
      },
      {
        id: "bird_monitoring",
        name: "鸟类监测",
        icon: "bird",
        scene: "室外",
        description:
          "输电线路及构架区域鸟类检测与轨迹跟踪，测量停留时长与区域接近风险，输出驱鸟建议；可选二阶段物种分类。",
        techniques: ["YOLOv8 · ONNX", "轨迹跟踪", "停留时长", "驱鸟建议"],
      },
      {
        id: "animal_detection",
        name: "小动物入侵检测",
        icon: "paw",
        scene: "室内",
        description: "针对鼠、蛇、猫、狗等进入开关室、电缆层的小动物进行入侵检测，按物种风险分级并输出入侵统计。",
        techniques: ["YOLOv8 · ONNX", "多目标跟踪", "风险分级", "入侵统计"],
      },
      {
        id: "human_violation_recognition",
        name: "人员违章识别",
        icon: "hardhat",
        scene: "移动作业",
        description:
          "面向执法记录仪、头盔摄像头、三防手机等移动记录设备视频，识别未戴安全帽、作业时使用手机、异常停留、疑似跌倒等违章事件，输出结构化证据链与复核建议。",
        techniques: ["人员检测", "多帧确认", "时序违章", "事后回放审计"],
      },
    ],
  },
  {
    code: "B",
    title: "时序传感与数值异常",
    description: "接入声学、气体、温度与设备遥测等时序数据，进行趋势分析与异常预警。",
    plugins: [
      {
        id: "acoustic_monitoring",
        name: "声学监测",
        icon: "waveform",
        scene: "室外",
        description: "基于 STFT 时频特征与能量事件链进行设备声学异常筛查，面向局部放电、电晕、机械异常等声学征兆。",
        techniques: ["STFT 时频分析", "能量事件链", "CNN-LSTM", "WAV 回放验证"],
      },
      {
        id: "gas_detection",
        name: "气体泄漏检测",
        icon: "wind",
        scene: "室外",
        description: "SF₆、H₂、CO、C₂H₂ 等气体浓度监测与泄漏告警，阈值规则主链叠加浓度趋势预测，预留 DGA 油中溶解气体协议接入。",
        techniques: ["阈值告警", "趋势预测", "GL-TransLSTM", "DGA 协议"],
      },
      {
        id: "device_monitoring",
        name: "设备状态监测",
        icon: "server",
        scene: "室内",
        description: "汇聚厂站设备遥测数据，计算设备健康指数，按阈值生成维护工单建议；本机指标与远端遥测严格分离。",
        techniques: ["健康指数", "遥测协议接入", "工单阈值", "故障预测"],
      },
      {
        id: "temperature_monitoring",
        name: "温度监测",
        icon: "thermometer",
        scene: "室内",
        description: "接入接触式与光纤测温传感器，进行温升趋势分析与数据归档，与热成像插件分工协同、互为印证。",
        techniques: ["光纤测温", "温升趋势", "数据归档", "联动告警"],
      },
      {
        id: "action_event_monitoring",
        name: "二次设备动作事件监测",
        icon: "workflow",
        scene: "二次设备",
        description:
          "采集保护、测控等二次设备的动作、变位与 SOE 信号，归一化为标准动作事件，提供事件时间线、一二次拓扑覆盖分析、候选事件人工复核与工作单流转。",
        techniques: ["SOE 归一化", "事件时间线", "拓扑覆盖分析", "人工复核"],
      },
    ],
  },
  {
    code: "C",
    title: "融合诊断",
    description: "把多路感知结果放到同一时间轴上综合研判，减少单一传感器的误报与漏报。",
    plugins: [
      {
        id: "multimodal_fusion",
        name: "多模态融合诊断",
        icon: "merge",
        scene: "全站",
        description:
          "整合视觉、声学、气体、高光谱等多源结果，经时间同步后进行规则融合与决策级融合诊断；跨模态注意力学习融合按数据准入通道逐步启用。",
        techniques: ["时间同步", "规则融合", "决策级融合", "跨模态注意力"],
      },
    ],
  },
  {
    code: "D",
    title: "空间感知与安防",
    description: "利用激光雷达、毫米波雷达与视觉，掌握站内人员与设备的空间位置。",
    plugins: [
      {
        id: "indoor_fence",
        name: "室内电子围栏",
        icon: "fence",
        scene: "室内",
        description:
          "视觉与 2D 激光雷达融合的室内电子围栏，支持多人跟踪、越线检测与作业授权校验，通过单应性映射把人员位置投影到站内平面；连续多帧确认抑制误报。",
        techniques: ["视觉 + 激光雷达", "ByteTrack 跟踪", "单应性映射", "授权校验"],
      },
      {
        id: "radar",
        name: "毫米波雷达感知",
        icon: "radar",
        scene: "室内",
        description: "毫米波雷达协议解析与 CFAR 检测聚类，实现不受光照影响的区域入侵与多目标跟踪，结果统一映射到站点坐标系。",
        techniques: ["TI UART 协议", "CFAR 检测", "点云聚类", "站点坐标映射"],
      },
      {
        id: "slam_mapping",
        name: "SLAM 三维建图",
        icon: "route",
        scene: "室外",
        description: "基于激光雷达、里程计与 IMU 的几何 SLAM，构建站区三维地图，支撑设备定位、巡检路径规划与地面沉降监测。",
        techniques: ["ICP / NDT 配准", "关键帧管理", "回环检测", "点云质量门"],
      },
    ],
  },
];

/** 插件总数（首页、产品页等处引用，避免手写数字与清单不一致） */
export const substationPluginCount = substationPluginGroups.reduce((sum, g) => sum + g.plugins.length, 0);
