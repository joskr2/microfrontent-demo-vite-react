import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
