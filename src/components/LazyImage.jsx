import { useRef, useState, useEffect } from "react";

/**
 * Image that only begins loading when it enters the viewport (within rootMargin).
 * This prevents off-screen gallery images from competing with bandwidth for
 * the hero image and above-the-fold content.
 *
 * Uses srcSet + sizes for responsive high-res: desktop → 1800px, mobile → 960px.
 * Image quality is preserved — the browser picks the right resolution for the viewport.
 */
export default function LazyImage({
  src,
  srcSet,
  sizes,
  alt = "",
  className = "",
  ...rest
}) {
  const ref = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          obs.disconnect();
        }
      },
      { rootMargin: "800px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <img
      ref={ref}
      src={shouldLoad ? src : undefined}
      srcSet={shouldLoad ? srcSet : undefined}
      sizes={shouldLoad ? sizes : undefined}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={`${className} ${loaded ? "img-loaded" : ""}`}
      {...rest}
    />
  );
}
