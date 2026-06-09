const sizeClass = {
  hero: "type-hero",
  page: "type-page-title",
  section: "type-section-title",
  card: "type-card-title",
};

export default function DisplayTitle({
  as: Tag = "h2",
  lines,
  children,
  size = "section",
  className = "",
}) {
  const titleLines = lines?.length ? lines : [children];

  return (
    <Tag className={[sizeClass[size] ?? sizeClass.section, className].join(" ")}>
      {titleLines.map((line, i) => (
        <span key={i} className="title-line">
          {line}
        </span>
      ))}
    </Tag>
  );
}
