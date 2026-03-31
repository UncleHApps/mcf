import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { resolve } from 'path';

// This is the final, definitive configuration for a custom domain deployment.
export default defineConfig({
  base: '/',

  server: {
    https: false,
    host: true,
  },

  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/components'),
    }),
  ],

  // --- Core Project Configuration ---
  root: 'src',
  publicDir: '../public',
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
        main: 'index.html',
        quote: 'quote-refinement.html',
        agricultural: 'agricultural-farming-logistics.html',
        construction: 'construction-manufacturing-freight.html',
        malawi: 'cross-border-freight-malawi.html',
        zambia: 'cross-border-freight-zambia.html',
        zimbabwe: 'cross-border-freight-zimbabwe.html',
        hazchem: 'dedicated-hazchem-freight.html',
        general: 'general-cargo-ftl-freight.html',
        mining: 'mining-industrial-chemical-transport.html',
        import_export: 'import-export.html'
      }
    }
  }
});