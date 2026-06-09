# 01｜制作网页作品集的流程 SOP

适用对象：希望用 AI + 轻代码方式制作个人视觉设计作品集的设计师。

适用项目：当前作品集是面向招聘方的视觉设计作品集，技术结构为 React + Vite + Tailwind CSS，内容数据集中在 `src/data/projects.js`，图片和视频资产集中在 `public/assets`。

## 一、前置准备

在开始让 AI 写代码前，先把内容准备好。网页作品集最怕一边做页面一边补内容，这会导致视觉风格反复、项目顺序混乱、图片比例不统一。

### 1. 明确作品集目标

当前项目的目标不是做炫技网站，而是让招聘方快速判断：

- 你的审美是否成熟。
- 你的商业视觉是否能落地。
- 你的作品是否有清晰分类。
- 你是否能把项目讲清楚。
- 你是否具备 AIGC、品牌视觉、KV、画册、PPT、合成等综合能力。

本项目定位关键词：

- 精致
- 商业
- 成熟
- 克制
- 图像主导
- Apple-like 但不复制 Apple

需要避免：

- 科技感过重
- 大量渐变、发光、玻璃拟态
- 过圆的卡片
- 简历式密集排版
- 社媒模板感
- 只堆图但没有项目逻辑

### 2. 准备项目内容表

每个项目至少准备以下信息：

| 字段 | 说明 | 示例 |
| --- | --- | --- |
| 项目名称 | 页面显示标题 | 东风岚图汽车 KV 视觉设计 |
| 项目短标题 | 详情页大标题断行 | 岚图FREE 318 / KV 视觉设计 |
| 分类 | 用于作品筛选 | 汽车广告 / AIGC视觉设计 / 其他内容 |
| 类型 | 项目具体形式 | KV设计 / AIGC海报 / 画册设计 |
| 品牌 | 项目所属品牌 | 东风岚图 |
| 年份 | 项目时间 | 2024 |
| 角色 | 你负责的工作 | 视觉设计 / KV 设计 / 画面合成 |
| 工具 | 使用软件 | Photoshop / Illustrator / ComfyUI |
| 一句话简介 | 卡片和详情页摘要 | 为车型上市打造主视觉 |
| 项目背景 | 说明为什么做 | 围绕上市传播梳理主视觉方向 |
| 负责事项 | 3-5 条具体工作 | 构图、合成、延展、交付 |
| 封面图 | 列表页使用 | cover.jpg |
| 首图 | 详情页首屏使用 | hero.jpg |
| 展示图 | 详情页图片序列 | 01.jpg、02.jpg |

### 3. 准备图片和视频资产

建议每个项目建立独立文件夹：

```txt
public/assets/projects/项目英文id/
```

推荐命名：

```txt
cover.jpg
hero.jpg
01.jpg
02.jpg
03.jpg
01.mp4
```

注意：

- `cover.jpg` 用于首页、作品页卡片。
- `hero.jpg` 用于项目详情页首屏。
- 详情图按阅读顺序命名为 `01.jpg`、`02.jpg`。
- 视频可用 `mp4`，但不要太大。
- 图片尽量提前裁好比例，不要把所有裁切都交给代码。

### 4. 准备 AI 项目说明文件

这个项目已经有三个关键文档：

- `PRODUCT.md`：说明作品集定位、受众、反面参考。
- `DESIGN.md`：说明视觉方向、色彩、字体、圆角、布局、动效。
- `AGENTS.md`：说明 AI 修改项目时必须遵守的工作规则。

以后每次让 AI 改页面，都应该先提醒它读取这三个文件。

推荐开场提示词：

```txt
请先阅读 PRODUCT.md、DESIGN.md 和 AGENTS.md，再基于当前 React/Vite/Tailwind 项目修改作品集。目标是面向招聘方的成熟商业视觉设计作品集。保持图像主导、克制、精致、Apple-like 但不直接复制 Apple。不要做科技感、发光渐变、过圆卡片或简历式布局。
```

## 二、整体制作流程

### 第 1 步：建立作品集的信息架构

先确定网站有哪些页面。

当前项目结构：

| 页面 | 路径 | 文件 |
| --- | --- | --- |
| 首页 | `/` | `src/pages/Home.jsx` |
| 全部作品 | `/work` | `src/pages/Work.jsx` |
| 分类作品 | `/work/:category` | `src/pages/Work.jsx` |
| 项目详情 | `/project/:projectId` | `src/pages/ProjectDetail.jsx` |
| 关于 | `/about` | `src/pages/About.jsx` |
| 404 | `*` | `src/pages/NotFound.jsx` |

首页负责建立第一印象，作品页负责快速浏览，详情页负责展示项目质感，关于页负责补充个人信息和联系方式。

AI 提示词：

```txt
请帮我检查当前作品集的信息架构是否适合招聘方快速评估。重点看首页、作品页、项目详情页和关于页的阅读路径，给出可以直接落地的修改建议。不要新增复杂后台，保持内容维护简单。
```

