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
      <div className="experience-fallback__modules">
        {Array.from({ length: 8 }, (_, index) => (
          <span className="experience-fallback__module" key={index} />
        ))}
      </div>
    </div>
  );
}
