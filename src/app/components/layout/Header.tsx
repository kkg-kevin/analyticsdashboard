import { Menu, Moon, Sun } from 'lucide-react';
import { Button } from '../ui/button';
import { useSidebarStore } from '../../../store/useSidebarStore';
import { useThemeStore } from '../../../store/useThemeStore';


export function Header() {
  const { toggleMobileSidebar } = useSidebarStore();
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-40 ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b`}>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={toggleMobileSidebar}
          >
            <Menu size={20} />
          </Button>
          <div>
            <h1 className={`text-2xl ${isDark ? 'text-white' : 'text-gray-900'}`}>Analytics Dashboard</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={toggleTheme}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
      </div>
    </header>
  );
}
