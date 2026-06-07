"use client";
import { useEffect } from "react";

/** Lightweight hotkey: "mod+k" → ctrl/cmd+K. Multi-binding via comma. */
export function useHotkey(combo: string, handler: (e: KeyboardEvent) => void) {
  useEffect(() => {
    const parts = combo.toLowerCase().split("+");
    const key = parts[parts.length - 1];
    const needMod = parts.includes("mod");
    const needShift = parts.includes("shift");
    const needAlt = parts.includes("alt");

    const fn = (e: KeyboardEvent) => {
      if (needMod && !(e.metaKey || e.ctrlKey)) return;
      if (needShift && !e.shiftKey) return;
      if (needAlt && !e.altKey) return;
      if (e.key.toLowerCase() !== key) return;
      e.preventDefault();
      handler(e);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [combo, handler]);
}
