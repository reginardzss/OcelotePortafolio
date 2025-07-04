import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        oceloteRed: "#ED4134",
        oceloteRedHover: "#f1574b",
        disabledGray:"#A9A9AC"
      },
    },
  },
  plugins: [],
} satisfies Config;
