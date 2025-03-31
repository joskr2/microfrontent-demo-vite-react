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

  const handleLogin = () => {
    dispatch(login('pokemon-trainer'));
    navigate('/pokemon-filter');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 dark:from-zinc-800 dark:to-zinc-900 p-4">
      <div className="w-full max-w-md mb-8 overflow-hidden rounded-2xl shadow-xl">
        <div className="relative aspect-square w-full">
          <img
            className="w-full h-full object-cover"
            src="https://image.pollinations.ai/prompt/squirtle%20pokemon%20in%20a%20beach%20with%20sunset%20digital%20art"
            alt="Pokemon Squirtle"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png';
            }}
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
          color="zinc"
          className="w-full py-3 rounded-full shadow-md hover:shadow-lg transition-all"
        >
          Trainer Profile
        </Button>

        <Button
          color="red"
          className="w-full py-3 rounded-full shadow-md hover:shadow-lg transition-all"
          onClick={handleLogin}
        >
          Start Adventure
        </Button>
      </div>
    </div>
  );
};

export default LoginView;
