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
      className="group relative block pt-28 pb-2 px-2 transition-all duration-300 hover:-translate-y-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
    >
      {/* The solid card background that only occupies the lower portion */}
      <div className={`absolute inset-x-0 bottom-0 top-20 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-shadow duration-300 group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.7)] ${typeColorClass}`}></div>

      {/* Content wrapper */}
      <div className="relative z-10 h-full flex flex-col items-center">

        {/* Artwork popping out of the top */}
        <div className="relative w-full aspect-square -mt-24 mb-4 flex items-end justify-center pointer-events-none">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={pokemon.name}
              className="w-full h-full object-contain relative z-20 transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_15px_20px_rgba(0,0,0,0.6)]"
              loading="lazy"
            />
          ) : (
            <div className="w-3/4 h-3/4 bg-black/10 rounded-2xl flex items-center justify-center text-white/50 font-bold mb-4">
              No Image
            </div>
          )}
        </div>

        {/* Info - Bottom aligned */}
        <div className="w-full flex flex-col items-center mt-auto pb-4 px-4">
          <h3 className="text-2xl font-extrabold capitalize text-white mb-1 leading-tight tracking-tight">
            {pokemon.name}
          </h3>
          <div className="text-xs font-bold text-white/70 uppercase tracking-widest flex justify-center items-center gap-2 mb-3">
            <span>{formattedId}</span>
            <span className="text-white/30">•</span>
            <span className="text-white">{mainType}</span>
          </div>

          {/* Favorite button positioned in center under text */}
          <button
            className={`p-2 rounded-full cursor-pointer transition-all duration-300 z-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${favorited
                ? 'bg-white text-red-500 shadow-md opacity-100'
                : 'bg-black/20 hover:bg-black/40 text-white opacity-0 group-hover:opacity-100 focus-visible:opacity-100'
              }`}
            onClick={handleFavoriteClick}
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className={`w-5 h-5 ${favorited ? 'fill-red-500' : ''}`} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
