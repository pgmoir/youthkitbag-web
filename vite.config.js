import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Automatically opens the app in the browser
    port: 3000  // Matches CRA's default port (optional)
  },
  build: {
    outDir: 'build', // Optional: Ensures output matches CRA's default structure
  }
});
