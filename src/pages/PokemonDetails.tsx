import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Ruler, Weight } from 'lucide-react';
import { getPokemon } from '../services/pokemonApi';
import type { Pokemon } from '../types/pokemon';
import { getTypeColor } from '../utils/pokemonColors';
import { useFavorites } from '../contexts/FavoritesContext';
import StatBar from '../components/StatBar';
import ErrorState from '../components/ErrorState';

const PokemonDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [showAllMoves, setShowAllMoves] = useState(false);

  const fetchPokemonDetails = async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      setError(null);
      const data = await getPokemon(id.toLowerCase());
      setPokemon(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load Pokémon details');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-red-500 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold animate-pulse">Loading Pokémon Data...</p>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen pt-10 px-4">
        <div className="container mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-8 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold">Go Back</span>
          </button>
          <ErrorState message={error || 'Pokémon not found'} onRetry={fetchPokemonDetails} />
        </div>
      </div>
    );
  }

  const mainType = pokemon.types[0]?.type.name || 'normal';
  const typeColorClass = getTypeColor(mainType);
  const formattedId = `#${pokemon.id.toString().padStart(3, '0')}`;
  const imageUrl = pokemon.sprites.other['official-artwork']?.front_default || pokemon.sprites.front_default;
  
  // Format height (decimetres to meters) and weight (hectograms to kg)
  const heightInMeters = (pokemon.height / 10).toFixed(1);
  const weightInKg = (pokemon.weight / 10).toFixed(1);

  const displayedMoves = showAllMoves ? pokemon.moves : pokemon.moves.slice(0, 10);

  return (
    <div className="min-h-screen pb-20 relative overflow-hidden">
      {/* Decorative Background Blur */}
      <div className={`absolute top-[-20%] left-[-10%] w-[120%] h-[60vh] ${typeColorClass} opacity-[0.07] dark:opacity-[0.15] blur-3xl -z-10 rounded-[100%] pointer-events-none`}></div>
      
      <div className="container mx-auto px-4 pt-8">
        {/* Header Navigation */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="p-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-xl text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 shadow-sm transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/50"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => toggleFavorite(pokemon)}
            className={`p-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-xl shadow-sm transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/50 hover:bg-white dark:hover:bg-slate-700 hover:scale-105 ${
              isFavorite(pokemon.id) ? 'text-red-500' : 'text-slate-400 hover:text-red-500'
            }`}
          >
            <Heart className={`w-6 h-6 ${isFavorite(pokemon.id) ? 'fill-red-500' : ''}`} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left Column: Artwork & Basic Info */}
          <div className="w-full lg:w-1/2 flex flex-col items-center relative">
            {/* Visual Focus Background Shape */}
            <div className={`absolute inset-0 top-20 rounded-[3rem] ${typeColorClass} opacity-10 dark:opacity-20 -z-10`}></div>
            
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center mb-8 drop-shadow-2xl">
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={pokemon.name} 
                  className="w-[90%] h-[90%] object-contain animate-fade-in-up" 
                />
              ) : (
                <div className="w-[80%] h-[80%] bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center text-slate-400 font-bold">
                  No Image Available
                </div>
              )}
            </div>
            
            <div className="text-center w-full">
              <span className="text-xl font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                {formattedId}
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold capitalize text-slate-900 dark:text-white mt-2 mb-6">
                {pokemon.name}
              </h1>
              
              <div className="flex justify-center gap-3 mb-8">
                {pokemon.types.map((typeObj) => (
                  <span 
                    key={typeObj.type.name}
                    className={`px-6 py-2 text-sm font-bold uppercase rounded-full text-white shadow-lg ${getTypeColor(typeObj.type.name)}`}
                  >
                    {typeObj.type.name}
                  </span>
                ))}
              </div>

              <div className="flex justify-center gap-8 glass-card p-6 rounded-3xl w-full max-w-sm mx-auto">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                    <Weight className="w-5 h-5" />
                    <span className="font-bold text-sm uppercase tracking-wider">Weight</span>
                  </div>
                  <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{weightInKg} kg</span>
                </div>
                <div className="w-px bg-slate-200 dark:bg-slate-700"></div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                    <Ruler className="w-5 h-5" />
                    <span className="font-bold text-sm uppercase tracking-wider">Height</span>
                  </div>
                  <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{heightInMeters} m</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Stats, Abilities, Moves */}
          <div className="w-full lg:w-1/2 space-y-8 lg:pt-8">
            
            {/* Base Stats */}
            <div className="glass-card p-8 rounded-3xl">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                Base Stats
              </h3>
              <div className="space-y-1">
                {pokemon.stats.map((stat) => (
                  <StatBar 
                    key={stat.stat.name} 
                    name={stat.stat.name} 
                    value={stat.base_stat} 
                    colorClass={typeColorClass}
                  />
                ))}
              </div>
            </div>

            {/* Abilities */}
            <div className="glass-card p-8 rounded-3xl">
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6">
                Abilities
              </h3>
              <div className="flex flex-wrap gap-4">
                {pokemon.abilities.map((ability) => (
                  <div 
                    key={ability.ability.name} 
                    className="flex-1 min-w-[140px] p-4 rounded-xl border-2 border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 text-center"
                  >
                    <span className="font-bold capitalize text-slate-800 dark:text-slate-200 text-lg">
                      {ability.ability.name.replace('-', ' ')}
                    </span>
                    {ability.is_hidden && (
                      <span className="block mt-1 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Hidden Ability
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Moves */}
            <div className="glass-card p-8 rounded-3xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Moves
                </h3>
                <span className="text-sm font-bold text-slate-400">
                  {pokemon.moves.length} total
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {displayedMoves.map((move) => (
                  <span 
                    key={move.move.name}
                    className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm capitalize"
                  >
                    {move.move.name.replace('-', ' ')}
                  </span>
                ))}
              </div>
              
              {pokemon.moves.length > 10 && (
                <button 
                  onClick={() => setShowAllMoves(!showAllMoves)}
                  className={`w-full py-3 rounded-xl font-bold transition-colors border-2 ${
                    showAllMoves 
                      ? 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300' 
                      : `border-transparent ${typeColorClass} text-white opacity-90 hover:opacity-100`
                  }`}
                >
                  {showAllMoves ? 'Show Less' : `Show ${pokemon.moves.length - 10} More Moves`}
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
