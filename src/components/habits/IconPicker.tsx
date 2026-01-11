import { 
  BookOpen, Brain, Droplets, Footprints, Smartphone, Phone, 
  Code, PersonStanding, PenLine, Apple, Languages, TreePine,
  Heart, Dumbbell, Moon, Sun, Coffee, Music, Camera, Palette,
  Target, Zap, Star, Flame, Trophy, Medal, Gift, Smile,
  Clock, Bed, Bike, Car, Plane, Home, Building,
  LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconComponents: Record<string, LucideIcon> = {
  BookOpen, Brain, Droplets, Footprints, Smartphone, Phone, 
  Code, PersonStanding, PenLine, Apple, Languages, TreePine,
  Heart, Dumbbell, Moon, Sun, Coffee, Music, Camera, Palette,
  Target, Zap, Star, Flame, Trophy, Medal, Gift, Smile,
  Clock, Bed, Bike, Car, Plane, Home, Building,
};

interface IconPickerProps {
  selectedIcon: string;
  onSelectIcon: (icon: string) => void;
  accentColor?: string;
}

export function IconPicker({ selectedIcon, onSelectIcon, accentColor = '#22c55e' }: IconPickerProps) {
  return (
    <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
      {Object.entries(iconComponents).map(([name, Icon]) => {
        const isSelected = selectedIcon === name;
        return (
          <button
            key={name}
            type="button"
            onClick={() => onSelectIcon(name)}
            className={cn(
              "w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all duration-200",
              "hover:scale-110 hover:bg-background-tertiary",
              isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : "bg-background-tertiary/50"
            )}
            style={{ 
              backgroundColor: isSelected ? `${accentColor}20` : undefined
            }}
          >
            <Icon 
              className="w-5 h-5" 
              style={{ color: isSelected ? accentColor : undefined }}
            />
          </button>
      ))}
    </div>
  );
}

export function getIconComponent(iconName: string): LucideIcon {
  return iconComponents[iconName] || Target;
}
