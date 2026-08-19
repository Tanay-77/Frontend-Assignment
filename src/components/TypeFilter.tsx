import { useRef, useState } from 'react';

interface TypeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const TYPES = [
  'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 
  'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const TypeFilter = ({ value, onChange }: TypeFilterProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative w-full">
      {/* Left fade out */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none z-10"></div>
      
      {/* Scrollable Container */}
      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex overflow-x-auto gap-3 w-full hide-scrollbar px-4 pb-2 ${
          isDragging ? 'cursor-grabbing select-none' : 'cursor-grab scroll-smooth'
        }`}
      >
        <button
          onClick={() => onChange('')}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-colors shrink-0 ${
            value === '' 
              ? 'bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.3)]' 
              : 'bg-[#0a0a0a] text-slate-400 hover:text-white border border-white/10 hover:border-white/30'
          }`}
        >
          All Types
        </button>
        {TYPES.map((type) => (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold capitalize transition-colors shrink-0 ${
              value === type 
                ? 'bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.5)]' 
                : 'bg-[#0a0a0a] text-slate-400 hover:text-white border border-white/10 hover:border-white/30'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Right fade out */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent pointer-events-none z-10"></div>
    </div>
  );
};

export default TypeFilter;
