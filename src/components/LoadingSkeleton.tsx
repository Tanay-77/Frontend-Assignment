const LoadingSkeleton = () => {
  return (
    <div className="glass-card p-5 relative overflow-hidden">
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent animate-[shimmer_1.5s_infinite] z-20"></div>
      
      <div className="flex justify-between items-start mb-4">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-12 animate-pulse"></div>
        <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse"></div>
      </div>

      {/* Artwork skeleton */}
      <div className="relative aspect-square mb-6 flex items-center justify-center">
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 rounded-full opacity-20 blur-2xl animate-pulse"></div>
        <div className="w-3/4 h-3/4 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse relative z-10"></div>
      </div>

      {/* Info skeleton */}
      <div className="flex flex-col items-center">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-24 mb-3 animate-pulse"></div>
        <div className="flex justify-center gap-2">
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-16 animate-pulse"></div>
          <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-16 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
