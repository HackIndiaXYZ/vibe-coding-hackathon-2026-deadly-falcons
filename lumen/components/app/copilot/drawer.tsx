"use client";
import { useState } from "react";
import { X, Plus, History, Sparkles } from "lucide-react";
import { Composer } from "./composer";
import { MessageStream } from "./message-stream";
import { useCopilot } from "./use-copilot";

const suggestions = [
  "Get me ready for Thursday's board meeting",
  "Draft this week's investor update",
  "Triage my inbox — drafts only",
  "What changed in the business this week?",
];

export function CopilotDrawer({ onClose }: { onClose: () => void }) {
  const { events, isStreaming, sendMessage, cancel, approve } = useCopilot();
  const [resetKey, setResetKey] = useState(0);

  const hasMessages = events.length > 0;

  const handleNew = () => {
    setResetKey((k) => k + 1);
    // Force a new copilot session by re-mounting (clears events)
  };

  return (
    <aside
      key={resetKey}
      className="flex min-h-0 flex-col border-l border-line-1 bg-bg-1 max-lg:hidden"
      aria-label="Lumen copilot"
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-line-1 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg grad-aurora shadow-[0_0_12px_rgba(155,123,255,0.7)]">
            <Sparkles size={13} className="text-white" />
          </span>
          <div className="leading-tight">
            <div className="text-[13px] font-semibold text-ink-1">Lumen</div>
            <div className="text-[10.5px] text-ink-3">AI chief of staff · gpt-4o</div>
          </div>
        </div>
        <div className="flex gap-1">
          <button
            title="New conversation"
            onClick={handleNew}
            className="grid h-7 w-7 place-items-center rounded-md text-ink-3 transition hover:bg-bg-3 hover:text-ink-1"
          >
            <Plus size={14} />
          </button>
          <button
            title="History"
            className="grid h-7 w-7 place-items-center rounded-md text-ink-3 transition hover:bg-bg-3 hover:text-ink-1"
          >
            <History size={14} />
          </button>
          <button
            title="Close (⌘J)"
            onClick={onClose}
            className="grid h-7 w-7 place-items-center rounded-md text-ink-3 transition hover:bg-bg-3 hover:text-ink-1"
          >
            <X size={14} />
          </button>
        </div>
      </header>

      {/* Context chips */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-line-1 px-4 py-2.5">
        <span className="mr-1 text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
          Context
        </span>
        {["Q3 metrics", "Last board deck", "Sarah Chen", "+4"].map((c) => (
          <span
            key={c}
            className="inline-flex items-center gap-1 rounded-full border border-line-2 bg-bg-3 px-2 py-0.5 text-[11px] text-ink-2 before:text-[10px] before:text-accent-400 before:content-['◈']"
          >
            {c}
          </span>
        ))}
      </div>

      {/* Stream / empty state */}
      {hasMessages ? (
        <MessageStream events={events} onApprove={approve} />
      ) : (
        <EmptyState
          suggestions={suggestions}
          onPick={(s) => sendMessage(s)}
        />
      )}

      <Composer disabled={isStreaming} onSubmit={sendMessage} onCancel={cancel} />
    </aside>
  );
}

function EmptyState({
  suggestions,
  onPick,
}: {
  suggestions: string[];
  onPick: (s: string) => void;
}) {
  return (
    <div className="flex flex-1 flex-col justify-end gap-5 overflow-y-auto p-4">
      <div className="text-center">
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl grad-aurora shadow-[0_8px_32px_rgba(155,123,255,0.4)]">
          <Sparkles size={20} className="text-white" />
        </div>
        <h3 className="text-[15px] font-semibold text-ink-1">What can I do for you?</h3>
        <p className="mx-auto mt-1 max-w-xs text-[12px] leading-relaxed text-ink-3">
          Describe an outcome in plain English. I&apos;ll plan the steps, run the tools,
          and ask before sending anything.
        </p>
      </div>

      <div>
        <div className="mb-2 text-[10.5px] uppercase tracking-[0.08em] text-ink-3">
          Try one of these
        </div>
        <div className="flex flex-col gap-1.5">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => onPick(s)}
              className="group flex items-center justify-between gap-2 rounded-lg border border-line-1 bg-bg-2 px-3 py-2.5 text-left text-[13px] text-ink-2 transition hover:border-accent-500/40 hover:bg-bg-3 hover:text-ink-1"
            >
              <span className="flex items-center gap-2">
                <Sparkles size={11} className="text-accent-400" />
                {s}
              </span>
              <span className="text-ink-4 opacity-0 transition group-hover:opacity-100">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
