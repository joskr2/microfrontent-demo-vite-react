import { useSelector, useDispatch } from 'react-redux';
import { Card } from 'shell/components/Card';
import type { RootState } from 'shell/store/store';
import { useNavigate } from 'react-router-dom';
import { Button } from 'shell/components/Button';
import { setSelectedPokemon } from 'shell/store/selectedPokemonSlice';
import type { PokemonDetails } from 'shell/store/pokemonApi';

const LastSeenPokemons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lastSeen = useSelector((state: RootState) => state.selectedPokemon.history.slice(0, 5));



  const handlePokemonClick = (pokemon: PokemonDetails) => {
    if (pokemon) {
      console.log("Dispatching setSelectedPokemon:", pokemon.name);
      dispatch(setSelectedPokemon(pokemon));
      console.log("Navigating to /pokemon-detail");
      navigate('/pokemon-detail');
    } else {
      console.warn("Pokemon details not available");
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Últimos Pokémon vistos</h3>
      {lastSeen.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No hay Pokémon recientes</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {lastSeen.map((pokemon) => (
            <Card
              key={pokemon.name}
              className="p-3 text-center cursor-pointer"
              onClick={() => handlePokemonClick(pokemon)}
            >
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                className="w-16 h-16 mx-auto mb-2"
              />
              <p className="font-medium capitalize">{pokemon.name}</p>
            </Card>
          ))}
        </div>
      )}
      <Button
        color="blue"
        onClick={handleGoBack}
        className="px-6 py-2"
      >
        Volver
      </Button>
    </div>
  );
};

export default LastSeenPokemons;
