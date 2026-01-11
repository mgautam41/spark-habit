import { cn } from '@/lib/utils';
import { Frequency } from '@/data/mockData';
import { Input } from '@/components/ui/input';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface FrequencySelectorProps {
  frequency: Frequency;
  onFrequencyChange: (frequency: Frequency) => void;
  frequencyDays: string[];
  onFrequencyDaysChange: (days: string[]) => void;
  customDays: number;
  onCustomDaysChange: (days: number) => void;
}

export function FrequencySelector({
  frequency,
  onFrequencyChange,
  frequencyDays,
  onFrequencyDaysChange,
  customDays,
  onCustomDaysChange,
}: FrequencySelectorProps) {
  const toggleDay = (day: string) => {
    if (frequencyDays.includes(day)) {
      onFrequencyDaysChange(frequencyDays.filter(d => d !== day));
    } else {
      onFrequencyDaysChange([...frequencyDays, day]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Frequency Type Selector */}
      <div className="flex flex-wrap gap-2">
        {(['daily', 'weekly', 'custom'] as Frequency[]).map((freq) => (
          <button
            key={freq}
            type="button"
            onClick={() => onFrequencyChange(freq)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize",
              frequency === freq
                ? "bg-primary text-primary-foreground"
                : "bg-background-tertiary text-muted-foreground hover:text-foreground"
            )}
          >
            {freq}
          </button>
        ))}
      </div>

      {/* Weekly Day Selector */}
      {frequency === 'weekly' && (
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Select days</label>
          <div className="flex flex-wrap gap-2">
            {days.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={cn(
                  "w-11 h-11 rounded-lg text-sm font-medium transition-all duration-200",
                  frequencyDays.includes(day)
                    ? "bg-primary text-primary-foreground"
                    : "bg-background-tertiary text-muted-foreground hover:text-foreground"
                )}
              >
                {day.slice(0, 2)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Custom Interval */}
      {frequency === 'custom' && (
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">Repeat every</label>
          <div className="flex items-center gap-3">
            <Input
              type="number"
              min={1}
              max={30}
              value={customDays}
              onChange={(e) => onCustomDaysChange(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 bg-background-tertiary border-card-border"
            />
            <span className="text-sm text-muted-foreground">days</span>
          </div>
        </div>
      )}
    </div>
  );
}
