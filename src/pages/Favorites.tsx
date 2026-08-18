import { useNavigate } from 'react-router-dom';
import { Heart, Search } from 'lucide-react';
import PokemonGrid from '../components/PokemonGrid';
import { useFavorites } from '../contexts/FavoritesContext';

const Favorites = () => {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-3">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            Your Favorites
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto md:mx-0">
            A collection of your most cherished Pokémon.
          </p>
        </div>

        {favorites.length > 0 ? (
          <PokemonGrid 
            pokemon={favorites} 
            isLoading={false} 
            error={null} 
          />
        ) : (
          <div className="glass-card p-12 flex flex-col items-center justify-center text-center w-full max-w-lg mx-auto my-12 animate-fade-in-up">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mb-6">
              <Heart className="h-10 w-10 text-slate-300 dark:text-slate-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Your Pokédex is empty.</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Start adding Pokémon to your favorites.</p>
            
            <button 
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/30 flex items-center gap-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/50"
            >
              <Search className="w-5 h-5" />
              Explore Pokémon
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
