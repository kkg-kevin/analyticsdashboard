import { Card } from '../ui/card';
import { LucideIcon } from 'lucide-react';
import { useThemeStore } from '../../../store/useThemeStore';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
  color?: string;
}

export function KPICard({ title, value, icon: Icon, trend, subtitle, color = '#25476a' }: KPICardProps) {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';

  return (
    <Card className={`p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} hover:shadow-lg transition-shadow duration-200`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-1`}>{title}</p>
          <h3 className={`text-3xl ${isDark ? 'text-white' : 'text-gray-900'} mb-2`}>{value}</h3>
          {subtitle && (
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span className={`text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>vs last period</span>
            </div>
          )}
        </div>
        <div
          className="p-3 rounded-lg"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon size={24} style={{ color }} />
        </div>
      </div>
    </Card>
  );
}
