import { 
  Award, 
  Clock, 
  Zap, 
  Target, 
  Calendar,
  TrendingUp,
  BarChart3,
  CheckCircle2
} from 'lucide-react';

interface StatItemProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  subtitle?: string;
  color: string;
}

function StatItem({ icon: Icon, label, value, subtitle, color }: StatItemProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-background-tertiary group hover:bg-background-secondary transition-colors">
      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-body sm:text-lg font-bold text-foreground leading-tight">{value}</p>
        <p className="text-tiny sm:text-small text-muted-foreground truncate">{label}</p>
      </div>
    </div>
  );
}

export function DetailedStats() {
  const detailedStats = [
    { icon: Award, label: 'Longest Streak', value: '45d', color: 'bg-yellow-500/20' },
    { icon: Clock, label: 'Best Time', value: '7:30 AM', color: 'bg-blue-500/20' },
    { icon: Zap, label: 'Power Habits', value: '3', color: 'bg-purple-500/20' },
    { icon: Target, label: 'Goals Hit', value: '28/30', color: 'bg-health/20' },
    { icon: Calendar, label: 'Perfect Days', value: '18', color: 'bg-primary/20' },
    { icon: TrendingUp, label: 'Improvement', value: '+15%', color: 'bg-accent/20' },
    { icon: BarChart3, label: 'Avg. Daily', value: '6.5', color: 'bg-cyan-500/20' },
    { icon: CheckCircle2, label: 'Total Done', value: '195', color: 'bg-emerald-500/20' },
  ];

  return (
    <div className="glass-card p-4 sm:p-6 mt-4 sm:mt-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/20 flex items-center justify-center">
          <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-foreground">Detailed Statistics</h2>
          <p className="text-tiny sm:text-small text-muted-foreground">Performance insights</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
        {detailedStats.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
}
