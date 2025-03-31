import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { pokemonApi } from './pokemonApi';
import selectedPokemonReducer from './selectedPokemonSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    selectedPokemon: selectedPokemonReducer,
    theme: themeReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create hooks for accessing the store
export const selectCurrentPokemon = (state: RootState) => state.selectedPokemon.currentPokemon;
export const selectPokemonHistory = (state: RootState) => state.selectedPokemon.history;
