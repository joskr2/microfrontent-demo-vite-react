import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PokemonTypeResponse {
  pokemon: Array<{
    pokemon: {
      name: string;
      url: string;
    };
  }>;
}

interface PokemonDetails {
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
      dream_world: {
        front_default: string;
      };
    };
  };
  name: string;
}

// Create a slice for selected Pokemon
export const selectedPokemonSlice = createSlice({
  name: 'selectedPokemon',
  initialState: {
    currentPokemon: null as PokemonDetails | null,
    history: [] as PokemonDetails[]
  },
  reducers: {
    setSelectedPokemon: (state, action: PayloadAction<PokemonDetails>) => {
      state.currentPokemon = action.payload;

      // Add to history if not already the most recent
      if (!state.history.length || state.history[0].name !== action.payload.name) {
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

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByType: builder.query<string[], string>({
      query: (type) => `type/${type.toLowerCase()}/`,
      transformResponse: (response: PokemonTypeResponse) =>
        response.pokemon.slice(0, 10).map((entry) => entry.pokemon.name),
    }),
    getPokemonDetails: builder.query<PokemonDetails, string>({
      query: (name) => `pokemon/${name.toLowerCase()}/`,
    }),
  }),
});

export const { useGetPokemonByTypeQuery, useGetPokemonDetailsQuery } = pokemonApi;
