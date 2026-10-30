export function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 20 20"
      fill="none"
      focusable="false"
    >
      {diagonal ? (
        <path d="M5.5 14.5 14 6m0 0H7m7 0v7" />
      ) : (
        <path d="M3.5 10h12m0 0-4.5-4.5M15.5 10 11 14.5" />
      )}
    </svg>
  );
}
