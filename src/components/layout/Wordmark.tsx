import { brand } from "@/content/site";

export function Wordmark() {
  return (
    <span className="wordmark">
      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" aria-hidden="true">
        <path d="M1 9V1h8M16 1h8v8M24 16v8h-8M9 24H1v-8" stroke="currentColor" strokeWidth="2" />
        <circle cx="12.5" cy="12.5" r="3" fill="currentColor" />
      </svg>
      {brand.name}
      <span className="wordmark-suffix">{brand.suffix}</span>
    </span>
  );
}
