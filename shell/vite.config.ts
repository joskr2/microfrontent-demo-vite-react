import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    strictPort: true,
  },
  preview: {
    port: 3000,
    strictPort: true,
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
      shared: ['react', 'react-dom', 'react-redux', '@reduxjs/toolkit', '@reduxjs/toolkit/query','react-router-dom'],
      exposes: {
        './components': './src/components/index',
        './components/Card': './src/components/card',
        './components/Toast': './src/components/toast',
        './components/Alert': './src/components/alert',
        './components/Badge': './src/components/badge',
        './components/Button': './src/components/button',
        './components/Checkbox': './src/components/checkbox',
        './components/DescriptionList': './src/components/description-list',
        './components/Dialog': './src/components/dialog',
        './components/Divider': './src/components/divider',
        './components/Dropdown': './src/components/dropdown',
        './components/Fieldset': './src/components/fieldset',
        './components/Input': './src/components/input',
        './components/Link': './src/components/link',
        './components/Listbox': './src/components/listbox',
        './components/Navbar': './src/components/navbar',
        './components/Select': './src/components/select',
        './components/Sidebar': './src/components/sidebar',
        './components/Table': './src/components/table',
        './components/Text': './src/components/text',
        './store': './src/store/store',
        './store/selectedPokemonSlice': './src/store/selectedPokemonSlice',
        './store/pokemonApi': './src/store/pokemonApi',
        // Removed './store/types' since it doesn't exist
        './store/index': './src/store/index' // Optional - exposes selectors and types
      },
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
  },
});
