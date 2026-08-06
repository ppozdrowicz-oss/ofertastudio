import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";

import { cn } from "@/lib/cn";

const variantClassNames = {
  ghost:
    "border-transparent bg-transparent text-foreground hover:bg-surface-strong active:bg-muted",
  link: "min-h-0 border-transparent bg-transparent px-0 py-0 text-primary underline decoration-primary/35 underline-offset-4 hover:text-primary-hover hover:decoration-primary-hover",
  outline:
    "border-border-control bg-surface text-foreground hover:border-foreground hover:bg-surface-muted active:bg-surface-strong",
  primary:
    "border-transparent bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
  secondary:
    "border-secondary-border bg-secondary text-secondary-foreground hover:border-primary-border hover:bg-primary-surface active:bg-primary-border",
} as const;

const sizeClassNames = {
  icon: "size-11 p-0",
  large: "min-h-12 px-6 py-3 text-base",
  medium: "min-h-11 px-5 py-2.5 text-sm",
  small: "min-h-10 px-4 py-2 text-sm",
} as const;

export type ButtonVariant = keyof typeof variantClassNames;
export type ButtonSize = keyof typeof sizeClassNames;

type SharedButtonProps = {
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  size?: ButtonSize;
  trailingIcon?: ReactNode;
  variant?: ButtonVariant;
};

export function buttonStyles({
  className,
  fullWidth = false,
  size = "medium",
  variant = "primary",
}: Pick<SharedButtonProps, "fullWidth" | "size" | "variant"> & {
  className?: string;
} = {}): string {
  return cn(
    "transition-interactive inline-flex shrink-0 items-center justify-center gap-2 rounded-[var(--radius-control)] border font-semibold whitespace-nowrap disabled:cursor-not-allowed disabled:border-disabled-border disabled:bg-disabled disabled:text-disabled-foreground disabled:shadow-none [&_svg]:size-4 [&_svg]:shrink-0",
    variantClassNames[variant],
    variant === "link" ? undefined : sizeClassNames[size],
    fullWidth && "w-full",
    className,
  );
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  SharedButtonProps & {
    loading?: boolean;
  };

export function Button({
  children,
  className,
  disabled,
  fullWidth,
  leadingIcon,
  loading = false,
  size,
  trailingIcon,
  type = "button",
  variant,
  ...props
}: ButtonProps) {
  return (
    <button
      aria-busy={loading || undefined}
      className={buttonStyles({ className, fullWidth, size, variant })}
      disabled={disabled || loading}
      type={type}
      {...props}
    >
      {loading ? (
        <LoaderCircle aria-hidden="true" className="animate-spin" />
      ) : (
        leadingIcon
      )}
      <span>{children}</span>
      {!loading && trailingIcon}
    </button>
  );
}

export type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> &
  SharedButtonProps;

export function ButtonLink({
  children,
  className,
  fullWidth,
  leadingIcon,
  size,
  trailingIcon,
  variant,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={buttonStyles({ className, fullWidth, size, variant })}
      {...props}
    >
      {leadingIcon}
      <span>{children}</span>
      {trailingIcon}
    </Link>
  );
}
