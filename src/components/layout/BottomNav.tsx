import { 
  LayoutDashboard, 
  CheckSquare, 
  BarChart3, 
  Calendar, 
  Settings 
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
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-background-secondary/95 backdrop-blur-xl border-t border-card-border z-50">
      <div className="flex items-center justify-around px-2 py-1 safe-area-inset-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "bottom-tab flex-1",
                isActive && "active"
              )}
            >
              <Icon className="w-5 h-5" />
              {isActive && (
                <span className="text-tiny">{item.label}</span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
