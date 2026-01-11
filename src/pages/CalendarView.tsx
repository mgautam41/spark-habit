import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { habits } from '@/data/mockData';

export function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Calculate start padding for first week
  const startDay = monthStart.getDay();
  const paddingDays = startDay === 0 ? 6 : startDay - 1;

  // Mock completion data
  const getCompletionRate = (date: Date) => {
    const dayOfMonth = date.getDate();
    // Generate consistent mock data based on date
    const seed = dayOfMonth * 7;
    const rate = (seed % 100);
    const completed = Math.round((rate / 100) * 12);
    return { rate, completed, total: 12 };
  };

  const getCompletionColor = (rate: number) => {
    if (rate >= 81) return 'bg-[#14532d]';
    if (rate >= 61) return 'bg-[#a16207]';
    if (rate >= 31) return 'bg-[#92400e]';
    return 'bg-[#7f1d1d]';
  };

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto pb-32 lg:pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-h1 text-foreground">Calendar</h1>
          <p className="text-body text-muted-foreground mt-2">
            View your habit history
          </p>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 rounded-lg hover:bg-background-tertiary transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <span className="text-h3 text-foreground min-w-[180px] text-center">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 rounded-lg hover:bg-background-tertiary transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button
            onClick={() => setCurrentMonth(new Date())}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-body font-medium hover:bg-primary-hover transition-colors"
          >
            Today
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="stat-card p-6">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center py-2">
              <span className="text-tiny text-muted-foreground uppercase">{day}</span>
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {/* Padding for start of month */}
          {Array.from({ length: paddingDays }).map((_, i) => (
            <div key={`pad-${i}`} className="aspect-square" />
          ))}

          {/* Actual days */}
          {days.map((day, index) => {
            const { rate, completed, total } = getCompletionRate(day);
            const isCurrentDay = isToday(day);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isFuture = day > new Date();

            return (
              <button
                key={day.toISOString()}
                onClick={() => !isFuture && setSelectedDate(day)}
                disabled={isFuture}
                className={cn(
                  "aspect-square rounded-lg p-1 transition-all duration-200 flex flex-col items-center justify-center gap-0.5 relative",
                  isFuture 
                    ? "bg-background-tertiary/50 cursor-not-allowed" 
                    : getCompletionColor(rate),
                  isCurrentDay && "ring-2 ring-primary animate-pulse-glow",
                  isSelected && "ring-2 ring-accent",
                  !isFuture && "hover:scale-105 cursor-pointer"
                )}
                style={{ animationDelay: `${index * 20}ms` }}
              >
                <span className={cn(
                  "text-body font-medium",
                  isFuture ? "text-muted-foreground/50" : "text-foreground"
                )}>
                  {format(day, 'd')}
                </span>
                {!isFuture && rate > 0 && (
                  <span className="text-tiny text-foreground/80">
                    {rate}%
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-card-border">
          <span className="text-tiny text-muted-foreground">Less</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 rounded bg-[#7f1d1d]" />
            <div className="w-4 h-4 rounded bg-[#92400e]" />
            <div className="w-4 h-4 rounded bg-[#a16207]" />
            <div className="w-4 h-4 rounded bg-[#14532d]" />
          </div>
          <span className="text-tiny text-muted-foreground">More</span>
        </div>
      </div>

      {/* Selected Date Detail Panel */}
      {selectedDate && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-[400px] bg-background-secondary border-l border-card-border z-50 animate-slide-in-right">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-h2 text-foreground">
                {format(selectedDate, 'MMMM d, yyyy')}
              </h2>
              <button
                onClick={() => setSelectedDate(null)}
                className="p-2 rounded-lg hover:bg-background-tertiary transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-4">
              {habits.slice(0, 8).map((habit, index) => {
                // Mock completion based on date and habit
                const isCompleted = (selectedDate.getDate() + habit.id) % 3 !== 0;
                
                return (
                  <div
                    key={habit.id}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg bg-background-tertiary animate-fade-in-up"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center",
                      isCompleted ? "bg-primary" : "bg-background border-2 border-muted-foreground/40"
                    )}>
                      {isCompleted && (
                        <svg className="w-3 h-3 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={cn(
                      "text-body",
                      isCompleted ? "text-muted-foreground line-through" : "text-foreground"
                    )}>
                      {habit.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Backdrop for mobile */}
      {selectedDate && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 sm:hidden"
          onClick={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
}
