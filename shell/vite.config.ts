import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'shell',
      remotes: {
        microfrontend1: 'http://localhost:3001/assets/remoteEntry.js',
        microfrontend2: 'http://localhost:3002/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom', 'react-redux', '@reduxjs/toolkit', '@reduxjs/toolkit/query'],
      exposes: {
        './components': './src/components'
      },
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
  },
});
