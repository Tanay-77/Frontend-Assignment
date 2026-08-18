import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ErrorState = ({ 
  title = "Something went wrong.", 
  message = "We couldn't load the Pokémon right now.",
  onRetry 
}: ErrorStateProps) => {
  return (
    <div className="glass-card p-10 flex flex-col items-center justify-center text-center w-full max-w-lg mx-auto my-12 animate-fade-in-up">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full flex items-center justify-center mb-6">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 mb-8">{message}</p>
      
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 flex items-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;
