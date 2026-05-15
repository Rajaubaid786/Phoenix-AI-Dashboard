/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6A00",
        glow: "#FF8C42",
        bg: "#0B0F14",
        card: "#11161D",
        soft: "#161C23",
        text: "#EAEFF5",
        subtext: "#9AA4AF",
      },
    },
  },
  plugins: [],
}