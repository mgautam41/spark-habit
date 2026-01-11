import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { categoryDistribution } from '@/data/mockData';

export function CategoryChart() {
  const total = categoryDistribution.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="stat-card">
      <div className="mb-4 sm:mb-6">
        <h3 className="text-h3 text-foreground">Habit Categories</h3>
        <p className="text-small text-muted-foreground mt-1">Distribution by category</p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
        {/* Pie Chart */}
        <div className="w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] relative flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryDistribution}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="85%"
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
              <p className="text-xl sm:text-h2 text-foreground font-bold">{total}</p>
              <p className="text-tiny text-muted-foreground">HABITS</p>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 w-full grid grid-cols-2 gap-2 sm:gap-3">
          {categoryDistribution.map((item) => (
            <div key={item.name} className="flex items-center gap-2 min-w-0">
              <div 
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-small text-muted-foreground truncate">{item.name}</span>
              <span className="text-small text-foreground font-medium ml-auto flex-shrink-0">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
