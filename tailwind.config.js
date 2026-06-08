/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        forest: {
          50: "#f0f7f4",
          100: "#dcebe3",
          200: "#b9d6c7",
          300: "#8cbaa4",
          400: "#5B8C5A",
          500: "#3e7044",
          600: "#2D4A3E",
          700: "#264036",
          800: "#1f332c",
          900: "#192a24",
        },
        soil: {
          400: "#a07c24",
          500: "#8B6914",
          600: "#6d5210",
        },
        glass: {
          100: "#eaf6fa",
          200: "#d0eaf3",
          300: "#A8D5E5",
          400: "#8bc4d9",
        },
        mist: {
          100: "#f5fafb",
          200: "#E8F4F8",
          300: "#d4ebf1",
        },
        warn: {
          400: "#d9b74a",
          500: "#C9A227",
          600: "#a88720",
        },
      },
      fontFamily: {
        serif: ["Noto Serif SC", "Source Han Serif CN", "Songti SC", "serif"],
        sans: [
          "Noto Sans SC",
          "Source Han Sans CN",
          "PingFang SC",
          "sans-serif",
        ],
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
