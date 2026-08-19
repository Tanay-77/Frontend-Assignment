import { useState, useEffect } from 'react';

const GlobalLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fade out after 1.8 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 1800);

    // Completely remove from DOM after fade out completes
    const removeTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-50 dark:bg-[#050505] transition-opacity duration-500 ease-in-out ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="relative flex flex-col items-center">
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-red-500/20 dark:bg-red-500/10 blur-[50px] rounded-full scale-150 animate-pulse"></div>
        
        {/* Bouncing Logo */}
        <img 
          src="/pokemon.png" 
          alt="PokéExplorer Loading" 
          className="h-16 md:h-20 object-contain drop-shadow-2xl animate-bounce relative z-10"
        />
        
        {/* Loading text and dots */}
        <div className="mt-8 flex flex-col items-center gap-3 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce shadow-md" style={{ animationDelay: '300ms' }}></div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-[0.2em] text-sm animate-pulse mt-2">
            Booting Pokédex...
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoader;
