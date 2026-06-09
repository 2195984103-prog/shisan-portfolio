import DisplayTitle from "./DisplayTitle.jsx";

export default function SectionTitle({
  label,
  title,
  titleLines,
  description,
  action,
  dark = false,
  className = "",
}) {
  return (
    <div
      className={[
        "mb-14 flex flex-col gap-8 sm:mb-20 lg:flex-row lg:items-end lg:justify-between",
        className,
      ].join(" ")}
    >
      <div className="title-stack max-w-4xl">
        {label && (
          <p
            className={
              dark
                ? "section-label title-eyebrow text-white/50"
                : "section-label title-eyebrow"
            }
          >
            {label}
          </p>
        )}
        <DisplayTitle as="h2" lines={titleLines} size="section">
          {title}
        </DisplayTitle>
        {description && (
          <p
            className={
              dark
                ? "type-body title-copy max-w-2xl text-white/60"
                : "type-body title-copy max-w-2xl"
            }
          >
            {description}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}
