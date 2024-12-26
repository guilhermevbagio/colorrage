/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        black: '#010001', 
        black2:'#010001', 
        ragered: '#440602',
        ragered2: '#bf0000',
        white: '#FFFFFF', 
      },
    },
  },
  plugins: [],
}
