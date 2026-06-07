"use client";
import { useRef, useState } from "react";
import { Mic, ArrowUp, Square } from "lucide-react";

interface Props { disabled: boolean; onSubmit: (text: string) => void; onCancel: () => void; }

export function Composer({ disabled, onSubmit, onCancel }: Props) {
  const [text, setText] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  const send = () => {
    const t = text.trim();
    if (!t) return;
    setText("");
    onSubmit(t);
    ref.current?.focus();
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") { e.preventDefault(); send(); }
  };

  return (
    <div className="border-t border-line-1 bg-bg-1 px-[18px] py-3.5">
      <div className="flex items-end gap-2 rounded-xl border border-line-2 bg-bg-2 px-2.5 py-2 transition-colors focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500/15">
        <textarea
          ref={ref}
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKey}
          placeholder="Ask Lumen…  describe an outcome"
          className="max-h-[120px] min-h-[24px] flex-1 resize-none border-0 bg-transparent text-[13.5px] leading-relaxed text-ink-1 outline-none placeholder:text-ink-4"
        />
        <button title="Voice (hold)" className="grid h-[30px] w-[30px] place-items-center rounded-lg text-ink-3 transition hover:bg-bg-3 hover:text-ink-1">
          <Mic size={14} />
        </button>
        {disabled ? (
          <button onClick={onCancel} title="Stop" className="grid h-[30px] w-[30px] place-items-center rounded-lg bg-danger text-white"><Square size={12} fill="currentColor" /></button>
        ) : (
          <button onClick={send} title="Send (⌘⏎)" className="grid h-[30px] w-[30px] place-items-center rounded-lg grad-aurora text-white"><ArrowUp size={14} /></button>
        )}
      </div>
      <div className="mt-1.5 flex justify-between text-[11px] text-ink-4">
        <span>⌘⏎ to send · ⌘⇧J for new</span>
        <span>gpt-4o · 4 tools active</span>
      </div>
    </div>
  );
}
