export function ServiceIcon({ icon }: { icon: string }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (icon) {
    case "code":
      return (
        <svg {...common}>
          <path d="M8 6 2 12l6 6M16 6l6 6-6 6M14 4l-4 16" />
        </svg>
      );
    case "maintenance":
      return (
        <svg {...common}>
          <path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 1 5.4-5.4l-3-3 2-2a5 5 0 0 1 4 4l-2 2-3-3Z" />
        </svg>
      );
    case "performance":
      return (
        <svg {...common}>
          <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
        </svg>
      );
    case "hourly":
      return (
        <svg {...common}>
          <circle cx="12" cy="13" r="8" />
          <path d="M12 9v4l3 2M9 2h6" />
        </svg>
      );
    default:
      return null;
  }
}
