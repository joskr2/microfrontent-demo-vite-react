import { useState } from 'react';
import { Button, Input, Badge } from '../components';
import { Card } from '../components/card';
import { useGetPokemonByTypeQuery, useGetPokemonDetailsQuery } from '../store/pokemonApi';

const PokemonFilterScreen = () => {
  const [username, setUsername] = useState('');
  const pokemonTypes = ['Fire', 'Water', 'Electric', 'Dragon', 'Ghost'];
  const [selectedType, setSelectedType] = useState<string>('Fire');
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // RTK Query hooks
  const { data: pokemonList = [], isLoading: isLoadingList } = useGetPokemonByTypeQuery(selectedType, {
    skip: !selectedType,
  });

  // Filter pokemon based on search term
  const filteredPokemonList = pokemonList.filter(name =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTypeClick = (type: string) => {
    setSelectedType(type);
  };

  return (
    <div className={`min-h-screen bg-gray-100 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'text-gray-800'} p-4 md:p-8`}>
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center w-full sm:w-auto">
          <Input
            type="text"
            placeholder="Buscar Pokémon"
            className={`rounded-full px-4 py-2 mr-4 w-full sm:w-auto ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
          {isLoadingList ? (
            <div className="text-center py-8">Cargando Pokémon...</div>
          ) : filteredPokemonList.length === 0 ? (
            <div className="text-center py-8">No se encontraron Pokémon con ese nombre</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredPokemonList.map((pokemonName) => (
                <PokemonCard
                  key={pokemonName}
                  name={pokemonName}
                  theme={theme}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Separate component for Pokemon card to use individual queries
const PokemonCard = ({ name, theme }: { name: string; theme: 'light' | 'dark' }) => {
  const { data: pokemonDetails, isLoading } = useGetPokemonDetailsQuery(name);

  return (
    <Card className={`p-4 flex flex-col items-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
      <h3 className={`font-semibold mb-2 capitalize ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        {name}
      </h3>
      {isLoading ? (
        <div className={`w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          Loading...
        </div>
      ) : pokemonDetails ? (
        <img
          src={pokemonDetails.sprites.other['official-artwork'].front_default ||
            pokemonDetails.sprites.front_default}
          alt={name}
          className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
          loading="lazy"
        />
      ) : (
        <div className={`w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          Error loading image
        </div>
      )}
    </Card>
  );
};

export default PokemonFilterScreen;
