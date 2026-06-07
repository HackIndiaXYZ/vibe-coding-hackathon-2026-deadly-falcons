import { Card, Badge } from "@/components/ui";
import { PageHeader } from "@/components/app/page-header";
import { AlertCircle, FileEdit, Sparkles, CheckCircle2, Filter } from "lucide-react";

const items = [
  {
    kind: "APPROVAL",
    icon: AlertCircle,
    color: "text-warning",
    bg: "bg-warning/10",
    title: "Send 'Q2 board update' to 4 recipients",
    sub: "investors@acme.com + 3 others · drafted by Lumen 12 min ago",
    ago: "2 min",
    tone: "warning" as const,
  },
  {
    kind: "DRAFT",
    icon: FileEdit,
    color: "text-accent-400",
    bg: "bg-accent-500/10",
    title: "Reply to Maya re: bridge round timing",
    sub: "Tone: friendly, direct · 142 words · ready to send",
    ago: "12 min",
    tone: "accent" as const,
  },
  {
    kind: "SUGGESTION",
    icon: Sparkles,
    color: "text-brand-400",
    bg: "bg-brand-500/10",
    title: "Schedule retro with Loom-Inc.",
    sub: "Last 3 emails show escalating concerns · Thursday 2 PM works for both",
    ago: "36 min",
    tone: "brand" as const,
  },
  {
    kind: "DRAFT",
    icon: FileEdit,
    color: "text-accent-400",
    bg: "bg-accent-500/10",
    title: "Weekly investor update — ready to review",
    sub: "624 words · 3 metric callouts · 2 wins · 1 ask",
    ago: "1 hr",
    tone: "accent" as const,
  },
  {
    kind: "SUGGESTION",
    icon: Sparkles,
    color: "text-brand-400",
    bg: "bg-brand-500/10",
    title: "Archive 47 newsletters from last week",
    sub: "Frees up inbox triage time · safe to bulk archive",
    ago: "3 hr",
    tone: "brand" as const,
  },
  {
    kind: "DONE",
    icon: CheckCircle2,
    color: "text-success",
    bg: "bg-success/10",
    title: "Posted standup summary to #engineering",
    sub: "9 issues closed · 2 blockers flagged",
    ago: "Today, 9:05 AM",
    tone: "success" as const,
  },
];

export default function InboxPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8 md:px-10">
      <PageHeader
        eyebrow="Inbox"
        title="Approvals, drafts & suggestions"
        description={`${items.filter((i) => i.kind === "APPROVAL").length} need your decision · ${items.filter((i) => i.kind === "DRAFT").length} drafts ready to review · ${items.filter((i) => i.kind === "SUGGESTION").length} suggestions`}
        actions={
          <button className="inline-flex items-center gap-2 rounded-md border border-line-2 bg-bg-2 px-3.5 py-2 text-sm text-ink-1 transition hover:bg-bg-3">
            <Filter size={14} /> Filter
          </button>
        }
      />

      {/* Tab filter */}
      <div className="mb-4 flex gap-1.5 text-xs">
        {["All", "Approvals", "Drafts", "Suggestions", "Done"].map((t, i) => (
          <button
            key={t}
            className={`rounded-full border px-3 py-1.5 transition ${
              i === 0
                ? "border-accent-500/40 bg-accent-500/15 text-accent-400"
                : "border-line-2 bg-bg-2 text-ink-3 hover:text-ink-1"
            }`}
          >
            {t}
            {i === 0 && <span className="ml-1.5 text-ink-4">{items.length}</span>}
          </button>
        ))}
      </div>

      <Card className="p-0">
        <ul className="divide-y divide-line-1">
          {items.map((i) => {
            const Icon = i.icon;
            return (
              <li
                key={i.title}
                className="group flex cursor-pointer items-center gap-3 px-5 py-4 transition hover:bg-bg-2"
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${i.bg} ${i.color}`}
                >
                  <Icon size={15} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge tone={i.tone}>{i.kind}</Badge>
                    <span className="truncate text-sm font-medium text-ink-1">{i.title}</span>
                  </div>
                  <div className="mt-1 truncate text-xs text-ink-3">{i.sub}</div>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-[11px] text-ink-4">{i.ago}</span>
                  {i.kind === "APPROVAL" && (
                    <div className="flex gap-1.5">
                      <button className="rounded-md border border-line-2 bg-bg-2 px-2.5 py-1 text-xs text-ink-1 transition hover:bg-bg-3">
                        Edit
                      </button>
                      <button className="rounded-md grad-aurora px-2.5 py-1 text-xs font-medium text-white">
                        Approve
                      </button>
                    </div>
                  )}
                  {i.kind === "DRAFT" && (
                    <button className="text-xs font-medium text-accent-400 opacity-0 transition group-hover:opacity-100">
                      Review →
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}
