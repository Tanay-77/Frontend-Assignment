
import LoadingSkeleton from './LoadingSkeleton';

const PokemonGrid = () => {
  // Simulating loading state for the skeleton UI
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <LoadingSkeleton key={i} />
      ))}
    </div>
  );
};

export default PokemonGrid;
