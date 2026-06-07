"use client";
import { useEffect, useState } from "react";

type Toast = { id: number; text: string; kind: "info" | "success" | "error" };

let counter = 0;
const subscribers: Array<(t: Toast[]) => void> = [];
let current: Toast[] = [];

function emit(text: string, kind: Toast["kind"]) {
  const t: Toast = { id: ++counter, text, kind };
  current = [...current, t];
  subscribers.forEach((fn) => fn(current));
  setTimeout(() => {
    current = current.filter((x) => x.id !== t.id);
    subscribers.forEach((fn) => fn(current));
  }, 3000);
}

export const toast = {
  success: (text: string) => emit(text, "success"),
  error:   (text: string) => emit(text, "error"),
  info:    (text: string) => emit(text, "info"),
};

export function Toaster() {
  const [items, setItems] = useState<Toast[]>([]);
  useEffect(() => {
    subscribers.push(setItems);
    return () => { const i = subscribers.indexOf(setItems); if (i >= 0) subscribers.splice(i, 1); };
  }, []);
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {items.map((t) => (
        <div
          key={t.id}
          role="status"
          className={`pointer-events-auto min-w-[240px] max-w-sm rounded-lg border bg-bg-2 px-4 py-3 text-sm shadow-lg animate-fade-up ${
            t.kind === "success" ? "border-success/40 text-ink-1"
            : t.kind === "error" ? "border-danger/40 text-ink-1"
            : "border-line-2 text-ink-1"
          }`}
        >
          {t.text}
        </div>
      ))}
    </div>
  );
}
