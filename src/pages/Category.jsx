import { useParams } from "react-router-dom";
import Button from "../components/Button.jsx";
import DisplayTitle from "../components/DisplayTitle.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import { projectCategories, projects } from "../data/projects.js";

export default function Category() {
  const { categoryId } = useParams();
  const category = projectCategories.find((item) => item.id === categoryId);

  if (!category) {
    return (
      <section className="page-shell section-space pt-32">
        <div className="title-stack">
          <p className="section-label title-eyebrow">Category Not Found</p>
          <DisplayTitle as="h1" size="page" lines={["没有找到", "这个分类"]} />
        </div>
        <p className="type-body title-copy max-w-2xl">
          请检查网址中的分类名称，或返回作品列表查看全部项目。
        </p>
        <Button to="/work" className="mt-10">
          查看全部作品
        </Button>
      </section>
    );
  }

  const categoryProjects = projects.filter(
    (project) => project.category === category.id,
  );

  return (
    <section className="bg-[#080808] pt-16">
      <div className="page-shell section-space">
        <div className="grid gap-10 border-b border-[rgba(255,255,255,0.11)] pb-14 lg:grid-cols-[0.75fr_1.25fr] lg:pb-20">
          <div className="title-stack">
            <p className="section-label title-eyebrow">{category.label}</p>
            <DisplayTitle
              as="h1"
              lines={category.titleLines}
              size="page"
            >
              {category.name}
            </DisplayTitle>
          </div>
          <div className="flex items-end">
            <p className="type-lede max-w-3xl">
              {category.description}
            </p>
          </div>
        </div>

        {categoryProjects.length > 0 ? (
          <div className="grid gap-x-8 gap-y-16 pt-14 md:grid-cols-2 lg:pt-20">
            {categoryProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="mt-14 border border-[rgba(255,255,255,0.11)] bg-[#111111] p-8 sm:p-10">
            <SectionTitle
              label="Empty"
              title="当前分类还没有项目"
              titleLines={["当前分类", "还没有项目"]}
              description={`这个分类还在整理中，后续加入 ${category.name} 相关项目后会继续补充。`}
              className="mb-0"
            />
          </div>
        )}
      </div>
    </section>
  );
}
