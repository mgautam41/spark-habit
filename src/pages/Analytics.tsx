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
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto pb-32 lg:pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-h1 text-foreground">Analytics</h1>
          <p className="text-body text-muted-foreground mt-2">
            Track your progress over time
          </p>
        </div>

        {/* Time Range Tabs */}
        <div className="flex gap-1 bg-background-secondary p-1 rounded-lg">
          {timeRanges.map(range => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-4 py-2 rounded-md text-body font-medium transition-all duration-200 ${
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <WeeklyChart />
        <TrendChart />
      </div>

      {/* Category Distribution */}
      <div className="mb-8">
        <CategoryChart />
      </div>

      {/* Insights */}
      <InsightCards />
    </div>
  );
}
