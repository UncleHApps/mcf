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
        main: resolve(__dirname, 'src/index.html'),
        quote: resolve(__dirname, 'src/quote-refinement.html'),
        agricultural: resolve(__dirname, 'src/agricultural-farming-logistics.html'),
        construction: resolve(__dirname, 'src/construction-manufacturing-freight.html'),
        malawi: resolve(__dirname, 'src/cross-border-freight-malawi.html'),
        zambia: resolve(__dirname, 'src/cross-border-freight-zambia.html'),
        zimbabwe: resolve(__dirname, 'src/cross-border-freight-zimbabwe.html'),
        hazchem: resolve(__dirname, 'src/dedicated-hazchem-freight.html'),
        general: resolve(__dirname, 'src/general-cargo-ftl-freight.html'),
        mining: resolve(__dirname, 'src/mining-industrial-chemical-transport.html'),
        import_export: resolve(__dirname, 'src/import-export.html')
      }
    }
  }
});