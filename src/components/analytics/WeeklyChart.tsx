import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { weeklyData } from '@/data/mockData';

export function WeeklyChart() {
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;

  return (
    <div className="stat-card">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-lg sm:text-h3 text-foreground">Weekly Completion Rate</h3>
        <p className="text-small text-muted-foreground mt-1">Last 7 days</p>
      </div>
      
      <div className="h-[200px] sm:h-[240px] -mx-2 sm:mx-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData} barSize={24} margin={{ left: -10, right: 0 }}>
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              interval={0}
              tickFormatter={(value) => value.slice(0, 1)}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              width={35}
            />
            <Tooltip
              cursor={{ fill: 'hsl(var(--background-tertiary))', radius: 8 }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="chart-tooltip">
                      <p className="text-body font-semibold text-foreground">{data.day}</p>
                      <p className="text-small text-muted-foreground">
                        {data.percentage}% ({data.completed}/{data.total})
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="percentage" 
              radius={[6, 6, 0, 0]}
            >
              {weeklyData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={index === todayIndex ? 'hsl(var(--primary))' : 'hsl(var(--primary) / 0.6)'}
                  stroke={index === todayIndex ? 'hsl(var(--primary))' : 'none'}
                  strokeWidth={2}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