### 第 2 步：建立项目数据模型

当前项目把所有作品写在：

```txt
src/data/projects.js
```

这是轻代码维护的核心。你不需要理解完整 React，只要会复制一个项目对象并修改字段。

核心字段：

```js
{
  id: "dongfeng-lantu-kv",
  title: "东风岚图汽车 KV 视觉设计",
  titleLines: ["岚图FREE 318", "KV 视觉设计"],
  category: "automotive",
  categoryName: "汽车广告",
  type: "KV设计",
  brand: "东风岚图",
  year: "2024",
  role: "视觉设计 / KV 设计 / 画面合成",
  tools: ["Photoshop", "Illustrator"],
  coverImage: "/assets/projects/dongfeng-lantu-kv/cover.jpg",
  heroImage: "/assets/projects/dongfeng-lantu-kv/hero.jpg",
  description: "为车型上市打造一组贴合品牌态度的 KV 视觉。",
  background: "围绕上市传播梳理主视觉方向。",
  responsibilities: [
    "梳理车型气质与广告视觉关键词",
    "规划主 KV 的画面构图和信息层级",
    "完成车辆、光影、背景与文字的合成排版"
  ],
  images: [
    "/assets/projects/dongfeng-lantu-kv/01.jpg"
  ]
}
```

AI 提示词：

```txt
我要新增一个作品项目，请只修改 src/data/projects.js，不要重构页面结构。请根据我提供的项目名称、分类、图片路径和项目描述，帮我补齐一个风格一致的 project 对象，并检查字段是否完整。
```

### 第 3 步：确定视觉方向

当前视觉规则：

- 黑色、柔和灰、白色、少量橙色点缀。
- 字体使用系统无衬线和 OPPO Sans。
- 页面留白充足。
- 媒体框圆角控制在 12px-18px。
- 卡片和信息模块圆角控制在 14px-20px。
- 不使用夸张发光、科技渐变、花哨入场动画。

AI 提示词：

```txt
请根据 DESIGN.md 优化当前页面视觉。重点提升：留白、对齐、图片比例、标题层级、按钮精致度、移动端阅读体验。保持黑白灰为主、橙色只做少量强调。不要使用大面积渐变、发光、玻璃拟态和过圆卡片。
```

### 第 4 步：制作首页

当前首页包含：

- 开场 loading 动画。
- 圆形作品图组成的首屏。
- 中央介绍文案。
- 大号个人品牌名 `SHISAN`。
- 精选项目轮播。
- 项目分类入口。
- 品牌 logo 横向滚动。
- 联系方式和简历下载。

主要文件：

| 内容 | 文件 |
| --- | --- |
| 首页结构 | `src/pages/Home.jsx` |
| 圆形作品图 | `src/components/SphereCarousel.jsx` |
| 精选项目轮播 | `src/components/FeaturedCarousel.jsx` |
| 分类入口 | `src/components/CategoryCard.jsx` |
| 品牌滚动 | `src/components/BrandMarquee.jsx` |
| 首页样式 | `src/index.css` |

首页动效使用了：

- `useEffect` 监听滚动和窗口变化。
- `requestAnimationFrame` 控制滚动时的动效刷新。
- `IntersectionObserver` 判断区块是否进入视口。
- CSS 变量控制首屏退场、透明度、位移、缩放、模糊。
- `prefers-reduced-motion` 为不希望动效的用户关闭复杂动画。

AI 提示词：

```txt
请优化首页第一屏和精选项目区域。目标是让招聘方一眼看到设计师身份和项目质感。保持当前 SphereCarousel、FeaturedCarousel 和项目数据结构，不要重写成模板化落地页。动效要慢、轻、克制，并保留 prefers-reduced-motion 支持。
```

### 第 5 步：制作项目详情页

当前详情页结构：

- 大幅 hero 首图。
- 项目分类、年份、标题、简介。
- 项目元信息条：分类、类型、品牌、年份、角色、工具。
- 图片或视频画廊。
- 项目背景。
- 负责事项。
- 上一个 / 下一个项目。

主要文件：

```txt
src/pages/ProjectDetail.jsx
```

详情页针对不同项目做了不同画廊布局：

- `portraitGalleryProjectIds`：竖图类项目。
- `brochureGalleryProjectIds`：画册类项目。
- `posterGalleryProjectIds`：海报类项目。

图片展示使用：

- `LazyImage`：进入视口后再加载。
- `srcSet`：根据屏幕尺寸加载不同图片。
- `projectGallerySrc`：先显示 600px 缩略图，再切换高清图。
- 视频资产自动识别 `mp4`、`webm`、`mov`。

AI 提示词：

```txt
请优化项目详情页，让它更像高级商业案例展示，而不是数据库详情页。重点处理 hero 图、元信息条、图片画廊间距、项目背景和职责列表。保持 src/data/projects.js 的数据字段不变，兼容图片和 mp4 视频。
```

