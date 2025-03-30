import React, { useState } from 'react';

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

const PokemonDetail = () => {
  const [pokemonName, setPokemonName] = useState('charmander');
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPokemon = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if (!response.ok) {
        throw new Error('No se encontró el Pokémon.');
      }
      const data = await response.json();
      setPokemon(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      setPokemon(null);
    } finally {
      setIsLoading(false);
    }
  }, [pokemonName]);

  React.useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <h3 className="text-lg font-semibold mb-2">Detalle de {pokemonName}:</h3>
      {isLoading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error al cargar el Pokémon: {error}</p>
      ) : pokemon ? (
        <div>
          <p>Nombre: {pokemon.name}</p>
          <img src={pokemon.sprites?.front_default} alt={pokemon.name} className="w-32 h-32" />
        </div>
      ) : (
        <p>No se encontró el Pokémon.</p>
      )}
      <input
        type="text"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
        className="mt-2 border rounded p-1"
      />
      <button type="button" onClick={fetchPokemon} className="bg-blue-500 text-white rounded p-1 ml-2">Buscar</button>
    </div>
  );
};

export default PokemonDetail;
