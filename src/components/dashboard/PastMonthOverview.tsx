import { Calendar, TrendingUp, TrendingDown, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';
import { format, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth } from 'date-fns';

interface DayData {
  date: Date;
  completed: number;
  total: number;
}

// Generate deterministic mock data for any month
const generateMonthData = (month: Date): DayData[] => {
  const start = startOfMonth(month);
  const end = endOfMonth(month);
  const days = eachDayOfInterval({ start, end });
  
  return days.map((date, index) => ({
    date,
    completed: ((date.getDate() * 7 + month.getMonth()) % 8) + 1,
    total: 8,
  }));
};

export function PastMonthOverview() {
  const [selectedMonth, setSelectedMonth] = useState(() => subMonths(new Date(), 1));
  
  const monthData = useMemo(() => generateMonthData(selectedMonth), [selectedMonth]);
  const prevMonthData = useMemo(() => generateMonthData(subMonths(selectedMonth, 1)), [selectedMonth]);
  
  const totalCompleted = monthData.reduce((sum, day) => sum + day.completed, 0);
  const totalPossible = monthData.reduce((sum, day) => sum + day.total, 0);
  const completionRate = Math.round((totalCompleted / totalPossible) * 100);
  
  const prevCompleted = prevMonthData.reduce((sum, day) => sum + day.completed, 0);
  const prevPossible = prevMonthData.reduce((sum, day) => sum + day.total, 0);
  const prevRate = Math.round((prevCompleted / prevPossible) * 100);
  const rateChange = completionRate - prevRate;

  const navigateMonth = (direction: 'prev' | 'next') => {
    setSelectedMonth(prev => 
      direction === 'prev' ? subMonths(prev, 1) : subMonths(prev, -1)
    );
  };

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-health/70';
    if (percentage >= 50) return 'bg-warning/70';
    return 'bg-danger/70';
  };

  const stats = [
    { label: 'Completed', value: totalCompleted },
    { label: 'Rate', value: `${completionRate}%` },
    { label: 'Best Day', value: Math.max(...monthData.map(d => d.completed)) },
    { label: 'Average', value: (totalCompleted / monthData.length).toFixed(1) },
  ];

  return (
    <div className="glass-card p-4 sm:p-6 mt-4 sm:mt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-accent/20 flex items-center justify-center">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-foreground">Past Month</h2>
            <p className="text-tiny sm:text-small text-muted-foreground">Historical tracking</p>
          </div>
        </div>
        
        {/* Month Navigation */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-background-tertiary transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <span className="text-small sm:text-body font-medium text-foreground min-w-[100px] sm:min-w-[120px] text-center">
            {format(selectedMonth, 'MMM yyyy')}
          </span>
          <button
            onClick={() => navigateMonth('next')}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-background-tertiary transition-colors"
            disabled={isSameMonth(selectedMonth, subMonths(new Date(), 1))}
          >
            <ChevronRight className={`w-4 h-4 ${isSameMonth(selectedMonth, subMonths(new Date(), 1)) ? 'text-muted-foreground/30' : 'text-muted-foreground'}`} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {stats.map((stat) => (
          <div key={stat.label} className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-background-tertiary text-center">
            <p className="text-base sm:text-lg font-bold text-foreground">{stat.value}</p>
            <p className="text-[10px] sm:text-tiny text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Comparison */}
      <div className="flex items-center gap-2 mb-4 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-background-tertiary">
        {rateChange > 0 ? (
          <TrendingUp className="w-4 h-4 text-health" />
        ) : rateChange < 0 ? (
          <TrendingDown className="w-4 h-4 text-danger" />
        ) : (
          <Minus className="w-4 h-4 text-muted-foreground" />
        )}
        <span className={`text-tiny sm:text-small font-medium ${rateChange > 0 ? 'text-health' : rateChange < 0 ? 'text-danger' : 'text-muted-foreground'}`}>
          {rateChange > 0 ? '+' : ''}{rateChange}% vs previous month
        </span>
      </div>

      {/* Mini Heatmap */}
      <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div key={i} className="text-center text-[10px] sm:text-tiny text-muted-foreground py-0.5 sm:py-1">{day}</div>
        ))}
        {Array.from({ length: startOfMonth(selectedMonth).getDay() }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        {monthData.map((day, i) => {
          const percentage = (day.completed / day.total) * 100;
          return (
            <div
              key={i}
              className={`aspect-square rounded-sm sm:rounded-md ${getCompletionColor(percentage)} hover:opacity-100 transition-opacity cursor-pointer`}
              title={`${format(day.date, 'MMM d')}: ${day.completed}/${day.total}`}
            />
          );
        })}
      </div>
    </div>
  );
}
