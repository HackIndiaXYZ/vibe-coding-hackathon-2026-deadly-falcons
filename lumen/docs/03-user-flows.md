# 03 · User Flows

> Every flow optimized for time-to-value. Friction is the enemy of magic.

---

## Flow 1 · First-run (signup → magic moment in <120s)

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────────┐
│ Landing page    │───▶│ Sign in w/ Google│───▶│ Workspace created   │
│ "Try the demo"  │    │ (one click)      │    │ (auto, named after  │
└─────────────────┘    └──────────────────┘    │  your domain)       │
                                                └──────────┬──────────┘
                                                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Onboarding step 1 · "What are you working on?"                      │
│ Single text field. User types: "Raising a seed round, 8-person      │
│ team, building a fintech product."                                  │
│                                                                      │
│ AI extracts: company stage, team size, vertical, current goal →     │
│ writes initial memory graph in real-time (visible animation)        │
└──────────────────────────────────┬──────────────────────────────────┘
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Onboarding step 2 · "Connect your stack"                            │
│ Grid of integrations. Recommended ones glow.                        │
│ User clicks Gmail + Calendar (60s OAuth).                           │
│ Lumen starts indexing in background (progress bar on copilot).      │
└──────────────────────────────────┬──────────────────────────────────┘
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Onboarding step 3 · "Try your first prompt"                         │
│ Three suggested prompts displayed as cards:                         │
│   • "What's on my calendar this week?"                              │
│   • "Summarize my unread emails"                                    │
│   • "Draft a follow-up to my last meeting"                          │
│                                                                      │
│ User clicks one. Copilot streams response with tool-call cards.     │
│ ⏱  Time to magic moment: ~90 seconds.                              │
└──────────────────────────────────┬──────────────────────────────────┘
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Land in /home (dashboard) — morning brief pre-generated.            │
│ Toast: "Save this prompt as a workflow?" [Save] [Dismiss]           │
└─────────────────────────────────────────────────────────────────────┘
```

**Activation event:** integration connected + first agent run with ≥1 successful tool call.

---

## Flow 2 · Daily use (the loop that compounds)

```
        ┌─────────────────────┐
        │  7:00 AM            │
        │  Push notification  │
        │  "Your brief is up" │
        └──────────┬──────────┘
                   ▼
        ┌─────────────────────┐
        │  Open Lumen         │
        │  /home shows brief  │◀──┐
        └──────────┬──────────┘   │
                   ▼              │
        ┌─────────────────────┐   │
        │  Tap a card         │   │  (loop returns
        │  Copilot opens with │   │   here all day)
        │  context loaded     │   │
        └──────────┬──────────┘   │
                   ▼              │
        ┌─────────────────────┐   │
        │  Prompt → Outcome   │   │
        │  (read/draft/send)  │   │
        └──────────┬──────────┘   │
                   ▼              │
        ┌─────────────────────┐   │
        │  Action complete    │   │
        │  Logged to memory   │───┘
        └─────────────────────┘
```

---

## Flow 3 · Prompt → Outcome (the headline magic)

User prompt: **"Get me ready for Thursday's board meeting."**

```
┌──────────────────────────────────────────────────────────────┐
│ 1. Intent parsing                                            │
│    LLM extracts: intent=meeting_prep, target=Thursday board  │
│                                                               │
│ 2. Planner generates plan (rendered as steps in UI):         │
│    ▢ Find Thursday's board meeting on calendar               │
│    ▢ Identify attendees & their last interactions            │
│    ▢ Pull Q3 metrics from Stripe                             │
│    ▢ Summarize Linear progress since last board              │
│    ▢ Draft talking points doc in Notion                      │
│    ▢ Schedule 1hr prep block tomorrow morning                │
│                                                               │
│ 3. User reviews plan → [Approve all] / [Edit] / [Step-by-step]│
│                                                               │
│ 4. Execution (live progress, cancellable):                   │
│    ✓ Calendar: found "Q3 Board Meeting · Thu 3pm"            │
│    ✓ People: 4 attendees, last contact summarized            │
│    ✓ Stripe: MRR +18%, churn 2.1%, runway 14mo               │
│    ✓ Linear: 47 issues closed, 3 milestones hit              │
│    ✓ Notion: draft created → [Open]                          │
│    ✓ Calendar: prep block scheduled tomorrow 9-10am          │
│                                                               │
│ 5. Result card: "Board prep complete · 14 actions"           │
│    [Open Notion doc] [Edit prep time] [Save as workflow]     │
└──────────────────────────────────────────────────────────────┘
```

**Total time:** ~25 seconds streaming. Replaces ~3 hours of manual work.

---

## Flow 4 · Approval gate (safety + trust)

Any action that **sends, deletes, charges, or schedules** triggers an approval card:

```
┌─────────────────────────────────────────────────┐
│  ⚠  Lumen wants to send an email                │
│                                                  │
│  To:     investors@board.com (4 recipients)     │
│  Subject: Lumen · Weekly Update · Wk 47         │
│                                                  │
│  ┌─ Preview ───────────────────────────────┐    │
│  │ Hey team — quick update from the week…  │    │
│  │ [collapsed, click to expand]            │    │
│  └─────────────────────────────────────────┘    │
│                                                  │
│  [Edit draft]  [Send now]  [Cancel]             │
│  ☐ Don't ask again for "weekly update" sends    │
└─────────────────────────────────────────────────┘
```

User can grant **scoped trust** ("don't ask again for X") — builds confidence over time.

---

## Flow 5 · Invite a teammate (Pro → Team upgrade)

```
Settings → Workspace → "Invite teammate"
   │
   ▼
Modal: email + role (Admin / Member / Viewer)
   │
   ▼
If workspace is on Free/Pro: inline upgrade card
"Team plan unlocks shared memory & audit logs · $99/seat/mo"
[Upgrade & invite]  [Cancel]
   │
   ▼
Stripe Checkout (embedded) → success → invite sent
   │
   ▼
Invitee accepts → joins workspace → onboarding skipped
(they inherit company memory immediately)
```

---

## Flow 6 · Mobile (PWA, then native)

Mobile is **not a port** — it's a different surface for a different mode of use.

- **Home:** single-card stack of today's brief + 3 actions
- **Copilot:** full-screen sheet, voice-first (tap-and-hold to speak)
- **Notifications:** rich (with inline Approve/Cancel for actions)
- **No nav bar** — everything is ⌘K or copilot. Gestures for back.

---

## Flow 7 · Error & recovery

When a tool call fails (e.g., Stripe token expired):

```
┌─────────────────────────────────────────────────┐
│  ⓘ  Couldn't reach Stripe                        │
│                                                  │
│  Your Stripe connection needs to be refreshed.  │
│  Everything else completed successfully.        │
│                                                  │
│  [Reconnect Stripe]  [Continue without]         │
└─────────────────────────────────────────────────┘
```

Never a stack trace. Never a 500 page. Always a next action.
