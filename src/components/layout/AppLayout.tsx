import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Header } from '@/components/layout/Header';
import { useScrollHide } from '@/hooks/use-scroll-hide';

interface AppLayoutProps {
  onLogout: () => void;
}

export function AppLayout({ onLogout }: AppLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isVisible } = useScrollHide({ threshold: 10 });
  
  // Determine active tab from current route
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return 'dashboard';
    if (path.startsWith('/habits')) return 'habits';
    if (path === '/analytics') return 'analytics';
    if (path === '/calendar') return 'calendar';
    if (path === '/settings') return 'settings';
    if (path === '/profile') return 'profile';
    return 'dashboard';
  };

  const activeTab = getActiveTab();
  
  // Pages that should hide header/sidebar
  const fullScreenPages = ['/habits/create', '/habits/edit', '/archived-habits', '/profile'];
  const isFullScreen = fullScreenPages.some(p => location.pathname.startsWith(p));

  const handleTabChange = (tab: string) => {
    const routes: Record<string, string> = {
      dashboard: '/',
      habits: '/habits',
      analytics: '/analytics',
      calendar: '/calendar',
      settings: '/settings',
      profile: '/profile',
    };
    navigate(routes[tab] || '/');
  };

  return (
    <div className="min-h-screen bg-background">
      {!isFullScreen && (
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      )}
      
      <div className={!isFullScreen ? "lg:pl-70" : ""}>
        {!isFullScreen && (
          <Header 
            onOpenSettings={() => navigate('/settings')} 
            onOpenArchivedHabits={() => navigate('/archived-habits')}
            onLogout={onLogout}
            isVisible={isVisible}
          />
        )}
        <main className={!isFullScreen ? "min-h-[calc(100vh-72px)]" : "min-h-screen"}>
          <Outlet />
        </main>
      </div>

      <BottomNav 
        activeTab={activeTab} 
        onTabChange={handleTabChange}
        isVisible={isVisible}
      />
    </div>
  );
}
