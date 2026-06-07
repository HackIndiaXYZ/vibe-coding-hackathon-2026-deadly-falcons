/**
 * Copilot stream — newline-delimited JSON events.
 *
 * Self-contained demo stream: deterministic plan + simulated tool calls +
 * canned synthesis text. Zero external dependencies. Identical UX whether or
 * not you have an OpenAI key — perfect for hackathon / preview.
 */
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ToolSpec { tool: string; kind: string; duration: number; }

/** Pick a believable plan for a prompt — keyword-based, no LLM needed. */
function planFor(prompt: string): { tools: ToolSpec[]; needsApproval: boolean; intent: string } {
  const p = prompt.toLowerCase();
  if (p.includes("board") || p.includes("investor") || p.includes("update")) {
    return {
      intent: "investor_update",
      tools: [
        { tool: "gcal.find_event", kind: "read", duration: 380 },
        { tool: "stripe.get_metrics", kind: "read", duration: 720 },
        { tool: "linear.list_progress", kind: "read", duration: 540 },
      ],
      needsApproval: true,
    };
  }
  if (p.includes("calendar") || p.includes("schedule") || p.includes("meeting")) {
    return {
      intent: "calendar",
      tools: [
        { tool: "gcal.list_events", kind: "read", duration: 320 },
        { tool: "gcal.find_free_time", kind: "read", duration: 280 },
      ],
      needsApproval: false,
    };
  }
  if (p.includes("email") || p.includes("inbox") || p.includes("reply") || p.includes("draft")) {
    return {
      intent: "inbox",
      tools: [
        { tool: "gmail.list_unread", kind: "read", duration: 410 },
        { tool: "memory.recall", kind: "read", duration: 220 },
        { tool: "gmail.draft_reply", kind: "write", duration: 600 },
      ],
      needsApproval: true,
    };
  }
  return {
    intent: "general",
    tools: [
      { tool: "memory.recall", kind: "read", duration: 260 },
      { tool: "notion.search", kind: "read", duration: 440 },
    ],
    needsApproval: false,
  };
}

/** Synthesized closing text per intent — used when no OpenAI key is set. */
function closingFor(intent: string): string[] {
  const map: Record<string, string> = {
    investor_update:
      "I pulled this month's metrics, summarized Linear progress, and identified attendees. I'll draft the prep doc in Notion once you approve, then schedule a 60-min prep block tomorrow morning.",
    calendar:
      "You have a packed afternoon — three back-to-back meetings starting at 1pm. Your next free block is Thursday 10am for 90 minutes. Want me to protect that on your calendar?",
    inbox:
      "I triaged 12 unread emails: 8 newsletters archived, 2 investor replies drafted, and 2 customer issues escalated to your inbox. Open the drafts to review before they send.",
    general:
      "Done. I checked your memory and recent docs for context. Anything else you'd like me to pull together?",
  };
  return (map[intent] ?? map.general).split(/(\s+)/);
}

export async function POST(req: NextRequest) {
  const { prompt } = await req.json().catch(() => ({ prompt: "" }));
  const plan = planFor(String(prompt ?? ""));

  const encoder = new TextEncoder();
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const write = (ctrl: ReadableStreamDefaultController, obj: object) =>
    ctrl.enqueue(encoder.encode(JSON.stringify(obj) + "\n"));

  const stream = new ReadableStream({
    async start(ctrl) {
      try {
        write(ctrl, { type: "message.start", message_id: `msg_${Date.now()}` });
        await sleep(120);

        // Brief opening tokens
        for (const t of ["Reading", " your", " context", "…"]) {
          write(ctrl, { type: "token", delta: t });
          await sleep(70);
        }

        // Execute tool calls
        let tid = 0;
        for (const t of plan.tools) {
          const id = `tc_${++tid}`;
          write(ctrl, { type: "tool.start", tool_id: id, tool: t.tool, args: {}, kind: t.kind });
          await sleep(t.duration);
          write(ctrl, { type: "tool.end", tool_id: id, ok: true, duration_ms: t.duration });
        }

        // Approval gate (if write/send/schedule was in the plan)
        if (plan.needsApproval) {
          await sleep(160);
          write(ctrl, {
            type: "approval.needed",
            step_id: `step_${Date.now()}`,
            tool: plan.intent === "inbox" ? "gmail.draft_reply" : "notion.create_page",
            preview:
              plan.intent === "inbox"
                ? { to: ["maya@founders.fund"], subject: "Re: bridge round timing", body: "Hi Maya — appreciate the heads-up…" }
                : { title: "Board Prep · Jun 11", parent: "Board", sections: ["Metrics", "Shipped", "Asks"] },
          });
        }

        await sleep(140);

        // Stream the closing summary token-by-token (canned, intent-aware)
        for (const t of closingFor(plan.intent)) {
          write(ctrl, { type: "token", delta: t });
          await sleep(28);
        }

        write(ctrl, { type: "message.end" });
        write(ctrl, { type: "done" });
      } finally {
        ctrl.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
