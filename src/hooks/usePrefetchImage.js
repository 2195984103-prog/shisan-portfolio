import { useCallback } from "react";

/**
 * Returns an onMouseEnter/onTouchStart handler that prefetches
 * an image so it's cached before the user clicks through.
 * The prefetch is one-shot — it fires only on first interaction.
 */
export default function usePrefetchImage(src) {
  return useCallback(() => {
    if (!src) return;
    // Check if already prefetched
    const existing = document.querySelector(`link[rel="prefetch"][href="${src}"]`);
    if (existing) return;

    const link = document.createElement("link");
    link.rel = "prefetch";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  }, [src]);
}
