import { useEffect, useState } from 'react';

interface StatBarProps {
  name: string;
  value: number;
  colorClass: string;
}

const STAT_LABELS: Record<string, string> = {
  'hp': 'HP',
  'attack': 'ATK',
  'defense': 'DEF',
  'special-attack': 'SPA',
  'special-defense': 'SPD',
  'speed': 'SPE',
};

const MAX_STAT = 255;

const StatBar = ({ name, value, colorClass }: StatBarProps) => {
  const [width, setWidth] = useState(0);
  const label = STAT_LABELS[name] || name.toUpperCase();
  const percentage = Math.min(100, Math.max(0, (value / MAX_STAT) * 100));

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setWidth(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="flex items-center gap-4 mb-3">
      <div className="w-10 text-right">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">{label}</span>
      </div>
      <div className="w-8 text-right">
        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{value}</span>
      </div>
      <div className="flex-1 h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out ${colorClass}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

export default StatBar;
