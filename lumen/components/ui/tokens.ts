/** Lumen — design tokens, single source of truth. */
export const tokens = {
  color: {
    brand: { 50: "#F0F4FF", 100: "#DDE5FF", 200: "#B8C7FF", 300: "#8AA3FF",
             400: "#5F7DFF", 500: "#3D5BFF", 600: "#2E47E6", 700: "#2438B8",
             800: "#1B2A8A", 900: "#131F66" },
    accent: { 400: "#B79CFF", 500: "#9B7BFF", 600: "#7E5FE6" },
    bg:   { 0: "#0A0A0B", 1: "#111114", 2: "#17171B", 3: "#1F1F25", 4: "#2A2A32" },
    line: { 1: "#232329", 2: "#2E2E37" },
    ink:  { 1: "#F5F5F7", 2: "#C9C9D1", 3: "#8A8A95", 4: "#5A5A66" },
    semantic: { success: "#2ECC71", warning: "#F5A623", danger: "#FF5C5C", info: "#5AA9FF" },
  },
  font: {
    family: { sans: "Geist Sans, Inter, system-ui, sans-serif",
              mono: "Geist Mono, ui-monospace, monospace",
              serif: "Tiempos, Iowan Old Style, Georgia, serif" },
    size: { xs: 12, sm: 14, base: 16, lg: 18, xl: 20,
            "2xl": 24, "3xl": 30, "4xl": 36, "5xl": 48, "6xl": 60, "7xl": 72 },
    weight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
  },
  space: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96] as const,
  radius: { xs: 4, sm: 6, md: 10, lg: 14, xl: 20, "2xl": 28, full: 9999 },
  duration: { micro: 150, ui: 220, panel: 320, hero: 480 },
  easing: {
    in:  "cubic-bezier(0.2, 0.8, 0.2, 1)",
    out: "cubic-bezier(0.4, 0, 1, 1)",
  },
} as const;

export type Tokens = typeof tokens;
