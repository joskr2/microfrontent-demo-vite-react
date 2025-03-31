import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3002,
    strictPort: true,
  },
  preview: {
    port: 3002,
    strictPort: true,
  },
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'microfrontend2',
      filename: 'remoteEntry.js',
      remotes: {
        shell: 'http://localhost:3000/assets/remoteEntry.js',
      },
      exposes: {
        './LastSeenPokemons': './src/components/LastSeenPokemons.tsx',
      },
      shared: ['react', 'react-dom', 'react-redux', '@reduxjs/toolkit', '@reduxjs/toolkit/query', 'react-router-dom'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    rollupOptions: {
      output: {
        format: 'esm'
      }
    }
  },
});
