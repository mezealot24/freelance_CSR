import animatePlugin from "tailwindcss-animate";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // ไฟล์ที่ต้องการใช้ Tailwind CSS
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
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
        primary: {
          DEFAULT: "#F0F7FF",  // สีพื้นหลักอ่อนๆ ให้ความรู้สึกปลอดภัย
          dark: "#CCE4FF"      // สำหรับ hover states
        },
        secondary: {
          DEFAULT: "#7EB6FF",  // สีรอง ใช้กับ interactive elements
          dark: "#5B9EFF"      // สำหรับ hover states
        },
        accent: {
          DEFAULT: "#FFB17A",  // สีเน้น ให้ความรู้สึกอบอุ่น friendly
          hover: "#FF995C"     // สำหรับ hover states
        },
        warning: {
          soft: "#FFE4CC",     // สีเตือนแบบนุ่มนวล
          DEFAULT: "#FF9F5C",  // สีเตือนหลัก
          strong: "#FF8534"    // สีเตือนเข้ม
        },
        success: {
          soft: "#E3F3E6",     // สีถูกต้องแบบนุ่มนวล
          DEFAULT: "#4CAF50",  // สีถูกต้องหลัก
          strong: "#388E3C"    // สีถูกต้องเข้ม
        },
        neutral: {
          100: "#F8FAFC",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B"
        },
        boxshadow: {
          'game': '4px 4px 0 0 #422800',
          'game-press': '2px 2px 0 0 #422800',
        },
      }
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
    plugins: [animatePlugin], // ใช้ตัวแปร animatePlugin ที่ import มา
  };


