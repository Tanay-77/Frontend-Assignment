import { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { getPokemon, getAllPokemonNames } from '../services/pokemonApi';
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

  const [allNames, setAllNames] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAllPokemonNames().then(setAllNames);
  }, []);

  useEffect(() => {
    if (query.trim() && showSuggestions) {
      const filtered = allNames.filter(name => 
        name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query, allNames, showSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        setShowSuggestions(false);
      } catch (err) {
        setError('Pokémon not found');
      } finally {
        setIsSearching(false);
      }
    };

    searchPokemon();
  }, [debouncedQuery, onSelect]);

  const handleSelect = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

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
    <div className="w-full relative" ref={wrapperRef}>
      <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wider">
        {label}
      </label>
      <div className="relative z-40">
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
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          className={`block w-full pl-10 pr-10 py-3 border ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 dark:border-white/10 focus:ring-slate-400 dark:focus:ring-white/20 focus:border-slate-400 dark:focus:border-white/20'} rounded-full leading-5 bg-white dark:bg-[#0a0a0a] placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 sm:text-sm transition-all text-slate-900 dark:text-white shadow-sm dark:shadow-inner`}
          placeholder={`Search for ${label}...`}
        />
        {query && (
          <button 
            onClick={() => {
              setQuery('');
              setShowSuggestions(false);
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg"
          >
            <X className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" />
          </button>
        )}

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute mt-2 w-full bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden z-50 divide-y divide-slate-100 dark:divide-white/5 max-h-60 overflow-y-auto custom-scrollbar transition-colors">
            {suggestions.map((suggestion, index) => (
              <li 
                key={index}
                onClick={() => handleSelect(suggestion)}
                className="px-4 py-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/10 text-slate-700 dark:text-slate-200 text-sm capitalize transition-colors flex items-center gap-3"
              >
                <Search className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                {suggestion}
              </li>
            ))}
          </ul>
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
