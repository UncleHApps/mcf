/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.html", // This is crucial for scanning your new country pages
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
      backgroundImage: {
        // Card Images (Moved from input.css)
        'mining-card': "url('/images/mining-sector-freight.webp')",
        'agri-card': "url('/images/agri-sector-freight.webp')",
        'construction-card': "url('/images/construction-sector-freight.webp')",

        // Hero Images (Consolidated)
        'mining-hero': "url('/images/mining-hero.webp')",
        'agri-hero': "url('/images/agri-hero.webp')",
        'construction-hero': "url('/images/construction-hero.webp')",
        'zimbabwe-hero': "url('/images/zimbabwe-hero.webp')",
        'zambia-hero': "url('/images/zambia-hero.webp')",
        'malawi-hero': "url('/images/malawi-hero.webp')",
        'hazchem-hero': "url('/images/hazchem-hero.webp')",
        'general-cargo-hero': "url('/images/general-cargo-hero.webp')",
      },
    },
  },
  plugins: [],
}