import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { categoryDistribution } from '@/data/mockData';

export function CategoryChart() {
  const total = categoryDistribution.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="stat-card">
      <div className="mb-6">
        <h3 className="text-h3 text-foreground">Habit Categories</h3>
        <p className="text-small text-muted-foreground mt-1">Distribution by category</p>
      </div>
      
      <div className="flex items-center gap-8">
        <div className="w-[180px] h-[180px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryDistribution}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="chart-tooltip">
                        <p className="text-body font-semibold text-foreground">{data.name}</p>
                        <p className="text-small text-muted-foreground">
                          {data.value} habits ({Math.round((data.value / total) * 100)}%)
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-h2 text-foreground font-bold">{total}</p>
              <p className="text-tiny text-muted-foreground">HABITS</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 grid grid-cols-2 gap-3">
          {categoryDistribution.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-small text-muted-foreground">{item.name}</span>
              <span className="text-small text-foreground font-medium ml-auto">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
