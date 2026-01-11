export type Category = 'Health' | 'Learning' | 'Mind' | 'Fitness' | 'Productivity' | 'Social';
export type Frequency = 'daily' | 'weekly' | 'custom';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface CompletionEntry {
  date: string;
  completed: boolean;
  note?: string;
}

export interface Habit {
  id: number;
  name: string;
  category: Category;
  goal: string;
  streak: number;
  longestStreak: number;
  completed: boolean;
  completionHistory: CompletionEntry[];
  icon: string;
  color: string;
  createdAt: string;
  notes: string;
  frequency: Frequency;
  frequencyDays?: string[]; // For weekly frequency
  frequencyCustomDays?: number; // For custom (every X days)
  reminderEnabled: boolean;
  reminderTime?: string;
  difficulty: Difficulty;
  archived: boolean;
  totalCompletions: number;
}

export interface HabitNote {
  id: number;
  habitId: number;
  date: string;
  content: string;
  mood?: 'happy' | 'neutral' | 'sad';
  timestamp: string;
}

export interface DailyLog {
  date: string;
  habitsCompleted: number[];
  totalHabits: number;
  completionRate: number;
  notes: string;
}

export interface Achievement {
  id: number;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  unlockedDate?: string;
  progress?: number;
  target?: number;
}

export interface HabitTemplate {
  id: number;
  name: string;
  category: Category;
  description: string;
  icon: string;
  frequency: Frequency;
  difficulty: Difficulty;
  suggestedTime?: string;
  color: string;
}

export interface UserProfile {
  name: string;
  avatar: string;
  joinDate: string;
  totalCompletions: number;
  longestStreak: number;
  currentStreak: number;
  achievementIds: number[];
}

export const categoryColors: Record<Category, string> = {
  Health: 'category-health',
  Learning: 'category-learning',
  Mind: 'category-mind',
  Fitness: 'category-fitness',
  Productivity: 'category-productivity',
  Social: 'category-social',
};

export const categoryColorsHex: Record<Category, string> = {
  Health: '#22c55e',
  Learning: '#3b82f6',
  Mind: '#a78bfa',
  Fitness: '#f97316',
  Productivity: '#06b6d4',
  Social: '#ec4899',
};

export const allIcons = [
  'BookOpen', 'Brain', 'Droplets', 'Footprints', 'Smartphone', 'Phone', 
  'Code', 'PersonStanding', 'PenLine', 'Apple', 'Languages', 'TreePine',
  'Heart', 'Dumbbell', 'Moon', 'Sun', 'Coffee', 'Music', 'Camera', 'Palette',
  'Target', 'Zap', 'Star', 'Flame', 'Trophy', 'Medal', 'Gift', 'Smile',
  'Clock', 'Alarm', 'BedDouble', 'Bike', 'Car', 'Plane', 'Home', 'Building',
];

// Generate 90 days of mock completion history
const generateCompletionHistory = (streak: number, longestStreak: number): CompletionEntry[] => {
  const history: CompletionEntry[] = [];
  const today = new Date();
  
  for (let i = 89; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Generate realistic completion pattern
    let completed = false;
    if (i < streak) {
      completed = true;
    } else if (i < 30) {
      completed = Math.random() > 0.3;
    } else {
      completed = Math.random() > 0.4;
    }
    
    history.push({
      date: dateStr,
      completed,
      note: completed && Math.random() > 0.7 ? 'Felt great today!' : undefined
    });
  }
  
  return history;
};

