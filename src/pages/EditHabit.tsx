import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { HabitForm, HabitFormData } from '@/components/habits/HabitForm';
import { DeleteHabitDialog } from '@/components/habits/DeleteHabitDialog';
import { useHabits } from '@/contexts/HabitContext';
import { BottomNav } from '@/components/layout/BottomNav';
import { useScrollHide } from '@/hooks/use-scroll-hide';

export function EditHabit() {
  const navigate = useNavigate();
  const { habitId } = useParams();
  const { getHabitById, updateHabit, deleteHabit, archiveHabit, resetStreak } = useHabits();
  const { isVisible } = useScrollHide({ threshold: 10 });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  
  const habit = getHabitById(Number(habitId));

  if (!habit) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Habit not found</p>
          <button
            onClick={() => navigate('/habits')}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = (data: HabitFormData) => {
    updateHabit(habit.id, data);
    navigate('/habits');
  };

  const handleDelete = () => {
    deleteHabit(habit.id);
    navigate('/habits');
  };

  const handleArchive = () => {
    archiveHabit(habit.id);
    navigate('/habits');
  };

  const handleResetStreak = () => {
    resetStreak(habit.id);
  };

  return (
    <>
      <HabitForm
        mode="edit"
        habit={habit}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/habits')}
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
      
      <BottomNav 
        activeTab="habits" 
        onTabChange={(tab) => navigate(`/${tab === 'dashboard' ? '' : tab}`)}
        isVisible={isVisible}
      />
    </>
  );
}
