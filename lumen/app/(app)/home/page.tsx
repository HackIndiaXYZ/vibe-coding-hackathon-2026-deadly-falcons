import { Badge, Card } from "@/components/ui";
import { PageHeader } from "@/components/app/page-header";
import {
  FileEdit, Sparkles, ArrowUpRight, TrendingUp,
  Clock, Users, AlertCircle, CheckCircle2, RefreshCw, Plus,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8 md:px-10">
      <PageHeader
        eyebrow="Tuesday · June 9 · 8:42 AM"
        title="Good morning, Ada. Here's your day."
        description="3 meetings today, 2 high-priority follow-ups, and your weekly investor update is ready to review."
        actions={
          <>
            <button className="inline-flex items-center gap-2 rounded-md border border-line-2 bg-bg-2 px-3.5 py-2 text-sm text-ink-1 transition hover:bg-bg-3">
              <RefreshCw size={14} /> Refresh brief
            </button>
            <button className="inline-flex items-center gap-2 rounded-md grad-aurora px-3.5 py-2 text-sm font-medium text-white shadow-[0_4px_16px_rgba(61,91,255,0.3)] transition hover:-translate-y-px">
              <Plus size={14} /> New workflow
            </button>
          </>
        }
      />

      {/* Stats */}
      <section className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat
          label="MRR"
          value="$48,212"
          delta="+18.4%"
          tone="up"
          sub="vs May · $7.5k added"
          icon={TrendingUp}
        />
        <Stat
          label="Runway"
          value="14 mo"
          delta="stable"
          tone="neutral"
          sub="At current burn · $680k"
          icon={Clock}
        />
        <Stat
          label="Open loops"
          value="7"
          delta="2 need you"
          tone="warn"
          sub="Approvals + drafts"
          icon={AlertCircle}
        />
        <Stat
          label="Hours saved · wk"
          value="6.8h"
          delta="↑ from 5.1h"
          tone="up"
          sub="vs last week"
          icon={Sparkles}
        />
      </section>

      {/* Main grid */}
      <section className="grid gap-4 md:grid-cols-[2fr_1fr]">
        {/* Morning brief */}
        <Card className="md:row-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              Morning brief
              <Badge tone="accent">Lumen</Badge>
            </h3>
            <span className="text-xs text-ink-4">Generated 12 min ago</span>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-ink-2">
            <p>
              You have <b className="text-ink-1">3 meetings today</b>, including a 1:1
              with <b className="text-ink-1">Sarah Chen</b> (Lightspeed) at 2 PM —
              last conversation was about Q3 pricing strategy. There are{" "}
              <b className="text-ink-1">12 unread emails</b>, 2 from investors
              (Maya at Founders Fund, James at SVA).
            </p>
            <p>
              The <b className="text-ink-1">auth refactor</b> merged overnight ✅; Linear
              shows the team closed <b className="text-ink-1">9 issues</b> while you slept.
              Pricing v3 ships Friday.
            </p>
            <div className="rounded-lg border border-warning/30 bg-warning/5 p-3.5">
              <div className="mb-1.5 flex items-center gap-2 text-xs font-medium text-warning">
                <AlertCircle size={12} /> Needs your call today
              </div>
              <p className="text-[13px] text-ink-2">
                <b className="text-ink-1">Loom-Inc. pricing escalation</b> — they're asking
                for an enterprise discount on their renewal. I drafted three response options
                ranging from a hard no to a 20% concession. Want to review?
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {[
              "Draft replies to investors",
              "Prep for Sarah at 2 PM",
              "Show Loom-Inc. options",
              "Summarize overnight Linear",
              "What changed this week?",
            ].map((c) => (
              <button
                key={c}
                className="inline-flex items-center gap-1.5 rounded-full border border-line-2 bg-bg-3 px-3 py-1.5 text-xs text-ink-2 transition hover:border-accent-500/40 hover:bg-bg-4 hover:text-ink-1"
              >
                <Sparkles size={11} className="text-accent-400" />
                {c}
              </button>
            ))}
          </div>
        </Card>

        {/* Calendar */}
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <Clock size={14} className="text-ink-3" /> Today
            </h3>
            <button className="text-xs text-ink-3 hover:text-ink-1">View all</button>
          </div>
          <ol className="space-y-3">
            <CalItem
              time="10:00"
              title="Design review · Q3 onboarding"
              sub="Priya · Marcus · 30 min"
              count={2}
            />
            <CalItem
              time="14:00"
              title="1:1 with Sarah Chen"
              sub="Lightspeed · prep ready"
              now
              linkLabel="Open prep"
            />
            <CalItem
              time="16:30"
              title="Eng standup"
              sub="Team channel · 15 min"
              count={5}
            />
            <CalItem
              time="Wed"
              title="Board prep block"
              sub="Lumen-scheduled · 9–10 AM"
              muted
            />
          </ol>
        </Card>

        {/* Quick metric */}
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold">This week</h3>
            <Badge tone="success">on track</Badge>
          </div>
          <div className="space-y-3 text-sm">
            <ProgressRow label="Pricing v3 launch" value={75} total="3 of 4 tasks" />
            <ProgressRow label="Enterprise pilot · Acme" value={40} total="2 of 5 milestones" />
            <ProgressRow label="Hire: Sr. Designer" value={60} total="3 of 5 candidates" />
          </div>
        </Card>
      </section>

      {/* Inbox */}
      <section className="mt-6">
        <Card className="p-0">
          <div className="flex items-center justify-between border-b border-line-1 px-5 py-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              Inbox · awaiting you
              <Badge tone="warning">2</Badge>
            </h3>
            <button className="text-xs text-ink-3 hover:text-ink-1">View all →</button>
          </div>
          <ul className="divide-y divide-line-1">
            <InboxRow
              kind="approval"
              title="Approve: send 'Q2 board update' to 4 recipients"
              sub="Draft ready · investors@acme.com + 3 others"
              ago="2 min ago"
            />
            <InboxRow
              kind="draft"
              title="Reply to Maya re: bridge round timing"
              sub={`"Hi Maya — appreciate the heads-up. To your Q on timing…"`}
              ago="12 min"
            />
            <InboxRow
              kind="suggestion"
              title="Schedule retro with Loom-Inc. account"
              sub="Last 3 emails show escalating concerns · I can book Thursday"
              ago="36 min"
            />
            <InboxRow
              kind="done"
              title="Workflow finished: weekly investor update draft"
              sub="624 words · 3 metric callouts · ready to review"
              ago="1 hr"
            />
          </ul>
        </Card>
      </section>
    </div>
  );
}