export const habits: Habit[] = [
  {
    id: 1,
    name: 'Read 20 Pages',
    category: 'Learning',
    goal: 'Read at least 20 pages of a book every day',
    streak: 23,
    longestStreak: 45,
    completed: true,
    completionHistory: generateCompletionHistory(23, 45),
    icon: 'BookOpen',
    color: '#3b82f6',
    createdAt: '2024-12-01',
    notes: 'Currently reading Atomic Habits',
    frequency: 'daily',
    reminderEnabled: true,
    reminderTime: '21:00',
    difficulty: 'easy',
    archived: false,
    totalCompletions: 156,
  },
  {
    id: 2,
    name: 'Meditate 10 min',
    category: 'Mind',
    goal: 'Practice mindfulness meditation for 10 minutes',
    streak: 15,
    longestStreak: 30,
    completed: false,
    completionHistory: generateCompletionHistory(15, 30),
    icon: 'Brain',
    color: '#a78bfa',
    createdAt: '2024-11-15',
    notes: 'Using Headspace app',
    frequency: 'daily',
    reminderEnabled: true,
    reminderTime: '07:00',
    difficulty: 'easy',
    archived: false,
    totalCompletions: 89,
  },
  {
    id: 3,
    name: 'Drink 3L Water',
    category: 'Health',
    goal: 'Stay hydrated with 3 liters of water daily',
    streak: 45,
    longestStreak: 45,
    completed: true,
    completionHistory: generateCompletionHistory(45, 45),
    icon: 'Droplets',
    color: '#22c55e',
    createdAt: '2024-10-01',
    notes: 'Track with water bottle markings',
    frequency: 'daily',
    reminderEnabled: false,
    difficulty: 'easy',
    archived: false,
    totalCompletions: 203,
  },
  {
    id: 4,
    name: 'Morning Run 5K',
    category: 'Fitness',
    goal: 'Complete a 5 kilometer run before 8 AM',
    streak: 8,
    longestStreak: 21,
    completed: true,
    completionHistory: generateCompletionHistory(8, 21),
    icon: 'Footprints',
    color: '#f97316',
    createdAt: '2024-12-15',
    notes: 'Training for half marathon',
    frequency: 'daily',
    reminderEnabled: true,
    reminderTime: '06:00',
    difficulty: 'hard',
    archived: false,
    totalCompletions: 67,
  },
  {
    id: 5,
    name: 'No Social Media',
    category: 'Productivity',
    goal: 'Avoid social media until after 6 PM',
    streak: 12,
    longestStreak: 20,
    completed: false,
    completionHistory: generateCompletionHistory(12, 20),
    icon: 'Smartphone',
    color: '#06b6d4',
    createdAt: '2024-12-10',
    notes: 'Use app blocker for enforcement',
    frequency: 'daily',
    reminderEnabled: false,
    difficulty: 'medium',
    archived: false,
    totalCompletions: 54,
  },
  {
    id: 6,
    name: 'Call Family',
    category: 'Social',
    goal: 'Call a family member to check in',
    streak: 5,
    longestStreak: 14,
    completed: true,
    completionHistory: generateCompletionHistory(5, 14),
    icon: 'Phone',
    color: '#ec4899',
    createdAt: '2024-12-20',
    notes: 'Rotate between mom, dad, sister',
    frequency: 'weekly',
    frequencyDays: ['Sun', 'Wed'],
    reminderEnabled: true,
    reminderTime: '18:00',
    difficulty: 'easy',
    archived: false,
    totalCompletions: 28,
  },
  {
    id: 7,
    name: 'Code 1 Hour',
    category: 'Learning',
    goal: 'Practice coding for at least 1 hour',
    streak: 30,
    longestStreak: 60,
    completed: true,
    completionHistory: generateCompletionHistory(30, 60),
    icon: 'Code',
    color: '#3b82f6',
    createdAt: '2024-09-01',
    notes: 'Working on side project',
    frequency: 'daily',
    reminderEnabled: true,
    reminderTime: '20:00',
    difficulty: 'medium',
    archived: false,
    totalCompletions: 245,
  },
  {
    id: 8,
    name: 'Stretch 15 min',
    category: 'Fitness',
    goal: 'Complete 15 minutes of stretching',
    streak: 18,
    longestStreak: 25,
    completed: false,
    completionHistory: generateCompletionHistory(18, 25),
    icon: 'PersonStanding',
    color: '#f97316',
    createdAt: '2024-11-20',
    notes: 'Focus on hip flexors',
    frequency: 'daily',
    reminderEnabled: true,
    reminderTime: '22:00',
    difficulty: 'easy',
    archived: false,
    totalCompletions: 112,
  },
  {
    id: 9,
    name: 'Journal Entry',
    category: 'Mind',
    goal: 'Write a journal entry reflecting on the day',
    streak: 10,
    longestStreak: 22,
    completed: true,
    completionHistory: generateCompletionHistory(10, 22),
    icon: 'PenLine',
    color: '#a78bfa',
    createdAt: '2024-12-05',
    notes: 'Gratitude and goals',
    frequency: 'daily',
    reminderEnabled: true,
    reminderTime: '21:30',
    difficulty: 'easy',
    archived: false,
    totalCompletions: 78,
  },
  {
    id: 10,
    name: 'Healthy Breakfast',
    category: 'Health',
    goal: 'Eat a nutritious breakfast with protein',
    streak: 28,
    longestStreak: 35,
    completed: true,
    completionHistory: generateCompletionHistory(28, 35),
    icon: 'Apple',
    color: '#22c55e',
    createdAt: '2024-11-01',
    notes: 'Prep overnight oats',
    frequency: 'daily',
    reminderEnabled: false,
    difficulty: 'easy',
    archived: false,
    totalCompletions: 167,
  },
  {
    id: 11,
    name: 'Learn Language',
    category: 'Learning',
    goal: 'Practice Duolingo for 15 minutes',
    streak: 67,
    longestStreak: 67,
    completed: true,
    completionHistory: generateCompletionHistory(67, 67),
    icon: 'Languages',
    color: '#3b82f6',
    createdAt: '2024-08-01',
    notes: 'Learning Spanish',
    frequency: 'daily',
    reminderEnabled: true,
    reminderTime: '12:00',
    difficulty: 'easy',
    archived: false,
    totalCompletions: 312,
  },
  {
    id: 12,
    name: 'Evening Walk',
    category: 'Fitness',
    goal: 'Take a 20-minute walk after dinner',
    streak: 3,
    longestStreak: 15,
    completed: false,
    completionHistory: generateCompletionHistory(3, 15),
    icon: 'TreePine',
    color: '#f97316',
    createdAt: '2024-12-25',
    notes: 'Great for digestion',
    frequency: 'daily',
    reminderEnabled: true,
    reminderTime: '19:30',
    difficulty: 'easy',
    archived: false,
    totalCompletions: 45,
  },
];

