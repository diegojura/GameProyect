/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
        rubiksh: ["Rubik Doodle Shadow", "sans-serif"],
      },
      colors: {
        industrial: {
          100: "#F8F9FA",
          200: "#E9ECEF",
          300: "#DEE2E6",
          400: "#CED4DA",
          500: "#ADB5BD",
          600: "#6C757D",
        },
        metallic: {
          100: "#E8EAF6",
          200: "#C5CAE9",
          300: "#7986CB",
          400: "#3F51B5",
          500: "#303F9F",
          600: "#1A237E",
        },
        accent: {
          100: "#90CAF9",
          200: "#42A5F5",
          300: "#1E88E5",
          400: "#1565C0",
        }
      }
    },
  },
  plugins: [require("flowbite/plugin")],
};
