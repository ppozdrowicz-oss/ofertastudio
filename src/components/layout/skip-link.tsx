export function SkipLink() {
  return (
    <a
      className="transition-interactive pointer-events-none fixed top-3 left-3 z-[var(--layer-skip-link)] -translate-y-16 rounded-[var(--radius-control)] bg-foreground px-4 py-3 text-label font-semibold text-background opacity-0 shadow-overlay focus-visible:pointer-events-auto focus-visible:translate-y-0 focus-visible:opacity-100"
      href="#main-content"
    >
      Przejdź do treści
    </a>
  );
}
