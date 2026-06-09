import { useRef, useState, useEffect } from "react";

/**
 * Viewport-lazy image with progressive loading.
 *
 * 1. Renders a spacer before the image enters the viewport.
 * 2. Shows a small thumbnail placeholder while the full image preloads.
 * 3. Swaps to the full-resolution image once it's cached.
 * 4. If the full image fails, keeps the placeholder visible.
 */
export default function LazyImage({
  src,
  srcSet,
  sizes,
  placeholder,
  alt = "",
  fetchPriority,
  className = "",
  onError,
  ...rest
}) {
  const placeholderRef = useRef(null);
  const fullRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [useFull, setUseFull] = useState(false);
  const [fullFailed, setFullFailed] = useState(false);
  const isPriority = fetchPriority === "high";

  // Viewport detection
  useEffect(() => {
    const el = placeholderRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "800px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // When in view, preload full-res image
  useEffect(() => {
    if (!inView) return;

    if (isPriority) {
      setUseFull(true);
      return;
    }

    if (placeholder) {
      const preloader = new Image();
      if (srcSet) {
        preloader.srcset = srcSet;
        if (sizes) preloader.sizes = sizes;
      }
      preloader.src = src;
      preloader.onload = () => setUseFull(true);
      preloader.onerror = () => setFullFailed(true);
    } else {
      setUseFull(true);
    }
  }, [inView]);

  // Not in view yet — spacer
  if (!inView) {
    return (
      <span
        ref={placeholderRef}
        className={className}
        style={{ display: "block" }}
        {...rest}
      />
    );
  }

  // Full-res loaded — show it
  if (useFull) {
    return (
      <img
        ref={fullRef}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading="lazy"
        decoding="async"
        fetchPriority={fetchPriority}
        className={className}
        {...rest}
      />
    );
  }

  // Placeholder phase (thumb visible while full loads)
  // or full failed — keep showing placeholder
  return (
    <img
      ref={fullRef}
      src={placeholder || src}
      alt={alt}
      decoding="async"
      className={`${className} ${fullFailed ? "img-failed" : ""}`}
      {...rest}
    />
  );
}
