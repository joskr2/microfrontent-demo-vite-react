import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Badge, Toast } from '../components';
import { Card } from '../components/card';
import { useGetPokemonByTypeQuery, useGetPokemonDetailsQuery } from '../store/pokemonApi';
import { useNavigate } from 'react-router-dom';
import { setSelectedPokemon } from '../store/selectedPokemonSlice';
import { selectCurrentPokemon } from '../store';

const PokemonFilterScreen = () => {
  const navigate = useNavigate();
  const pokemonTypes = ['Fire', 'Water', 'Electric', 'Dragon', 'Ghost'];
  const [selectedType, setSelectedType] = useState<string>('Fire');
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isSearching, setIsSearching] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const currentPokemon = useSelector(selectCurrentPokemon);

  // RTK Query hooks
  const { data: pokemonList = [], isLoading: isLoadingList } = useGetPokemonByTypeQuery(selectedType, {
    skip: !selectedType || isSearching,
  });

  // Filter pokemon based on search term
  const filteredPokemonList = searchTerm.trim() === ''
    ? pokemonList
    : isSearching
      ? [searchTerm.toLowerCase().trim()]
      : pokemonList.filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()));

  // Show toast when currentPokemon changes
  useEffect(() => {
    if (currentPokemon) {
      setShowToast(true);
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentPokemon]);

  const handleTypeClick = (type: string) => {
    setSearchTerm('');
    setIsSearching(false);
    setSelectedType(type);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // If search is empty, show type-filtered results
    if (value.trim() === '') {
      setIsSearching(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      setIsSearching(true);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'} p-4 md:p-8`}>
      {/* Toast for selected Pokemon */}
      {currentPokemon && (
        <Toast
          isVisible={showToast}
          type="info"
          title={`Pokémon seleccionado: ${currentPokemon.name}`}
          message={`Has seleccionado a ${currentPokemon.name.charAt(0).toUpperCase() + currentPokemon.name.slice(1)}`}
          position="bottom-right"
          onClose={() => setShowToast(false)}
          icon={
            currentPokemon.sprites && (
              <img
                src={currentPokemon.sprites.front_default ||
                  (currentPokemon.sprites.other &&
                    (currentPokemon.sprites.other['official-artwork']?.front_default ||
                      currentPokemon.sprites.other.dream_world?.front_default))}
                alt={currentPokemon.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            )
          }
        />
      )}
      <header className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4">
        <div className="w-full sm:w-2/3">
          <form onSubmit={handleSearchSubmit} className="flex w-full">
            <Input
              type="text"
              placeholder="Buscar Pokémon"
              className={`rounded-l-lg px-4 py-2 w-full ${theme === 'dark' ? 'bg-gray-600 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-200'}`}
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button
              type="submit"
              color="blue"
              className="rounded-r-lg px-6 py-2 font-medium"
            >
              Buscar
            </Button>
          </form>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button
            color="red"
            className="px-4 py-2 rounded-md transition-all hover:bg-red-600 hover:text-white"
            onClick={() => navigate(-1)}
          >
            Volver
          </Button>
          <Button
            color="indigo"
            className="px-4 py-2 rounded-md transition-all hover:bg-indigo-600 hover:text-white"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
          </Button>
          <Button
            color="emerald"
            className="px-4 py-2 rounded-md transition-all hover:bg-emerald-600 hover:text-white"
            onClick={() => navigate('/last-seen-pokemons')}
          >
            Ver Recientes
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 mb-8">
        {pokemonTypes.map((type) => (
          <Badge
            key={type}
            color="blue"
            className={`rounded-md py-3 px-4 text-center cursor-pointer transition-all hover:bg-blue-600 hover:text-white ${selectedType === type && !isSearching ? 'bg-blue-700 text-white' : ''}`}
            onClick={() => handleTypeClick(type)}
          >
            {type}
          </Badge>
        ))}
      </div>

      <div className="mt-8">
        <h2 className={`text-xl font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
          {isSearching
            ? `Resultados para: ${searchTerm}`
            : `Pokémon de tipo ${selectedType}:`}
        </h2>
        {isLoadingList && !isSearching ? (
          <div className="text-center py-8 bg-white dark:bg-gray-700 rounded-lg shadow-sm">Cargando Pokémon...</div>
        ) : filteredPokemonList.length === 0 ? (
          <div className="text-center py-8 bg-white dark:bg-gray-700 rounded-lg shadow-sm">No se encontraron Pokémon</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
    </div>
  );
};

// Separate component for Pokemon card to use individual queries
const PokemonCard = ({ name, theme }: { name: string; theme: 'light' | 'dark' }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: pokemonDetails, isLoading, isError } = useGetPokemonDetailsQuery(name);

  const handlePokemonClick = () => {
    if (pokemonDetails) {
      // 1. Despacha la acción para guardar el Pokémon en el store global del SHELL
      console.log("Dispatching setSelectedPokemon:", pokemonDetails.name); // Log para depuración
      dispatch(setSelectedPokemon(pokemonDetails));

      // 2. Navega a la ruta de detalle USANDO EL ROUTER (NO window.location.href)
      console.log("Navigating to /pokemon-detail"); // Log para depuración
      navigate('/pokemon-detail');
    } else {
      console.warn("Pokemon details not available to navigate for:", name);
    }
  };

  return (
    <Card
      className={`p-5 flex flex-col items-center ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'} rounded-lg shadow-sm transition-all cursor-pointer`}
      onClick={handlePokemonClick}
    >
      <h3 className={`font-semibold mb-3 capitalize text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
        {name}
      </h3>
      {isLoading ? (
        <div className={`w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          Loading...
        </div>
      ) : isError ? (
        <div className={`w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          Pokémon no encontrado
        </div>
      ) : pokemonDetails ? (
        <img
          src={pokemonDetails.sprites.other['official-artwork'].front_default ||
            pokemonDetails.sprites.front_default}
          alt={name}
          className="w-28 h-28 sm:w-36 sm:h-36 object-contain"
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
