import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { PokemonDetails } from './pokemonApi'; // Importa la interfaz desde pokemonApi

// Define the state interface
interface SelectedPokemonState {
  currentPokemon: PokemonDetails | null;
  history: PokemonDetails[];
}

// Initial state
const initialState: SelectedPokemonState = {
  currentPokemon: null,
  history: []
};

// Create the slice
export const selectedPokemonSlice = createSlice({
  name: 'selectedPokemon',
  initialState,
  reducers: {
    setSelectedPokemon: (state, action: PayloadAction<PokemonDetails>) => {
      state.currentPokemon = action.payload;

      // Add to history if not already the most recent
      if (state.history.length === 0 || state.history[0]?.name !== action.payload.name) {
        // Remove duplicates from history
        state.history = state.history.filter(p => p.name !== action.payload.name);
        // Add to the beginning of history
        state.history.unshift(action.payload);
        // Limit history to 10 items
        if (state.history.length > 10) {
          state.history = state.history.slice(0, 10);
        }
      }
    }
  }
});

export const { setSelectedPokemon } = selectedPokemonSlice.actions;
export default selectedPokemonSlice.reducer;
