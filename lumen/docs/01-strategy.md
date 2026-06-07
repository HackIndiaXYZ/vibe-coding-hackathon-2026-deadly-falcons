# 01 · Product Strategy

> Founder thesis, ICP, positioning, GTM, monetization, moat.

---

## 1. The founder thesis

Founders don't need more dashboards. They need **leverage**.

A typical early-stage founder spends 60-70% of their week on operational work that is:
- High-context (only they can do it)
- Low-craft (it's not the work that compounds)
- Tool-fragmented (Gmail + Notion + Linear + Stripe + Slack + GCal)

The market filled this gap with **point tools** (Superhuman, Notion AI, Linear Copilot). Each saves 5 minutes per task. None of them ever finishes a job.

**Lumen's bet:** the next 10x in productivity is not a better tool — it's an **autonomous layer above all tools**. You describe an outcome. The system plans, executes across integrations, and reports back.

> "Get me ready for Thursday's board meeting" is a sentence.
> Today it's a 4-hour project. Lumen makes it a notification.

---

## 2. Problems we solve (concretely)

| # | Problem | Today | With Lumen |
|---|---|---|---|
| 1 | **Tool sprawl** — context lives in 8 apps | Founder is the integration layer | Lumen is the integration layer |
| 2 | **Reactive operations** — important work decays in inboxes | Triage in the morning, lose the afternoon | Proactive briefings + auto-drafts |
| 3 | **Reporting fatigue** — investor updates, all-hands, weekly reviews | 2-4 hrs/week of manual aggregation | One-prompt generation, founder-voice tuned |
| 4 | **Meeting overhead** — prep, notes, follow-ups | Manual every time | Auto-prep, auto-summary, auto-follow-up |
| 5 | **Decision latency** — data scattered, hard to ask questions of | Open Stripe, open Mixpanel, build a chart | "How did Pro conversion trend this month?" → answer + source |

---

## 3. Why now

- **GPT-4o / Claude 3.5 class models** can finally do reliable multi-step tool use
- **Function calling + structured outputs** make agents safe enough for production workflows
- **Vector DBs are commodity** (Qdrant / pgvector) — long-term memory is cheap
- **OAuth maturity** — every SaaS exposes the surface area Lumen needs
- **Cultural shift** — founders raised on ChatGPT now expect "prompt → outcome" UX

---

## 4. ICP (Ideal Customer Profile)

### Primary: Seed → Series A founders (1-30 person companies)

| Attribute | Detail |
|---|---|
| Role | Solo founder, CEO, or COO |
| Stage | Pre-seed → Series A |
| Team size | 1-30 |
| Tools they live in | Gmail, Notion, Linear, Stripe, Slack, GCal, Figma |
| Pain intensity | 9/10 — this is their full waking life |
| Willingness to pay | High — $50-200/mo is a no-brainer if it saves 5 hrs/week |
| Channel | Twitter/X, YC network, Product Hunt, founder Slack groups |

### Secondary: Chiefs of Staff at growth-stage startups (30-200)
Same workflows, multiplied across an executive team.

### Anti-ICP (we will not chase)
- Enterprise IT buyers (slow, RFP-driven)
- Solo creators (different toolchain, lower willingness to pay)
- Agencies / consultants (multi-tenant client data is a different product)

---

## 5. Positioning

**Category:** AI Chief of Staff (we are creating the category)

**Positioning statement:**
> For founders drowning in operational work, Lumen is the AI chief of staff that turns plain-English goals into completed work across your stack — unlike point tools that save you minutes, Lumen finishes the job.

**Competitive frame:**

| Competitor | What they do | Where we win |
|---|---|---|
| Notion AI | Writes inside Notion | We act across all tools |
| Superhuman | Faster inbox | We make the inbox optional |
| Zapier / Make | Trigger-based automation | We're outcome-based, no flow-building |
| ChatGPT | General assistant | We have memory, tools, and your data |
| Mem / Reflect | Smart notes | We execute, not just remember |

**Our unfair advantage:** the **founder-context graph** — a private, evolving knowledge model of you, your company, your goals, and your tools. The graph compounds. Switching cost grows weekly.

---

## 6. Pricing & monetization

| Tier | Price | For | Limits |
|---|---|---|---|
| **Free** | $0 | Trial / hobbyists | 50 AI actions/mo, 2 integrations |
| **Pro** | $29/mo | Solo founders | Unlimited actions, all integrations, 1 workspace |
| **Team** | $99/user/mo | Funded startups | Shared memory, roles, audit logs, SSO-lite |
| **Enterprise** | Custom | 50+ seats | SSO/SAML, SCIM, VPC, custom retention, SOC2 |

**Expansion path:** Free → Pro within 7 days (driven by integration value), Pro → Team when first hire joins, Team → Enterprise at Series B.

**Unit economics target:** LTV/CAC ≥ 4, gross margin ≥ 75% (AI cost capped at 18% of revenue via routing + caching).

---

## 7. Moat (defensibility)

1. **Memory compounding** — the longer you use Lumen, the more personalized it becomes. Cannot be cloned by a switch.
2. **Integration depth** — not just OAuth, but learned schemas of how *your* company uses each tool.
3. **Workflow library** — user-created prompts become reusable templates → network effect.
4. **Brand & taste** — Lumen looks and feels like the product founders *want* to be associated with. (Notion, Linear, Superhuman moat.)

---

## 8. North-star metric

**Weekly Founder Hours Saved (WFHS)** — measured per active user via action-equivalent estimation. Target: **5 hrs/week by week 4**, 10 hrs/week by week 12.

Supporting metrics:
- Activation: integration connected + first agent run within 10 min of signup
- Retention: WAU/MAU ≥ 65%
- Expansion: ≥ 30% of Pro upgrade to Team within 90 days
- Virality: K-factor ≥ 0.4 via shared briefings + referral credits

---

## 9. 12-month roadmap (compressed)

| Quarter | Theme | Ships |
|---|---|---|
| Q1 | **Foundation** | Copilot, 6 integrations, briefings, workflows v1 |
| Q2 | **Agents** | Multi-step agents, approval gates, scheduled workflows |
| Q3 | **Team** | Shared memory, roles, audit logs, SSO-lite, billing |
| Q4 | **Enterprise + Platform** | SAML, SCIM, public API, marketplace of workflows |

---

## 10. Why we win the hackathon

Judges care about three things: **clarity, magic, polish.**

- **Clarity:** category-defining one-liner. Investor understands in 5 seconds.
- **Magic:** the demo prompt (`"Get me ready for Thursday's board meeting"`) triggers a visible multi-tool agent. Jaws drop.
- **Polish:** the product looks like Linear and Vercel had a baby. Judges trust the team.
