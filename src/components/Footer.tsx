
import { Compass, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 py-12 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center mb-6">
          <img 
            src="/pokemon.png" 
            alt="PokéExplorer Logo" 
            className="h-10 opacity-80 object-contain drop-shadow-md hover:opacity-100 hover:scale-105 transition-all duration-300"
          />
        </div>
        <p className="text-slate-500 dark:text-slate-400 mb-6 flex items-center justify-center gap-1">
          Built with <Heart className="w-4 h-4 text-red-500" /> using React & PokéAPI
        </p>
        <div className="text-sm text-slate-400">
          © {new Date().getFullYear()} Pokémon Explorer. Data provided by PokéAPI.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
