/* Visual product mock — mirrors the in-product Home + Copilot UI. */
export function ProductMock() {
  return (
    <div className="mx-auto max-w-5xl rounded-[28px] p-px"
      style={{ background: "linear-gradient(180deg, rgba(155,123,255,0.18), rgba(61,91,255,0.08) 40%, transparent)" }}>
      <div className="overflow-hidden rounded-[27px] bg-bg-1 shadow-xl">
        {/* window bar */}
        <div className="flex items-center gap-2 border-b border-line-1 bg-bg-2 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <span className="ml-3 font-mono text-xs text-ink-3">lumen.app/w/acme/home</span>
        </div>

        <div className="grid min-h-[520px] grid-cols-1 md:grid-cols-[56px_1fr] lg:grid-cols-[56px_1fr_380px]">
          {/* rail */}
          <aside className="hidden flex-col items-center gap-1.5 border-r border-line-1 bg-bg-1 p-3 md:flex">
            {["⌂", "⚡", "◈", "✉", "⌕", "⊕", "⚙"].map((g, i) => (
              <span key={i}
                className={`grid h-9 w-9 place-items-center rounded-lg text-ink-3 ${i === 0 ? "bg-bg-3 text-ink-1 shadow-[inset_0_0_0_1px_#2E2E37]" : "hover:bg-bg-3 hover:text-ink-1"}`}>
                {g}
              </span>
            ))}
          </aside>

          {/* main */}
          <div className="overflow-hidden p-6 text-left">
            <div className="text-xs text-ink-3">Tuesday, June 9 · Good morning, Ada</div>
            <h3 className="mt-1.5 text-2xl font-semibold tracking-[-0.02em]">Here&apos;s your day.</h3>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { l: "MRR", v: "$48.2k", d: "+18% vs last mo", t: "ok" },
                { l: "Runway", v: "14 mo", d: "stable", t: "n" },
                { l: "Open loops", v: "7", d: "2 need you", t: "warn" },
              ].map((s) => (
                <div key={s.l} className="rounded-md border border-line-1 bg-bg-2 p-3.5">
                  <div className="text-[11px] uppercase tracking-wider text-ink-3">{s.l}</div>
                  <div className="mt-1.5 text-[22px] font-semibold tracking-[-0.02em]">{s.v}</div>
                  <div className={`mt-0.5 text-[11px] ${s.t === "ok" ? "text-success" : s.t === "warn" ? "text-warning" : "text-ink-3"}`}>{s.d}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg border border-line-1 bg-bg-2 p-[18px]">
              <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold">
                Morning brief
                <span className="rounded-full bg-accent-500/12 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent-400" style={{ background: "rgba(155,123,255,0.12)" }}>Lumen</span>
              </h4>
              <p className="text-[13px] leading-relaxed text-ink-2">
                You have <b className="text-ink-1">3 meetings</b> today, including a 1:1 with Sarah Chen (Lightspeed) at 2pm —
                last conversation was about Q3 pricing. <b className="text-ink-1">12 unread emails</b>, 2 from investors.
                The auth refactor shipped overnight ✅. Want me to draft replies and pull together Sarah&apos;s prep?
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Draft replies", "Prep for Sarah", "Summarize Linear", "What changed?"].map((c) => (
                  <span key={c} className="cursor-pointer rounded-full border border-line-2 bg-bg-3 px-2.5 py-1 text-xs text-ink-2 transition hover:bg-bg-4 hover:text-ink-1">{c}</span>
                ))}
              </div>
            </div>
          </div>

          {/* copilot */}
          <aside className="hidden flex-col gap-3 border-l border-line-1 bg-bg-1 p-[18px] lg:flex">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[13px] text-ink-2">
                <span className="h-3.5 w-3.5 rounded-full grad-aurora shadow-[0_0_10px_rgba(155,123,255,0.8)]" />
                Lumen · context: Home
              </div>
              <span className="cursor-pointer text-lg text-ink-3">×</span>
            </div>
            <div className="self-end max-w-[90%] rounded-2xl rounded-br-sm border border-line-2 bg-bg-3 px-3 py-2.5 text-[13px]">
              Get me ready for Thursday&apos;s board meeting.
            </div>
            {[
              { tool: "gcal.find_event", meta: "0.4s", state: "ok" },
              { tool: "stripe.get_metrics", meta: "0.8s", state: "ok" },
              { tool: "linear.list_progress", meta: "0.6s", state: "ok" },
              { tool: "notion.create_page", meta: "drafting…", state: "run" },
            ].map((t) => (
              <div key={t.tool} className="flex items-center gap-2.5 rounded-lg border border-line-1 bg-bg-2 px-3 py-2.5">
                {t.state === "ok"
                  ? <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-success text-[9px] font-bold text-black">✓</span>
                  : <span className="h-3 w-3 animate-spin rounded-full border-2 border-line-2 border-t-brand-400" />}
                <span className="flex-1 font-mono text-xs text-ink-2">{t.tool}</span>
                <span className="text-[11px] text-ink-3">{t.meta}</span>
              </div>
            ))}
            <p className="text-[13px] leading-relaxed text-ink-1">
              Pulling Q3 numbers and Linear deltas. I&apos;ll draft the deck outline in Notion and queue
              a 60-min prep block tomorrow at 9am
              <span className="ml-0.5 inline-block h-3.5 w-[2px] align-middle bg-brand-400 shadow-[0_0_6px_#5F7DFF] [animation:pulse_1s_ease-in-out_infinite]" />
            </p>
            <div className="mt-auto flex items-center gap-2 rounded-xl border border-line-2 bg-bg-2 p-2.5">
              <input className="flex-1 border-0 bg-transparent text-[13px] text-ink-1 outline-none placeholder:text-ink-4"
                     placeholder="Ask Lumen…  ⌘J" readOnly />
              <span className="grid h-7 w-7 place-items-center rounded-lg grad-aurora text-white">↑</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
