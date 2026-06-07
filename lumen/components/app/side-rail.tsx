"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Zap, Brain, Inbox, Search, Plug, Settings, HelpCircle } from "lucide-react";
import { cn } from "@/components/ui";

const items = [
  { href: "/home",          icon: Home,   label: "Home",         k: "1" },
  { href: "/workflows",     icon: Zap,    label: "Workflows",    k: "2" },
  { href: "/memory",        icon: Brain,  label: "Memory",       k: "3" },
  { href: "/inbox",         icon: Inbox,  label: "Inbox",        k: "4", badge: 2 },
  { href: "/search",        icon: Search, label: "Search",       k: "5" },
  { href: "/integrations",  icon: Plug,   label: "Integrations", k: "6" },
];

export function SideRail() {
  const path = usePathname() ?? "";

  return (
    <>
      {/* Desktop rail */}
      <nav className="hidden flex-col items-center gap-1.5 border-r border-line-1 bg-bg-1 px-2.5 py-3 sm:flex">
        {items.map(({ href, icon: Icon, label, k, badge }) => {
          const active = path.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              title={`${label}  ⌘${k}`}
              aria-label={`${label} (⌘${k})`}
              className={cn(
                "group relative grid h-10 w-10 place-items-center rounded-lg transition-all",
                active
                  ? "bg-bg-3 text-ink-1 shadow-[inset_0_0_0_1px_#2E2E37]"
                  : "text-ink-3 hover:bg-bg-3 hover:text-ink-1"
              )}
            >
              <Icon size={17} strokeWidth={1.75} />
              {badge ? (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-[16px] place-items-center rounded-full bg-warning px-1 text-[10px] font-semibold text-black">
                  {badge}
                </span>
              ) : null}
              {active && (
                <span
                  aria-hidden
                  className="absolute -left-2.5 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full grad-aurora"
                />
              )}
            </Link>
          );
        })}

        <div className="flex-1" />

        <Link
          href="/help"
          title="Help"
          className="grid h-10 w-10 place-items-center rounded-lg text-ink-3 transition-all hover:bg-bg-3 hover:text-ink-1"
        >
          <HelpCircle size={17} strokeWidth={1.75} />
        </Link>
        <Link
          href="/settings"
          title="Settings  ⌘7"
          className={cn(
            "grid h-10 w-10 place-items-center rounded-lg transition-all",
            path.startsWith("/settings")
              ? "bg-bg-3 text-ink-1 shadow-[inset_0_0_0_1px_#2E2E37]"
              : "text-ink-3 hover:bg-bg-3 hover:text-ink-1"
          )}
        >
          <Settings size={17} strokeWidth={1.75} />
        </Link>
      </nav>

      {/* Mobile bottom dock */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-line-1 bg-bg-1/95 px-2 py-2 backdrop-blur-md sm:hidden">
        {items.slice(0, 5).map(({ href, icon: Icon, label, badge }) => {
          const active = path.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className={cn(
                "relative grid h-12 min-w-[52px] flex-1 place-items-center rounded-lg transition-all",
                active ? "text-accent-400" : "text-ink-3"
              )}
            >
              <Icon size={18} strokeWidth={1.75} />
              <span className="mt-0.5 text-[10px] font-medium">{label}</span>
              {badge ? (
                <span className="absolute right-2 top-1 grid h-4 min-w-[16px] place-items-center rounded-full bg-warning px-1 text-[10px] font-semibold text-black">
                  {badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
