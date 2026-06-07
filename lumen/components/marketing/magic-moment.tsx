"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Demo {
  prompt: string;
  steps: { label: string; tool: string; state: "ok" | "run" | "pending" }[];
  duration: string;
  saved: string;
}

const demos: Demo[] = [
  {
    prompt: "Get me ready for Thursday's board meeting",
    duration: "22 sec",
    saved: "3 hours",
    steps: [
      { label: "Find Thursday's board meeting", tool: "Calendar", state: "ok" },
      { label: "Pull Q3 metrics", tool: "Stripe", state: "ok" },
      { label: "Summarize Linear progress", tool: "Linear", state: "ok" },
      { label: "Identify attendees · last interactions", tool: "Memory", state: "ok" },
      { label: "Draft prep doc in Notion", tool: "Notion", state: "run" },
      { label: "Schedule 1h prep block tomorrow 9am", tool: "Calendar", state: "pending" },
    ],
  },
  {
    prompt: "Draft this week's investor update",
    duration: "14 sec",
    saved: "2 hours",
    steps: [
      { label: "Pull MRR, churn, runway from Stripe", tool: "Stripe", state: "ok" },
      { label: "List shipped milestones from Linear", tool: "Linear", state: "ok" },
      { label: "Pull last 3 investor updates for voice match", tool: "Memory", state: "ok" },
      { label: "Compose update draft (624 words)", tool: "Notion", state: "run" },
      { label: "Send to investors@acme.com (4 recipients)", tool: "Gmail", state: "pending" },
    ],
  },
  {
    prompt: "Triage my inbox — drafts only, don't send",
    duration: "9 sec",
    saved: "1 hour",
    steps: [
      { label: "Read 47 unread emails", tool: "Gmail", state: "ok" },
      { label: "Archive 31 newsletters", tool: "Gmail", state: "ok" },
      { label: "Draft replies to 8 customer asks", tool: "Gmail", state: "ok" },
      { label: "Flag 2 investor follow-ups for review", tool: "Inbox", state: "run" },
    ],
  },
];

export function MagicMoment() {
  const [idx, setIdx] = useState(0);
  const demo = demos[idx];

  // Auto-cycle every 6 seconds (pauses on hover)
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % demos.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section className="px-6 pb-32">
      <div className="mx-auto max-w-6xl">
        <div
          className="relative grid items-stretch gap-10 overflow-hidden rounded-3xl border border-line-1 bg-bg-1 p-8 md:grid-cols-2 md:p-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Background glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-1/3"
            style={{
              background:
                "radial-gradient(circle at 80% 20%, rgba(155,123,255,0.18), transparent 50%)",
            }}
          />

          {/* Left column — copy */}
          <div className="relative">
            <div className="mb-3 text-xs uppercase tracking-[0.12em] text-accent-400">
              The magic moment
            </div>
            <h3 className="text-3xl font-semibold leading-[1.15] tracking-[-0.02em] md:text-[42px]">
              One prompt.
              <br />
              Hours back in your day.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-ink-2">
              You type an outcome, Lumen orchestrates the plan across your stack,
              pauses for approval on anything that sends or schedules, and ships
              the work. You stay in the loop. You never do the busywork.
            </p>

            {/* Tabs to switch demos */}
            <div className="mt-7 flex flex-wrap gap-2">
              {demos.map((d, i) => (
                <button
                  key={d.prompt}
                  onClick={() => setIdx(i)}
                  className={`rounded-full border px-3 py-1.5 text-xs transition ${
                    i === idx
                      ? "border-accent-500/50 bg-accent-500/15 text-accent-400"
                      : "border-line-2 bg-bg-2 text-ink-3 hover:text-ink-1"
                  }`}
                >
                  {d.prompt.length > 32 ? d.prompt.slice(0, 32) + "…" : d.prompt}
                </button>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Pill label={`${demo.duration} median`} />
              <Pill label={`Saves ${demo.saved}`} />
              <Pill label="Fully audit-logged" />
            </div>
          </div>

          {/* Right column — animated demo */}
          <div className="relative rounded-xl border border-line-1 bg-bg-2 p-5 font-mono text-[13px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={demo.prompt}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-wider text-ink-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-500 shadow-[0_0_8px_#9B7BFF]" />
                  Live demo
                  <span className="ml-auto font-sans normal-case tracking-normal text-ink-4">
                    auto-cycles · hover to pause
                  </span>
                </div>

                <div className="mb-4 rounded-md border border-line-2 bg-bg-3 px-3 py-2.5 text-ink-2">
                  <span className="text-accent-400">›</span> {demo.prompt}
                </div>

                <div className="space-y-0">
                  {demo.steps.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.3 }}
                      className={`flex items-center gap-2.5 border-b border-dashed border-line-1 py-2.5 last:border-0 ${
                        s.state === "pending" ? "opacity-50" : ""
                      }`}
                    >
                      {s.state === "ok" && (
                        <span className="grid h-4 w-4 place-items-center rounded-full bg-success text-[10px] font-bold text-black">
                          ✓
                        </span>
                      )}
                      {s.state === "run" && (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-line-2 border-t-accent-500" />
                      )}
                      {s.state === "pending" && (
                        <span className="h-4 w-4 rounded-full border border-dashed border-line-2" />
                      )}
                      <span className="flex-1 text-ink-2">{s.label}</span>
                      <span className="rounded border border-line-1 bg-bg-3 px-1.5 py-0.5 font-sans text-[10px] text-ink-3">
                        {s.tool}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line-2 bg-bg-2 px-2.5 py-1 text-xs text-ink-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-success before:shadow-[0_0_8px_#2ECC71] before:content-['']">
      {label}
    </span>
  );
}
