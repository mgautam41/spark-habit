export type Category = 'Health' | 'Learning' | 'Mind' | 'Fitness' | 'Productivity' | 'Social';

export interface Habit {
  id: number;
  name: string;
  category: Category;
  goal: string;
  streak: number;
  longestStreak: number;
  completed: boolean;
  completionHistory: { date: string; completed: boolean }[];
  icon: string;
  createdAt: string;
  notes: string;
}

export interface DailyLog {
  date: string;
  habitsCompleted: number[];
  totalHabits: number;
  completionRate: number;
  notes: string;
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

export const habits: Habit[] = [
  {
    id: 1,
    name: 'Read 20 Pages',
    category: 'Learning',
    goal: 'Read at least 20 pages of a book every day',
    streak: 23,
    longestStreak: 45,
    completed: true,
    completionHistory: [],
    icon: 'BookOpen',
    createdAt: '2024-12-01',
    notes: 'Currently reading Atomic Habits',
  },
  {
    id: 2,
    name: 'Meditate 10 min',
    category: 'Mind',
    goal: 'Practice mindfulness meditation for 10 minutes',
    streak: 15,
    longestStreak: 30,
    completed: false,
    completionHistory: [],
    icon: 'Brain',
    createdAt: '2024-11-15',
    notes: 'Using Headspace app',
  },
  {
    id: 3,
    name: 'Drink 3L Water',
    category: 'Health',
    goal: 'Stay hydrated with 3 liters of water daily',
    streak: 45,
    longestStreak: 45,
    completed: true,
    completionHistory: [],
    icon: 'Droplets',
    createdAt: '2024-10-01',
    notes: 'Track with water bottle markings',
  },
  {
    id: 4,
    name: 'Morning Run 5K',
    category: 'Fitness',
    goal: 'Complete a 5 kilometer run before 8 AM',
    streak: 8,
    longestStreak: 21,
    completed: true,
    completionHistory: [],
    icon: 'Footprints',
    createdAt: '2024-12-15',
    notes: 'Training for half marathon',
  },
  {
    id: 5,
    name: 'No Social Media',
    category: 'Productivity',
    goal: 'Avoid social media until after 6 PM',
    streak: 12,
    longestStreak: 20,
    completed: false,
    completionHistory: [],
    icon: 'Smartphone',
    createdAt: '2024-12-10',
    notes: 'Use app blocker for enforcement',
  },
  {
    id: 6,
    name: 'Call Family',
    category: 'Social',
    goal: 'Call a family member to check in',
    streak: 5,
    longestStreak: 14,
    completed: true,
    completionHistory: [],
    icon: 'Phone',
    createdAt: '2024-12-20',
    notes: 'Rotate between mom, dad, sister',
  },
  {
    id: 7,
    name: 'Code 1 Hour',
    category: 'Learning',
    goal: 'Practice coding for at least 1 hour',
    streak: 30,
    longestStreak: 60,
    completed: true,
    completionHistory: [],
    icon: 'Code',
    createdAt: '2024-09-01',
    notes: 'Working on side project',
  },
  {
    id: 8,
    name: 'Stretch 15 min',
    category: 'Fitness',
    goal: 'Complete 15 minutes of stretching',
    streak: 18,
    longestStreak: 25,
    completed: false,
    completionHistory: [],
    icon: 'PersonStanding',
    createdAt: '2024-11-20',
    notes: 'Focus on hip flexors',
  },
  {
    id: 9,
    name: 'Journal Entry',
    category: 'Mind',
    goal: 'Write a journal entry reflecting on the day',
    streak: 10,
    longestStreak: 22,
    completed: true,
    completionHistory: [],
    icon: 'PenLine',
    createdAt: '2024-12-05',
    notes: 'Gratitude and goals',
  },
  {
    id: 10,
    name: 'Healthy Breakfast',
    category: 'Health',
    goal: 'Eat a nutritious breakfast with protein',
    streak: 28,
    longestStreak: 35,
    completed: true,
    completionHistory: [],
    icon: 'Apple',
    createdAt: '2024-11-01',
    notes: 'Prep overnight oats',
  },
  {
    id: 11,
    name: 'Learn Language',
    category: 'Learning',
    goal: 'Practice Duolingo for 15 minutes',
    streak: 67,
    longestStreak: 67,
    completed: true,
    completionHistory: [],
    icon: 'Languages',
    createdAt: '2024-08-01',
    notes: 'Learning Spanish',
  },
  {
    id: 12,
    name: 'Evening Walk',
    category: 'Fitness',
    goal: 'Take a 20-minute walk after dinner',
    streak: 3,
    longestStreak: 15,
    completed: false,
    completionHistory: [],
    icon: 'TreePine',
    createdAt: '2024-12-25',
    notes: 'Great for digestion',
  },
];

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
];

export const getRandomQuote = () => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  return motivationalQuotes[dayOfYear % motivationalQuotes.length];
};
