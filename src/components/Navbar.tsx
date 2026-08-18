import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Compass, Scale, Sparkles } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { favorites } = useFavorites();
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
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1 px-1.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl z-10">
          <Link 
            to="/" 
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              isActive('/') 
                ? 'bg-white text-black font-semibold' 
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/compare" 
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              isActive('/compare') 
                ? 'bg-white text-black font-semibold' 
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Compare
          </Link>
          <Link 
            to="/favorites" 
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
              isActive('/favorites') 
                ? 'bg-white text-black font-semibold' 
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Favorites
          </Link>
        </div>

        {/* Right Side - CTA Button */}
        <div className="hidden md:flex items-center z-10">
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
            className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-bold hover:bg-slate-200 transition-all flex items-center gap-2"
          >
            Explore Pokémon
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center z-10">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 text-white rounded-full border border-white/10 bg-white/5 backdrop-blur-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 mx-auto max-w-sm rounded-2xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-2xl p-4 animate-fade-in-up shadow-2xl">
          <div className="flex flex-col gap-1">
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive('/') ? 'bg-white text-black' : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              Home
            </Link>
            
            <Link 
              to="/compare" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                isActive('/compare') ? 'bg-white text-black' : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              Compare
            </Link>

            <Link 
              to="/favorites" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                isActive('/favorites') ? 'bg-white text-black' : 'text-slate-200 hover:bg-white/10'
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
