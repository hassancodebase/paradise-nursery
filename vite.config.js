import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// For GitHub Pages project sites, set base to '/YOUR-REPOSITORY-NAME/'.
// Example: base: '/paradise-nursery/'
export default defineConfig({
  plugins: [react()],
  base: '/',
});