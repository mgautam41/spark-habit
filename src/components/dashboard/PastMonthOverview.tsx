import { Calendar, TrendingUp, TrendingDown, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { format, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth } from 'date-fns';

interface DayData {
  date: Date;
  completed: number;
  total: number;
}

// Generate mock data for any month
const generateMonthData = (month: Date): DayData[] => {
  const start = startOfMonth(month);
  const end = endOfMonth(month);
  const days = eachDayOfInterval({ start, end });
  
  return days.map(date => ({
    date,
    completed: Math.floor(Math.random() * 8) + 1,
    total: 8,
  }));
};

export function PastMonthOverview() {
  const [selectedMonth, setSelectedMonth] = useState(() => subMonths(new Date(), 1));
  const monthData = generateMonthData(selectedMonth);
  
  const totalCompleted = monthData.reduce((sum, day) => sum + day.completed, 0);
  const totalPossible = monthData.reduce((sum, day) => sum + day.total, 0);
  const completionRate = Math.round((totalCompleted / totalPossible) * 100);
  
  // Calculate previous month comparison
  const prevMonthData = generateMonthData(subMonths(selectedMonth, 1));
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
    if (percentage >= 80) return 'bg-health/80';
    if (percentage >= 50) return 'bg-warning/80';
    return 'bg-danger/80';
  };

  const stats = [
    { label: 'Total Completed', value: totalCompleted, suffix: 'habits' },
    { label: 'Completion Rate', value: `${completionRate}%`, suffix: '' },
    { label: 'Best Day', value: Math.max(...monthData.map(d => d.completed)), suffix: 'habits' },
    { label: 'Avg Daily', value: (totalCompleted / monthData.length).toFixed(1), suffix: 'habits' },
  ];

  return (
    <div className="glass-card p-4 sm:p-6 mt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Past Month Overview</h2>
            <p className="text-small text-muted-foreground">Historical performance tracking</p>
          </div>
        </div>
        
        {/* Month Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 rounded-lg hover:bg-background-tertiary transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <span className="text-body font-medium text-foreground min-w-[120px] text-center">
            {format(selectedMonth, 'MMMM yyyy')}
          </span>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 rounded-lg hover:bg-background-tertiary transition-colors"
            disabled={isSameMonth(selectedMonth, subMonths(new Date(), 1))}
          >
            <ChevronRight className={`w-4 h-4 ${isSameMonth(selectedMonth, subMonths(new Date(), 1)) ? 'text-muted-foreground/30' : 'text-muted-foreground'}`} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {stats.map((stat) => (
          <div key={stat.label} className="p-3 rounded-xl bg-background-tertiary">
            <p className="text-tiny text-muted-foreground">{stat.label}</p>
            <p className="text-lg font-bold text-foreground">
              {stat.value}
              {stat.suffix && <span className="text-small font-normal text-muted-foreground ml-1">{stat.suffix}</span>}
            </p>
          </div>
        ))}
      </div>

      {/* Comparison */}
      <div className="flex items-center gap-2 mb-4 p-3 rounded-xl bg-background-tertiary">
        {rateChange > 0 ? (
          <TrendingUp className="w-4 h-4 text-health" />
        ) : rateChange < 0 ? (
          <TrendingDown className="w-4 h-4 text-danger" />
        ) : (
          <Minus className="w-4 h-4 text-muted-foreground" />
        )}
        <span className={`text-small font-medium ${rateChange > 0 ? 'text-health' : rateChange < 0 ? 'text-danger' : 'text-muted-foreground'}`}>
          {rateChange > 0 ? '+' : ''}{rateChange}% vs previous month
        </span>
      </div>

      {/* Mini Heatmap */}
      <div className="grid grid-cols-7 gap-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <div key={i} className="text-center text-tiny text-muted-foreground py-1">{day}</div>
        ))}
        {/* Add empty cells for days before month starts */}
        {Array.from({ length: startOfMonth(selectedMonth).getDay() }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        {monthData.map((day, i) => {
          const percentage = (day.completed / day.total) * 100;
          return (
            <div
              key={i}
              className={`aspect-square rounded-md ${getCompletionColor(percentage)} opacity-70 hover:opacity-100 transition-opacity cursor-pointer`}
              title={`${format(day.date, 'MMM d')}: ${day.completed}/${day.total} (${Math.round(percentage)}%)`}
            />
          );
        })}
      </div>
    </div>
  );
}
