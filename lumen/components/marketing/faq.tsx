"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Is my data used to train AI models?",
    a: "Never. Your messages, documents, and integrations are isolated to your workspace and never used to train any model — ours or any third party's. You can wipe Lumen's memory of you at any time from Settings.",
  },
  {
    q: "What happens when Lumen makes a mistake?",
    a: "Lumen never sends, deletes, charges, or schedules without your explicit approval — these are hard-coded safety rails. You see every step before it runs. Every action is reversible and audit-logged. In 6 months of beta, zero unauthorized actions.",
  },
  {
    q: "Which integrations do you support?",
    a: "Day-one: Gmail, Google Calendar, Notion, Linear, Stripe, Slack. Shipping every two weeks: GitHub, HubSpot, Intercom, Figma, Vercel, Mixpanel, and more. Need a specific one? Request it from Settings — we ship requests with 5+ votes within 14 days.",
  },
  {
    q: "How is this different from Notion AI or ChatGPT?",
    a: "Notion AI writes inside Notion. ChatGPT chats. Lumen acts — it reads from and writes to all your tools, with memory of you and your company. You describe an outcome; it ships the work end-to-end.",
  },
  {
    q: "What does it cost to actually run?",
    a: "Free forever for solo founders (50 AI actions/month, 2 integrations). Pro is $29/month for unlimited actions and all integrations. Team is $99/seat/month. Enterprise is custom. Most founders break even on Pro in the first week.",
  },
  {
    q: "Can I self-host?",
    a: "Self-hosting is available on the Enterprise plan, with full SSO/SAML, SCIM, VPC deployment, and a dedicated customer success engineer. Email enterprise@lumen.app to learn more.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <div className="mb-3 text-xs uppercase tracking-[0.12em] text-accent-400">
            Frequently asked
          </div>
          <h2 className="text-3xl font-semibold tracking-[-0.025em] md:text-4xl">
            Everything else you&apos;re wondering.
          </h2>
        </div>

        <div className="divide-y divide-line-1 overflow-hidden rounded-2xl border border-line-1 bg-bg-1">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-bg-2"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] font-medium text-ink-1">{f.q}</span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 text-ink-3 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-accent-400" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-sm leading-relaxed text-ink-2">{f.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-ink-3">
          Still have questions?{" "}
          <a className="text-accent-400 hover:text-accent-500" href="mailto:hello@lumen.app">
            Talk to a real human →
          </a>
        </p>
      </div>
    </section>
  );
}
