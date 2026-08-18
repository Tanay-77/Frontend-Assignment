const LoadingSkeleton = () => {
  return (
    <div className="relative block pt-28 pb-2 px-2">
      {/* Background card skeleton */}
      <div className="absolute inset-x-0 bottom-0 top-20 rounded-[2rem] bg-slate-800 shadow-lg overflow-hidden">
        {/* Shimmer effect overlay */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_1.5s_infinite] z-20"></div>
      </div>
      
      <div className="relative z-10 h-full flex flex-col items-center">
        {/* Favorite button skeleton */}
        <div className="absolute right-4 top-4 w-8 h-8 rounded-full bg-slate-700 animate-pulse z-30"></div>

        {/* Artwork skeleton popping out */}
        <div className="relative w-full aspect-square -mt-24 mb-4 flex items-end justify-center pointer-events-none">
          <div className="w-3/4 h-3/4 bg-slate-700 rounded-full animate-pulse relative z-20"></div>
        </div>

        {/* Info skeleton - Bottom aligned */}
        <div className="w-full flex flex-col items-center mt-auto pb-6 px-4">
          <div className="h-6 bg-slate-700 rounded w-2/3 mb-3 animate-pulse"></div>
          <div className="flex justify-center gap-2">
            <div className="h-3 bg-slate-700 rounded w-12 animate-pulse"></div>
            <div className="h-3 bg-slate-700 rounded w-16 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
