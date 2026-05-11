import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Building2,
  LogOut,
  X,
} from 'lucide-react';
import { useSidebarStore } from '../../../store/useSidebarStore';
import { useThemeStore } from '../../../store/useThemeStore';
import { Button } from '../ui/button';

const navigationItems = [
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
  { name: 'Centers', path: '/centers', icon: Building2 },
];

export function Sidebar() {
  const location = useLocation();
  const { isOpen, isMobileOpen, toggleSidebar, toggleMobileSidebar, closeMobileSidebar } = useSidebarStore();
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  const sidebarContent = (
    <div className={`flex flex-col h-full ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-r`}>
      <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: isDark ? '#1F2937' : '#E5E7EB' }}>
        <div className="flex items-center gap-2">
          <img src="/Logo-image.png" alt="DigiFunzi" className="h-8 w-auto object-contain" />
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={closeMobileSidebar}
        >
          <X size={20} />
        </Button>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMobileSidebar}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? isDark
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-gray-900'
                  : isDark
                  ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              style={isActive ? { borderLeft: `3px solid #25476a` } : {}}
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t" style={{ borderColor: isDark ? '#1F2937' : '#E5E7EB' }}>
        <button
          className={`flex items-center gap-3 px-4 py-3 rounded-lg w-full transition-colors ${
            isDark ? 'text-gray-400 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >``
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className={`hidden lg:block ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 h-screen sticky top-0`}>
        {sidebarContent}
      </aside>

      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={closeMobileSidebar}>
          <div className="w-64 h-full" onClick={(e) => e.stopPropagation()}>
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
