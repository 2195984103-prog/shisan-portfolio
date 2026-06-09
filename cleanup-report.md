# 作品集网站项目体检报告

> 生成时间：2026-06-09  
> 项目路径：`/Users/shisan/Documents/作品集 4`

---

## 一、技术栈

| 层面 | 技术 | 版本 |
|------|------|------|
| 框架 | React + react-router-dom | 19.0 / 7.0 |
| 构建工具 | Vite | 7.3.5 |
| CSS | Tailwind CSS | 3.4 |
| 图片处理 | Sharp (构建脚本) | 0.34 |
| 视频压缩 | ffmpeg-static | 5.3 |
| 生产优化 | @preact/preset-vite | 2.10 |

> Vite 使用 `@preact/preset-vite` 做生产构建优化，开发环境仍用 React。无需特殊处理。

---

## 二、项目入口和路由

### 入口文件链

```
index.html
  └── src/main.jsx
        ├── 注册 Service Worker (/sw.js)
        ├── 全局 img onLoad 监听器 (添加 .img-loaded class)
        ├── BrowserRouter
        └── src/App.jsx
              ├── Layout (Navbar + Footer)
              └── Routes (lazy loaded)
```

### 路由表

| 路径 | 组件 | 加载方式 |
|------|------|----------|
| `/` | Home | lazy() |
| `/work` | Work | lazy() |
| `/work/:category` | Work (带分类筛选) | lazy() |
| `/category/:categoryId` | Category | lazy() |
| `/project/:projectId` | ProjectDetail | lazy() |
| `/projects/:slug` | ProjectDetail | lazy() |
| `/about` | About | lazy() |
| `*` | NotFound | lazy() |

---

## 三、页面和组件结构

### 页面 (src/pages/)

| 文件 | 说明 | 引用组件 |
|------|------|----------|
| `Home.jsx` | 首页：球体轮播 + 品牌墙 + 分类卡 + 精选轮播 | SphereCarousel, BrandMarquee, CategoryCard, FeaturedCarousel, SectionTitle, Button |
| `Work.jsx` | 作品列表：项目卡片网格 | ProjectCard, SectionTitle, Button |
| `Category.jsx` | 分类页：按类型筛选项目 | ProjectCard, DisplayTitle, SectionTitle, Button |
| `ProjectDetail.jsx` | 项目详情：Hero + 图片/视频画廊 | LazyImage, DisplayTitle, Button |
| `About.jsx` | 关于页 | SectionTitle |
| `NotFound.jsx` | 404 页 | DisplayTitle, Button |

### 组件 (src/components/)

| 文件 | 被引用 | 状态 |
|------|--------|------|
| `Layout.jsx` | App.jsx | ✅ 正常 |
| `Navbar.jsx` | Layout.jsx | ✅ 正常 |
| `Footer.jsx` | Layout.jsx | ✅ 正常 |
| `LazyImage.jsx` | ProjectCard, ProjectDetail | ✅ 正常 |
| `ProjectCard.jsx` | Work, Category | ✅ 正常 |
| `Button.jsx` | 5 个页面 | ✅ 正常 |
| `DisplayTitle.jsx` | 5 个文件 | ✅ 正常 |
| `SectionTitle.jsx` | 4 个页面 | ✅ 正常 |
| `BrandMarquee.jsx` | Home | ✅ 正常 |
| `CategoryCard.jsx` | Home | ✅ 正常 |
| `FeaturedCarousel.jsx` | Home | ✅ 正常 |
| `SphereCarousel.jsx` | Home | ✅ 正常 |
| `Header.jsx` | **无** | ⚠️ 孤立 — 仅 re-export Navbar |
| `ProgressiveImage.jsx` | **无** | ⚠️ 孤立 — 未被任何文件引入 |

### Hooks (src/hooks/)

| 文件 | 被引用 | 状态 |
|------|--------|------|
| `useScrollReveal.js` | Layout.jsx | ✅ 正常 |
| `usePrefetchImage.js` | FeaturedCarousel, SphereCarousel | ✅ 正常 |

### 工具 (src/utils/)

| 文件 | 被引用 | 状态 |
|------|--------|------|
| `assets.js` | FeaturedCarousel, SphereCarousel, ProjectCard, ProjectDetail | ✅ 正常 |

