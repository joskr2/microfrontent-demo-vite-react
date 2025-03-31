import { Button } from 'shell/components/Button';
import { useSelector } from 'react-redux';
import type { RootState } from 'shell/store';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const PokemonDetail = () => {
  const selectedPokemon = useSelector((state: RootState) => state.selectedPokemon.currentPokemon);
  const { isDarkMode } = useSelector((state: RootState) => state.theme);
  const navigate = useNavigate();

  const handleGoBack = () => navigate(-1);

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-zinc-900 text-white' : 'bg-gray-100 text-black'}`}>
      <Helmet>
        <title>{selectedPokemon ? `${selectedPokemon.name} Details` : 'Pokémon Details'}</title>
      </Helmet>

      {!selectedPokemon ? (
        <div className="w-fit mx-auto p-8 text-center">
          <p className="text-lg">No se ha seleccionado ningún Pokémon desde la aplicación principal.</p>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-800 rounded-xl shadow-md overflow-hidden p-6">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                src={
                  selectedPokemon.sprites.other?.['official-artwork']?.front_default ||
                  selectedPokemon.sprites.front_default
                }
                alt={selectedPokemon.name}
                className="h-32 w-32 object-contain"
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm font-semibold mb-1">
                Pokémon #{selectedPokemon.id}
              </div>
              <h1 className="block text-2xl font-bold leading-tight mb-2 capitalize">
                {selectedPokemon.name}
              </h1>

              {selectedPokemon.types && (
                <div className="mt-4">
                  <h2 className="text-sm font-semibold mb-2">Tipos:</h2>
                  <div className="flex gap-2">
                    {selectedPokemon.types.map((typeInfo) => (
                      <span
                        key={`type-${typeInfo.type.name}`}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                          }`}
                      >
                        {typeInfo.type.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedPokemon.abilities && (
                <div className="mt-4">
                  <h2 className="text-sm font-semibold mb-2">Habilidades:</h2>
                  <ul className="space-y-1">
                    {selectedPokemon.abilities.map((abilityInfo) => (
                      <li
                        key={`ability-${abilityInfo.ability.name}`}
                        className="capitalize text-sm"
                      >
                        {abilityInfo.ability.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <div className="flex gap-4 justify-center">
          <Button
            color={isDarkMode ? 'white' : 'dark'}
            onClick={handleGoBack}
            className="px-6 py-2"
          >
            Volver
          </Button>
          <Button
            color={isDarkMode ? 'white' : 'dark'}
            onClick={() => navigate('/last-seen-pokemons')}
            className="px-6 py-2"
          >
            Ver Recientes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
