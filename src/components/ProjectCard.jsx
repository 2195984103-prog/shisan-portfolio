import { Link } from "react-router-dom";
import { projectImageSrcSet, projectGallerySrc } from "../utils/assets.js";
import LazyImage from "./LazyImage.jsx";

export default function ProjectCard({ project, large = false }) {
  return (
    <Link
      to={`/project/${project.id}`}
      className="focus-ring group block rounded-[18px]"
      aria-label={`查看项目 ${project.title}`}
    >
      <div className="media-frame reveal-media" data-reveal>
        <LazyImage
          src={project.coverImage}
          srcSet={projectImageSrcSet(project.coverImage)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder={projectGallerySrc(project.coverImage)}
          alt={project.title}
          className={[
            "image-hover w-full object-cover",
            "aspect-[16/9]",
          ].join(" ")}
        />
      </div>
      <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-5 sm:gap-6">
        <div className="min-w-0">
          <p className="caption-label">
            {project.brand} / {project.type}
          </p>
          <h3 className="project-card-title mt-4">
            {project.title}
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/60 sm:text-[15px]">
            {project.description}
          </p>
        </div>
        <span className="ui-nowrap rounded-full bg-[rgba(255,255,255,0.07)] px-3 py-1 text-xs text-white/50">
          {project.year}
        </span>
      </div>
    </Link>
  );
}
