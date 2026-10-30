type SectionHeadingProps = {
  id: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  id,
  title,
  description,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`section-heading ${className}`.trim()}>
      <h2 id={id}>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
