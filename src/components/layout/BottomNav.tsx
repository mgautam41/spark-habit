import { 
  LayoutDashboard, 
  CheckSquare, 
  BarChart3, 
  Calendar,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
  { id: 'habits', label: 'Habits', icon: CheckSquare },
  { id: 'analytics', label: 'Stats', icon: BarChart3 },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'profile', label: 'Profile', icon: User },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background-secondary/95 backdrop-blur-xl border-t border-card-border z-50 pb-safe">
      <div className="flex items-center justify-around px-1 py-1.5 sm:py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "bottom-tab flex-1 min-w-0 touch-manipulation",
                isActive && "active"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {isActive && (
                <span className="text-[10px] sm:text-tiny truncate">{item.label}</span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
