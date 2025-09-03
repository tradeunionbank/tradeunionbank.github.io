/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      hologram: {
        'background': 'linear-gradient(135deg, #ff00cc, #3333ff, #00ffcc, #ffcc00)',
        'background-size': '400% 400%',
        'animation': 'hologram 8s ease infinite',
      },
      keyframes: {
        hologram: {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
      },
    },
  },
  plugins: [],
}

