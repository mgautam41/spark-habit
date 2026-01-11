import { 
  LayoutDashboard, 
  CheckSquare, 
  BarChart3, 
  Calendar, 
  Settings,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'habits', label: 'Daily Habits', icon: CheckSquare },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="hidden lg:flex flex-col w-70 bg-background-secondary border-r border-card-border h-screen fixed left-0 top-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 h-16 border-b border-card-border">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <span className="text-h3 text-foreground font-bold">FocusFlow</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "nav-item w-full text-left",
                isActive && "active"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-body font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-card-border">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-background-tertiary">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-sm font-bold text-foreground">JD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-body font-semibold text-foreground truncate">Jamie Doe</p>
            <p className="text-small text-muted-foreground truncate">23 day streak 🔥</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
