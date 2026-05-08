import { Card } from '../ui/card';
import { useThemeStore } from '../../../store/useThemeStore';

interface StatCardProps {
  label: string;
  value: string | number;
  color?: string;
}

export function StatCard({ label, value, color = '#25476a' }: StatCardProps) {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <Card className={`p-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-md transition-shadow duration-200`}>
      <div className="flex flex-col">
        <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{label}</span>
        <span className="text-2xl" style={{ color }}>{value}</span>
      </div>
    </Card>
  );
}