### 第 6 步：制作响应式布局

必须检查三个尺寸：

- 手机：375px 宽。
- 平板：768px 宽。
- 桌面：1440px 宽。

重点检查：

- 标题是否换行合理。
- 图片是否裁掉重要内容。
- 卡片是否太挤。
- 按钮文字是否溢出。
- 详情页图片是否一列展示正常。
- 轮播按钮是否挡住重要画面。

项目中常用的响应式方法：

- Tailwind 断点：`sm:`、`md:`、`lg:`。
- CSS `clamp()` 控制标题和间距。
- `sizes` + `srcSet` 控制图片加载。
- `grid` 和 `flex` 调整布局。

AI 提示词：

```txt
请检查并修复桌面端和移动端响应式问题。重点看 375px、768px、1440px 三个宽度。要求文字不溢出、不遮挡，项目图片不被不合理裁切，按钮和导航可点击，视觉节奏保持高级克制。
```

### 第 7 步：图片优化

当前项目有自动图片处理脚本。

命令：

```bash
npm run process-images
```

这个命令会执行：

```bash
node scripts/convert-to-webp.js
node scripts/generate-thumbnails.js
```

生成内容：

| 目录 | 作用 |
| --- | --- |
| `public/assets/optimized/projects` | 1800px 高清 WebP |
| `public/assets/desktop/projects` | 1200px 桌面 WebP |
| `public/assets/mobile/projects` | 960px 移动端 WebP |
| `public/assets/thumbs/projects` | 600px 画廊缩略图 |

专业代码点：

- 使用 `sharp` 压缩图片。
- 使用 WebP 格式降低体积。
- 使用 `srcSet` 让浏览器自动选择合适尺寸。
- 使用 `loading="lazy"` 延迟加载非首屏图片。
- 使用 `fetchPriority="high"` 提升首屏图加载优先级。

AI 提示词：

```txt
请检查当前项目图片加载策略。要求首页和详情页首屏加载快，画廊图片保持清晰但不要过大。不要改变内容数据结构，优先使用已有 scripts/convert-to-webp.js、generate-thumbnails.js、srcSet 和 LazyImage。
```

### 第 8 步：动效制作

当前项目使用的动效类型：

- 首页 loading 数字和进度线。
- 圆形作品图轻微漂浮。
- 首页滚动时首屏内容淡出、位移、缩放、模糊。
- 内容区进入视口后渐入。
- 品牌 logo 横向滚动。
- 精选项目自动轮播。
- 卡片 hover 时图片轻微缩放。
- 详情页画廊进入视口时 reveal。

动效原则：

- 慢一点。
- 轻一点。
- 不弹跳。
- 不要炫技。
- 不影响阅读。
- 不让内容在动画结束前不可见。
- 必须支持 `prefers-reduced-motion`。

涉及的专业代码：

- `IntersectionObserver`
- `requestAnimationFrame`
- CSS `@keyframes`
- CSS custom properties
- `transform`
- `opacity`
- `filter: blur()`
- `transition`
- `prefers-reduced-motion`
- React `useEffect`
- React `useState`
- React `useRef`
- React `useCallback`

AI 提示词：

```txt
请优化动效质感。方向是高级、慢速、轻微、服务内容，不要弹跳、不要炫酷转场、不要发光科技感。保留 prefers-reduced-motion，并确保首屏和项目图不会因为动画出现空白。
```

### 第 9 步：构建检查

每次改完代码后都要运行：

```bash
npm run build
```

当前 `package.json` 中：

```json
{
  "scripts": {
    "dev": "vite",
    "process-images": "node scripts/convert-to-webp.js && node scripts/generate-thumbnails.js",
    "prebuild": "npm run process-images",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

也就是说，执行 `npm run build` 前会自动处理图片。

检查重点：

- 是否构建成功。
- 是否出现图片路径错误。
- 是否有组件语法错误。
- 打包后是否能正常预览。

### 第 10 步：部署上线

当前项目有 Netlify 配置：

```txt
netlify.toml
```

配置内容：

- 构建命令：`npm run build`
- 发布目录：`dist`
- SPA 路由重定向到 `index.html`
- WebP、MP4、字体等静态资源设置缓存策略

部署前检查：

- 首页是否正常。
- 所有项目详情页能打开。
- 简历 PDF 能下载。
- 手机端没有文字重叠。
- 图片加载速度可接受。
- 联系方式正确。

## 三、最终验收清单

上线前逐条检查：

- 首页第一眼能看出你是视觉设计师。
- 项目图片是页面主角。
- 首页没有像简历模板。
- 作品分类清楚。
- 每个项目详情页都有背景和职责。
- 手机端能顺畅浏览。
- 图片没有明显糊、压扁、错裁。
- 简历下载链接有效。
- 联系方式有效。
- `npm run build` 通过。

