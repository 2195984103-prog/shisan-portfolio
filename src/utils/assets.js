export function mobileProjectAsset(path) {
  if (!path || !/\.(jpe?g|webp)$/i.test(path)) return undefined;
  return path.replace("/assets/optimized/projects/", "/assets/mobile/projects/");
}

export function desktopProjectAsset(path) {
  if (!path || !/\.(jpe?g|webp)$/i.test(path)) return undefined;
  return path.replace("/assets/optimized/projects/", "/assets/desktop/projects/");
}

export function projectImageSrcSet(path) {
  const mobilePath = mobileProjectAsset(path);
  const desktopPath = desktopProjectAsset(path);
  if (!mobilePath || !desktopPath || mobilePath === path) return undefined;
  return `${mobilePath} 960w, ${desktopPath} 1200w, ${path} 1800w`;
}

/**
 * Tight srcSet for tiny display contexts (e.g. 170px sphere nodes).
 * Thumbnail 600w is more than enough for 2x retina here.
 */
export function projectImageSrcSetCompact(path) {
  const thumbPath = projectGallerySrc(path);
  const mobilePath = mobileProjectAsset(path);
  if (!thumbPath || !mobilePath) return undefined;
  return `${thumbPath} 600w, ${mobilePath} 960w`;
}

/**
 * Gallery thumbnail path: rewrites an optimized (1800px) image path
 * to its 600px thumbnail equivalent. Videos pass through unchanged.
 */
export function projectGallerySrc(path) {
  if (!path || /\.(mp4|webm|mov)$/i.test(path)) return path;
  return path.replace("/assets/optimized/projects/", "/assets/thumbs/projects/");
}
