import { useState } from 'react';
import { Check, Flame, MoreVertical, Edit2, Archive, Trash2, Eye, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Habit, categoryColorsHex, Difficulty } from '@/data/mockData';
import { getIconComponent } from './IconPicker';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HabitCardEnhancedProps {
  habit: Habit;
  onToggle: (id: number) => void;
  onEdit: (id: number) => void;
  onArchive: (id: number) => void;
  onDelete: (id: number) => void;
  onView: (id: number) => void;
  delay?: number;
}

const difficultyStars: Record<Difficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
};

export function HabitCardEnhanced({ 
  habit, 
  onToggle, 
  onEdit,
  onArchive,
  onDelete,
  onView,
  delay = 0 
}: HabitCardEnhancedProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const categoryColor = habit.color || categoryColorsHex[habit.category];
  const IconComponent = getIconComponent(habit.icon);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    onToggle(habit.id);
  };

  const progress = Math.min(100, (habit.streak / Math.max(habit.longestStreak, 1)) * 100);
  const successRate = habit.totalCompletions > 0 
    ? Math.round((habit.completionHistory.filter(h => h.completed).length / habit.completionHistory.length) * 100) 
    : 0;

  return (
    <div 
      className="habit-card animate-fade-in-up cursor-pointer group"
      style={{ 
        borderLeftColor: categoryColor,
        animationDelay: `${delay}ms`
      }}
      onClick={() => onView(habit.id)}
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
            
            {/* Difficulty Stars */}
            <div className="flex gap-0.5">
              {Array.from({ length: difficultyStars[habit.difficulty] }).map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3"
                  fill={habit.difficulty === 'hard' ? '#ef4444' : habit.difficulty === 'medium' ? '#f59e0b' : '#22c55e'}
                  stroke="transparent"
                />
              ))}
            </div>
          </div>
          
          <p className="text-small text-muted-foreground mt-1 flex items-center gap-2 truncate">
            <IconComponent className="w-3.5 h-3.5 flex-shrink-0" style={{ color: categoryColor }} />
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

          {/* Quick Stats */}
          <div className="flex items-center gap-4 mt-2 text-small text-muted-foreground">
            <span>{habit.frequency}</span>
            {successRate > 0 && <span>{successRate}% success</span>}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Streak Badge */}
          <div className="hidden xs:flex flex-col items-end gap-1">
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

          {/* Context Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-background-tertiary transition-all"
              >
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card border-card-border" align="end">
              <DropdownMenuItem 
                onClick={(e) => { e.stopPropagation(); onView(habit.id); }}
                className="text-foreground cursor-pointer"
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={(e) => { e.stopPropagation(); onEdit(habit.id); }}
                className="text-foreground cursor-pointer"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-card-border" />
              <DropdownMenuItem 
                onClick={(e) => { e.stopPropagation(); onArchive(habit.id); }}
                className="text-muted-foreground cursor-pointer"
              >
                <Archive className="w-4 h-4 mr-2" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={(e) => { e.stopPropagation(); onDelete(habit.id); }}
                className="text-danger cursor-pointer"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
