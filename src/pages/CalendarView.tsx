import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, addMonths, subMonths, isSameDay } from 'date-fns';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { habits } from '@/data/mockData';

export function CalendarView() {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Calculate start padding for first week (Sunday = 0)
  const startDay = monthStart.getDay();

  // Mock completion data
  const getCompletionRate = (date: Date) => {
    const dayOfMonth = date.getDate();
    const seed = dayOfMonth * 7;
    const rate = (seed % 100);
    const completed = Math.round((rate / 100) * 12);
    return { rate, completed, total: 12 };
  };

  const getCompletionColor = (rate: number) => {
    if (rate >= 81) return 'bg-health/70';
    if (rate >= 61) return 'bg-warning/70';
    if (rate >= 31) return 'bg-orange-600/70';
    return 'bg-danger/70';
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto pb-28 lg:pb-8">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-h1 text-foreground">Calendar</h1>
          <p className="text-small sm:text-body text-muted-foreground mt-1">
            View your habit history
          </p>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-4">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 rounded-lg hover:bg-background-tertiary transition-colors touch-manipulation"
          >
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <span className="text-body sm:text-h3 text-foreground min-w-[140px] text-center font-semibold">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 rounded-lg hover:bg-background-tertiary transition-colors touch-manipulation"
          >
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <button
            onClick={() => setCurrentMonth(new Date())}
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-primary text-primary-foreground text-small font-medium hover:bg-primary-hover transition-colors touch-manipulation ml-auto sm:ml-2"
          >
            Today
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="stat-card p-3 sm:p-4 lg:p-6 overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center py-1 sm:py-2">
              <span className="text-[10px] sm:text-tiny text-muted-foreground uppercase font-medium">
                <span className="sm:hidden">{day[0]}</span>
                <span className="hidden sm:inline">{day}</span>
              </span>
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {/* Padding for start of month */}
          {Array.from({ length: startDay }).map((_, i) => (
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
                  "aspect-square rounded-md sm:rounded-lg p-0.5 sm:p-1 transition-all duration-200 flex flex-col items-center justify-center relative touch-manipulation",
                  isFuture 
                    ? "bg-background-tertiary/50 cursor-not-allowed" 
                    : getCompletionColor(rate),
                  isCurrentDay && "ring-2 ring-primary ring-offset-1 ring-offset-background",
                  isSelected && "ring-2 ring-accent ring-offset-1 ring-offset-background",
                  !isFuture && "hover:scale-105 active:scale-95 cursor-pointer"
                )}
                style={{ animationDelay: `${index * 15}ms` }}
              >
                <span className={cn(
                  "text-xs sm:text-sm font-medium leading-none",
                  isFuture ? "text-muted-foreground/50" : "text-foreground"
                )}>
                  {format(day, 'd')}
                </span>
                {!isFuture && rate > 0 && (
                  <span className="hidden sm:block text-[10px] text-foreground/70 mt-0.5">
                    {rate}%
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6 pt-4 border-t border-card-border">
          <span className="text-[10px] sm:text-tiny text-muted-foreground">Less</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-danger/70" />
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-orange-600/70" />
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-warning/70" />
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-health/70" />
          </div>
          <span className="text-[10px] sm:text-tiny text-muted-foreground">More</span>
        </div>
      </div>

      {/* Selected Date Detail Panel */}
      {selectedDate && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSelectedDate(null)}
          />
          <div className="fixed inset-x-0 bottom-0 sm:inset-y-0 sm:left-auto sm:right-0 w-full sm:w-[400px] max-h-[70vh] sm:max-h-full bg-background-secondary border-t sm:border-l sm:border-t-0 border-card-border z-50 animate-slide-in-right rounded-t-2xl sm:rounded-none overflow-hidden">
            <div className="p-4 sm:p-6 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-h2 text-foreground font-bold">
                  {format(selectedDate, 'MMM d, yyyy')}
                </h2>
                <button
                  onClick={() => setSelectedDate(null)}
                  className="p-2 rounded-lg hover:bg-background-tertiary transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div className="space-y-2 sm:space-y-3">
                {habits.slice(0, 8).map((habit, index) => {
                  const isCompleted = (selectedDate.getDate() + habit.id) % 3 !== 0;
                  
                  return (
                    <div
                      key={habit.id}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg bg-background-tertiary animate-fade-in"
                      )}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className={cn(
                        "w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0",
                        isCompleted ? "bg-primary" : "bg-background border-2 border-muted-foreground/40"
                      )}>
                        {isCompleted && (
                          <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={cn(
                        "text-small sm:text-body",
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
        </>
      )}
    </div>
  );
}