### 数据 (src/data/)

| 文件 | 被引用 | 说明 |
|------|--------|------|
| `projects.js` | 6 个文件 | 项目数据 + 分类数据 + 图片路径转换函数 |
| `brands.js` | BrandMarquee | 品牌 logo 数据 |

---

## 四、图片资源结构与路径

### 目录结构

```
public/assets/
├── brands/logo/                    7 张 PNG (品牌 logo)
├── projects/                       2 个 mp4 (视频源文件)
│   ├── aizhongcao-ip-aigc/01.mp4
│   └── la-mer-aigc-visual/01.mp4
├── optimized/projects/             84 张 webp (1800w 桌面展示)
├── desktop/projects/               84 张 webp (1200w 卡片/网格)
├── mobile/projects/                84 张 webp (960w 移动端)
├── thumbs/projects/                84 张 webp (600w 占位符)
├── home/                           🗑️ 空
├── about/                          🗑️ 空
├── optimized/home/                 🗑️ 空
├── mobile/home/                    🗑️ 空
└── resume/                         2 个 PDF
```

### 图片路径转换链

```
projects.js 声明:  "/assets/projects/dongfeng-lantu-kv/cover.jpg"
                        │
                  useOptimizedProjectAsset()
                        │ .jpg → .webp, /projects/ → /optimized/projects/
                        ▼
显示路径:           "/assets/optimized/projects/dongfeng-lantu-kv/cover.webp"
                        │
                  srcSet (assets.js):
                    mobileProjectAsset() → "/assets/mobile/projects/.../cover.webp"  (960w)
                    desktopProjectAsset() → "/assets/desktop/projects/.../cover.webp" (1200w)
                    原路径 → 1800w
                        │
                  thumbnail (projectGallerySrc):
                    → "/assets/thumbs/projects/.../cover.webp" (600w)
```

### 图片引用方式验证

| 组件 | srcSet 尺寸 | sizes | 状态 |
|------|-----------|-------|------|
| FeaturedCarousel | 960w/1200w/1800w | `86vw` | ✅ |
| SphereCarousel | 600w/960w (compact) | `170px` | ✅ |
| ProjectCard | 960w/1200w/1800w | `33vw` | ✅ |
| ProjectDetail hero | 960w/1200w/1800w | `100vw` | ✅ |
| ProjectDetail gallery | 960w/1200w/1800w | `100vw`/`50vw`/`25vw` | ✅ |
| BrandMarquee | 无 srcSet | — | ✅ |

---

## 五、发现的图片显示问题（已修复）

### 问题 1：CSS 全局 opacity:0 规则 🔴 严重

**位置**：`src/index.css:62`
```css
/* 已删除 */
img[loading="lazy"] { opacity: 0; }
```

**影响**：所有 `loading="lazy"` 的图片初始 opacity:0，必须等 JS onLoad 回调触发才能 visible。从国内/慢网络访问时 onLoad 迟迟不触发 → 图片永远不可见。

**修复**：✅ 已删除此规则。改为显式 `img-loading`/`img-loaded` class（后也删除）。

### 问题 2：.reveal-media opacity:0 规则 🔴 严重

**位置**：`src/index.css:1336`
```css
/* 已删除 opacity:0 */
.reveal-media { opacity: 0; transform: translateY(18px); ... }
```

**影响**：所有 gallery figure 初始 opacity:0，需要 JS `useScrollReveal` hook 在 IntersectionObserver 触发后加 `.is-visible`。但是 Work、Category、ProjectDetail 等页面都没有引入 `useScrollReveal` hook → `.is-visible` 永不被加 → 图片永远不可见。

**修复**：✅ 已删除 `opacity: 0`，保留 `transform` 动画。

### 问题 3：LazyImage onLoad 依赖 opacity class 🔴 严重

**位置**：`src/components/LazyImage.jsx`

**修复前**：LazyImage 渲染的 `<img>` 默认带 `img-loading` class (opacity:0)，依赖 onLoad 换 `img-loaded` (opacity:1)。JS 和 CSS 耦合太紧。

**修复**：✅ 已删除 loaded state / onLoad 回调 / 动态 opacity className。图片渲染即 visible。

### 当前 CSS 状态 ✅

