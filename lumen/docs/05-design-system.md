# 05 · Design System — "Lumen OS"

> Inspired by Linear's discipline, Vercel's restraint, Stripe's precision, Arc's joy.
> Dark-first. Type-led. Motion-considered.

---

## 1. Brand foundations

- **Name:** Lumen
- **Wordmark:** custom — `lumen` lowercase, geometric sans, the dot of the `i` replaced by a soft glowing orb
- **Voice:** confident, concise, never cute. "Done." not "Done! ✨"
- **Tagline:** *Describe outcomes. Lumen executes.*

---

## 2. Color tokens

### Brand
```
--brand-50   #F0F4FF
--brand-100  #DDE5FF
--brand-200  #B8C7FF
--brand-300  #8AA3FF
--brand-400  #5F7DFF
--brand-500  #3D5BFF   ← primary
--brand-600  #2E47E6
--brand-700  #2438B8
--brand-800  #1B2A8A
--brand-900  #131F66
```

### Accent (the "glow")
```
--accent-400  #B79CFF
--accent-500  #9B7BFF   ← gradient pair with brand-500
--accent-600  #7E5FE6
```

### Neutrals (dark theme baseline)
```
--bg-0        #0A0A0B    page
--bg-1        #111114    surface
--bg-2        #17171B    elevated
--bg-3        #1F1F25    overlay
--bg-4        #2A2A32    input

--border-1    #232329
--border-2    #2E2E37    hover

--text-1      #F5F5F7    primary
--text-2      #C9C9D1    secondary
--text-3      #8A8A95    tertiary
--text-4      #5A5A66    quaternary / placeholder
```

### Semantic
```
--success     #2ECC71
--warning     #F5A623
--danger      #FF5C5C
--info        #5AA9FF
```

### Light theme (mirrored)
```
--bg-0        #FFFFFF
--bg-1        #FAFAFA
--bg-2        #F4F4F6
--bg-3        #EAEAEE
--bg-4        #E2E2E8

--text-1      #0A0A0B
--text-2      #3A3A45
--text-3      #6A6A75
```

### Signature gradients
```
--grad-aurora     linear-gradient(135deg, #3D5BFF 0%, #9B7BFF 100%)
--grad-dawn       linear-gradient(135deg, #FF7AB6 0%, #9B7BFF 60%, #3D5BFF 100%)
--grad-glass-dark conic-gradient(from 180deg at 50% 50%, rgba(155,123,255,0.12), rgba(61,91,255,0.08), rgba(155,123,255,0.12))
```

---

## 3. Typography

**Type families**
- **Display & UI:** `Geist Sans` (Vercel) — fallback: Inter
- **Mono:** `Geist Mono` — for prompts, tool calls, code
- **Serif (rare, marketing accent):** `Tiempos` — fallback: Iowan Old Style

**Scale (rem on a 16px base)**
```
text-xs    0.75rem    12px    label, badge
text-sm    0.875rem   14px    body small, input
text-base  1.0rem     16px    body
text-lg    1.125rem   18px    body large
text-xl    1.25rem    20px    h4 / card title
text-2xl   1.5rem     24px    h3
text-3xl   1.875rem   30px    h2
text-4xl   2.25rem    36px    h1 (app)
text-5xl   3.0rem     48px    display sm
text-6xl   3.75rem    60px    display md (landing)
text-7xl   4.5rem     72px    display lg (hero)
```

**Weights:** 400 / 500 / 600 / 700. Avoid 800-900 — too loud for the brand.

**Line-height:** 1.5 body, 1.15 display. **Tracking:** -0.02em on display sizes.

---

## 4. Spacing & layout

**Spacing scale (4px base):**
`0, 1(4), 2(8), 3(12), 4(16), 5(20), 6(24), 8(32), 10(40), 12(48), 16(64), 20(80), 24(96)`

**Layout rules**
- App max-width: 1200px
- Page padding: 24px (mobile) / 48px (desktop)
- Section vertical rhythm: 80px (landing) / 32px (app)
- Side rail: 56px collapsed, 220px expanded
- Copilot drawer: 420px
- Modal: 480px / 640px / 800px (sm/md/lg)

---

## 5. Radius

```
--radius-xs   4px    chips, badges
--radius-sm   6px    inputs, small buttons
--radius-md   10px   cards, primary buttons
--radius-lg   14px   modals, panels
--radius-xl   20px   hero cards, copilot drawer
--radius-2xl  28px   marketing surfaces
--radius-full 9999px pills, avatars
```

