import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Archive } from 'lucide-react';
import { useHabits } from '@/contexts/HabitContext';
import { useActivity } from '@/contexts/ActivityContext';
import { ArchivedHabitCard } from '@/components/habits/ArchivedHabitCard';
import { DeleteHabitDialog } from '@/components/habits/DeleteHabitDialog';
import { BottomNav } from '@/components/layout/BottomNav';
import { useScrollHide } from '@/hooks/use-scroll-hide';

export function ArchivedHabits() {
  const navigate = useNavigate();
  const { archivedHabits, restoreHabit, deleteHabit } = useHabits();
  const { addActivity } = useActivity();
  const { isVisible } = useScrollHide({ threshold: 10 });
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
        <div className="flex items-center justify-between px-4 sm:px-6 h-14 max-w-2xl mx-auto">
          <button
            onClick={() => navigate('/settings')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>
          
          <h1 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
            <Archive className="w-5 h-5 text-primary" />
            Archived Habits
          </h1>
          
          <div className="w-16 sm:w-20" />
        </div>
      </header>

      {/* Content */}
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto pb-28 lg:pb-8">
        {archivedHabits.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-background-tertiary flex items-center justify-center mx-auto mb-4">
              <Archive className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground/30" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2">No Archived Habits</h2>
            <p className="text-small sm:text-body text-muted-foreground max-w-sm mx-auto">
              When you archive habits, they'll appear here. You can restore them anytime.
            </p>
          </div>
        ) : (
          <>
            <p className="text-small sm:text-body text-muted-foreground mb-4 sm:mb-6">
              {archivedHabits.length} archived habit{archivedHabits.length !== 1 ? 's' : ''}
            </p>
            <div className="space-y-2 sm:space-y-3">
              {archivedHabits.map((habit, index) => (
                <div 
                  key={habit.id}
                  className="animate-fade-in"
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
      
      <BottomNav 
        activeTab="settings" 
        onTabChange={(tab) => navigate(`/${tab === 'dashboard' ? '' : tab}`)}
        isVisible={isVisible}
      />
    </div>
  );
}
