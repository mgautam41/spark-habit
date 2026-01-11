import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Trash2, Archive, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { IconPicker } from './IconPicker';
import { ColorPicker } from './ColorPicker';
import { FrequencySelector } from './FrequencySelector';
import { DifficultySelector } from './DifficultySelector';
import { Category, Frequency, Difficulty, categoryColorsHex, Habit } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface HabitFormProps {
  habit?: Habit;
  onSubmit: (data: HabitFormData) => void;
  onCancel: () => void;
  onDelete?: () => void;
  onArchive?: () => void;
  onResetStreak?: () => void;
  mode: 'create' | 'edit';
}

export interface HabitFormData {
  name: string;
  category: Category;
  goal: string;
  icon: string;
  color: string;
  frequency: Frequency;
  frequencyDays: string[];
  frequencyCustomDays: number;
  reminderEnabled: boolean;
  reminderTime: string;
  difficulty: Difficulty;
}

const categories: Category[] = ['Health', 'Learning', 'Mind', 'Fitness', 'Productivity', 'Social'];

export function HabitForm({ 
  habit, 
  onSubmit, 
  onCancel, 
  onDelete, 
  onArchive, 
  onResetStreak,
  mode 
}: HabitFormProps) {
  const [formData, setFormData] = useState<HabitFormData>({
    name: habit?.name || '',
    category: habit?.category || 'Health',
    goal: habit?.goal || '',
    icon: habit?.icon || 'Target',
    color: habit?.color || categoryColorsHex['Health'],
    frequency: habit?.frequency || 'daily',
    frequencyDays: habit?.frequencyDays || [],
    frequencyCustomDays: habit?.frequencyCustomDays || 2,
    reminderEnabled: habit?.reminderEnabled || false,
    reminderTime: habit?.reminderTime || '09:00',
    difficulty: habit?.difficulty || 'easy',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update color when category changes
  useEffect(() => {
    if (!habit) {
      setFormData(prev => ({
        ...prev,
        color: categoryColorsHex[prev.category]
      }));
    }
  }, [formData.category, habit]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Habit name is required';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Name must be 50 characters or less';
    }
    
    if (formData.goal.length > 200) {
      newErrors.goal = 'Goal must be 200 characters or less';
    }

    if (formData.frequency === 'weekly' && formData.frequencyDays.length === 0) {
      newErrors.frequency = 'Select at least one day';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const updateField = <K extends keyof HabitFormData>(field: K, value: HabitFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-secondary/95 backdrop-blur-xl border-b border-card-border">
        <div className="flex items-center justify-between px-4 sm:px-6 h-16">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back</span>
          </button>
          
          <h1 className="text-lg font-semibold text-foreground">
            {mode === 'create' ? 'New Habit' : 'Edit Habit'}
          </h1>
          
          <button
            onClick={handleSubmit}
            disabled={!formData.name.trim()}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200",
              formData.name.trim()
                ? "bg-primary text-primary-foreground hover:bg-primary-hover"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Save</span>
          </button>
        </div>
      </header>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto pb-32">
        <div className="space-y-8">
          {/* Basic Info Section */}
          <section className="space-y-4">
            <h2 className="text-h3 text-foreground">Basic Info</h2>
            
            {/* Habit Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Habit Name <span className="text-danger">*</span>
              </label>
              <Input
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="e.g., Read 20 pages"
                maxLength={50}
                className={cn(
                  "bg-background-tertiary border-card-border text-foreground placeholder:text-muted-foreground",
                  errors.name && "border-danger"
                )}
              />
              <div className="flex justify-between">
                {errors.name && <p className="text-small text-danger">{errors.name}</p>}
                <p className="text-small text-muted-foreground ml-auto">{formData.name.length}/50</p>
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => updateField('category', cat)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
                      formData.category === cat
                        ? "text-white"
                        : "bg-background-tertiary text-muted-foreground hover:text-foreground"
                    )}
                    style={{ 
                      backgroundColor: formData.category === cat ? categoryColorsHex[cat] : undefined 
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Goal/Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Goal / Description</label>
              <Textarea
                value={formData.goal}
                onChange={(e) => updateField('goal', e.target.value)}
                placeholder="What's your goal with this habit?"
                maxLength={200}
                rows={3}
                className={cn(
                  "bg-background-tertiary border-card-border text-foreground placeholder:text-muted-foreground resize-none",
                  errors.goal && "border-danger"
                )}
              />
              <div className="flex justify-between">
                {errors.goal && <p className="text-small text-danger">{errors.goal}</p>}
                <p className="text-small text-muted-foreground ml-auto">{formData.goal.length}/200</p>
              </div>
            </div>
          </section>

          {/* Appearance Section */}
          <section className="space-y-4">
            <h2 className="text-h3 text-foreground">Appearance</h2>
            
            {/* Icon Picker */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Icon</label>
              <IconPicker
                selectedIcon={formData.icon}
                onSelectIcon={(icon) => updateField('icon', icon)}
                accentColor={formData.color}
              />
            </div>

            {/* Color Picker */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Accent Color</label>
              <ColorPicker
                selectedColor={formData.color}
                onSelectColor={(color) => updateField('color', color)}
              />
            </div>
          </section>

          {/* Schedule Section */}
          <section className="space-y-4">
            <h2 className="text-h3 text-foreground">Schedule</h2>
            
            {/* Frequency */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Frequency</label>
              <FrequencySelector
                frequency={formData.frequency}
                onFrequencyChange={(freq) => updateField('frequency', freq)}
                frequencyDays={formData.frequencyDays}
                onFrequencyDaysChange={(days) => updateField('frequencyDays', days)}
                customDays={formData.frequencyCustomDays}
                onCustomDaysChange={(days) => updateField('frequencyCustomDays', days)}
              />
              {errors.frequency && <p className="text-small text-danger">{errors.frequency}</p>}
            </div>

            {/* Reminder */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Daily Reminder</label>
                <Switch
                  checked={formData.reminderEnabled}
                  onCheckedChange={(checked) => updateField('reminderEnabled', checked)}
                />
              </div>
              
              {formData.reminderEnabled && (
                <Input
                  type="time"
                  value={formData.reminderTime}
                  onChange={(e) => updateField('reminderTime', e.target.value)}
                  className="bg-background-tertiary border-card-border text-foreground w-32"
                />
              )}
            </div>
          </section>

          {/* Difficulty Section */}
          <section className="space-y-4">
            <h2 className="text-h3 text-foreground">Difficulty</h2>
            <DifficultySelector
              difficulty={formData.difficulty}
              onDifficultyChange={(diff) => updateField('difficulty', diff)}
            />
          </section>

          {/* Danger Zone - Edit Mode Only */}
          {mode === 'edit' && (
            <section className="space-y-4 pt-6 border-t border-card-border">
              <h2 className="text-h3 text-foreground">Manage Habit</h2>
              
              <div className="flex flex-wrap gap-3">
                {onResetStreak && (
                  <button
                    type="button"
                    onClick={onResetStreak}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-warning/10 text-warning hover:bg-warning/20 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset Streak
                  </button>
                )}
                
                {onArchive && (
                  <button
                    type="button"
                    onClick={onArchive}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Archive className="w-4 h-4" />
                    Archive
                  </button>
                )}
                
                {onDelete && (
                  <button
                    type="button"
                    onClick={onDelete}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-danger/10 text-danger hover:bg-danger/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                )}
              </div>
            </section>
          )}
        </div>
      </form>
    </div>
  );
}
