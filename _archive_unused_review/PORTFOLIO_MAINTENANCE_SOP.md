# 作品集网站维护 SOP

这份文档是给 0 代码基础设计师使用的维护手册。以后你要修改作品集网站里的文字、图片、项目、页面结构、样式、动效、导航和上线配置，可以先查这份文档。

本文档基于当前项目真实代码结构整理。没有在项目里找到的内容，会明确写成：`暂未在项目中找到，需要后续补充。`

## 1. 项目基础信息

### 技术栈

| 项目 | 当前使用 |
| --- | --- |
| 前端框架 | React 19 |
| 构建工具 | Vite |
| 路由 | React Router |
| 样式 | Tailwind CSS + 普通 CSS |
| 部署配置 | Netlify |
| 图片优化 | `scripts/convert-to-webp.js`，使用 `sharp` 生成 WebP |
| 视频压缩 | `scripts/compress-videos.js`，使用 `ffmpeg-static` |

简单理解：

- React：负责把页面拆成组件。
- Vite：负责本地预览和上线前打包。
- React Router：负责 `/work`、`/about`、`/project/xxx` 这些页面路径。
- Tailwind CSS：一种写在 `className` 里的样式工具。
- 普通 CSS：主要写在 `src/index.css`，控制全局样式、动效、响应式。

### 本地启动网站

在终端运行：

```bash
cd "/Users/shisan/Documents/作品集 4"
npm run dev
```

终端会显示一个本地地址，通常是：

```txt
http://localhost:5173/
```

打开这个地址，就能在本地预览网站。

### 停止本地服务

在运行 `npm run dev` 的终端窗口里按：

```txt
Control + C
```

如果终端问是否停止，输入 `y` 再回车。

### 检查网站是否正常运行

本地启动后，检查：

1. 打开 `http://localhost:5173/`
2. 首页是否出现。
3. 点击顶部导航 `作品`、`关于`、`联系` 是否正常。
4. 点击作品卡片是否进入详情页。
5. 在详情页刷新浏览器，页面是否还正常。

### 主要目录结构

| 位置 | 作用 | 是否经常修改 |
| --- | --- | --- |
| `package.json` | 项目依赖和命令，例如 `npm run dev`、`npm run build` | 偶尔 |
| `index.html` | 网页标题、描述、浏览器标签基础信息 | 偶尔 |
| `src/App.jsx` | 网站路由表，决定每个网址打开哪个页面 | 偶尔 |
| `src/main.jsx` | React 入口文件，通常不需要改 | 很少 |
| `src/pages/Home.jsx` | 首页结构和首页滚动逻辑 | 经常 |
| `src/pages/Work.jsx` | 全部作品页和分类作品页 | 偶尔 |
| `src/pages/ProjectDetail.jsx` | 项目详情页模板 | 偶尔 |
| `src/pages/About.jsx` | 关于页内容 | 偶尔 |
| `src/pages/Category.jsx` | 项目分类页 | 很少 |
| `src/pages/NotFound.jsx` | 找不到页面时显示的 404 页面 | 很少 |
| `src/data/projects.js` | 所有作品项目数据，标题、简介、图片、分类都在这里 | 经常 |
| `src/data/brands.js` | 首页合作品牌 logo 数据 | 偶尔 |
| `src/components/Navbar.jsx` | 顶部导航 | 偶尔 |
| `src/components/Footer.jsx` | 页脚联系方式 | 偶尔 |
| `src/components/SphereCarousel.jsx` | 首页圆形作品图区域 | 偶尔 |
| `src/components/FeaturedCarousel.jsx` | 首页精选项目横向轮播 | 偶尔 |
| `src/components/ProjectCard.jsx` | 作品卡片 | 偶尔 |
| `src/components/BrandMarquee.jsx` | 合作品牌横向滚动 | 偶尔 |
| `src/components/Button.jsx` | 按钮样式和链接按钮 | 偶尔 |
| `src/index.css` | 全局样式、颜色、字体、动效、响应式 | 经常 |
| `src/utils/assets.js` | 图片移动端和高清图自动切换逻辑 | 很少 |
| `src/hooks/useScrollReveal.js` | 页面滚动出现动效 | 很少 |
| `public/assets/projects/` | 原始项目图片和视频 | 经常 |
| `public/assets/optimized/projects/` | 桌面端优化 WebP 图片 | 经常，通常由脚本生成 |
| `public/assets/mobile/projects/` | 移动端优化 WebP 图片 | 经常，通常由脚本生成 |
| `public/assets/brands/logo/` | 合作品牌 logo | 偶尔 |
| `public/assets/resume/` | 简历 PDF | 偶尔 |
| `public/fonts/optimized/` | 网站字体子集 | 很少 |
| `scripts/convert-to-webp.js` | JPG 转 WebP 脚本 | 偶尔 |
| `scripts/compress-videos.js` | MP4 视频压缩脚本 | 偶尔 |
| `netlify.toml` | Netlify 部署、刷新 404、缓存配置 | 偶尔 |
| `vite.config.js` | Vite 配置 | 很少 |
| `tailwind.config.js` | Tailwind 配置 | 很少 |
| `postcss.config.js` | CSS 构建配置 | 很少 |
| `PRODUCT.md` | 网站定位、受众、设计目标 | 偶尔 |
| `DESIGN.md` | 网站视觉规则和设计方向 | 偶尔 |
| `AGENTS.md` | 给 AI / Codex 的项目工作说明 | 偶尔 |

## 2. 修改首页内容的方法

首页主要由这些文件组成：

