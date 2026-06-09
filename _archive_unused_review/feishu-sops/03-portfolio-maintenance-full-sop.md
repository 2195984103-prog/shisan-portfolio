# 03｜个人作品集网站维护全 SOP

适用对象：当前个人作品集网站的日常维护、内容更新、图片替换、项目新增、构建和上线。

维护原则：轻代码、少改结构、多改数据。优先维护 `src/data/projects.js` 和 `public/assets`，不要轻易重构 React 组件。

## 一、维护前检查

### 1. 进入项目目录

```bash
cd "/Users/shisan/Documents/作品集 4"
```

### 2. 本地启动预览

```bash
npm run dev
```

浏览器打开终端显示的地址，通常是：

```txt
http://localhost:5173/
```

### 3. 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 本地预览 |
| `npm run process-images` | 处理图片，生成 WebP 和缩略图 |
| `npm run build` | 上线前构建检查 |
| `npm run preview` | 预览打包后的 dist |

## 二、项目结构维护地图

| 维护内容 | 文件或目录 |
| --- | --- |
| 新增/修改作品 | `src/data/projects.js` |
| 修改首页结构 | `src/pages/Home.jsx` |
| 修改作品详情页模板 | `src/pages/ProjectDetail.jsx` |
| 修改全部作品页 | `src/pages/Work.jsx` |
| 修改关于页 | `src/pages/About.jsx` |
| 修改导航 | `src/components/Navbar.jsx` |
| 修改页脚 | `src/components/Footer.jsx` |
| 修改按钮 | `src/components/Button.jsx` |
| 修改首页圆形作品图 | `src/components/SphereCarousel.jsx` |
| 修改精选项目轮播 | `src/components/FeaturedCarousel.jsx` |
| 修改全局样式和动效 | `src/index.css` |
| 放项目原始图片 | `public/assets/projects` |
| 放品牌 logo | `public/assets/brands/logo` |
| 放简历 PDF | `public/assets/resume` |
| 图片处理脚本 | `scripts/convert-to-webp.js`、`scripts/generate-thumbnails.js` |
| 部署设置 | `netlify.toml` |

## 三、新增一个作品项目

### 1. 准备图片文件夹

在下面目录中新建项目文件夹：

```txt
public/assets/projects/新项目英文id/
```

示例：

```txt
public/assets/projects/new-brand-kv/
```

放入图片：

```txt
cover.jpg
hero.jpg
01.jpg
02.jpg
03.jpg
```

### 2. 复制项目数据对象

打开：

```txt
src/data/projects.js
```

复制一个已有项目对象，修改字段：

- `id`
- `title`
- `titleLines`
- `category`
- `categoryName`
- `type`
- `brand`
- `year`
- `role`
- `tools`
- `coverImage`
- `heroImage`
- `description`
- `background`
- `responsibilities`
- `images`

注意：

- `id` 只能用英文、小写、短横线。
- `id` 会变成网址的一部分。
- 图片路径以 `/assets/projects/` 开头。
- `titleLines` 用于详情页大标题换行。

### 3. 运行图片处理

```bash
npm run process-images
```

系统会生成：

- 高清 WebP
- 桌面图
- 移动端图
- 缩略图

### 4. 检查本地效果

运行：

```bash
npm run dev
```

检查：

- 首页是否需要出现这个项目。
- 作品页是否出现。
- 分类页是否出现。
- 详情页是否能打开。
- 图片是否清晰。
- 手机端是否正常。

### 5. 如果要加入首页精选

在 `src/data/projects.js` 找到：

```js
export const featuredProjectIds = [
  "dongfeng-lantu-kv",
  "aizhongcao-ip-aigc",
  "offline-material-design",
  "la-mer-aigc-visual",
];
```

把新项目 `id` 加进去，或替换其中一个。

## 四、修改已有作品内容

### 修改标题

位置：

```txt
src/data/projects.js
```

字段：

```js
title: "项目名称",
titleLines: ["第一行", "第二行"],
```

注意：详情页大标题主要看 `titleLines`，不要只改 `title`。

### 修改分类

字段：

```js
category: "automotive",
categoryName: "汽车广告",
```

当前分类：

| category | categoryName |
| --- | --- |
| `automotive` | 汽车广告 |
| `aigc` | AIGC视觉设计 |
| `ui` | 其他内容 |

### 修改项目简介

字段：

```js
description: "一句话简介",
background: "项目背景",
responsibilities: [
  "负责事项 1",
  "负责事项 2"
]
```

建议：

- `description` 保持 1 句话。
- `background` 保持 1 段。
- `responsibilities` 保持 3-5 条。
- 不要写空泛大词，多写具体动作。

## 五、替换图片

### 1. 替换原始图片

替换：

```txt
public/assets/projects/项目id/对应图片.jpg
```

保持文件名不变最省事。比如只替换 `hero.jpg`，代码里不用改路径。

### 2. 重新处理图片

```bash
npm run process-images
```

### 3. 检查页面

重点看：

