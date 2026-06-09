import { useEffect } from "react";
import BrandMarquee from "../components/BrandMarquee.jsx";
import Button from "../components/Button.jsx";
import CategoryCard from "../components/CategoryCard.jsx";
import FeaturedCarousel from "../components/FeaturedCarousel.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import SphereCarousel from "../components/SphereCarousel.jsx";
import { featuredProjects, projectCategories, projects } from "../data/projects.js";

export default function Home() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const hero = document.querySelector(".sphere-stage");
    const motionSections = Array.from(document.querySelectorAll(".motion-section"));

    if (prefersReducedMotion) {
      motionSections.forEach((section) => {
        section.classList.add("is-visible", "is-active");
      });
      if (hero) hero.style.setProperty("--hero-exit", "0");
      return undefined;
    }

    let frameId = null;

    const clamp = (value) => Math.min(Math.max(value, 0), 1);
    const easeOut = (value) => 1 - Math.pow(1 - value, 3);

    const updateSectionProgress = () => {
      const viewportHeight = window.innerHeight || 1;

      motionSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const rawProgress = (viewportHeight - rect.top) / (viewportHeight + rect.height * 0.62);
        const progress = clamp(rawProgress);
        const midpoint = rect.top + rect.height * 0.5;
        const distanceFromCenter = Math.abs(midpoint - viewportHeight * 0.52);
        const focus = clamp(1 - distanceFromCenter / (viewportHeight * 0.78));
        const easedFocus = easeOut(focus);

        section.style.setProperty("--scene-progress", progress.toFixed(4));
        section.style.setProperty("--scene-focus", easedFocus.toFixed(4));
        section.style.setProperty("--scene-enter-y", `${((1 - easedFocus) * 74).toFixed(2)}px`);
        section.style.setProperty("--scene-exit-y", `${(progress * -24).toFixed(2)}px`);

        if (section.classList.contains("motion-brands")) {
          section.style.setProperty("--marquee-duration", `${(36 - easedFocus * 16).toFixed(2)}s`);
        }
      });
    };

    const updateHeroProgress = () => {
      frameId = null;
      if (!hero) return;

      const heroRect = hero.getBoundingClientRect();
      const heroHeight = Math.max(heroRect.height, 1);
      const progress = clamp(-heroRect.top / heroHeight);
      const easedProgress = easeOut(progress);
      hero.style.setProperty("--hero-exit", progress.toFixed(4));
      hero.style.setProperty("--hero-gradient-opacity", (0.35 + easedProgress * 0.65).toFixed(3));
      hero.style.setProperty("--hero-cluster-opacity", (1 - easedProgress * 0.78).toFixed(3));
      hero.style.setProperty("--hero-cluster-y", `${(easedProgress * 124).toFixed(2)}px`);
      hero.style.setProperty("--hero-cluster-scale", (1 - easedProgress * 0.22).toFixed(4));
      hero.style.setProperty("--hero-cluster-blur", `${(easedProgress * 8).toFixed(2)}px`);
      hero.style.setProperty("--hero-copy-opacity", (1 - easedProgress * 0.82).toFixed(3));
      hero.style.setProperty("--hero-copy-y", `${(easedProgress * -64).toFixed(2)}px`);
      hero.style.setProperty("--hero-brand-opacity", (1 - easedProgress * 0.86).toFixed(3));
      hero.style.setProperty("--hero-brand-y", `${(easedProgress * 68).toFixed(2)}px`);
      updateSectionProgress();
    };

    const scheduleHeroUpdate = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateHeroProgress);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (entry.intersectionRatio > 0.36) {
              entry.target.classList.add("is-active");
            }
          } else {
            entry.target.classList.remove("is-active");
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: [0, 0.18, 0.36, 0.62],
      },
    );

    motionSections.forEach((section) => observer.observe(section));
    updateHeroProgress();
    window.addEventListener("scroll", scheduleHeroUpdate, { passive: true });
    window.addEventListener("resize", scheduleHeroUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleHeroUpdate);
      window.removeEventListener("resize", scheduleHeroUpdate);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="home-page">
      {/* ── Intro loader (same as before) ── */}
      <div className="home-intro" aria-hidden="true">
        <div className="home-loader">
          <div className="home-loader-top">
            <span>SHISAN PORTFOLIO</span>
            <span>READY</span>
          </div>
          <strong>100%</strong>
          <div className="home-loader-line">
            <span />
          </div>
          <p>Loading selected visual works</p>
          <div className="home-loader-marquee">
            <span>KV DESIGN / AIGC VISUAL / COMPOSITE POSTER / BRAND CONTENT / </span>
            <span>KV DESIGN / AIGC VISUAL / COMPOSITE POSTER / BRAND CONTENT / </span>
          </div>
        </div>
      </div>

      {/* ── Sphere Carousel Hero ── */}
      <SphereCarousel projects={projects} />

      {/* ── Content below the sphere ── */}
      <div className="home-content">
        {/* Selected Works */}
        <section id="selected-works" className="section-space motion-section motion-selected">
          <div className="page-shell">
            <SectionTitle
              label="Selected Works"
              title="精选项目"
              titleLines={["精选项目"]}
            />
            <FeaturedCarousel projects={featuredProjects} />
          </div>
        </section>

        {/* Categories */}
        <section className="section-space bg-black/20 motion-section motion-categories">
          <div className="page-shell">
            <SectionTitle
              label="Work Categories"
              title="项目分类"
              titleLines={["项目分类"]}
            />
            <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
              {projectCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        <BrandMarquee />

        {/* Contact */}
        <section id="contact" className="section-space text-white motion-section motion-contact">
          <div className="page-shell">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <SectionTitle
                  label="Contact"
                  title="合作联系"
                  titleLines={["合作联系"]}
                  dark
                  className="mb-0"
                />
              </div>
              <div className="grid gap-4 text-white/70 sm:grid-cols-2 lg:gap-5">
                <div className="surface-panel-light p-6 sm:p-7">
                  <p className="caption-label text-white/40">Email</p>
                  <a
                    href="mailto:2195984103@qq.com"
                    className="mt-4 block text-xl text-white hover:text-[#f26a1b]"
                  >
                    2195984103@qq.com
                  </a>
                </div>
                <div className="surface-panel-light p-6 sm:p-7">
                  <p className="caption-label text-white/40">Phone</p>
                  <a
                    href="tel:+8618645218853"
                    className="mt-4 block text-xl text-white hover:text-[#f26a1b]"
                  >
                    +86 18645218853
                  </a>
                </div>
                <div className="flex flex-wrap gap-3 pt-2 sm:col-span-2">
                  <Button
                    href="/assets/resume/zhu-sirui-visual-design-resume.pdf"
                    variant="light"
                    download="朱思睿-视觉设计简历.pdf"
                  >
                    视觉设计简历
                  </Button>
                  <Button
                    href="/assets/resume/zhu-sirui-content-operations-resume.pdf"
                    variant="light"
                    download="朱思睿-内容运营简历.pdf"
                  >
                    内容运营简历
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
