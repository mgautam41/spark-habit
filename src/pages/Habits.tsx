import { useState } from 'react';
import { format } from 'date-fns';
import { DraggableHabitCard } from '@/components/habits/DraggableHabitCard';
import { CompletionSummary } from '@/components/habits/CompletionSummary';
import { AddHabitButton } from '@/components/habits/AddHabitButton';
import { useHabits } from '@/contexts/HabitContext';
import { useActivity } from '@/contexts/ActivityContext';

interface HabitsProps {
  onCreateHabit: () => void;
  onEditHabit: (habitId: number) => void;
}

export function Habits({ onCreateHabit, onEditHabit }: HabitsProps) {
  const { habits, toggleHabit, reorderHabits } = useHabits();
  const { addActivity } = useActivity();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const completedCount = habits.filter(h => h.completed).length;
  const totalCount = habits.length;

  const handleToggle = (id: number) => {
    const habit = habits.find(h => h.id === id);
    if (habit) {
      toggleHabit(id);
      addActivity(
        habit.completed ? 'habit_uncompleted' : 'habit_completed',
        habit.name
      );
    }
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      reorderHabits(index, index - 1);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < filteredHabits.length - 1) {
      reorderHabits(index, index + 1);
    }
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
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1200px] mx-auto pb-36 lg:pb-24">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-h1 text-foreground">Today's Habits</h1>
        <p className="text-body text-muted-foreground mt-1 sm:mt-2">
          {format(new Date(), 'EEEE, MMMM d')}
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4 sm:mb-6 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
        {filterOptions.map(option => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-small sm:text-body font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
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
      <div className="space-y-2 sm:space-y-3">
        {filteredHabits.map((habit, index) => (
          <DraggableHabitCard
            key={habit.id}
            habit={habit}
            index={index}
            totalCount={filteredHabits.length}
            onToggle={handleToggle}
            onEdit={() => onEditHabit(habit.id)}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            delay={index * 60}
          />
        ))}
      </div>

      {filteredHabits.length === 0 && (
        <div className="text-center py-12 sm:py-16">
          <p className="text-lg sm:text-h3 text-muted-foreground">
            {filter === 'pending' ? 'All habits completed! 🎉' : 'No habits found'}
          </p>
        </div>
      )}

      {/* Completion Summary */}
      <CompletionSummary completed={completedCount} total={totalCount} />

      {/* FAB */}
      <AddHabitButton onClick={onCreateHabit} />
    </div>
  );
}
