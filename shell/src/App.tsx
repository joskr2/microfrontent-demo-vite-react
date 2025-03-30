import React, { Suspense } from 'react';

const PokemonDetail = React.lazy(() => import('microfrontend1/PokemonDetail'));
const Recommendations = React.lazy(() => import('microfrontend2/Recommendations'));

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Shell Principal</h1>

      <div className="mb-4 border p-4">
        <h2 className="text-xl font-semibold mb-2">Detalle del Pokémon</h2>
        <Suspense fallback={<div>Cargando...</div>}>
          <PokemonDetail />
        </Suspense>
      </div>

       <div className="border p-4">
        <h2 className="text-xl font-semibold mb-2">Recomendaciones</h2>
        <Suspense fallback={<div>Cargando...</div>}>
          <Recommendations />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
