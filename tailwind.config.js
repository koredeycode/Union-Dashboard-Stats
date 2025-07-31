// import type { Config } from "tailwindcss";

const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#121212",
        "card-bg": "#1e1e1e",
        "text-primary": "#e0e0e0",
        "text-secondary": "#a0a0a0",
        "table-border": "#3a3a3a",
        level: {
          1: "#a0a0a0",
          2: "#bdbdbd",
          3: "#64b5f6",
          4: "#42a5f5",
          5: "#2196f3",
          6: "#9ccc65",
          7: "#8bc34a",
          8: "#7cb342",
          9: "#ffca28",
          10: "#ffb300",
        },
        "id-accent": "#a0ecfd",
      },
    },
    fontFamily: {
      sans: ["Inter", "Roboto", "sans-serif"],
    },
  },
  plugins: [],
};
export default config;
