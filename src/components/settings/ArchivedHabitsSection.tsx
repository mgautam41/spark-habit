import { Archive, RotateCcw, Trash2 } from 'lucide-react';
import { useHabits } from '@/contexts/HabitContext';
import { useActivity } from '@/contexts/ActivityContext';
import { ArchivedHabitCard } from '@/components/habits/ArchivedHabitCard';
import { DeleteHabitDialog } from '@/components/habits/DeleteHabitDialog';
import { useState } from 'react';

export function ArchivedHabitsSection() {
  const { archivedHabits, restoreHabit, deleteHabit } = useHabits();
  const { addActivity } = useActivity();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<{ id: number; name: string } | null>(null);

  const handleRestore = (id: number) => {
    const habit = archivedHabits.find(h => h.id === id);
    if (habit) {
      restoreHabit(id);
      addActivity('habit_restored', habit.name);
    }
  };

  const handleDeleteClick = (id: number) => {
    const habit = archivedHabits.find(h => h.id === id);
    if (habit) {
      setSelectedHabit({ id, name: habit.name });
      setDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedHabit) {
      deleteHabit(selectedHabit.id);
      addActivity('habit_deleted', selectedHabit.name);
      setDeleteDialogOpen(false);
      setSelectedHabit(null);
    }
  };

  return (
    <section className="stat-card">
      <h2 className="text-h3 text-foreground mb-6 flex items-center gap-2">
        <Archive className="w-5 h-5 text-primary" />
        Archived Habits
        {archivedHabits.length > 0 && (
          <span className="ml-2 px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
            {archivedHabits.length}
          </span>
        )}
      </h2>

      {archivedHabits.length === 0 ? (
        <div className="text-center py-8">
          <Archive className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">No archived habits</p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Archived habits will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {archivedHabits.map((habit) => (
            <ArchivedHabitCard
              key={habit.id}
              habit={habit}
              onRestore={handleRestore}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      {selectedHabit && (
        <DeleteHabitDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          habitName={selectedHabit.name}
          onArchive={() => {}} // Already archived
          onDelete={handleConfirmDelete}
        />
      )}
    </section>
  );
}
