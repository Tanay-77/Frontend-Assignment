import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { favorites } = useFavorites();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="absolute w-full z-50 py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative h-12">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg p-1 z-10">
          <img 
            src="/pokemon.png" 
            alt="PokéExplorer Logo" 
            className="h-8 md:h-10 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
          />
        </Link>

        {/* Center Pill Nav */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1 px-1.5 py-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl z-10 transition-colors duration-300">
          <Link 
            to="/" 
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              isActive('/') 
                ? 'bg-slate-900 text-white dark:bg-white dark:text-black font-semibold' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/compare" 
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              isActive('/compare') 
                ? 'bg-slate-900 text-white dark:bg-white dark:text-black font-semibold' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10'
            }`}
          >
            Compare
          </Link>
          <Link 
            to="/favorites" 
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              isActive('/favorites') 
                ? 'bg-slate-900 text-white dark:bg-white dark:text-black font-semibold' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10'
            }`}
          >
            Favorites
          </Link>
        </div>

        {/* Right Side - CTA & Theme */}
        <div className="hidden md:flex items-center gap-2 z-10">
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-200 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => {
              if (location.pathname === '/') {
                document.getElementById('explorer-section')?.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/';
                setTimeout(() => {
                  document.getElementById('explorer-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="px-5 py-2.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-200 transition-all flex items-center gap-2"
          >
            Explore Pokémon
          </button>
        </div>

        {/* Mobile Buttons */}
        <div className="md:hidden flex items-center gap-2 z-10">
          <button 
            onClick={toggleTheme}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200 dark:text-slate-400 dark:hover:text-white dark:hover:bg-white/10 rounded-full focus:outline-none transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 text-slate-900 dark:text-white rounded-full border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 mx-auto max-w-sm rounded-2xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-2xl p-4 animate-fade-in-up shadow-2xl transition-colors duration-300">
          <div className="flex flex-col gap-1">
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive('/') ? 'bg-slate-900 text-white dark:bg-white dark:text-black' : 'text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10'
              }`}
            >
              Home
            </Link>
            
            <Link 
              to="/compare" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                isActive('/compare') ? 'bg-slate-900 text-white dark:bg-white dark:text-black' : 'text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10'
              }`}
            >
              Compare
            </Link>

            <Link 
              to="/favorites" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                isActive('/favorites') ? 'bg-slate-900 text-white dark:bg-white dark:text-black' : 'text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10'
              }`}
            >
              Favorites
              {favorites.length > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ml-auto">
                  {favorites.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
