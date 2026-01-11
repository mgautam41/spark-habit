import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

const presetColors = [
  '#22c55e', // Green - Health
  '#3b82f6', // Blue - Learning
  '#a78bfa', // Purple - Mind
  '#f97316', // Orange - Fitness
  '#06b6d4', // Cyan - Productivity
  '#ec4899', // Pink - Social
  '#eab308', // Yellow
  '#ef4444', // Red
  '#8b5cf6', // Violet
  '#14b8a6', // Teal
  '#f43f5e', // Rose
  '#6366f1', // Indigo
];

interface ColorPickerProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

export function ColorPicker({ selectedColor, onSelectColor }: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {presetColors.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onSelectColor(color)}
          className={cn(
            "w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200",
            "hover:scale-110 ring-2 ring-transparent",
            selectedColor === color && "ring-foreground ring-offset-2 ring-offset-background"
          )}
          style={{ backgroundColor: color }}
        >
          {selectedColor === color && (
            <Check className="w-4 h-4 text-white drop-shadow-md" />
          )}
        </button>
      ))}
    </div>
  );
}
