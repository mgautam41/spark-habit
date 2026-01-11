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
      <div className="flex items-start sm:items-center gap-3 sm:gap-4">
        {/* Checkbox */}
        <button
          onClick={handleToggle}
          className={cn(
            "habit-checkbox flex-shrink-0 mt-0.5 sm:mt-0",
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
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h3 
              className={cn(
                "text-body sm:text-body-lg font-semibold text-foreground transition-all duration-300 break-words",
                habit.completed && "line-through text-muted-foreground"
              )}
            >
              {habit.name}
            </h3>
            <span 
              className="category-badge text-[10px] sm:text-xs flex-shrink-0"
              style={{ 
                backgroundColor: `${categoryColor}20`,
                color: categoryColor
              }}
            >
              {habit.category}
            </span>
          </div>
          
          <p className="text-small text-muted-foreground mt-1 flex items-center gap-2 truncate">
            <IconComponent className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{habit.goal}</span>
          </p>

          {/* Progress Bar */}
          <div className="mt-2 sm:mt-3 progress-bar w-full max-w-[200px]">
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

        {/* Stats - Hidden on very small screens, shown as inline on mobile */}
        <div className="hidden xs:flex flex-col items-end gap-2 flex-shrink-0">
          {habit.streak >= 7 && (
            <div className="streak-badge">
              <Flame className="w-3 h-3" />
              <span>{habit.streak}</span>
            </div>
          )}
          {habit.streak < 7 && habit.streak > 0 && (
            <div className="flex items-center gap-1 text-small text-muted-foreground whitespace-nowrap">
              <Flame className="w-3 h-3 text-warning" />
              <span>{habit.streak}d</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
