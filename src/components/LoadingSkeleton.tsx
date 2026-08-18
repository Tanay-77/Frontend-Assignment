

const LoadingSkeleton = () => {
  return (
    <div className="glass-card p-4 animate-pulse">
      <div className="aspect-square bg-slate-200 dark:bg-slate-700 rounded-xl mb-4"></div>
      <div className="flex justify-between items-center mb-3">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/5"></div>
      </div>
      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
      <div className="flex gap-2">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-16"></div>
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-16"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
