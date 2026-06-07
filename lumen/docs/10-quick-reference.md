# 10 · Quick reference

> A map of every artifact in this repo and how to use it.

---

## 🚀 Run

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

No database, no Docker, no env vars required. Optional `OPENAI_API_KEY` upgrades
the copilot's closing tokens to live GPT output.

## 🎨 See the design in 30 seconds (no build needed)

| File | What it is |
|---|---|
| `preview/landing.html` | Full marketing page — hero, animated product mock, features, magic moment, pricing |
| `preview/app.html` | Full product app — sidebar, dashboard, inbox, copilot drawer with approval card. Press **⌘K** for the command palette. |

These are pure HTML/CSS — open them directly in any browser.

## 🧠 Strategy & design docs

| File | Covers |
|---|---|
| `docs/01-strategy.md` | Thesis, ICP, pricing, moat, roadmap |
| `docs/02-features.md` | P0 / P1 / P2, what we cut |
| `docs/03-user-flows.md` | Signup, daily loop, prompt-to-outcome, approval |
| `docs/04-information-architecture.md` | Routes, shell, command menu, shortcuts |
| `docs/05-design-system.md` | Tokens, type, motion, accessibility |
| `docs/06-architecture.md` | Frontend-only architecture, future backend path |
| `docs/08-ai-copilot.md` | Agent interaction model, streaming contract |

## 🏗 Code structure

```
lumen/
├── README.md
├── package.json                    pnpm workspace root
├── turbo.json                      Turborepo pipeline
├── .env.example                    OPENAI_API_KEY (optional)
│
├── apps/web/                       The single Next.js app
│   ├── app/
│   │   ├── layout.tsx                  Theme provider + Toaster
│   │   ├── globals.css                 Tailwind + base styles
│   │   ├── (marketing)/page.tsx        Landing
│   │   ├── (auth)/login/page.tsx       Demo sign-in
│   │   ├── (app)/                      Authenticated app shell
│   │   │   ├── layout.tsx                  AppShell wrapper
│   │   │   ├── home/page.tsx               Dashboard
│   │   │   ├── workflows/page.tsx
│   │   │   ├── memory/page.tsx
│   │   │   ├── inbox/page.tsx
│   │   │   ├── search/page.tsx
│   │   │   ├── integrations/page.tsx
│   │   │   ├── settings/page.tsx
│   │   │   └── copilot/page.tsx
│   │   └── api/copilot/                Route handlers
│   │       ├── stream/route.ts             ← THE COPILOT (NDJSON stream)
│   │       └── approvals/[stepId]/route.ts
│   ├── components/
│   │   ├── brand/logo.tsx
│   │   ├── marketing/{hero,features,pricing,…}.tsx
│   │   └── app/
│   │       ├── shell.tsx                   Grid layout + hotkeys
│   │       ├── top-bar.tsx
│   │       ├── side-rail.tsx
│   │       ├── command-menu.tsx            ⌘K palette (Radix + cmdk)
│   │       └── copilot/
│   │           ├── drawer.tsx
│   │           ├── use-copilot.ts          Streaming hook
│   │           ├── message-stream.tsx
│   │           └── composer.tsx
│   ├── lib/
│   │   ├── hooks/use-hotkey.ts
│   │   └── utils.ts                    cn(), formatNumber()
│   ├── next.config.mjs
│   ├── tailwind.config.ts              Consumes @lumen/config preset
│   └── package.json
│
├── packages/
│   ├── ui/                         Themed primitives (used app-wide)
│   │   └── src/
│   │       ├── tokens.ts               Canonical design tokens (TS)
│   │       ├── lib/cn.ts
│   │       └── primitives/{button,input,badge,card,kbd}.tsx
│   └── config/                     Shared configs
│       ├── tailwind.preset.ts          Colors, type, motion (Tailwind preset)
│       └── eslint.config.js
│
├── preview/                        Standalone HTML mocks
│   ├── landing.html
│   └── app.html
│
└── .github/workflows/ci.yml        lint · typecheck · build
```

## 🎬 The 90-second demo script

1. **`http://localhost:3000`** — point at hero, mock, the "describe outcomes" tagline (15s)
2. Click **Get Lumen →** → sign-in screen → any email → land on `/home` (10s)
3. In the copilot drawer (right side), type **"Get me ready for Thursday's board meeting"** (5s)
4. **Watch:** opening tokens stream → 3 tool calls execute live (Stripe, Linear, Calendar) → approval card pops for the Notion write → approve → synthesis streams the summary. (30s)
5. **⌘K** → show the command palette, hit **Workflows** (15s)
6. Show **`/memory`** — graph + pinned entities. "It remembers you." (10s)
7. Close on **`/pricing`** — $29 Pro, breaks even in week one. (5s)

Judges' faces: 🤯

## 🔌 Add a real backend later

Two files to change:

1. `apps/web/app/api/copilot/stream/route.ts` — proxy to your backend's stream
2. `apps/web/app/(auth)/login/page.tsx` — real OAuth instead of demo

The streaming contract (`docs/08-ai-copilot.md` §3) is stable. Nothing else has to move.
