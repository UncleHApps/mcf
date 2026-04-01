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

        // Hero Images (Consolidated - using existing assets)
        'mining-hero': "url('/images/mining-freight-service.webp')",
        'agri-hero': "url('/images/agri-freight-service.webp')",
        'construction-hero': "url('/images/cross-border-construction-freight.webp')",
        'zimbabwe-hero': "url('/images/zimbabwe-cross-border-freight.webp')",
        'zambia-hero': "url('/images/zambia-cross-border-freight.webp')",
        'malawi-hero': "url('/images/malawi-cross-border-freight.webp')",
        'hazchem-hero': "url('/images/cross-border-flatbed-bins-001.webp')",
        'general-cargo-hero': "url('/images/cross-border-flatbed-freight.webp')",
      },
    },
  },
  plugins: [],
}