import { useRef, useState, useEffect } from "react";

/**
 * Image that only begins loading when it enters the viewport (within rootMargin).
 * This prevents off-screen gallery images from competing for bandwidth with
 * the hero image and above-the-fold content.
 */
export default function LazyImage({ src, alt = "", className = "", ...rest }) {
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
      { rootMargin: "800px" } // Start loading when within 800px of viewport
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <img
      ref={ref}
      src={shouldLoad ? src : undefined}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={() => setLoaded(true)}
      className={`${className} ${loaded ? "img-loaded" : ""}`}
      {...rest}
    />
  );
}
