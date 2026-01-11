import { weeklyData } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function WeeklyOverview() {
  const today = new Date().getDay();
  const dayIndex = today === 0 ? 6 : today - 1; // Convert to Mon=0, Sun=6

  return (
    <div className="mt-8 sm:mt-12">
      <h2 className="text-h2 text-foreground mb-4 sm:mb-6">Your Week</h2>
      
      {/* Mobile: Horizontal scroll, Tablet+: Grid */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-7 sm:gap-3 sm:overflow-visible scrollbar-hide">
        {weeklyData.map((day, index) => {
          const isToday = index === dayIndex;
          const circumference = 2 * Math.PI * 28;
          const strokeDashoffset = circumference - (day.percentage / 100) * circumference;
          
          return (
            <div 
              key={day.day}
              className={cn(
                "stat-card flex flex-col items-center py-3 px-3 sm:py-4 sm:px-2 min-w-[72px] sm:min-w-0 flex-shrink-0 sm:flex-shrink",
                isToday && "ring-2 ring-primary animate-pulse-glow"
              )}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <span className="text-tiny text-muted-foreground uppercase">
                {day.day}
              </span>
              
              <div className="relative w-12 h-12 sm:w-14 md:w-16 sm:h-14 md:h-16 mt-2">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                  {/* Background circle */}
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke="hsl(var(--background-tertiary))"
                    strokeWidth="4"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    fill="none"
                    stroke={
                      day.percentage >= 70 
                        ? 'hsl(var(--category-health))' 
                        : day.percentage >= 40 
                          ? 'hsl(var(--warning))' 
                          : 'hsl(var(--danger))'
                    }
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-700 ease-out"
                    style={{ transitionDelay: `${index * 100 + 300}ms` }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-small sm:text-body font-bold text-foreground">
                    {day.percentage}%
                  </span>
                </div>
              </div>

              <span className="text-tiny sm:text-small text-muted-foreground mt-1.5 sm:mt-2">
                {day.completed}/{day.total}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
