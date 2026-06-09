import { useRef, useState, useEffect } from "react";

/**
 * Viewport-lazy image with optional progressive loading.
 *
 * When `placeholder` is provided:
 *   1. Placeholder loads immediately when the image enters the viewport.
 *   2. The full-resolution src/srcSet is preloaded in background.
 *   3. When the full image is ready, it replaces the placeholder seamlessly.
 *
 * Image quality is preserved — the final render always uses the full src/srcSet.
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
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [failed, setFailed] = useState(false);
  const isPriority = fetchPriority === "high";

  // Viewport detection
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "1000px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // When in view, preload full-res image then swap
  useEffect(() => {
    if (!inView) return;

    if (placeholder && !isPriority) {
      // Progressive: preload full-res in background (warms browser cache)
      // so the DOM <img> loads instantly and CSS opacity transition works.
      const preloader = new Image();
      if (srcSet) {
        preloader.srcset = srcSet;
        if (sizes) preloader.sizes = sizes;
      }
      preloader.src = src;

      const applyFull = () => setShowFull(true);
      preloader.onload = applyFull;
      preloader.onerror = () => setShowFull(true); // try src directly
    } else {
      // Priority or no placeholder: go straight to full
      setShowFull(true);
    }
  }, [inView, placeholder, src, srcSet, sizes, isPriority]);

  if (!inView) {
    return <span ref={ref} className={className} {...rest} />;
  }

  // Placeholder phase
  if ((!showFull && placeholder) || failed) {
    return (
      <img
        ref={ref}
        src={failed ? undefined : placeholder}
        alt={alt}
        decoding="async"
        className={`${className} ${failed ? "img-failed" : ""}`}
        {...rest}
      />
    );
  }

  // Full-resolution phase
  return (
    <img
      ref={ref}
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading={isPriority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={fetchPriority}
      onError={(e) => {
        if (!failed) setFailed(true);
        if (onError) onError(e);
      }}
      className={className}
      {...rest}
    />
  );
}
