/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 🌙 Enable dark mode via class
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        netflixRed: '#E50914',
        netflixRedHover: '#B00710',
        netflixDark: '#1E1E1E',
        netflixBackgroundStart: '#121212',
        netflixBackgroundEnd: '#181818',
      },
    },
  },
  plugins: [],
};
