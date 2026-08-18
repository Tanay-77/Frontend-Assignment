import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PokemonDetails from './pages/PokemonDetails';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-grow pt-[72px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
