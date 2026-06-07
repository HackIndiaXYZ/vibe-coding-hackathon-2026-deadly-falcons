import { Badge, Card } from "@/components/ui";
import { PageHeader } from "@/components/app/page-header";
import { Check, AlertCircle, Plus } from "lucide-react";

const integrations = [
  { id: "gmail",    name: "Gmail",          desc: "Read, draft, archive, and send emails.",     connected: true,  scopes: ["read", "send"],            color: "from-[#EA4335] to-[#FBBC05]", lastSync: "2 min ago" },
  { id: "gcal",     name: "Google Calendar",desc: "Read events, find free time, schedule.",     connected: true,  scopes: ["events.read","events.write"], color: "from-[#1A73E8] to-[#4285F4]", lastSync: "5 min ago" },
  { id: "notion",   name: "Notion",         desc: "Read pages, write docs, append blocks.",     connected: true,  scopes: ["read", "write"],           color: "from-white to-[#C9C9C9]",     lastSync: "12 min ago" },
  { id: "linear",   name: "Linear",         desc: "Issues, projects, comments.",                connected: true,  scopes: ["read", "issues.write"],    color: "from-[#5E6AD2] to-[#8A95E8]", lastSync: "1 min ago" },
  { id: "stripe",   name: "Stripe",         desc: "MRR, churn, invoices, subscriptions.",       connected: true,  scopes: ["metrics.read"],            color: "from-[#635BFF] to-[#9986FF]", lastSync: "8 min ago" },
  { id: "slack",    name: "Slack",          desc: "Read threads, post messages, DMs.",          connected: false, scopes: [],                          color: "from-[#36C5F0] to-[#E01E5A]", lastSync: null },
  { id: "github",   name: "GitHub",         desc: "PRs, issues, code search.",                  connected: false, scopes: [],                          color: "from-[#6E7681] to-[#8B949E]", lastSync: null },
  { id: "hubspot",  name: "HubSpot",        desc: "Contacts, deals, sequences.",                connected: false, scopes: [],                          color: "from-[#FF7A59] to-[#FFB099]", lastSync: null, beta: true },
  { id: "intercom", name: "Intercom",       desc: "Conversations, customer health.",            connected: false, scopes: [],                          color: "from-[#1F8DED] to-[#5BB4F5]", lastSync: null, beta: true },
];

export default function IntegrationsPage() {
  const connected = integrations.filter((i) => i.connected).length;
  return (
    <div className="mx-auto max-w-6xl px-6 py-8 md:px-10">
      <PageHeader
        eyebrow="Integrations"
        title="Connect your stack"
        description={`${connected} of ${integrations.length} connected · OAuth, scoped, revocable. Lumen never stores your credentials in plain text.`}
        actions={
          <button className="inline-flex items-center gap-2 rounded-md border border-line-2 bg-bg-2 px-3.5 py-2 text-sm text-ink-1 transition hover:bg-bg-3">
            <Plus size={14} /> Request integration
          </button>
        }
      />

      {/* Status banner */}
      <div className="mb-5 flex items-center gap-3 rounded-xl border border-success/30 bg-success/5 px-4 py-3 text-sm">
        <Check size={16} className="shrink-0 text-success" />
        <span className="text-ink-1">All integrations syncing normally.</span>
        <span className="ml-auto text-xs text-ink-3">Last full sync: 2 min ago</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((i) => (
          <Card key={i.id} className="flex flex-col p-5">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${i.color} text-sm font-bold text-white shadow-md`}
                >
                  {i.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold">
                    {i.name}
                    {i.beta && <Badge tone="brand">beta</Badge>}
                  </div>
                  <div className="text-xs text-ink-3">{i.desc}</div>
                </div>
              </div>
              {i.connected ? (
                <Badge tone="success" className="shrink-0">
                  <Check size={9} /> live
                </Badge>
              ) : (
                <Badge tone="default" className="shrink-0">
                  off
                </Badge>
              )}
            </div>

            {i.connected && (
              <div className="mb-3 flex flex-wrap gap-1">
                {i.scopes.map((s) => (
                  <span
                    key={s}
                    className="rounded border border-line-1 bg-bg-2 px-1.5 py-0.5 font-mono text-[11px] text-ink-3"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-auto flex items-center justify-between border-t border-line-1 pt-3 text-xs">
              <span className="text-ink-4">
                {i.lastSync ? `Synced ${i.lastSync}` : "Not connected"}
              </span>
              {i.connected ? (
                <button className="text-ink-3 transition hover:text-danger">Disconnect</button>
              ) : (
                <button className="font-medium text-accent-400 transition hover:text-accent-500">
                  Connect →
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Security blurb */}
      <Card className="mt-6 flex items-start gap-3">
        <AlertCircle size={16} className="mt-0.5 shrink-0 text-accent-400" />
        <div className="text-xs leading-relaxed text-ink-2">
          <b className="text-ink-1">How your data is handled.</b> All OAuth tokens are
          AES-256 encrypted at rest with envelope-wrapped keys. Lumen reads only what's
          needed for the workflow you ran — no background sweeps. You can revoke any
          integration in one click, and Lumen forgets its scope immediately.
        </div>
      </Card>
    </div>
  );
}
