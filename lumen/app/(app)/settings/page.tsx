import { Card, Badge } from "@/components/ui";
import { PageHeader } from "@/components/app/page-header";
import { User, Building, Users, CreditCard, Plug, Brain, Shield, Bell, Key, ChevronRight } from "lucide-react";

const sections = [
  { id: "profile",       title: "Profile",            icon: User,       body: "Name, email, timezone, avatar, preferences." },
  { id: "workspace",     title: "Workspace",          icon: Building,   body: "Name, slug, region, default AI model." },
  { id: "members",       title: "Members & roles",    icon: Users,      body: "Invite teammates · manage Owner / Admin / Member / Viewer." },
  { id: "billing",       title: "Billing",            icon: CreditCard, body: "Plan, payment method, invoices, usage." },
  { id: "integrations",  title: "Integrations",       icon: Plug,       body: "Connect or disconnect tools, manage scopes." },
  { id: "memory",        title: "Memory",             icon: Brain,      body: "Edit, export, or wipe what Lumen knows." },
  { id: "security",      title: "Security",           icon: Shield,     body: "Sessions, audit log, 2FA, SSO (Team+)." },
  { id: "notifications", title: "Notifications",      icon: Bell,       body: "Email · push · in-app channels." },
  { id: "api",           title: "API & developers",   icon: Key,        body: "API keys, webhooks, OpenAPI spec." },
];

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-8 md:px-10">
      <PageHeader
        eyebrow="Settings"
        title="Workspace settings"
        description="Everything in one place. No nested menus, no surprises."
        actions={
          <div className="flex items-center gap-2">
            <Badge tone="brand">Pro plan</Badge>
            <button className="text-xs font-medium text-accent-400 hover:text-accent-500">
              Upgrade to Team →
            </button>
          </div>
        }
      />

      {/* Account summary */}
      <Card className="mb-6 flex items-center gap-4 p-5">
        <div className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-[#FF7AB6] to-[#9B7BFF] text-lg font-semibold text-white shadow-md">
          A
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-ink-1">Ada Founder</span>
            <Badge tone="default">Owner</Badge>
          </div>
          <div className="text-xs text-ink-3">ada@acme.com · America/Los_Angeles</div>
        </div>
        <div className="hidden text-right md:block">
          <div className="text-xs text-ink-3">Workspace</div>
          <div className="text-sm font-medium text-ink-1">Acme, Inc.</div>
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Card
              key={s.id}
              className="group flex cursor-pointer items-start gap-3 p-5 transition-all hover:-translate-y-0.5"
            >
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line-2 bg-bg-2 text-accent-400 transition-colors group-hover:text-ink-1">
                <Icon size={15} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{s.title}</h3>
                  <ChevronRight
                    size={14}
                    className="text-ink-4 transition-transform group-hover:translate-x-0.5 group-hover:text-ink-1"
                  />
                </div>
                <p className="mt-1 text-[12.5px] leading-relaxed text-ink-3">{s.body}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6 border-danger/30 bg-danger/5">
        <h3 className="mb-1 flex items-center gap-2 text-sm font-semibold text-danger">
          <Shield size={14} /> Danger zone
        </h3>
        <p className="mb-4 text-xs text-ink-2">
          These actions are permanent. We&apos;ll ask you to confirm.
        </p>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-md border border-line-2 bg-bg-2 px-3 py-1.5 text-xs text-ink-1 transition hover:bg-bg-3">
            Export workspace data
          </button>
          <button className="rounded-md border border-danger/40 bg-danger/10 px-3 py-1.5 text-xs text-danger transition hover:bg-danger/20">
            Delete workspace
          </button>
        </div>
      </Card>
    </div>
  );
}
