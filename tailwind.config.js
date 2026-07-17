/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ocean': '#0891b2',
        'coral': '#fb7185',
        'sand': '#fef3c7',
      }
    },
  },
  plugins: [],
}