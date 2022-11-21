/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      'sans': ['Open Sans', 'Arial', 'sans-serif'],
      'mono': ['Roboto Mono'],
    },
    extend: {
      colors: {
        blue: {
          950: '#17275c',
        },
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}
