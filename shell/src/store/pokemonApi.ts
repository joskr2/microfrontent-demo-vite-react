import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface PokemonTypeResponse {
  pokemon: Array<{
    pokemon: {
      name: string;
      url: string;
    };
  }>;
}

export interface PokemonDetails {
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
  id: number; // Asegúrate de incluir el 'id' si lo necesitas
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  // Añade otras propiedades según sea necesario
}

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
