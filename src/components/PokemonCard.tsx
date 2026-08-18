import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Pokemon } from '../types/pokemon';
import { getTypeColor } from '../utils/pokemonColors';
import { useFavorites } from '../contexts/FavoritesContext';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(pokemon.id);

  const mainType = pokemon.types[0]?.type.name || 'normal';
  const typeColorClass = getTypeColor(mainType);
  
  // Format ID to 3 digits (e.g., #001)
  const formattedId = `#${pokemon.id.toString().padStart(3, '0')}`;
  
  // Get image, preferring official artwork, falling back to front_default
  const imageUrl = pokemon.sprites.other['official-artwork']?.front_default || pokemon.sprites.front_default;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to details page
    toggleFavorite(pokemon);
  };

  return (
    <Link 
      to={`/pokemon/${pokemon.id}`}
      className="group relative block glass-card overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:hover:shadow-slate-700/50 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/50"
    >
      {/* Background Accent based on main type */}
      <div className={`absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-20 ${typeColorClass}`}></div>
      
      <div className="p-5 relative z-10">
        <div className="flex justify-between items-start mb-4">
          <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{formattedId}</span>
          {/* Favorite button */}
          <button 
            className={`p-1.5 rounded-full transition-colors z-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 hover:scale-110 ${
              favorited 
                ? 'bg-red-50 dark:bg-red-900/30 text-red-500' 
                : 'bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 text-slate-400 hover:text-red-500'
            }`}
            onClick={handleFavoriteClick}
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-5 h-5 ${favorited ? 'fill-red-500' : ''}`} />
          </button>
        </div>

        {/* Artwork */}
        <div className="relative aspect-square mb-6 flex items-center justify-center">
          <div className={`absolute inset-0 opacity-20 rounded-full blur-2xl ${typeColorClass}`}></div>
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt={pokemon.name} 
              className="w-3/4 h-3/4 object-contain relative z-10 transition-transform duration-300 group-hover:scale-110 drop-shadow-lg"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-slate-200 dark:bg-slate-700 rounded-2xl flex items-center justify-center text-slate-400">
              No Image
            </div>
          )}
        </div>

        {/* Info */}
        <div className="text-center">
          <h3 className="text-xl font-bold capitalize text-slate-900 dark:text-white mb-3">
            {pokemon.name}
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {pokemon.types.map((typeObj) => (
              <span 
                key={typeObj.type.name}
                className={`px-3 py-1 text-xs font-bold uppercase rounded-full text-white shadow-sm ${getTypeColor(typeObj.type.name)}`}
              >
                {typeObj.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
