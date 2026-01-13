import { formatDistanceToNow } from 'date-fns';
import { 
  Plus, 
  Check, 
  X, 
  Edit2, 
  Trash2, 
  Archive, 
  RotateCcw, 
  Flame, 
  Trophy,
  Bell,
  CheckCheck
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

interface ActivityItemProps {
  activity: Activity;
  onMarkRead: (id: number) => void;
}

function ActivityItem({ activity, onMarkRead }: ActivityItemProps) {
  const Icon = getActivityIcon(activity.type);
  const iconColor = getActivityColor(activity.type);
  const borderColor = getBorderColor(activity.type);

  return (
    <div 
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg bg-background-tertiary border-l-4 transition-all duration-200",
        borderColor,
        !activity.read && "bg-background-tertiary/80",
        activity.read && "opacity-60"
      )}
      onClick={() => !activity.read && onMarkRead(activity.id)}
    >
      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", iconColor)}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn(
          "text-sm text-foreground",
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
}

export function ActivityHistory() {
  const { activities, unreadCount, markAsRead, markAllAsRead, clearActivities } = useActivity();

  return (
    <section className="stat-card">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-h3 text-foreground flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Activity History
          {unreadCount > 0 && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
              {unreadCount}
            </span>
          )}
        </h2>
        {activities.length > 0 && (
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-background-tertiary transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
            <button
              onClick={clearActivities}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-danger hover:bg-danger/10 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
        )}
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-8">
          <Bell className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">No activity yet</p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Your habit activities will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 scrollbar-hide">
          {activities.map((activity) => (
            <ActivityItem 
              key={activity.id} 
              activity={activity} 
              onMarkRead={markAsRead}
            />
          ))}
        </div>
      )}
    </section>
  );
}
