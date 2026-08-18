

const TypeFilter = () => {
  return (
    <select className="block w-full pl-3 pr-10 py-3 text-base border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 transition-shadow">
      <option value="">All Types</option>
      <option value="fire">Fire</option>
      <option value="water">Water</option>
      <option value="grass">Grass</option>
      {/* Real types will be mapped here */}
    </select>
  );
};

export default TypeFilter;
