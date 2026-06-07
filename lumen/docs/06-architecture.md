# 06 · Architecture

> Single Next.js 14 app. No backend, no database, no Docker.
> Designed so a future backend can drop in without touching the UI.

---

## 1. System overview

```
                      ┌─────────────────────┐
                      │   Browser / PWA     │
                      └──────────┬──────────┘
                                 │
                      ┌──────────┴──────────┐
                      │   Next.js 14        │
                      │   (App Router)      │
                      │                     │
                      │   ┌───────────────┐ │
                      │   │  Marketing    │ │   RSC, static
                      │   ├───────────────┤ │
                      │   │  Auth (demo)  │ │   Client, in-memory
                      │   ├───────────────┤ │
                      │   │  Product app  │ │   RSC + Client
                      │   │  + Copilot    │ │
                      │   ├───────────────┤ │
                      │   │  /api/copilot │ │   Route Handler
                      │   │  (streaming)  │ │   NDJSON over fetch
                      │   └───────────────┘ │
                      └──────────┬──────────┘
                                 │
                            (optional)
                                 │
                      ┌──────────┴──────────┐
                      │   OpenAI API        │   only if OPENAI_API_KEY set
                      └─────────────────────┘
```

When `OPENAI_API_KEY` is present, the copilot's synthesis tokens come from GPT.
When it's absent, a deterministic demo stream provides identical UX. Tool calls
are always simulated — perfect for a hackathon demo where reliability matters
more than depth.

---

## 2. Monorepo layout

```
lumen/
├── apps/
│   └── web/                          Next.js 14 (App Router)
│       ├── app/
│       │   ├── (marketing)/page.tsx       Landing
│       │   ├── (auth)/login/page.tsx      Demo sign-in
│       │   ├── (app)/
│       │   │   ├── layout.tsx             AppShell
│       │   │   ├── home/page.tsx
│       │   │   ├── workflows/page.tsx
│       │   │   ├── memory/page.tsx
│       │   │   ├── inbox/page.tsx
│       │   │   ├── search/page.tsx
│       │   │   ├── integrations/page.tsx
│       │   │   ├── settings/page.tsx
│       │   │   └── copilot/page.tsx
│       │   ├── api/copilot/
│       │   │   ├── stream/route.ts        NDJSON stream
│       │   │   └── approvals/[stepId]/route.ts
│       │   ├── globals.css
│       │   └── layout.tsx
│       ├── components/
│       │   ├── brand/logo.tsx
│       │   ├── marketing/                  Hero, Features, Pricing, …
│       │   └── app/
│       │       ├── shell.tsx               grid layout + hotkeys
│       │       ├── top-bar.tsx
│       │       ├── side-rail.tsx
│       │       ├── command-menu.tsx        ⌘K
│       │       └── copilot/
│       │           ├── drawer.tsx
│       │           ├── use-copilot.ts      streaming hook
│       │           ├── message-stream.tsx  renders tokens + tool cards
│       │           └── composer.tsx
│       └── lib/hooks/use-hotkey.ts
│
├── packages/
│   ├── ui/                           Tokens + primitives
│   │   └── src/
│   │       ├── tokens.ts
│   │       ├── primitives/{button,input,badge,card,kbd}.tsx
│   │       └── lib/cn.ts
│   └── config/
│       └── tailwind.preset.ts        Single source of design tokens
│
├── preview/                          Static HTML mockups (no build)
├── docs/                             This folder
├── .github/workflows/ci.yml          lint · typecheck · build
└── package.json                      pnpm workspace root
```

---

## 3. Frontend architecture

### Rendering
- **Marketing** — Server Components, static
- **Auth** — Client Component (demo)
- **App** — Server Components for layouts, Client Components for interactivity
- **Copilot** — Client Component reading NDJSON from `/api/copilot/stream`

### Streaming contract
The copilot uses **newline-delimited JSON** over a POST response body. Each
line is a typed `StreamEvent`:

```ts
type StreamEvent =
  | { type: "message.start"; message_id: string }
  | { type: "token"; delta: string }
  | { type: "tool.start"; tool_id: string; tool: string; args: unknown; kind: string }
  | { type: "tool.end"; tool_id: string; ok: boolean; duration_ms: number }
  | { type: "approval.needed"; step_id: string; tool: string; preview: unknown }
  | { type: "message.end" }
  | { type: "done" };
```

This contract is **stable** — when a real backend is added later, swap the
route handler implementation and the UI doesn't change.

### State management
- **Component state** — `useState` / `useReducer` for the copilot
- **Theme** — `next-themes` (dark default)
- **Toasts** — `sonner`
- **Forms** — controlled inputs (no library needed at this scale)

### Hotkeys
A tiny `useHotkey("mod+k", fn)` hook in `lib/hooks/use-hotkey.ts`.
Bindings: `⌘K` (command menu), `⌘J` (toggle copilot).

### Styling
- Tailwind 3.4 with a shared preset (`packages/config/tailwind.preset.ts`)
- All tokens (colors, type, motion, shadows) defined once and reused
- Dark-first; light mode wired but not used by default

---

## 4. Where the future backend goes

When you add a backend, only two files change:

1. **`apps/web/app/api/copilot/stream/route.ts`** — forward the POST to your
   backend; pipe its stream back to the client.
2. **`apps/web/app/(auth)/login/page.tsx`** — replace `setTimeout(...router.push)`
   with a real OAuth/magic-link flow.

Everything else — the design system, the streaming UI, the agent contract —
stays exactly as it is.

---

## 5. Reliability & error handling

- **Streaming aborts** — `AbortController` in `use-copilot.ts` cancels in-flight
  requests on user "Stop" or navigation.
- **Error boundaries** — Next.js `error.tsx` at each segment (add when needed).
- **Graceful degradation** — copilot always returns a stream, even if OpenAI
  fails (falls back to canned closing).
- **No client-side secrets** — only the route handler can see `OPENAI_API_KEY`.

---

## 6. Observability (when ready)

Drop-in path:
- `@vercel/analytics` for traffic
- `@sentry/nextjs` for errors
- `posthog-js` for product analytics

None of these are required to run the app.
