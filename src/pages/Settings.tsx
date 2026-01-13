import { useState } from 'react';
import { Moon, Palette, Bell, Target, Download, Trash2, HelpCircle, ExternalLink, LogOut } from 'lucide-react';
import { categoryDistribution } from '@/data/mockData';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { ArchivedHabitsSection } from '@/components/settings/ArchivedHabitsSection';
import { ActivityHistory } from '@/components/settings/ActivityHistory';

interface SettingsProps {
  onLogout?: () => void;
}

export function Settings({ onLogout }: SettingsProps) {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [weeklyGoal, setWeeklyGoal] = useState([80]);

  const handleExport = () => {
    toast.success('Data exported!', {
      description: 'Your habit data has been downloaded as CSV.'
    });
  };

  const handleReset = () => {
    toast.error('This would reset all data', {
      description: 'This action is permanent and cannot be undone.'
    });
  };

  return (
    <div className="p-6 lg:p-8 max-w-[800px] mx-auto pb-32 lg:pb-8">
      <div className="mb-8">
        <h1 className="text-h1 text-foreground">Settings</h1>
        <p className="text-body text-muted-foreground mt-2">
          Customize your experience
        </p>
      </div>

      <div className="space-y-6">
        {/* Activity History */}
        <ActivityHistory />

        {/* Archived Habits */}
        <ArchivedHabitsSection />

        {/* Appearance */}
        <section className="stat-card">
          <h2 className="text-h3 text-foreground mb-6 flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            Appearance
          </h2>

          <div className="space-y-6">
            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body font-medium text-foreground">Dark Mode</p>
                <p className="text-small text-muted-foreground">Light mode coming soon</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} disabled />
            </div>

            {/* Accent Color */}
            <div>
              <p className="text-body font-medium text-foreground mb-3">Accent Color</p>
              <div className="flex gap-3">
                {['#22c55e', '#3b82f6', '#a78bfa', '#f97316', '#ec4899', '#06b6d4'].map((color) => (
                  <button
                    key={color}
                    className="w-8 h-8 rounded-full transition-transform hover:scale-110 ring-2 ring-transparent hover:ring-foreground/20"
                    style={{ backgroundColor: color }}
                    onClick={() => toast.info('Theme customization coming soon!')}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="stat-card">
          <h2 className="text-h3 text-foreground mb-6">Habit Categories</h2>
          
          <div className="space-y-3">
            {categoryDistribution.map((category) => (
              <div 
                key={category.name}
                className="flex items-center justify-between p-3 rounded-lg bg-background-tertiary"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-body text-foreground">{category.name}</span>
                </div>
                <span className="text-small text-muted-foreground">
                  {category.value} habits
                </span>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 p-3 rounded-lg border-2 border-dashed border-card-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
            + Add Category
          </button>
        </section>

        {/* Notifications */}
        <section className="stat-card">
          <h2 className="text-h3 text-foreground mb-6 flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Notifications
          </h2>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-body font-medium text-foreground">Daily Reminder</p>
                <p className="text-small text-muted-foreground">Get reminded at 9:00 AM</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>

            <div>
              <p className="text-body font-medium text-foreground mb-3">Reminder Days</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <button
                    key={day}
                    className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-small font-medium transition-colors touch-manipulation ${
                      index < 5
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background-tertiary text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span className="sm:hidden">{day.slice(0, 1)}</span>
                    <span className="hidden sm:inline">{day}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Goals */}
        <section className="stat-card">
          <h2 className="text-h3 text-foreground mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Goals & Targets
          </h2>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-body font-medium text-foreground">Weekly Completion Target</p>
                <span className="text-body-lg font-bold text-primary">{weeklyGoal[0]}%</span>
              </div>
              <Slider
                value={weeklyGoal}
                onValueChange={setWeeklyGoal}
                max={100}
                step={5}
                className="w-full"
              />
              <p className="text-small text-muted-foreground mt-2">
                {Math.round((weeklyGoal[0] / 100) * 84)} out of 84 habits per week
              </p>
            </div>
          </div>
        </section>

        {/* Data Management */}
        <section className="stat-card">
          <h2 className="text-h3 text-foreground mb-6">Data Management</h2>

          <div className="space-y-4">
            <button
              onClick={handleExport}
              className="w-full flex items-center justify-between p-4 rounded-lg bg-background-tertiary hover:bg-background-tertiary/80 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-accent" />
                <div className="text-left">
                  <p className="text-body font-medium text-foreground">Export Data</p>
                  <p className="text-small text-muted-foreground">Download all habit data as CSV</p>
                </div>
              </div>
            </button>

            <button
              onClick={handleReset}
              className="w-full flex items-center justify-between p-4 rounded-lg border border-danger/20 hover:bg-danger/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Trash2 className="w-5 h-5 text-danger" />
                <div className="text-left">
                  <p className="text-body font-medium text-danger">Reset All Data</p>
                  <p className="text-small text-muted-foreground">This action cannot be undone</p>
                </div>
              </div>
            </button>
          </div>
        </section>

        {/* About */}
        <section className="stat-card">
          <h2 className="text-h3 text-foreground mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            About
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-body text-muted-foreground">Version</span>
              <span className="text-body text-foreground">1.0.0</span>
            </div>
            
            <a 
              href="#" 
              className="flex items-center justify-between py-2 text-body text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
              <ExternalLink className="w-4 h-4" />
            </a>
            
            <a 
              href="#" 
              className="flex items-center justify-between py-2 text-body text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
              <ExternalLink className="w-4 h-4" />
            </a>
            
            <a 
              href="#" 
              className="flex items-center justify-between py-2 text-body text-muted-foreground hover:text-foreground transition-colors"
            >
              Contact Support
              <ExternalLink className="w-4 h-4" />
            </a>

            {onLogout && (
              <button
                onClick={() => {
                  onLogout();
                  toast.success('Logged out successfully');
                }}
                className="w-full flex items-center justify-between p-4 mt-4 rounded-lg bg-danger/10 hover:bg-danger/20 transition-colors text-danger"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </div>
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