| 内容 | 文件 |
| --- | --- |
| 首页整体结构 | `src/pages/Home.jsx` |
| 首页圆形作品图 | `src/components/SphereCarousel.jsx` |
| 首页精选项目轮播 | `src/components/FeaturedCarousel.jsx` |
| 首页项目分类 | `src/components/CategoryCard.jsx` + `src/data/projects.js` |
| 首页合作品牌 | `src/components/BrandMarquee.jsx` + `src/data/brands.js` |
| 首页联系区 | `src/pages/Home.jsx` |
| 首页导航 | `src/components/Navbar.jsx` |
| 首页样式和动效 | `src/index.css` |

### 修改首页主标题

当前首页底部主标题是：

```txt
SHISAN
```

操作步骤：

1. 打开：`src/components/SphereCarousel.jsx`
2. 搜索：`SHISAN`
3. 替换成新的名字。
4. 保存文件。
5. 运行 `npm run dev`，回到浏览器检查首页。

### 修改首页介绍文字

当前首页介绍文字是：

```txt
视觉设计师与 AIGC 内容创作者，
关注品牌视觉、商业落地和内容表达。
```

操作步骤：

1. 打开：`src/components/SphereCarousel.jsx`
2. 搜索：`视觉设计师与 AIGC 内容创作者`
3. 替换成新的介绍文字。
4. 如果需要换行，可以保留 `<br />`。
5. 保存并刷新浏览器。

### 修改首页加载动画文案

当前加载动画在首页开头出现，文案包括：

```txt
SHISAN PORTFOLIO
READY
100%
Loading selected visual works
KV DESIGN / AIGC VISUAL / COMPOSITE POSTER / BRAND CONTENT /
```

操作步骤：

1. 打开：`src/pages/Home.jsx`
2. 搜索：`home-loader`
3. 修改对应文字。
4. 保存后刷新首页。

### 修改首页按钮文案

首页联系区有两个简历按钮：

```txt
视觉设计简历
内容运营简历
```

操作步骤：

1. 打开：`src/pages/Home.jsx`
2. 搜索：`视觉设计简历` 或 `内容运营简历`
3. 修改按钮文字。
4. 如果要替换 PDF 链接，修改按钮的 `href`。

示例：

```jsx
href="/assets/resume/zhu-sirui-visual-design-resume.pdf"
```

### 修改首页导航

顶部导航在：

```txt
src/components/Navbar.jsx
```

当前导航项在 `navItems` 里：

```jsx
const navItems = [
  { label: "作品", to: "/work" },
  { label: "关于", to: "/about" },
];
```

如果要把 `作品` 改成 `项目`：

1. 打开：`src/components/Navbar.jsx`
2. 搜索：`label: "作品"`
3. 改成：`label: "项目"`
4. 保存并检查顶部导航。

### 修改首页背景、圆形作品图、装饰元素

当前首页第一屏是圆形作品图，不是普通背景大图。

| 要改的内容 | 文件 |
| --- | --- |
| 圆形作品读取哪些图片 | `src/components/SphereCarousel.jsx` |
| 圆形作品使用哪些项目 | `src/data/projects.js` 的 `projects` 数组顺序 |
| 圆形作品大小、位置 | `src/index.css` 里的 `.sphere-node-1` 到 `.sphere-node-8` |
| 圆形作品漂浮动效 | `src/index.css` 里的 `@keyframes sphere-float-a/b/c` |
| 首页滚动退场动效 | `src/pages/Home.jsx` 和 `src/index.css` |

注意：`public/assets/home/hero-futuristic.jpg` 存在，但当前首页主结构主要使用 `SphereCarousel` 的圆形作品图。

### 修改后如何预览首页

1. 终端运行：

```bash
npm run dev
```

2. 打开：

```txt
http://localhost:5173/
```

3. 检查桌面端。
4. 缩小浏览器宽度，检查手机端。
5. 用手机访问同一个局域网地址时，需要本地服务支持局域网访问；如果不确定，先用浏览器模拟手机宽度。

## 3. 修改作品项目的方法

作品数据写在单独的数据文件里：

```txt
src/data/projects.js
```

这是最常修改的文件。作品页、分类页、首页精选项目、项目详情页都会读取这个文件。

### 项目数组在哪里

在 `src/data/projects.js` 里，项目写在：

```jsx
const rawProjects = [
  {
    id: "dongfeng-lantu-kv",
    title: "东风岚图汽车 KV 视觉设计",
    ...
  },
];
```

注意：文件最后有：

```jsx
export const projects = rawProjects.map(withOptimizedAssets);
```

意思是：你写的原始 JPG 路径会自动转换成优化后的 WebP 路径。一般新增项目时，仍然在 `rawProjects` 里写 `/assets/projects/.../xxx.jpg`。

### 项目字段说明

| 字段名 | 作用 | 示例 |
| --- | --- | --- |
| `id` | 项目的唯一英文路径，会出现在网址里 | `dongfeng-lantu-kv` |
| `title` | 项目完整标题 | `东风岚图汽车 KV 视觉设计` |
| `titleLines` | 项目详情页标题换行 | `["岚图FREE 318", "KV 视觉设计"]` |
| `category` | 分类英文 ID，用于筛选 | `automotive` |
| `categoryName` | 分类中文名 | `汽车广告` |
| `type` | 项目类型 | `KV设计` |
| `brand` | 品牌名称 | `东风岚图` |
| `year` | 项目年份 | `2024` |
| `role` | 我的角色 | `视觉设计 / KV 设计 / 画面合成` |
| `tools` | 使用工具数组 | `["Photoshop", "Illustrator"]` |
| `coverImage` | 项目封面图 | `/assets/projects/dongfeng-lantu-kv/cover.jpg` |
| `heroImage` | 项目详情页大图 | `/assets/projects/dongfeng-lantu-kv/hero.jpg` |
| `description` | 一句话简介 | `为东风 FREE 318 上市打造...` |
| `background` | 项目背景说明 | `围绕新能源车型的上市传播...` |
| `responsibilities` | 我的工作内容列表 | `["梳理车型气质...", "规划主 KV..."]` |
| `images` | 详情页展示图或视频数组 | `["/assets/projects/.../01.jpg"]` |

