"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Button, Input, toast } from "@/components/ui";
import { Sparkles, Check } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    toast.success("Welcome to Lumen — taking you to your workspace…");
    setTimeout(() => router.push("/home"), 700);
  }

  function handleGoogle() {
    setLoading(true);
    toast.success("Demo mode — signing you in…");
    setTimeout(() => router.push("/home"), 600);
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left side — social proof (desktop only) */}
      <aside className="relative hidden overflow-hidden border-r border-line-1 bg-bg-1 p-12 lg:flex lg:flex-col lg:justify-between">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage: `
              radial-gradient(40% 35% at 20% 25%, rgba(61,91,255,0.35), transparent 60%),
              radial-gradient(35% 30% at 80% 70%, rgba(155,123,255,0.30), transparent 65%)`,
          }}
        />

        <div className="relative">
          <Logo size={22} />
        </div>

        <div className="relative max-w-md">
          <Sparkles size={28} className="mb-4 text-accent-400" />
          <h2 className="text-3xl font-semibold leading-tight tracking-[-0.02em]">
            &ldquo;Lumen replaced a chief of staff hire we were about to make. We&apos;re
            six months ahead of plan because of it.&rdquo;
          </h2>
          <div className="mt-6 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#FF7AB6] to-[#9B7BFF] text-sm font-semibold text-white shadow-md">
              MR
            </div>
            <div className="text-sm">
              <div className="font-medium text-ink-1">Maya Rajan</div>
              <div className="text-ink-3">CEO, Folio · YC W25</div>
            </div>
          </div>
        </div>

        <div className="relative grid grid-cols-3 gap-4 text-center">
          {[
            { v: "5.2k+", l: "founders" },
            { v: "12 hrs", l: "saved/wk" },
            { v: "4.9 ★", l: "reviews" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-xl font-semibold tracking-tight">{s.v}</div>
              <div className="mt-0.5 text-[11px] text-ink-3">{s.l}</div>
            </div>
          ))}
        </div>
      </aside>

      {/* Right side — form */}
      <main className="relative flex items-center justify-center px-6 py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40 lg:hidden"
          style={{
            backgroundImage:
              "radial-gradient(50% 40% at 50% 0%, rgba(155,123,255,0.30), transparent 60%)",
          }}
        />

        <div className="relative w-full max-w-sm">
          <div className="mb-8 flex justify-center lg:hidden">
            <Logo size={22} />
          </div>

          <h1 className="text-center text-[28px] font-semibold tracking-[-0.02em]">
            Sign in to Lumen
          </h1>
          <p className="mt-2 text-center text-sm text-ink-3">
            Pick up where you left off. New here?{" "}
            <span className="text-accent-400">It just works.</span>
          </p>

          <Button
            variant="secondary"
            className="mt-8 h-11 w-full"
            onClick={handleGoogle}
            disabled={loading}
          >
            <GoogleIcon /> Continue with Google
          </Button>

          <div className="my-6 flex items-center gap-3 text-xs text-ink-4">
            <div className="h-px flex-1 bg-line-1" /> or email <div className="h-px flex-1 bg-line-1" />
          </div>

          <form onSubmit={handleMagicLink} className="space-y-3">
            <Input
              type="email"
              required
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
              disabled={loading}
            />
            <Button type="submit" className="h-11 w-full" disabled={loading}>
              {loading ? "Signing in…" : "Continue with email"}
            </Button>
          </form>

          {/* Trust line */}
          <div className="mt-6 space-y-1.5 rounded-xl border border-line-1 bg-bg-1 p-3.5 text-[11.5px] text-ink-3">
            {[
              "Free forever for solo founders",
              "Your data never trains our models",
              "Cancel any time in one click",
            ].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <Check size={11} className="text-success" />
                {t}
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-[11px] text-ink-4">
            Demo mode — any email signs you in ·{" "}
            <Link href="/" className="underline hover:text-ink-2">
              back to landing
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.25-1.62 3.66-5.5 3.66-3.31 0-6-2.74-6-6.12s2.69-6.12 6-6.12c1.88 0 3.14.8 3.86 1.48l2.63-2.54C16.86 2.96 14.62 2 12 2 6.96 2 2.85 6.06 2.85 11.04S6.96 20.08 12 20.08c6.92 0 9.15-4.85 9.15-7.34 0-.5-.05-.88-.12-1.25H12z"
      />
    </svg>
  );
}
