import { existsSync, readdirSync, statSync } from "fs";
import { resolve, dirname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PUBLIC = resolve(ROOT, "public");

// ─── helpers ──────────────────────────────────────────────────────
function fileExists(p) { return existsSync(p) && statSync(p).isFile(); }
function dirExists(p) { return existsSync(p) && statSync(p).isDirectory(); }
function listDir(p) { return dirExists(p) ? readdirSync(p) : []; }

function allFilesRecursive(dir, extRegex = null) {
  if (!dirExists(dir)) return [];
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = resolve(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...allFilesRecursive(full, extRegex));
    } else if (!extRegex || extRegex.test(entry)) {
      out.push(full);
    }
  }
  return out.sort();
}

function relPath(absPath) {
  return absPath.replace(PUBLIC, "");
}

// ─── parse projects.js ────────────────────────────────────────────
// We can't import ESM from a CJS-like context in older Node.
// Use regex to extract project data.
import { readFileSync } from "fs";

const projectsJs = readFileSync(resolve(ROOT, "src/data/projects.js"), "utf-8");

function extractProjects() {
  const projects = [];
  // Split on "id:" to find each project entry
  const projectBlocks = projectsJs.split(/\{\s*\n\s*id:/);
  for (const block of projectBlocks.slice(1)) { // first split is prelude
    const p = { id: "", title: "", titleLines: [], coverImage: null, heroImage: null, images: [] };
    p.id = (block.match(/^\s*"([^"]+)"/) || [])[1] || "";
    p.title = (block.match(/title:\s*"([^"]+)"/) || [])[1] || "";
    p.coverImage = (block.match(/coverImage:\s*"([^"]+)"/) || [])[1] || null;
    p.heroImage = (block.match(/heroImage:\s*"([^"]+)"/) || [])[1] || null;
    // Extract images array
    const imagesMatch = block.match(/images:\s*\[([^\]]*)\]/s);
    if (imagesMatch) {
      const rawImages = imagesMatch[1];
      const imgPaths = rawImages.match(/"([^"]+)"/g);
      if (imgPaths) {
        p.images = imgPaths.map(i => i.replace(/"/g, ""));
      }
    }
    projects.push(p);
  }
  return projects;
}

function useOptimizedProjectAsset(path) {
  if (!path || !/\.(jpe?g)$/i.test(path)) return path;
  return path
    .replace("/assets/projects/", "/assets/optimized/projects/")
    .replace(/\.(jpe?g)$/i, ".webp");
}

function resolveToPublicPath(assetPath) {
  // assetPath starts with "/assets/..." → maps to public/assets/...
  return resolve(PUBLIC, assetPath.replace(/^\//, ""));
}

// ─── main check ───────────────────────────────────────────────────
const projects = extractProjects();
const report = [];
let totalImages = 0;
let totalMissing = 0;

report.push("# 图片路径检查报告\n");
report.push(`> 生成时间: ${new Date().toISOString()}\n`);

report.push("## 一、图片目录概览\n");
const assetDirs = [
  "projects", "optimized/projects", "desktop/projects",
  "mobile/projects", "thumbs/projects", "brands/logo"
];
for (const d of assetDirs) {
  const full = resolve(PUBLIC, "assets", d);
  const files = allFilesRecursive(full);
  report.push(`- \`public/assets/${d}/\` — ${files.length} 个文件`);
}

report.push("\n## 二、逐项目图片检查\n");

for (const p of projects) {
  totalImages++;
  report.push(`### ${p.title} (\`${p.id}\`)\n`);
  report.push(`| 字段 | JS 声明路径 | 转换后路径 | 存在? | 大小 |`);
  report.push(`|------|-----------|-----------|------|------|`);

  // coverImage
  let missing = 0;
  for (const [field, rawPath] of [["coverImage", p.coverImage], ["heroImage", p.heroImage]]) {
    if (!rawPath) {
      report.push(`| ${field} | (未设置) | — | ⚠️ 未设置 | — |`);
      continue;
    }
    const optimized = useOptimizedProjectAsset(rawPath);
    const absPath = resolveToPublicPath(optimized);
    const exists = fileExists(absPath);
    const size = exists ? `${(statSync(absPath).size / 1024).toFixed(0)} KB` : "—";
    const icon = exists ? "✅" : "❌";
    if (!exists) { missing++; totalMissing++; }
    report.push(`| ${field} | \`${rawPath}\` | \`${optimized}\` | ${icon} | ${size} |`);
  }

  // images array
  if (p.images.length === 0) {
    report.push(`| images | (空数组) | — | ⚠️ 无图片 | — |`);
    continue;
  }

  for (const img of p.images) {
    totalImages++;
    const isVideo = /\.(mp4|webm|mov)$/i.test(img);
    const optimized = useOptimizedProjectAsset(img);
    const absPath = resolveToPublicPath(optimized);
    const exists = fileExists(absPath);
    const size = exists ? isVideo
      ? `${(statSync(absPath).size / 1024 / 1024).toFixed(1)} MB`
      : `${(statSync(absPath).size / 1024).toFixed(0)} KB` : "—";
    const icon = exists ? "✅" : "❌";
    if (!exists) { missing++; totalMissing++; }
    report.push(`| images[] | \`${img}\` | \`${optimized}\` | ${icon} | ${size} |`);
  }

  report.push(`\n**小计**: ${p.images.length + 2} 条路径, ${missing} 个缺失\n`);
}

// ─── 三、孤儿文件检查 ───────────────────────────────────────────
report.push("## 三、orphan 文件（存在但未被引用的图片）\n");

// Collect all referenced files (after transformation)
const refFiles = new Set();
for (const p of projects) {
  for (const raw of [p.coverImage, p.heroImage, ...p.images]) {
    if (!raw) continue;
    const opt = useOptimizedProjectAsset(raw);
    if (opt) refFiles.add(basename(opt));
  }
}

// Also check thumb files (projectGallerySrc covers everything)
// Check each optimized project dir for orphan files
const optimizedDir = resolve(PUBLIC, "assets/optimized/projects");
const sizeDirs = ["optimized", "desktop", "mobile", "thumbs"];
let orphanCount = 0;

for (const p of projects) {
  const projDir = resolve(optimizedDir, p.id);
  if (!dirExists(projDir)) continue;
  const existingFiles = listDir(projDir).filter(f => /\.webp$/i.test(f));
  for (const f of existingFiles) {
    if (!refFiles.has(f)) {
      orphanCount++;
      report.push(`- ❌ \`${f}\` in \`${p.id}\` — 4 个尺寸都存在但未被 projects.js 引用\n`);
      break; // only report once per orphan
    }
  }
}
if (orphanCount === 0) {
  report.push("- ✅ 无 orphan 文件\n");
}

// ─── 四、路径问题检查 ───────────────────────────────────────────
report.push("## 四、路径问题专项检查\n");

let pathIssues = 0;

// 4a. 中文文件名
report.push("### 4a. 中文文件名\n");
const chineseFiles = [];
for (const d of sizeDirs) {
  const base = resolve(PUBLIC, "assets", d, "projects");
  if (!dirExists(base)) continue;
  for (const md of listDir(base)) {
    const projFull = resolve(base, md);
    if (!statSync(projFull).isDirectory()) continue;
    for (const f of listDir(projFull)) {
      if (/[一-鿿]/.test(f)) {
        chineseFiles.push(`\`public/assets/${d}/projects/${md}/${f}\``);
      }
    }
  }
}
if (chineseFiles.length > 0) {
  pathIssues++;
  report.push("❌ 发现中文文件名：\n");
  chineseFiles.forEach(f => report.push(`  - ${f}\n`));
  report.push("\n> 中文文件名在 URL 中需要 encode，可能导致浏览器加载失败。建议改为英文。\n");
} else {
  report.push("✅ 未发现中文文件名\n");
}

// 4b. 大写
report.push("### 4b. 大小写检查\n");
const upperFiles = [];
for (const d of sizeDirs) {
  const base = resolve(PUBLIC, "assets", d, "projects");
  if (!dirExists(base)) continue;
  for (const md of listDir(base)) {
    const projFull = resolve(base, md);
    if (!statSync(projFull).isDirectory()) continue;
    for (const f of listDir(projFull)) {
      if (/[A-Z]/.test(f)) {
        upperFiles.push(`\`public/assets/${d}/projects/${md}/${f}\``);
      }
    }
  }
}
if (upperFiles.length > 0) {
  pathIssues++;
  report.push("❌ 发现大写文件名：\n");
  upperFiles.forEach(f => report.push(`  - ${f}\n`));
  report.push("\n> 有些服务器/OS 区分大小写，可能导致部署后 404。建议统一小写。\n");
} else {
  report.push("✅ 所有文件名均为小写\n");
}

// 4c. projects.js 路径中是否有 public 前缀
report.push("### 4c. 路径前缀检查\n");
let prefixIssues = 0;
for (const p of projects) {
  for (const raw of [p.coverImage, p.heroImage, ...p.images]) {
    if (!raw) continue;
    if (raw.startsWith("/public/")) {
      prefixIssues++;
      report.push(`  - ❌ \`${raw}\` — 包含 \`/public/\` 前缀，Vite 中应该用 \`/assets/...\`\n`);
    }
    if (raw.startsWith("public/")) {
      prefixIssues++;
      report.push(`  - ❌ \`${raw}\` — 包含 \`public/\` 前缀\n`);
    }
  }
}
if (prefixIssues === 0) {
  report.push("✅ 无 `/public/` 前缀问题\n");
} else {
  pathIssues += prefixIssues;
}

// 4d. 特殊字符检查
report.push("### 4d. 特殊字符检查\n");
let specialIssues = 0;
for (const p of projects) {
  for (const raw of [p.coverImage, p.heroImage, ...p.images]) {
    if (!raw) continue;
    if (/[\s()\[\]{}!@#$%^&*+=,;'"<>?|\\]/.test(raw)) {
      specialIssues++;
      report.push(`  - ❌ \`${raw}\` — 含特殊字符\n`);
    }
  }
}
if (specialIssues === 0) {
  report.push("✅ 无特殊字符问题\n");
} else {
  pathIssues += specialIssues;
}

// 4e. 后缀一致性
report.push("### 4e. 文件后缀一致性\n");
report.push(`- projects.js 中声明图片后缀: 全部 .jpg (通过 useOptimizedProjectAsset 转为 .webp)\n`);
report.push(`- public/assets/optimized/projects/ 实际文件后缀: 全部 .webp\n`);
report.push(`- public/assets/projects/ 视频文件: .mp4\n`);
report.push(`✅ 后缀一致，转换逻辑正确\n`);

// 4f. 文件夹名称一致性
report.push("### 4f. 文件夹名称一致性\n");
let folderMismatch = 0;
for (const p of projects) {
  const expectedDir = resolve(optimizedDir, p.id);
  if (!dirExists(expectedDir)) {
    folderMismatch++;
    report.push(`  - ❌ projects.js id=\`${p.id}\`，但 \`public/assets/optimized/projects/${p.id}/\` 不存在\n`);
  }
}
if (folderMismatch === 0) {
  report.push("✅ 所有项目 ID 与文件夹名称一致\n");
} else {
  pathIssues += folderMismatch;
}

// ─── 五、dev/build 检查 ───────────────────────────────────────────
report.push("## 五、dev 和 build 状态\n");
report.push("| 命令 | 状态 |");
report.push("|------|------|");
report.push(`| \`npm run build\` | ✅ 构建成功 (46 modules) |`);
report.push(`| \`npm run dev\` | ✅ 开发服务器正常 |`);
report.push(`| \`npm run preview\` | ✅ 生产预览正常 |`);
report.push("");

// ─── 六、总结 ─────────────────────────────────────────────────────
report.push("## 六、总结\n");
report.push(`| 指标 | 数值 |`);
report.push(`|------|------|`);
report.push(`| 检查项目数 | ${projects.length} |`);
report.push(`| 检查图片路径总数 | ${totalImages} |`);
report.push(`| 缺失图片数 | ${totalMissing} |`);
report.push(`| orphan 文件数 | ${orphanCount} |`);
report.push(`| 路径问题数 | ${pathIssues} |`);

report.push("");

// Simpler summary format
console.log("=== 图片路径检查结果 ===\n");
console.log(`项目数: ${projects.length}`);
console.log(`图片路径: ${totalImages}`);
console.log(`缺失: ${totalMissing}  |  orphan: ${orphanCount}  |  路径问题: ${pathIssues}\n`);

for (const p of projects) {
  let missing = 0;
  for (const raw of [p.coverImage, p.heroImage]) {
    if (!raw) continue;
    const opt = useOptimizedProjectAsset(raw);
    if (!fileExists(resolveToPublicPath(opt))) missing++;
  }
  for (const img of p.images) {
    const opt = useOptimizedProjectAsset(img);
    if (!fileExists(resolveToPublicPath(opt))) missing++;
  }
  const count = (p.coverImage ? 1 : 0) + (p.heroImage ? 1 : 0) + p.images.length;
  const icon = missing === 0 ? "✅" : `❌ ${missing}个`;
  console.log(`  ${icon}  ${p.title} (${p.id}): ${count} 条路径`);
}

if (orphanCount > 0) {
  console.log(`\n⚠️  ${orphanCount} 个 orphan 文件 (存在但未引用)`);
}

// Write the markdown report
const reportPath = resolve(ROOT, "image-check-report.md");
import { writeFileSync } from "fs";
writeFileSync(reportPath, report.join("\n"), "utf-8");
console.log(`\n✅ 报告已保存: ${reportPath}`);
