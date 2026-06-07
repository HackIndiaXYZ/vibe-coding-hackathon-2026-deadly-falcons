"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { ProductMock } from "./product-mock";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1], delay },
});

export function Hero() {
  return (
    <header className="relative overflow-hidden px-6 pb-32 pt-20 text-center">
      {/* Aurora */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-[20%] -top-[20%] -z-0 h-[120%] opacity-60 blur-3xl"
        style={{
          backgroundImage: `
            radial-gradient(40% 30% at 20% 30%, rgba(61,91,255,0.55), transparent 60%),
            radial-gradient(35% 30% at 75% 25%, rgba(155,123,255,0.50), transparent 65%),
            radial-gradient(45% 35% at 50% 80%, rgba(255,122,182,0.32), transparent 70%)`,
        }}
      />
      {/* Grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, #000 30%, transparent 80%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Eyebrow badge */}
        <motion.div
          {...fade(0)}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-line-2 bg-bg-2/70 px-3 py-1.5 text-xs text-ink-2 backdrop-blur"
        >
          <Sparkles size={12} className="text-accent-400" />
          <span>Now in private beta</span>
          <span className="mx-1 h-3 w-px bg-line-2" />
          <span className="text-ink-3">Backed by founders from YC, Lightspeed, Sequoia</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fade(0.08)}
          className="mx-auto max-w-4xl text-[clamp(40px,7vw,76px)] font-semibold leading-[1.04] tracking-[-0.035em]"
        >
          Run your company
          <br />
          <span className="grad-dawn grad-text">in plain English.</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          {...fade(0.16)}
          className="mx-auto mt-6 max-w-[620px] text-lg leading-relaxed text-ink-2"
        >
          Lumen is the AI chief of staff for founders. Describe what you want done —
          updates, replies, prep, follow-ups — and it executes across Gmail, Stripe,
          Linear, Notion, and Slack. In seconds. With your approval on anything that matters.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fade(0.24)}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href="/login"
            className="group inline-flex items-center gap-2 rounded-xl grad-aurora px-6 py-3.5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(61,91,255,0.35)] transition hover:-translate-y-px hover:shadow-[0_12px_32px_rgba(61,91,255,0.45)]"
          >
            Start free — no card required
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="#how"
            className="inline-flex items-center gap-2 rounded-xl border border-line-2 bg-bg-2/70 px-6 py-3.5 text-sm font-medium text-ink-1 backdrop-blur transition hover:bg-bg-3"
          >
            <Play size={14} className="text-accent-400" fill="currentColor" />
            Watch 90-second demo
          </Link>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          {...fade(0.32)}
          className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-ink-3"
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            Free forever for solo founders
          </span>
          <span className="text-ink-4">·</span>
          <span>SOC 2 in progress</span>
          <span className="text-ink-4">·</span>
          <span>Your data never trains our models</span>
          <span className="text-ink-4">·</span>
          <span>Cancel anytime</span>
        </motion.div>

        {/* Product mock */}
        <motion.div {...fade(0.4)} className="mt-14">
          <ProductMock />
        </motion.div>

        {/* Stats below mock */}
        <motion.div
          {...fade(0.5)}
          className="mt-16 grid max-w-3xl mx-auto grid-cols-2 gap-6 border-y border-line-1 py-8 md:grid-cols-4"
        >
          {[
            { v: "5,200+", l: "founders on the waitlist" },
            { v: "12 hrs", l: "saved per week, average" },
            { v: "30+", l: "tools connected" },
            { v: "4.9 ★", l: "in early-access reviews" },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-2xl font-semibold tracking-tight md:text-3xl">{s.v}</div>
              <div className="mt-1 text-xs text-ink-3">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </header>
  );
}
