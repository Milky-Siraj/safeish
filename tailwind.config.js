/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          700: '#447551', // Updated primary green
          800: '#365f41', // Darker green (adjusted)
        },
        yellow: {
          400: '#FFE44D',
          500: '#FFD700', // Gold
        }
      },
    },
  },
  plugins: [],
};