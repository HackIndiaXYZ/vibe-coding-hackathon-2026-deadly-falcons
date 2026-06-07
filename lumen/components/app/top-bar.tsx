"use client";
import { useState } from "react";
import { Logo } from "@/components/brand/logo";
import { Kbd } from "@/components/ui";
import { Search, HelpCircle, Bell, ChevronDown, LogOut, Settings, CreditCard } from "lucide-react";

export function TopBar({ onOpenCommandMenu }: { onOpenCommandMenu: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative flex h-[56px] items-center justify-between border-b border-line-1 bg-bg-1/90 px-4 backdrop-blur-md">
      {/* Left: logo + workspace */}
      <div className="flex items-center gap-3">
        <div className="px-1">
          <Logo />
        </div>
        <span className="hidden h-5 w-px bg-line-2 sm:block" />
        <button className="hidden items-center gap-2 rounded-md border border-line-1 bg-bg-2 px-2.5 py-1.5 text-[13px] text-ink-1 transition hover:border-line-2 hover:bg-bg-3 sm:inline-flex">
          <span className="grid h-[18px] w-[18px] place-items-center rounded-md bg-gradient-to-br from-[#FF7AB6] to-[#9B7BFF] text-[11px] font-bold text-white">
            A
          </span>
          Acme, Inc.
          <ChevronDown size={11} className="text-ink-3" />
        </button>
      </div>

      {/* Center: command menu trigger */}
      <button
        onClick={onOpenCommandMenu}
        className="mx-4 flex w-full max-w-md items-center gap-2.5 rounded-lg border border-line-1 bg-bg-2 px-3.5 py-2 text-[13px] text-ink-3 transition hover:border-line-2 hover:bg-bg-3 hover:text-ink-2"
      >
        <Search size={14} />
        <span className="hidden sm:inline">Ask Lumen or jump to anything…</span>
        <span className="sm:hidden">Search</span>
        <span className="ml-auto flex gap-1">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </span>
      </button>

      {/* Right: actions */}
      <div className="flex items-center gap-1">
        <button
          className="hidden h-8 w-8 place-items-center rounded-md text-ink-3 transition hover:bg-bg-3 hover:text-ink-1 sm:grid"
          title="Help"
        >
          <HelpCircle size={15} />
        </button>
        <button
          className="relative grid h-8 w-8 place-items-center rounded-md text-ink-3 transition hover:bg-bg-3 hover:text-ink-1"
          title="Notifications"
        >
          <Bell size={15} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-warning" />
        </button>
        <div className="relative ml-1">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[#FF7AB6] to-[#9B7BFF] text-[11px] font-bold text-white shadow-md transition hover:scale-105"
            title="Ada Founder"
          >
            A
          </button>

          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-10 z-40 w-60 overflow-hidden rounded-xl border border-line-2 bg-bg-2 shadow-xl animate-fade-up">
                <div className="border-b border-line-1 px-4 py-3">
                  <div className="text-sm font-medium text-ink-1">Ada Founder</div>
                  <div className="text-xs text-ink-3">ada@acme.com</div>
                </div>
                <div className="p-1.5">
                  {[
                    { icon: Settings,   label: "Settings",      hint: "⌘," },
                    { icon: CreditCard, label: "Billing & plan" },
                    { icon: HelpCircle, label: "Help & docs",   hint: "⌘?" },
                  ].map(({ icon: Icon, label, hint }) => (
                    <button
                      key={label}
                      className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-[13px] text-ink-2 transition hover:bg-bg-3 hover:text-ink-1"
                    >
                      <Icon size={13} className="text-ink-3" />
                      {label}
                      {hint && <span className="ml-auto font-mono text-[11px] text-ink-4">{hint}</span>}
                    </button>
                  ))}
                </div>
                <div className="border-t border-line-1 p-1.5">
                  <button className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-[13px] text-danger transition hover:bg-danger/10">
                    <LogOut size={13} />
                    Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
