# 02 · Feature Set

> Ruthlessly prioritized. Every feature either creates user value or compounds the moat. Nothing else ships.

---

## Prioritization framework

Every feature scored on **Value × Magic × Effort**:
- **Value** = solves a real, frequent founder pain
- **Magic** = creates a "holy shit" demo moment
- **Effort** = build cost in eng-weeks

We ship the top-left quadrant first. Everything else is post-launch.

---

## P0 — Launch surface (Demo Day MVP)

### 1. The Copilot
The persistent AI surface. Lives in a right-side drawer (desktop) or full-screen sheet (mobile). Always one keystroke away (`⌘J`).

- **Streaming** responses (token-by-token)
- **Tool calls** rendered as inline cards ("Reading Gmail…", "Querying Stripe…")
- **Approval gates** for destructive actions ("Send email to investors? [Approve / Edit / Cancel]")
- **Memory chips** — visible context the copilot is using ("Using: Q3 metrics, last board deck")
- **Voice input** (Whisper) — tap-to-talk on mobile

### 2. Prompt → Outcome workflows
The headline interaction. User types/speaks an outcome; Lumen plans → executes → reports.

Reference prompts shipped at launch:
- `"Get me ready for [meeting]"` → calendar lookup + RAG + brief
- `"Draft this week's investor update"` → metrics + wins + asks
- `"What changed in the business this week?"` → cross-tool diff
- `"Clear my inbox — drafts only, don't send"` → triage + draft
- `"Schedule a follow-up with everyone I met today"` → calendar + email

### 3. Briefings
Proactive, scheduled, beautiful.
- **Morning brief** (7am local) — today's calendar, top 3 priorities, overnight changes
- **Weekly review** (Friday 4pm) — wins, metrics deltas, decisions needed
- **Pre-meeting brief** (15 min before) — attendees, last interaction, talking points

### 4. Integrations (launch six)
1. Gmail (read + draft + send)
2. Google Calendar (read + create)
3. Notion (read + write)
4. Linear (read + create issues)
5. Stripe (read metrics)
6. Slack (read + post)

Each integration is OAuth, scoped minimally, revocable, audited.

### 5. Memory & context graph
- Per-user vector store (Qdrant) of all read content
- Structured graph: People, Companies, Projects, Goals, Decisions
- Auto-extracted from every interaction
- Visible & editable in `/memory`

### 6. Command menu (⌘K)
Raycast-grade global menu.
- Run any workflow
- Jump to any page
- Search across all integrated content
- Ask the copilot

### 7. Workflows (saved prompts)
- Save any successful prompt as a reusable workflow
- Schedule (cron) or trigger (webhook) workflows
- Share workflows with team / publish to marketplace

### 8. Auth & workspaces
- Email + magic link + Google OAuth
- Personal workspace by default
- Invite to upgrade to Team
- RBAC: Owner, Admin, Member, Viewer

### 9. Billing
- Stripe-powered
- Free / Pro / Team self-serve
- Usage meter (AI actions used / limit)
- Upgrade prompts at 80% usage

### 10. Settings center
- Profile
- Integrations
- Memory
- Notifications
- Workspace
- Billing
- API keys
- Audit log

---

## P1 — Weeks 2-8 post-launch

- Multi-step agents with planning UI ("Plan → Steps → Approval")
- Scheduled workflows (cron-style)
- Mobile app (Expo)
- Shared team memory
- Workflow marketplace
- Public templates ("Founder OS Starter Pack")

---

## P2 — Quarter 2+

- Voice-first mode (always-on, like Siri but useful)
- iOS/Android native widgets (today's brief on home screen)
- Custom integrations (no-code OpenAPI importer)
- AI model routing (GPT-4o / Claude / local) per task
- Self-hosted enterprise option

---

## Explicitly cut (and why)

| Cut | Why |
|---|---|
| Custom dashboards / charts | Lumen *answers* questions, doesn't make you build views |
| Project management features | Linear / Asana already won; we integrate, not compete |
| Generic chat (ChatGPT clone) | Without context + tools, it's commodity |
| Marketplace at launch | Premature; needs critical mass first |
| Mobile app at launch | PWA + mobile-first web ships faster; native in Q2 |

---

## Feature → value map (for investor deck)

```
                  HIGH VALUE
                      │
   Briefings  ●       │       ● Prompt→Outcome
   Memory     ●       │       ● Copilot
                      │
   ───────────────────┼───────────────────  HIGH MAGIC
                      │
   Settings   ●       │       ● Workflows
   Billing    ●       │       ● Integrations
                      │
                  LOW VALUE
```

Top-right quadrant is the demo. Top-left is the retention loop. Bottom-right is the moat. Bottom-left is table-stakes.