/* ─────────────────── helpers ─────────────────── */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconType = React.ComponentType<any>;

function Stat({
  label, value, delta, tone, sub, icon: Icon,
}: {
  label: string; value: string; delta: string; tone: "up" | "warn" | "neutral";
  sub: string; icon: IconType;
}) {
  const toneClass =
    tone === "up" ? "text-success" : tone === "warn" ? "text-warning" : "text-ink-3";
  return (
    <div className="group rounded-xl border border-line-1 bg-bg-1 p-4 transition-all hover:border-line-2 hover:bg-bg-2">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-[11px] font-medium uppercase tracking-wider text-ink-3">{label}</div>
        <Icon size={13} className="text-ink-4 transition-colors group-hover:text-ink-3" />
      </div>
      <div className="text-[26px] font-semibold leading-none tracking-[-0.02em]">{value}</div>
      <div className={`mt-1.5 text-xs font-medium ${toneClass}`}>{delta}</div>
      <div className="mt-0.5 text-[11px] text-ink-4">{sub}</div>
    </div>
  );
}

function CalItem({
  time, title, sub, now, muted, count, linkLabel,
}: {
  time: string; title: string; sub: string;
  now?: boolean; muted?: boolean; count?: number; linkLabel?: string;
}) {
  return (
    <li className={`group flex items-start gap-3 ${muted ? "opacity-60" : ""}`}>
      <span
        className={`w-12 shrink-0 pt-0.5 font-mono text-xs ${
          now ? "font-semibold text-accent-400" : "text-ink-3"
        }`}
      >
        {time}
      </span>
      <span
        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full border ${
          now
            ? "border-transparent bg-accent-500 shadow-[0_0_10px_#9B7BFF]"
            : "border-line-2 bg-bg-3"
        }`}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-[13.5px] text-ink-1">
          <span className="truncate">{title}</span>
          {now && (
            <Badge tone="accent" className="shrink-0 text-[10px]">
              now
            </Badge>
          )}
        </div>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-ink-3">
          {count && (
            <span className="inline-flex items-center gap-1">
              <Users size={10} /> {count}
            </span>
          )}
          <span className="truncate">{sub}</span>
        </div>
        {linkLabel && (
          <button className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-accent-400 hover:text-accent-500">
            {linkLabel} <ArrowUpRight size={10} />
          </button>
        )}
      </div>
    </li>
  );
}

function ProgressRow({
  label, value, total,
}: { label: string; value: number; total: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-[13px] text-ink-1">{label}</span>
        <span className="text-[11px] text-ink-3">{total}</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-bg-3">
        <div
          className="h-full grad-aurora transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function InboxRow({
  kind, title, sub, ago,
}: {
  kind: "approval" | "draft" | "suggestion" | "done";
  title: string; sub: string; ago: string;
}) {
  const cfg = {
    approval: { icon: AlertCircle, color: "text-warning",  bg: "bg-warning/10",  label: "Approve" },
    draft:    { icon: FileEdit,    color: "text-accent-400",bg: "bg-accent-500/10", label: "Draft" },
    suggestion:{icon: Sparkles,    color: "text-brand-400", bg: "bg-brand-500/10",  label: "Suggest" },
    done:     { icon: CheckCircle2,color: "text-success",  bg: "bg-success/10",  label: "Done" },
  }[kind];
  const Icon = cfg.icon;

  return (
    <li className="group flex cursor-pointer items-center gap-3 px-5 py-3.5 transition hover:bg-bg-2">
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${cfg.bg} ${cfg.color}`}>
        <Icon size={14} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-[13.5px] font-medium text-ink-1">{title}</span>
        </div>
        <div className="mt-0.5 truncate text-xs text-ink-3">{sub}</div>
      </div>
      <div className="shrink-0 text-right">
        <div className="text-[11px] text-ink-4">{ago}</div>
        <button className="mt-0.5 text-[11px] font-medium text-accent-400 opacity-0 transition group-hover:opacity-100">
          Open →
        </button>
      </div>
    </li>
  );
}


