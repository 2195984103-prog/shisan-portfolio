# 作品集网站内容替换说明

这份说明给没有代码基础的人看。

你后期最常改 3 个地方：

```text
src/data/projects.js        修改项目文字和图片路径
public/assets/home/         放首页首屏背景图
public/assets/projects/     放每个项目的图片
```

改完以后，保存文件，刷新浏览器，一般就能看到变化。

## 1. 如何替换首页首屏图片

首页第一屏的背景图放这里：

```text
public/assets/home/hero-futuristic.jpg
```

替换方法：

1. 准备一张新的首页大图。
2. 把图片名字改成 `hero-futuristic.jpg`。
3. 放到 `public/assets/home/` 文件夹里。
4. 刷新浏览器。

建议图片尺寸：

```text
横版图片
建议 1920 x 1080
或更大的横版图片
```

注意：不要直接引用电脑下载文件夹里的图片，必须先放进 `public/assets/home/`。

## 2. 如何修改首页文案

首页文案在这里：

```text
src/pages/Home.jsx
```

可以搜索这些文字：

```text
视觉设计师 / 内容运营
Shisan
朱思睿
我是一名懂品牌内容生产的 AIGC 视觉与产品运营实践者
```

把它们改成你自己的介绍即可。

注意：只改文字内容，不要删除 `<p>`、`</p>`、`className` 这些符号。

## 3. 如何新增一个项目

所有项目都在这里：

```text
src/data/projects.js
```

新增方法：

1. 打开 `src/data/projects.js`。
2. 找到 `export const projects = [`。
3. 复制一个已有项目。
4. 粘贴到列表里。
5. 修改里面的文字和图片路径。

一个项目大概长这样：

```js
{
  id: "my-new-project",
  title: "我的新项目",
  titleLines: ["我的", "新项目"],
  category: "automotive",
  categoryName: "汽车广告",
  type: "KV设计",
  brand: "品牌名称",
  year: "2026",
  role: "视觉设计 / 后期合成",
  tools: ["Photoshop", "Illustrator"],
  coverImage: "/assets/projects/my-new-project/cover.jpg",
  heroImage: "/assets/projects/my-new-project/hero.jpg",
  description: "一句话介绍这个项目。",
  background: "这里写项目背景。",
  responsibilities: [
    "我负责的工作 1",
    "我负责的工作 2",
  ],
  images: [
    "/assets/projects/my-new-project/01.jpg",
    "/assets/projects/my-new-project/02.jpg",
  ],
}
```

最重要的是 `id`。

例如：

```text
id: "my-new-project"
```

这个项目的网址就是：

```text
/project/my-new-project
```

`id` 建议：

```text
用英文
用小写
用短横线
不要用中文
不要用空格
```

`titleLines` 是控制详情页大标题怎么换行。

例如你想显示成：

```text
从生成图到
商业视觉落地
```

就写成：

```js
title: "从生成图到商业视觉落地",
titleLines: ["从生成图到", "商业视觉落地"],
```

## 4. 如何删除一个项目

删除方法：

1. 打开 `src/data/projects.js`。
2. 找到你不想要的项目。
3. 从这个项目开头的 `{` 删除到结尾的 `},`。
4. 保存文件。

注意：不要只删除项目标题，要删除整个项目。

## 5. 如何修改项目分类

项目分类在 `src/data/projects.js` 里。

每个项目里都有这两行：

```js
category: "automotive",
categoryName: "汽车广告",
```

现在可以用这些分类：

```text
automotive = 汽车广告
aigc       = AIGC视觉设计
ui         = 其他内容
```

例如想把项目改成 AIGC视觉设计：

```js
category: "aigc",
categoryName: "AIGC视觉设计",
```

如果想修改首页分类卡片的文字，还是在 `src/data/projects.js` 里找：

```js
export const projectCategories = [
```

## 6. 如何替换项目封面图

