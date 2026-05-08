import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useThemeStore } from '../../../store/useThemeStore';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <div className={`flex min-h-screen ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
