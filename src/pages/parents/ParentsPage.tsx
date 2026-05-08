import { Card } from '../../app/components/ui/card';
import { useThemeStore } from '../../store/useThemeStore';

export function ParentsPage() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <div className="flex items-center justify-center h-96">
      <Card className={`p-12 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h2 className={`text-2xl mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Parents</h2>
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>This is a placeholder page</p>
      </Card>
    </div>
  );
}
