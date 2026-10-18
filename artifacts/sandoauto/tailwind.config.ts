import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "cream-gray": "#F6F4EF",
        "deep-navy": "#0F1F3D",
        "forest-green": "#17794A",
        caution: "#9A5B0F",
        alert: "#B3382C",
      },
      fontFamily: {
        sans: ["var(--font-noto-sans-georgian)", "Arial", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
