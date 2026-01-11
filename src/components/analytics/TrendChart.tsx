import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Area, AreaChart } from 'recharts';
import { monthlyTrend } from '@/data/mockData';

export function TrendChart() {
  return (
    <div className="stat-card">
      <div className="mb-6">
        <h3 className="text-h3 text-foreground">Habit Consistency</h3>
        <p className="text-small text-muted-foreground mt-1">Last 30 days</p>
      </div>
      
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyTrend}>
            <defs>
              <linearGradient id="colorHabits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
              interval="preserveStartEnd"
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              domain={[0, 12]}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="chart-tooltip">
                      <p className="text-body font-semibold text-foreground">{data.date}</p>
                      <p className="text-small text-accent">
                        {data.habits} habits completed
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="habits"
              stroke="hsl(var(--accent))"
              strokeWidth={3}
              fill="url(#colorHabits)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
