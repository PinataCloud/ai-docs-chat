import type { Config } from "tailwindcss";
const path = require('path');

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        purple: "#582cd6", 
        green: "#33d6a8", 
        bgColor: "#201D29", 
        dark: "#171420"
      },
      fontFamily: {
        custom: ['PPNeueMachina', 'sans-serif'],
        body: ['Telegraf', 'sans-serif']
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
