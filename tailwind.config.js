/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        perandory: ["Perandory", "serif"],
        perandoryCondensed: ["Perandory Condensed", "serif"],
        perandorySemi: ["Perandory Semi", "serif"],
      },
    },
  },
  plugins: [],
};