"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Zap, Home, Brain, Inbox, Plug, Plus, UserPlus } from "lucide-react";
import { Kbd } from "@/components/ui";

interface Props { open: boolean; onOpenChange: (o: boolean) => void; }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconType = React.ComponentType<any>;

interface Item {
  id: string;
  label: string;
  group: string;
  icon: IconType;
  hint?: string;
  action: () => void;
}

export function CommandMenu({ open, onOpenChange }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);

  const items: Item[] = useMemo(() => {
    const go = (href: string) => () => { onOpenChange(false); router.push(href as never); };
    return [
      { id: "s1", group: "Suggested", icon: Zap, label: "Draft this week's investor update", action: go("/copilot?prompt=Draft+this+week%27s+investor+update") },
      { id: "s2", group: "Suggested", icon: Zap, label: "What's on my calendar today?", action: go("/copilot?prompt=What%27s+on+my+calendar+today") },
      { id: "s3", group: "Suggested", icon: Zap, label: "Summarize unread emails", action: go("/copilot?prompt=Summarize+unread+emails") },
      { id: "n1", group: "Go to", icon: Home, label: "Home", hint: "⌘1", action: go("/home") },
      { id: "n2", group: "Go to", icon: Zap, label: "Workflows", hint: "⌘2", action: go("/workflows") },
      { id: "n3", group: "Go to", icon: Brain, label: "Memory", hint: "⌘3", action: go("/memory") },
      { id: "n4", group: "Go to", icon: Inbox, label: "Inbox", hint: "⌘4", action: go("/inbox") },
      { id: "n5", group: "Go to", icon: Plug, label: "Integrations", hint: "⌘6", action: go("/integrations") },
      { id: "a1", group: "Actions", icon: Plus, label: "Connect integration", action: go("/integrations") },
      { id: "a2", group: "Actions", icon: UserPlus, label: "Invite teammate", action: go("/settings") },
    ];
  }, [onOpenChange, router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => it.label.toLowerCase().includes(q) || it.group.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => { setSelectedIdx(0); }, [query, open]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 10); else setQuery(""); }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onOpenChange(false); }
      else if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIdx((i) => Math.min(filtered.length - 1, i + 1)); }
      else if (e.key === "ArrowUp")   { e.preventDefault(); setSelectedIdx((i) => Math.max(0, i - 1)); }
      else if (e.key === "Enter")     { e.preventDefault(); filtered[selectedIdx]?.action(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, selectedIdx, onOpenChange]);

  if (!open) return null;

  // group items in render order
  const grouped: Record<string, { item: Item; idx: number }[]> = {};
  filtered.forEach((it, idx) => { (grouped[it.group] ??= []).push({ item: it, idx }); });

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-start justify-center bg-bg-0/60 backdrop-blur-sm pt-24"
      onClick={(e) => { if (e.target === e.currentTarget) onOpenChange(false); }}
    >
      <div className="w-[min(640px,92vw)] overflow-hidden rounded-xl border border-line-2 bg-bg-2 shadow-xl animate-fade-up">
        <div className="flex items-center gap-2.5 border-b border-line-1 px-4 py-3.5">
          <Search size={16} className="text-ink-3" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search or run a command…"
            className="flex-1 border-0 bg-transparent text-[15px] text-ink-1 outline-none placeholder:text-ink-4"
          />
          <Kbd>esc</Kbd>
        </div>
        <div className="max-h-[420px] overflow-auto p-2">
          {filtered.length === 0 && (
            <div className="px-3 py-6 text-center text-sm text-ink-3">No results.</div>
          )}
          {Object.entries(grouped).map(([group, list]) => (
            <div key={group} className="mt-1">
              <div className="px-3 py-1.5 text-[10.5px] uppercase tracking-[0.08em] text-ink-3">{group}</div>
              {list.map(({ item, idx }) => {
                const Icon = item.icon;
                const isSel = idx === selectedIdx;
                return (
                  <button
                    key={item.id}
                    onMouseEnter={() => setSelectedIdx(idx)}
                    onClick={item.action}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-[13.5px] transition-colors ${
                      isSel ? "bg-bg-3 text-ink-1" : "text-ink-2"
                    }`}
                  >
                    <Icon size={14} className="text-accent-400" />
                    <span className="flex-1">{item.label}</span>
                    {item.hint && <span className="ml-auto text-[11px] text-ink-3 font-mono">{item.hint}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
