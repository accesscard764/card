/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#1E2A78',
          50: '#E6E8F4',
          100: '#C2C7E5',
          200: '#9AA3D7',
          300: '#717FC8',
          400: '#495BB9',
          500: '#1E2A78',
          600: '#1B2369',
          700: '#171D5A',
          800: '#13184B',
          900: '#0F133C',
        },
        accent: {
          DEFAULT: '#FFD93D',
          50: '#FFFCEE',
          100: '#FFF8D6',
          200: '#FFF0A6',
          300: '#FFE976',
          400: '#FFE146',
          500: '#FFD93D',
          600: '#FFCF0D',
          700: '#DDB000',
          800: '#A88500',
          900: '#735A00',
        },
      },
      boxShadow: {
        'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};