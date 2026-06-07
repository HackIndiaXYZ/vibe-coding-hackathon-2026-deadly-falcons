import type { HTMLAttributes } from "react";
import { cn } from "./cn";

type Tone = "default" | "brand" | "accent" | "success" | "warning" | "danger";

const tones: Record<Tone, string> = {
  default: "bg-bg-3 text-ink-2 border border-line-2",
  brand:   "bg-brand-500/15 text-brand-300 border border-brand-500/30",
  accent:  "bg-accent-500/15 text-accent-400 border border-accent-500/30",
  success: "bg-success/15 text-success border border-success/30",
  warning: "bg-warning/15 text-warning border border-warning/30",
  danger:  "bg-danger/15 text-danger border border-danger/30",
};

const base = "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> { tone?: Tone; }

export const Badge = ({ className, tone = "default", ...props }: BadgeProps) => (
  <span className={cn(base, tones[tone], className)} {...props} />
);
