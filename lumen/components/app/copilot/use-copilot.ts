"use client";
import { useCallback, useRef, useState } from "react";

/** Stream event types — mirrors the NDJSON contract in docs/08-ai-copilot.md */
export type StreamEvent =
  | { type: "user_message"; content: string }
  | { type: "message.start"; message_id: string }
  | { type: "token"; delta: string }
  | { type: "tool.start"; tool_id: string; tool: string; args: unknown; kind: string }
  | { type: "tool.progress"; tool_id: string; message: string }
  | { type: "tool.end"; tool_id: string; tool?: string; result?: unknown; duration_ms: number; ok: boolean }
  | { type: "approval.needed"; step_id: string; tool: string; preview: Record<string, unknown> }
  | { type: "message.end"; usage?: { prompt_tokens: number; completion_tokens: number } }
  | { type: "done" };

export function useCopilot() {
  const [events, setEvents] = useState<StreamEvent[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (prompt: string) => {
    setEvents((e) => [...e, { type: "user_message", content: prompt }]);
    setIsStreaming(true);
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await fetch("/api/copilot/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
        signal: ctrl.signal,
      });
      if (!res.body) throw new Error("No stream");

      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          try { setEvents((e) => [...e, JSON.parse(line) as StreamEvent]); } catch { /* ignore partial */ }
        }
      }
    } catch (err: unknown) {
      if (!(err instanceof DOMException && err.name === "AbortError")) {
        setEvents((e) => [...e, { type: "token", delta: " (stream error)" }]);
      }
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  }, []);

  const cancel = useCallback(() => abortRef.current?.abort(), []);

  const approve = useCallback(async (stepId: string, decision: "approve" | "cancel") => {
    await fetch(`/api/copilot/approvals/${stepId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decision }),
    });
  }, []);

  return { events, isStreaming, sendMessage, cancel, approve };
}
