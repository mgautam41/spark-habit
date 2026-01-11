import { cn } from '@/lib/utils';
import { Difficulty } from '@/data/mockData';
import { Star } from 'lucide-react';

interface DifficultySelectorProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

const difficultyConfig: Record<Difficulty, { label: string; stars: number; color: string }> = {
  easy: { label: 'Easy', stars: 1, color: '#22c55e' },
  medium: { label: 'Medium', stars: 2, color: '#f59e0b' },
  hard: { label: 'Hard', stars: 3, color: '#ef4444' },
};

export function DifficultySelector({ difficulty, onDifficultyChange }: DifficultySelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(difficultyConfig) as Difficulty[]).map((level) => {
        const config = difficultyConfig[level];
        const isSelected = difficulty === level;
        
        return (
          <button
            key={level}
            type="button"
            onClick={() => onDifficultyChange(level)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              isSelected
                ? "bg-primary/10 border border-primary text-primary"
                : "bg-background-tertiary text-muted-foreground hover:text-foreground border border-transparent"
            )}
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 3 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5"
                  fill={i < config.stars ? config.color : 'transparent'}
                  stroke={i < config.stars ? config.color : 'currentColor'}
                />
              ))}
            </div>
            <span>{config.label}</span>
          </button>
        );
      })}
    </div>
  );
}
