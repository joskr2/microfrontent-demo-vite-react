import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

import LoginView from './pages/home';
import PokemonFilterScreen from './pages/pokemonFilter';

const PokemonDetail = React.lazy(() => import('microfrontend1/PokemonDetail'));
const LastSeenPokemons = React.lazy(() => import('microfrontend2/LastSeenPokemons'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<div className="container mx-auto p-4 text-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={
              <div className="container mx-auto p-4">
                <LoginView />
              </div>
            } />
            <Route path="/pokemon-filter" element={
              <div className="container mx-auto p-4">
                <PokemonFilterScreen />
                <LastSeenPokemons />
              </div>
            } />
            <Route path="/pokemon-detail" element={
              <div className="container mx-auto p-4">
                <PokemonDetail />
              </div>
            } />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
