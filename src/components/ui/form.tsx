import { ChevronDown, CircleAlert } from "lucide-react";
import type {
  ComponentPropsWithoutRef,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

import { cn } from "@/lib/cn";

type ValidationState = "default" | "error" | "success";

const validationClassNames = {
  default: "border-border-control hover:border-foreground focus:border-primary",
  error:
    "border-danger-strong bg-danger-surface hover:border-danger-foreground focus:border-danger-strong",
  success:
    "border-success-strong bg-success-surface hover:border-success-foreground focus:border-success-strong",
} as const;

const controlClassName =
  "transition-interactive w-full rounded-[var(--radius-control)] border bg-surface px-3.5 text-foreground shadow-none placeholder:text-muted-foreground/80 disabled:cursor-not-allowed disabled:border-disabled-border disabled:bg-disabled disabled:text-disabled-foreground read-only:bg-surface-muted";

export type LabelProps = ComponentPropsWithoutRef<"label"> & {
  requiredIndicator?: boolean;
};

export function Label({
  children,
  className,
  requiredIndicator = false,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn("text-label font-semibold text-foreground", className)}
      {...props}
    >
      {children}
      {requiredIndicator && (
        <span aria-hidden="true" className="ml-1 text-danger-strong">
          *
        </span>
      )}
    </label>
  );
}

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  validationState?: ValidationState;
};

export function Input({
  "aria-invalid": ariaInvalid,
  className,
  validationState = "default",
  ...props
}: InputProps) {
  return (
    <input
      aria-invalid={validationState === "error" ? true : ariaInvalid}
      className={cn(
        controlClassName,
        "min-h-11 py-2.5",
        validationClassNames[validationState],
        className,
      )}
      data-state={validationState}
      {...props}
    />
  );
}

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  validationState?: ValidationState;
};

export function Textarea({
  "aria-invalid": ariaInvalid,
  className,
  validationState = "default",
  ...props
}: TextareaProps) {
  return (
    <textarea
      aria-invalid={validationState === "error" ? true : ariaInvalid}
      className={cn(
        controlClassName,
        "min-h-36 resize-y py-3",
        validationClassNames[validationState],
        className,
      )}
      data-state={validationState}
      {...props}
    />
  );
}

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  validationState?: ValidationState;
};

export function Select({
  "aria-invalid": ariaInvalid,
  children,
  className,
  validationState = "default",
  ...props
}: SelectProps) {
  return (
    <span className="relative block">
      <select
        aria-invalid={validationState === "error" ? true : ariaInvalid}
        className={cn(
          controlClassName,
          "min-h-11 appearance-none py-2.5 pr-10",
          validationClassNames[validationState],
          className,
        )}
        data-state={validationState}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </span>
  );
}

type ChoiceProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  validationState?: ValidationState;
};

const choiceStateClassNames = {
  default: "",
  error: "ring-2 ring-danger-strong ring-offset-2",
  success: "ring-2 ring-success-strong ring-offset-2",
} as const;

export function Checkbox({
  "aria-invalid": ariaInvalid,
  className,
  validationState = "default",
  ...props
}: ChoiceProps) {
  return (
    <input
      aria-invalid={validationState === "error" ? true : ariaInvalid}
      className={cn(
        "size-5 shrink-0 cursor-pointer accent-primary disabled:cursor-not-allowed disabled:opacity-60",
        choiceStateClassNames[validationState],
        className,
      )}
      data-state={validationState}
      type="checkbox"
      {...props}
    />
  );
}

export function Radio({
  className,
  validationState = "default",
  ...props
}: ChoiceProps) {
  return (
    <input
      className={cn(
        "size-5 shrink-0 cursor-pointer accent-primary disabled:cursor-not-allowed disabled:opacity-60",
        choiceStateClassNames[validationState],
        className,
      )}
      data-state={validationState}
      type="radio"
      {...props}
    />
  );
}

export type FormFieldProps = ComponentPropsWithoutRef<"div"> & {
  invalid?: boolean;
};

export function FormField({
  className,
  invalid = false,
  ...props
}: FormFieldProps) {
  return (
    <div
      className={cn("grid gap-2", className)}
      data-invalid={invalid || undefined}
      {...props}
    />
  );
}

export function FieldDescription({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn("text-body-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export function FieldError({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn(
        "flex items-start gap-2 text-body-sm font-medium text-danger-foreground",
        className,
      )}
      role="alert"
      {...props}
    >
      <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <span>{children}</span>
    </p>
  );
}
