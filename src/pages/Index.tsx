import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
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

const Index = () => {
  const navigate = useNavigate();
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
    navigate('/');
  };

  if (!isAuthenticated) {
    return <Auth onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <ActivityProvider>
      <HabitProvider>
        <Routes>
          <Route element={<AppLayout onLogout={handleLogout} />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="habits" element={<Habits />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="calendar" element={<CalendarView />} />
            <Route path="settings" element={<Settings onLogout={handleLogout} />} />
          </Route>
          <Route path="habits/create" element={<CreateHabit />} />
          <Route path="habits/edit/:habitId" element={<EditHabit />} />
          <Route path="archived-habits" element={<ArchivedHabits />} />
          <Route path="profile" element={<Profile onLogout={handleLogout} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HabitProvider>
    </ActivityProvider>
  );
};

export default Index;
