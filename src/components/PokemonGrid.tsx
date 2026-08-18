import PokemonCard from './PokemonCard';
import LoadingSkeleton from './LoadingSkeleton';
import ErrorState from './ErrorState';
import type { Pokemon } from '../types/pokemon';

interface PokemonGridProps {
  pokemon: Pokemon[];
  isLoading: boolean;
  error: string | null;
}

const PokemonGrid = ({ pokemon, isLoading, error }: PokemonGridProps) => {
  if (error) {
    return <ErrorState message={error} />;
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
    return (
      <div className="glass-card p-12 text-center text-slate-500 dark:text-slate-400">
        No Pokémon found matching your criteria.
      </div>
    );
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
