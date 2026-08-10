import { cn } from "@/lib/cn";

export type WebGLFallbackProps = {
  className?: string;
};

export function WebGLFallback({ className }: WebGLFallbackProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("experience-fallback", className)}
      data-experience-fallback="true"
    >
      <div className="experience-fallback__field">
        {Array.from({ length: 5 }, (_, index) => (
          <span className="experience-fallback__rail" key={index} />
        ))}
      </div>
      <div className="experience-fallback__modules">
        {Array.from({ length: 10 }, (_, index) => (
          <span className="experience-fallback__module" key={index} />
        ))}
      </div>
      <div className="experience-fallback__signals">
        {Array.from({ length: 3 }, (_, index) => (
          <span className="experience-fallback__signal" key={index} />
        ))}
      </div>
      <div className="experience-fallback__focus">
        <span />
        <span />
      </div>
    </div>
  );
}
