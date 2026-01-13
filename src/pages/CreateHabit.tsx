import { HabitForm, HabitFormData } from '@/components/habits/HabitForm';
import { useHabits } from '@/contexts/HabitContext';

interface CreateHabitProps {
  onBack: () => void;
}

export function CreateHabit({ onBack }: CreateHabitProps) {
  const { addHabit } = useHabits();

  const handleSubmit = (data: HabitFormData) => {
    addHabit(data);
    onBack();
  };

  return (
    <HabitForm
      mode="create"
      onSubmit={handleSubmit}
      onCancel={onBack}
    />
  );
}
