/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: "Gilroy",
      },
      colors: {
        'dark': {
          900: '#111',
          800: '#161616',
          700: '#1e1e1e',
          600: '#222',
          500: '#292929',
          400: '#2e2e2e',
          300: '#3a3c3f',
          200: '#414141'
        },
        'accent': {
          900: '#6B46C1',
          800: '#8855FD'
        },
        'error-bg': '#EE6B60',
        'brand-text': '#A9A9A9'
      }
    },
    
  },
  plugins: [],
}

