import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0F19",
        surface: "#131a2a",
        accent: "#4C8BF5",
        subtle: "#1F2A3E"
      },
      boxShadow: {
        glass: "0 20px 45px rgba(0,0,0,0.35)"
      }
    }
  },
  plugins: []
};

export default config;
