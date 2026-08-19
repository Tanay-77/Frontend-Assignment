interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  return (
    <div className="relative">
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full min-w-[180px] pl-4 pr-10 py-3 text-base border border-slate-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-white/20 sm:text-sm rounded-full bg-white dark:bg-[#0a0a0a] text-slate-900 dark:text-white transition-all appearance-none cursor-pointer shadow-sm dark:shadow-inner"
      >
        <option value="default">Default Sorting</option>
        <option value="id-asc">ID Low → High</option>
        <option value="id-desc">ID High → Low</option>
        <option value="name-asc">Name A → Z</option>
        <option value="name-desc">Name Z → A</option>
        <option value="hp-desc">HP High → Low</option>
        <option value="attack-desc">Attack High → Low</option>
        <option value="speed-desc">Speed High → Low</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default SortDropdown;
