window.trainingSources = [
  {
    id: "logic-chain",
    title: "逻辑决策链",
    stage: "chain",
    stageLabel: "总览链路",
    asset: "assets/images/logic-decision-chain.png",
    sourceFile: "逻辑决策链.png",
    density: "高",
    readability: "可读",
    status: "已确认",
    tags: ["新闻", "数据", "HTF", "关键区", "风控", "执行"],
    summary: "把新闻/数据、HTF结构、关键区、价格抵达、技术原型、账户状态、下单和持仓管理串成完整流程。",
    useCase: "适合作为全站主导航和日内交易前的流程检查表。",
    notes: ["图中 P1-P9 构成主流程。", "细节应回看原图，不应脱离上下文单独使用。"]
  },
  {
    id: "macro-news-flow",
    title: "新闻分析决策流",
    stage: "macro",
    stageLabel: "宏观背景",
    asset: "assets/images/macro-news-flow.png",
    sourceFile: "【全实战新闻分析决策流】核心：宏观背景+操盘战.png",
    density: "高",
    readability: "可读",
    status: "已确认",
    tags: ["CPI", "PCE", "FOMC", "NFP", "GDP", "PMI", "黄金", "白银", "股指"],
    summary: "从通胀与货币政策、就业与增长、地缘风险和终极交操几个入口判断资产反应。",
    useCase: "适合放在交易前的宏观解释层，帮助判断数据是偏冷、偏热还是风险事件。",
    notes: ["图内包含 FlowUs 水印。", "资产反应是源文件观点，不代表确定性预测。"]
  },
  {
    id: "macro-2026-map",
    title: "2026宏观逻辑全景图",
    stage: "macro",
    stageLabel: "宏观背景",
    asset: "assets/images/macro-2026-map.png",
    sourceFile: "2026宏观逻辑全景图：经济指标、黄金与股指的脱钩与趋同.png",
    density: "高",
    readability: "可读",
    status: "已确认",
    tags: ["NFP", "GDP", "PMI", "黄金", "股指", "利率预期", "美元"],
    summary: "围绕经济指标、利率预期、美元、美债收益率、黄金和股指的关系建立宏观解释框架。",
    useCase: "适合在新闻事件后对照，判断黄金与股指可能同涨、脱钩或反向。",
    notes: ["标题包含 2026，时效性与市场环境需后续人工确认。"]
  },
  {
    id: "decision-flow",
    title: "日内决策流程图",
    stage: "execution",
    stageLabel: "入场执行",
    asset: "assets/images/decision-flow.png",
    sourceFile: "决策流程图.png",
    density: "中",
    readability: "可读",
    status: "已确认",
    tags: ["日内准备", "新闻", "HTF", "T0/T1", "止损", "持仓"],
    summary: "从日内准备、新闻/数据、HTF结构/订单流进入方向判断，再到关键区、技术原型、账户状态和下单执行。",
    useCase: "适合做成一步步执行检查，减少临场跳步。",
    notes: ["带有 ProcessOn 水印。", "流程规则来自源图，不代表通用交易建议。"]
  },
  {
    id: "trading-system",
    title: "交易系统",
    stage: "review",
    stageLabel: "复盘验证",
    asset: "assets/images/trading-system.png",
    sourceFile: "交易系统.png",
    density: "中",
    readability: "可读",
    status: "已确认",
    tags: ["稳定盈利", "复盘", "执行力", "风险", "期望值"],
    summary: "强调系统可验证、可持续、规则一致，以及静态/动态策略记录、实时模拟、考试盘和实盘验证。",
    useCase: "适合作为复盘与系统建设入口，连接执行记录和风险边界。",
    notes: ["收益期望值公式来自源图，仅作为资料内容展示。"]
  },
  {
    id: "key-zone",
    title: "显著区 Key Zone",
    stage: "keyzone",
    stageLabel: "关键区",
    asset: "assets/images/key-zone.png",
    sourceFile: "显著区(Key Zone).png",
    density: "中",
    readability: "可读",
    status: "已确认",
    tags: ["KZ", "LRZ", "ORZ", "PMZ", "Delta", "止损安全垫"],
    summary: "定义显著区的用途、开仓要求、逻辑反转判断、止损安全垫和几类关键区域。",
    useCase: "适合放在入场前确认层：价格是否抵达可操作区域，止损是否合理。",
    notes: ["部分缩写应保留原文，后续可补术语解释。"]
  },
  {
    id: "dom",
    title: "DOM 与 Price Ladder",
    stage: "orderflow",
    stageLabel: "盘口/订单流",
    asset: "assets/images/dom.png",
    sourceFile: "DOM.png",
    density: "高",
    readability: "可读",
    status: "已确认",
    tags: ["DOM", "Price Ladder", "Delta", "挂单", "撤单", "Reloading"],
    summary: "说明 DOM/Price Ladder 的用途、关注点、成交量、挂单撤单、价格速度、重新加载和判断倒向剥头皮。",
    useCase: "适合做盘口工具说明和临盘观察清单。",
    notes: ["图较长，建议网页提供大图查看。"]
  },
  {
    id: "footprint",
    title: "足迹图",
    stage: "orderflow",
    stageLabel: "盘口/订单流",
    asset: "assets/images/footprint.png",
    sourceFile: "足迹图.png",
    density: "高",
    readability: "可读",
    status: "已确认",
    tags: ["Footprint", "Delta", "Ask/Bid", "失衡", "吸筹", "趋势"],
    summary: "围绕足迹图工具、左侧/右侧策略、失衡、成交量、行情有效延续和复盘训练展开。",
    useCase: "适合做订单流确认层，帮助判断突破、反转、吸筹和延续。",
    notes: ["图中存在作业/日期说明，是否纳入正式流程待确认。"]
  },
  {
    id: "heatmap",
    title: "热图",
    stage: "orderflow",
    stageLabel: "盘口/订单流",
    asset: "assets/images/heatmap.png",
    sourceFile: "热图.png",
    density: "中",
    readability: "可读",
    status: "已确认",
    tags: ["Heatmap", "大挂单", "Sweep", "Spoofing", "突破", "吸筹"],
    summary: "关注大挂单、高亮色块、Sweep 后价格持续性、闪挂大单、足迹图验证和毛刺。",
    useCase: "适合做流动性观察层，辅助判断支撑阻力和反转概率。",
    notes: ["热图信号需和足迹图、价格行为结合，不能单独作为结论。"]
  },
  {
    id: "options-basics",
    title: "期权做市商 Delta 中性策略与动态对冲",
    stage: "options",
    stageLabel: "做市商对冲环境",
    asset: "assets/images/options-basics.png",
    sourceFile: "期权基础.png",
    density: "高",
    readability: "可读",
    status: "已确认",
    tags: ["期权做市商", "Delta 中性", "动态对冲", "Gamma", "GEX", "0DTE", "Call Wall", "Put Wall"],
    summary: "围绕做市商为降低方向性风险而维持 Delta 中性，以及根据标的价格、Delta、Gamma、GEX、0DTE、Call Wall / Put Wall 等变化持续调整对冲仓位。",
    useCase: "适合放在交易决策链路中的期权环境/对冲环境判断层，用来理解市场结构、流动性结构和价格反馈机制。",
    notes: [
      "用户确认：本图核心主题为期权做市商 Delta 中性策略与动态对冲。",
      "内容用于学习市场结构和复盘，不构成投资建议，也不应被理解为确定性交易信号。",
      "术语较多，后续可拆成术语表。"
    ]
  },
  {
    id: "options-longform",
    title: "期权做市商动态对冲手写图",
    stage: "options",
    stageLabel: "做市商对冲环境",
    asset: "assets/images/options-longform.jpg",
    sourceFile: "期权图.jpg",
    density: "高",
    readability: "部分待确认",
    status: "待确认",
    tags: ["期权做市商", "Delta 中性", "动态对冲", "Gamma", "GEX", "0DTE", "Call Wall", "Put Wall", "对冲流"],
    summary: "手写图围绕期权做市商 Delta 中性与动态对冲展开，展示 Gamma、GEX、Call Wall / Put Wall 等结构如何作为理解对冲强度和价格反馈的背景线索。",
    useCase: "适合做期权环境/做市商对冲环境的原图参考，用于学习市场结构和对冲机制，不适合直接抽取买卖规则。",
    notes: [
      "用户确认：本图核心主题为期权做市商 Delta 中性策略与动态对冲。",
      "图片很长且含手写内容，部分文字、数值、参数和阈值无法可靠识别，继续标记为待确认。",
      "内容用于学习和复盘，不构成投资建议，也不应被理解为确定性交易信号。"
    ]
  },
  {
    id: "reversal-model",
    title: "反转模型图",
    stage: "reversal",
    stageLabel: "反转判断",
    asset: "assets/images/reversal-model.jpg",
    sourceFile: "反转模型图.jpg",
    density: "高",
    readability: "部分待确认",
    status: "待确认",
    tags: ["反转", "订单流", "成交概率", "模型", "回报"],
    summary: "围绕做市商困境、订单流和流动性特征，展示反转事件的模型构建与验证思路。",
    useCase: "适合放在方向确认后的反转专题页或高级模块。",
    notes: ["包含小字、参数和表格，不能在未复核前作为精确模型依据。"]
  }
];

window.decisionStages = [
  {
    id: "chain",
    title: "总览链路",
    brief: "先用一张主链路图建立全局步骤，避免把工具信号割裂使用。"
  },
  {
    id: "macro",
    title: "宏观背景",
    brief: "理解新闻、数据、利率预期、黄金和股指之间的关系。"
  },
  {
    id: "keyzone",
    title: "关键区",
    brief: "确认价格是否进入值得交易的区域，以及止损是否有空间。"
  },
  {
    id: "orderflow",
    title: "盘口/订单流",
    brief: "用 DOM、足迹图和热图观察成交、挂单、吸收、扫单和延续。"
  },
  {
    id: "options",
    title: "做市商对冲环境",
    brief: "用 Delta 中性、动态对冲、Gamma、GEX、0DTE、Call Wall 和 Put Wall 理解期权结构与价格反馈。"
  },
  {
    id: "execution",
    title: "入场执行",
    brief: "把方向、关键区、技术原型和账户状态合并成执行动作。"
  },
  {
    id: "reversal",
    title: "反转判断",
    brief: "专门处理反转模型、订单流特征和验证风险。"
  },
  {
    id: "review",
    title: "复盘验证",
    brief: "回到交易系统，记录策略、执行力、期望值和风险边界。"
  }
];