```css
/* 最终版本 — 图片始终可见 */
img { display: block; max-width: 100%; }
.reveal-media { 
  transform: translateY(18px);  /* 仅保留入场动画 */
  transition: ...; 
}
```

---

## 六、孤立文件和无用代码

### 未使用的组件

| 文件 | 说明 | 建议 |
|------|------|------|
| `src/components/Header.jsx` | 仅一行 `export { default } from "./Navbar.jsx"`，无任何文件 import 它 | 🗑️ 删除 |
| `src/components/ProgressiveImage.jsx` | 功能完整的渐进式图片组件，但 0 个文件引用 | 🗑️ 删除 |

### 未使用的资源

| 文件 | 说明 | 建议 |
|------|------|------|
| `public/assets/optimized/projects/offline-material-design/画册170x240mm_18.webp` | 不在 projects.js 的 images 数组中 | 🗑️ 删除 |
| `public/assets/desktop/projects/offline-material-design/画册170x240mm_18.webp` | 同上 | 🗑️ 删除 |
| `public/assets/mobile/projects/offline-material-design/画册170x240mm_18.webp` | 同上 | 🗑️ 删除 |
| `public/assets/thumbs/projects/offline-material-design/画册170x240mm_18.webp` | 同上 | 🗑️ 删除 |

### 空目录

| 目录 | 建议 |
|------|------|
| `public/assets/home/` | 🗑️ 删除 |
| `public/assets/about/` | 🗑️ 删除 |
| `public/assets/optimized/home/` | 🗑️ 删除 |
| `public/assets/mobile/home/` | 🗑️ 删除 |

### 垃圾文件

| 文件 | 说明 | 建议 |
|------|------|------|
| `docs/feishu-sops/` (5 个 md) | SOP 文档，与代码无关 | 🗑️ 移出项目或删除 |
| `docs/PORTFOLIO_MAINTENANCE_SOP.md` | 同上 | 🗑️ 移出项目或删除 |

### 死代码

| 位置 | 代码 | 问题 |
|------|------|------|
| `src/main.jsx:15-17` | `document.addEventListener("load", ...)` | 给所有图片加 `img-loaded` class，但 CSS 已不包含此规则 → 无效代码 |

### Service Worker 问题

| 文件 | 问题 | 建议 |
|------|------|------|
| `public/sw.js` | 注册了但文件内容未知（可能为空或配置有问题） | 检查其内容 |

---

## 七、可能导致 Build 失败的问题

| 风险 | 说明 |
|------|------|
| `npm run build` | ✅ 当前构建成功 (46 modules, 761ms) |
| `tailwind.config.js` | ✅ 配置正常 |
| `postcss.config.js` | ✅ 配置正常 |
| `vite.config.js` | ✅ 配置正常 |
| 图片脚本 (sharp) | ⚠️ 需要 `npm install` 后才有 sharp 依赖 |

### Vite 插件：全量路由 preload

`vite.config.js` 中的自定义插件在每个页面 HTML 中注入所有路由 chunk 的 `<link rel="modulepreload">`（Home / Work / ProjectDetail / About / Category / projects）。这会导致首页多加载 ~33KB 的 JS。不算 bug，但对首屏速度有影响。**不建议现在改**。

---

## 八、总结

### 严重问题（已修复）
- [x] `img[loading=lazy]{opacity:0}` CSS 规则 → 删除
- [x] `.reveal-media{opacity:0}` CSS 规则 → 删除
- [x] LazyImage onLoad/opacity class 耦合 → 删除

### 可清理项

| 类型 | 数量 | 建议 |
|------|------|------|
| 未使用的组件 | 2 个 (Header, ProgressiveImage) | 删除 |
| 多余图片文件 | 4 个 (画册170x240mm_18.webp × 4尺寸) | 删除 |
| 空目录 | 4 个 (home, about 等) | 删除 |
| 死代码 | 1 处 (main.jsx img-loaded 监听器) | 清理 |
| 文档文件 | 6 个 (docs/) | 移出项目 |

### 当前状态

- ✅ Build 成功
- ✅ 所有页面 HTTP 200
- ✅ 所有图片路径正确
- ✅ 图片渲染即 visible（无 opacity 阻挡）
- ⚠️ 本地预览 (`npm run preview`) 可正常打开 http://localhost:4173
