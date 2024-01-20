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
        pending_primary: '#FFB803',
        pending_secondary: '#FFF1CD',
      },
      fontFamily: {
        jakarta: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
