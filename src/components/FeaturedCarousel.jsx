import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { projectImageSrcSet } from "../utils/assets.js";

const AUTOPLAY_INTERVAL = 5000;

function getSlideState(index, activeIndex, total) {
  if (total <= 1) return "active";
  if (index === activeIndex) return "active";
  if (index === (activeIndex - 1 + total) % total) return "prev";
  if (index === (activeIndex + 1) % total) return "next";
  return "hidden";
}

const ArrowLeft = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function FeaturedCarousel({ projects }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchRef = useRef({ start: null, delta: 0 });
  const total = projects.length;

  const goTo = useCallback(
    (index) => setActiveIndex(((index % total) + total) % total),
    [total],
  );

  const showPrevious = () => goTo(activeIndex - 1);
  const showNext = () => goTo(activeIndex + 1);

  // Autoplay
  useEffect(() => {
    if (total <= 1 || isPaused) return;
    const timer = setInterval(showNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [activeIndex, isPaused, total]);

  if (!total) return null;

  const handleTouchStart = (event) => {
    touchRef.current = { start: event.touches[0].clientX, delta: 0 };
  };

  const handleTouchMove = (event) => {
    if (touchRef.current.start === null) return;
    touchRef.current.delta = touchRef.current.start - event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const { delta } = touchRef.current;
    if (Math.abs(delta) > 40) {
      if (delta > 0) showNext();
      else showPrevious();
    }
    touchRef.current = { start: null, delta: 0 };
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") showPrevious();
    else if (event.key === "ArrowRight") showNext();
  };

  const handleImageError = (event) => {
    const img = event.currentTarget;
    if (img.dataset.fallbackUsed) return;
    img.dataset.fallbackUsed = "true";
    // Try the cover image as fallback, or a known working hero
    const fallback = img.dataset.fallbackSrc || "/assets/projects/dongfeng-lantu-kv/hero.jpg";
    img.src = fallback;
  };

  return (
    <div
      className="featured-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="精选项目轮播"
      aria-roledescription="carousel"
    >
      <button
        type="button"
        className="featured-carousel-button featured-carousel-button-prev"
        onClick={showPrevious}
        aria-label="上一个精选项目"
      >
        <ArrowLeft />
      </button>

      <div className="featured-carousel-stage">
        {projects.map((project, index) => {
          const slideState = getSlideState(index, activeIndex, total);
          const slideImage = project.heroImage || project.coverImage;

          return (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className={`featured-slide featured-slide-${slideState}`}
              aria-label={`查看项目 ${project.title}`}
              aria-hidden={slideState === "hidden"}
              aria-roledescription="slide"
              tabIndex={slideState === "active" ? 0 : -1}
            >
              <img
                src={slideImage}
                srcSet={projectImageSrcSet(slideImage)}
                sizes="(max-width: 640px) 86vw, 78vw"
                alt={project.title}
                className="featured-slide-image"
                loading={index === activeIndex ? "eager" : "lazy"}
                decoding="async"
                data-fallback-src={project.coverImage !== slideImage ? project.coverImage : undefined}
                onError={handleImageError}
              />
              <div className="featured-slide-shade" />
              <div className="featured-slide-caption">
                <p>{project.brand} / {project.type}</p>
                <h3>
                  {(project.titleLines ?? [project.title]).map((line, i) => (
                    <span key={i} className="title-line">{line}</span>
                  ))}
                </h3>
                <span>{project.year}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <button
        type="button"
        className="featured-carousel-button featured-carousel-button-next"
        onClick={showNext}
        aria-label="下一个精选项目"
      >
        <ArrowRight />
      </button>

      <div className="featured-carousel-dots" role="tablist" aria-label="项目导航">
        {projects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            role="tab"
            className={index === activeIndex ? "is-active" : ""}
            onClick={() => goTo(index)}
            aria-label={`${project.title}（第 ${index + 1} 页）`}
            aria-selected={index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}
