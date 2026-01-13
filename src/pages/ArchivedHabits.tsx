import { useState } from 'react';
import { ArrowLeft, Archive, Trash2 } from 'lucide-react';
import { useHabits } from '@/contexts/HabitContext';
import { useActivity } from '@/contexts/ActivityContext';
import { ArchivedHabitCard } from '@/components/habits/ArchivedHabitCard';
import { DeleteHabitDialog } from '@/components/habits/DeleteHabitDialog';

interface ArchivedHabitsProps {
  onBack: () => void;
}

export function ArchivedHabits({ onBack }: ArchivedHabitsProps) {
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-secondary/95 backdrop-blur-xl border-b border-card-border">
        <div className="flex items-center justify-between px-4 sm:px-6 h-16">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>
          
          <h1 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Archive className="w-5 h-5 text-primary" />
            Archived Habits
          </h1>
          
          <div className="w-20" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Content */}
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto pb-32">
        {archivedHabits.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-background-tertiary flex items-center justify-center mx-auto mb-4">
              <Archive className="w-10 h-10 text-muted-foreground/30" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">No Archived Habits</h2>
            <p className="text-muted-foreground max-w-sm mx-auto">
              When you archive habits, they'll appear here. You can restore them anytime or delete them permanently.
            </p>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mb-6">
              {archivedHabits.length} archived habit{archivedHabits.length !== 1 ? 's' : ''}
            </p>
            <div className="space-y-3">
              {archivedHabits.map((habit, index) => (
                <div 
                  key={habit.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ArchivedHabitCard
                    habit={habit}
                    onRestore={handleRestore}
                    onDelete={handleDeleteClick}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {selectedHabit && (
        <DeleteHabitDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          habitName={selectedHabit.name}
          onArchive={() => {}}
          onDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
}