### 新增一个作品项目

1. 在 `public/assets/projects/` 下新建项目文件夹。

示例：

```txt
public/assets/projects/new-project-name/
```

2. 放入图片，建议至少准备：

```txt
cover.jpg
hero.jpg
01.jpg
02.jpg
03.jpg
```

3. 打开：`src/data/projects.js`
4. 在 `rawProjects` 数组里复制一个已有项目对象。
5. 修改 `id`、`title`、`category`、`coverImage`、`heroImage`、`images` 等字段。
6. 保存。
7. 运行图片优化脚本：

```bash
npm run build
node scripts/convert-to-webp.js
```

更推荐顺序：

```bash
node scripts/convert-to-webp.js
npm run build
```

8. 打开本地网站检查：

```bash
npm run dev
```

### 删除一个作品项目

1. 打开：`src/data/projects.js`
2. 在 `rawProjects` 中找到对应项目对象。
3. 删除从 `{` 到对应 `}` 的整个项目。
4. 检查逗号是否正确。
5. 如果该项目在首页精选里，还要检查 `featuredProjectIds`，删除对应 ID。

### 修改作品标题、简介、分类

1. 打开：`src/data/projects.js`
2. 搜索项目 `id` 或项目标题。
3. 修改：

```jsx
title
titleLines
category
categoryName
type
brand
year
role
tools
description
background
responsibilities
```

4. 保存并刷新页面。

### 修改封面图、详情大图、详情展示图

在项目对象里修改：

```jsx
coverImage: "/assets/projects/xxx/cover.jpg",
heroImage: "/assets/projects/xxx/hero.jpg",
images: [
  "/assets/projects/xxx/01.jpg",
  "/assets/projects/xxx/02.jpg",
]
```

### 调整项目排序

项目排序由 `rawProjects` 数组顺序决定。

如果想让某个项目排在前面，把整个项目对象移动到数组更靠前的位置。

### 调整首页精选项目

首页精选轮播读取：

```txt
src/data/projects.js
```

找到：

```jsx
export const featuredProjectIds = [
  "dongfeng-lantu-kv",
  "aizhongcao-ip-aigc",
  "offline-material-design",
  "la-mer-aigc-visual",
];
```

操作方法：

- 想换项目：把 ID 换成另一个项目的 `id`。
- 想调整顺序：调整数组顺序。
- 想减少项目：删除某一行。
- 想增加项目：新增一个项目 ID。

### 修改项目点击跳转路径

作品详情链接使用项目 `id` 自动生成。

例如：

```jsx
id: "dongfeng-lantu-kv"
```

对应网址：

```txt
/project/dongfeng-lantu-kv
```

如果你改了 `id`，原来的网址也会变。改完后要检查：

1. 首页精选项目能否点击。
2. 作品列表能否点击。
3. 详情页刷新是否正常。
4. Netlify 上线后是否正常。

## 4. 修改项目详情页的方法

项目详情页模板在：

```txt
src/pages/ProjectDetail.jsx
```

每个项目的具体内容不在这个文件里，而是在：

```txt
src/data/projects.js
```

简单理解：

- `ProjectDetail.jsx` 是统一模板，负责页面长什么样。
- `projects.js` 是内容表，负责显示什么项目、什么标题、什么图片。

### 动态路由是什么意思

路由在：

```txt
src/App.jsx
```

里面有：

```jsx
<Route path="/project/:projectId" element={<ProjectDetail />} />
<Route path="/projects/:slug" element={<ProjectDetail />} />
```

小白解释：

- `:projectId` 是一个占位符。
- 打开 `/project/dongfeng-lantu-kv` 时，网站会拿到 `dongfeng-lantu-kv`。
- 然后去 `src/data/projects.js` 里找 `id` 等于 `dongfeng-lantu-kv` 的项目。
- 找到了就显示详情页，找不到就显示“没有找到这个项目”。

### 替换项目大图

1. 把新图放进：

```txt
public/assets/projects/项目文件夹/
```

2. 推荐命名：

```txt
hero.jpg
```

3. 打开：`src/data/projects.js`
4. 找到项目，修改：

```jsx
heroImage: "/assets/projects/项目文件夹/hero.jpg"
```

5. 运行：

```bash
node scripts/convert-to-webp.js
npm run build
```

6. 本地检查详情页。

### 新增一张展示图

1. 把图片放入项目文件夹，例如：

```txt
public/assets/projects/dongfeng-lantu-kv/08.jpg
```

2. 打开：`src/data/projects.js`
3. 在对应项目的 `images` 数组里新增一行：

```jsx
"/assets/projects/dongfeng-lantu-kv/08.jpg",
```

4. 运行：

```bash
node scripts/convert-to-webp.js
npm run build
```

5. 检查详情页是否显示。

### 删除一张展示图

1. 打开：`src/data/projects.js`
2. 找到对应项目的 `images` 数组。
3. 删除对应图片路径。
4. 保存并检查页面。

### 修改项目说明、角色、工具、时间

打开 `src/data/projects.js`，修改这些字段：

```jsx
year
role
tools
description
background
responsibilities
```

### 特殊详情页比例

当前项目详情页里有特殊排版：

