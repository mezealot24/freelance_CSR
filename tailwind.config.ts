import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    fontFamily: {
      primary: "var(--font-jetbrainsMono)",
    },
    extend: {
      colors: {
        border: "#262626",
        input: "#262626",
        ring: "#e63946",
        background: "#0f172a",
        foreground: "#f2f2f2",
        primary: "#1c1c22",        
        secondary: {
          DEFAULT: "#262626",
          foreground: "#fafafa",
        },
        destructive: {
          DEFAULT: "#992b2b",
          foreground: "#ffeded",
        },
        muted: {
          DEFAULT: "#262626",
          foreground: "#9ea3b0",
        },
        accent: {
          DEFAULT: "#2a1e1a",
          foreground: "#fafafa",
        },
        popover: {
          DEFAULT: "#181818",
          foreground: "#f2f2f2",
        },
        card: {
          DEFAULT: "#1a1a1a",
          foreground: "#f2f2f2",
        },
        chart: {
          1: "#2a72d4",
          2: "#28a745",
          3: "#f4a261",
          4: "#9b5de5",
          5: "#e63946",
        },
      },
      boxShadow: {
        comic: "8px 8px 0px 0px #10162F",
        "comic-sm": "4px 4px 0px 0px #10162F",
        "comic-hover": "6px 6px 0px 0px #10162F",
        "comic-sm-hover": "2px 2px 0px 0px #10162F",
      },
      borderWidth: {
        3: "3px",
        4: "4px",
      },
      transitionProperty: {
        all: "all",
      },
      transitionDuration: {
        200: "200ms",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
