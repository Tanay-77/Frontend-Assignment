import { useState } from 'react';
import { Scale } from 'lucide-react';
import CompareSearch from '../components/CompareSearch';
import type { Pokemon } from '../types/pokemon';
import { getTypeColor } from '../utils/pokemonColors';

const STAT_LABELS: Record<string, string> = {
  'hp': 'HP',
  'attack': 'Attack',
  'defense': 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  'speed': 'Speed',
};

const Compare = () => {
  const [pokemonA, setPokemonA] = useState<Pokemon | null>(null);
  const [pokemonB, setPokemonB] = useState<Pokemon | null>(null);

  const stats = Object.keys(STAT_LABELS);

  const getWinnerClass = (valA: number, valB: number, isA: boolean) => {
    if (valA === valB) return 'text-white/60 font-medium'; // Tie
    if (isA) {
      return valA > valB ? 'text-white font-bold drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]' : 'text-white/20 font-light';
    } else {
      return valB > valA ? 'text-white font-bold drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]' : 'text-white/20 font-light';
    }
  };

  const getBarColor = (valA: number, valB: number, isA: boolean) => {
    if (valA === valB) return 'bg-white/20';
    if (isA) return valA > valB ? 'bg-white' : 'bg-white/10';
    return valB > valA ? 'bg-white' : 'bg-white/10';
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-white flex items-center justify-center gap-4 tracking-tight">
            COMPARE
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto font-medium tracking-wide">
            Select two Pokémon to instantly compare their base stats side-by-side.
          </p>
        </div>

        {/* Selection Area */}
        <div className="p-1 mb-12 relative z-20">
          <div className="flex flex-col md:flex-row gap-12 md:gap-8 items-start justify-between relative">
            <div className="w-full md:w-5/12">
              <CompareSearch 
                label="Pokémon A" 
                selectedPokemon={pokemonA} 
                onSelect={setPokemonA} 
              />
            </div>
            
            {/* VS Badge */}
            <div className="w-full md:w-2/12 flex justify-center py-2 md:py-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-8 pointer-events-none z-10">
              <div className="relative flex items-center justify-center select-none scale-125 md:scale-150">
                <span className="text-xl md:text-2xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-red-500 to-orange-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] z-10 -mr-1">V</span>
                <span className="text-lg md:text-xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-bl from-blue-400 to-indigo-600 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] z-0 mt-2">S</span>
              </div>
            </div>

            <div className="w-full md:w-5/12">
              <CompareSearch 
                label="Pokémon B" 
                selectedPokemon={pokemonB} 
                onSelect={setPokemonB} 
              />
            </div>
          </div>
        </div>

        {/* Comparison Area */}
        {pokemonA && pokemonB ? (
          <div className="bg-[#0a0a0a] border border-white/5 overflow-hidden rounded-[2rem] shadow-2xl animate-fade-in-up relative z-10">
            
            {/* Profiles */}
            <div className="flex relative">
              <div className="w-1/2 p-8 md:p-12 flex flex-col items-center relative overflow-hidden group">
                <div className={`absolute inset-0 opacity-[0.03] transition-opacity duration-500 group-hover:opacity-[0.08] ${getTypeColor(pokemonA.types[0]?.type.name)}`}></div>
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/5 to-transparent"></div>
                <img 
                  src={pokemonA.sprites.other['official-artwork']?.front_default || pokemonA.sprites.front_default} 
                  alt={pokemonA.name}
                  className="w-32 h-32 md:w-56 md:h-56 object-contain mb-6 relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
                <h3 className="text-2xl md:text-3xl font-black capitalize text-white text-center tracking-tight">
                  {pokemonA.name}
                </h3>
              </div>
              
              {/* Center Divider */}
              <div className="w-px bg-gradient-to-b from-transparent via-white/10 to-transparent absolute left-1/2 top-10 bottom-10"></div>
              
              <div className="w-1/2 p-8 md:p-12 flex flex-col items-center relative overflow-hidden group">
                <div className={`absolute inset-0 opacity-[0.03] transition-opacity duration-500 group-hover:opacity-[0.08] ${getTypeColor(pokemonB.types[0]?.type.name)}`}></div>
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/5 to-transparent"></div>
                <img 
                  src={pokemonB.sprites.other['official-artwork']?.front_default || pokemonB.sprites.front_default} 
                  alt={pokemonB.name}
                  className="w-32 h-32 md:w-56 md:h-56 object-contain mb-6 relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                />
                <h3 className="text-2xl md:text-3xl font-black capitalize text-white text-center tracking-tight">
                  {pokemonB.name}
                </h3>
              </div>
            </div>

            {/* Stats Table */}
            <div className="flex flex-col px-4 md:px-12 pb-12">
              {stats.map((statName) => {
                const statA = pokemonA.stats.find(s => s.stat.name === statName)?.base_stat || 0;
                const statB = pokemonB.stats.find(s => s.stat.name === statName)?.base_stat || 0;
                
                // Max stat for calculating bar width (usually 255 is absolute max, but 150 is a good visual baseline)
                const maxStat = 150; 

                return (
                  <div key={statName} className="flex relative items-center justify-between py-5 border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                    
                    {/* Stat A */}
                    <div className="w-1/2 pr-12 sm:pr-16 md:pr-20 flex justify-end items-center gap-4 md:gap-8">
                      <span className={`text-xl md:text-2xl transition-all duration-300 ${getWinnerClass(statA, statB, true)}`}>
                        {statA}
                      </span>
                      {/* Bar going left */}
                      <div className="w-16 md:w-32 h-1 bg-white/5 rounded-full overflow-hidden hidden sm:block">
                         <div className={`h-full ml-auto rounded-full transition-all duration-1000 ease-out ${getBarColor(statA, statB, true)}`} style={{ width: `${Math.min((statA / maxStat) * 100, 100)}%` }}></div>
                      </div>
                    </div>

                    {/* Label */}
                    <div className="absolute left-1/2 -translate-x-1/2 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 group-hover:text-white/50 transition-colors z-10 bg-[#0a0a0a] px-2 whitespace-nowrap">
                      {STAT_LABELS[statName]}
                    </div>

                    {/* Stat B */}
                    <div className="w-1/2 pl-12 sm:pl-16 md:pl-20 flex justify-start items-center gap-4 md:gap-8">
                      {/* Bar going right */}
                      <div className="w-16 md:w-32 h-1 bg-white/5 rounded-full overflow-hidden hidden sm:block">
                         <div className={`h-full rounded-full transition-all duration-1000 ease-out ${getBarColor(statA, statB, false)}`} style={{ width: `${Math.min((statB / maxStat) * 100, 100)}%` }}></div>
                      </div>
                      <span className={`text-xl md:text-2xl transition-all duration-300 ${getWinnerClass(statA, statB, false)}`}>
                        {statB}
                      </span>
                    </div>
                    
                  </div>
                );
              })}
              
              {/* Total Row */}
              <div className="flex relative items-center py-10 mt-4">
                {(() => {
                  const totalA = pokemonA.stats.reduce((acc, curr) => acc + curr.base_stat, 0);
                  const totalB = pokemonB.stats.reduce((acc, curr) => acc + curr.base_stat, 0);
                  return (
                    <>
                      <div className="w-1/2 pr-12 sm:pr-16 md:pr-20 flex justify-end">
                        <span className={`text-4xl md:text-5xl transition-all duration-300 ${getWinnerClass(totalA, totalB, true)}`}>
                          {totalA}
                        </span>
                      </div>
                      
                      <div className="absolute left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-white/40 px-4 bg-[#0a0a0a] whitespace-nowrap">
                        TOTAL
                      </div>

                      <div className="w-1/2 pl-12 sm:pl-16 md:pl-20 flex justify-start">
                        <span className={`text-4xl md:text-5xl transition-all duration-300 ${getWinnerClass(totalA, totalB, false)}`}>
                          {totalB}
                        </span>
                      </div>
                    </>
                  );
                })()}
              </div>

            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-16 text-center border border-white/5 bg-white/[0.01] rounded-[2rem] animate-fade-in-up">
            <div className="relative flex items-center justify-center mb-8 select-none scale-110">
              <span className="text-7xl md:text-8xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-red-500 via-red-600 to-orange-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.6)] z-10 -mr-3">V</span>
              <span className="text-6xl md:text-7xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-bl from-blue-400 via-blue-500 to-indigo-600 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)] z-0 mt-6 -ml-1">S</span>
            </div>
            <p className="text-white/40 font-medium tracking-wide">
              Search and select two Pokémon above to compare their stats.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Compare;
