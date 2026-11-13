export function LogoMark({ className = "size-8", inverse = false }: { className?: string; inverse?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden focusable="false">
      <rect width="64" height="64" rx="14" fill={inverse ? "#f7f9f8" : "#06525c"} />
      <path d="M16 14h9v27h23v9H16z" fill={inverse ? "#06525c" : "#fff"} />
      <rect x="38" y="14" width="10" height="10" rx="2" fill="#f6bd1f" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark className="size-7" />
      <span className="font-display text-xl tracking-tight text-ink">TrueSquare</span>
    </span>
  );
}
