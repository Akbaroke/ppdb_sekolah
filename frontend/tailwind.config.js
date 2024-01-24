/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green_primary: '#003317',
        white_primary: '#F5F5F5',
        gold: '#AE7D00',
        success_primary: '#008D41',
        success_secondary: '#CCE8D9',
        warning_primary: '#FFB803',
        warning_secondary: '#FFF1CD',
        danger_primary: '#FF3030',
        danger_secondary: '#FFD6D6',
      },
      fontFamily: {
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
