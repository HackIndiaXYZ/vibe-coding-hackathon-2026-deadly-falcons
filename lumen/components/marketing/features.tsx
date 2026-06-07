import { Sparkles, Brain, Zap, Sun, Command, Plug, Shield, Mic, Clock } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Prompt → Outcome",
    body: "Describe what you want. Lumen plans, calls tools, and reports back. One prompt replaces thirty clicks.",
    tag: "Core",
  },
  {
    icon: Brain,
    title: "Persistent memory",
    body: "Lumen learns your company, people, goals, and voice. Every conversation makes the next one better.",
    tag: "Personalized",
  },
  {
    icon: Zap,
    title: "Autonomous agents",
    body: "Multi-step plans with live progress. Hard approval gates for sends and deletes. Boring and predictable.",
    tag: "Safe",
  },
  {
    icon: Sun,
    title: "Proactive briefings",
    body: "Morning, weekly, and pre-meeting briefs delivered without asking. Reads like your best chief of staff wrote them.",
    tag: "Daily",
  },
  {
    icon: Command,
    title: "Keyboard-first",
    body: "⌘K to do anything. ⌘J to talk to Lumen. Voice input on mobile. Never reach for the mouse.",
    tag: "Fast",
  },
  {
    icon: Plug,
    title: "30+ integrations",
    body: "Gmail, Calendar, Notion, Linear, Stripe, Slack, GitHub, HubSpot, and more. OAuth, scoped, revocable.",
    tag: "Connected",
  },
  {
    icon: Shield,
    title: "Your data, your control",
    body: "Workspace-isolated. Never used to train models. SOC 2 in progress. Wipe memory anytime.",
    tag: "Private",
  },
  {
    icon: Mic,
    title: "Voice on the go",
    body: "Tap-and-hold on mobile to brief Lumen while walking. Transcribed locally for privacy.",
    tag: "Mobile",
  },
  {
    icon: Clock,
    title: "Scheduled workflows",
    body: "Turn any prompt into a recurring workflow. Run on cron, on events, or on demand.",
    tag: "Automation",
  },
];

export function Features() {
  return (
    <section id="features" className="border-y border-line-1 bg-bg-1/30 px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-3 text-xs uppercase tracking-[0.12em] text-accent-400">
            Built for founders who run lean
          </div>
          <h2 className="text-[clamp(32px,4.5vw,52px)] font-semibold leading-tight tracking-[-0.025em]">
            Everything you need.
            <br />
            Nothing you don&apos;t.
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-2">
            Lumen is not a dashboard. It&apos;s an autonomous layer above your stack —
            the operating system founders wish they had on day one.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body, tag }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-xl border border-line-1 bg-bg-1 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-line-2 hover:bg-bg-2 hover:shadow-md"
            >
              {/* Hover glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(400px circle at 50% 0%, rgba(155,123,255,0.08), transparent 40%)",
                }}
              />

              <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <div
                    className="grid h-10 w-10 place-items-center rounded-lg border border-line-2 text-accent-400"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(61,91,255,.18), rgba(155,123,255,.18))",
                    }}
                  >
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <span className="rounded-full border border-line-2 bg-bg-2 px-2 py-0.5 text-[10px] uppercase tracking-wider text-ink-3">
                    {tag}
                  </span>
                </div>
                <h3 className="mb-1.5 text-lg font-semibold tracking-[-0.01em]">{title}</h3>
                <p className="text-sm leading-relaxed text-ink-2">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
