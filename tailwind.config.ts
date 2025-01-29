/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
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
        primary: "#ffe4e6",
        accent: {
          DEFAULT: "#fb7185",
          hover: "#e11d48",
        },
        border: {
          DEFAULT: "#10162F",  // สีขอบหลัก
          secondary: "#3C415C" // สีขอบรอง
        }
      },
      boxShadow: {
        'comic': '8px 8px 0px 0px #10162F',
        'comic-sm': '4px 4px 0px 0px #10162F',
        'comic-hover': '6px 6px 0px 0px #10162F',
        'comic-sm-hover': '2px 2px 0px 0px #10162F',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
      },
      transitionProperty: {
        'all': 'all',
      },
      transitionDuration: {
        '200': '200ms',
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
};