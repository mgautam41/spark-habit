import { useState } from 'react';
import { Check, Flame, BookOpen, Brain, Droplets, Footprints, Smartphone, Phone, Code, PersonStanding, PenLine, Apple, Languages, TreePine, Circle, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Habit, categoryColorsHex } from '@/data/mockData';

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Brain,
  Droplets,
  Footprints,
  Smartphone,
  Phone,
  Code,
  PersonStanding,
  PenLine,
  Apple,
  Languages,
  TreePine,
  Circle,
};

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: number) => void;
  delay?: number;
}

export function HabitCard({ habit, onToggle, delay = 0 }: HabitCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const categoryColor = categoryColorsHex[habit.category];
  
  // Dynamic icon lookup
  const IconComponent = iconMap[habit.icon] || Circle;

  const handleToggle = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    onToggle(habit.id);
  };

  // Calculate progress (mock: based on streak vs longest streak)
  const progress = Math.min(100, (habit.streak / Math.max(habit.longestStreak, 1)) * 100);

  return (
    <div 
      className="habit-card animate-fade-in-up"
      style={{ 
        borderLeftColor: categoryColor,
        animationDelay: `${delay}ms`
      }}
    >
      <div className="flex items-center gap-4">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          className={cn(
            "habit-checkbox",
            habit.completed && "checked",
            isAnimating && "animate-number-pop"
          )}
          style={{ 
            borderColor: habit.completed ? categoryColor : undefined,
            backgroundColor: habit.completed ? categoryColor : undefined
          }}
        >
          {habit.completed && (
            <Check className="w-4 h-4 text-foreground animate-scale-in" />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h3 
              className={cn(
                "text-body-lg font-semibold text-foreground transition-all duration-300",
                habit.completed && "line-through text-muted-foreground"
              )}
            >
              {habit.name}
            </h3>
            <span 
              className="category-badge"
              style={{ 
                backgroundColor: `${categoryColor}20`,
                color: categoryColor
              }}
            >
              {habit.category}
            </span>
          </div>
          
          <p className="text-small text-muted-foreground mt-1 flex items-center gap-2">
            <IconComponent className="w-3.5 h-3.5" />
            {habit.goal}
          </p>

          {/* Progress Bar */}
          <div className="mt-3 progress-bar max-w-[200px]">
            <div 
              className="progress-bar-fill"
              style={{ 
                width: habit.completed ? '100%' : `${progress}%`,
                background: `linear-gradient(90deg, ${categoryColor}, ${categoryColor}cc)`,
                transitionDelay: `${delay + 200}ms`
              }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col items-end gap-2">
          {habit.streak >= 7 && (
            <div className="streak-badge">
              <Flame className="w-3 h-3" />
              <span>{habit.streak}</span>
            </div>
          )}
          {habit.streak < 7 && habit.streak > 0 && (
            <div className="flex items-center gap-1 text-small text-muted-foreground">
              <Flame className="w-3 h-3 text-warning" />
              <span>{habit.streak} days</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
