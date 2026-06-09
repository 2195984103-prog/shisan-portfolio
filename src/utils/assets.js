export function mobileProjectAsset(path) {
  if (!path || !/\.(jpe?g|webp)$/i.test(path)) return undefined;
  return path.replace("/assets/optimized/projects/", "/assets/mobile/projects/");
}

export function projectImageSrcSet(path) {
  const mobilePath = mobileProjectAsset(path);
  if (!mobilePath || mobilePath === path) return undefined;
  return `${mobilePath} 960w, ${path} 1800w`;
}