| 项目 ID | 特殊排版 | 控制位置 |
| --- | --- | --- |
| `la-mer-aigc-visual` | 竖图两列，且第一张是视频 | `src/pages/ProjectDetail.jsx` |
| `offline-material-design` | 画册图比例 `1961 / 1394` | `src/pages/ProjectDetail.jsx` + `src/index.css` |
| `composite-poster` | 海报比例，桌面四列 | `src/pages/ProjectDetail.jsx` + `src/index.css` |

如果要让新项目也使用特殊排版，需要修改 `ProjectDetail.jsx` 顶部这些集合：

```jsx
const portraitGalleryProjectIds = new Set(["la-mer-aigc-visual"]);
const brochureGalleryProjectIds = new Set(["offline-material-design"]);
const posterGalleryProjectIds = new Set(["composite-poster"]);
```

## 5. 修改图片资源的方法

### 图片应该放在哪里

| 图片类型 | 文件夹 |
| --- | --- |
| 原始项目图片 | `public/assets/projects/项目ID/` |
| 桌面端优化图 | `public/assets/optimized/projects/项目ID/` |
| 移动端优化图 | `public/assets/mobile/projects/项目ID/` |
| 合作品牌 logo | `public/assets/brands/logo/` |
| 首页备用图 | `public/assets/home/` |
| 简历 PDF | `public/assets/resume/` |

### 推荐命名方式

请使用：

```txt
cover.jpg
hero.jpg
01.jpg
02.jpg
03.jpg
```

或者：

```txt
la-mer-cover.jpg
la-mer-hero.jpg
poster-01.jpg
```

特别提醒：

- 不要使用中文文件名。
- 不要使用空格。
- 不要使用特殊符号。
- 推荐小写英文 + 短横线。
- 例如 `new-project-cover.jpg`，不要写 `新 项目 封面.jpg`。

当前项目里仍然存在一个中文文件名：

```txt
public/assets/projects/offline-material-design/画册170x240mm_18.jpg
```

建议后续有时间改成英文名，但这次不要直接重命名，以免影响路径。

### 推荐图片格式

| 用途 | 推荐格式 |
| --- | --- |
| 原始图片 | JPG |
| 透明 logo | PNG |
| 网页展示优化图 | WebP |
| 视频 | MP4 |

当前项目的优化逻辑是：

1. 你把原图放进 `public/assets/projects/`。
2. `src/data/projects.js` 里写 JPG 路径。
3. 运行 `node scripts/convert-to-webp.js`。
4. 脚本生成：

```txt
public/assets/optimized/projects/
public/assets/mobile/projects/
```

5. 网站会自动优先使用 WebP 和移动端小图。

### 建议尺寸

| 场景 | 建议尺寸 |
| --- | --- |
| 首页/作品封面图 | 16:9，建议 1920 x 1080 原图 |
| 项目详情页大图 | 16:9，建议 1920 x 1080 或 2560 x 1440 |
| 海蓝之谜竖图 | 3:4 或接近竖版比例 |
| 岚图知音画册 | 当前样式按 `1961 x 1394` 比例显示 |
| 合成海报 | 当前样式按 `1125 x 2436` 比例显示 |
| 品牌 logo | PNG，透明背景更好 |

### 图片路径怎么写

路径从 `public` 后面开始写。

真实文件：

```txt
public/assets/projects/dongfeng-lantu-kv/cover.jpg
```

代码里写：

```txt
/assets/projects/dongfeng-lantu-kv/cover.jpg
```

不要写：

```txt
public/assets/projects/dongfeng-lantu-kv/cover.jpg
```

### 图片太大导致网页变慢怎么办

先运行：

```bash
node scripts/convert-to-webp.js
npm run build
```

如果还是慢：

1. 检查原图是否超过 5MB。
2. 用 Photoshop 或在线工具压缩原图。
3. 视频用 `scripts/compress-videos.js` 压缩：

```bash
node scripts/compress-videos.js
```

注意：这个脚本会把原视频备份成 `*_backup.mp4`，再用压缩视频替换原路径。

## 6. 修改网站样式的方法

全局样式主要在：

```txt
src/index.css
```

这个项目同时使用：

- Tailwind CSS：写在组件的 `className` 里，例如 `px-5 text-white grid gap-4`。
- 普通 CSS：写在 `src/index.css`，例如 `.sphere-stage`、`.featured-carousel`。

没有使用 CSS Modules、SCSS、styled-components。

### 常用样式位置

| 要修改的内容 | 文件 | 搜索关键词 |
| --- | --- | --- |
| 全局字体 | `src/index.css` | `@font-face`、`--font-body` |
| 全局颜色 | `src/index.css` | `:root`、`--color-` |
| 页面最大宽度和左右边距 | `src/index.css` | `.page-shell` |
| 大标题字号 | `src/index.css` | `.type-hero`、`.type-page-title`、`.type-section-title` |
| 正文字号 | `src/index.css` | `.type-body`、`.type-lede` |
| 背景色 | `src/index.css` | `#080808`、`--color-soft` |
| 按钮样式 | `src/components/Button.jsx` |
| 顶部导航样式 | `src/components/Navbar.jsx` |
| 首页圆形图大小和位置 | `src/index.css` | `.sphere-node-1` 到 `.sphere-node-8` |
| 首页圆形图区域 | `src/index.css` | `.sphere-stage` |
| 首页精选轮播 | `src/index.css` | `.featured-carousel` |
| 合作品牌滚动 | `src/index.css` | `.brand-marquee` |
| 项目详情页大图 | `src/index.css` | `.project-hero` |
| 详情页图片网格 | `src/index.css` | `.project-gallery` |
| 手机端样式 | `src/index.css` | `@media (max-width: 640px)` |
| 减少动效 | `src/index.css` | `@media (prefers-reduced-motion: reduce)` |

### 修改字体

当前字体加载在：

