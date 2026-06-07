import type { Config } from "tailwindcss";

/**
 * Lumen — Tailwind config (full inline design tokens).
 * Single source of truth for colors, type, motion, shadows, gradients.
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        brand: {
          50:  "#F0F4FF", 100: "#DDE5FF", 200: "#B8C7FF", 300: "#8AA3FF",
          400: "#5F7DFF", 500: "#3D5BFF", 600: "#2E47E6", 700: "#2438B8",
          800: "#1B2A8A", 900: "#131F66",
        },
        accent: { 400: "#B79CFF", 500: "#9B7BFF", 600: "#7E5FE6" },
        bg: { 0: "#0A0A0B", 1: "#111114", 2: "#17171B", 3: "#1F1F25", 4: "#2A2A32" },
        line: { 1: "#232329", 2: "#2E2E37" },
        ink: { 1: "#F5F5F7", 2: "#C9C9D1", 3: "#8A8A95", 4: "#5A5A66" },
        success: "#2ECC71",
        warning: "#F5A623",
        danger:  "#FF5C5C",
        info:    "#5AA9FF",
      },
      fontFamily: {
        sans:  ["Inter", "system-ui", "sans-serif"],
        mono:  ["JetBrains Mono", "ui-monospace", "monospace"],
        serif: ["Iowan Old Style", "Georgia", "serif"],
      },
      borderRadius: { xs: "4px", sm: "6px", md: "10px", lg: "14px", xl: "20px", "2xl": "28px" },
      boxShadow: {
        sm: "0 1px 2px rgba(0,0,0,0.4)",
        md: "0 4px 12px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)",
        lg: "0 12px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05)",
        xl: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
        glow: "0 0 32px rgba(61,91,255,0.35)",
        "glow-accent": "0 0 40px rgba(155,123,255,0.30)",
      },
      backgroundImage: {
        aurora: "linear-gradient(135deg, #3D5BFF 0%, #9B7BFF 100%)",
        dawn:   "linear-gradient(135deg, #FF7AB6 0%, #9B7BFF 60%, #3D5BFF 100%)",
      },
      transitionTimingFunction: {
        in:  "cubic-bezier(0.2, 0.8, 0.2, 1)",
        out: "cubic-bezier(0.4, 0, 1, 1)",
      },
      keyframes: {
        "fade-up":     { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        shimmer:       { "100%": { transform: "translateX(100%)" } },
        "aurora-spin": { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        "fade-up":     "fade-up 320ms cubic-bezier(0.2,0.8,0.2,1) both",
        shimmer:       "shimmer 1.4s linear infinite",
        "aurora-spin": "aurora-spin 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
