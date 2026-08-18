import { useState, useMemo } from 'react';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import TypeFilter from '../components/TypeFilter';
import SortDropdown from '../components/SortDropdown';
import PokemonGrid from '../components/PokemonGrid';
import { usePokemon } from '../hooks/usePokemon';
import { useDebounce } from '../hooks/useDebounce';

const Home = () => {
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 500);
  const [selectedType, setSelectedType] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const { pokemon, isLoading, isLoadingMore, error, hasMore, loadMore } = usePokemon(
    20, 
    debouncedSearch, 
    selectedType
  );

  // Client-side sorting of loaded pokemon
  const sortedPokemon = useMemo(() => {
    if (sortBy === 'default') return pokemon;
    
    return [...pokemon].sort((a, b) => {
      switch (sortBy) {
        case 'id-asc':
          return a.id - b.id;
        case 'id-desc':
          return b.id - a.id;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'hp-desc': {
          const hpA = a.stats.find(s => s.stat.name === 'hp')?.base_stat || 0;
          const hpB = b.stats.find(s => s.stat.name === 'hp')?.base_stat || 0;
          return hpB - hpA;
        }
        case 'attack-desc': {
          const atkA = a.stats.find(s => s.stat.name === 'attack')?.base_stat || 0;
          const atkB = b.stats.find(s => s.stat.name === 'attack')?.base_stat || 0;
          return atkB - atkA;
        }
        case 'speed-desc': {
          const spdA = a.stats.find(s => s.stat.name === 'speed')?.base_stat || 0;
          const spdB = b.stats.find(s => s.stat.name === 'speed')?.base_stat || 0;
          return spdB - spdA;
        }
        default:
          return 0;
      }
    });
  }, [pokemon, sortBy]);

  // If type changes, clear search to prevent confusion
  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    if (type !== '') {
      setSearchInput('');
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchInput(query);
    if (query !== '') {
      setSelectedType(''); // Clear type if searching by name
    }
  };

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
          <div className="glass-card p-4 md:p-6 mb-10 space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center w-full">
              <div className="w-full md:w-1/2 lg:w-1/3">
                <SearchBar value={searchInput} onChange={handleSearchChange} />
              </div>
              <div className="w-full md:w-auto">
                <SortDropdown value={sortBy} onChange={setSortBy} />
              </div>
            </div>
            
            <div className="w-full border-t border-slate-200 dark:border-slate-700 pt-4">
              <TypeFilter value={selectedType} onChange={handleTypeChange} />
            </div>
          </div>

          {/* Pokémon Grid */}
          <PokemonGrid pokemon={sortedPokemon} isLoading={isLoading} error={error} />

          {/* Load More */}
          {hasMore && !isLoading && !error && !debouncedSearch && (
            <div className="mt-12 flex justify-center">
              <button 
                onClick={loadMore}
                disabled={isLoadingMore}
                className="px-8 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-700 hover:border-red-500 dark:hover:border-red-500 rounded-xl font-bold transition-all flex items-center justify-center hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingMore ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-slate-400 border-t-red-500 rounded-full animate-spin"></div>
                    Loading more...
                  </span>
                ) : (
                  'Load More'
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
