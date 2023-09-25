/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    backgroundImage: {
      "ins-icons": "url('../src/images/ins-icons.png')",
      "mobile-app": "url('../src/images/mobile-app.png')",
    },
    backgroundPosition: {
      lock: "-130px 0",
    },
  },
  plugins: [],
};
