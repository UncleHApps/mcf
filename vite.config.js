import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/', // CRITICAL for mcf.customgrowthplan.xyz
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        agriculture: resolve(__dirname, 'src/agricultural-farming-logistics.html'),
        construction: resolve(__dirname, 'src/construction-manufacturing-freight.html'),
        mining: resolve(__dirname, 'src/mining-industrial-chemical-transport.html'),
      },
    },
  },
  publicDir: 'public',
  // Optional: Add server.open if desired for local dev convenience
  // server: {
  //   open: '/index.html',
  // },
});
