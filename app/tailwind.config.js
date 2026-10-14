/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        espresso: '#2B1D17',
        latte: '#C8A77B',
        cream: '#F4EBDD',
        paper: '#FFFDF8',
        rust: '#9A4314',
        // Spec value #7A6A60 is 4.4:1 on cream; nudged darker to pass WCAG AA (4.8:1).
        muted: '#74645A',
        line: '#E8DCCB',
        green: '#4F7A55',
        cup: {
          shot: '#3B2219',
          milk: '#E9D7BE',
          foam: '#FBF6EE',
          water: '#D9E4E8',
          choc: '#5A3324',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
