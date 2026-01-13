import { Target, CheckCircle2, Flame, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { WeeklyOverview } from '@/components/dashboard/WeeklyOverview';
import { DetailedStats } from '@/components/dashboard/DetailedStats';
import { PastMonthOverview } from '@/components/dashboard/PastMonthOverview';
import { habits } from '@/data/mockData';

export function Dashboard() {
  const totalHabits = habits.length;
  const completedToday = habits.filter(h => h.completed).length;
  const currentStreak = 23; // Mock value
  const weeklyConsistency = 87; // Mock percentage

  const stats = [
    {
      icon: Target,
      value: totalHabits,
      label: 'Active Habits',
      change: '+2 this month',
    },
    {
      icon: CheckCircle2,
      value: `${completedToday}/${totalHabits}`,
      label: "Today's Progress",
      progress: Math.round((completedToday / totalHabits) * 100),
    },
    {
      icon: Flame,
      value: currentStreak,
      label: 'Day Streak',
      change: '🔥 Personal best!',
    },
    {
      icon: TrendingUp,
      value: `${weeklyConsistency}%`,
      label: 'Last 7 Days',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto pb-28 lg:pb-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-h1 text-foreground">Dashboard</h1>
        <p className="text-body text-muted-foreground mt-1 sm:mt-2">
          Track your progress and stay consistent
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 stagger-children">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
            change={stat.change}
            progress={stat.progress}
            delay={index * 100}
          />
        ))}
      </div>

      {/* Weekly Overview */}
      <WeeklyOverview />

      {/* Detailed Stats */}
      <DetailedStats />

      {/* Past Month Overview */}
      <PastMonthOverview />
    </div>
  );
}
