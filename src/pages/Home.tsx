import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import TypeFilter from '../components/TypeFilter';
import SortDropdown from '../components/SortDropdown';
import PokemonGrid from '../components/PokemonGrid';
import { usePokemon } from '../hooks/usePokemon';

const Home = () => {
  const { pokemon, isLoading, isLoadingMore, error, hasMore, loadMore } = usePokemon(20);

  return (
    <div className="w-full">
      <Hero />
      
      <section id="explorer-section" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-900 dark:text-white">
              Pokémon Explorer
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
              Search for your favorite Pokémon by name, ID, or filter by their elemental types.
            </p>
          </div>

          {/* Search & Filter Area */}
          <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between glass-card p-4 md:p-6">
            <div className="w-full md:w-1/2">
              <SearchBar />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <TypeFilter />
              <SortDropdown />
            </div>
          </div>

          {/* Pokémon Grid */}
          <PokemonGrid pokemon={pokemon} isLoading={isLoading} error={error} />

          {/* Load More */}
          {hasMore && !isLoading && !error && (
            <div className="mt-12 flex justify-center">
              <button 
                onClick={loadMore}
                disabled={isLoadingMore}
                className="px-8 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-700 hover:border-red-500 dark:hover:border-red-500 rounded-xl font-bold transition-all flex items-center justify-center hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingMore ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-slate-400 border-t-red-500 rounded-full animate-spin"></div>
                    Loading...
                  </span>
                ) : (
                  'Load More Pokémon'
                )}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
