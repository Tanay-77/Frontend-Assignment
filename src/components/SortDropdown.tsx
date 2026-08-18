

const SortDropdown = () => {
  return (
    <select className="block w-full pl-3 pr-10 py-3 text-base border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 transition-shadow">
      <option value="id-asc">Lowest Number (First)</option>
      <option value="id-desc">Highest Number (First)</option>
      <option value="name-asc">A-Z</option>
      <option value="name-desc">Z-A</option>
    </select>
  );
};

export default SortDropdown;
