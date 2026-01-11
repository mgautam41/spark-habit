import { RotateCcw, Trash2 } from 'lucide-react';
import { Habit, categoryColorsHex } from '@/data/mockData';
import { getIconComponent } from './IconPicker';

interface ArchivedHabitCardProps {
  habit: Habit;
  onRestore: (id: number) => void;
  onDelete: (id: number) => void;
}

export function ArchivedHabitCard({ habit, onRestore, onDelete }: ArchivedHabitCardProps) {
  const categoryColor = habit.color || categoryColorsHex[habit.category];
  const IconComponent = getIconComponent(habit.icon);

  return (
    <div 
      className="habit-card opacity-60 hover:opacity-100 transition-opacity"
      style={{ borderLeftColor: categoryColor }}
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${categoryColor}20` }}
        >
          <IconComponent className="w-5 h-5" style={{ color: categoryColor }} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-body font-semibold text-muted-foreground truncate">
            {habit.name}
          </h3>
          <p className="text-small text-muted-foreground/70 truncate">
            {habit.totalCompletions} completions • {habit.longestStreak} day best streak
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onRestore(habit.id)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Restore</span>
          </button>
          <button
            onClick={() => onDelete(habit.id)}
            className="p-2 rounded-lg text-muted-foreground hover:text-danger hover:bg-danger/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
