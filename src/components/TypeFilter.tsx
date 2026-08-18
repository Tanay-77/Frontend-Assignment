interface TypeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const TYPES = [
  'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 
  'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const TypeFilter = ({ value, onChange }: TypeFilterProps) => {
  return (
    <div className="flex overflow-x-auto pb-2 -mb-2 hide-scrollbar gap-2 w-full">
      <button
        onClick={() => onChange('')}
        className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-colors ${
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
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold capitalize transition-colors ${
            value === type 
              ? 'bg-red-500 text-white shadow-[0_0_10px_rgba(239,68,68,0.5)]' 
              : 'bg-[#0a0a0a] text-slate-400 hover:text-white border border-white/10 hover:border-white/30'
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default TypeFilter;
