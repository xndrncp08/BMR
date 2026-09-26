import type { Config } from "tailwindcss";

/**
 * Colors are stored in globals.css as space-separated RGB channels so that
 * Tailwind's opacity modifiers (e.g. `bg-primary/10`, `ring-primary/30`)
 * work. A plain hex CSS variable silently drops the modifier in Tailwind v3.
 */
const channel = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const scale = (name: string, steps: number[]) =>
  Object.fromEntries(steps.map((step) => [step, channel(`${name}-${step}`)]));

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          ...scale("primary", STEPS),
          DEFAULT: channel("primary-600"),
          dark: channel("primary-700"),
          light: channel("primary-100"),
        },
        accent: {
          ...scale("accent", STEPS),
          DEFAULT: channel("accent-600"),
          dark: channel("accent-700"),
          light: channel("accent-100"),
        },
        neutral: scale("neutral", STEPS),
        error: {
          DEFAULT: channel("error"),
          light: channel("error-light"),
        },
        page: channel("page"),
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Fluid display sizes — scale smoothly between mobile and desktop
        "display-xl": ["clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2rem, 1.5rem + 2vw, 3.25rem)", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(1.625rem, 1.35rem + 1.1vw, 2.25rem)", { lineHeight: "1.15", letterSpacing: "-0.025em" }],
      },
      maxWidth: {
        container: "1240px",
        prose: "65ch",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(var(--shadow) / 0.06)",
        soft: "0 1px 2px rgb(var(--shadow) / 0.04), 0 4px 12px -2px rgb(var(--shadow) / 0.08)",
        lift: "0 2px 4px rgb(var(--shadow) / 0.04), 0 16px 32px -8px rgb(var(--shadow) / 0.16)",
        glow: "0 0 0 1px rgb(var(--primary-600) / 0.08), 0 24px 48px -12px rgb(var(--primary-700) / 0.35)",
        "inner-line": "inset 0 0 0 1px rgb(255 255 255 / 0.08)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "page-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(100%)" },
        },
        ping: {
          "75%, 100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      animation: {
        rise: "rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) backwards",
        "page-in": "page-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) backwards",
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        shimmer: "shimmer 1.6s ease-in-out infinite",
        ping: "ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
