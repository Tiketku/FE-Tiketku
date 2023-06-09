/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        binar : {
          purple:'#A06ECE',
          grey:'#8A8A8A'
        }
      }
    },
  },
  plugins: [],
}