```css
@font-face {
  font-family: "OPPO Sans 4.0";
  src: url("/fonts/optimized/oppo-sans-portfolio.woff") format("woff");
}
```

位置：

```txt
src/index.css
```

如果换字体：

1. 把字体文件放到 `public/fonts/` 或 `public/fonts/optimized/`。
2. 修改 `@font-face` 的 `src`。
3. 修改 `--font-body`。
4. 运行 `npm run build` 检查。

### 修改背景色

常见背景色在 `src/index.css`：

```css
--color-soft: #080808;
--color-panel: #111111;
--color-accent: #f26a1b;
```

如果只想换橙色点缀，优先修改：

```css
--color-accent: #f26a1b;
```

但文件里还有一些直接写死的 `#f26a1b`，需要搜索一起修改。

### 修改圆形作品图大小和位置

打开：

```txt
src/index.css
```

搜索：

```txt
.sphere-node-1
```

每个圆形图类似：

```css
.sphere-node-1 {
  left: 33%;
  top: 19%;
  width: clamp(70px, 6.2vw, 85px);
}
```

解释：

- `left`：距离左边多少。
- `top`：距离顶部多少。
- `width`：圆形大小。
- `clamp()`：最小值、随屏幕变化值、最大值。

### 修改 hover 动效

常见 hover 动效位置：

| 动效 | 文件 |
| --- | --- |
| 圆形作品 hover 放大 | `src/index.css` 的 `.sphere-node:hover` |
| 图片 hover 放大 | `src/index.css` 的 `.image-hover` |
| 轮播按钮 hover | `src/index.css` 的 `.featured-carousel-button:hover` |
| 品牌 logo hover | `src/index.css` 的 `.brand-logo-item:hover img` |
| 分类卡片 hover | `src/components/CategoryCard.jsx` 的 `className` |
| 按钮 hover | `src/components/Button.jsx` |

### 修改响应式布局

手机端样式集中在：

```txt
src/index.css
```

搜索：

```txt
@media (max-width: 640px)
```

这里控制手机端：

- 标题大小。
- 首页圆形图位置。
- 精选项目轮播高度。
- 轮播按钮大小。
- 合作品牌 logo 间距。

## 7. 修改导航和跳转路径的方法

### 顶部导航在哪里改

文件：

```txt
src/components/Navbar.jsx
```

导航项：

```jsx
const navItems = [
  { label: "作品", to: "/work" },
  { label: "关于", to: "/about" },
];
```

### 新增一个导航项

例如新增 `首页`：

```jsx
const navItems = [
  { label: "首页", to: "/" },
  { label: "作品", to: "/work" },
  { label: "关于", to: "/about" },
];
```

如果新增一个新页面，还要在 `src/App.jsx` 里加路由。否则点击会找不到页面。

### 删除一个导航项

在 `navItems` 里删除对应那一行。

注意：`联系` 不是在 `navItems` 里，它是单独写的：

```jsx
<a href="/#contact">联系</a>
```

### 首页到作品页的跳转在哪里

首页精选项目轮播在：

```txt
src/components/FeaturedCarousel.jsx
```

每个项目点击后跳转：

```jsx
to={`/project/${project.id}`}
```

### 作品卡片点击跳转在哪里

文件：

```txt
src/components/ProjectCard.jsx
```

跳转代码：

```jsx
to={`/project/${project.id}`}
```

### 项目详情页上一个/下一个跳转

文件：

```txt
src/pages/ProjectDetail.jsx
```

底部使用：

```jsx
to={`/project/${project.id}`}
```

### 修改链接后检查

每次改链接后检查：

1. 首页点击是否正常。
2. 作品页点击是否正常。
3. 项目详情页是否正常打开。
4. 浏览器刷新当前页面是否正常。
5. 部署上线后刷新是否还正常。

刷新后 404 由 `netlify.toml` 的这段配置解决：

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

不要随便删除。

## 8. 修改动效的方法

当前网站没有使用 Framer Motion 或 GSAP。动效主要由普通 CSS、React 的 `useEffect`、IntersectionObserver 完成。

### 当前主要动效

| 动效 | 文件 |
| --- | --- |
| 首页加载动画 | `src/pages/Home.jsx` + `src/index.css` 的 `.home-intro`、`.home-loader` |
| 首页圆形作品漂浮 | `src/components/SphereCarousel.jsx` + `src/index.css` 的 `.sphere-node-*` 和 `@keyframes sphere-float-*` |
| 首页滚动衔接 | `src/pages/Home.jsx` 的 `updateHeroProgress`、`updateSectionProgress` |
| 首页模块滚动出现 | `src/pages/Home.jsx` + `src/index.css` 的 `.motion-section` |
| 精选项目轮播 | `src/components/FeaturedCarousel.jsx` |
| 合作品牌横向滚动 | `src/components/BrandMarquee.jsx` + `src/index.css` 的 `brand-marquee-scroll` |
| 页面切换淡入 | `src/components/Layout.jsx` + `src/index.css` 的 `.page-enter` |
| 详情页图片出现 | `src/hooks/useScrollReveal.js` + `.reveal-media` |
| hover 动效 | `src/index.css`、`src/components/Button.jsx`、部分组件 `className` |

### 降低首页滚动动效强度

打开：

```txt
src/pages/Home.jsx
```

搜索：

```txt
updateHeroProgress
```

里面类似：

```jsx
hero.style.setProperty("--hero-cluster-y", `${(easedProgress * 124).toFixed(2)}px`);
hero.style.setProperty("--hero-cluster-scale", (1 - easedProgress * 0.22).toFixed(4));
hero.style.setProperty("--hero-cluster-blur", `${(easedProgress * 8).toFixed(2)}px`);
```

