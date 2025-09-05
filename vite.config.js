import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src', // Set the project root to the 'src' directory
  build: {
    outDir: '../dist', // Output builds to a 'dist' directory at the project root
    emptyOutDir: true, // Clean the output directory on each build
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        agriculture: resolve(__dirname, 'src/agricultural-farming-logistics.html'),
        construction: resolve(__dirname, 'src/construction-manufacturing-freight.html'),
      },
    },
  },
  publicDir: '../public', // Set the public directory relative to the new root
});
