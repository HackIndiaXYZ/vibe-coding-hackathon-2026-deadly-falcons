"use client";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { StreamEvent } from "./use-copilot";
import { AlertTriangle, Check } from "lucide-react";

interface Props {
  events: StreamEvent[];
  onApprove: (stepId: string, decision: "approve" | "cancel") => void;
}

export function MessageStream({ events, onApprove }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [events.length]);

  // Pre-compute: which tool_ids have ended? (so we don't render duplicate cards)
  const endedToolIds = new Set(
    events
      .filter((e): e is Extract<StreamEvent, { type: "tool.end" }> => e.type === "tool.end")
      .map((e) => e.tool_id)
  );

  // Pre-compute: tool_id -> tool name (from tool.start) so tool.end can show the name
  const toolNameById = new Map<string, string>();
  for (const e of events) {
    if (e.type === "tool.start") toolNameById.set(e.tool_id, e.tool);
  }

  let assistantBuf = "";
  const rendered: React.ReactNode[] = [];

  const flush = (i: number, streaming: boolean) => {
    if (!assistantBuf) return;
    rendered.push(<AssistantMsg key={`a-${i}`} text={assistantBuf} streaming={streaming} />);
    assistantBuf = "";
  };

  events.forEach((e, i) => {
    if (e.type === "user_message") {
      flush(i, false);
      rendered.push(<UserMsg key={`u-${i}`} text={e.content} />);
    } else if (e.type === "token") {
      assistantBuf += e.delta;
    } else if (e.type === "tool.start") {
      flush(i, false);
      // Only render as running if no tool.end has arrived yet for this id
      if (!endedToolIds.has(e.tool_id)) {
        rendered.push(<ToolCard key={`t-${e.tool_id}`} tool={e.tool} state="run" />);
      }
    } else if (e.type === "tool.end") {
      const name = e.tool ?? toolNameById.get(e.tool_id) ?? "";
      rendered.push(
        <ToolCard
          key={`te-${e.tool_id}`}
          tool={name}
          state={e.ok ? "ok" : "err"}
          duration={e.duration_ms}
        />
      );
    } else if (e.type === "approval.needed") {
      flush(i, false);
      rendered.push(
        <ApprovalCard
          key={`ap-${i}`}
          tool={e.tool}
          preview={e.preview}
          onAction={(d) => onApprove(e.step_id, d)}
        />
      );
    }
  });

  if (assistantBuf) {
    rendered.push(<AssistantMsg key="a-tail" text={assistantBuf} streaming />);
  }

  return (
    <div ref={ref} className="flex flex-1 flex-col gap-3.5 overflow-auto px-[18px] py-[18px]">
      <AnimatePresence initial={false}>{rendered}</AnimatePresence>
    </div>
  );
}

function UserMsg({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="ml-auto max-w-[90%] self-end rounded-2xl rounded-br-sm border border-line-2 bg-bg-3 px-3 py-2.5 text-[13.5px] leading-relaxed"
    >
      {text}
    </motion.div>
  );
}

function AssistantMsg({ text, streaming }: { text: string; streaming: boolean }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18 }}
      className="text-[13.5px] leading-relaxed text-ink-1"
    >
      {text}
      {streaming && (
        <span className="ml-0.5 inline-block h-3.5 w-[2px] align-middle bg-brand-400 shadow-[0_0_6px_#5F7DFF] animate-pulse" />
      )}
    </motion.p>
  );
}

function ToolCard({
  tool,
  state,
  duration,
}: {
  tool: string;
  state: "run" | "ok" | "err";
  duration?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-2.5 rounded-lg border border-line-1 bg-bg-2 px-3 py-2.5 font-mono text-xs text-ink-2"
    >
      {state === "ok" && (
        <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-success text-[9px] font-bold text-black">
          <Check size={9} strokeWidth={3} />
        </span>
      )}
      {state === "run" && (
        <span className="h-3 w-3 animate-spin rounded-full border-2 border-line-2 border-t-accent-500" />
      )}
      {state === "err" && (
        <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-danger text-[9px] font-bold text-white">
          !
        </span>
      )}
      <span className="flex-1">{tool}</span>
      {duration != null && (
        <span className="font-sans text-[11px] text-ink-3">{(duration / 1000).toFixed(1)}s</span>
      )}
    </motion.div>
  );
}

function ApprovalCard({
  tool,
  preview,
  onAction,
}: {
  tool: string;
  preview: Record<string, unknown>;
  onAction: (d: "approve" | "cancel") => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-xl border border-warning/40 bg-gradient-to-b from-warning/10 to-transparent p-3.5"
    >
      <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-warning">
        <AlertTriangle size={12} /> Approval needed · {tool}
      </div>
      <p className="mb-2.5 text-[13px] text-ink-2">Lumen wants to perform a write action.</p>
      <pre className="relative mb-2.5 max-h-20 overflow-hidden rounded-md border border-line-1 bg-bg-2 p-2.5 text-xs text-ink-2">
        {JSON.stringify(preview, null, 2)}
        <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-bg-2" />
      </pre>
      <div className="flex gap-1.5">
        <button
          onClick={() => onAction("cancel")}
          className="flex-1 rounded-md border border-line-2 bg-bg-2 px-2 py-1.5 text-xs text-ink-1 transition hover:bg-bg-3"
        >
          Cancel
        </button>
        <button
          onClick={() => onAction("approve")}
          className="flex-[2] rounded-md grad-aurora px-2 py-1.5 text-xs font-medium text-white transition hover:-translate-y-px"
        >
          Approve &amp; continue
        </button>
      </div>
    </motion.div>
  );
}
