# cleanup-report.md — 作品集网站体检与清理记录

> 最后更新: 2026-06-09

---

## 一、已删除文件

| 文件 | 删除原因 |
|------|---------|
| `src/components/Header.jsx` | 孤立组件，仅一行 re-export Navbar，无任何文件 import |
| `src/components/ProgressiveImage.jsx` | 孤立组件，完整渐进图片组件但未被任何文件引用 |
| `public/assets/**/画册170x240mm_18.webp` (×4 sizes) | 中文文件名 orphan，不在 projects.js 的 images 数组中 |
| `netlify.toml` | 废弃配置，Netlify 积分已用完 |
| `cleanup-report.md` | 旧报告，已被本标准版取代 |

### 空目录已删除
`public/assets/home/`, `public/assets/about/`, `public/assets/optimized/home/`, `public/assets/mobile/home/`, 以及 6 个空的 `public/assets/projects/*/` 子目录

### 死代码已清理
- `src/main.jsx`: 删除全局 `img-loaded` 监听器（CSS 已无此规则）
- `src/pages/Work.jsx`: 删除未使用的 `featuredProjects` import

---

## 二、已归档文件 → `_archive_unused_review/`

这些文件不确定是否需要，已移入归档而不是直接删除：

| 原路径 | 归档路径 | 原因 |
|--------|---------|------|
| `AGENTS.md` | `_archive_unused_review/AGENTS.md` | AI agent 指引，与代码运行无关 |
| `DESIGN.md` | `_archive_unused_review/DESIGN.md` | 设计文档 |
| `PRODUCT.md` | `_archive_unused_review/PRODUCT.md` | 产品文档 |
| `docs/feishu-sops/` (5 个 md) | `_archive_unused_review/feishu-sops/` | SOP 流程文档 |
| `docs/PORTFOLIO_MAINTENANCE_SOP.md` | `_archive_unused_review/PORTFOLIO_MAINTENANCE_SOP.md` | SOP 文档 |
| `.impeccable/live/config.json` | `_archive_unused_review/impeccable-config.json` | IDE 扩展配置 |

> 如果后续确认不需要，可以删除整个 `_archive_unused_review/` 目录。

---

## 三、图片显示问题修复记录

### Bug 1: CSS `img[loading=lazy] { opacity: 0 }` 
**文件**: `src/index.css:62`
**影响**: 所有 `loading=lazy` 的 `<img>` 初始透明，等 `onLoad` 触发 `img-loaded` 才 visible。
**修复**: 删除此规则。

### Bug 2: CSS `.reveal-media { opacity: 0 }`
**文件**: `src/index.css:1336`
**影响**: Gallery 的 `<figure>` 初始透明，依赖 `useScrollReveal` hook 触发 `.is-visible`。但 Work/Category/ProjectDetail 页面均未引入此 hook。
**修复**: 删除 `opacity:0`，保留 `transform` 动画。

### Bug 3: LazyImage onLoad/opacity class 耦合
**文件**: `src/components/LazyImage.jsx`
**影响**: DOM `<img>` 渲染后依赖 JavaScript `onLoad` 回调添加 `img-loaded` class 才 visible。
**修复**: 删除 `loaded` state / `onLoad` 回调 / 动态 opacity className。图片渲染即 visible。

---

## 四、图片加载保护

| 组件 | onError fallback | 机制 |
|------|-----------------|------|
| LazyImage | `placeholder → optimized/webp → dongfeng fallback` | `failed` state，回退到占位图 + `img-failed` class |
| ProjectDetail hero | `hero → cover → dongfeng fallback` | 自定义 onError handler |
| FeaturedCarousel | `hero → cover → dongfeng fallback` | handleImageError 在组件内部 |
| SphereCarousel | `→ dongfeng fallback` + clear srcset | 含 `img-failed` class |
| BrandMarquee | `→ img-failed` class | 灰色占位 |
| CSS | `img.img-failed { background: rgba(255,255,255,0.06); min-height: 120px }` | 统一的失败占位样式 |

---

## 五、图片路径检查结果

工具: `scripts/check-images.js`  
报告: `image-check-report.md`

| 指标 | 数值 |
|------|------|
| 检查项目数 | 8 |
| 检查图片路径数 | 80 |
| 缺失 | 0 |
| orphan 文件 | 0 |
| 路径前缀问题 | 0 |

---

## 六、当前项目文件结构

```
项目根目录/
├── index.html                  # 入口
├── package.json                # 依赖和脚本
├── postcss.config.js           # PostCSS/Tailwind 配置
├── tailwind.config.js          # Tailwind 配置
├── vite.config.js              # Vite 构建配置
├── .gitignore                  # Git 忽略规则
├── README.md                   # 项目说明
├── image-check-report.md       # 图片路径检查报告
├── cleanup-report.md           # 本报告
├── _archive_unused_review/     # 归档文件（可删除）
├── public/
│   ├── fonts/optimized/        # 字体
│   ├── sw.js                   # Service Worker (缓存策略)
│   └── assets/
│       ├── brands/logo/        # 品牌 logo (7 张 PNG)
│       ├── projects/           # 视频源文件 (2 个 MP4)
│       ├── optimized/projects/ # 1800w 展示图 (84 张 WEBP)
│       ├── desktop/projects/   # 1200w 卡片图 (84 张 WEBP)
│       ├── mobile/projects/    # 960w 移动图 (84 张 WEBP)
│       ├── thumbs/projects/    # 600w 缩略图 (84 张 WEBP)
│       └── resume/             # PDF 简历 (2 份)
├── scripts/
│   ├── check-images.js         # 图片路径检查脚本
│   ├── convert-to-webp.js      # 图片格式转换
│   ├── generate-thumbnails.js  # 缩略图生成
│   └── compress-videos.js      # 视频压缩
└── src/
    ├── main.jsx                # React 入口
    ├── App.jsx                 # 路由配置 (lazy load)
    ├── index.css               # 全局样式
    ├── data/
    │   ├── projects.js         # 项目数据 + 图片路径转换
    │   └── brands.js           # 品牌 logo 数据
    ├── utils/
    │   └── assets.js           # 图片路径工具 (srcSet/mobile/thumb)
    ├── hooks/
    │   ├── usePrefetchImage.js
    │   └── useScrollReveal.js
    ├── components/
    │   ├── Layout.jsx, Navbar.jsx, Footer.jsx
    │   ├── LazyImage.jsx, ProjectCard.jsx
    │   ├── BrandMarquee.jsx, CategoryCard.jsx
    │   ├── FeaturedCarousel.jsx, SphereCarousel.jsx
    │   ├── Button.jsx, DisplayTitle.jsx, SectionTitle.jsx
    └── pages/
        ├── Home.jsx, Work.jsx, Category.jsx
        ├── ProjectDetail.jsx, About.jsx, NotFound.jsx
```
