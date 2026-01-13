import { useNavigate } from 'react-router-dom';
import { HabitForm, HabitFormData } from '@/components/habits/HabitForm';
import { useHabits } from '@/contexts/HabitContext';
import { BottomNav } from '@/components/layout/BottomNav';
import { useScrollHide } from '@/hooks/use-scroll-hide';

export function CreateHabit() {
  const navigate = useNavigate();
  const { addHabit } = useHabits();
  const { isVisible } = useScrollHide({ threshold: 10 });

  const handleSubmit = (data: HabitFormData) => {
    addHabit(data);
    navigate('/habits');
  };

  return (
    <>
      <HabitForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={() => navigate('/habits')}
      />
      <BottomNav 
        activeTab="habits" 
        onTabChange={(tab) => navigate(`/${tab === 'dashboard' ? '' : tab}`)}
        isVisible={isVisible}
      />
    </>
  );
}
