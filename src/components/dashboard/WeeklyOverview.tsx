import { weeklyData } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function WeeklyOverview() {
  const today = new Date().getDay();
  const dayIndex = today === 0 ? 6 : today - 1; // Convert to Mon=0, Sun=6

  return (
    <div className="mt-12">
      <h2 className="text-h2 text-foreground mb-6">Your Week</h2>
      
      <div className="grid grid-cols-7 gap-3">
        {weeklyData.map((day, index) => {
          const isToday = index === dayIndex;
          const circumference = 2 * Math.PI * 32;
          const strokeDashoffset = circumference - (day.percentage / 100) * circumference;
          
          return (
            <div 
              key={day.day}
              className={cn(
                "stat-card flex flex-col items-center py-4 px-2",
                isToday && "ring-2 ring-primary animate-pulse-glow"
              )}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <span className="text-tiny text-muted-foreground uppercase">
                {day.day}
              </span>
              
              <div className="relative w-16 h-16 mt-2">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
                  {/* Background circle */}
                  <circle
                    cx="36"
                    cy="36"
                    r="32"
                    fill="none"
                    stroke="hsl(var(--background-tertiary))"
                    strokeWidth="4"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="36"
                    cy="36"
                    r="32"
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
                  <span className="text-body font-bold text-foreground">
                    {day.percentage}%
                  </span>
                </div>
              </div>

              <span className="text-small text-muted-foreground mt-2">
                {day.completed}/{day.total}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
