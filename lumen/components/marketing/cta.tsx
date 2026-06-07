import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="px-6 pb-32">
      <div className="mx-auto max-w-6xl">
        <div
          className="relative overflow-hidden rounded-3xl border border-line-2 p-12 text-center md:p-20"
          style={{
            background:
              "linear-gradient(135deg, rgba(61,91,255,0.22), rgba(155,123,255,0.22))",
          }}
        >
          {/* Glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, rgba(155,123,255,.28), transparent 60%)",
            }}
          />
          {/* Grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px)",
              backgroundSize: "32px 32px",
              maskImage: "radial-gradient(ellipse at center, #000 30%, transparent 70%)",
            }}
          />

          <div className="relative">
            <h2 className="text-[clamp(28px,4vw,48px)] font-semibold leading-tight tracking-[-0.02em]">
              Your time is the asset.
              <br />
              <span className="grad-dawn grad-text">Lumen protects it.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-ink-2">
              90 seconds to sign up. The first magic moment lands before your coffee gets cold.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/login"
                className="group inline-flex items-center gap-2 rounded-xl grad-aurora px-6 py-3.5 text-sm font-medium text-white shadow-[0_8px_24px_rgba(61,91,255,0.35)] transition hover:-translate-y-px"
              >
                Start free
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="mailto:hello@lumen.app"
                className="rounded-xl border border-line-2 bg-bg-2/70 px-6 py-3.5 text-sm font-medium text-ink-1 backdrop-blur transition hover:bg-bg-3"
              >
                Book a 15-min walkthrough
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-ink-3">
              <span>No credit card</span>
              <span className="text-ink-4">·</span>
              <span>Free forever for solo founders</span>
              <span className="text-ink-4">·</span>
              <span>Setup in 90 seconds</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
