import { useState, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { getPokemon } from '../services/pokemonApi';
import type { Pokemon } from '../types/pokemon';
import { useDebounce } from '../hooks/useDebounce';

interface CompareSearchProps {
  label: string;
  onSelect: (pokemon: Pokemon | null) => void;
  selectedPokemon: Pokemon | null;
}

const CompareSearch = ({ label, onSelect, selectedPokemon }: CompareSearchProps) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const searchPokemon = async () => {
      if (!debouncedQuery.trim()) {
        setError('');
        return;
      }
      
      setIsSearching(true);
      setError('');
      try {
        const data = await getPokemon(debouncedQuery.toLowerCase());
        onSelect(data);
        setQuery(''); // Clear input after selection
      } catch (err) {
        setError('Pokémon not found');
      } finally {
        setIsSearching(false);
      }
    };

    searchPokemon();
  }, [debouncedQuery, onSelect]);

  if (selectedPokemon) {
    return (
      <div className="w-full">
        <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
          {label}
        </label>
        <div className="flex items-center justify-between p-3 border-2 border-red-500 dark:border-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl">
          <div className="flex items-center gap-3">
            <img 
              src={selectedPokemon.sprites.front_default || ''} 
              alt={selectedPokemon.name} 
              className="w-10 h-10 object-contain"
            />
            <span className="font-bold capitalize text-slate-900 dark:text-white">
              {selectedPokemon.name}
            </span>
          </div>
          <button 
            onClick={() => onSelect(null)}
            className="p-2 text-slate-400 hover:text-red-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {isSearching ? (
            <Loader2 className="h-5 w-5 text-slate-400 animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-slate-400" />
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`block w-full pl-10 pr-10 py-3 border ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:ring-red-500 focus:border-red-500'} rounded-xl leading-5 bg-white dark:bg-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 sm:text-sm transition-shadow dark:text-white`}
          placeholder={`Search for ${label}...`}
        />
        {query && (
          <button 
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg"
          >
            <X className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" />
          </button>
        )}
      </div>
      {error && (
        <p className="absolute -bottom-6 left-0 text-sm font-bold text-red-500 animate-fade-in-up">
          {error}
        </p>
      )}
    </div>
  );
};

export default CompareSearch;
