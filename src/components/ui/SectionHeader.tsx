type SectionHeaderProps = {
  id: string;
  title: string;
  description?: string;
  eyebrow?: string;
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeader({
  id,
  title,
  description,
  eyebrow,
  as: Heading = "h2",
  className = "",
}: SectionHeaderProps) {
  return (
    <header className="max-w-[45rem]">
      {eyebrow ? (
        <p className="mb-[var(--space-3)] text-small font-medium uppercase tracking-eyebrow text-primary">
          {eyebrow}
        </p>
      ) : null}
      <Heading
        className={`text-headline font-semibold tracking-headline ${className}`.trim()}
        id={id}
      >
        {title}
      </Heading>
      {description ? (
        <p className="mt-[var(--space-4)] max-w-[38rem] text-lead text-muted-fg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
