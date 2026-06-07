"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "@/components/brand/logo";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all ${
          scrolled
            ? "border-b border-line-1 bg-bg-0/75 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" aria-label="Lumen — home">
            <Logo />
          </Link>

          <div className="hidden items-center gap-8 text-sm text-ink-2 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="transition-colors hover:text-ink-1"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden rounded-md px-3 py-2 text-sm text-ink-2 transition hover:bg-bg-2 hover:text-ink-1 sm:inline-block"
            >
              Sign in
            </Link>
            <Link
              href="/login"
              className="hidden items-center gap-1.5 rounded-md grad-aurora px-4 py-2 text-sm font-medium text-white shadow-[0_8px_24px_rgba(61,91,255,0.35)] transition hover:-translate-y-px sm:inline-flex"
            >
              Get Lumen
              <ArrowRight size={14} />
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-md border border-line-2 bg-bg-2 text-ink-1 md:hidden"
              aria-label="Open menu"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 bg-bg-0/70 backdrop-blur-md"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm border-l border-line-2 bg-bg-1 p-6 shadow-2xl animate-fade-up">
            <div className="mb-8 flex items-center justify-between">
              <Logo />
              <button
                onClick={() => setMobileOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-md border border-line-2 bg-bg-2 text-ink-1"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-base text-ink-1 transition hover:bg-bg-2"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="mt-8 space-y-2 border-t border-line-1 pt-6">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg border border-line-2 bg-bg-2 px-4 py-3 text-center text-sm text-ink-1"
              >
                Sign in
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg grad-aurora px-4 py-3 text-center text-sm font-medium text-white"
              >
                Get Lumen →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
