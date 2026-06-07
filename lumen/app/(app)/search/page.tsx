"use client";
import { useState } from "react";
import { Card } from "@/components/ui";
import { PageHeader } from "@/components/app/page-header";
import { Search as SearchIcon, Sparkles, Mail, FileText, Hash } from "lucide-react";

const recentSearches = [
  "what did Sarah say about pricing?",
  "show me invoices over $5k from last month",
  "summarize the Loom-Inc account",
];

const sources = [
  { id: "all", label: "Everywhere", count: 1842 },
  { id: "gmail", label: "Gmail", count: 412, icon: Mail },
  { id: "notion", label: "Notion", count: 87, icon: FileText },
  { id: "slack", label: "Slack", count: 643, icon: Hash },
  { id: "memory", label: "Memory", count: 38, icon: Sparkles },
];

export default function SearchPage() {
  const [q, setQ] = useState("");

  return (
    <div className="mx-auto max-w-4xl px-6 py-8 md:px-10">
      <PageHeader
        eyebrow="Search"
        title="Find anything, ask anything"
        description="Cross-tool semantic search across all your connected apps and memory. Ask questions in plain English."
      />

      <div className="relative">
        <SearchIcon
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-3"
        />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="h-14 w-full rounded-2xl border border-line-2 bg-bg-2 pl-12 pr-32 text-[15px] text-ink-1 outline-none transition placeholder:text-ink-4 focus:border-accent-500 focus:ring-4 focus:ring-accent-500/15"
          placeholder='Try: "what did Sarah say about pricing?"'
        />
        <button className="absolute right-2 top-2 inline-flex h-10 items-center gap-2 rounded-xl grad-aurora px-4 text-sm font-medium text-white shadow-md transition hover:-translate-y-px">
          <Sparkles size={14} /> Ask
        </button>
      </div>

      {/* Source filter */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {sources.map((s, i) => (
          <button
            key={s.id}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition ${
              i === 0
                ? "border-accent-500/40 bg-accent-500/15 text-accent-400"
                : "border-line-2 bg-bg-2 text-ink-3 hover:text-ink-1"
            }`}
          >
            {s.icon && <s.icon size={11} />}
            {s.label}
            <span className="text-ink-4">{s.count}</span>
          </button>
        ))}
      </div>

      {!q && (
        <>
          <div className="mt-8">
            <h3 className="mb-3 text-xs uppercase tracking-[0.1em] text-ink-3">Recent</h3>
            <div className="space-y-1.5">
              {recentSearches.map((r) => (
                <button
                  key={r}
                  onClick={() => setQ(r)}
                  className="flex w-full items-center gap-3 rounded-lg border border-line-1 bg-bg-1 px-3.5 py-2.5 text-left text-sm text-ink-2 transition hover:border-line-2 hover:bg-bg-2 hover:text-ink-1"
                >
                  <SearchIcon size={13} className="text-ink-4" />
                  {r}
                </button>
              ))}
            </div>
          </div>

          <Card className="mt-6 border-dashed bg-transparent text-center">
            <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full border border-line-2 bg-bg-2 text-accent-400">
              <Sparkles size={16} />
            </div>
            <p className="text-sm font-medium text-ink-1">Search across everything you've connected</p>
            <p className="mx-auto mt-1 max-w-md text-xs text-ink-3">
              Ask in plain English. Lumen searches Gmail, Notion, Slack, Linear,
              your memory — and answers with cited sources.
            </p>
          </Card>
        </>
      )}
    </div>
  );
}
