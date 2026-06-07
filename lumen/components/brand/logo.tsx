export function Logo({ size = 18 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2.5 text-[18px] font-semibold tracking-[-0.02em] text-ink-1">
      <span
        aria-hidden
        className="rounded-full grad-aurora shadow-[0_0_16px_rgba(155,123,255,0.8)]"
        style={{ width: size, height: size }}
      />
      lumen
    </span>
  );
}
