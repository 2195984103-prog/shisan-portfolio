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
  className = "",
  ...rest
}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [loaded, setLoaded] = useState(false);

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
      { rootMargin: "300px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // When in view, preload full-res image then swap
  useEffect(() => {
    if (!inView) return;

    if (placeholder) {
      // Preload full-res in background
      const preloader = new Image();
      if (srcSet) {
        preloader.srcset = srcSet;
        if (sizes) preloader.sizes = sizes;
      }
      preloader.src = src;

      const applyFull = () => setShowFull(true);
      preloader.onload = applyFull;
      preloader.onerror = applyFull; // swap even on error to try src directly
    } else {
      setShowFull(true);
    }
  }, [inView, placeholder, src, srcSet, sizes]);

  if (!inView) {
    return <span ref={ref} className={className} {...rest} />;
  }

  // Placeholder phase
  if (!showFull && placeholder) {
    return (
      <img
        ref={ref}
        src={placeholder}
        alt={alt}
        decoding="async"
        className={className}
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
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={`${className} ${loaded ? "img-loaded" : ""}`}
      {...rest}
    />
  );
}
