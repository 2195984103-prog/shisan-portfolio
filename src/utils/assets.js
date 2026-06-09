export function mobileProjectAsset(path) {
  if (!path || !/\.(jpe?g|webp)$/i.test(path)) return undefined;
  return path.replace("/assets/optimized/projects/", "/assets/mobile/projects/");
}

export function projectImageSrcSet(path) {
  const mobilePath = mobileProjectAsset(path);
  if (!mobilePath || mobilePath === path) return undefined;
  return `${mobilePath} 960w, ${path} 1800w`;
}

/**
 * Gallery thumbnail path: rewrites an optimized (1800px) image path
 * to its 600px thumbnail equivalent. Videos pass through unchanged.
 */
export function projectGallerySrc(path) {
  if (!path || /\.(mp4|webm|mov)$/i.test(path)) return path;
  return path.replace("/assets/optimized/projects/", "/assets/thumbs/projects/");
}
