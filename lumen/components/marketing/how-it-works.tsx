import { MessageSquare, Cpu, CheckCircle2 } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: MessageSquare,
    title: "Describe what you want",
    body: "Type or speak a goal in plain English. No menus, no configuration, no workflow builders. Lumen understands intent and context from your stack.",
    example: '"Get me ready for Thursday\'s board meeting."',
  },
  {
    n: "02",
    icon: Cpu,
    title: "Lumen plans & executes",
    body: "Lumen breaks the goal into steps, calls the right tools in the right order, and pulls live data from your connected apps. You watch it happen in real time.",
    example: "→ Calendar → Stripe → Linear → Notion → Calendar",
  },
  {
    n: "03",
    icon: CheckCircle2,
    title: "You approve. It ships.",
    body: "Anything that sends, schedules, or charges pauses for your one-tap approval. Reads happen automatically. You stay in control of every outcome.",
    example: "Notion doc created · Prep block scheduled · Done in 22s",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-3 text-xs uppercase tracking-[0.12em] text-accent-400">How it works</div>
          <h2 className="text-[clamp(32px,4.5vw,52px)] font-semibold leading-tight tracking-[-0.025em]">
            One prompt. Real work, done.
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-2">
            Lumen replaces the click → configure → submit loop with a single sentence.
            No new tool to learn. No team training. No setup spreadsheets.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map(({ n, icon: Icon, title, body, example }, i) => (
            <div
              key={n}
              className="relative overflow-hidden rounded-2xl border border-line-1 bg-bg-1 p-6 transition-all hover:-translate-y-1 hover:border-line-2 hover:shadow-lg"
            >
              {/* Connector line between cards on desktop */}
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-[58px] hidden h-px w-8 -translate-y-1/2 translate-x-full bg-gradient-to-r from-line-2 to-transparent md:block" />
              )}

              <div className="mb-5 flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-line-2 bg-gradient-to-br from-brand-500/20 to-accent-500/10 text-accent-400">
                  <Icon size={18} strokeWidth={1.75} />
                </div>
                <span className="font-mono text-xs text-ink-4">{n}</span>
              </div>

              <h3 className="mb-2 text-lg font-semibold tracking-[-0.01em]">{title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-ink-2">{body}</p>

              <div className="rounded-lg border border-line-1 bg-bg-2 px-3 py-2.5 font-mono text-[12px] leading-relaxed text-ink-2">
                {example}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
