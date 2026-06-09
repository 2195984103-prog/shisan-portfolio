import { spawnSync } from "child_process";
import { existsSync, statSync, renameSync, unlinkSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");
const PUBLIC = resolve(PROJECT_ROOT, "public");

// Videos to compress: [relative-path-in-public, crf-value]
// Lower CRF = higher quality, bigger file. 23-28 is good range.
const VIDEOS = [
  ["assets/projects/la-mer-aigc-visual/01.mp4", 28],
  ["assets/projects/aizhongcao-ip-aigc/01.mp4", 26],
  ["assets/home/hero-video.mp4", 26],
];

async function findFfmpeg() {
  try {
    const ffmpegPath = await import("ffmpeg-static").then((m) => m.default);
    if (ffmpegPath && existsSync(ffmpegPath)) return ffmpegPath;
  } catch { /* fall through */ }
  throw new Error("ffmpeg not found");
}

function formatMB(bytes) {
  return (bytes / 1024 / 1024).toFixed(1);
}

async function main() {
  const ffmpegBin = await findFfmpeg();
  console.log(`Using ffmpeg: ${ffmpegBin}\n`);

  for (const [relPath, crf] of VIDEOS) {
    const inputPath = resolve(PUBLIC, relPath);
    const outputPath = inputPath.replace(/\.(mp4|webm|mov)$/, "_compressed.$1");

    if (!existsSync(inputPath)) {
      console.log(`SKIP ${relPath} — file not found`);
      continue;
    }

    const inputSizeMB = formatMB(statSync(inputPath).size);
    console.log(`Compressing: ${relPath}`);
    console.log(`  Input:  ${inputSizeMB} MB | CRF: ${crf}`);

    const result = spawnSync(ffmpegBin, [
      "-i", inputPath,
      "-c:v", "libx264",
      "-crf", String(crf),
      "-preset", "medium",
      "-movflags", "+faststart",
      "-pix_fmt", "yuv420p",
      "-an",
      "-y",
      outputPath,
    ], {
      stdio: "pipe",
      timeout: 180_000,
    });

    if (result.status !== 0) {
      const stderr = result.stderr.toString();
      console.error(`  ✗ Failed (exit ${result.status})`);
      console.error(`  ${stderr.split("\n").slice(-3).join("\n")}`);
      if (existsSync(outputPath)) unlinkSync(outputPath);
      continue;
    }

    const outputSizeMB = formatMB(statSync(outputPath).size);
    const reduction = ((1 - statSync(outputPath).size / statSync(inputPath).size) * 100).toFixed(0);
    console.log(`  Output: ${outputSizeMB} MB (${reduction}% smaller)`);

    // Replace original with compressed
    const backupPath = inputPath.replace(/\.(mp4)$/, "_backup.$1");
    renameSync(inputPath, backupPath);
    renameSync(outputPath, inputPath);
    console.log(`  ✓ Done. Original → *_backup.mp4\n`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
