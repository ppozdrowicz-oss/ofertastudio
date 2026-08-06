import { CircleAlert, CircleCheck, CircleX, Info, Minus } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/cn";

const variants = {
  error: {
    className: "border-danger-border bg-danger-surface text-danger-foreground",
    icon: CircleX,
  },
  information: {
    className: "border-info-border bg-info-surface text-info-foreground",
    icon: Info,
  },
  neutral: {
    className: "border-border bg-surface-muted text-foreground",
    icon: Minus,
  },
  success: {
    className:
      "border-success-border bg-success-surface text-success-foreground",
    icon: CircleCheck,
  },
  warning: {
    className:
      "border-warning-border bg-warning-surface text-warning-foreground",
    icon: CircleAlert,
  },
} as const;

export type NoticeProps = ComponentPropsWithoutRef<"div"> & {
  title?: string;
  variant?: keyof typeof variants;
};

export function Notice({
  children,
  className,
  title,
  variant = "neutral",
  ...props
}: NoticeProps) {
  const { className: variantClassName, icon: Icon } = variants[variant];

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-[var(--radius-control)] border p-4 text-body-sm",
        variantClassName,
        className,
      )}
      {...props}
    >
      <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
      <div className="min-w-0">
        {title && <p className="font-semibold">{title}</p>}
        <div className={cn(title && "mt-1")}>{children}</div>
      </div>
    </div>
  );
}
