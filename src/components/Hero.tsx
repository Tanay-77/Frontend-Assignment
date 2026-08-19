import { useState, useEffect } from 'react';
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

  const getCardTransformsFlex = (index: number) => {
    switch (index) {
      case 0: return "z-10 -rotate-[16deg] translate-y-12 sm:translate-y-16 md:translate-y-20 scale-[0.75] sm:scale-[0.8] opacity-85 hover:opacity-100";
      case 1: return "z-20 -rotate-[8deg] translate-y-4 sm:translate-y-6 md:translate-y-8 scale-[0.85] sm:scale-[0.9] opacity-95 hover:opacity-100";
      case 2: return "z-30 rotate-0 scale-100 md:scale-105";
      case 3: return "z-20 rotate-[8deg] translate-y-4 sm:translate-y-6 md:translate-y-8 scale-[0.85] sm:scale-[0.9] opacity-95 hover:opacity-100";
      case 4: return "z-10 rotate-[16deg] translate-y-12 sm:translate-y-16 md:translate-y-20 scale-[0.75] sm:scale-[0.8] opacity-85 hover:opacity-100";
      default: return "";
    }
  };

  return (
    <section className="relative pt-28 md:pt-36 bg-slate-50 dark:bg-[#050505] flex flex-col items-center border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      {/* Dynamic theme Grid Background matching image */}
      {/* <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] md:bg-[size:60px_60px] pointer-events-none"></div> */}

      <div className="container mx-auto px-4 relative z-10 w-full flex flex-col items-center">

        <img src="/random.png" alt="" className="hidden sm:block absolute top-8 left-[2%] md:left-[8%] lg:left-[12%] w-10 md:w-16 opacity-60 md:opacity-80 hover:scale-110 -rotate-12 transition-transform duration-300 drop-shadow-lg z-0" />
        <img src="/random 1.png" alt="" className="hidden sm:block absolute top-32 right-[2%] md:right-[5%] lg:right-[15%] w-8 md:w-14 opacity-50 md:opacity-70 hover:scale-110 rotate-12 transition-transform duration-300 drop-shadow-lg z-0" />
        <img src="/random.png" alt="" className="absolute bottom-52 right-[-5%] sm:right-[4%] md:right-[12%] lg:right-[8%] w-10 md:w-20 opacity-40 md:opacity-60 hover:scale-110 -rotate-6 transition-transform duration-300 drop-shadow-lg z-0" />
        <img src="/random 1.png" alt="" className="absolute bottom-24 left-[-2%] sm:left-[5%] md:left-[10%] lg:left-[5%] w-8 md:w-12 opacity-50 md:opacity-80 hover:scale-110 rotate-[20deg] transition-transform duration-300 drop-shadow-lg z-0" />

        {/* Text Content */}
        <div className="text-center space-y-6 max-w-5xl mx-auto flex flex-col items-center">


          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-black text-slate-900 dark:text-white leading-snug md:leading-[1.05] tracking-tighter animate-fade-in-up animation-delay-150 flex flex-row items-center justify-center gap-4 lg:gap-6 flex-wrap w-full transition-colors duration-300">
            <span style={{ fontFamily: "sans-serif", fontWeight: 800, }}>
              Explore The World Of <span style={{ fontFamily: "'Pokemon Solid', sans-serif", fontWeight: 'normal', letterSpacing: '0.05em' }} className="text-red-500 dark:text-white inline-block mt-1 sm:mt-0">Pokemon</span>
            </span>

            {/* <img
              src="/pokemon.png"
              alt="Pokémon"
              className="h-12 sm:h-16 md:h-24 lg:h-28 object-contain drop-shadow-2xl"
            /> */}
          </h1>

          {/* <p className="text-base md:text-lg lg:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto animate-fade-in-up animation-delay-300 font-medium">
            Discover Pokémon, their types, abilities, stats, and more — all in one beautiful, highly responsive Pokédex designed for the modern web.
          </p> */}

        </div>

        {/* Fan Cards */}
        <div className="relative w-full max-w-6xl mx-auto mt-4 md:mt-8 flex justify-center items-end z-20 pb-0 mb-[-30px] sm:mb-[-60px] md:mb-[-80px]">
          {heroCards.length > 0 ? heroCards.map((pokemon, index) => {
            const marginClass = index === 0 ? "" : "-ml-[4.5rem] min-[400px]:-ml-[5.5rem] sm:-ml-20 md:-ml-28 lg:-ml-32 xl:-ml-40";

            return (
              <div
                key={pokemon.id}
                className={`relative w-[8.5rem] min-[400px]:w-40 sm:w-48 md:w-56 lg:w-72 xl:w-80 origin-bottom transition-all duration-700 ease-out hover:!z-50 animate-fade-in-up ${marginClass} ${getCardTransformsFlex(index)}`}
                style={{ animationDelay: `${500 + index * 100}ms` }}
              >
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
