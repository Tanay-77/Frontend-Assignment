import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-10 pr-10 py-3 border border-white/10 rounded-full leading-5 bg-[#0a0a0a] placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white/20 sm:text-sm transition-shadow text-white shadow-inner"
        placeholder="Search Pokémon..."
      />
      {value && (
        <button 
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <X className="h-5 w-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
