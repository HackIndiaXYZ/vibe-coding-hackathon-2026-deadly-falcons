import { cn } from "./cn";

export const Kbd = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <kbd className={cn(
    "inline-flex items-center rounded border border-line-2 border-b-2 bg-bg-3 px-1.5 py-0.5 font-mono text-[10.5px] text-ink-3",
    className
  )}>
    {children}
  </kbd>
);
