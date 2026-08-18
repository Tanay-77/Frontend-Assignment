import { SearchX, XCircle } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
  onClearFilters?: () => void;
}

const EmptyState = ({ 
  title = "No Pokémon found", 
  message = "Try searching for a different Pokémon or changing your filters.",
  onClearFilters 
}: EmptyStateProps) => {
  return (
    <div className="glass-card p-10 flex flex-col items-center justify-center text-center w-full max-w-lg mx-auto my-12 animate-fade-in-up">
      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mb-6">
        <SearchX className="h-8 w-8" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 mb-8">{message}</p>
      
      {onClearFilters && (
        <button 
          onClick={onClearFilters}
          className="px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 rounded-xl font-bold transition-all flex items-center gap-2"
        >
          <XCircle className="w-5 h-5" />
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;
