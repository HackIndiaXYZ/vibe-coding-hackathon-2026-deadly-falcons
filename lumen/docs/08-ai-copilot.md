# 08 · AI Copilot

> The product *is* the agent. In this build it runs entirely in the Next.js route
> handler — no separate service required.

---

## 1. Mental model

```
   User prompt (text)
        │
        ▼
┌────────────────────┐
│  Intent classifier │   keyword-based in demo, LLM-based in prod
└─────────┬──────────┘
          ▼
┌────────────────────┐
│  Plan (steps)      │   deterministic per-intent in demo
└─────────┬──────────┘
          ▼
┌────────────────────┐
│  Stream tool calls │   simulated durations for demo realism
└─────────┬──────────┘
          ▼
┌────────────────────┐
│  Approval gate     │   if any step is write / send / schedule
└─────────┬──────────┘
          ▼
┌────────────────────┐
│  Synthesis tokens  │   GPT if key set, canned text otherwise
└─────────┬──────────┘
          ▼
       User sees
   streaming response
```

---

## 2. Where it lives

The whole loop is in **`apps/web/app/api/copilot/stream/route.ts`** —
a single ~110-line Next.js route handler that returns an
`application/x-ndjson` stream of typed `StreamEvent`s.

The UI side lives in **`apps/web/components/app/copilot/`**:

- `use-copilot.ts` — opens the POST, reads the stream, parses NDJSON lines,
  exposes `events`, `isStreaming`, `sendMessage`, `cancel`, `approve`.
- `message-stream.tsx` — renders user bubbles, tool cards (running / ok / err),
  approval cards, and streaming assistant text.
- `composer.tsx` — textarea + voice/send buttons, `⌘⏎` to send.
- `drawer.tsx` — wraps it all in a right-side panel.

---

## 3. Streaming event contract

```jsonc
{ "type": "message.start",   "message_id": "msg_..." }
{ "type": "token",           "delta": "Reading " }
{ "type": "tool.start",      "tool_id": "tc_1", "tool": "stripe.get_metrics", "args": {}, "kind": "read" }
{ "type": "tool.end",        "tool_id": "tc_1", "ok": true,  "duration_ms": 720 }
{ "type": "approval.needed", "step_id": "step_1", "tool": "notion.create_page", "preview": {...} }
{ "type": "token",           "delta": "Draft" }
{ "type": "message.end" }
{ "type": "done" }
```

This contract is **stable**: it doesn't matter whether the events come from a
deterministic stub, an OpenAI call, or a future NestJS agent service — the UI
renders them identically.

---

## 4. Intent classifier (demo)

```
"board", "investor", "update"     → investor_update  (3 tools, needs approval)
"calendar", "schedule", "meeting" → calendar         (2 tools, no approval)
"email", "inbox", "reply", "draft"→ inbox            (3 tools, needs approval)
otherwise                          → general          (2 tools, no approval)
```

In a real build, this would be a fast GPT-4o-mini call that returns a typed
plan object (see `LlmService.plan()` pattern in the docs).

---

## 5. Approval gates

Any plan that contains a `write`, `send`, or `schedule` step pauses to surface
an approval card to the user. The user can:

- **Approve** — the stream continues with that step's execution
- **Cancel** — that step is skipped, the run continues

In this demo, approval cards are visual only (no real action is taken). In a
real build, the approval endpoint (`/api/copilot/approvals/[stepId]`) would
resolve a pending promise in the agent runtime.

---

## 6. OpenAI integration (optional)

Set `OPENAI_API_KEY` in `.env` to upgrade the synthesizer:

```bash
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o-mini    # or gpt-4o
```

The plan, tool calls, and approval flow stay deterministic (which keeps demos
reliable); only the final summary tokens come from the LLM.

---

## 7. Adding real tools

To wire a real tool (e.g., Gmail send):

1. Add the tool name to the `planFor()` function so it appears in plans.
2. In the stream's tool execution section, after `tool.start` and before
   `tool.end`, call the real provider (with OAuth tokens from your future
   backend).
3. Honor `requires_approval` — pause the stream until the approval endpoint
   resolves.

The UI doesn't need any changes.

---

## 8. Latency budget (demo)

| Stage | Time |
|---|---|
| Open + first token | ~200ms |
| Each simulated tool call | 280–720ms |
| Approval gate | user-paced |
| Closing text | ~700ms total |
| **End-to-end** | **~3–4s** |

Feels alive without feeling jittery. Tuned for "judge-watching-a-demo" pacing.