- 首页封面。
- 作品卡片。
- 详情页首图。
- 详情页画廊。
- 移动端裁切。

## 六、维护首页

### 1. 修改首页身份文案

文件：

```txt
src/components/SphereCarousel.jsx
```

当前文案：

```txt
视觉设计师与 AIGC 内容创作者，
关注品牌视觉、商业落地和内容表达。
```

修改时注意：

- 两行以内。
- 不要写太像简历。
- 不要堆太多能力词。

### 2. 修改大标题

文件：

```txt
src/components/SphereCarousel.jsx
```

搜索：

```txt
SHISAN
```

### 3. 修改开场 loading

文件：

```txt
src/pages/Home.jsx
```

搜索：

```txt
home-loader
```

可以修改：

- `SHISAN PORTFOLIO`
- `READY`
- `Loading selected visual works`
- `KV DESIGN / AIGC VISUAL / ...`

### 4. 修改首页简历按钮

文件：

```txt
src/pages/Home.jsx
```

当前简历路径：

```txt
/assets/resume/zhu-sirui-visual-design-resume.pdf
/assets/resume/zhu-sirui-content-operations-resume.pdf
```

替换 PDF 时放到：

```txt
public/assets/resume/
```

## 七、维护关于页

文件：

```txt
src/pages/About.jsx
```

建议定期检查：

- 个人介绍是否过期。
- 能力标签是否准确。
- 经历是否真实。
- 联系方式是否一致。
- 简历下载是否可用。

关于页原则：

- 不要写成完整简历。
- 重点补充作品之外的信息。
- 语言要简洁、自信、真实。

## 八、维护导航和页脚

### 导航

文件：

```txt
src/components/Navbar.jsx
```

适合修改：

- 菜单名称。
- 页面路径。
- 是否增加新入口。

不建议：

- 导航项太多。
- 加太多社交平台入口。
- 做复杂下拉菜单。

### 页脚

文件：

```txt
src/components/Footer.jsx
```

适合检查：

- 邮箱。
- 电话。
- 版权年份。
- 简历或联系入口。

## 九、维护视觉样式

主要文件：

```txt
src/index.css
```

常用变量：

```css
--color-ink: #090909;
--color-soft: #080808;
--color-panel: #111111;
--color-line: rgba(255, 255, 255, 0.11);
--color-accent: #f26a1b;
--radius-control: 10px;
--radius-media: 16px;
--radius-panel: 18px;
```

维护原则：

- 改颜色前先确认会影响全站。
- 橙色只做强调，不要大面积铺开。
- 圆角不要超过 24px。
- 字距保持 `0`，不要做负字距。
- 标题不要无限放大。

## 十、维护动效

涉及文件：

- `src/pages/Home.jsx`
- `src/components/FeaturedCarousel.jsx`
- `src/hooks/useScrollReveal.js`
- `src/index.css`

当前动效类型：

- 首页 loading。
- 首屏滚动退场。
- 区块进入视口渐入。
- 圆形作品图漂浮。
- 品牌横向滚动。
- 精选项目轮播。
- hover 图片缩放。

维护原则：

- 动效必须服务内容。
- 不要做弹跳、翻转、强闪烁。
- 不要让内容必须等动画结束才出现。
- 保留 `prefers-reduced-motion`。

## 十一、上线前检查

每次上线前执行：

```bash
npm run build
```

人工检查：

- 首页。
- 作品页。
- 每个分类页。
- 至少 3 个项目详情页。
- 关于页。
- 简历下载。
- 手机端。
- 联系方式。

重点问题：

- 图片是否 404。
- 视频是否能播放。
- 标题是否重叠。
- 手机端是否横向溢出。
- 页面是否过慢。
- 内容是否有错字。

## 十二、常见问题处理

### 图片不显示

检查：

- 文件是否放在 `public/assets/projects/项目id/`。
- 路径大小写是否一致。
- `src/data/projects.js` 中路径是否写错。
- 是否运行过 `npm run process-images`。

### 项目详情页打不开

检查：

- URL 中的项目 id 是否存在。
- `src/data/projects.js` 中 `id` 是否重复。
- 路由是否是 `/project/项目id`。

### 构建失败

先看终端报错：

- 如果是 `Unexpected token`，多半是逗号、括号、引号错误。
- 如果是图片处理报错，检查图片是否损坏。
- 如果是模块找不到，检查文件名和引用路径。

### 手机端排版乱

优先检查：

- 标题是否太长。
- 图片比例是否特殊。
- CSS 是否写了固定宽度。
- Tailwind 是否缺少移动端断点。

## 十三、建议维护频率

每月：

- 检查联系方式。
- 检查简历 PDF。
- 检查首页精选项目顺序。

每季度：

- 替换弱项目。
- 补充新项目。
- 优化项目文案。
- 检查移动端体验。

投递前：

- 根据岗位调整首页精选顺序。
- 确保最相关项目排在前面。
- 简历 PDF 使用最新版本。
- 项目文案避免错别字。
- 构建通过。

