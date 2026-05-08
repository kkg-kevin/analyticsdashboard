import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { AnalyticsPage } from '../pages/analytics/AnalyticsPage';
import { CentersPage } from '../pages/centers/CentersPage';
import { StudentsPage } from '../pages/students/StudentsPage';
import { MentorsPage } from '../pages/mentors/MentorsPage';
import { TeachersPage } from '../pages/teachers/TeachersPage';
import { ParentsPage } from '../pages/parents/ParentsPage';
import { ReportsPage } from '../pages/reports/ReportsPage';
import { SettingsPage } from '../pages/settings/SettingsPage';
import { useThemeStore } from '../store/useThemeStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/analytics" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/centers" element={<CentersPage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/mentors" element={<MentorsPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/parents" element={<ParentsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
