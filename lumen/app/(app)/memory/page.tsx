import { Badge, Card } from "@/components/ui";
import { PageHeader } from "@/components/app/page-header";
import { User, Building, Target, Lightbulb, Search, Plus } from "lucide-react";

const pinned = [
  { icon: User,      label: "Sarah Chen",                 sub: "Person · Lightspeed · Lead investor",  meta: "Last contact 2d ago" },
  { icon: Building,  label: "Acme, Inc.",                 sub: "Company · Seed stage · 8 people",      meta: "$680k runway · 14 mo" },
  { icon: Target,    label: "Q3 priority: Enterprise pilots", sub: "Goal · 3 of 5 signed",            meta: "On track for Sept" },
  { icon: Lightbulb, label: "Pricing v3 decision",        sub: "Decision · Jun 2",                     meta: "Pro $29 · Team $99" },
  { icon: User,      label: "Maya Rajan",                 sub: "Person · Founders Fund · Bridge round","meta": "Last contact 5d ago" },
  { icon: Building,  label: "Loom-Inc.",                  sub: "Customer · Enterprise · $42k ARR",     meta: "Renewal due Jul 14" },
];

export default function MemoryPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8 md:px-10">
      <PageHeader
        eyebrow="Memory"
        title="What Lumen knows about you"
        description="Your private knowledge graph. People, companies, goals, decisions. Edit, pin, or forget anything — this stays in your workspace and never trains anyone's model."
        actions={
          <>
            <button className="inline-flex items-center gap-2 rounded-md border border-line-2 bg-bg-2 px-3.5 py-2 text-sm text-ink-1 transition hover:bg-bg-3">
              <Plus size={14} /> Teach Lumen
            </button>
          </>
        }
      />

      {/* Search bar */}
      <div className="mb-5 flex items-center gap-2 rounded-xl border border-line-2 bg-bg-2 px-3.5 py-2.5">
        <Search size={14} className="text-ink-3" />
        <input
          className="flex-1 border-0 bg-transparent text-sm text-ink-1 outline-none placeholder:text-ink-4"
          placeholder='Search memory… try "what did Sarah say about pricing?"'
        />
        <Badge tone="accent">38 nodes · 64 edges</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_320px]">
        {/* Graph */}
        <Card className="p-0">
          <div className="border-b border-line-1 px-5 py-3.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Knowledge graph</h3>
              <div className="flex gap-1.5 text-xs">
                {["People", "Companies", "Goals", "Decisions"].map((t, i) => (
                  <button
                    key={t}
                    className={`rounded-full border px-2.5 py-1 transition ${
                      i === 0
                        ? "border-accent-500/40 bg-accent-500/15 text-accent-400"
                        : "border-line-2 bg-bg-2 text-ink-3 hover:text-ink-1"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Abstract SVG graph */}
          <div className="relative h-[340px] overflow-hidden">
            <svg
              viewBox="0 0 600 340"
              className="absolute inset-0 h-full w-full"
              aria-hidden
            >
              {/* edges */}
              <g stroke="rgba(155,123,255,0.25)" strokeWidth="1" fill="none">
                <line x1="300" y1="170" x2="160" y2="100" />
                <line x1="300" y1="170" x2="450" y2="90" />
                <line x1="300" y1="170" x2="180" y2="250" />
                <line x1="300" y1="170" x2="430" y2="250" />
                <line x1="160" y1="100" x2="100" y2="200" />
                <line x1="450" y1="90" x2="500" y2="200" />
                <line x1="180" y1="250" x2="300" y2="310" />
                <line x1="430" y1="250" x2="300" y2="310" />
              </g>
              {/* nodes */}
              {[
                { x: 300, y: 170, r: 22, label: "Acme",    big: true },
                { x: 160, y: 100, r: 14, label: "Sarah" },
                { x: 450, y: 90,  r: 14, label: "Maya" },
                { x: 180, y: 250, r: 14, label: "Pricing v3" },
                { x: 430, y: 250, r: 14, label: "Loom" },
                { x: 100, y: 200, r: 10, label: "Lightspeed" },
                { x: 500, y: 200, r: 10, label: "FF" },
                { x: 300, y: 310, r: 10, label: "Q3" },
              ].map((n, i) => (
                <g key={i}>
                  <circle
                    cx={n.x} cy={n.y} r={n.r}
                    fill={n.big ? "url(#auroraGrad)" : "#17171B"}
                    stroke={n.big ? "transparent" : "#2E2E37"}
                    strokeWidth="1"
                  />
                  <text
                    x={n.x} y={n.y + n.r + 14}
                    textAnchor="middle"
                    className="fill-ink-3 font-sans text-[10px]"
                  >
                    {n.label}
                  </text>
                </g>
              ))}
              <defs>
                <linearGradient id="auroraGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3D5BFF" />
                  <stop offset="100%" stopColor="#9B7BFF" />
                </linearGradient>
              </defs>
            </svg>
            <div className="pointer-events-none absolute bottom-3 right-3 rounded-md border border-line-2 bg-bg-2/80 px-2 py-1 font-mono text-[10px] text-ink-3 backdrop-blur">
              Drag · scroll to zoom (demo)
            </div>
          </div>
        </Card>

        {/* Pinned */}
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Pinned</h3>
            <button className="text-xs text-ink-3 hover:text-ink-1">Manage</button>
          </div>
          <ul className="space-y-2">
            {pinned.map((p) => {
              const Icon = p.icon;
              return (
                <li
                  key={p.label}
                  className="group cursor-pointer rounded-lg border border-line-1 bg-bg-2 p-3 transition hover:border-line-2 hover:bg-bg-3"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-bg-3 text-accent-400">
                      <Icon size={12} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-medium text-ink-1">{p.label}</div>
                      <div className="truncate text-[11px] text-ink-3">{p.sub}</div>
                      <div className="mt-1 text-[10.5px] text-ink-4">{p.meta}</div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </div>
  );
}