想降低动效，就把数字调小，例如：

- `124` 改成 `60`
- `0.22` 改成 `0.1`
- `8` 改成 `3`

### 关闭首页加载动画

打开：

```txt
src/pages/Home.jsx
```

删除或注释这一段：

```jsx
<div className="home-intro" aria-hidden="true">
  ...
</div>
```

小白建议：不要直接删除，先让 AI 帮你处理，避免 JSX 结构删错。

### 修改圆形漂浮动效

打开：

```txt
src/index.css
```

搜索：

```txt
@keyframes sphere-float-a
```

如果想减弱漂浮，把 `-6px`、`5px`、`4px` 这些数字调小。

### 关闭某个动效

如果只想让某个元素不动，优先改 CSS：

```css
animation: none;
transition: none;
transform: none;
```

但不要全局给所有元素都这样写，否则网站会失去很多交互反馈。

### 减少所有动效

项目已经有一段照顾系统“减少动态效果”的代码：

```txt
src/index.css
```

搜索：

```txt
@media (prefers-reduced-motion: reduce)
```

这里是给不喜欢动效的用户准备的。可以在这里补充更多关闭动效的规则。

## 9. 修改 SEO 和网页信息的方法

SEO 指搜索引擎和分享时显示的信息。

### 网页标题和浏览器标签名称

文件：

```txt
index.html
```

当前标题：

```html
<title>Visual Portfolio</title>
```

可以改成：

```html
<title>Shisan Portfolio | 视觉设计师作品集</title>
```

### 网页描述

文件：

```txt
index.html
```

当前描述：

```html
<meta
  name="description"
  content="视觉设计师个人作品集，展示汽车广告、美妆视觉、视觉设计和 AIGC 工作流。"
/>
```

修改 `content` 里的文字即可。

### favicon 网站图标

当前项目中暂未找到 favicon 配置，需要后续补充。

建议后续添加：

1. 放一个图标到：

```txt
public/favicon.ico
```

2. 在 `index.html` 的 `<head>` 里加入：

```html
<link rel="icon" href="/favicon.ico" />
```

### 分享预览图

当前项目中暂未找到 Open Graph 分享图配置，需要后续补充。

建议后续在 `index.html` 增加：

```html
<meta property="og:title" content="Shisan Portfolio" />
<meta property="og:description" content="视觉设计师个人作品集。" />
<meta property="og:image" content="/assets/share-cover.jpg" />
```

并把图片放到：

```txt
public/assets/share-cover.jpg
```

### Open Graph 信息

当前项目中暂未在 `index.html` 找到 Open Graph 信息，需要后续补充。

## 10. 本地修改后的检查流程

每次改完网站，按这个固定流程检查。

### 第一步：启动本地网站

```bash
cd "/Users/shisan/Documents/作品集 4"
npm run dev
```

打开：

```txt
http://localhost:5173/
```

### 第二步：人工检查清单

| 检查项 | 怎么检查 |
| --- | --- |
| 页面是否正常打开 | 打开首页、作品页、关于页 |
| 图片是否加载 | 看首页圆形图、精选轮播、作品卡片、详情页图片 |
| 按钮是否能点击 | 点击导航、简历下载、作品卡片 |
| 项目详情是否能进入 | 点击每一个项目卡片 |
| 手机端是否正常 | 缩小浏览器，或用开发者工具模拟手机 |
| 文字有没有溢出 | 看标题是否超出屏幕，按钮文字是否被裁切 |
| 控制台有没有报错 | 浏览器右键检查，打开 Console |
| 刷新页面是否正常 | 在 `/project/xxx` 页面刷新 |
| 视频是否正常 | 打开有视频的详情页，点击播放 |
| 简历是否能下载 | 点击两个简历按钮 |

### 第三步：打包检查

上线前一定运行：

```bash
npm run build
```

如果看到：

```txt
✓ built
```

说明打包成功。

### 第四步：预览打包结果

```bash
npm run preview
```

打开终端提示的地址，检查生产版本是否正常。

## 11. 重新上线 / 部署流程

当前项目中明确找到了 Netlify 配置：

```txt
netlify.toml
```

所以可以确认：当前项目部署平台是 Netlify。

### 当前 Netlify 配置

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

意思是：

- Netlify 上线前会运行 `npm run build`。
- 打包结果在 `dist` 文件夹。
- Netlify 会把 `dist` 发布到线上。

### 改完代码后如何重新上线

1. 本地检查：

```bash
npm run build
```

2. 提交到 Git：

```bash
git status
git add .
git commit -m "update portfolio content"
git push
```

3. 推送到 GitHub 后，Netlify 会自动重新部署。
4. 打开 Netlify 后台，查看部署状态。
5. 看到 `Published` 就是成功。

### 如何查看部署是否成功

在 Netlify 项目页查看：

```txt
Production deploys
Published
```

如果显示：

```txt
Building
```

说明还在打包。

如果显示：

```txt
Failed
```

说明失败。点进去查看 deploy log。

### 部署失败应该看哪里

1. 打开 Netlify 项目。
2. 点 `Production deploys`。
3. 点失败的那一条。
4. 看 `Deploy log`。
5. 搜索红色报错。

常见报错：

- 图片路径不存在。
- JS 语法写错。
- `npm run build` 本地也失败。
- 新增文件没有 `git add`。

### 如何回滚到上一个版本

方法一：Netlify 后台回滚。

1. 打开 Netlify 项目。
2. 进入 `Deploys`。
3. 找到上一个正常的 `Published` 版本。
4. 点进去。
5. 找 `Publish deploy` 或类似按钮。

方法二：Git 回滚。