项目封面图是列表页和首页卡片里显示的图片。

它由这一行控制：

```js
coverImage: "/assets/projects/dongfeng-lantu/cover.jpg",
```

替换方法：

1. 找到对应项目图片文件夹。
2. 准备一张新封面图。
3. 命名为 `cover.jpg`。
4. 放进去，覆盖原来的 `cover.jpg`。
5. 刷新浏览器。

建议封面图：

```text
横版
画面主体清楚
不要太小
建议 1600px 宽以上
```

## 7. 如何替换项目详情图

项目详情页最上方的大图由这一行控制：

```js
heroImage: "/assets/projects/dongfeng-lantu/hero.jpg",
```

替换方法：

1. 准备一张项目详情大图。
2. 命名为 `hero.jpg`。
3. 放到对应项目文件夹里。
4. 覆盖原来的 `hero.jpg`。
5. 刷新浏览器。

项目里还有一个 `images`：

```js
images: [
  "/assets/projects/dongfeng-lantu/01.jpg",
  "/assets/projects/dongfeng-lantu/02.jpg",
  "/assets/projects/dongfeng-lantu/03.jpg",
],
```

这个字段是项目展示图路径。后面如果详情页增加更多大图展示，就会从这里读取。

如果要增加一张图，可以这样写：

```js
images: [
  "/assets/projects/dongfeng-lantu/01.jpg",
  "/assets/projects/dongfeng-lantu/02.jpg",
  "/assets/projects/dongfeng-lantu/03.jpg",
  "/assets/projects/dongfeng-lantu/04.jpg",
],
```

同时把 `04.jpg` 图片放进对应文件夹。

## 8. 图片应该放在哪个文件夹

首页首屏图片放这里：

```text
public/assets/home/
```

项目图片放这里：

```text
public/assets/projects/
```

每个项目建议单独一个文件夹：

```text
public/assets/projects/dongfeng-lantu/
public/assets/projects/la-mer-aigc/
public/assets/projects/my-new-project/
```

如果你新增项目 `my-new-project`，就新建这个文件夹：

```text
public/assets/projects/my-new-project/
```

然后把项目图片放进去。

## 9. 图片命名应该怎么命名

建议这样命名：

```text
cover.jpg   项目封面图
hero.jpg    项目详情页首图
01.jpg      项目展示图 1
02.jpg      项目展示图 2
03.jpg      项目展示图 3
04.jpg      项目展示图 4
```

文件夹和图片名建议：

```text
用英文
用小写
用短横线
不要用空格
不要用中文
```

推荐：

```text
la-mer-aigc
dongfeng-lantu
my-new-project
```

不推荐：

```text
我的项目
项目 1
New Project!!!!
```

## 10. 修改后如何本地预览

打开终端，进入项目文件夹：

```bash
cd "/Users/shisan/Documents/作品集 4"
```

启动网站：

```bash
npm run dev
```

看到类似这个地址后，在浏览器打开：

```text
http://127.0.0.1:5173/
```

如果网站已经启动，改完内容后通常只需要刷新浏览器。

## 11. 如何检查有没有报错

最简单的检查方法：

1. 保存文件。
2. 回到终端。
3. 运行：

```bash
npm run build
```

如果看到：

```text
✓ built
```

说明网站可以正常打包。

如果看到红色报错，先检查刚才改过的地方。

最常见的问题：

```text
少了逗号
少了引号
图片路径写错
删除项目时多删或少删了括号
图片文件名和代码里的名字不一样
```

你可以重点检查：

```text
每一段文字外面有没有引号
每个项目之间有没有逗号
图片文件夹名字是否完全一样
图片文件名是否完全一样
```

## 最后记住

只替换作品内容时，优先改这 3 个地方：

```text
src/data/projects.js
public/assets/home/
public/assets/projects/
```

不要随便删除看不懂的符号。只改文字、图片路径和图片文件，最安全。
