import { Link } from "react-router-dom";
import DisplayTitle from "./DisplayTitle.jsx";

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/category/${category.id}`}
      className="focus-ring surface-panel group min-h-72 p-6 text-white transition duration-300 hover:-translate-y-1 hover:border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.06)] sm:p-8"
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <p className="caption-label transition group-hover:text-white/50">
            {category.label}
          </p>
          <DisplayTitle
            as="h3"
            lines={category.titleLines}
            size="card"
            className="mt-6"
          >
            {category.name}
          </DisplayTitle>
        </div>
        <div>
          <p className="max-w-sm text-sm leading-7 text-white/60 transition group-hover:text-white/70">
            {category.description}
          </p>
          <span className="mt-8 block h-px w-10 bg-[#f26a1b] transition-all duration-300 group-hover:w-16" />
        </div>
      </div>
    </Link>
  );
}
