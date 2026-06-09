import sharp from "sharp";
import { existsSync, readdirSync, statSync, mkdirSync, unlinkSync } from "fs";
import { resolve, join, dirname, extname, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");
const PUBLIC = resolve(PROJECT_ROOT, "public");
const PROJECTS_SRC = resolve(PUBLIC, "assets/projects");
const OPTIMIZED_DIR = resolve(PUBLIC, "assets/optimized/projects");
const MOBILE_DIR = resolve(PUBLIC, "assets/mobile/projects");

// Quality settings: 85 = visually lossless, 80 = very good for mobile
const OPTIMIZED_QUALITY = 85;
const MOBILE_QUALITY = 82;
const OPTIMIZED_WIDTH = 1800;
const MOBILE_WIDTH = 960;

function formatKB(bytes) {
  return (bytes / 1024).toFixed(0);
}

function getAllJpgs(dir) {
  const results = [];
  if (!existsSync(dir)) return results;

  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      results.push(...getAllJpgs(fullPath));
    } else if (/\.(jpe?g)$/i.test(entry)) {
      results.push(fullPath);
    }
  }
  return results;
}

function getRelativeOutput(inputPath, targetDir) {
  // inputPath is like .../public/assets/projects/dongfeng-lantu-kv/cover.jpg
  // output should be .../public/assets/optimized/projects/dongfeng-lantu-kv/cover.webp
  // and .../public/assets/mobile/projects/dongfeng-lantu-kv/cover.webp
  const relToProjects = inputPath.replace(PROJECTS_SRC, "");
  // relToProjects: /dongfeng-lantu-kv/cover.jpg
  const withoutExt = relToProjects.replace(/\.(jpe?g)$/i, "");
  return join(targetDir, withoutExt + ".webp");
}

async function compressImage(inputPath, outputPath, width, quality) {
  mkdirSync(dirname(outputPath), { recursive: true });

  try {
    await sharp(inputPath)
      .resize(width, null, { withoutEnlargement: true, fit: "inside" })
      .webp({ quality, effort: 6 })
      .toFile(outputPath);
    return statSync(outputPath).size;
  } catch (err) {
    console.error(`  ✗ Failed: ${err.message}`);
    return 0;
  }
}

async function main() {
  console.log("Finding source JPGs...");
  const jpgs = getAllJpgs(PROJECTS_SRC);
  console.log(`  Found ${jpgs.length} JPG files\n`);

  // 1a. Generate optimized WebP versions
  console.log("=== Generating OPTIMIZED WebP (1800px, q85) ===");
  let optTotalBefore = 0;
  let optTotalAfter = 0;
  let optCount = 0;

  for (const jpg of jpgs) {
    const name = jpg.replace(PROJECTS_SRC, "");
    if (!existsSync(jpg)) continue;

    const inputSize = statSync(jpg).size;
    const outputPath = getRelativeOutput(jpg, OPTIMIZED_DIR);

    // Check if output exists and is newer
    if (existsSync(outputPath) && statSync(outputPath).mtime > statSync(jpg).mtime) {
      console.log(`  SKIP ${name} — already converted`);
      optTotalAfter += statSync(outputPath).size;
      optCount++;
      continue;
    }

    const outSize = await compressImage(jpg, outputPath, OPTIMIZED_WIDTH, OPTIMIZED_QUALITY);
    if (outSize > 0) {
      const reduction = ((1 - outSize / inputSize) * 100).toFixed(0);
      console.log(`  ${name}: ${formatKB(inputSize)}KB → ${formatKB(outSize)}KB WebP (${reduction}%)`);
      optTotalBefore += inputSize;
      optTotalAfter += outSize;
      optCount++;
    }
  }

  // 1b. Generate mobile WebP versions
  console.log("\n=== Generating MOBILE WebP (960px, q82) ===");
  let mobTotalBefore = 0;
  let mobTotalAfter = 0;
  let mobCount = 0;

  for (const jpg of jpgs) {
    const name = jpg.replace(PROJECTS_SRC, "");
    if (!existsSync(jpg)) continue;

    const inputSize = statSync(jpg).size;
    const outputPath = getRelativeOutput(jpg, MOBILE_DIR);

    if (existsSync(outputPath) && statSync(outputPath).mtime > statSync(jpg).mtime) {
      console.log(`  SKIP ${name} — already converted`);
      mobTotalAfter += statSync(outputPath).size;
      mobCount++;
      continue;
    }

    const outSize = await compressImage(jpg, outputPath, MOBILE_WIDTH, MOBILE_QUALITY);
    if (outSize > 0) {
      const reduction = ((1 - outSize / inputSize) * 100).toFixed(0);
      console.log(`  ${name}: ${formatKB(inputSize)}KB → ${formatKB(outSize)}KB WebP (${reduction}%)`);
      mobTotalBefore += inputSize;
      mobTotalAfter += outSize;
      mobCount++;
    }
  }

  // 2. Convert home hero image
  console.log("\n=== Home hero image ===");
  const homeHeroJpg = resolve(PUBLIC, "assets/home/hero-futuristic.jpg");
  if (existsSync(homeHeroJpg)) {
    const homeHeroWebP = resolve(PUBLIC, "assets/home/hero-futuristic.webp");
    const inSize = statSync(homeHeroJpg).size;
    const outSize = await compressImage(homeHeroJpg, homeHeroWebP, 1920, 85);
    if (outSize > 0) {
      console.log(`  hero-futuristic.jpg: ${formatKB(inSize)}KB → ${formatKB(outSize)}KB WebP`);
    }
  }

  // Summary
  console.log("\n========================================");
  console.log("SUMMARY:");
  console.log(`  Optimized: ${optCount} images | ${formatKB(optTotalBefore)}KB → ${formatKB(optTotalAfter)}KB WebP`);
  console.log(`  Mobile:    ${mobCount} images | ${formatKB(mobTotalBefore)}KB → ${formatKB(mobTotalAfter)}KB WebP`);
  console.log(`  Total WebP savings: ${formatKB(optTotalBefore + mobTotalBefore - optTotalAfter - mobTotalAfter)}KB`);
  console.log(`\n  Don't forget to run the cleanup step to remove old JPG files!`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
