import PokemonCard from './PokemonCard';
import LoadingSkeleton from './LoadingSkeleton';
import ErrorState from './ErrorState';
import EmptyState from './EmptyState';
import type { Pokemon } from '../types/pokemon';

interface PokemonGridProps {
  pokemon: Pokemon[];
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
  onClearFilters?: () => void;
}

const PokemonGrid = ({ pokemon, isLoading, error, onRetry, onClearFilters }: PokemonGridProps) => {
  if (error) {
    if (error === 'SEARCH_ERROR') {
      return (
        <EmptyState 
          title="Pokémon not found" 
          message="Try searching for another Pokémon." 
          onClearFilters={onClearFilters} 
        />
      );
    }
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <LoadingSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (pokemon.length === 0) {
    return <EmptyState onClearFilters={onClearFilters} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  );
};

export default PokemonGrid;
