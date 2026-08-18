import { useState, useEffect } from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPokemon } from '../services/pokemonApi';
import type { Pokemon } from '../types/pokemon';
import PokemonCard from './PokemonCard';

const Hero = () => {
  const [heroCards, setHeroCards] = useState<Pokemon[]>([]);

  useEffect(() => {
    // Fetch 5 popular Pokemon for the hero fan display
    Promise.all([
      getPokemon('mewtwo'),
      getPokemon('charizard'),
      getPokemon('pikachu'),
      getPokemon('gengar'),
      getPokemon('blastoise')
    ])
    .then(setHeroCards)
    .catch(console.error);
  }, []);

  const scrollToExplorer = () => {
    const element = document.getElementById('explorer-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getCardTransformsFlex = (index: number) => {
    switch (index) {
      case 0: return "z-10 -rotate-[20deg] translate-y-12 md:translate-y-20 scale-90 opacity-80 hover:opacity-100";
      case 1: return "z-20 -rotate-[10deg] translate-y-4 md:translate-y-8 scale-95 opacity-95 hover:opacity-100";
      case 2: return "z-30 scale-105 hover:scale-110";
      case 3: return "z-20 rotate-[10deg] translate-y-4 md:translate-y-8 scale-95 opacity-95 hover:opacity-100";
      case 4: return "z-10 rotate-[20deg] translate-y-12 md:translate-y-20 scale-90 opacity-80 hover:opacity-100";
      default: return "";
    }
  };

  return (
    <section className="relative pt-28 md:pt-36 overflow-hidden bg-[#050505] flex flex-col items-center border-b border-slate-800">
      {/* Dark theme Grid Background matching image */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10 w-full flex flex-col items-center">
        
        {/* Text Content */}
        <div className="text-center space-y-5 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-800/50 text-slate-300 font-bold text-xs tracking-widest uppercase animate-fade-in-up backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
            The Ultimate Pokédex Experience
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter animate-fade-in-up animation-delay-150">
            Explore the world of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">Pokémon</span>
          </h1>
          
          <p className="text-base md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto animate-fade-in-up animation-delay-300 font-medium">
            Discover Pokémon, their types, abilities, stats, and more — all in one beautiful, highly responsive Pokédex designed for the modern web.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up animation-delay-500 w-full sm:w-auto px-4 sm:px-0">
            <button
              onClick={scrollToExplorer}
              className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-slate-200 rounded-xl font-extrabold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500"
            >
              Explore Pokémon
              <ArrowRight className="w-5 h-5" />
            </button>
            <Link
              to="/favorites"
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-white border-2 border-slate-700 hover:border-slate-500 hover:bg-slate-800/50 rounded-xl font-extrabold transition-all flex items-center justify-center gap-2 group focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500"
            >
              <Heart className="w-5 h-5 group-hover:fill-current transition-colors" />
              View Favorites
            </Link>
          </div>
        </div>

        {/* Fan Cards using Flexbox for perfect overlapping and responsiveness */}
        <div className="relative w-full max-w-5xl mx-auto mt-12 md:mt-20 flex justify-center items-end z-20 pb-0 mb-[-60px] md:mb-[-100px] perspective-1000">
          {heroCards.length > 0 ? heroCards.map((pokemon, index) => {
             // Overlap effect via negative margins on flex children
             const marginClass = index === 0 ? "" : "-ml-20 sm:-ml-28 md:-ml-32 lg:-ml-40";

             return (
               <div 
                 key={pokemon.id} 
                 className={`relative w-40 sm:w-52 md:w-64 lg:w-72 origin-bottom transition-all duration-700 ease-out hover:!z-50 animate-fade-in-up ${marginClass} ${getCardTransformsFlex(index)}`}
                 style={{ animationDelay: `${500 + index * 100}ms` }}
               >
                 {/* Internal wrapper for hover translation */}
                 <div className="w-full h-full hover:-translate-y-8 md:hover:-translate-y-12 transition-transform duration-300 pointer-events-auto rounded-3xl">
                   <PokemonCard pokemon={pokemon} />
                 </div>
               </div>
             );
          }) : (
             <div className="w-full h-[250px] flex items-center justify-center text-slate-500 font-bold animate-pulse">Loading Pokédex Cards...</div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Hero;
