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
    <div className="flex items-center gap-3 p-3 rounded-xl bg-background-tertiary group hover:bg-background-secondary transition-colors">
      <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-5 h-5 text-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-small text-muted-foreground">{label}</p>
        <p className="text-body font-bold text-foreground">{value}</p>
        {subtitle && <p className="text-tiny text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
}

export function DetailedStats() {
  const detailedStats = [
    { 
      icon: Award, 
      label: 'Longest Streak', 
      value: '45 days', 
      subtitle: 'Achieved in Dec 2024',
      color: 'bg-yellow-500/20' 
    },
    { 
      icon: Clock, 
      label: 'Best Time', 
      value: '7:30 AM', 
      subtitle: 'Most productive hour',
      color: 'bg-blue-500/20' 
    },
    { 
      icon: Zap, 
      label: 'Power Habits', 
      value: '3', 
      subtitle: '100% completion rate',
      color: 'bg-purple-500/20' 
    },
    { 
      icon: Target, 
      label: 'Goals Hit', 
      value: '28/30', 
      subtitle: 'This month',
      color: 'bg-health/20' 
    },
    { 
      icon: Calendar, 
      label: 'Perfect Days', 
      value: '18', 
      subtitle: 'All habits completed',
      color: 'bg-primary/20' 
    },
    { 
      icon: TrendingUp, 
      label: 'Improvement', 
      value: '+15%', 
      subtitle: 'vs last month',
      color: 'bg-accent/20' 
    },
    { 
      icon: BarChart3, 
      label: 'Avg. Daily', 
      value: '6.5', 
      subtitle: 'habits completed',
      color: 'bg-cyan-500/20' 
    },
    { 
      icon: CheckCircle2, 
      label: 'Total Done', 
      value: '195', 
      subtitle: 'This month',
      color: 'bg-emerald-500/20' 
    },
  ];

  return (
    <div className="glass-card p-4 sm:p-6 mt-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-foreground">Detailed Statistics</h2>
          <p className="text-small text-muted-foreground">In-depth performance insights</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {detailedStats.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </div>
    </div>
  );
}
