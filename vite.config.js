import { resolve } from 'path';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert'; // <-- 1. Already imported, which is great.

export default defineConfig({
  // --- Server Configuration for Local Development ---
  server: {
    https: true, // This enables HTTPS
    host: true,  // This makes the server accessible on your network
  },

  // --- Core Project Configuration ---
  base: '/', // Base URL for the deployed site
  root: 'src', // Specifies that your source files (like index.html) are in the 'src' folder
  publicDir: '../public', // Moves the public directory lookup to the project root

  // --- Build Configuration for Production ---
  build: {
    outDir: '../dist', // Output directory for the production build
    emptyOutDir: true, // Clears the dist directory before each build
    rollupOptions: {
      input: {
        // --- This defines all the pages in your site ---
        main: resolve(__dirname, 'src/index.html'),
        agriculture: resolve(__dirname, 'src/agricultural-farming-logistics.html'),
        construction: resolve(__dirname, 'src/construction-manufacturing-freight.html'),
        mining: resolve(__dirname, 'src/mining-industrial-chemical-transport.html'),
        // You'll need to add your other new pages here to build them for production:
        zimbabwe: resolve(__dirname, 'src/cross-border-freight-zimbabwe.html'),
        zambia: resolve(__dirname, 'src/cross-border-freight-zambia.html'),
        malawi: resolve(__dirname, 'src/cross-border-freight-malawi.html'),
        hazchem: resolve(__dirname, 'src/dedicated-hazchem-freight.html'),
        general: resolve(__dirname, 'src/general-cargo-ftl-freight.html'),
      },
    },
  },

  // --- Plugins ---
  plugins: [
    mkcert(), // <-- 2. Added the plugin to the plugins array
  ],
});