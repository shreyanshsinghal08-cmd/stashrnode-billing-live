import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: "#00B8FF",
          emerald: "#10B981",
          gold: "#FCEE4B",
        },
        surface: {
          glass: "rgba(15, 23, 42, 0.45)",
          border: "rgba(255, 255, 255, 0.12)",
        },
      },
      boxShadow: {
        glow: "0 0 25px rgba(0, 184, 255, 0.25)",
        "card-glass": "0 20px 50px rgba(0, 0, 0, 0.5), 0 0 25px rgba(0, 184, 255, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
