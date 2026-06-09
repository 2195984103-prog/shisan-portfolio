import sharp from "sharp";
import { existsSync, readdirSync, statSync, mkdirSync } from "fs";
import { resolve, join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, "..", "public");
const OPTIMIZED = resolve(PUBLIC, "assets/optimized/projects");
const THUMBS = resolve(PUBLIC, "assets/thumbs/projects");

// Gallery images are displayed at 300-600px. 600px with q78 is crisp enough.
const THUMB_WIDTH = 600;
const THUMB_QUALITY = 78;

function formatKB(bytes) {
  return (bytes / 1024).toFixed(0);
}

async function main() {
  const projects = readdirSync(OPTIMIZED).filter((d) => {
    const full = join(OPTIMIZED, d);
    return statSync(full).isDirectory();
  });

  let totalBefore = 0;
  let totalAfter = 0;
  let count = 0;

  for (const project of projects) {
    const srcDir = join(OPTIMIZED, project);
    const outDir = join(THUMBS, project);
    mkdirSync(outDir, { recursive: true });

    const files = readdirSync(srcDir).filter(
      (f) => /\.webp$/i.test(f)
    );

    for (const file of files) {
      const src = join(srcDir, file);
      const inSize = statSync(src).size;

      // Check if thumb already exists and is newer
      const dest = join(outDir, file);
      if (existsSync(dest) && statSync(dest).mtime > statSync(src).mtime) {
        totalBefore += inSize;
        totalAfter += statSync(dest).size;
        count++;
        continue;
      }

      try {
        await sharp(src)
          .resize(THUMB_WIDTH, null, { withoutEnlargement: true, fit: "inside" })
          .webp({ quality: THUMB_QUALITY, effort: 6 })
          .toFile(dest);

        const outSize = statSync(dest).size;
        const reduction = ((1 - outSize / inSize) * 100).toFixed(0);
        console.log(
          `${project}/${file}: ${formatKB(inSize)}KB → ${formatKB(outSize)}KB (${reduction}%)`
        );
        totalBefore += inSize;
        totalAfter += outSize;
        count++;
      } catch (err) {
        console.error(`  ✗ ${project}/${file}: ${err.message}`);
      }
    }
  }

  console.log(`\nDone. ${count} gallery thumbnails generated.`);
  console.log(`Total: ${formatKB(totalBefore)}KB → ${formatKB(totalAfter)}KB`);
  console.log(`Saved: ${formatKB(totalBefore - totalAfter)}KB (${((1 - totalAfter / totalBefore) * 100).toFixed(0)}%)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
