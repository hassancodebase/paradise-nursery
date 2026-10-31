
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],

  // Use the root path locally and the GitHub Pages
  // repository path when building for production.
  base: command === 'build' ? '/paradise-nursery/' : '/',
}));