export const habitTemplates: HabitTemplate[] = [
  { id: 1, name: 'Morning Run', category: 'Fitness', description: 'Start your day with a refreshing run', icon: 'Footprints', frequency: 'daily', difficulty: 'medium', suggestedTime: '06:00', color: '#f97316' },
  { id: 2, name: 'Read 20 Pages', category: 'Learning', description: 'Expand your knowledge with daily reading', icon: 'BookOpen', frequency: 'daily', difficulty: 'easy', suggestedTime: '21:00', color: '#3b82f6' },
  { id: 3, name: 'Drink 3L Water', category: 'Health', description: 'Stay hydrated throughout the day', icon: 'Droplets', frequency: 'daily', difficulty: 'easy', color: '#22c55e' },
  { id: 4, name: 'Meditate 10min', category: 'Mind', description: 'Clear your mind with meditation', icon: 'Brain', frequency: 'daily', difficulty: 'easy', suggestedTime: '07:00', color: '#a78bfa' },
  { id: 5, name: 'Code 1 Hour', category: 'Learning', description: 'Improve your coding skills daily', icon: 'Code', frequency: 'daily', difficulty: 'medium', suggestedTime: '20:00', color: '#3b82f6' },
  { id: 6, name: 'Healthy Breakfast', category: 'Health', description: 'Start your day with nutrition', icon: 'Apple', frequency: 'daily', difficulty: 'easy', color: '#22c55e' },
  { id: 7, name: 'Journal Entry', category: 'Mind', description: 'Reflect on your day through writing', icon: 'PenLine', frequency: 'daily', difficulty: 'easy', suggestedTime: '21:30', color: '#a78bfa' },
  { id: 8, name: 'No Social Media', category: 'Productivity', description: 'Stay focused by avoiding social media', icon: 'Smartphone', frequency: 'daily', difficulty: 'hard', color: '#06b6d4' },
  { id: 9, name: 'Call Family', category: 'Social', description: 'Stay connected with loved ones', icon: 'Phone', frequency: 'weekly', difficulty: 'easy', suggestedTime: '18:00', color: '#ec4899' },
  { id: 10, name: 'Sleep by 10 PM', category: 'Health', description: 'Get quality rest with early sleep', icon: 'Moon', frequency: 'daily', difficulty: 'medium', color: '#22c55e' },
  { id: 11, name: 'Creative Time', category: 'Learning', description: 'Express yourself through creativity', icon: 'Palette', frequency: 'daily', difficulty: 'easy', color: '#3b82f6' },
  { id: 12, name: 'Workout 30min', category: 'Fitness', description: 'Get your body moving with exercise', icon: 'Dumbbell', frequency: 'daily', difficulty: 'medium', suggestedTime: '17:00', color: '#f97316' },
  { id: 13, name: 'Clean Room', category: 'Productivity', description: 'Keep your space organized', icon: 'Home', frequency: 'weekly', difficulty: 'easy', color: '#06b6d4' },
  { id: 14, name: 'Plan Tomorrow', category: 'Productivity', description: 'Prepare for a productive day ahead', icon: 'Target', frequency: 'daily', difficulty: 'easy', suggestedTime: '21:00', color: '#06b6d4' },
  { id: 15, name: 'Gratitude Practice', category: 'Mind', description: 'Appreciate the good in your life', icon: 'Heart', frequency: 'daily', difficulty: 'easy', color: '#a78bfa' },
  { id: 16, name: 'Evening Walk', category: 'Fitness', description: 'Wind down with a peaceful walk', icon: 'TreePine', frequency: 'daily', difficulty: 'easy', suggestedTime: '19:00', color: '#f97316' },
  { id: 17, name: 'Learn Language', category: 'Learning', description: 'Master a new language step by step', icon: 'Languages', frequency: 'daily', difficulty: 'medium', color: '#3b82f6' },
  { id: 18, name: 'No Caffeine After 2PM', category: 'Health', description: 'Improve sleep quality naturally', icon: 'Coffee', frequency: 'daily', difficulty: 'medium', color: '#22c55e' },
  { id: 19, name: 'Practice Instrument', category: 'Learning', description: 'Develop your musical skills', icon: 'Music', frequency: 'daily', difficulty: 'medium', color: '#3b82f6' },
  { id: 20, name: 'Stretch 15min', category: 'Fitness', description: 'Stay flexible and prevent injury', icon: 'PersonStanding', frequency: 'daily', difficulty: 'easy', suggestedTime: '22:00', color: '#f97316' },
];

