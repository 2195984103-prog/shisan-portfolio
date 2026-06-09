import { useParams } from "react-router-dom";
import Button from "../components/Button.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import { featuredProjects, projects } from "../data/projects.js";

const categoryLabels = {
  automotive: "汽车广告",
  aigc: "AIGC视觉设计",
  ui: "其他内容",
};

const titleLines = {
  automotive: ["汽车广告"],
  aigc: ["AIGC视觉设计"],
  ui: ["其他内容"],
};

export default function Work() {
  const { category } = useParams();
  const filteredProjects = category
    ? projects.filter((project) => project.category === category)
    : projects;
  const title = category ? categoryLabels[category] ?? "项目作品" : "项目作品";

  return (
    <section className="bg-[#080808]">
      <div className="page-shell section-space pt-32">
        <SectionTitle
          label="Work"
          title={title}
          titleLines={category ? titleLines[category] ?? ["项目作品"] : ["项目作品"]}
          description={
            category
              ? "按项目类型整理作品，方便快速查看同一方向下的视觉表达和执行方式。"
              : "收录汽车广告、AIGC 视觉和其他商业视觉项目，呈现从概念、画面到落地输出的完整过程。"
          }
          action={category && <Button to="/work" variant="text">全部作品</Button>}
        />
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} large={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
