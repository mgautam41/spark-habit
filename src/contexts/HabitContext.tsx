import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { 
  Habit, 
  HabitNote, 
  habits as initialHabits, 
  habitNotes as initialNotes,
  generateUniqueId,
  Category,
  Frequency,
  Difficulty
} from '@/data/mockData';
import { toast } from 'sonner';

interface HabitFormData {
  name: string;
  category: Category;
  goal: string;
  icon: string;
  color: string;
  frequency: Frequency;
  frequencyDays?: string[];
  frequencyCustomDays?: number;
  reminderEnabled: boolean;
  reminderTime?: string;
  difficulty: Difficulty;
}

interface HabitContextType {
  habits: Habit[];
  archivedHabits: Habit[];
  notes: HabitNote[];
  addHabit: (data: HabitFormData) => Habit;
  updateHabit: (id: number, data: Partial<HabitFormData>) => void;
  deleteHabit: (id: number) => void;
  archiveHabit: (id: number) => void;
  restoreHabit: (id: number) => void;
  toggleHabit: (id: number) => void;
  resetStreak: (id: number) => void;
  reorderHabits: (fromIndex: number, toIndex: number) => void;
  addNote: (habitId: number, content: string, mood?: 'happy' | 'neutral' | 'sad') => void;
  getHabitById: (id: number) => Habit | undefined;
  getNotesByHabitId: (habitId: number) => HabitNote[];
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export function HabitProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>(initialHabits.filter(h => !h.archived));
  const [archivedHabits, setArchivedHabits] = useState<Habit[]>(initialHabits.filter(h => h.archived));
  const [notes, setNotes] = useState<HabitNote[]>(initialNotes);

  const addHabit = useCallback((data: HabitFormData): Habit => {
    const newHabit: Habit = {
      id: generateUniqueId(),
      name: data.name,
      category: data.category,
      goal: data.goal,
      streak: 0,
      longestStreak: 0,
      completed: false,
      completionHistory: [],
      icon: data.icon,
      color: data.color,
      createdAt: new Date().toISOString().split('T')[0],
      notes: '',
      frequency: data.frequency,
      frequencyDays: data.frequencyDays,
      frequencyCustomDays: data.frequencyCustomDays,
      reminderEnabled: data.reminderEnabled,
      reminderTime: data.reminderTime,
      difficulty: data.difficulty,
      archived: false,
      totalCompletions: 0,
    };

    setHabits(prev => [newHabit, ...prev]);
    toast.success('🎉 New habit created!', {
      description: `"${data.name}" has been added to your habits.`
    });
    
    return newHabit;
  }, []);

  const updateHabit = useCallback((id: number, data: Partial<HabitFormData>) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        return { ...habit, ...data };
      }
      return habit;
    }));
    toast.success('Habit updated!');
  }, []);

  const deleteHabit = useCallback((id: number) => {
    const habit = habits.find(h => h.id === id) || archivedHabits.find(h => h.id === id);
    setHabits(prev => prev.filter(h => h.id !== id));
    setArchivedHabits(prev => prev.filter(h => h.id !== id));
    setNotes(prev => prev.filter(n => n.habitId !== id));
    
    if (habit) {
      toast.success('Habit deleted', {
        description: `"${habit.name}" has been permanently removed.`
      });
    }
  }, [habits, archivedHabits]);

  const archiveHabit = useCallback((id: number) => {
    const habit = habits.find(h => h.id === id);
    if (habit) {
      const archivedHabit = { ...habit, archived: true };
      setHabits(prev => prev.filter(h => h.id !== id));
      setArchivedHabits(prev => [archivedHabit, ...prev]);
      toast.success('Habit archived', {
        description: `"${habit.name}" has been moved to archive.`
      });
    }
  }, [habits]);

  const restoreHabit = useCallback((id: number) => {
    const habit = archivedHabits.find(h => h.id === id);
    if (habit) {
      const restoredHabit = { ...habit, archived: false };
      setArchivedHabits(prev => prev.filter(h => h.id !== id));
      setHabits(prev => [restoredHabit, ...prev]);
      toast.success('Habit restored', {
        description: `"${habit.name}" is back in your active habits.`
      });
    }
  }, [archivedHabits]);

  const toggleHabit = useCallback((id: number) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        const newCompleted = !habit.completed;
        const newStreak = newCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1);
        const newLongestStreak = Math.max(habit.longestStreak, newStreak);
        const newTotalCompletions = newCompleted ? habit.totalCompletions + 1 : habit.totalCompletions;
        
        // Update completion history
        const today = new Date().toISOString().split('T')[0];
        const updatedHistory = [...habit.completionHistory];
        const todayEntry = updatedHistory.find(h => h.date === today);
        if (todayEntry) {
          todayEntry.completed = newCompleted;
        } else {
          updatedHistory.push({ date: today, completed: newCompleted });
        }
        
        if (newCompleted) {
          if (newStreak % 7 === 0 && newStreak > 0) {
            toast.success(`🎉 ${newStreak} day streak!`, {
              description: `Amazing! You've completed "${habit.name}" for ${newStreak} days!`
            });
          } else {
            toast.success(`✓ ${habit.name} completed`);
          }
        }
        
        return { 
          ...habit, 
          completed: newCompleted,
          streak: newStreak,
          longestStreak: newLongestStreak,
          totalCompletions: newTotalCompletions,
          completionHistory: updatedHistory
        };
      }
      return habit;
    }));
  }, []);

  const resetStreak = useCallback((id: number) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        toast.info('Streak reset', {
          description: `"${habit.name}" streak has been reset to 0.`
        });
        return { ...habit, streak: 0 };
      }
      return habit;
    }));
  }, []);

  const reorderHabits = useCallback((fromIndex: number, toIndex: number) => {
    setHabits(prev => {
      const newHabits = [...prev];
      const [movedHabit] = newHabits.splice(fromIndex, 1);
      newHabits.splice(toIndex, 0, movedHabit);
      return newHabits;
    });
  }, []);

  const addNote = useCallback((habitId: number, content: string, mood?: 'happy' | 'neutral' | 'sad') => {
    const newNote: HabitNote = {
      id: generateUniqueId(),
      habitId,
      date: new Date().toISOString().split('T')[0],
      content,
      mood,
      timestamp: new Date().toISOString(),
    };
    setNotes(prev => [newNote, ...prev]);
    toast.success('Note added');
  }, []);

  const getHabitById = useCallback((id: number) => {
    return habits.find(h => h.id === id) || archivedHabits.find(h => h.id === id);
  }, [habits, archivedHabits]);

  const getNotesByHabitId = useCallback((habitId: number) => {
    return notes.filter(n => n.habitId === habitId).sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [notes]);

  return (
    <HabitContext.Provider value={{
      habits,
      archivedHabits,
      notes,
      addHabit,
      updateHabit,
      deleteHabit,
      archiveHabit,
      restoreHabit,
      toggleHabit,
      resetStreak,
      reorderHabits,
      addNote,
      getHabitById,
      getNotesByHabitId,
    }}>
      {children}
    </HabitContext.Provider>
  );
}

export function useHabits() {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
}
