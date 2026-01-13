import { useState } from 'react';
import { HabitForm, HabitFormData } from '@/components/habits/HabitForm';
import { DeleteHabitDialog } from '@/components/habits/DeleteHabitDialog';
import { useHabits } from '@/contexts/HabitContext';

interface EditHabitProps {
  habitId: number;
  onBack: () => void;
}

export function EditHabit({ habitId, onBack }: EditHabitProps) {
  const { getHabitById, updateHabit, deleteHabit, archiveHabit, resetStreak } = useHabits();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const habit = getHabitById(habitId);

  if (!habit) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Habit not found</p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (data: HabitFormData) => {
    updateHabit(habitId, data);
    onBack();
  };

  const handleDelete = () => {
    deleteHabit(habitId);
    onBack();
  };

  const handleArchive = () => {
    archiveHabit(habitId);
    onBack();
  };

  const handleResetStreak = () => {
    resetStreak(habitId);
  };

  return (
    <>
      <HabitForm
        mode="edit"
        habit={habit}
        onSubmit={handleSubmit}
        onCancel={onBack}
        onDelete={() => setShowDeleteDialog(true)}
        onArchive={handleArchive}
        onResetStreak={handleResetStreak}
      />
      
      <DeleteHabitDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        habitName={habit.name}
        onArchive={handleArchive}
        onDelete={handleDelete}
      />
    </>
  );
}