建议让 AI 或熟悉 Git 的人帮你操作。不要随便运行 `git reset --hard`，可能会丢失本地修改。

### 其他部署平台

- 未找到 `vercel.json`。
- 未找到 `next.config`。
- 未找到 GitHub Pages 配置。

所以当前项目中暂未明确配置 Vercel、Next.js 或 GitHub Pages。

## 12. Git 版本管理建议

Git 可以理解为“网站修改历史记录”。每次修改并提交，就像给网站存一个可回退的版本。

### 修改前为什么要备份

如果你直接改很多文件，改坏后很难知道哪里出错。Git 提交可以帮你保存一个时间点。

建议：

1. 修改前先运行 `git status` 看当前是否干净。
2. 如果当前已经有别人或 AI 改过的内容，先不要乱改。
3. 大改前可以新建分支。

### 小改可以直接在 main 修改

比如：

- 改文字。
- 换一两张图。
- 改联系方式。

可以直接修改，然后提交。

### 大改建议新建分支

比如：

- 改首页结构。
- 改动效。
- 重做详情页排版。
- 大量替换图片。

可以新建分支：

```bash
git checkout -b update-home-layout
```

### 常用命令解释

```bash
git status
```

查看当前哪些文件被修改了。

```bash
git add .
```

把当前所有修改加入“准备提交”的列表。

```bash
git commit -m "update portfolio content"
```

保存一个版本，后面的英文是这次修改说明。

```bash
git push
```

把本地提交推送到 GitHub。Netlify 会检测到 GitHub 更新并自动重新上线。

### commit message 怎么写

建议用简单英文：

| 修改内容 | commit message |
| --- | --- |
| 更新作品文案 | `update project copy` |
| 新增作品 | `add new portfolio project` |
| 替换图片 | `update project images` |
| 优化移动端 | `improve mobile layout` |
| 修复 404 | `fix netlify redirect` |
| 修改首页动效 | `update home motion` |

### 如果改坏了如何恢复

先不要慌，先运行：

```bash
git status
```

如果只是一个文件改坏，可以让 AI 帮你查看差异并修复。

如果已经上线坏了，可以先在 Netlify 回滚到上一个正常版本。

危险命令提醒：

```bash
git reset --hard
```

这个命令会丢掉本地修改。除非你非常确定，否则不要自己运行。

## 13. 常见问题排查

| 问题 | 可能原因 | 解决方法 |
| --- | --- | --- |
| 图片不显示 | 图片路径写错 | 检查 `src/data/projects.js` 里的路径，从 `/assets/...` 开始写 |
| 图片不显示 | 文件没有放到 `public/assets/projects/` | 把图片放到正确项目文件夹 |
| 图片不显示 | 只放了原图，没生成 WebP | 运行 `node scripts/convert-to-webp.js` |
| 页面打不开 | 本地服务没有启动 | 运行 `npm run dev` |
| 页面打不开 | 端口不是 5173 | 看终端提示的本地地址 |
| 点击作品没有跳转 | 项目 `id` 写错或重复 | 检查 `src/data/projects.js` 里的 `id` |
| 点击作品没有跳转 | 路由被改坏 | 检查 `src/App.jsx` |
| 手机端排版乱了 | 标题太长或字号太大 | 检查 `src/index.css` 的 `@media (max-width: 640px)` |
| 手机端排版乱了 | 图片比例不适合 | 检查详情页特殊比例和图片尺寸 |
| 修改文字后页面没变化 | 浏览器缓存 | 刷新页面，或重启 `npm run dev` |
| 修改文字后页面没变化 | 改错文件 | 用搜索确认页面文字真实在哪个文件 |
| 部署失败 | 本地 `npm run build` 也失败 | 先在本地运行 `npm run build`，修复报错 |
| 部署失败 | 新文件没有提交 | 运行 `git status`，确认新文件是否已 `git add` |
| 本地启动报错 | 依赖没安装 | 运行 `npm install` |
| npm install 报错 | 网络或 Node 版本问题 | 换网络，或把报错截图发给 AI |
| 页面刷新后 404 | SPA 重定向缺失 | 检查 `netlify.toml` 里的 `[[redirects]]` |
| 图片太大加载慢 | 原图过大 | 运行 `node scripts/convert-to-webp.js`，必要时先压缩原图 |
| 视频太大加载慢 | MP4 文件过大 | 运行 `node scripts/compress-videos.js` |
| 字体加载慢 | 字体文件太大 | 当前已使用 `public/fonts/optimized/oppo-sans-portfolio.woff` |
| 合作品牌 logo 不显示 | `src/data/brands.js` 路径不对 | 检查 logo 是否在 `public/assets/brands/logo/` |
| 简历下载失败 | PDF 路径不对 | 检查 PDF 是否在 `public/assets/resume/` |

## 14. 我以后让 AI 修改网站时的提示词模板

### 修改首页文案提示词

```txt
请基于当前项目代码修改首页文案。请先读取 `src/pages/Home.jsx`、`src/components/SphereCarousel.jsx`、`src/components/Navbar.jsx`、`src/components/Footer.jsx` 和 `src/data/projects.js`，确认文案真实位置后再修改。不要改动页面结构和样式。修改后运行 `npm run build`，并告诉我改了哪些文件、哪些文案被替换。

我要修改的文案：
旧文案：……
新文案：……
```

### 新增作品项目提示词

```txt
请帮我在作品集网站中新增一个作品项目。请先读取 `src/data/projects.js`、`src/pages/ProjectDetail.jsx` 和 `src/App.jsx`，确认当前项目数据结构后再添加。请不要改变已有项目结构。

新项目资料如下：
项目 ID：
项目标题：
项目分类：
品牌：
年份：
我的角色：
使用工具：
一句话简介：
项目背景：
我的工作内容：
封面图路径：
详情首图路径：
详情展示图路径：

新增后请运行 `node scripts/convert-to-webp.js` 和 `npm run build`，并检查项目列表和详情页是否能打开。
```

