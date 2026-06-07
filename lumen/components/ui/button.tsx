import * as React from "react";
import { cn } from "./cn";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "link";
type Size = "sm" | "md" | "lg" | "icon";

const variants: Record<Variant, string> = {
  primary: "grad-aurora text-white shadow-[0_8px_24px_rgba(61,91,255,0.35)] hover:-translate-y-px hover:shadow-[0_12px_32px_rgba(61,91,255,0.45)]",
  secondary: "bg-bg-2 text-ink-1 border border-line-2 hover:bg-bg-3",
  ghost: "text-ink-2 hover:bg-bg-2 hover:text-ink-1",
  danger: "bg-danger/15 text-danger border border-danger/40 hover:bg-danger/20",
  link: "text-brand-400 hover:text-brand-300 underline-offset-4 hover:underline",
};
const sizes: Record<Size, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-sm",
  lg: "h-11 px-5 text-[15px]",
  icon: "h-9 w-9",
};

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all duration-150 ease-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:pointer-events-none disabled:opacity-50 active:scale-[.98]";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />
  )
);
Button.displayName = "Button";