Generous but never bubbly. Default for surfaces: `--radius-lg` (14px).

---

## 6. Shadows & elevation

Dark mode uses **light-emitting** shadows (subtle glow) plus depth shadow.

```
--shadow-sm    0 1px 2px rgba(0,0,0,0.4)
--shadow-md    0 4px 12px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)
--shadow-lg    0 12px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05)
--shadow-xl    0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)

--glow-brand   0 0 32px rgba(61,91,255,0.35)
--glow-accent  0 0 40px rgba(155,123,255,0.30)
```

Glass effect:
```
.glass {
  background: rgba(23,23,27,0.6);
  backdrop-filter: blur(20px) saturate(140%);
  border: 1px solid rgba(255,255,255,0.06);
}
```

---

## 7. Iconography

- **Library:** Lucide (open, consistent, tree-shakeable)
- **Stroke:** 1.5px default, 1.75px for emphasized
- **Size:** 16 / 20 / 24 (most UI uses 16 or 20)
- **Custom brand glyphs:** the Lumen orb (used as loading indicator, AI moments)

---

## 8. Motion

**Principles**
1. Motion communicates state, never decorates.
2. Easing matches purpose: enter `cubic-bezier(0.2, 0.8, 0.2, 1)`, exit `cubic-bezier(0.4, 0, 1, 1)`.
3. Duration: 150ms (micro), 220ms (UI), 320ms (panels), 480ms (hero/marketing).
4. Reduced motion respected via `prefers-reduced-motion`.

**Signature motions**
- **AI streaming cursor** — a 2px-wide soft glow that pulses at 600ms
- **Tool-call card entry** — staggered Y-slide + fade, 40ms apart
- **Copilot drawer** — spring (stiffness 280, damping 32)
- **Page transitions** — none. Crossfade only for marketing.
- **Aurora hero background** — slow conic-gradient rotation, 30s loop, 0.4 opacity

---

## 9. Component states

Every interactive component defines six states:
`default · hover · focus-visible · active · disabled · loading`

Focus rings are **always visible** with `outline: 2px solid var(--brand-500); outline-offset: 2px;` — accessibility is not optional.

---

## 10. Accessibility (non-negotiable)

- WCAG 2.2 AA minimum, AAA on text
- Color contrast ≥ 4.5:1 (body), ≥ 3:1 (large text & UI)
- All actions keyboard reachable, in logical tab order
- ARIA labels on every icon-only button
- Live regions for copilot streaming (`aria-live="polite"`)
- Skip-to-content link on every page
- Reduced-motion alternative for all animations
- Voice input fully accessible without mouse

---

## 11. Responsive breakpoints

```
sm   ≥ 640px    large phones
md   ≥ 768px    tablets
lg   ≥ 1024px   small laptops
xl   ≥ 1280px   desktops
2xl  ≥ 1536px   large monitors
```

**Mobile-first.** Side rail collapses to bottom dock below `lg`. Copilot drawer becomes full-screen sheet below `md`.

---

## 12. Component library inventory

Built on shadcn/ui, themed to Lumen tokens:

**Primitives:** Button, IconButton, Input, Textarea, Select, Checkbox, Radio, Switch, Slider, Badge, Avatar, Tooltip, Popover, Dialog, Sheet, Drawer, Command, Tabs, Accordion, Toast, Progress, Skeleton, Separator

**Composites:**
- `CopilotMessage` (user / assistant / tool variants)
- `ToolCallCard` (running / success / error states)
- `ApprovalCard`
- `BriefingCard`
- `IntegrationCard`
- `WorkflowCard`
- `MemoryNode` (graph + table views)
- `StatTile`
- `EmptyState` (with copilot CTA)
- `PromptComposer` (textarea + voice + send + suggestions)

**Layout:** AppShell, SideRail, TopBar, CopilotDrawer, PageHeader, Section

---

## 13. Design tokens — exported as code

Tokens live in `packages/ui/src/tokens.ts` and are consumed by:
- Tailwind config (`packages/config/tailwind.preset.ts`)
- CSS variables in `packages/ui/src/styles/tokens.css`
- Native mobile (future) via JSON export

Single source of truth. Change a token → propagate everywhere.

---

## 14. Don'ts

- ❌ No emoji in product UI (allowed sparingly in marketing)
- ❌ No drop shadows on dark surfaces without a paired border
- ❌ No animated loaders longer than 300ms — use skeletons
- ❌ No more than two font weights per screen
- ❌ No gradients on body text
- ❌ No modals where a sheet would do
- ❌ No "Are you sure?" confirmations — use undo
