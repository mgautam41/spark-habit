import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  LogOut, 
  Trophy, 
  Target, 
  Flame,
  TrendingUp,
  ChevronRight,
  Archive,
  ArrowLeft,
  Mail,
  Bell,
  Shield,
  HelpCircle
} from 'lucide-react';
import { BottomNav } from '@/components/layout/BottomNav';
import { useScrollHide } from '@/hooks/use-scroll-hide';

interface ProfileProps {
  onLogout: () => void;
}

export function Profile({ onLogout }: ProfileProps) {
  const navigate = useNavigate();
  const { isVisible } = useScrollHide({ threshold: 10 });
  
  const stats = [
    { icon: Target, label: 'Active Habits', value: '8', color: 'bg-primary/20' },
    { icon: Flame, label: 'Current Streak', value: '23 days', color: 'bg-orange-500/20' },
    { icon: Trophy, label: 'Achievements', value: '12', color: 'bg-yellow-500/20' },
    { icon: TrendingUp, label: 'This Month', value: '87%', color: 'bg-health/20' },
  ];

  const menuSections = [
    {
      title: 'Account',
      items: [
        { icon: Settings, label: 'Settings', onClick: () => navigate('/settings') },
        { icon: Archive, label: 'Archived Habits', onClick: () => navigate('/archived-habits') },
        { icon: Bell, label: 'Notifications', onClick: () => {} },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help & FAQ', onClick: () => {} },
        { icon: Shield, label: 'Privacy Policy', onClick: () => {} },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-28 lg:pb-8">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background-secondary/80 backdrop-blur-xl border-b border-card-border">
        <div className="flex items-center gap-3 px-4 h-14 max-w-[600px] mx-auto">
          <button 
            onClick={() => navigate('/')}
            className="p-2 -ml-2 rounded-xl hover:bg-background-tertiary transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Profile</h1>
        </div>
      </div>

      <div className="max-w-[600px] mx-auto">
        {/* Profile Header */}
        <div className="p-4">
          <div className="glass-card p-4 sm:p-6 bg-gradient-to-br from-primary/10 to-accent/10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center ring-4 ring-primary/20 flex-shrink-0">
                <span className="text-xl sm:text-2xl font-bold text-foreground">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-foreground truncate">Jamie Doe</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground flex-shrink-0" />
                  <p className="text-tiny sm:text-small text-muted-foreground truncate">jamie.doe@email.com</p>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
                  <span className="text-tiny sm:text-small text-orange-500 font-medium">23 day streak 🔥</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="px-4 mb-6">
          <h3 className="text-tiny sm:text-small text-muted-foreground uppercase tracking-wider mb-3">Your Stats</h3>
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {stats.map((stat) => (
              <div 
                key={stat.label}
                className="glass-card p-3 sm:p-4 flex items-center gap-2 sm:gap-3"
              >
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl ${stat.color} flex items-center justify-center flex-shrink-0`}>
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-small sm:text-body font-bold text-foreground">{stat.value}</p>
                  <p className="text-[10px] sm:text-tiny text-muted-foreground truncate">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Sections */}
        {menuSections.map((section) => (
          <div key={section.title} className="px-4 mb-6">
            <h3 className="text-tiny sm:text-small text-muted-foreground uppercase tracking-wider mb-3">{section.title}</h3>
            <div className="glass-card overflow-hidden">
              {section.items.map((item, index) => (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className={`w-full flex items-center justify-between p-3 sm:p-4 hover:bg-background-tertiary transition-colors ${
                    index !== section.items.length - 1 ? 'border-b border-card-border' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                    <span className="text-small sm:text-body text-foreground">{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <div className="px-4">
          <button
            onClick={onLogout}
            className="w-full glass-card flex items-center justify-center gap-3 p-3 sm:p-4 hover:bg-red-500/10 transition-colors group"
          >
            <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 group-hover:text-red-500 transition-colors" />
            <span className="text-small sm:text-body text-red-400 group-hover:text-red-500 font-medium transition-colors">Sign Out</span>
          </button>
        </div>
      </div>
      
      <BottomNav 
        activeTab="profile" 
        onTabChange={(tab) => navigate(`/${tab === 'dashboard' ? '' : tab}`)}
        isVisible={isVisible}
      />
    </div>
  );
}
