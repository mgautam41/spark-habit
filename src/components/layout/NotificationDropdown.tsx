import { useState, useRef, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { 
  Bell, 
  Plus, 
  Check, 
  X, 
  Edit2, 
  Trash2, 
  Archive, 
  RotateCcw, 
  Flame, 
  Trophy,
  CheckCheck,
  Settings
} from 'lucide-react';
import { Activity, ActivityType, useActivity } from '@/contexts/ActivityContext';
import { cn } from '@/lib/utils';

const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case 'habit_created':
      return Plus;
    case 'habit_completed':
      return Check;
    case 'habit_uncompleted':
      return X;
    case 'habit_updated':
      return Edit2;
    case 'habit_deleted':
      return Trash2;
    case 'habit_archived':
      return Archive;
    case 'habit_restored':
      return RotateCcw;
    case 'streak_milestone':
      return Trophy;
    case 'streak_reset':
      return Flame;
    default:
      return Bell;
  }
};

const getActivityColor = (type: ActivityType) => {
  switch (type) {
    case 'habit_created':
      return 'bg-primary/10 text-primary';
    case 'habit_completed':
      return 'bg-success/10 text-success';
    case 'habit_uncompleted':
      return 'bg-warning/10 text-warning';
    case 'habit_updated':
      return 'bg-accent/10 text-accent';
    case 'habit_deleted':
      return 'bg-danger/10 text-danger';
    case 'habit_archived':
      return 'bg-muted text-muted-foreground';
    case 'habit_restored':
      return 'bg-info/10 text-info';
    case 'streak_milestone':
      return 'bg-warning/10 text-warning';
    case 'streak_reset':
      return 'bg-danger/10 text-danger';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getBorderColor = (type: ActivityType) => {
  switch (type) {
    case 'habit_created':
      return 'border-l-primary';
    case 'habit_completed':
      return 'border-l-success';
    case 'habit_uncompleted':
      return 'border-l-warning';
    case 'habit_updated':
      return 'border-l-accent';
    case 'habit_deleted':
      return 'border-l-danger';
    case 'habit_archived':
      return 'border-l-muted-foreground';
    case 'habit_restored':
      return 'border-l-info';
    case 'streak_milestone':
      return 'border-l-warning';
    case 'streak_reset':
      return 'border-l-danger';
    default:
      return 'border-l-muted';
  }
};

interface NotificationDropdownProps {
  onOpenSettings?: () => void;
}

export function NotificationDropdown({ onOpenSettings }: NotificationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { activities, unreadCount, markAsRead, markAllAsRead, clearActivities } = useActivity();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleActivityClick = (id: number) => {
    markAsRead(id);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-background-tertiary transition-colors touch-manipulation"
      >
        <Bell className={cn(
          "w-5 h-5 transition-colors",
          isOpen ? "text-primary" : "text-muted-foreground"
        )} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-card border border-card-border rounded-xl shadow-lg overflow-hidden animate-scale-in z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-card-border bg-background-secondary">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" />
              Notifications
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {unreadCount} new
                </span>
              )}
            </h3>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background-tertiary transition-colors"
                  title="Mark all as read"
                >
                  <CheckCheck className="w-4 h-4" />
                </button>
              )}
              {onOpenSettings && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenSettings();
                  }}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background-tertiary transition-colors"
                  title="Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Activities List */}
          <div className="max-h-[400px] overflow-y-auto">
            {activities.length === 0 ? (
              <div className="text-center py-10 px-4">
                <Bell className="w-10 h-10 text-muted-foreground/20 mx-auto mb-3" />
                <p className="text-muted-foreground font-medium">No notifications yet</p>
                <p className="text-sm text-muted-foreground/70 mt-1">
                  Your activity will appear here
                </p>
              </div>
            ) : (
              <div className="divide-y divide-card-border">
                {activities.slice(0, 20).map((activity) => {
                  const Icon = getActivityIcon(activity.type);
                  const iconColor = getActivityColor(activity.type);
                  const borderColor = getBorderColor(activity.type);

                  return (
                    <div 
                      key={activity.id}
                      onClick={() => handleActivityClick(activity.id)}
                      className={cn(
                        "flex items-start gap-3 p-3 border-l-4 cursor-pointer transition-colors hover:bg-background-tertiary/50",
                        borderColor,
                        !activity.read && "bg-background-tertiary/30"
                      )}
                    >
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", iconColor)}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "text-sm text-foreground truncate",
                          !activity.read && "font-medium"
                        )}>
                          {activity.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                        </p>
                      </div>
                      {!activity.read && (
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {activities.length > 0 && (
            <div className="px-4 py-3 border-t border-card-border bg-background-secondary">
              <button
                onClick={() => {
                  clearActivities();
                  setIsOpen(false);
                }}
                className="w-full text-center text-sm text-muted-foreground hover:text-danger transition-colors"
              >
                Clear all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
