# Lumen

> The AI Chief of Staff for founders. Describe outcomes. Lumen executes.

A single **Next.js 14** app — beautiful marketing site, full product UI, streaming AI copilot with simulated tool calls and approval gates. **No backend. No database. No Docker.** Just `npm install && npm run dev`.

[![Stack](https://img.shields.io/badge/stack-Next.js%2014%20%7C%20Tailwind%20%7C%20TypeScript-black)]()
[![Mode](https://img.shields.io/badge/mode-frontend--only-9B7BFF)]()

---

## ⚡ Run it

```bash
npm install
npm run dev          # → http://localhost:3000
```

That's it. No env vars required.

**Optional:** add an OpenAI key for live GPT responses in the copilot:

```bash
cp .env.example .env.local
# edit .env.local and set OPENAI_API_KEY=sk-...
```

Without a key, the copilot uses a polished synthetic stream that looks identical — perfect for demos.

---

## 🗺 What's in the box

```
lumen/
├── app/                       Next.js 14 App Router
│   ├── (marketing)/            Landing page (default route /)
│   ├── (auth)/login/           Demo sign-in (any email works)
│   ├── (app)/                  Authenticated product shell
│   │   ├── home/                  Dashboard
│   │   ├── workflows/             Saved AI workflows
│   │   ├── memory/                Knowledge graph
│   │   ├── inbox/                 Approvals / drafts / suggestions
│   │   ├── search/                Cross-tool search
│   │   ├── integrations/          6 integration cards
│   │   ├── settings/              Settings hub
│   │   └── copilot/               Full-screen copilot
│   ├── api/copilot/            Streaming endpoint (NDJSON)
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/                    Themed primitives (Button, Input, Badge, Card, Kbd)
│   ├── brand/                 Logo
│   ├── marketing/             Hero, Features, Pricing, etc.
│   └── app/                   AppShell, side rail, top bar, ⌘K menu, copilot drawer
├── lib/
│   ├── hooks/use-hotkey.ts
│   └── utils.ts
├── preview/                   Standalone HTML mocks (open directly, no build)
├── docs/                      Strategy, design system, architecture, copilot
├── package.json
├── tailwind.config.ts         All design tokens inline
├── next.config.mjs
└── tsconfig.json
```

## 🎬 30-second demo

1. **`http://localhost:3000`** — see the landing page (aurora hero, animated product mock)
2. Click **Get Lumen →** → sign-in screen → enter any email
3. Land on **`/home`** — dashboard with copilot drawer on the right
4. In the copilot, type **"Get me ready for Thursday's board meeting"** → watch the plan execute live: tool calls stream, approval card pops for the Notion write, synthesizer streams the summary
5. Press **⌘K** for the command palette
6. Press **⌘J** to toggle the copilot drawer

## 🎨 Visual reference (no build needed)

Open these in any browser:

- `preview/landing.html` — full landing page
- `preview/app.html` — full product UI with working ⌘K palette

## 📚 Documentation

- [`docs/01-strategy.md`](./docs/01-strategy.md) — Product strategy, ICP, positioning
- [`docs/02-features.md`](./docs/02-features.md) — Feature set & prioritization
- [`docs/03-user-flows.md`](./docs/03-user-flows.md) — Journeys & flows
- [`docs/04-information-architecture.md`](./docs/04-information-architecture.md) — IA & navigation
- [`docs/05-design-system.md`](./docs/05-design-system.md) — Tokens, components, motion
- [`docs/06-architecture.md`](./docs/06-architecture.md) — Frontend architecture
- [`docs/08-ai-copilot.md`](./docs/08-ai-copilot.md) — Copilot interaction model
- [`docs/10-quick-reference.md`](./docs/10-quick-reference.md) — File map & demo script

## 🚀 Deploy

```bash
# Vercel (recommended — zero config)
npx vercel

# Or any Node host
npm run build && npm start
```

CI runs lint + typecheck + build on every PR (`.github/workflows/ci.yml`).

---

**Built like a $10M seed-funded company would build it — runs on a laptop with one command.**
