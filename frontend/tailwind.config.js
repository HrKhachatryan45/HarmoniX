/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        roboto:["Roboto", "sans-serif"],
        playFair:["Playfair Display", "serif"],
        bree:["Bree Serif", "serif"],
        rubik:["Rubik Wet Paint", "system-ui"]
      }
    },
  },
  plugins: [require('daisyui')],
}