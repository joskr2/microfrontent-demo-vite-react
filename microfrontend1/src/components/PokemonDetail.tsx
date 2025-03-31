import { Button } from 'shell/components/Button';
import { useSelector } from 'react-redux';
import type { RootState } from 'shell/store';
import { useNavigate } from'react-router-dom';

const PokemonDetail = () => {
  // Get the selected Pokemon from the shell's global state using the imported types
  const selectedPokemon = useSelector((state: RootState) => state.selectedPokemon.currentPokemon);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navega una entrada atrás en el historial del navegador
    // O podrías navegar a una ruta específica como navigate('/pokemon-filter');
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md">
      <h3 className="text-lg font-semibold mb-2">Pokémon Seleccionado:</h3>

      {!selectedPokemon ? (
        <p>No se ha seleccionado ningún Pokémon desde la aplicación principal.</p>
      ) : (
        <div>
          <p>Nombre: {selectedPokemon.name}</p>
          <img
            src={
              selectedPokemon.sprites.other?.['official-artwork']?.front_default ||
              selectedPokemon.sprites.front_default
            }
            alt={selectedPokemon.name}
            className="w-32 h-32"
          />

          {selectedPokemon.types && (
            <div className="mt-2">
              <p className="font-medium">Tipos:</p>
              <div className="flex gap-2">
                {selectedPokemon.types.map((typeInfo: { type: { name: string } }) => (
                  <span
                    key={`type-${typeInfo.type.name}`}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {typeInfo.type.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {selectedPokemon.abilities && (
            <div className="mt-2">
              <p className="font-medium">Habilidades:</p>
              <ul className="list-disc list-inside">
                {selectedPokemon.abilities.map((abilityInfo: { ability: { name: string } }) => (
                  <li
                    key={`ability-${abilityInfo.ability.name}`}
                    className="capitalize"
                  >
                    {abilityInfo.ability.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

            <div className="mt-6 text-center">
              {/* Usa el botón importado del Shell */}
              <Button
                color="blue"
                onClick={handleGoBack}
                className="px-6 py-2"
              >
                Volver
              </Button>
            </div>
        </div>
      )}
    </div>
  );
};

export default PokemonDetail;
