import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Header } from '@/components/layout/Header';
import { Dashboard } from '@/pages/Dashboard';
import { Habits } from '@/pages/Habits';
import { Analytics } from '@/pages/Analytics';
import { CalendarView } from '@/pages/CalendarView';
import { Settings } from '@/pages/Settings';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

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
        return <Settings />;
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
