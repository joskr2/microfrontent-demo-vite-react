import { useState, useEffect, useCallback } from 'react';
import { Button, Input, Badge } from '../components';
import { Card } from '../components/card';

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

const PokemonFilterScreen = () => {
  const [username, setUsername] = useState('');
  const pokemonTypes = ['Fire', 'Water', 'Electric', 'Dragon', 'Ghost'];
  const [selectedType, setSelectedType] = useState<string | null>('Fire');
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [pokemonDetails, setPokemonDetails] = useState<Record<string, PokemonDetails>>({});

  const handleTypeClick = useCallback(async (type: string) => {
    setSelectedType(type);
    setPokemonList([]);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type.toLowerCase()}/`);
      const data: PokemonTypeResponse = await response.json();
      const pokemonNames = data.pokemon.slice(0, 10).map((entry) => entry.pokemon.name);
      setPokemonList(pokemonNames);
    } catch (error) {
      console.error(`Error fetching Pokemon de tipo ${type}:`, error);
    }
  }, []);

  const fetchPokemonDetails = useCallback(async (pokemonName: string) => {
    if (pokemonDetails[pokemonName]) return;

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}/`);
      const data = await response.json();
      setPokemonDetails(prev => ({
        ...prev,
        [pokemonName]: data
      }));
    } catch (error) {
      console.error(`Error fetching details for ${pokemonName}:`, error);
    }
  }, [pokemonDetails]);

  useEffect(() => {
    for (const name of pokemonList) {
      fetchPokemonDetails(name);
    }
  }, [pokemonList, fetchPokemonDetails]);

  // Load Fire type Pokemon by default
  useEffect(() => {
    if (selectedType) {
      handleTypeClick(selectedType);
    }
  }, [handleTypeClick, selectedType]);

  return (
    <div className={`min-h-screen bg-gray-100 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'text-gray-800'} p-4 md:p-8`}>
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center w-full sm:w-auto">
          <Input
            type="text"
            placeholder="Buscador"
            className={`rounded-full px-4 py-2 mr-4 w-full sm:w-auto ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
          />
        </div>
        <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end">
          <span>Nombre usuario</span>
          <Button
            color="zinc"
            className="ml-4 px-3 py-2 rounded-md"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? 'Tema oscuro' : 'Tema claro'}
          </Button>
        </div>
      </header>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="usuario"
          className={`rounded-md px-4 py-2 w-full ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 mb-8">
        {pokemonTypes.map((type) => (
          <Badge
            key={type}
            color="blue"
            className={`rounded-md py-2 px-4 text-center ${selectedType === type ? 'bg-blue-700' : ''}`}
            onClick={() => handleTypeClick(type)}
          >
            {type}
          </Badge>
        ))}
      </div>

      {selectedType && (
        <div className="mt-8">
          <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            Pokémon de tipo {selectedType}:
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pokemonList.map((pokemonName) => (
              <Card key={pokemonName} className={`p-4 flex flex-col items-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                <h3 className={`font-semibold mb-2 capitalize ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                  {pokemonName}
                </h3>
                {pokemonDetails[pokemonName] ? (
                  <img
                    src={pokemonDetails[pokemonName]?.sprites.other['official-artwork'].front_default ||
                      pokemonDetails[pokemonName]?.sprites.front_default}
                    alt={pokemonName}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div className={`w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    Loading...
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonFilterScreen;
