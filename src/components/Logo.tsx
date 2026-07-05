export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="Havenkvist Tech"
    >
      <rect width="32" height="32" rx="8" fill="#2563eb" />
      <path
        d="M11 8v16M21 8v16M11 16h10"
        stroke="#ffffff"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <rect x="14.5" y="14.3" width="3" height="3.4" fill="#93c5fd" />
    </svg>
  );
}
