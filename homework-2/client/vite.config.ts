import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      // Treat every `.svg` import as a React component by default
      // (without requiring the `?react` query suffix).
      include: '**/*.svg',
    }),
  ],
});
