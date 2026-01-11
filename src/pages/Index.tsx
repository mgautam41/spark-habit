import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Header } from '@/components/layout/Header';
import { Dashboard } from '@/pages/Dashboard';
import { Habits } from '@/pages/Habits';
import { Analytics } from '@/pages/Analytics';
import { CalendarView } from '@/pages/CalendarView';
import { Settings } from '@/pages/Settings';
import { Auth } from '@/pages/Auth';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check localStorage for existing session
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

  // Show Auth page if not authenticated
  if (!isAuthenticated) {
    return <Auth onLoginSuccess={handleLoginSuccess} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'habits':
        return <Habits />;
      case 'analytics':
        return <Analytics />;
      case 'calendar':
        return <CalendarView />;
      case 'settings':
        return <Settings onLogout={handleLogout} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content */}
      <div className="lg:pl-70">
        <Header />
        <main className="min-h-[calc(100vh-72px)]">
          {renderContent()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
