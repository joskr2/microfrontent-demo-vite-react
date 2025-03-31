import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// interface Pokemon {
//   id: number;
//   name: string;
//   height: number;
//   weight: number;
//   sprites: {
//     front_default: string;
//   };
// }

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByType: builder.query({
      query: (type) => `type/${type}`,
    }),
    getPokemonDetail: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonByTypeQuery, useGetPokemonDetailQuery } = pokemonApi;
