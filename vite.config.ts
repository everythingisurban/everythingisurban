import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // This ensures assets are linked relatively for GitHub Pages
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});