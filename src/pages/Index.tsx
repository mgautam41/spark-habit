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
import { HabitProvider } from '@/contexts/HabitContext';

type ViewType = 'dashboard' | 'habits' | 'analytics' | 'calendar' | 'settings' | 'create-habit';

const Index = () => {
  const [activeTab, setActiveTab] = useState<ViewType>('dashboard');
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
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'habits':
        return <Habits onCreateHabit={() => navigateTo('create-habit')} />;
      case 'analytics':
        return <Analytics />;
      case 'calendar':
        return <CalendarView />;
      case 'settings':
        return <Settings onLogout={handleLogout} />;
      case 'create-habit':
        return <CreateHabit onBack={() => navigateTo('habits')} />;
      default:
        return <Dashboard />;
    }
  };

  // Full-screen pages without layout
  if (activeTab === 'create-habit') {
    return (
      <HabitProvider>
        <div className="min-h-screen bg-background">
          {renderContent()}
        </div>
      </HabitProvider>
    );
  }

  return (
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
  );
};

export default Index;
