/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#0A2342',
        'primary-dark': '#051426',
        'secondary-orange': '#F37021',
        'light-grey': '#F0F2F5',
        'medium-grey': '#e0e0e0',
        'dark-grey': '#333333',
        'text-light': '#FFFFFF',
        'text-light-dim': '#f0f0f0',
        'success-green': '#28a745',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          'lg': '1140px',
        },
      },
    },
  },
  plugins: [],
}