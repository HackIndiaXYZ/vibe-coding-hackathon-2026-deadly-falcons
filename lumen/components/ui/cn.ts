/** Tiny class-name merger — replaces clsx + tailwind-merge.
 *  Accepts strings/arrays/objects, returns a deduplicated space-joined string. */
export function cn(...args: Array<string | number | false | null | undefined | Record<string, unknown> | (string | false | null | undefined)[]>): string {
  const parts: string[] = [];
  const push = (v: unknown): void => {
    if (!v) return;
    if (typeof v === "string" || typeof v === "number") parts.push(String(v));
    else if (Array.isArray(v)) v.forEach(push);
    else if (typeof v === "object") {
      for (const [k, val] of Object.entries(v as Record<string, unknown>)) if (val) parts.push(k);
    }
  };
  args.forEach(push);
  // de-dup while preserving last occurrence (so overrides win)
  const seen = new Set<string>();
  const out: string[] = [];
  for (let i = parts.length - 1; i >= 0; i--) {
    for (const tok of parts[i].split(/\s+/).filter(Boolean)) {
      if (!seen.has(tok)) { seen.add(tok); out.unshift(tok); }
    }
  }
  return out.join(" ");
}
