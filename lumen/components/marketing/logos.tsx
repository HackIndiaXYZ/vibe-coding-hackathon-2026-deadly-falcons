/** Tools-we-connect strip — visually richer than plain text. */
const tools = [
  { name: "Gmail",    g: "from-[#EA4335] to-[#FBBC05]" },
  { name: "Calendar", g: "from-[#1A73E8] to-[#4285F4]" },
  { name: "Notion",   g: "from-[#FFFFFF] to-[#C9C9C9]" },
  { name: "Linear",   g: "from-[#5E6AD2] to-[#8A95E8]" },
  { name: "Stripe",   g: "from-[#635BFF] to-[#9986FF]" },
  { name: "Slack",    g: "from-[#36C5F0] to-[#E01E5A]" },
  { name: "GitHub",   g: "from-[#6E7681] to-[#8B949E]" },
  { name: "HubSpot",  g: "from-[#FF7A59] to-[#FFB099]" },
];

export function Logos() {
  return (
    <section className="border-b border-line-1 py-14">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="mb-8 text-[11px] uppercase tracking-[0.16em] text-ink-3">
          Native, two-way integrations with the tools founders already use
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
          {tools.map((t) => (
            <div
              key={t.name}
              className="group inline-flex items-center gap-2 rounded-full border border-line-1 bg-bg-1 px-3.5 py-2 text-sm text-ink-2 transition-all hover:-translate-y-0.5 hover:border-line-2 hover:text-ink-1"
            >
              <span className={`h-2 w-2 rounded-full bg-gradient-to-br ${t.g} shadow-[0_0_8px_currentColor]`} />
              {t.name}
            </div>
          ))}
          <span className="rounded-full border border-dashed border-line-2 bg-bg-1/40 px-3.5 py-2 text-sm text-ink-3">
            + 22 more
          </span>
        </div>
      </div>
    </section>
  );
}
