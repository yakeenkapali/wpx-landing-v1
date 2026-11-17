type AvatarProps = { initials: string };

export function Avatar({ initials }: AvatarProps) {
  return (
    <span aria-hidden="true" className="avatar">
      {initials}
    </span>
  );
}
