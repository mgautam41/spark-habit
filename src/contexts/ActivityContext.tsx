import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { generateUniqueId } from '@/data/mockData';

export type ActivityType = 
  | 'habit_created'
  | 'habit_completed'
  | 'habit_uncompleted'
  | 'habit_updated'
  | 'habit_deleted'
  | 'habit_archived'
  | 'habit_restored'
  | 'streak_milestone'
  | 'streak_reset';

export interface Activity {
  id: number;
  type: ActivityType;
  habitName: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface ActivityContextType {
  activities: Activity[];
  unreadCount: number;
  addActivity: (type: ActivityType, habitName: string, customMessage?: string) => void;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
  clearActivities: () => void;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

const getActivityMessage = (type: ActivityType, habitName: string): string => {
  switch (type) {
    case 'habit_created':
      return `Created new habit "${habitName}"`;
    case 'habit_completed':
      return `Completed "${habitName}" ✓`;
    case 'habit_uncompleted':
      return `Marked "${habitName}" as incomplete`;
    case 'habit_updated':
      return `Updated "${habitName}"`;
    case 'habit_deleted':
      return `Deleted "${habitName}" permanently`;
    case 'habit_archived':
      return `Archived "${habitName}"`;
    case 'habit_restored':
      return `Restored "${habitName}" from archive`;
    case 'streak_milestone':
      return `🎉 Reached a streak milestone on "${habitName}"!`;
    case 'streak_reset':
      return `Reset streak for "${habitName}"`;
    default:
      return `Activity on "${habitName}"`;
  }
};

export function ActivityProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>([]);

  const addActivity = useCallback((type: ActivityType, habitName: string, customMessage?: string) => {
    const newActivity: Activity = {
      id: generateUniqueId(),
      type,
      habitName,
      message: customMessage || getActivityMessage(type, habitName),
      timestamp: new Date().toISOString(),
      read: false,
    };
    setActivities(prev => [newActivity, ...prev].slice(0, 50)); // Keep last 50 activities
  }, []);

  const markAsRead = useCallback((id: number) => {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  }, []);

  const markAllAsRead = useCallback(() => {
    setActivities(prev => prev.map(a => ({ ...a, read: true })));
  }, []);

  const clearActivities = useCallback(() => {
    setActivities([]);
  }, []);

  const unreadCount = activities.filter(a => !a.read).length;

  return (
    <ActivityContext.Provider value={{
      activities,
      unreadCount,
      addActivity,
      markAsRead,
      markAllAsRead,
      clearActivities,
    }}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
}
