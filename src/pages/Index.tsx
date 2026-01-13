import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Header } from '@/components/layout/Header';
import { Dashboard } from '@/pages/Dashboard';
import { Habits } from '@/pages/Habits';
import { Analytics } from '@/pages/Analytics';
import { CalendarView } from '@/pages/CalendarView';
import { Settings } from '@/pages/Settings';
import { Auth } from '@/pages/Auth';
import { CreateHabit } from '@/pages/CreateHabit';
import { EditHabit } from '@/pages/EditHabit';
import { ArchivedHabits } from '@/pages/ArchivedHabits';
import { Profile } from '@/pages/Profile';
import { HabitProvider } from '@/contexts/HabitContext';
import { ActivityProvider } from '@/contexts/ActivityContext';
import { useScrollHide } from '@/hooks/use-scroll-hide';

type ViewType = 'dashboard' | 'habits' | 'analytics' | 'calendar' | 'settings' | 'create-habit' | 'edit-habit' | 'archived-habits' | 'profile';

const Index = () => {
  const [activeTab, setActiveTab] = useState<ViewType>('dashboard');
  const [editingHabitId, setEditingHabitId] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('focusflow_authenticated') === 'true';
  });
  
  const { isVisible } = useScrollHide({ threshold: 10 });

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('focusflow_authenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('focusflow_authenticated');
  };

  if (!isAuthenticated) {
    return <Auth onLoginSuccess={handleLoginSuccess} />;
  }

  const navigateTo = (view: ViewType) => {
    setActiveTab(view);
    if (view !== 'edit-habit') {
      setEditingHabitId(null);
    }
  };

  const navigateToEditHabit = (habitId: number) => {
    setEditingHabitId(habitId);
    setActiveTab('edit-habit');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'habits':
        return (
          <Habits 
            onCreateHabit={() => navigateTo('create-habit')} 
            onEditHabit={navigateToEditHabit}
          />
        );
      case 'analytics':
        return <Analytics />;
      case 'calendar':
        return <CalendarView />;
      case 'settings':
        return (
          <Settings 
            onLogout={handleLogout} 
            onOpenArchivedHabits={() => navigateTo('archived-habits')}
          />
        );
      case 'create-habit':
        return <CreateHabit onBack={() => navigateTo('habits')} />;
      case 'edit-habit':
        return editingHabitId ? (
          <EditHabit habitId={editingHabitId} onBack={() => navigateTo('habits')} />
        ) : null;
      case 'archived-habits':
        return <ArchivedHabits onBack={() => navigateTo('settings')} />;
      case 'profile':
        return (
          <Profile 
            onOpenSettings={() => navigateTo('settings')}
            onOpenArchivedHabits={() => navigateTo('archived-habits')}
            onLogout={handleLogout}
            onBack={() => navigateTo('dashboard')}
          />
        );
      default:
        return <Dashboard />;
    }
  };

  // Determine if we should show header (not on full-screen pages)
  const showHeader = !['create-habit', 'edit-habit', 'archived-habits', 'profile'].includes(activeTab);
  const showSidebar = !['create-habit', 'edit-habit', 'archived-habits', 'profile'].includes(activeTab);

  return (
    <ActivityProvider>
      <HabitProvider>
        <div className="min-h-screen bg-background">
          {showSidebar && (
            <Sidebar activeTab={activeTab} onTabChange={(tab) => navigateTo(tab as ViewType)} />
          )}
          
          <div className={showSidebar ? "lg:pl-70" : ""}>
            {showHeader && (
              <Header 
                onOpenSettings={() => navigateTo('settings')} 
                onOpenArchivedHabits={() => navigateTo('archived-habits')}
                onLogout={handleLogout}
                isVisible={isVisible}
              />
            )}
            <main className={showHeader ? "min-h-[calc(100vh-72px)]" : "min-h-screen"}>
              {renderContent()}
            </main>
          </div>

          {/* Bottom nav visible on all pages for mobile */}
          <BottomNav 
            activeTab={activeTab} 
            onTabChange={(tab) => navigateTo(tab as ViewType)}
            isVisible={isVisible}
          />
        </div>
      </HabitProvider>
    </ActivityProvider>
  );
};

export default Index;
