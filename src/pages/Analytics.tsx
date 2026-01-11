import { useState } from 'react';
import { WeeklyChart } from '@/components/analytics/WeeklyChart';
import { TrendChart } from '@/components/analytics/TrendChart';
import { CategoryChart } from '@/components/analytics/CategoryChart';
import { InsightCards } from '@/components/analytics/InsightCard';

type TimeRange = 'week' | 'month' | 'quarter' | 'year';

export function Analytics() {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');

  const timeRanges: { value: TimeRange; label: string }[] = [
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'quarter', label: 'Quarter' },
    { value: 'year', label: 'Year' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto pb-28 lg:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-h1 text-foreground">Analytics</h1>
          <p className="text-body text-muted-foreground mt-1 sm:mt-2">
            Track your progress over time
          </p>
        </div>

        {/* Time Range Tabs */}
        <div className="flex gap-1 bg-background-secondary p-1 rounded-lg overflow-x-auto">
          {timeRanges.map(range => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-small sm:text-body font-medium transition-all duration-200 whitespace-nowrap ${
                timeRange === range.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <WeeklyChart />
        <TrendChart />
      </div>

      {/* Category Distribution */}
      <div className="mb-6 sm:mb-8">
        <CategoryChart />
      </div>

      {/* Insights */}
      <InsightCards />
    </div>
  );
}
