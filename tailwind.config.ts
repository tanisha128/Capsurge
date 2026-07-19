import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#131b2e", // Deep Navy
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#8fd2d2", // Cyan/Light-Teal
          foreground: "#ffffff",
        },
        tertiary: {
          DEFAULT: "#38485d", // Slate Grey
          foreground: "#ffffff",
        },
        surface: {
          DEFAULT: "#f7f9fb",
          dim: "#d8dadc",
          bright: "#f7f9fb",
        },
      },
      fontFamily: {
        serif: ["var(--font-montserrat)", "sans-serif"],
        sans: ["var(--font-montserrat)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
      spacing: {
        xs: "4px",
        sm: "12px",
        md: "24px",
        lg: "48px",
        xl: "80px",
      },
      borderRadius: {
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
      },
    },
  },
  plugins: [],
};
export default config;
