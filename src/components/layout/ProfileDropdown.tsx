import { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Settings, 
  LogOut, 
  Trophy, 
  Target, 
  Flame,
  TrendingUp,
  Calendar,
  ChevronRight,
  Archive
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileDropdownProps {
  onOpenSettings: () => void;
  onOpenArchivedHabits: () => void;
  onLogout: () => void;
  isMobile?: boolean;
}

export function ProfileDropdown({ 
  onOpenSettings, 
  onOpenArchivedHabits,
  onLogout, 
  isMobile = false 
}: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const stats = [
    { icon: Target, label: 'Active Habits', value: '8' },
    { icon: Flame, label: 'Current Streak', value: '23 days' },
    { icon: Trophy, label: 'Achievements', value: '12' },
    { icon: TrendingUp, label: 'This Month', value: '87%' },
  ];

  const menuItems = [
    { icon: Settings, label: 'Settings', onClick: () => { onOpenSettings(); setIsOpen(false); } },
    { icon: Archive, label: 'Archived Habits', onClick: () => { onOpenArchivedHabits(); setIsOpen(false); } },
    { icon: Calendar, label: 'View Calendar', onClick: () => setIsOpen(false) },
  ];

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative flex items-center justify-center transition-all duration-200",
          isMobile 
            ? "flex-col gap-0.5 p-2" 
            : "w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent hover:scale-105"
        )}
      >
        {isMobile ? (
          <>
            <User className="w-5 h-5 text-muted-foreground" />
            <span className="text-[10px] sm:text-tiny text-muted-foreground">Profile</span>
          </>
        ) : (
          <span className="text-sm font-bold text-foreground">JD</span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div 
          className={cn(
            "absolute z-[100] bg-background-secondary border border-card-border rounded-2xl shadow-2xl overflow-hidden animate-fade-in",
            isMobile 
              ? "bottom-full mb-2 right-0 left-0 mx-4 fixed" 
              : "top-full mt-2 right-0 w-80"
          )}
          style={isMobile ? { left: '1rem', right: '1rem', bottom: '5rem' } : {}}
        >
          {/* Profile Header */}
          <div className="p-4 bg-gradient-to-br from-primary/20 to-accent/20 border-b border-card-border">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center ring-2 ring-primary/30">
                <span className="text-lg font-bold text-foreground">JD</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-foreground">Jamie Doe</h3>
                <p className="text-small text-muted-foreground">jamie.doe@email.com</p>
                <div className="flex items-center gap-1 mt-1">
                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                  <span className="text-tiny text-orange-500 font-medium">23 day streak</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="p-3 border-b border-card-border">
            <p className="text-tiny text-muted-foreground uppercase tracking-wider mb-2 px-1">Quick Stats</p>
            <div className="grid grid-cols-2 gap-2">
              {stats.map((stat) => (
                <div 
                  key={stat.label}
                  className="flex items-center gap-2 p-2 rounded-lg bg-background-tertiary"
                >
                  <stat.icon className="w-4 h-4 text-primary" />
                  <div className="min-w-0">
                    <p className="text-small font-semibold text-foreground truncate">{stat.value}</p>
                    <p className="text-tiny text-muted-foreground truncate">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-background-tertiary transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="text-body text-foreground">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </div>

          {/* Logout */}
          <div className="p-2 border-t border-card-border">
            <button
              onClick={() => { onLogout(); setIsOpen(false); }}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 transition-colors group"
            >
              <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-500 transition-colors" />
              <span className="text-body text-red-400 group-hover:text-red-500 transition-colors">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
