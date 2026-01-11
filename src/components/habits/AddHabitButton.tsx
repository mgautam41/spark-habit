import { Plus } from 'lucide-react';

interface AddHabitButtonProps {
  onClick: () => void;
}

export function AddHabitButton({ onClick }: AddHabitButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fab fixed bottom-24 lg:bottom-8 right-6 z-50"
      aria-label="Add new habit"
    >
      <Plus className="w-7 h-7" />
    </button>
  );
}
