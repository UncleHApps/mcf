import { defineConfig } from 'vite';

// This configuration is specifically for deploying to GitHub Pages.
export default defineConfig({
  // IMPORTANT: Replace 'YOUR_REPOSITORY_NAME' with the actual name of your GitHub repository.
  // For example, if your repo URL is github.com/your-name/maschem-quote, this should be '/maschem-quote/'
  base: '/',

  // --- Server Configuration for Local Development ---
  server: {
    https: true,
    host: true,
  },

  // --- Core Project Configuration ---
  root: 'src',
  envDir: '..',

  // --- Build Process Configuration ---
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'src/index.html',
        quote: 'src/quote-refinement.html',
        // Add other pages here if they are not linked from index.html
      }
    }
  }
});
