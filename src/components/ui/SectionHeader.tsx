type SectionHeaderProps = {
  id: string;
  title: string;
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeader({
  id,
  title,
  as: Heading = "h2",
  className = "",
}: SectionHeaderProps) {
  return (
    <header>
      <Heading
        className={`text-headline font-semibold tracking-headline ${className}`.trim()}
        id={id}
      >
        {title}
      </Heading>
    </header>
  );
}
