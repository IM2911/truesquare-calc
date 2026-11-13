export function LogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden focusable="false">
      <rect width="64" height="64" rx="14" fill="#115473" />
      <path d="M16 14h9v27h23v9H16z" fill="#fff" />
      <rect x="38" y="14" width="10" height="10" rx="2" fill="#f6bd1f" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark />
      <span className="font-display text-lg font-extrabold tracking-tight text-ink">
        True<span className="text-brand-700">Square</span>
      </span>
    </span>
  );
}
