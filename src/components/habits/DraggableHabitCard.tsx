import { useState } from 'react';
import { Check, Flame, GripVertical, ChevronUp, ChevronDown, Circle, LucideIcon } from 'lucide-react';
import { BookOpen, Brain, Droplets, Footprints, Smartphone, Phone, Code, PersonStanding, PenLine, Apple, Languages, TreePine } from 'lucide-react';
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

interface DraggableHabitCardProps {
  habit: Habit;
  index: number;
  totalCount: number;
  onToggle: (id: number) => void;
  onEdit?: () => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  delay?: number;
}

export function DraggableHabitCard({ 
  habit, 
  index,
  totalCount,
  onToggle, 
  onEdit, 
  onMoveUp,
  onMoveDown,
  delay = 0 
}: DraggableHabitCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const categoryColor = categoryColorsHex[habit.category];
  
  const IconComponent = iconMap[habit.icon] || Circle;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    onToggle(habit.id);
  };

  const handleCardClick = () => {
    if (onEdit) {
      onEdit();
    }
  };

  const handleMoveUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (index > 0) {
      setIsMoving(true);
      onMoveUp(index);
      setTimeout(() => setIsMoving(false), 200);
    }
  };

  const handleMoveDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (index < totalCount - 1) {
      setIsMoving(true);
      onMoveDown(index);
      setTimeout(() => setIsMoving(false), 200);
    }
  };

  const progress = Math.min(100, (habit.streak / Math.max(habit.longestStreak, 1)) * 100);

  return (
    <div 
      className={cn(
        "habit-card animate-fade-in-up group",
        onEdit && "cursor-pointer hover:bg-card-hover",
        isMoving && "scale-[1.02] shadow-lg"
      )}
      style={{ 
        borderLeftColor: categoryColor,
        animationDelay: `${delay}ms`,
        transition: 'transform 0.2s ease-out, box-shadow 0.2s ease-out'
      }}
      onClick={handleCardClick}
    >
      <div className="flex items-start sm:items-center gap-2 sm:gap-4">
        {/* Drag Handle & Reorder Buttons */}
        <div className="flex flex-col items-center gap-0.5 opacity-40 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleMoveUp}
            disabled={index === 0}
            className={cn(
              "p-1 rounded hover:bg-background-tertiary transition-colors",
              index === 0 && "opacity-30 cursor-not-allowed"
            )}
            aria-label="Move habit up"
          >
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          </button>
          <GripVertical className="w-4 h-4 text-muted-foreground" />
          <button
            onClick={handleMoveDown}
            disabled={index === totalCount - 1}
            className={cn(
              "p-1 rounded hover:bg-background-tertiary transition-colors",
              index === totalCount - 1 && "opacity-30 cursor-not-allowed"
            )}
            aria-label="Move habit down"
          >
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

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

        {/* Stats */}
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