### 替换项目图片提示词

```txt
请帮我替换作品集中的项目图片。请先读取 `src/data/projects.js`，确认目标项目的 `coverImage`、`heroImage` 和 `images` 当前路径。不要改动项目文案和页面结构。

目标项目 ID：
我要替换的图片类型：封面图 / 详情首图 / 详情展示图
新图片已经放在：

请更新路径后运行 `node scripts/convert-to-webp.js` 和 `npm run build`，并确认桌面端和移动端都使用了正确图片。
```

### 修改首页排版提示词

```txt
请帮我调整首页排版。请先读取 `PRODUCT.md`、`DESIGN.md`、`AGENTS.md`、`src/pages/Home.jsx`、`src/components/SphereCarousel.jsx`、`src/components/FeaturedCarousel.jsx` 和 `src/index.css`。请保持当前作品集的成熟商业视觉风格，不要做花哨科技感，不要过度圆角，不要大范围重构。

我要调整的地方：
参考效果：
不想要的效果：

修改后请运行 `npm run build`，并检查桌面端和手机端是否有文字溢出、图片裁切异常、横向滚动。
```

### 修改颜色和字体提示词

```txt
请帮我调整网站颜色和字体。请先读取 `src/index.css`、`DESIGN.md` 和 `PRODUCT.md`，确认当前颜色变量、字体配置和品牌方向。请优先修改全局变量，不要到处写零散颜色。保持黑色、白色、灰色和克制橙色的高级商业视觉方向。

我要修改：
主背景色：
文字颜色：
强调色：
字体：

修改后请运行 `npm run build`，并检查首页、作品页、详情页、关于页的可读性和移动端效果。
```

### 检查网站 bug 提示词

```txt
请以代码审查和前端 QA 的方式检查当前作品集网站 bug。请读取 `src/App.jsx`、`src/pages`、`src/components`、`src/data/projects.js`、`src/index.css` 和 `netlify.toml`。重点检查：页面能否打开、路由是否正确、图片路径是否有效、移动端是否溢出、详情页刷新是否 404、构建是否成功。

请先列出发现的问题和对应文件路径，再征求我确认后修改。修改后运行 `npm run build`。
```

### 部署失败排查提示词

```txt
Netlify 部署失败了。请帮我排查。请先读取 `package.json`、`netlify.toml`、`vite.config.js` 和最近修改过的文件。下面是 Netlify deploy log 报错内容：

【粘贴报错】

请判断失败原因，给出修复方案。修复后运行 `npm run build`，并告诉我需要执行哪些 git 命令重新上线。
```

### 移动端加载慢排查提示词

```txt
我的作品集网站移动端加载慢。请先读取 `src/data/projects.js`、`src/utils/assets.js`、`scripts/convert-to-webp.js`、`scripts/compress-videos.js`、`src/index.css` 和 `netlify.toml`。请检查是否仍在加载原始大图、是否缺少移动端图片、视频是否自动加载、字体是否过大、Netlify 缓存是否合理。

请不要降低视觉质量太多。优先用 WebP、移动端小图、懒加载、视频 preload 控制和缓存配置解决。修改后运行 `npm run build`，并说明首屏资源大概减少了多少。
```

## 15. 当前项目已确认和待补充事项

### 已确认

| 内容 | 结论 |
| --- | --- |
| 项目框架 | React + Vite |
| 样式方案 | Tailwind CSS + `src/index.css` 普通 CSS |
| 路由文件 | `src/App.jsx` |
| 首页文件 | `src/pages/Home.jsx` |
| 作品数据文件 | `src/data/projects.js` |
| 项目详情页模板 | `src/pages/ProjectDetail.jsx` |
| 顶部导航 | `src/components/Navbar.jsx` |
| 页脚 | `src/components/Footer.jsx` |
| 部署平台 | Netlify，配置在 `netlify.toml` |
| SPA 刷新 404 修复 | `netlify.toml` 已配置 `/* -> /index.html` |
| 图片优化脚本 | `scripts/convert-to-webp.js` |
| 视频压缩脚本 | `scripts/compress-videos.js` |
| 移动端图片逻辑 | `src/utils/assets.js` |
| 简历 PDF | `public/assets/resume/` |
| 合作品牌 logo | `public/assets/brands/logo/` |

### 暂未在项目中找到，需要后续补充

| 内容 | 状态 |
| --- | --- |
| favicon 网站图标 | 暂未在项目中找到，需要后续补充。 |
| Open Graph 分享标题 | 暂未在项目中找到，需要后续补充。 |
| Open Graph 分享描述 | 暂未在项目中找到，需要后续补充。 |
| Open Graph 分享预览图 | 暂未在项目中找到，需要后续补充。 |
| Vercel 配置 | 暂未在项目中找到，需要后续补充。 |
| Next.js 配置 | 暂未在项目中找到，需要后续补充。 |
| GitHub Pages 配置 | 暂未在项目中找到，需要后续补充。 |

### 结构优化建议

这些只是建议，不需要马上改：

1. 后续可以把 `public/assets/projects/offline-material-design/画册170x240mm_18.jpg` 改成英文文件名。
2. 后续可以补充 `favicon.ico` 和 Open Graph 分享图，让网站分享时更完整。
3. 如果作品越来越多，可以把 `src/data/projects.js` 拆分成多个文件，但当前数量不多，暂时不用拆。
4. 每次新增图片后，建议固定运行 `node scripts/convert-to-webp.js`，保持移动端加载速度。
