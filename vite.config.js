import { defineConfig } from 'vite';

// This is the final, definitive configuration for a custom domain deployment.
export default defineConfig({
  base: '/', 

  server: {
    https: false, 
    host: true,
  },

  // --- Core Project Configuration ---
  root: 'src',
  // THE FIX IS HERE:
  // This tells both the dev server AND the build process to look one
  // directory up from 'src' to find the .env file.
  envDir: '..',

  // --- Build Process Configuration ---
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'src/index.html',
        quote: 'src/quote-refinement.html',
        agricultural: 'src/agricultural-farming-logistics.html',
        construction: 'src/construction-manufacturing-freight.html',
        malawi: 'src/cross-border-freight-malawi.html',
        zambia: 'src/cross-border-freight-zambia.html',
        zimbabwe: 'src/cross-border-freight-zimbabwe.html',
        hazchem: 'src/dedicated-hazchem-freight.html',
        general: 'src/general-cargo-ftl-freight.html',
        mining: 'src/mining-industrial-chemical-transport.html'
      }
    }
  }
});