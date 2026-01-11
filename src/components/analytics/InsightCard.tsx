import { Trophy, AlertCircle, Flame, Calendar, Lightbulb } from 'lucide-react';

const insights = [
  {
    icon: Trophy,
    title: 'Best Performing Habit',
    value: 'Read 20 Pages',
    detail: '97% last month',
    color: 'text-warning',
    bgColor: 'bg-warning/20',
  },
  {
    icon: AlertCircle,
    title: 'Needs Attention',
    value: 'Meditate 10 min',
    detail: '43% last month',
    color: 'text-danger',
    bgColor: 'bg-danger/20',
  },
  {
    icon: Flame,
    title: 'Longest Streak',
    value: 'Learn Language',
    detail: '67 days',
    color: 'text-category-fitness',
    bgColor: 'bg-category-fitness/20',
  },
  {
    icon: Calendar,
    title: 'Most Missed Day',
    value: 'Sunday',
    detail: '52% avg completion',
    color: 'text-info',
    bgColor: 'bg-info/20',
  },
];

const aiInsights = [
  "You're 23% more consistent on weekdays",
  "Morning habits have 89% completion rate",
  "You've built 3 new habits this month",
];

export function InsightCards() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div 
              key={insight.title}
              className="stat-card animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl ${insight.bgColor} flex items-center justify-center mb-2 sm:mb-3`}>
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${insight.color}`} />
              </div>
              <p className="text-[10px] sm:text-tiny text-muted-foreground uppercase truncate">{insight.title}</p>
              <p className="text-small sm:text-body font-semibold text-foreground mt-0.5 sm:mt-1 truncate">{insight.value}</p>
              <p className="text-small text-muted-foreground truncate">{insight.detail}</p>
            </div>
          );
        })}
      </div>

      {/* AI Insights */}
      <div className="stat-card bg-gradient-to-br from-card to-background-tertiary">
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
          </div>
          <h3 className="text-lg sm:text-h3 text-foreground">Insights</h3>
        </div>
        <ul className="space-y-2 sm:space-y-3">
          {aiInsights.map((insight, index) => (
            <li 
              key={index}
              className="flex items-start sm:items-center gap-2 sm:gap-3 text-small sm:text-body text-muted-foreground animate-fade-in-up"
              style={{ animationDelay: `${(index + 4) * 100}ms` }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-1.5 sm:mt-0" />
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
