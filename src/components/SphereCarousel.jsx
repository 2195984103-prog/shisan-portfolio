import { Link } from "react-router-dom";
import { projectImageSrcSet } from "../utils/assets.js";

const orbitSlots = [
  "sphere-node-1",
  "sphere-node-2",
  "sphere-node-3",
  "sphere-node-4",
  "sphere-node-5",
  "sphere-node-6",
  "sphere-node-7",
  "sphere-node-8",
];

export default function SphereCarousel({ projects }) {
  const heroProjects = projects.slice(0, orbitSlots.length);

  const handleImageError = (event) => {
    if (event.currentTarget.dataset.fallbackUsed) return;
    event.currentTarget.dataset.fallbackUsed = "true";
    event.currentTarget.src = "/assets/projects/dongfeng-lantu-kv/hero.jpg";
  };

  return (
    <section className="sphere-stage" aria-label="作品集首页">
      <div className="sphere-cluster">
        {heroProjects.map((project, index) => (
          <Link
            key={project.id}
            to={`/project/${project.id}`}
            className={`sphere-node ${orbitSlots[index]}`}
            aria-label={`查看项目 ${project.title}`}
          >
            <img
              src={project.coverImage}
              srcSet={projectImageSrcSet(project.coverImage)}
              sizes="(max-width: 640px) 96px, 170px"
              alt=""
              className="sphere-node-image"
              loading={index <= 1 ? "eager" : "lazy"}
              decoding="async"
              onError={handleImageError}
            />
          </Link>
        ))}
      </div>

      <div className="sphere-center-copy">
        <p>
          视觉设计师与 AIGC 内容创作者，
          <br />
          关注品牌视觉、商业落地和内容表达。
        </p>
      </div>

      <div className="sphere-branding">
        <p className="sphere-branding-sub">视觉设计师 / 内容运营</p>
        <h1 className="sphere-branding-title">SHISAN</h1>
      </div>
    </section>
  );
}