export const achievements: Achievement[] = [
  { id: 1, name: 'First Flame', description: 'Complete your first habit', icon: '🔥', rarity: 'common', unlocked: true, unlockedDate: '2024-09-01' },
  { id: 2, name: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '⚔️', rarity: 'common', unlocked: true, unlockedDate: '2024-09-08' },
  { id: 3, name: 'Month Master', description: 'Maintain a 30-day streak', icon: '🏆', rarity: 'rare', unlocked: true, unlockedDate: '2024-10-01' },
  { id: 4, name: 'Century Club', description: 'Maintain a 100-day streak', icon: '💯', rarity: 'epic', unlocked: false, progress: 67, target: 100 },
  { id: 5, name: 'First Step', description: 'Complete 1 habit', icon: '👣', rarity: 'common', unlocked: true, unlockedDate: '2024-09-01' },
  { id: 6, name: 'Perfect Day', description: 'Complete all habits in a day', icon: '⭐', rarity: 'common', unlocked: true, unlockedDate: '2024-09-15' },
  { id: 7, name: 'Perfect Week', description: 'Complete all habits for 7 days', icon: '🌟', rarity: 'rare', unlocked: true, unlockedDate: '2024-10-15' },
  { id: 8, name: 'Centurion', description: 'Complete 100 total habits', icon: '🎖️', rarity: 'rare', unlocked: true, unlockedDate: '2024-10-20' },
  { id: 9, name: 'Millennium', description: 'Complete 1000 total habits', icon: '👑', rarity: 'legendary', unlocked: false, progress: 1556, target: 1000 },
  { id: 10, name: 'Fitness Fanatic', description: 'Complete 30 fitness habits', icon: '💪', rarity: 'rare', unlocked: true, unlockedDate: '2024-11-01' },
  { id: 11, name: 'Brain Booster', description: 'Complete 30 learning habits', icon: '🧠', rarity: 'rare', unlocked: true, unlockedDate: '2024-11-15' },
  { id: 12, name: 'Zen Master', description: 'Complete 30 mind habits', icon: '🧘', rarity: 'rare', unlocked: false, progress: 22, target: 30 },
  { id: 13, name: 'Early Bird', description: 'Complete a habit before 6 AM', icon: '🌅', rarity: 'common', unlocked: true, unlockedDate: '2024-09-05' },
  { id: 14, name: 'Night Owl', description: 'Complete a habit after 10 PM', icon: '🌙', rarity: 'common', unlocked: true, unlockedDate: '2024-09-10' },
  { id: 15, name: 'Perfectionist', description: '100% completion for 30 days', icon: '🎯', rarity: 'legendary', unlocked: false, progress: 12, target: 30 },
  { id: 16, name: 'Comeback Kid', description: 'Restart after a 7-day break', icon: '🚀', rarity: 'rare', unlocked: false },
];

