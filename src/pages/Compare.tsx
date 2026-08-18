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
    if (valA === valB) return 'text-slate-900 dark:text-white font-bold'; // Tie
    if (isA) {
      return valA > valB ? 'text-green-600 dark:text-green-400 font-extrabold' : 'text-slate-400 dark:text-slate-500';
    } else {
      return valB > valA ? 'text-green-600 dark:text-green-400 font-extrabold' : 'text-slate-400 dark:text-slate-500';
    }
  };

  const getWinnerBgClass = (valA: number, valB: number, isA: boolean) => {
    if (valA === valB) return 'bg-slate-100 dark:bg-slate-800'; // Tie
    if (isA) {
      return valA > valB ? 'bg-green-100 dark:bg-green-900/30' : 'bg-transparent';
    } else {
      return valB > valA ? 'bg-green-100 dark:bg-green-900/30' : 'bg-transparent';
    }
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-900 dark:text-white flex items-center justify-center gap-3">
            <Scale className="w-8 h-8 text-red-500" />
            Pokémon Comparison
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Select two Pokémon to instantly compare their base stats side-by-side.
          </p>
        </div>

        {/* Selection Area */}
        <div className="glass-card p-6 md:p-8 mb-12 rounded-3xl relative z-20">
          <div className="flex flex-col md:flex-row gap-12 md:gap-8 items-start justify-between relative">
            <div className="w-full md:w-5/12">
              <CompareSearch 
                label="Pokémon A" 
                selectedPokemon={pokemonA} 
                onSelect={setPokemonA} 
              />
            </div>
            
            {/* VS Badge */}
            <div className="w-full md:w-2/12 flex justify-center py-2 md:py-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-6 pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-black italic shadow-lg">
                VS
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
          <div className="glass-card overflow-hidden rounded-3xl animate-fade-in-up relative z-10">
            
            {/* Profiles */}
            <div className="flex border-b border-slate-200 dark:border-slate-700 relative">
              <div className="w-1/2 p-6 flex flex-col items-center relative overflow-hidden">
                <div className={`absolute inset-0 opacity-10 ${getTypeColor(pokemonA.types[0]?.type.name)}`}></div>
                <img 
                  src={pokemonA.sprites.other['official-artwork']?.front_default || pokemonA.sprites.front_default} 
                  alt={pokemonA.name}
                  className="w-32 h-32 md:w-48 md:h-48 object-contain mb-4 relative z-10"
                />
                <h3 className="text-2xl font-extrabold capitalize text-slate-900 dark:text-white text-center">
                  {pokemonA.name}
                </h3>
              </div>
              
              <div className="w-px bg-slate-200 dark:bg-slate-700"></div>
              
              <div className="w-1/2 p-6 flex flex-col items-center relative overflow-hidden">
                <div className={`absolute inset-0 opacity-10 ${getTypeColor(pokemonB.types[0]?.type.name)}`}></div>
                <img 
                  src={pokemonB.sprites.other['official-artwork']?.front_default || pokemonB.sprites.front_default} 
                  alt={pokemonB.name}
                  className="w-32 h-32 md:w-48 md:h-48 object-contain mb-4 relative z-10"
                />
                <h3 className="text-2xl font-extrabold capitalize text-slate-900 dark:text-white text-center">
                  {pokemonB.name}
                </h3>
              </div>
            </div>

            {/* Stats Table */}
            <div className="flex flex-col">
              {stats.map((statName, idx) => {
                const statA = pokemonA.stats.find(s => s.stat.name === statName)?.base_stat || 0;
                const statB = pokemonB.stats.find(s => s.stat.name === statName)?.base_stat || 0;
                const isEven = idx % 2 === 0;

                return (
                  <div key={statName} className={`flex relative ${isEven ? 'bg-slate-50 dark:bg-slate-800/50' : 'bg-white dark:bg-slate-900'}`}>
                    
                    {/* Stat A */}
                    <div className={`w-1/2 p-4 text-center transition-colors ${getWinnerBgClass(statA, statB, true)}`}>
                      <span className={`text-xl md:text-2xl ${getWinnerClass(statA, statB, true)}`}>
                        {statA}
                      </span>
                    </div>

                    {/* Divider & Label */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-4 py-1 shadow-sm z-10">
                      <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {STAT_LABELS[statName]}
                      </span>
                    </div>

                    <div className="w-px bg-slate-200 dark:bg-slate-700 absolute left-1/2 top-0 bottom-0"></div>

                    {/* Stat B */}
                    <div className={`w-1/2 p-4 text-center transition-colors ${getWinnerBgClass(statA, statB, false)}`}>
                      <span className={`text-xl md:text-2xl ${getWinnerClass(statA, statB, false)}`}>
                        {statB}
                      </span>
                    </div>
                    
                  </div>
                );
              })}
              
              {/* Total Row */}
              <div className="flex relative border-t-2 border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                {(() => {
                  const totalA = pokemonA.stats.reduce((acc, curr) => acc + curr.base_stat, 0);
                  const totalB = pokemonB.stats.reduce((acc, curr) => acc + curr.base_stat, 0);
                  return (
                    <>
                      <div className={`w-1/2 p-6 text-center transition-colors ${getWinnerBgClass(totalA, totalB, true)}`}>
                        <span className={`text-3xl ${getWinnerClass(totalA, totalB, true)}`}>{totalA}</span>
                      </div>
                      
                      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-slate-900 dark:bg-white rounded-full px-6 py-2 shadow-lg z-10">
                        <span className="text-sm font-black uppercase tracking-widest text-white dark:text-slate-900">
                          TOTAL
                        </span>
                      </div>
                      
                      <div className="w-px bg-slate-200 dark:bg-slate-700 absolute left-1/2 top-0 bottom-0"></div>

                      <div className={`w-1/2 p-6 text-center transition-colors ${getWinnerBgClass(totalA, totalB, false)}`}>
                        <span className={`text-3xl ${getWinnerClass(totalA, totalB, false)}`}>{totalB}</span>
                      </div>
                    </>
                  );
                })()}
              </div>

            </div>
          </div>
        ) : (
          <div className="text-center p-12 text-slate-400 dark:text-slate-500 font-bold border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl animate-fade-in-up">
            Search and select two Pokémon above to compare their stats.
          </div>
        )}

      </div>
    </div>
  );
};

export default Compare;
