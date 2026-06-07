import Link from "next/link";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    suffix: "/forever",
    blurb: "For solo founders trying Lumen out.",
    features: [
      "50 AI actions per month",
      "Connect 2 integrations",
      "Daily morning brief",
      "Community support",
    ],
    cta: "Start free",
    href: "/login",
    featured: false,
  },
  {
    name: "Pro",
    price: "$29",
    suffix: "/month",
    blurb: "Most loved by solo & 2-person founder teams.",
    features: [
      "Unlimited AI actions",
      "All 30+ integrations",
      "Scheduled workflows",
      "Voice on mobile",
      "Priority support",
      "7-day free trial",
    ],
    cta: "Start Pro trial",
    href: "/login?plan=pro",
    featured: true,
  },
  {
    name: "Team",
    price: "$99",
    suffix: "/seat/month",
    blurb: "When you've hired and want shared memory.",
    features: [
      "Everything in Pro",
      "Shared team memory",
      "Roles & permissions",
      "Audit log",
      "SSO-lite (Google)",
      "Workflow library",
    ],
    cta: "Start Team trial",
    href: "/login?plan=team",
    featured: false,
  },
  {
    name: "Enterprise",
    price: "Custom",
    suffix: "",
    blurb: "Series B+ and beyond.",
    features: [
      "Everything in Team",
      "SAML SSO · SCIM",
      "Private VPC deployment",
      "Custom data retention",
      "SOC 2 + DPA",
      "Dedicated CSM",
    ],
    cta: "Talk to sales",
    href: "mailto:enterprise@lumen.app",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-y border-line-1 bg-bg-1/30 px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-3 text-xs uppercase tracking-[0.12em] text-accent-400">Pricing</div>
          <h2 className="text-[clamp(32px,4.5vw,52px)] font-semibold leading-tight tracking-[-0.025em]">
            Start free. Pay when
            <br />
            Lumen pays you back.
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-2">
            Most founders break even on the Pro plan in the first week.
            <br />
            <span className="text-ink-3">No credit card to start. Cancel in one click. Annual billing saves 20%.</span>
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-2xl p-7 transition-all hover:-translate-y-1 ${
                t.featured
                  ? "border border-transparent shadow-[0_24px_64px_rgba(61,91,255,0.25)] [background:linear-gradient(theme(colors.bg.1),theme(colors.bg.1))_padding-box,linear-gradient(135deg,#3D5BFF,#9B7BFF)_border-box]"
                  : "border border-line-1 bg-bg-1 hover:border-line-2"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 right-5 rounded-full grad-aurora px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white shadow-lg">
                  Most loved
                </span>
              )}

              <div>
                <div className="text-xs font-medium uppercase tracking-[0.1em] text-ink-3">
                  {t.name}
                </div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-[42px] font-semibold leading-none tracking-[-0.02em]">
                    {t.price}
                  </span>
                  <span className="text-sm text-ink-3">{t.suffix}</span>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-3">{t.blurb}</p>
              </div>

              <ul className="my-6 flex-1 space-y-2.5 text-sm text-ink-2">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={14} strokeWidth={2.5} className="mt-0.5 shrink-0 text-success" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={t.href}
                className={`block rounded-lg px-4 py-2.5 text-center text-sm font-medium transition ${
                  t.featured
                    ? "grad-aurora text-white shadow-[0_8px_24px_rgba(61,91,255,0.35)] hover:-translate-y-px"
                    : "border border-line-2 bg-bg-2 text-ink-1 hover:bg-bg-3"
                }`}
              >
                {t.cta} →
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-ink-3">
          All plans include unlimited team members on a shared workspace ·
          Data residency: US-East or EU-West · Cancel anytime
        </p>
      </div>
    </section>
  );
}
