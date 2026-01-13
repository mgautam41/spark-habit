import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddHabitButtonProps {
  onClick: () => void;
  isVisible?: boolean;
}

export function AddHabitButton({ onClick, isVisible = true }: AddHabitButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "fab fixed right-4 sm:right-6 z-40",
        "transition-all duration-300 ease-out will-change-transform",
        isVisible 
          ? "bottom-20 sm:bottom-24 lg:bottom-8" 
          : "bottom-4 lg:bottom-8"
      )}
      aria-label="Add new habit"
    >
      <Plus className="w-6 h-6 sm:w-7 sm:h-7" />
    </button>
  );
}
