import { Search, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { getAllPokemonNames } from '../services/pokemonApi';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allNames, setAllNames] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAllPokemonNames().then(setAllNames);
  }, []);

  useEffect(() => {
    if (value.trim() && showSuggestions) {
      const filtered = allNames.filter(name => 
        name.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8); // show top 8 matches
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [value, allNames, showSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (suggestion: string) => {
    onChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full z-50" ref={wrapperRef}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        className="block w-full pl-10 pr-10 py-3 border border-white/10 rounded-full leading-5 bg-[#0a0a0a] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white/20 sm:text-sm transition-shadow text-white shadow-inner"
        placeholder="Search Pokémon..."
      />
      {value && (
        <button 
          onClick={() => {
            onChange('');
            setShowSuggestions(false);
          }}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <X className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" />
        </button>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute mt-2 w-full bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-white/5 max-h-60 overflow-y-auto custom-scrollbar">
          {suggestions.map((suggestion, index) => (
            <li 
              key={index}
              onClick={() => handleSelect(suggestion)}
              className="px-4 py-3 cursor-pointer hover:bg-white/10 text-slate-200 text-sm capitalize transition-colors flex items-center gap-3"
            >
              <Search className="w-4 h-4 text-slate-500" />
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
