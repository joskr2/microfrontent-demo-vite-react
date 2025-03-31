import { Button } from '../components/button';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { toggleTheme } from '../store/themeSlice';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/userSlice';

const LoginView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useSelector((state: RootState) => state.theme);

  const handlePokemonList = () => {
    dispatch(login('pokemon-trainer'));
    navigate('/pokemon-filter');
  };

  const handleLastSeen = () => {
    dispatch(login('pokemon-trainer'));
    navigate('/last-seen-pokemons');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-zinc-800 dark:to-zinc-900 p-4">
      <div className="w-full max-w-md mb-8 overflow-hidden rounded-2xl shadow-xl">
        <div className="relative aspect-square w-full">
          <img
            className="w-full h-full object-cover"
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
            alt="Pokemon Squirtle"
            loading="lazy"
          />
        </div>
      </div>

      <div className="w-full max-w-xs space-y-4">
        <Button
          color={isDarkMode ? 'white' : 'dark'}
          onClick={() => dispatch(toggleTheme())}
          className="w-full py-3 rounded-full shadow-md hover:shadow-lg transition-all"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>

        <Button
          color="blue"
          className="w-full py-3 rounded-full shadow-md hover:shadow-lg transition-all"
          onClick={handlePokemonList}
        >
          View Pokémon List
        </Button>

        <Button
          color="green"
          className="w-full py-3 rounded-full shadow-md hover:shadow-lg transition-all"
          onClick={handleLastSeen}
        >
          View Last Seen
        </Button>
      </div>
    </div>
  );
};

export default LoginView;