export const habitNotes: HabitNote[] = [
  { id: 1, habitId: 1, date: '2026-01-11', content: 'Finished chapter 5, great insights on habit loops!', mood: 'happy', timestamp: '2026-01-11T21:30:00' },
  { id: 2, habitId: 1, date: '2026-01-10', content: 'Read on the commute today', mood: 'neutral', timestamp: '2026-01-10T09:15:00' },
  { id: 3, habitId: 2, date: '2026-01-11', content: 'Felt very calm after session', mood: 'happy', timestamp: '2026-01-11T07:15:00' },
  { id: 4, habitId: 4, date: '2026-01-11', content: 'New personal best! 5K in 24 minutes', mood: 'happy', timestamp: '2026-01-11T06:30:00' },
  { id: 5, habitId: 7, date: '2026-01-10', content: 'Fixed that tricky bug finally!', mood: 'happy', timestamp: '2026-01-10T21:00:00' },
];

export const userProfile: UserProfile = {
  name: 'Jamie Doe',
  avatar: 'JD',
  joinDate: '2024-09-01',
  totalCompletions: 1556,
  longestStreak: 67,
  currentStreak: 23,
  achievementIds: [1, 2, 3, 5, 6, 7, 8, 10, 11, 13, 14],
};

export const weeklyData = [
  { day: 'Mon', completed: 10, total: 12, percentage: 83 },
  { day: 'Tue', completed: 11, total: 12, percentage: 92 },
  { day: 'Wed', completed: 9, total: 12, percentage: 75 },
  { day: 'Thu', completed: 12, total: 12, percentage: 100 },
  { day: 'Fri', completed: 8, total: 12, percentage: 67 },
  { day: 'Sat', completed: 10, total: 12, percentage: 83 },
  { day: 'Sun', completed: 8, total: 12, percentage: 67 },
];

export const monthlyTrend = [
  { date: 'Dec 1', habits: 8 },
  { date: 'Dec 5', habits: 9 },
  { date: 'Dec 10', habits: 10 },
  { date: 'Dec 15', habits: 9 },
  { date: 'Dec 20', habits: 11 },
  { date: 'Dec 25', habits: 10 },
  { date: 'Jan 1', habits: 11 },
  { date: 'Jan 5', habits: 12 },
  { date: 'Jan 10', habits: 10 },
  { date: 'Jan 11', habits: 8 },
];

export const categoryDistribution = [
  { name: 'Health', value: 2, color: '#22c55e' },
  { name: 'Learning', value: 3, color: '#3b82f6' },
  { name: 'Mind', value: 2, color: '#a78bfa' },
  { name: 'Fitness', value: 3, color: '#f97316' },
  { name: 'Productivity', value: 1, color: '#06b6d4' },
  { name: 'Social', value: 1, color: '#ec4899' },
];

export const motivationalQuotes = [
  "Small steps every day lead to big changes",
  "Progress, not perfection",
  "You're building a better tomorrow",
  "Consistency is your superpower",
  "Every day is a fresh start",
  "Your future self will thank you",
  "Habits shape your destiny",
  "The secret of your future is hidden in your daily routine",
  "Success is the sum of small efforts repeated day in and day out",
  "What you do every day matters more than what you do once in a while",
  "Champions keep playing until they get it right",
  "Excellence is not an act, but a habit",
  "Motivation gets you started, habit keeps you going",
  "The only bad workout is the one that didn't happen",
  "Don't watch the clock; do what it does. Keep going",
];

export const getRandomQuote = () => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  return motivationalQuotes[dayOfYear % motivationalQuotes.length];
};

export const generateUniqueId = () => Date.now() + Math.floor(Math.random() * 1000);
