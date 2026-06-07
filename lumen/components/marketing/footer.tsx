import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Twitter, Github, Linkedin } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="border-t border-line-1 bg-bg-1/40 px-6 pb-10 pt-16 text-sm text-ink-3">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs leading-relaxed">
              The AI chief of staff for founders.
              <br />
              Built in San Francisco. Trusted in 40+ countries.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
                { icon: Github, label: "GitHub", href: "https://github.com" },
                { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
              ].map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-line-1 bg-bg-1 text-ink-3 transition hover:border-line-2 hover:text-ink-1"
                >
                  <Icon size={14} />
                </Link>
              ))}
            </div>
          </div>

          {[
            {
              h: "Product",
              links: [
                ["Features", "#features"],
                ["How it works", "#how"],
                ["Pricing", "#pricing"],
                ["Changelog", "/changelog"],
                ["Roadmap", "/roadmap"],
              ],
            },
            {
              h: "Company",
              links: [
                ["About", "/about"],
                ["Careers", "/careers"],
                ["Press kit", "/press"],
                ["Contact", "mailto:hello@lumen.app"],
              ],
            },
            {
              h: "Resources",
              links: [
                ["Documentation", "/docs"],
                ["API reference", "/docs/api"],
                ["Help center", "/help"],
                ["Status", "https://status.lumen.app"],
              ],
            },
            {
              h: "Legal",
              links: [
                ["Privacy", "/privacy"],
                ["Terms", "/terms"],
                ["Security", "/security"],
                ["DPA", "/dpa"],
              ],
            },
          ].map(({ h, links }) => (
            <div key={h}>
              <h4 className="mb-4 text-xs font-medium uppercase tracking-[0.1em] text-ink-2">
                {h}
              </h4>
              <ul className="space-y-2.5">
                {links.map(([t, href]) => (
                  <li key={t}>
                    <Link href={href} className="transition-colors hover:text-ink-1">
                      {t}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-line-1 pt-6 text-xs text-ink-4">
          <span>© 2026 Lumen Labs, Inc. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            All systems normal · <Link href="https://status.lumen.app" className="hover:text-ink-2">status.lumen.app</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
