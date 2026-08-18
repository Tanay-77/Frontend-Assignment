import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Heart, Moon, Sun, Compass } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../contexts/FavoritesContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();

  return (
    <nav className="fixed w-full z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg p-1">
            <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center group-hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Poké<span className="text-red-500">Explorer</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-500 font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded p-1">
              Explore
            </Link>
            <Link to="/favorites" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-500 font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded p-1">
              <Heart className="w-5 h-5" />
              Favorites
              {favorites.length > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {favorites.length}
                </span>
              )}
            </Link>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 absolute w-full animate-fade-in-up shadow-xl">
          <div className="px-4 py-6 flex flex-col gap-4">
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-bold text-slate-700 dark:text-slate-200 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Explore
            </Link>
            <Link 
              to="/favorites" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-bold text-slate-700 dark:text-slate-200 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-3"
            >
              <Heart className="w-5 h-5" />
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
