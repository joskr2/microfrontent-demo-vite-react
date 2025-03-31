// shell/src/App.tsx (Modificado)

import React, { Suspense } from 'react'; // Importa Suspense y lazy
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
// Asegúrate que la ruta a tu store sea correcta. Si exportaste 'store' nombradamente:
import { store } from './store/store';
// Si lo exportaste por defecto: import store from './store/store';

import LoginView from './pages/home';
import PokemonFilterScreen from './pages/pokemonFilter';

// 1. Importa dinámicamente el componente del microfrontend usando React.lazy
//    Asegúrate que la declaración 'microfrontend1/PokemonDetail' existe en tus archivos .d.ts
const PokemonDetail = React.lazy(() => import('microfrontend1/PokemonDetail'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        {/* 2. Envuelve tus Routes con Suspense para manejar la carga del componente lazy */}
        <Suspense fallback={<div className="container mx-auto p-4 text-center">Cargando vista de detalle...</div>}>
          <Routes>
            <Route path="/" element={
              <div className="container mx-auto p-4">
                <LoginView />
              </div>
            } />
            <Route path="/pokemon-filter" element={
              <div className="container mx-auto p-4">
                <PokemonFilterScreen /> {/* Aquí es donde se hace clic y se navega */}
              </div>
            } />

            {/* 3. Añade la nueva ruta para el detalle del Pokémon */}
            <Route path="/pokemon-detail" element={
              <div className="container mx-auto p-4">
                <PokemonDetail /> {/* Renderiza el componente lazy importado */}
              </div>
            } />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
