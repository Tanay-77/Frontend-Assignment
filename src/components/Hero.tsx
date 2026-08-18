
import { ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const scrollToExplorer = () => {
    const element = document.getElementById('explorer-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left space-y-8 max-w-3xl mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-semibold text-xs tracking-wider uppercase animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              The Ultimate Pokédex Experience
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight animate-fade-in-up animation-delay-150">
              Explore the world of <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Pokémon.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-300">
              Discover Pokémon, their types, abilities, stats, and more — all in one beautiful, highly responsive Pokédex designed for the modern web.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4 animate-fade-in-up animation-delay-500">
              <button
                onClick={scrollToExplorer}
                className="w-full sm:w-auto px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-bold transition-all hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 flex items-center justify-center gap-2"
              >
                Explore Pokémon
                <ArrowRight className="w-5 h-5" />
              </button>
              <Link
                to="/favorites"
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-red-500 dark:hover:text-red-400 border-2 border-slate-200 dark:border-slate-700 hover:border-red-500/50 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group"
              >
                <Heart className="w-5 h-5 group-hover:fill-current transition-colors" />
                View Favorites
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none relative animate-fade-in-up animation-delay-500">
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center">
              {/* Decorative rings */}
              <div className="absolute inset-0 border-4 border-slate-100 dark:border-slate-800 rounded-full scale-75 opacity-50"></div>
              <div className="absolute inset-0 border-4 border-slate-100 dark:border-slate-800 rounded-full scale-100 opacity-20"></div>
              
              {/* Pokémon Image placeholder */}
              <img 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" 
                alt="Pikachu" 
                className="w-3/4 h-3/4 object-contain relative z-10 drop-shadow-2xl hover:scale-110 transition-transform duration-500"
              />
              
              {/* Floating badges (simulated UI elements) */}
              <div className="absolute top-10 right-10 glass-card px-4 py-2 flex items-center gap-2 animate-bounce-slow">
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <span className="font-bold text-sm">Electric</span>
              </div>
              <div className="absolute bottom-20 left-4 glass-card px-4 py-2 flex items-center gap-2 animate-bounce-slow animation-delay-2000">
                <span className="font-bold text-sm">Speed: 90</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
