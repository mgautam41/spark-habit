import { useState } from 'react';
import { format } from 'date-fns';
import { HabitCard } from '@/components/habits/HabitCard';
import { CompletionSummary } from '@/components/habits/CompletionSummary';
import { AddHabitButton } from '@/components/habits/AddHabitButton';
import { habits as initialHabits, Habit } from '@/data/mockData';
import { toast } from 'sonner';

export function Habits() {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const completedCount = habits.filter(h => h.completed).length;
  const totalCount = habits.length;

  const handleToggle = (id: number) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        const newCompleted = !habit.completed;
        const newStreak = newCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1);
        
        // Show toast on completion
        if (newCompleted) {
          if (newStreak % 7 === 0 && newStreak > 0) {
            toast.success(`🎉 ${newStreak} day streak!`, {
              description: `Amazing! You've completed "${habit.name}" for ${newStreak} days!`
            });
          } else {
            toast.success(`✓ ${habit.name} completed`);
          }
        }
        
        return { 
          ...habit, 
          completed: newCompleted,
          streak: newStreak
        };
      }
      return habit;
    }));
  };

  const handleAddHabit = () => {
    toast.info('Add habit feature coming soon!', {
      description: 'This will open a modal to create a new habit.'
    });
  };

  const filteredHabits = habits.filter(habit => {
    if (filter === 'pending') return !habit.completed;
    if (filter === 'completed') return habit.completed;
    return true;
  });

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
  ] as const;

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto pb-40 lg:pb-24">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-h1 text-foreground">Today's Habits</h1>
        <p className="text-body text-muted-foreground mt-2">
          {format(new Date(), 'EEEE, MMMM d')}
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6">
        {filterOptions.map(option => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 rounded-lg text-body font-medium transition-all duration-200 ${
              filter === option.value
                ? 'bg-primary text-primary-foreground'
                : 'bg-background-tertiary text-muted-foreground hover:text-foreground'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Habits List */}
      <div className="space-y-3">
        {filteredHabits.map((habit, index) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggle={handleToggle}
            delay={index * 60}
          />
        ))}
      </div>

      {filteredHabits.length === 0 && (
        <div className="text-center py-16">
          <p className="text-h3 text-muted-foreground">
            {filter === 'pending' ? 'All habits completed! 🎉' : 'No habits found'}
          </p>
        </div>
      )}

      {/* Completion Summary */}
      <CompletionSummary completed={completedCount} total={totalCount} />

      {/* FAB */}
      <AddHabitButton onClick={handleAddHabit} />
    </div>
  );
}
