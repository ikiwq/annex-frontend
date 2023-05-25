/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray-900': '#05141C',
        'custom-gray-800': '#1B2730',
        'custom-gray-700': '#28353E'
      },
      fontFamily: {
        'Amita' : ['Amita', 'cursive'],
      }
    },
  },
  plugins: [],
}