/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
    "./app/styles/globals.css", // ✅ Ensure Tailwind watches globals.css
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
