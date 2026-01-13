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
import { HabitProvider } from '@/contexts/HabitContext';
import { ActivityProvider } from '@/contexts/ActivityContext';

type ViewType = 'dashboard' | 'habits' | 'analytics' | 'calendar' | 'settings' | 'create-habit' | 'edit-habit';

const Index = () => {
  const [activeTab, setActiveTab] = useState<ViewType>('dashboard');
  const [editingHabitId, setEditingHabitId] = useState<number | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('focusflow_authenticated') === 'true';
  });

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
        return <Settings onLogout={handleLogout} />;
      case 'create-habit':
        return <CreateHabit onBack={() => navigateTo('habits')} />;
      case 'edit-habit':
        return editingHabitId ? (
          <EditHabit habitId={editingHabitId} onBack={() => navigateTo('habits')} />
        ) : null;
      default:
        return <Dashboard />;
    }
  };

  // Full-screen pages without layout
  if (activeTab === 'create-habit' || activeTab === 'edit-habit') {
    return (
      <ActivityProvider>
        <HabitProvider>
          <div className="min-h-screen bg-background">
            {renderContent()}
          </div>
        </HabitProvider>
      </ActivityProvider>
    );
  }

  return (
    <ActivityProvider>
      <HabitProvider>
        <div className="min-h-screen bg-background">
          <Sidebar activeTab={activeTab} onTabChange={(tab) => navigateTo(tab as ViewType)} />
          
          <div className="lg:pl-70">
            <Header />
            <main className="min-h-[calc(100vh-72px)]">
              {renderContent()}
            </main>
          </div>

          <BottomNav activeTab={activeTab} onTabChange={(tab) => navigateTo(tab as ViewType)} />
        </div>
      </HabitProvider>
    </ActivityProvider>
  );
};

export default Index;
