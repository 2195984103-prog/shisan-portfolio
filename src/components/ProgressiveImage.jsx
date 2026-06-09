import { useState, useRef, useEffect } from "react";

/**
 * Image that fades in after loading.
 * Shows a dark placeholder until the full image is ready.
 * Uses IntersectionObserver to defer off-screen images.
 */
export default function ProgressiveImage({
  src,
  srcSet,
  sizes,
  alt,
  className = "",
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  onError,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(loading !== "lazy");
  const imgRef = useRef(null);

  useEffect(() => {
    if (loading !== "lazy") return;
    const el = imgRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [loading]);

  return (
    <img
      ref={imgRef}
      src={inView ? src : undefined}
      srcSet={inView ? srcSet : undefined}
      sizes={sizes}
      alt={alt}
      loading={loading}
      decoding={decoding}
      fetchpriority={fetchPriority}
      onLoad={() => setLoaded(true)}
      onError={onError}
      className={`progressive-img ${loaded ? "img-loaded" : "img-loading"} ${className}`}
      {...rest}
    />
  );
}
