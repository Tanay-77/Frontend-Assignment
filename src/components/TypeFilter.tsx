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
        className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
          value === '' 
            ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-900 shadow-md' 
            : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
        }`}
      >
        All Types
      </button>
      {TYPES.map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold capitalize transition-colors ${
            value === type 
              ? 'bg-red-500 text-white border border-red-500 shadow-md' 
              : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default TypeFilter;
