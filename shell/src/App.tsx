import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginView from './pages/home';
import PokemonFilterScreen from './pages/pokemonFilter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="container mx-auto p-4">
            <LoginView />
          </div>
        } />
        <Route path="/pokemon-filter" element={
          <div className="container mx-auto p-4">
            <PokemonFilterScreen />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
