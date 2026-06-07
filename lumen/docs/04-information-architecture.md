# 04 · Information Architecture

> Flat. Discoverable. Keyboard-first. The copilot is omnipresent — IA exists for when you don't want to talk to it.

---

## Top-level routes

```
/                          Marketing landing
/login                     Auth (magic link + Google)
/onboarding                Three-step first-run

── App (authenticated) ────────────────────────────────────────────

/home                      Today's brief + quick actions  (default)
/copilot                   Full-screen copilot (alt to drawer)
/workflows                 Saved + scheduled workflows
/memory                    Context graph & editable memory
/inbox                     Unified action inbox (approvals, drafts, suggestions)
/search                    Cross-tool semantic search
/integrations              Connect / manage tools
/settings                  Profile, workspace, billing, security, audit
/help                      Docs, shortcuts, contact

── Workspace-scoped ───────────────────────────────────────────────

/w/[workspace]/...         Multi-workspace routing wraps all of the above
```

**Why so flat?** Founders don't want to navigate. They want to ask. The copilot (`⌘J`) and command menu (`⌘K`) cover 80% of all navigation intents. Pages exist for the other 20%.

---

## Persistent UI shell

```
┌────────────────────────────────────────────────────────────────────┐
│ ┌──────────┬─────────────────────────────────────┬──────────────┐ │
│ │          │                                     │              │ │
│ │  Side    │       Main content area             │   Copilot    │ │
│ │  rail    │       (route renders here)          │   drawer     │ │
│ │  (icons) │                                     │   (toggle)   │ │
│ │          │                                     │              │ │
│ │  ⌂ Home  │                                     │  ┌─ Lumen ─┐ │ │
│ │  ⚡ Wkfl  │                                     │  │ Hi …    │ │ │
│ │  ◈ Mem   │                                     │  │         │ │ │
│ │  ✉ Inbox │                                     │  └─────────┘ │ │
│ │  ⌕ Srch  │                                     │  [prompt…]   │ │
│ │  ⊕ Intg  │                                     │              │ │
│ │  ⚙ Set   │                                     │              │ │
│ └──────────┴─────────────────────────────────────┴──────────────┘ │
│  [⌘K menu]  [workspace switcher]              [user]  [⌘J copilot]│
└────────────────────────────────────────────────────────────────────┘
```

- **Side rail** — 56px wide, icons only, tooltips on hover. Collapses on mobile.
- **Main area** — single column, max 1200px, generous padding.
- **Copilot drawer** — 420px right-side, slides in/out, persists state across routes.
- **Top bar** — minimal: workspace switcher (left), search trigger (center), user menu (right).

---

## Navigation principles

1. **Three ways to do everything**
   - Click (side rail / page UI)
   - Keyboard (⌘K menu)
   - Voice/text (copilot)

2. **Zero nested menus.** Settings is one page with anchored sections, not a tree.

3. **Breadcrumbs are banned.** If you need them, the page is too deep.

4. **Empty states do real work.** Every empty state suggests the first valuable action and offers to do it via copilot.

5. **The copilot follows you.** State persists across navigation. Context updates with the current route.

---

## Command menu (⌘K) structure

```
┌─────────────────────────────────────────────────┐
│ ⌕ Search or run a command…                     │
├─────────────────────────────────────────────────┤
│ SUGGESTED                                       │
│   ⚡ Draft weekly update                         │
│   ⚡ What's on my calendar today?                │
│   ⚡ Summarize unread emails                     │
├─────────────────────────────────────────────────┤
│ GO TO                                           │
│   ⌂ Home              ⌘1                        │
│   ⚡ Workflows         ⌘2                        │
│   ◈ Memory            ⌘3                        │
│   ✉ Inbox             ⌘4                        │
├─────────────────────────────────────────────────┤
│ ACTIONS                                         │
│   ⊕ Connect integration                         │
│   ✦ New workflow                                │
│   ⎘ Invite teammate                             │
│   ◐ Toggle theme       ⌘⇧L                      │
├─────────────────────────────────────────────────┤
│ RECENT                                          │
│   "Get me ready for Thursday's board meeting"   │
│   "Draft follow-up to Sarah from yesterday"     │
└─────────────────────────────────────────────────┘
```

---

## Keyboard shortcuts (full set)

| Key | Action |
|---|---|
| `⌘K` | Open command menu |
| `⌘J` | Toggle copilot drawer |
| `⌘⇧J` | New copilot conversation |
| `⌘/` | Show all shortcuts |
| `⌘1-7` | Jump to top-level page |
| `⌘\` | Toggle sidebar |
| `⌘⇧L` | Toggle theme |
| `⌘.` | Quick-add to memory |
| `⌘⏎` | Approve current action |
| `Esc` | Close drawer / modal |
| `g` then `h` | Go to home (vim-style) |
| `?` | Open shortcuts cheat sheet |

---

## Information density per surface

| Surface | Density | Purpose |
|---|---|---|
| `/home` | Low — 3-5 cards | Calm landing, "what matters now" |
| `/copilot` | Conversational | Open-ended work |
| `/workflows` | Medium — list | Discoverability + reuse |
| `/memory` | High — graph + table | Power-user surface |
| `/inbox` | Medium — list with previews | Triage of pending actions |
| `/search` | High — instant results | Find-anything utility |
| `/settings` | Low — sectioned | Infrequent, must be calm |

---

## Mobile IA

- **Bottom dock (3 items):** Home · Copilot (FAB-style, larger) · Inbox
- Everything else lives under a profile sheet (top-right avatar)
- Copilot is always one tap away
- Long-press the Copilot FAB → voice mode
