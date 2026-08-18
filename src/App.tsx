import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PokemonDetails from './pages/PokemonDetails';
import Favorites from './pages/Favorites';
import Compare from './pages/Compare';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col transition-colors duration-300 bg-[#050505]">
        <Navbar />
        <main className="flex-grow pt-[72px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/compare" element={<Compare />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
