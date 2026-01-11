import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { weeklyData } from '@/data/mockData';

export function WeeklyChart() {
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;

  return (
    <div className="stat-card">
      <div className="mb-6">
        <h3 className="text-h3 text-foreground">Weekly Completion Rate</h3>
        <p className="text-small text-muted-foreground mt-1">Last 7 days</p>
      </div>
      
      <div className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData} barSize={40}>
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
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
              radius={[8, 8, 0, 0]}
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
