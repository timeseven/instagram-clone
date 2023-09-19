/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    backgroundImage: {
      "mobile-app": "url('../src/images/mobile-app.png')",
    },
  },
  plugins: [],
};
