// 所有作品项目都放在这个数组里。
// 后期新增项目时，复制一个对象，修改文字和图片路径即可。
export const projects = [
  {
    id: "dongfeng-lantu-kv", // 项目唯一英文路径，会出现在网址里，例如 /project/dongfeng-lantu-kv
    title: "东风岚图汽车 KV 视觉设计", // 项目名称
    titleLines: ["岚图FREE 318","KV 视觉设计"], // 项目详情页大标题的手动断行，每一行尽量是完整词组
    category: "automotive", // 项目分类英文，用于后期筛选或分类
    categoryName: "汽车广告", // 项目分类中文，显示在页面上
    type: "KV设计", // 设计类型
    brand: "东风岚图", // 品牌名称
    year: "2024", // 项目年份
    role: "视觉设计 / KV 设计 / 画面合成", // 我的角色
    tools: ["Photoshop", "Illustrator",], // 使用工具
    coverImage: "/assets/projects/dongfeng-lantu-kv/cover.jpg", // 项目封面图路径
    heroImage: "/assets/projects/dongfeng-lantu-kv/hero.jpg", // 项目详情页首图路径
    description: "为东风 FREE 318 上市打造一组贴合车型气质和品牌态度的 KV 视觉。", // 一句话项目简介
    
    background:
      "围绕新能源车型的上市传播，梳理发布会、社媒和户外延展都能承接的主视觉方向。", // 项目背景
    responsibilities: [
      "梳理车型气质与广告视觉关键词",
      "规划主 KV 的画面构图和信息层级",
      "完成车辆、光影、背景与文字的合成排版",
      "输出横版、竖版及社媒传播尺寸",
    ], // 我负责的工作
    images: [
      "/assets/projects/dongfeng-lantu-kv/01.jpg",
      "/assets/projects/dongfeng-lantu-kv/02.jpg",
      "/assets/projects/dongfeng-lantu-kv/03.jpg",
      "/assets/projects/dongfeng-lantu-kv/04.jpg",
      "/assets/projects/dongfeng-lantu-kv/05.jpg",
      "/assets/projects/dongfeng-lantu-kv/06.jpg",
      "/assets/projects/dongfeng-lantu-kv/07.jpg",
    ], // 项目详情展示图数组
  },
  {
    id: "la-mer-aigc-visual",
    title: "海蓝之谜 AIGC 创意视觉",
    titleLines: ["海蓝之谜", "AIGC 创意视觉"],
    category: "aigc",
    categoryName: "AIGC视觉设计",
    type: "AIGC海报",
    brand: "海蓝之谜",
    year: "2025",
    role: "AIGC 视觉生成 / 美妆视觉设计 / 后期合成",
    tools: ["ComfyUI", "Stable Diffusion", "Photoshop"],
    coverImage: "/assets/projects/la-mer-aigc-visual/cover.jpg",
    heroImage: "/assets/projects/la-mer-aigc-visual/hero.jpg",
    description: "为高端护肤品牌探索南意海岸氛围下的产品质感和 AIGC 视觉表达。",
    background:
      "从品牌调性、场景氛围和产品质感入手，用 AIGC 做前期画面探索，再通过后期修图接近商业视觉标准。",
    responsibilities: [
      "拆解品牌调性与美妆视觉关键词",
      "编写并优化 AIGC 生成提示词",
      "筛选适合继续延展的图像方案",
      "完成产品合成、质感修饰与版式设计",
    ],
    images: [
      "/assets/projects/la-mer-aigc-visual/01.mp4",
      "/assets/projects/la-mer-aigc-visual/02.jpg",
      "/assets/projects/la-mer-aigc-visual/03.jpg",
      "/assets/projects/la-mer-aigc-visual/04.jpg",
      "/assets/projects/la-mer-aigc-visual/05.jpg",
      "/assets/projects/la-mer-aigc-visual/06.jpg",
      "/assets/projects/la-mer-aigc-visual/07.jpg",
      "/assets/projects/la-mer-aigc-visual/08.jpg",
      
    ],
  },
  {
    id: "offline-material-design",
    title: "岚图知音画册设计",
    titleLines: ["岚图知音", "画册设计"],
    category: "automotive",
    categoryName: "汽车广告",
    type: "画册设计",
    brand: "岚图知音",
    year: "2024",
    role: "视觉设计 / 物料延展 / 印刷文件整理",
    tools: ["Illustrator", "Photoshop"],
    coverImage: "/assets/projects/offline-material-design/cover.jpg",
    heroImage: "/assets/projects/offline-material-design/hero.jpg",
    description: "为岚图知音梳理一套干净克制、突出产品质感的画册视觉。",
    background:
      "围绕车型卖点、品牌语气和阅读节奏，搭建适合销售沟通与品牌传播的画册表达。",
    responsibilities: [
      "梳理车型信息、卖点层级与画册节奏",
      "设计封面、跨页、参数页和详情页版式",
      "统一图片裁切、留白、标题和正文层级",
      "检查印刷尺寸、出街尺寸与交付文件",
    ],
    images: [
      "/assets/projects/offline-material-design/01.jpg",
      "/assets/projects/offline-material-design/02.jpg",
      "/assets/projects/offline-material-design/03.jpg",
      "/assets/projects/offline-material-design/04.jpg",
      "/assets/projects/offline-material-design/05.jpg",
      "/assets/projects/offline-material-design/06.jpg",
      "/assets/projects/offline-material-design/07.jpg",
      "/assets/projects/offline-material-design/08.jpg",
      "/assets/projects/offline-material-design/09.jpg",
      "/assets/projects/offline-material-design/10.jpg",
    ],
  },
  {
    id: "aizhongcao-ip-aigc",
    title: "爱种草 2025 年度 showreel",
    titleLines: ["爱种草 2025", "年度 showreel"],
    category: "aigc",
    categoryName: "AIGC视觉设计",
    type: "年度 Showreel",
    brand: "爱种草",
    year: "2025",
    role: "IP 视觉探索 / AIGC 生成 / AIGC动效",
    tools: ["lora", "lovart", "即梦"],
    coverImage: "/assets/projects/aizhongcao-ip-aigc/cover.jpg",
    heroImage: "/assets/projects/aizhongcao-ip-aigc/hero.jpg",
    description: "整合爱种草年度内容资产，将 IP、AIGC 视觉和传播画面剪成 showreel 叙事。",
    background:
      "把全年视觉内容、IP 场景和 AIGC 生成成果重新梳理成一条更适合展示和传播的年度线索。",
    responsibilities: [
      "梳理年度内容资产和视觉主线",
      "筛选适合 showreel 节奏的关键画面",
      "统一 IP 视觉、场景氛围和转场节奏",
      "整理可延展的 AIGC 关键词和风格规范",
    ],
    images: [
      "/assets/projects/aizhongcao-ip-aigc/01.mp4",
      "/assets/projects/aizhongcao-ip-aigc/02.jpg",
      "/assets/projects/aizhongcao-ip-aigc/03.jpg",
      "/assets/projects/aizhongcao-ip-aigc/04.jpg",
      "/assets/projects/aizhongcao-ip-aigc/05.jpg",
      "/assets/projects/aizhongcao-ip-aigc/06.jpg",
    ],
  },
  {
    id: "vi-design",
    title: "VI设计",
    titleLines: ["VI设计"],
    category: "ui",
    categoryName: "其他内容",
    type: "VI设计",
    brand: "品牌视觉",
    year: "2023",
    role: "VI 规范 / 视觉系统 / 应用延展",
    tools: ["Illustrator", "Photoshop"],
    coverImage: "/assets/projects/vi-design/cover.jpg",
    heroImage: "/assets/projects/vi-design/hero.jpg",
    description: "为品牌梳理基础视觉识别，统一 logo、字体、色彩和应用场景。",
    background:
      "从基础系统到应用延展，整理一套方便后续落地和维护的 VI 规范手册。",
    responsibilities: [
      "梳理品牌定位与视觉关键词",
      "设计 logo 和辅助图形系统",
      "制定色彩、字体与版式规范",
      "输出办公用品、宣传物料等应用设计",
    ],
    images: [
      "/assets/projects/vi-design/01.jpg",
      "/assets/projects/vi-design/02.jpg",
      "/assets/projects/vi-design/03.jpg",
      "/assets/projects/vi-design/04.jpg",
      "/assets/projects/vi-design/05.jpg",
      "/assets/projects/vi-design/06.jpg",
    ],
  },
  {
    id: "ppt-beautification",
    title: "PPT美化",
    titleLines: ["PPT 设计"],
    category: "ui",
    categoryName: "其他内容",
    type: "PPT设计",
    brand: "公司介绍",
    year: "2025",
    role: "PPT 视觉升级 / 版式优化 / 图表美化",
    tools: ["PowerPoint", "Keynote", "Illustrator"],
    coverImage: "/assets/projects/ppt-beautification/cover.jpg",
    heroImage: "/assets/projects/ppt-beautification/hero.jpg",
    description: "在原有内容基础上优化 PPT 的视觉质感、信息层级和演示节奏。",
    background:
      "保留原有核心信息，重新梳理页面关系，让汇报内容更清楚，也更符合正式场景的观看习惯。",
    responsibilities: [
      "分析原 PPT 的信息结构和视觉问题",
      "重设版式、色彩和字体层级",
      "优化图表、图标与图片呈现方式",
      "输出可直接使用的美化后 PPT 文件",
    ],
    images: [
      "/assets/projects/ppt-beautification/01.jpg",
      "/assets/projects/ppt-beautification/02.jpg",
      "/assets/projects/ppt-beautification/03.jpg",
      "/assets/projects/ppt-beautification/04.jpg",
      "/assets/projects/ppt-beautification/05.jpg",
      "/assets/projects/ppt-beautification/06.jpg",
      "/assets/projects/ppt-beautification/07.jpg",
      "/assets/projects/ppt-beautification/08.jpg",
      "/assets/projects/ppt-beautification/09.jpg",
      "/assets/projects/ppt-beautification/10.jpg",
      "/assets/projects/ppt-beautification/11.jpg",
      "/assets/projects/ppt-beautification/12.jpg",
      "/assets/projects/ppt-beautification/13.jpg",
      "/assets/projects/ppt-beautification/14.jpg",

    ],
  },
  {
    id: "font-logo",
    title: "字体和logo",
    titleLines: ["字体和logo"],
    category: "ui",
    categoryName: "其他内容",
    type: "字体/Logo",
    brand: "品牌视觉",
    year: "2023",
    role: "字体设计 / Logo 设计 / 品牌标识",
    tools: ["Illustrator", "Photoshop"],
    coverImage: "/assets/projects/font-logo/cover.jpg",
    heroImage: "/assets/projects/font-logo/hero.jpg",
    description: "为品牌和活动设计标准字、标识与 logo 方案。",
    background:
      "围绕品牌语气和使用场景，调整字体结构、标识比例和基础应用方式。",
    responsibilities: [
      "分析品牌调性与应用场景",
      "设计字体结构和笔画细节",
      "完成 logo 图形和标准制图",
      "输出多尺寸、多场景的标识文件",
    ],
    images: [
      "/assets/projects/font-logo/01.jpg",
      "/assets/projects/font-logo/02.jpg",
    ],
  },
  {
    id: "composite-poster",
    title: "合成海报",
    titleLines: ["合成海报"],
    category: "ui",
    categoryName: "其他内容",
    type: "合成海报",
    brand: "商业视觉",
    year: "2024-2026",
    role: "创意合成 / 视觉设计 / 后期修图",
    tools: ["Photoshop", "Illustrator"],
    coverImage: "/assets/projects/composite-poster/cover.jpg",
    heroImage: "/assets/projects/composite-poster/hero.jpg",
    description: "通过多素材合成完成一组更具画面张力的商业海报。",
    background:
      "练习从主题设定、素材选择到光影统一的完整画面控制，重点放在商业海报的可落地表达。",
    responsibilities: [
      "确定海报主题和核心视觉概念",
      "收集并整理可合成素材",
      "统一透视、光影、色调和空间关系",
      "完成标题文字和版式信息排布",
    ],
    images: [
      "/assets/projects/composite-poster/01.jpg",
      "/assets/projects/composite-poster/02.jpg",
      "/assets/projects/composite-poster/03.jpg",
      "/assets/projects/composite-poster/04.jpg",
      "/assets/projects/composite-poster/05.jpg",
      "/assets/projects/composite-poster/06.jpg",
      "/assets/projects/composite-poster/07.jpg",
      "/assets/projects/composite-poster/08.jpg",
      "/assets/projects/composite-poster/09.jpg",
      "/assets/projects/composite-poster/10.jpg",
      "/assets/projects/composite-poster/11.jpg",
      "/assets/projects/composite-poster/12.jpg",
      "/assets/projects/composite-poster/13.jpg",
      "/assets/projects/composite-poster/14.jpg",
      "/assets/projects/composite-poster/15.jpg",
      "/assets/projects/composite-poster/16.jpg",
    ],
  },
];

// 分类信息，分类页和首页分类入口都会读取这里。
export const projectCategories = [
  {
    id: "automotive",
    name: "汽车广告",
    titleLines: ["汽车广告"],
    label: "Automotive",
    description:
      "聚焦汽车新品发布、车型主视觉和传播物料，用画面气质回应产品卖点。",
  },
  {
    id: "aigc",
    name: "AIGC视觉设计",
    titleLines: ["AIGC视觉设计"],
    label: "AIGC Visual Design",
    description:
      "记录从图像生成、筛选修图到商业视觉落地的 AIGC 实践过程。",
  },
  {
    id: "ui",
    name: "其他内容",
    titleLines: ["其他设计内容"],
    label: "Other design elements",
    description:
       "收录设计试验、字体 logo、PPT 美化等更偏执行和探索的内容。",
  },
];

// 首页精选项目固定展示这 4 个，轮播会按这个顺序读取。
export const featuredProjectIds = [
  "dongfeng-lantu-kv",
  "aizhongcao-ip-aigc",
  "offline-material-design",
  "la-mer-aigc-visual",
];

export const featuredProjects = featuredProjectIds
  .map((id) => projects.find((project) => project.id === id))
  .filter(Boolean);
