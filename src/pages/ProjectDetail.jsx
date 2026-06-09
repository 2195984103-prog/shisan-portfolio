import { Link, useParams } from "react-router-dom";
import Button from "../components/Button.jsx";
import DisplayTitle from "../components/DisplayTitle.jsx";
import { projects } from "../data/projects.js";
import { projectImageSrcSet } from "../utils/assets.js";

const portraitGalleryProjectIds = new Set([
  "la-mer-aigc-visual",
]);

const brochureGalleryProjectIds = new Set([
  "offline-material-design",
]);

const posterGalleryProjectIds = new Set([
  "composite-poster",
]);

const videoExtensions = new Set(["mp4", "webm", "mov"]);

function isVideoAsset(src) {
  const extension = src.split("?")[0].split(".").pop()?.toLowerCase();
  return videoExtensions.has(extension);
}

export default function ProjectDetail() {
  const { projectId, slug } = useParams();
  const currentId = projectId ?? slug;
  const projectIndex = projects.findIndex((item) => item.id === currentId);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <section className="page-shell section-space pt-32">
        <div className="title-stack">
          <p className="section-label title-eyebrow">Project Not Found</p>
          <DisplayTitle as="h1" size="page" lines={["没有找到", "这个项目"]} />
        </div>
        <p className="type-body title-copy max-w-2xl">
          请检查网址中的项目 ID，或返回作品列表查看全部项目。
        </p>
        <Button to="/work" className="mt-10">
          查看全部作品
        </Button>
      </section>
    );
  }

  const previousProject =
    projectIndex > 0 ? projects[projectIndex - 1] : projects[projects.length - 1];
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : projects[0];
  const usesPortraitGallery = portraitGalleryProjectIds.has(project.id);
  const usesBrochureGallery = brochureGalleryProjectIds.has(project.id);
  const usesPosterGallery = posterGalleryProjectIds.has(project.id);

  return (
    <article className="bg-[#080808]">
      <section className="project-hero">
        <img
          src={project.heroImage || project.coverImage}
          srcSet={projectImageSrcSet(project.heroImage || project.coverImage)}
          sizes="100vw"
          alt={project.title}
          className="project-hero-image"
          decoding="async"
          fetchPriority="high"
        />
        <div className="project-hero-shade" />
        <div className="project-hero-blur" />

        <div className="page-shell project-hero-content">
          <div className="project-hero-copy">
            <p className="project-hero-label">
              {project.categoryName} / {project.year}
            </p>
            <DisplayTitle
              as="h1"
              lines={project.titleLines}
              size="hero"
              className="project-hero-title"
            >
              {project.title}
            </DisplayTitle>
            <p className="project-hero-description">
              {project.description}
            </p>
          </div>

          <div className="project-meta-strip hero-meta-strip">
            <InfoItem value={project.categoryName} />
            <InfoItem value={project.type} />
            <InfoItem value={project.brand} />
            <InfoItem value={project.year} />
            <InfoItem value={project.role} />
            <InfoItem value={project.tools.join(" / ")} />
          </div>
        </div>
      </section>

      {project.images?.length > 0 && (
        <section className="project-gallery-section bg-[#111111]">
          <div className="page-shell section-space">
            <div className="mb-12 grid gap-8 sm:mb-16 lg:grid-cols-[0.68fr_1.32fr]">
              <div>
                <p className="section-label">Visual Gallery</p>
                <DisplayTitle
                  as="h2"
                  size="card"
                  lines={["项目图片展示"]}
                  className="mt-6"
                />
              </div>
              <p className="type-body max-w-2xl lg:pt-10">
                精选项目中的关键画面，用来呈现创意方向、视觉细节和最终输出效果。
              </p>
            </div>

            <div
              className={[
                "project-gallery",
                usesPortraitGallery ? "project-gallery-portrait" : "",
                usesBrochureGallery ? "project-gallery-brochure" : "",
                usesPosterGallery ? "project-gallery-poster" : "",
              ].join(" ")}
            >
              {project.images.map((image, index) => {
                const isVideo = isVideoAsset(image);

                return (
                  <figure
                    key={image}
                    className={[
                      "gallery-item reveal-media",
                      usesPortraitGallery ? "gallery-item-portrait" : "",
                      usesBrochureGallery ? "gallery-item-brochure" : "",
                      usesPosterGallery ? "gallery-item-poster" : "",
                    ].join(" ")}
                    data-reveal
                  >
                    {isVideo ? (
                      <video
                        src={image}
                        className="h-full w-full object-cover"
                        controls
                        playsInline
                        preload="none"
                        poster={project.coverImage}
                        aria-label={`${project.title} 项目展示视频 ${index + 1}`}
                      />
                    ) : (
                      <img
                        src={image}
                        srcSet={projectImageSrcSet(image)}
                        sizes={
                          usesPosterGallery
                            ? "(max-width: 640px) 100vw, 25vw"
                            : usesPortraitGallery
                              ? "(max-width: 640px) 100vw, 50vw"
                              : "100vw"
                        }
                        alt={`${project.title} 项目展示图 ${index + 1}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    <figcaption>
                      {String(index + 1).padStart(2, "0")}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="page-shell section-space">
        <div className="grid gap-10 lg:grid-cols-[0.68fr_1.32fr]">
          <p className="section-label">Background</p>
          <div>
            <p className="type-lede max-w-4xl">
              {project.background}
            </p>
          </div>
        </div>
      </section>

      <section className="page-shell pb-20 sm:pb-28 lg:pb-36">
        <div className="grid gap-10 border-t border-[rgba(255,255,255,0.11)] pt-14 lg:grid-cols-[0.68fr_1.32fr]">
          <div>
            <p className="section-label">Responsibilities</p>
            <DisplayTitle
              as="h2"
              size="card"
              lines={["我的工作内容"]}
              className="mt-6"
            />
          </div>
          <ol className="responsibility-path">
            {project.responsibilities.map((item, index) => (
              <li
                key={index}
                className="path-step"
              >
                <span className="path-marker">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="path-card">
                  <p className="path-kicker">
                    Step {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="path-text">
                    {item}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#080808] text-white">
        <div className="page-shell grid gap-4 py-5 sm:grid-cols-2 lg:gap-5">
          <ProjectNavLink label="Previous Project" project={previousProject} />
          <ProjectNavLink label="Next Project" project={nextProject} alignRight />
        </div>
      </section>
    </article>
  );
}

function InfoItem({ value }) {
  return (
    <div className="project-meta-item">
      <p className="project-meta-value">{value}</p>
    </div>
  );
}

function ProjectNavLink({ label, project, alignRight = false }) {
  return (
    <Link
      to={`/project/${project.id}`}
      className={[
        "focus-ring group block rounded-[18px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.06)] px-5 py-9 transition duration-300 hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.1)] sm:px-8 lg:px-10",
        alignRight ? "sm:text-right" : "",
      ].join(" ")}
    >
      <p className="caption-label text-white/50 transition group-hover:text-white/70">
        {label}
      </p>
      <DisplayTitle
        as="h2"
        size="card"
        lines={project.titleLines}
        className="mt-5"
      >
        {project.title}
      </DisplayTitle>
      <p className="mt-3 text-sm text-white/60 group-hover:text-white/80">
        {project.brand} / {project.type}
      </p>
    </Link>
  );
}
