import { Badge, Card } from "@/components/ui";
import { PageHeader } from "@/components/app/page-header";
import { Clock, Zap, Play, Pause, Plus, MoreHorizontal, Sparkles } from "lucide-react";

const items = [
  {
    name: "Morning brief",
    schedule: "Daily · 7:00 AM",
    prompt:
      "Give me my morning brief — today's calendar, top priorities, and any overnight changes that need my attention.",
    lastRun: "Today, 7:00 AM",
    runs: 84,
    enabled: true,
    savedHrs: 8.2,
  },
  {
    name: "Weekly investor update",
    schedule: "Fri · 4:00 PM",
    prompt:
      "Draft this week's investor update using metrics from Stripe and progress from Linear. Match my voice from past updates.",
    lastRun: "Last Fri, 4:00 PM",
    runs: 12,
    enabled: true,
    savedHrs: 14.5,
  },
  {
    name: "Inbox triage",
    schedule: "On demand",
    prompt:
      "Triage my unread inbox: archive newsletters, draft replies to investors and customers, summarize the rest.",
    lastRun: "Yesterday",
    runs: 23,
    enabled: true,
    savedHrs: 9.1,
  },
  {
    name: "Pre-meeting brief",
    schedule: "15 min before any meeting",
    prompt:
      "Brief me on the next meeting: attendees, last interactions, talking points, and open threads.",
    lastRun: "Today, 9:45 AM",
    runs: 142,
    enabled: true,
    savedHrs: 23.8,
  },
  {
    name: "Customer health digest",
    schedule: "Mon · 9:00 AM",
    prompt:
      "Scan Intercom + Stripe for any account showing signs of churn or expansion. Flag top 3 of each.",
    lastRun: "Mon, 9:00 AM",
    runs: 6,
    enabled: false,
    savedHrs: 4.0,
  },
  {
    name: "End-of-day shutdown",
    schedule: "Weekdays · 6:00 PM",
    prompt:
      "Tomorrow's prep: pull tomorrow's meetings, draft any needed follow-ups, surface anything blocking the team.",
    lastRun: "Yesterday, 6:00 PM",
    runs: 31,
    enabled: true,
    savedHrs: 6.4,
  },
];

export default function WorkflowsPage() {
  const totalSaved = items.filter((i) => i.enabled).reduce((s, i) => s + i.savedHrs, 0);
  return (
    <div className="mx-auto max-w-6xl px-6 py-8 md:px-10">
      <PageHeader
        eyebrow="Workflows"
        title="Your AI on autopilot"
        description={`Saved prompts that run on schedule or on demand. They've saved you ${totalSaved.toFixed(1)} hours this month.`}
        actions={
          <button className="inline-flex items-center gap-2 rounded-md grad-aurora px-3.5 py-2 text-sm font-medium text-white shadow-[0_4px_16px_rgba(61,91,255,0.3)] transition hover:-translate-y-px">
            <Plus size={14} /> New workflow
          </button>
        }
      />

      {/* Filter bar */}
      <div className="mb-5 flex items-center gap-2 text-xs">
        {["All", "Scheduled", "On demand", "Paused"].map((t, i) => (
          <button
            key={t}
            className={`rounded-full border px-3 py-1.5 transition ${
              i === 0
                ? "border-accent-500/40 bg-accent-500/15 text-accent-400"
                : "border-line-2 bg-bg-2 text-ink-3 hover:text-ink-1"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {items.map((w) => (
          <Card key={w.name} className="group flex flex-col p-5">
            <div className="mb-2.5 flex items-start justify-between gap-3">
              <div className="flex items-center gap-2 text-[15px] font-semibold">
                <span
                  className={`grid h-7 w-7 place-items-center rounded-lg ${
                    w.enabled ? "bg-accent-500/15 text-accent-400" : "bg-bg-3 text-ink-4"
                  }`}
                >
                  <Zap size={14} />
                </span>
                {w.name}
                {!w.enabled && <Badge tone="default">paused</Badge>}
              </div>
              <button className="grid h-7 w-7 place-items-center rounded-md text-ink-3 opacity-0 transition hover:bg-bg-3 hover:text-ink-1 group-hover:opacity-100">
                <MoreHorizontal size={14} />
              </button>
            </div>

            <p className="line-clamp-2 text-[13px] leading-relaxed text-ink-2">{w.prompt}</p>

            <div className="mt-4 flex items-center justify-between border-t border-line-1 pt-3 text-xs">
              <div className="flex items-center gap-3 text-ink-3">
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={11} /> {w.schedule}
                </span>
                <span className="text-ink-4">·</span>
                <span>{w.runs} runs</span>
              </div>
              <span className="inline-flex items-center gap-1 text-success">
                <Sparkles size={11} /> {w.savedHrs}h saved
              </span>
            </div>

            <div className="mt-3 flex items-center gap-1.5">
              <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-line-2 bg-bg-2 px-2.5 py-1.5 text-xs font-medium text-ink-1 transition hover:bg-bg-3">
                <Play size={11} /> Run now
              </button>
              <button className="grid h-7 w-7 place-items-center rounded-md border border-line-2 bg-bg-2 text-ink-3 transition hover:bg-bg-3 hover:text-ink-1">
                {w.enabled ? <Pause size={11} /> : <Play size={11} />}
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty-state suggestion card */}
      <Card className="mt-6 border-dashed bg-transparent text-center">
        <div className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-full border border-line-2 bg-bg-2 text-accent-400">
          <Sparkles size={16} />
        </div>
        <p className="text-sm font-medium text-ink-1">Need a new workflow?</p>
        <p className="mx-auto mt-1 max-w-md text-xs text-ink-3">
          Just describe what you want in plain English — Lumen will build the
          workflow, test it, and save it for you.
        </p>
        <button className="mt-3 inline-flex items-center gap-2 rounded-md grad-aurora px-3.5 py-2 text-xs font-medium text-white">
          <Plus size={12} /> Describe a workflow
        </button>
      </Card>
    </div>
  );
}
